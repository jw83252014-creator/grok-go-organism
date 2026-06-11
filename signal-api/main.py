"""
Dexter Signal API — supply chain intelligence subscription service
Wraps SoMaCoSF signal infrastructure + Dexter research cell
GYST UUIDv8 receipt on every signal delivered

Run: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""
import os, uuid, time, json, hashlib, hmac
from datetime import datetime, timezone
from typing import Optional
from pathlib import Path

import stripe
from fastapi import FastAPI, HTTPException, Header, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel

# ── Config ──────────────────────────────────────────────────────────────
stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "")
STRIPE_WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET", "")
API_KEYS_FILE = Path(__file__).parent / "data" / "api_keys.json"
SIGNALS_FILE = Path(__file__).parent / "data" / "signals.json"
RECEIPTS_FILE = Path(__file__).parent / "data" / "receipts.jsonl"

# Stripe price IDs (create these in your Stripe dashboard)
PRICE_TIER1 = os.getenv("STRIPE_PRICE_TIER1", "price_tier1")  # $99/mo
PRICE_TIER2 = os.getenv("STRIPE_PRICE_TIER2", "price_tier2")  # $499/mo
PRICE_TIER3 = os.getenv("STRIPE_PRICE_TIER3", "price_tier3")  # $2499/mo

TIERS = {
    "tier1": {"price_id": PRICE_TIER1, "monthly_usd": 99,   "label": "Signal Feed",     "signals": True,  "theses": False, "webhook": False},
    "tier2": {"price_id": PRICE_TIER2, "monthly_usd": 499,  "label": "Signal + Thesis", "signals": True,  "theses": True,  "webhook": False},
    "tier3": {"price_id": PRICE_TIER3, "monthly_usd": 2499, "label": "Enterprise",       "signals": True,  "theses": True,  "webhook": True},
}

app = FastAPI(title="Dexter Signal API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# ── Data helpers ─────────────────────────────────────────────────────────
def ensure_data():
    p = Path(__file__).parent / "data"
    p.mkdir(exist_ok=True)
    if not API_KEYS_FILE.exists():
        API_KEYS_FILE.write_text("{}")
    if not SIGNALS_FILE.exists():
        SIGNALS_FILE.write_text(json.dumps({"signals": [], "updated": ""}))
    if not RECEIPTS_FILE.exists():
        RECEIPTS_FILE.write_text("")

def load_keys() -> dict:
    ensure_data()
    return json.loads(API_KEYS_FILE.read_text())

def save_keys(keys: dict):
    ensure_data()
    API_KEYS_FILE.write_text(json.dumps(keys, indent=2))

def load_signals() -> dict:
    ensure_data()
    return json.loads(SIGNALS_FILE.read_text())

def gyst_uuid(signal_type: str = "0x3F2") -> str:
    """Generate a GYST UUIDv8 receipt for a delivered signal.
    Structure: type(12)|namespace(12)|timestamp(24)|version(4=8)|fractal(12)|variant(2)|signal(16)|hash(42)
    Simplified: encodes as UUID v8 with signal metadata embedded."""
    ts = int(time.time() * 1000)
    ts_hex = format(ts & 0xFFFFFF, "06x")
    sig_hex = signal_type.replace("0x", "").lower().zfill(4)
    rand_hex = uuid.uuid4().hex
    return f"gyst-{sig_hex}-{ts_hex}-8{rand_hex[1:4]}-{rand_hex[4:16]}-{rand_hex[16:28]}"

def write_receipt(api_key: str, endpoint: str, signal_count: int, uuid_tag: str):
    ensure_data()
    receipt = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "uuid": uuid_tag,
        "key_prefix": api_key[:8] + "...",
        "endpoint": endpoint,
        "signals_delivered": signal_count,
    }
    with open(RECEIPTS_FILE, "a") as f:
        f.write(json.dumps(receipt) + "\n")

# ── Auth ─────────────────────────────────────────────────────────────────
def get_subscriber(x_api_key: Optional[str] = Header(default=None)):
    if not x_api_key:
        raise HTTPException(status_code=401, detail="Missing API key. Pass header 'x-api-key'. Subscribe at /subscribe")
    keys = load_keys()
    if x_api_key not in keys:
        raise HTTPException(status_code=401, detail="Invalid API key. Subscribe at /subscribe")
    sub = keys[x_api_key]
    if sub.get("status") != "active":
        raise HTTPException(status_code=402, detail="Subscription inactive. Visit /billing to update.")
    return sub

def require_tier(min_tier: int):
    def checker(sub=Depends(get_subscriber)):
        tier_num = int(sub.get("tier", "tier1").replace("tier", ""))
        if tier_num < min_tier:
            raise HTTPException(status_code=403, detail=f"Requires Tier {min_tier}+. Upgrade at /upgrade")
        return sub
    return checker

# ── Signal models ─────────────────────────────────────────────────────────
class SignalOut(BaseModel):
    uuid: str
    signal_code: str
    signal_name: str
    value: float         # 0-1 confidence
    direction: str       # rising / falling / stable
    description: str
    source_types: list[str]
    thesis_card: Optional[str] = None
    timestamp: str

# ── Routes ───────────────────────────────────────────────────────────────

@app.get("/", response_class=HTMLResponse)
async def index():
    return open(Path(__file__).parent / "static" / "index.html").read()


@app.get("/health")
async def health():
    sigs = load_signals()
    return {
        "status": "alive",
        "signals_available": len(sigs.get("signals", [])),
        "updated": sigs.get("updated", ""),
        "organism": "grok-go",
        "substrate": "GYST UUIDv8"
    }


@app.get("/v1/signals", response_model=list[SignalOut])
async def get_signals(
    code: Optional[str] = None,
    min_value: float = 0.0,
    sub=Depends(get_subscriber)
):
    """
    Tier 1+: raw signals feed.
    Filter by signal code (e.g. ?code=0x3F2) or min confidence (?min_value=0.6).
    Every response carries a GYST UUID receipt.
    """
    sigs = load_signals().get("signals", [])
    if code:
        sigs = [s for s in sigs if s.get("signal_code") == code]
    sigs = [s for s in sigs if s.get("value", 0) >= min_value]

    # Strip thesis cards for tier1
    tier_num = int(sub.get("tier", "tier1").replace("tier", ""))
    result = []
    for s in sigs:
        out = dict(s)
        if tier_num < 2:
            out["thesis_card"] = None
        result.append(SignalOut(**out))

    receipt_id = gyst_uuid()
    write_receipt(sub.get("api_key", "?"), "/v1/signals", len(result), receipt_id)
    return JSONResponse(
        content=[r.dict() for r in result],
        headers={"X-GYST-UUID": receipt_id, "X-Signal-Count": str(len(result))}
    )


@app.get("/v1/signals/{code}", response_model=SignalOut)
async def get_signal(code: str, sub=Depends(get_subscriber)):
    """Get latest reading for a specific signal code."""
    sigs = load_signals().get("signals", [])
    match = next((s for s in sigs if s.get("signal_code") == code), None)
    if not match:
        raise HTTPException(status_code=404, detail=f"Signal {code} not found")
    tier_num = int(sub.get("tier", "tier1").replace("tier", ""))
    if tier_num < 2:
        match = dict(match)
        match["thesis_card"] = None
    receipt_id = gyst_uuid(code)
    write_receipt(sub.get("api_key", "?"), f"/v1/signals/{code}", 1, receipt_id)
    return JSONResponse(content=match, headers={"X-GYST-UUID": receipt_id})


@app.get("/v1/theses")
async def get_theses(sub=Depends(require_tier(2))):
    """Tier 2+: full Dexter thesis cards with confidence scores + source links."""
    sigs = load_signals().get("signals", [])
    theses = [s for s in sigs if s.get("thesis_card")]
    receipt_id = gyst_uuid("0xD3X")
    write_receipt(sub.get("api_key", "?"), "/v1/theses", len(theses), receipt_id)
    return JSONResponse(content=theses, headers={"X-GYST-UUID": receipt_id})


@app.get("/v1/receipts")
async def get_receipts(limit: int = 50, sub=Depends(get_subscriber)):
    """Your delivery receipts — every signal we sent you, UUID-tagged."""
    ensure_data()
    lines = RECEIPTS_FILE.read_text().strip().split("\n") if RECEIPTS_FILE.exists() else []
    my_prefix = sub.get("api_key", "")[:8]
    mine = [json.loads(l) for l in lines if l and my_prefix in l]
    return mine[-limit:]


@app.get("/v1/catalog")
async def get_catalog():
    """Public: list all available signal types (no auth required)."""
    return {
        "signals": [
            {"code": "0x3F2", "name": "CDU Lead Time", "description": "Coolant Distribution Unit delivery time deviation — AI datacenter buildout pace indicator"},
            {"code": "0x3F4", "name": "Cable Tray Supply", "description": "Cable tray / containment availability — early indicator of rack density expansion"},
            {"code": "0x3F5", "name": "IBEW Labor Signal", "description": "Electrical labor market tightness — datacenter commissioning pipeline pressure"},
            {"code": "0x3F7", "name": "Aluminum Structural", "description": "Aluminum structural demand — server rack and raised floor construction signal"},
            {"code": "0x3F8", "name": "Cu/Al Substitution", "description": "Copper/aluminum substitution rate at $10K/ton LME threshold — procurement behavior shift"},
        ],
        "thesis": "$295B AI datacenter capex 18-month propagation. SoMaCoSF + Dexter organism research.",
        "substrate": "GYST UUIDv8 — every signal carries provenance receipt",
        "tiers": {k: {kk: vv for kk, vv in v.items() if kk != "price_id"} for k, v in TIERS.items()},
    }


# ── Stripe checkout ───────────────────────────────────────────────────────

class CheckoutRequest(BaseModel):
    tier: str
    email: str
    success_url: str = "https://yourdomain.com/success"
    cancel_url: str = "https://yourdomain.com/pricing"

@app.post("/checkout")
async def create_checkout(req: CheckoutRequest):
    if req.tier not in TIERS:
        raise HTTPException(status_code=400, detail="Invalid tier")
    if not stripe.api_key:
        raise HTTPException(status_code=503, detail="Stripe not configured")
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        mode="subscription",
        customer_email=req.email,
        line_items=[{"price": TIERS[req.tier]["price_id"], "quantity": 1}],
        success_url=req.success_url + "?session_id={CHECKOUT_SESSION_ID}",
        cancel_url=req.cancel_url,
        metadata={"tier": req.tier},
    )
    return {"checkout_url": session.url, "session_id": session.id}


@app.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    """Stripe calls this when a subscription is created/cancelled/updated."""
    payload = await request.body()
    sig = request.headers.get("stripe-signature", "")
    try:
        event = stripe.Webhook.construct_event(payload, sig, STRIPE_WEBHOOK_SECRET)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    keys = load_keys()

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        tier = session["metadata"].get("tier", "tier1")
        customer_id = session.get("customer")
        customer_email = session.get("customer_email") or session.get("customer_details", {}).get("email", "")
        # Generate API key
        raw = f"{customer_id}:{time.time()}:{uuid.uuid4()}"
        api_key = "dex_" + hashlib.sha256(raw.encode()).hexdigest()[:40]
        keys[api_key] = {
            "api_key": api_key,
            "customer_id": customer_id,
            "email": customer_email,
            "tier": tier,
            "status": "active",
            "created": datetime.now(timezone.utc).isoformat(),
            "subscription_id": session.get("subscription"),
        }
        save_keys(keys)
        # TODO: email the api_key to customer_email via SendGrid/Resend

    elif event["type"] in ("customer.subscription.deleted", "customer.subscription.paused"):
        sub_id = event["data"]["object"]["id"]
        for k, v in keys.items():
            if v.get("subscription_id") == sub_id:
                v["status"] = "inactive"
        save_keys(keys)

    elif event["type"] == "customer.subscription.updated":
        sub_obj = event["data"]["object"]
        sub_id = sub_obj["id"]
        new_price = sub_obj["items"]["data"][0]["price"]["id"]
        new_tier = next((t for t, v in TIERS.items() if v["price_id"] == new_price), None)
        for k, v in keys.items():
            if v.get("subscription_id") == sub_id and new_tier:
                v["tier"] = new_tier
        save_keys(keys)

    return {"received": True}


# ── Admin (internal — firewall this endpoint in production) ───────────────
@app.post("/admin/provision-key")
async def admin_provision_key(
    email: str, tier: str = "tier1",
    x_admin_token: str = Header(...)
):
    """Manually provision an API key (for pilot customers, Sam's calls)."""
    if x_admin_token != os.getenv("ADMIN_TOKEN", "change-me"):
        raise HTTPException(status_code=403)
    if tier not in TIERS:
        raise HTTPException(status_code=400)
    keys = load_keys()
    raw = f"{email}:{time.time()}:{uuid.uuid4()}"
    api_key = "dex_" + hashlib.sha256(raw.encode()).hexdigest()[:40]
    keys[api_key] = {
        "api_key": api_key,
        "customer_id": f"manual_{email}",
        "email": email,
        "tier": tier,
        "status": "active",
        "created": datetime.now(timezone.utc).isoformat(),
        "subscription_id": None,
        "note": "manually provisioned",
    }
    save_keys(keys)
    return {"api_key": api_key, "tier": tier, "email": email}


@app.get("/admin/stats")
async def admin_stats(x_admin_token: str = Header(...)):
    if x_admin_token != os.getenv("ADMIN_TOKEN", "change-me"):
        raise HTTPException(status_code=403)
    keys = load_keys()
    active = [v for v in keys.values() if v.get("status") == "active"]
    mrr = sum(TIERS.get(v.get("tier", "tier1"), {}).get("monthly_usd", 0) for v in active)
    by_tier = {}
    for v in active:
        t = v.get("tier", "unknown")
        by_tier[t] = by_tier.get(t, 0) + 1
    return {"active_subscribers": len(active), "mrr_usd": mrr, "by_tier": by_tier}
