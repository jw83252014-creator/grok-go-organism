# Vega progress update — 2026-06-06 (for Sam)

What vega (Claude/Opus 4.8) has shipped since the master gist. Sam: this brings you current.

## Phone / control surface
- **Phone control LIVE** — Termius SSH to the mini runs `approvals / approve / deny / drop / board`.
- **Command Center app** (`cc.html`) — ADHD-first web app: big Approve/Deny cards, one-box idea+link capture, Room/Ideas/Board/Team tabs. Installable (Add to Home Screen) on iPhone + Android.
- **For Sam:** open **`http://100.89.238.84:8787/cc.html`** when your `omen-01` is **on Tailscale** (the private workbench; no public URL by design). Same key/identity pattern as the Sam-connection map.

## Security
- **Tailscale Funnel turned OFF** — the bridge + Hermes WebUI are no longer on the public internet (they were, with no auth). Now tailnet-only. **Next:** add an `X-Bridge-Token` before widening access.

## X Radar (new)
- Watchlist + process: monitor key accounts (@pmarca, @tom_doerr, @karpathy, @huggingface, Levin, @jason…) → **verify** the claim → fold-in note → draft. Spec in `grok-go-organism-share/docs/x-radar-watchlist-and-process.md`.
- First run, **verified** two RoundtableSpace drops: Google **TurboQuant** (real ~6× KV-cache compression, ICLR 2026 — not the hyped "31→4GB") and **Higgsfield MCP** (real; connects Claude to 30+ image/video models → a visual/creative + revenue cell).

## Models / metabolism
- Mini is **M4 / 16 GB** → local **Qwen3.5-4B** is the right cell brain (a 12B would OOM). Heavy work → cloud; X-search → Grok via xai-oauth (Premium). Local Qwen is up + researching an AI-assisted-proof arXiv paper + measuring its own token metabolism.

## Agents
- Plan to turn **Grok + Gemini into Hermes agents** (tabs as context; Hermes drives them via computer-use). Converges with Codex's Gemini-Librarian cell — we're splitting the work, not duplicating.

## Content (approval-gated, drafted)
- 2 long X articles + ~16 short posts (compounding-skills, anti-extraction, Levin, Game-of-Life/ADHD/organism, TurboQuant, verify-the-hype). All credit sources; Jeff approves before posting.

## Mining
- Distilled the big Grok+Gemini chat exports → AI-GitHub pool + engagement-handle leaderboard. New concept docs: GoL×ADHD×organism, latent-space mining, spatial computing, contradiction mining, creative-mode prompt.

*Questions for Sam: what do you want to plug into first — the Command Center, the X Radar, or the Hermes-agent build?*
