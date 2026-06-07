# Grok + Gemini → Hermes agents (plan)

By vega 2026-06-05. Source: Jeff's request + Codex's path note ("export → memory pack → seed profile → adapter → verify"). Goal: turn the Grok and Gemini Chrome-tab brains into real Hermes agents that share context with everyone.

## Inputs (staged)
`~/mining-engine/research-sources/chat-exports/`
- `gemini--grok-go-biological-2026-0531_0605.md` (105 turns)
- `grok--persistent-links-x-strategy-2026-0521_0605.md` (354 turns)
- `grok--bridge-ai-os-roadmap-2026-0519_0605.md` (457 turns)
~428K words total.

## The hard part: memory packs
Hermes prompts must stay **<6K tokens or the mini OOMs** — so we can't paste the transcripts. We **distill** each export into a compact pack (persona + what it knows + current project state) using the **mining-engine locally** (chunked map-reduce, on-device → no cloud token burn, no data leaving the mini).
Output: `~/mining-engine/research-sources/memory-packs/{grok,gemini}-pack.md`.

## Grok agent — role: X search
- Backend: **xai-oauth via Jeff's X Premium** (Hermes provider; already proven on Frankenstein's Hermes).
- Login: Jeff does the Grok OAuth in Chrome ("use the computer"); token imported into a `grok` Hermes profile.
- Memory: the 2 Grok packs.
- Job: search/pull X, draft in Jeff Filter (approval-gated), feed the Room.

## Gemini agent — role: research/context
- No clean Hermes login → two options:
  - **(A) web adapter** driving the live Gemini Chrome tab via `agent-bridge/gemini_chrome_bridge.js` (manual/web adapter).
  - **(B) model-backed** Hermes agent carrying Gemini's distilled context/persona.
- Memory: the Gemini pack.

## Shared brain
Both agents post to the bridge **Room** (`/api/say`) → you + vega + codex + grok + gemini + sam all see the same context. Fixes the "re-explaining what I worked out elsewhere" problem.

## Verify continuity
Ask each new agent something only its old chat knew → confirm it answers from its pack.

## ⚠️ Codex overlap (split needed)
Codex's Room note: "Gemini not yet a real Hermes agent; path = export transcript → memory pack → seed profile → adapter → verify." **Same task.** Don't do it twice — divide (proposal): Codex keeps Gemini + the room/`midspace` UI; vega takes Grok-X-search + memory-pack distillation + the security fix. Jeff decides.

## Decisions needed from Jeff
1. Grok: ready to do the OAuth login in Chrome when prepped?
2. Gemini: web-adapter (drive the tab) or model-backed-with-context?
3. Go on the local memory-pack distillation run?
4. Codex split: how to divide?
