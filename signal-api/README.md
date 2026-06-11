# Dexter Signal API

Supply chain intelligence subscription service. $295B AI datacenter capex thesis. GYST UUIDv8 receipts on every delivery.

## Launch (local, 5 minutes)

```bash
cd signal-api
pip install -r requirements.txt
cp .env.example .env   # fill in Stripe keys

# Run one Dexter research cycle to populate signals:
python dexter_research.py

# Start the API:
uvicorn main:app --reload --port 8000
```

Open http://localhost:8000 — pricing page live.

## Launch (Docker, production-ready)

```bash
cp .env.example .env  # fill in values
docker compose up -d

# Pull Qwen into Ollama (one-time, ~2GB):
docker exec -it signal-api-ollama-1 ollama pull qwen3:4b

# Run first Dexter cycle:
docker exec signal-api-dexter-1 python dexter_research.py
```

## Stripe setup (15 minutes, one-time)

1. Create account at stripe.com
2. Dashboard → Products → Create three products:
   - Signal Feed $99/mo → copy Price ID → STRIPE_PRICE_TIER1
   - Signal + Thesis $499/mo → STRIPE_PRICE_TIER2  
   - Enterprise $2499/mo → STRIPE_PRICE_TIER3
3. Developers → Webhooks → Add endpoint: `https://yourdomain.com/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`, `customer.subscription.updated`
   - Copy signing secret → STRIPE_WEBHOOK_SECRET

## Manually provision a pilot key (Sam's calls)

```bash
curl -X POST http://localhost:8000/admin/provision-key \
  -H "x-admin-token: your-admin-token" \
  -H "Content-Type: application/json" \
  -d '{"email": "pilot@client.com", "tier": "tier2"}'
# Returns: {"api_key": "dex_...", "tier": "tier2", "email": "..."}
# Send the key to the client manually (email or call)
```

## Revenue tracking

```bash
curl http://localhost:8000/admin/stats -H "x-admin-token: your-admin-token"
# {"active_subscribers": 3, "mrr_usd": 1097, "by_tier": {"tier1": 1, "tier2": 2}}
```

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | None | Pricing landing page |
| GET | `/health` | None | API health + signal count |
| GET | `/v1/catalog` | None | List all signal codes |
| GET | `/v1/signals` | API key | All signals (Tier 1+) |
| GET | `/v1/signals/{code}` | API key | Single signal |
| GET | `/v1/theses` | API key Tier 2+ | Dexter thesis cards |
| GET | `/v1/receipts` | API key | Your delivery history |
| POST | `/checkout` | None | Start Stripe checkout |
| POST | `/stripe/webhook` | Stripe signature | Subscription events |
| POST | `/admin/provision-key` | Admin token | Pilot key generation |
| GET | `/admin/stats` | Admin token | MRR + subscriber count |
