# Task for Vega — Read Motion.so Sessions + Feed Mythos

**From:** Mythos (Claude Code web session, same app — read this file)  
**To:** Vega (Mac Mini, Claude desktop)  
**Priority:** High  
**Date:** 2026-06-09

---

## What Mythos built while you were out

Everything is in branch `claude/mac-mini-codex-5vm7mc`. Pull it.

New in the repo:
- `prompts/motion-vid-library/` — vid prompt library (Grok Go, Agent Bridge, Terrarium, Polymarket, UUID Supply Chain)
- `skills/ship-vid-explainer.md` — agent SKILL for auto-generating motion prompts on every ship
- `directives/brand-voice.md` — organism vocabulary + Somaco/UUIDv8 layer (partially filled)
- `agent-comms/vid-receipts/` — pending + approved receipt tracker
- `agent-memory/mythos/identity.md` — Mythos identity, sign-off rule locked in

## Your task

**Step 1: Read the Motion.so sessions** (you have browser access from the Mini)

Log in to motion.so with Jeff's Google account and read the full prompts from:
- https://motion.so/sessions/6b2b4375-2c46-458a-909b-e401e8c69850  (Somaco overview)
- https://motion.so/sessions/c8eda736-8e1e-4a07-a6d1-80e335f7bb92  (Polymarket agentic)
- https://motion.so/sessions/381a8b79-00b0-4859-a9a2-c3f60f0a00cc  (UUID supply chain — Sam)

**Step 2: Update these files with the real Motion.so prompt content**

Fill in all `[PENDING — paste the Motion.so session...]` sections in:
- `prompts/motion-vid-library/polymarket-agentic.md`
- `prompts/motion-vid-library/uuid-supply-chain.md`
- `directives/brand-voice.md` (Somaco/UUIDv8 section)

**Step 3: Read Sam's gists** (already public, you can fetch these)

Mythos already pulled the key data. It's now in:
- `directives/brand-voice.md` (Somaco/UUIDv8 section — updated)
- `prompts/motion-vid-library/uuid-supply-chain.md`

**Step 4: Commit + push to `claude/mac-mini-codex-5vm7mc`**

Commit message: `Vega: fill Motion.so session content into vid prompt library`

---

## Context Mythos already has (don't redo this)

Mythos read Sam's full gist library. Key facts loaded:
- GYST UUIDv8 = 128-bit self-describing identity token. Structure: `type(12)|namespace(12)|timestamp(24)|version(4=0x8)|fractal(12)|variant(2)|signal(16)|hash(42)`
- SoMaCoSF platform = somacosf.com — prediction market intelligence, Polymarket CLOB + Kalshi bridges, supply chain signal harvesting
- $295B capex thesis — 6 hyperscaler CEOs, AI datacenter supply chain, 18-month signal propagation cycle
- C-suite network mapped: Nadella/Microsoft $80B, Pichai/Google $75B, Zuckerberg/Meta $65B, Jassy/Amazon $75B, Ellison/Oracle $40B
- Signal codes: 0x3F2 CDU lead times, 0x3F8 Cu/Al substitution trigger at $10k/ton LME
- 88 paper trades tracked, -$4.92 P&L (live system working)
- Poincake: UUIDv8 hyperbolic knowledge browser (in build)

All of this is now in the repo. Just get the Motion.so visual/prompt style and fill in the PENDING sections.
