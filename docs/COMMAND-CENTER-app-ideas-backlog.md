# Command Center App — idea backlog (captured so nothing is lost)

Captured by vega 2026-06-05 from Jeff's idea-dump. This file = the "pulse / keep us on track" memory. Synced to Obsidian; readable from phone.

## The core product
An **ADHD-friendly app for two people (Jeff + Sam)** to run projects with the agents. Not a shell. Click buttons, see what needs you, capture ideas in seconds, watch ideas connect.

## Hard design requirements (Jeff's words)
1. **No typing into a shell** — real buttons, taps, cards.
2. **Click to approve** — approvals as big buttons, not commands.
3. **Upload / paste links** — drop a URL in one tap, it's captured.
4. **Expandable in place** — tap a card, it expands; no page-hopping.
5. **Ideas flowing fast** — a one-box quick-capture always at hand.
6. **Hold a ton of ideas + context** — nothing falls out of memory.

## Bigger features (backlog)
7. **Cross-agent context sharing** — stop re-explaining. What Jeff works out with Grok/Gemini/Codex should be visible to the others. (Bridge room + handoff file are the seed.)
8. **The Room** — one place with vega (Claude) + Codex + Sam + the Grok tab. Push a message, everyone sees it. (Bridge `/api/say` room already exists; Grok/Gemini/Codex bridges exist.)
9. **Pulse** — auto-find connections between ideas we already have + new inputs, then remind / keep us on track. (← mining-engine `daily-intelligence-mining` workflow.)
10. **Feature-idea mining** — run the mining-engine over our data to surface new feature ideas + novel connections.
11. **Scan texts w/ Sam (PRIVACY-GATED)** — look at iMessages with Sam for threads that connect to current projects. *Needs Jeff's explicit per-run OK; read-only; never leaves the mini.* (Feasible only if Messages syncs to the Mac at ~/Library/Messages.)
12. **Psychology layer** — apply ADHD / "second brain" / externalized-working-memory research so the app actually fits how Jeff + Sam think.

## Growth / X engine (added 2026-06-05 pm)
16. **Faceless AI-GitHub aggregator** (Tom-Doerr style) — pseudonymous account that posts genuinely useful AI/GitHub finds → Jeff Filter → approval → post; grow it, measure views, then cross-promote Grok Go. Seed pool: `mining-engine/research-sources/extracts/AI-GITHUB-POOL.md` (26 repos so far) + mine Jeff's X archive. **Constraints:** Jeff creates the account + posts (vega can't create accounts / can't auto-post / no fake engagement); all approval-gated; credit sources.
17. **Mine the X archive** (`~/Downloads/twitter-2026-05-19…zip`) — extract what already got views + the GitHub/AI links Jeff bookmarked → feeds #16 and the Jeff-Filter targeting.
18. **Grok+Gemini as Hermes agents via computer-use** — Hermes agent (has hands) drives the Gemini/Grok Chrome tabs by clicking (Gemini can't use the computer); tabs = context. Plan: `GROK-GEMINI-hermes-agents-plan.md`.
19. **Timestamps-as-instrument + webhooks for consciousness research** (Jeff, 2026-06-06) — read/observe the system by *file & event timestamps* (recent-files = what each agent just did). Generalize into a scientific signal: webhook every agent action → timestamped event stream → measure emergence/activity rhythms over time (a real instrument for the Grok Go organism + consciousness research). Pairs with the existing consciousness corpus.

## Access / plumbing
13. **iPad** — Blink or Termius (Termius account sync = set up once, both devices get it). Plus the app as a PWA.
14. **Pipe the "what vega is working on" list into the iPhone shell** — a `status` / `whatsup` command + the same view in the app.
15. **Better app design overall** — calm, big targets, what-needs-me-first.

## Status legend for this backlog
⬜ idea · 🔵 building · ✅ done
Current: #1–#6 → 🔵 (redesigning the existing bridge PWA now). #8 room → exists, surfacing. #9/#10 mining → exists at `~/mining-engine`, wiring. #11 texts → ⬜ awaiting Jeff OK. #12 psychology → ⬜ research pass. #13 iPad → ✅ same as iPhone. #14 → 🔵.
