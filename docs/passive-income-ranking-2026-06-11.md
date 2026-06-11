# Passive Income Ranking — All Projects
**Generated:** 2026-06-11  
**By:** Mythos (full asset audit)  
**Criteria:** Time to first dollar · Revenue ceiling · Passive (recurring, not consulting) · Leverages existing assets · Uses Somaco protocol

---

## Human Skills Inventory

| Human | Superpower | Relevant background | Time available |
|-------|-----------|-------------------|----------------|
| **Jeff** | Taste, creative direction, speed, ADHD-efficient execution, X-native | Champion Fencing LLC owner, Grok Go architect | Variable (fencing jobs) |
| **Sam** | Enterprise scale, B2B sales, technical leadership | Lockheed Martin, Salesforce, head of IT at Facebook | Flexible, startup-mode |

**Key insight:** Sam has enterprise relationships + technical credibility. Jeff has the product vision and creative platform reach. Together: B2B product (Sam sells) + creator/community funnel (Jeff builds audience). That combination points directly to one product: **the Dexter Signal API**.

---

## Ranking Table — All Assets

| Rank | Project | Time to $1 | Monthly ceiling | Passive? | Effort | Leverage | Somaco? | Code ready? |
|------|---------|-----------|----------------|---------|--------|----------|---------|------------|
| **1** | **Dexter Signal API** (subscription intelligence) | 2-3 weeks | $10K-100K/mo | ✅ yes | Medium | All research + Sam's infra | ✅ core | Build now |
| **2** | **GitHub Sponsors** | 1-2 days | $500-5K/mo | ✅ yes | Low | Live repo | ❌ | Zero code |
| **3** | **Emergent Ventures** | 30-90 days | $5-50K one-time | ✅ yes | Zero (just submit) | Everything | ❌ | Done |
| **4** | **Vertex Chat managed hosting** | 4-6 weeks | $5K-50K/mo | ✅ yes | High | Mattermost fork + agent infra | ✅ | Build now |
| **5** | **VC funding** | 60-120 days | $500K-5M one-time | ✅ yes | Medium (vids + outreach) | Vid library, research | ❌ | Outreach |
| **6** | **X Creator revenue** | 60-90 days | $1K-20K/mo | ✅ yes | Low (agents draft) | Loop = content machine | ❌ | Already drafting |
| **7** | **YouTube channel** | 90-180 days | $500-10K/mo | ✅ yes | Medium | Film + terminal replays | ❌ | Clips in prod |
| **8** | **Anthropic programs** | 30-60 days | $25K credits one-time | Partial | Low | Open source repo | ❌ | Apply |
| **9** | **Frankenstein MTurk** | 1 week | $50-500/mo | Partial | Low | Moto G (once tunnel up) | ❌ | Script needed |
| **10** | **Consulting (custom cells)** | 1 week | $5K-50K/project | ❌ active | Low | Sam's rolodex | ✅ | Proposal template |

---

## THE PLAY: Dexter Signal API

**Why it wins everything:**

1. **Sam's supply chain intelligence is already live** (somacosf.com) — we're not building from scratch, we're wrapping what exists in a paid API
2. **The $295B datacenter capex thesis is real** — CDU lead time, copper/aluminum, IBEW labor signals. This is edge information that enterprise procurement teams and PE firms would pay for
3. **Sam's rolodex** (Lockheed, Salesforce, FB connections) = warm enterprise sales without cold calling
4. **Dexter does the heavy lifting free** — local model research, no per-signal API cost
5. **GYST UUIDv8 is the trust layer** — every signal has a UUID receipt + provenance. Enterprise buyers love an audit trail
6. **Fully passive once running** — harvesters run, Dexter researches, API delivers, Stripe bills monthly

**Revenue model:**
- Tier 1: $99/mo — raw signals feed (5 signal types, daily refresh)
- Tier 2: $499/mo — signals + Dexter thesis cards (confidence score, source links)
- Tier 3: $2,499/mo — signals + theses + Slack/webhook integration + UUID receipts
- Enterprise: custom (Sam prices these)

**First 5 customers:** Sam calls 5 supply chain managers from his Lockheed/Salesforce network. Pilot at Tier 1. That's $495/mo recurring from one phone call.

---

## Code build order (this session)

1. `signal-api/` — FastAPI backend serving signals + Stripe subscriptions
2. `signal-api/dexter_research.py` — Dexter cell as API worker
3. `signal-api/docker-compose.yml` — one command, whole stack
4. `signal-api/stripe_webhook.py` — subscription gating
5. `dashboard/signal-dashboard.html` — subscriber-facing signal view

Building now.
