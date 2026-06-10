# Motion Vid Prompt — Polymarket Agentic Tech

**Type:** project overview  
**Duration:** 30 seconds  
**Status:** DRAFT — pending full context from Motion.so session c8eda736

---

## THE NEED

Prediction markets are the most honest signal in the world. Hooking an AI organism into Polymarket means the organism can hunt signal, not noise.

## WHAT IT IS

The SoMaCoSF platform bridges Polymarket CLOB and Kalshi — two of the largest
prediction markets — through a unified execution layer. The organism harvests signals,
tags them with GYST UUIDs, tracks paper trades, and surfaces edges for human approval.

88 paper trades tracked. P&L live. Real execution bridges built and tested.
A daemon cycles every 300 seconds monitoring active markets. Every signal tagged.
Human pulls the trigger. The organism watches, learns, and drafts the next move.

## SCENE

Dark LCARS-style dashboard. 20 commodity tickers scrolling — copper, LNG, uranium.
A Pyth Hermes WebSocket fires: price deviation 2.3σ above EMA. Signal formula appears:
`signal = clamp(0.5 + dev×5, 0, 1)`. Score: 0.87. UUID tag pulses on the signal.

Cut to: Polymarket market card. Odds bar. The agent cell pushes a draft thesis card
to the command surface. *"Edge detected. Human review required."* One button: APPROVE.

## MOTION

Signal calculation animates step by step: spot price → EMA → deviation → clamp → 
normalized confidence. The UUID assembles around it — signal strength encoded in bits
16-31 of the low 64. The provenance hash finalizes. Receipt fired to Agent Bridge.

Cut to portfolio tracker — P&L sparkline, open positions, win streak.

## NARRATION

> "The organism watches Polymarket and Kalshi around the clock. When it finds an edge —
> copper substitution signal, CDU lead time spike, labor backlog building — it drafts the
> thesis and waits. You approve. It learns. Every signal is tagged, every trade receipted,
> every edge provenance-anchored in the UUID substrate."

## SOMACO/UUIDV8 NOTE

The platform runs 61 UUID math tests + 26 meta-harness tests on every deploy.
The signal field (bits 16 of the low 64) encodes normalized forecast confidence.
Show the confidence encoding in the vid — this is the organism betting on its own signals.

## APPROVAL GATE

- [ ] Jeff pastes Motion.so session c8eda736 content
- [ ] Prompt completed
- [ ] Jeff approves → vid produced → Jeff approves vid → SIGNED OFF
