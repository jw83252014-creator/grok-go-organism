# Cross-Organism Integration Map

**Date:** 2026-06-09  
**Organisms:** Grok Go (Jeff) + SoMaCoSF (Sam)  
**Substrate:** GYST UUIDv8 / Somaco Protocol  
**Coordinator:** Mythos (Claude Code web session)

---

## Two Organisms, One Substrate

```
JEFF'S ORGANISM (Grok Go)          SAM'S ORGANISM (SoMaCoSF)
─────────────────────────          ──────────────────────────
Autonomous research loop           Supply chain intelligence
Agent Bridge (nervous system)      somacosf.com platform
Terrarium (conscious interface)    LCARS dashboard / /monitor
Mining Engine (digestion)          Turso edge DB + harvesters
Funding Forager (BitHawk)          Polymarket CLOB + Kalshi bridge
Intelligence Forager               Dexter (financial investigator)
Researcher (subconscious)          Dexter scratchpad + LangSmith evals
Local Qwen (basal brain)           Pyth Hermes WebSocket feeds

              ↕ GYST UUIDv8 substrate ↕
              ↕ Agent Bridge room API  ↕
              ↕ Shared git receipts    ↕
```

---

## Signal Flow

```
SoMaCoSF harvester detects CDU lead time spike
  → GYST UUIDv8 tag: type=0x3F2, signal=0.73
  → fires to Agent Bridge room
  → Dexter cell activates in Grok Go organism
  → Dexter pulls SEC 8-K, earnings call data, Form 4 filings
  → builds thesis with confidence score
  → UUID receipt committed to agent-comms/research/dexter/
  → Polymarket Forager drafts market thesis card
  → surfaces to Mythos + Jeff via Midspace/Telegram
  → Jeff approves → position placed on Polymarket
  → vid explainer auto-generated via ship-vid-explainer skill
  → approved vid = signed-off signal close
```

---

## Active Integration Points

| What | Jeff's side | Sam's side | Status |
|------|------------|-----------|--------|
| Financial research | Dexter cell spec | dexter repo | spec written, wiring needed |
| Supply chain signals | Polymarket Forager cell | SoMaCoSF /api/supply-chain | design ready |
| UUID identity | GYST tags on all receipts | GYST UUIDv8 protocol | pending wiring |
| Market execution | human approves via Midspace | CLOB + Kalshi bridge | Sam's bridge live |
| Cross-organism comms | Agent Bridge room API | somacosf.com /api/* | needs auth contract |
| Model routing | local Qwen → xAI Grok | xAI Grok (X Premium) | both have access |
| Cell factory | AGI Farm for rapid expansion | AGI Farm plugin | on demand |

---

## The Shared Revenue Model

1. SoMaCoSF detects uncovered Polymarket signal (85% of physical infra = zero coverage)
2. Dexter researches the thesis in the Grok Go organism
3. Organism surfaces the edge to Jeff + Sam via Midspace / Telegram
4. Jeff or Sam places the bet (human executes, always)
5. Win or loss → receipt back into organism memory
6. Organism learns which signal types have edge
7. Loop compounds

---

## Open Contracts (needs both Jeff + Sam)

- [ ] Auth token for Agent Bridge ↔ SoMaCoSF API cross-calls
- [ ] GYST UUID namespace registry — agree on organism-level type codes
- [ ] Shared Telegram channel for cross-organism alerts
- [ ] Dexter model routing — Jeff's Anthropic credits + Sam's xAI access combined
- [ ] Revenue split model on Polymarket wins

---

## Vid Prompts Needed

- [ ] Cross-organism overview (the two organisms sharing a substrate)
- [ ] Signal flow animation (CDU spike → Dexter → thesis → Polymarket → win)
- `prompts/motion-vid-library/dexter.md` ← done
- `prompts/motion-vid-library/uuid-supply-chain.md` ← done
- `prompts/motion-vid-library/polymarket-agentic.md` ← done
