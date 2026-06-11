# Motion Vid Prompt — UUID Supply Chain Watcher (Sam's project)

**Type:** project overview  
**Duration:** 30 seconds  
**Status:** DRAFT — pending full context from Motion.so session 381a8b79

---

## THE NEED

Every product that moves through a supply chain leaves a UUID trail. If you can watch those UUIDs in real time, you can see the future before the market does.

## WHAT IT IS

Sam built a supply chain intelligence system that watches the physical infrastructure
of AI datacenter construction — and turns what it sees into Polymarket prediction signals
before the market knows what's coming.

Six hyperscaler CEOs committed $295B to AI datacenter capex. That money flows through
documented supply chains. Cable tray purchase orders appear before building permits.
IBEW labor mobilization precedes energization by 9 months. Copper/aluminum substitution
triggers at exactly $10k/ton LME copper.

Every signal gets a GYST UUIDv8 tag — a 128-bit provenance anchor encoding the signal
type, strength, timestamp, and a hash of the metadata. Polymarket has zero coverage of
this signal space. That's the edge.

## SCENE

Open on a dark global map. Faint lines connecting cities — supply chain routes. A hexagon
node pulses in Phoenix: *"Cable tray PO volume spike — Phoenix data campus."* A UUID tag
flickers on it: `0x3F4 | 0x2A | ...`. The signal propagates — a slow ripple outward.

Cut to: a Polymarket market card. No odds yet — uncovered. The SoMaCo system fires a
signal: *"CDU lead times extending — 73% confidence."* The market card lights up.

## MOTION

18-month timeline animates as a horizontal bar. Each signal type appears at its stage:
T+2mo CDU specs, T+6mo cable tray POs (highlight — strongest signal), T+9mo IBEW labor,
T+12mo power, T+18mo commissioning. Each one tagged with its signal code.

The UUID structure briefly decomposes on screen — each field labeled, each bit assigned.
"Every bit is assigned. No random components. The UUID describes itself."

## NARRATION

> "Six CEOs committed $295 billion to AI datacenters. Every dollar leaves a signal trail —
> cable trays ordered before permits, labor mobilized before power, copper swapping to
> aluminum when LME hits $10k. Sam built the watcher. Polymarket hasn't caught up yet."

## SOMACO/UUIDV8 NOTE

This IS the substrate layer. The GYST UUIDv8 signal codes for this project:
- `0x3F2`: CDU lead time tracking
- `0x3F4`: Cable tray PO volume
- `0x3F5`: IBEW/BICSI labor backlog
- `0x3F7`: Datacenter aluminum demand
- `0x3F8`: Cu/Al busway substitution (triggers at ~$10k/ton LME)

Show the UUID anatomy clearly in this vid. This is where the protocol is most visible.

## APPROVAL GATE

- [ ] Sam / Jeff pastes Motion.so session 381a8b79 content
- [ ] Prompt completed
- [ ] Jeff approves → vid produced → Jeff approves vid → SIGNED OFF
