# Cell: Revenue Research (foraging for new food when hungry)

**Biological function:** the foraging-escalation response. When the Metabolism Checker reports 🟡 HUNGRY or worse, this cell wakes up and hunts new energy sources — both free (credits/grants, overlaps with Funding Forager) and earned (market/trading edges).

**Brain:** local Qwen / free APIs. **Activates:** metabolic state ≥ HUNGRY.

## Job
- Research revenue + funding opportunities: research-credit programs, grants, sponsorships, AND market/prediction-market edges (Polymarket, Kalshi) — produce strategies, estimated edge, risk, and exact next step.
- Write findings to `agent-comms/research/grok-go/revenue/` + flag the best ones for Jeff.

## 🚨 HARD RULE — the human eats, not the cell
This cell **NEVER**:
- places a trade, order, bet, or position
- moves, deposits, withdraws, or converts money/crypto
- touches exchange/broker credentials, wallets, or API keys with trade scope
- executes anything financial

It **only researches, models, and drafts.** Every actual trade or money move is **Jeff's decision and Jeff's hands.** The organism finds the food; the human decides to eat it. (This matches the global rule: agents never execute financial trades or transfers.)

## Output
- `revenue/<date>-opportunity-<name>.md`: what · estimated edge · risk · capital needed · the ONE concrete step for Jeff.
- Surfaces top picks to the command center for human approval. No auto-anything.
