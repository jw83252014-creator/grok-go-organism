# Brand Voice & Vocabulary

**Owner:** Mythos (Claude Code coordinator)  
**Applies to:** all agents, all prompts, all vid explainers, all docs  
**Status:** v1 — pending Somaco/UUIDv8 enrichment from Motion.so sessions

---

## Core Vocabulary

| Their word | Our word |
|---|---|
| AI assistant | cell / agent-cell |
| Loop / automation | autonomous turn cycle |
| Database | memory substrate |
| Config file | genome / directive |
| System | organism |
| Health check | metabolism check |
| Monitor | watcher / immune cell |
| Pipeline | signaling lane |
| Codebase | body |
| Deploy | differentiate |
| Feature shipped | cell matured |
| Bug | mutation / noise |
| Dashboard | conscious interface |
| Log | turn receipt |
| ID / identifier | UUID |
| Coordination layer | Agent Bridge / nervous system |
| Phone app | command surface |
| Approval gate | immune checkpoint |

## Organism Framing (always use this)

- The system is **alive** — not running, not deployed. **Alive.**
- It has **metabolism** (compute/credits), **memory** (git/markdown), **senses** (X radar, APIs), **immune system** (watcher/approvals), **genome** (directives), **cells** (agents)
- Conway's Game of Life is the governing metaphor — cells live, die, and differentiate based on neighbors and energy
- **Emergence** is the goal — behavior that wasn't explicitly programmed
- **Substrate** = the free compute + API layer the organism forages on

## Somaco / UUIDv8 Substrate

**SoMaCoSF** (Sam's project, somacosf.com) is a prediction market intelligence platform.  
**GYST UUIDv8** is the identity substrate — a 128-bit self-describing provenance token.

Every signal, every agent, every data point in the organism gets a UUID that encodes:
```
type(12) | namespace(12) | timestamp(24) | version(4=0x8) |
fractal(12) | variant(2) | signal(16) | hash(42)
```

This is not a random ID. It's a **provenance anchor** — the UUID describes itself.
- `type` = what kind of signal (CDU lead time, labor backlog, copper demand...)
- `signal` = normalized forecast price or confidence (0–1)
- `hash` = SHA-256 fingerprint of the metadata — tamper-evident

**The $295B thesis:** 6 hyperscaler CEOs committed $295B to AI datacenter capex.
That capital flows through supply chains with 18-month propagation:
- T+2mo: liquid cooling CDU specs triggered
- T+6mo: cable tray POs (strongest external signal — POs before permits)
- T+9mo: IBEW labor mobilization
- T+18mo: full campus commissioning

Polymarket has **zero coverage** of this signal space. That's the edge.

**How this connects to Grok Go:**  
The UUIDv8 substrate is the identity layer for every cell, every receipt, every turn.  
When a cell emits a receipt, it gets a GYST UUID. When a signal is detected, it gets tagged.  
The organism's memory is content-addressed. Provenance is built-in, not bolted on.

**Visual language for vids:** UUID pulses as cells spawn. The 128-bit structure briefly
visible on each node — type code glowing, hash fragmenting outward. The substrate is
the dark matter everything else runs on.

> Motion.so visual sessions still needed for full prompt style — Vega to pull from Mini.

## Projects Vocabulary

**Grok Go** — the autonomous research organism. Not a chatbot. A living loop.  
**Agent Bridge** — the nervous system. The shared room all cells talk through.  
**Mining Engine** — digestion. Turns raw chat exports and logs into structured memory.  
**Terrarium** — the conscious interface. What the organism looks like from outside.  
**BitHawk / Funding Forager** — the organism hunting for its own food (credits, grants).  
**Metabolism Checker** — homeostasis. Watches energy, sets the organism's state.  
**Intelligence Forager** — eyes. Watches key humans and sources for signals.  
**Researcher** — subconscious. Reads everything, drafts the paper, finds patterns.  
**Null** — a separate organism Jeff built (consciousness architecture, 7-layer/35-cron design).  
**Midspace** — the private workbench room. Chat-first, phone-friendly, approval-gated.

## Sign-Off Rule

**An APPROVED motion vid explainer = sign-off for any completed feature, assignment, or major milestone.**

No vid = not done. The vid IS the receipt, the audit trail, the provenance.

Every ship triggers `skills/ship-vid-explainer.md`. Every approved vid gets logged in `agent-comms/vid-receipts/`.
