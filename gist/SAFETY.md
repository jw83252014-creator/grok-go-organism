# Safety And Guardrails

This system can keep acting after the human stops typing. That makes safety part of the core architecture, not an add-on.

## High-Risk Actions

Require explicit human approval before:

- spending money
- trading or betting
- changing credentials
- publishing externally
- modifying infrastructure
- deleting large data
- inviting collaborators
- accessing private accounts beyond the configured scope

## Minimum Watcher Responsibilities

- detect repetitive low-value loops
- track resource burn
- write human-readable status
- support pause/kill switch
- flag risky actions instead of executing them

## Early Revenue / Polymarket Rule

Any prediction-market or revenue loop should begin as:

1. offline research
2. historical backtest
3. paper trading
4. tiny capped live test
5. only then limited automation

No blind card top-ups. No unlimited API credit refills. No live trading without separate risk controls.

## Failure Modes

- prompt drift
- self-polishing loop
- credit runaway
- stale memory
- unsafe tool access
- duplicate agents acting on the same files
- over-trusting model summaries

## Simple Rule

Autonomy should increase leverage, not remove accountability.

