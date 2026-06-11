"""
Dexter Research Worker — runs as a background job every N hours
Pulls raw supply chain data, runs Dexter cell analysis via local model,
writes structured signals to data/signals.json with GYST UUID receipts.

Run standalone: python dexter_research.py
Run in loop:    python dexter_research.py --loop --interval 3600
"""
import argparse, json, time, uuid, os, sys
from datetime import datetime, timezone
from pathlib import Path
import httpx

DATA_DIR = Path(__file__).parent / "data"
SIGNALS_FILE = DATA_DIR / "signals.json"

# Local model endpoint (Tier 0 — Qwen via Ollama or LM Studio)
LOCAL_MODEL_URL = os.getenv("LOCAL_MODEL_URL", "http://localhost:11434/api/generate")
LOCAL_MODEL_NAME = os.getenv("LOCAL_MODEL_NAME", "qwen3:4b")

# SoMaCoSF API (Sam's signal harvesters)
SOMACOSF_URL = os.getenv("SOMACOSF_URL", "https://somacosf.com")
SOMACOSF_TOKEN = os.getenv("SOMACOSF_TOKEN", "")

# Signal definitions (the Somaco Protocol signal codes)
SIGNAL_DEFS = [
    {"code": "0x3F2", "name": "CDU Lead Time",       "endpoint": "/api/signals/cdu-lead-time"},
    {"code": "0x3F4", "name": "Cable Tray Supply",    "endpoint": "/api/signals/cable-tray"},
    {"code": "0x3F5", "name": "IBEW Labor Signal",    "endpoint": "/api/signals/ibew-labor"},
    {"code": "0x3F7", "name": "Aluminum Structural",  "endpoint": "/api/signals/aluminum"},
    {"code": "0x3F8", "name": "Cu/Al Substitution",   "endpoint": "/api/signals/cu-al-sub"},
]

DEXTER_PROMPT = """You are Dexter, a financial intelligence cell specializing in AI datacenter supply chain analysis.

Signal: {signal_name} ({signal_code})
Raw value: {raw_value} (0-1 scale, where >0.6 = significant deviation from baseline)
Direction: {direction}

Based on this signal:
1. Write a 2-sentence thesis card explaining what this signal means for AI datacenter capex
2. Give a confidence score (0.0-1.0) for the thesis
3. List 3 source types that would validate this signal

Respond in JSON only:
{{"thesis": "...", "confidence": 0.0, "sources": ["...", "...", "..."]}}"""


def gyst_uuid(signal_code: str = "0x3F2") -> str:
    ts = int(time.time() * 1000) & 0xFFFFFF
    sig = signal_code.replace("0x", "").lower().zfill(4)
    rand = uuid.uuid4().hex
    return f"gyst-{sig}-{ts:06x}-8{rand[1:4]}-{rand[4:16]}-{rand[16:28]}"


def fetch_somacosf_signal(code: str, endpoint: str) -> dict:
    """Fetch raw signal from SoMaCoSF harvester."""
    if not SOMACOSF_TOKEN:
        # Fallback: generate synthetic signal for testing
        import random, math
        base = {"0x3F2": 0.73, "0x3F4": 0.51, "0x3F5": 0.68, "0x3F7": 0.44, "0x3F8": 0.61}
        v = base.get(code, 0.5) + random.gauss(0, 0.05)
        v = max(0.0, min(1.0, v))
        prev = v - random.gauss(0, 0.03)
        return {"value": round(v, 4), "previous": round(prev, 4), "direction": "rising" if v > prev else "falling" if v < prev - 0.01 else "stable"}
    try:
        resp = httpx.get(
            f"{SOMACOSF_URL}{endpoint}",
            headers={"Authorization": f"Bearer {SOMACOSF_TOKEN}"},
            timeout=10
        )
        return resp.json()
    except Exception as e:
        print(f"  [WARN] SoMaCoSF fetch failed for {code}: {e} — using synthetic")
        return {"value": 0.5, "previous": 0.5, "direction": "stable"}


def run_dexter(signal_name: str, signal_code: str, raw: dict) -> dict:
    """Ask local Dexter model to research the signal and produce a thesis."""
    prompt = DEXTER_PROMPT.format(
        signal_name=signal_name,
        signal_code=signal_code,
        raw_value=raw.get("value", 0.5),
        direction=raw.get("direction", "stable"),
    )
    try:
        resp = httpx.post(
            LOCAL_MODEL_URL,
            json={"model": LOCAL_MODEL_NAME, "prompt": prompt, "stream": False},
            timeout=60
        )
        text = resp.json().get("response", "{}")
        # Extract JSON from response
        start = text.find("{")
        end = text.rfind("}") + 1
        if start >= 0 and end > start:
            return json.loads(text[start:end])
    except Exception as e:
        print(f"  [WARN] Local model unavailable: {e} — using stub thesis")
    # Stub fallback if local model down
    return {
        "thesis": f"Signal {signal_name} at {raw.get('value', '?')} indicates elevated supply chain pressure in AI datacenter construction timeline.",
        "confidence": raw.get("value", 0.5),
        "sources": ["SEC 8-K filings", "IBEW dispatch reports", "LME copper spot data"]
    }


def run_research_cycle() -> list[dict]:
    """Full Dexter research cycle — fetch all signals, build thesis cards."""
    DATA_DIR.mkdir(exist_ok=True)
    print(f"\n[{datetime.now().isoformat()}] Dexter research cycle starting...")
    signals = []
    for sig_def in SIGNAL_DEFS:
        code = sig_def["code"]
        name = sig_def["name"]
        print(f"  Researching {name} ({code})...")
        raw = fetch_somacosf_signal(code, sig_def["endpoint"])
        dexter = run_dexter(name, code, raw)
        receipt_id = gyst_uuid(code)
        signal = {
            "uuid": receipt_id,
            "signal_code": code,
            "signal_name": name,
            "value": raw.get("value", 0.5),
            "previous": raw.get("previous", 0.5),
            "direction": raw.get("direction", "stable"),
            "description": f"{name} — AI datacenter supply chain indicator",
            "source_types": dexter.get("sources", []),
            "thesis_card": dexter.get("thesis"),
            "thesis_confidence": dexter.get("confidence", 0.5),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "organism": "grok-go",
            "cell": "dexter",
        }
        signals.append(signal)
        print(f"    ✓ {name}: {raw.get('value', '?'):.3f} ({raw.get('direction', '?')}) [{receipt_id[:20]}...]")
    output = {
        "signals": signals,
        "updated": datetime.now(timezone.utc).isoformat(),
        "cycle_uuid": gyst_uuid("0xD3X"),
        "count": len(signals),
    }
    SIGNALS_FILE.write_text(json.dumps(output, indent=2))
    print(f"  Wrote {len(signals)} signals to {SIGNALS_FILE}")
    print(f"  Cycle UUID: {output['cycle_uuid']}")
    return signals


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--loop", action="store_true", help="Run continuously")
    parser.add_argument("--interval", type=int, default=3600, help="Loop interval seconds (default 3600)")
    args = parser.parse_args()
    if args.loop:
        print(f"Dexter loop starting (interval: {args.interval}s)...")
        while True:
            try:
                run_research_cycle()
            except Exception as e:
                print(f"[ERROR] Research cycle failed: {e}")
            time.sleep(args.interval)
    else:
        run_research_cycle()
