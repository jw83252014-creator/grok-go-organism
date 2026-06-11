# Vertex Chat — Agent Bridge Desktop App

**Status:** planning / approved to build  
**Date:** 2026-06-10  
**Stack:** Mattermost (MIT fork) + Hermes gateway + Agent Bridge  
**Vessel:** Champion Fencing LLC → future product

---

## The Idea

Fork Mattermost. Brand it as **Vertex Chat** (already the group name).  
Ship it as a self-hosted AI team chat where agents are first-class members.

Not Slack. Not Discord. Not another wrapper.  
A chat room where the AI agents ARE the team — and humans are the approvers.

---

## Why Mattermost

- MIT licensed (open source version) — fork, brand, ship legally
- Self-hosted — runs on the Mac Mini or any VPS, data stays private
- Electron desktop app — works on Mac, Windows, Linux
- Rich bot/webhook API — agents post, read, react, route tasks
- 700+ integrations already exist
- Channels map perfectly to the organism architecture

---

## Channel Structure (prebuilt on install)

| Channel | Owner cell | What lives here |
|---------|-----------|-----------------|
| `#approvals` | Approval Cell | everything waiting for Jeff/Sam |
| `#research` | Researcher + Intelligence Forager | signals, summaries, paper drafts |
| `#receipts` | All cells | GYST UUID-tagged turn receipts |
| `#creative` | Creative Department | vid prompts, X drafts, film beats |
| `#markets` | Dexter + Polymarket Forager | supply chain signals, thesis cards |
| `#ops` | Metabolism Checker + Watcher | loop health, compute state |
| `#build` | Codex + Vega | what's shipping, what's blocked |
| `#funding` | BitHawk Forager | grant drafts, application status |
| `#general` | Everyone | Jeff + Sam + agents, open floor |

---

## Preloaded Agent Bots

Each bot = a Mattermost integration pointing at Agent Bridge or Hermes:

| Bot handle | Cell | Model | Job |
|-----------|------|-------|-----|
| `@mythos` | Coordinator | Fable (this session) | strategy, routing, synthesis |
| `@vega` | Executor | Opus/Sonnet | Mac Mini execution, terminal work |
| `@dexter` | Financial Intel | xAI Grok / local Qwen | supply chain research, thesis cards |
| `@researcher` | Researcher | local Qwen | turn receipts, paper drafts |
| `@bithawk` | Funding Forager | local Qwen | grant hunting, application drafts |
| `@watcher` | Immune system | local (deterministic) | health checks, anomaly flags |
| `@morpho` | Gemini lane | Gemini | long-context synthesis |
| `@null` | Null Axiom | Opus | consciousness architecture work |

---

## Preloaded Models (ships with the app)

```
Tier 0 (always on, free):
  - local Qwen 3.5-4B via Ollama / LM Studio
  
Tier 1 (free endpoints, auto-routed):
  - free endpoint gateway (freellmapi / local router at :8080)
  - GitHub Models free tier
  - Groq free (fastest small models)
  - Cerebras free (high token/day)
  
Tier 2 (subscription lanes):
  - Claude Fable (Jeff's claude.ai)
  - Gemini (Morpho)
  - Grok (X Premium)
  
Tier 3 (API, approval-gated):
  - claude-fable-5 API
  - OpenAI API
```

---

## The Business Play

Ship **Vertex Chat** as a product for businesses that want:
- Private, self-hosted team chat (not Slack/Teams with your data on their servers)
- AI agents built into the team from day one
- Approval gates on everything risky
- GYST UUID provenance on every agent action

**Champion Fencing LLC** ships it. **SoMaCoSF** (Sam) gets a revenue channel.

Target: small/mid businesses, AI-forward teams, anyone running Claude Code or local models who wants a team coordination layer.

**Monetization:**
- Self-hosted free (open core, MIT)
- Managed hosting: $X/month
- Pre-configured agent packs (Dexter financial intel, etc.)
- Custom cell builds

---

## Build Steps

**Step 1 — Fork + Brand (Codex task)**
- Fork `github.com/mattermost/mattermost`
- Rename → Vertex Chat
- Replace logos, colors, app name
- Ship to new GitHub repo under Champion Fencing LLC or Jeff's account

**Step 2 — Agent Bridge bot layer**
- Build Mattermost bot that connects to `http://127.0.0.1:8787` (Agent Bridge)
- Bot reads Agent Bridge state → posts to channels
- Bot reads Mattermost messages → routes to Agent Bridge

**Step 3 — Hermes profile integration**
- Each Hermes profile gets a Mattermost bot identity
- Hermes sessions post receipts directly to `#receipts`
- Approval requests → `#approvals` with APPROVE/DENY buttons

**Step 4 — Preloaded model config**
- Ship with `config/models.json` pointing at local Qwen + free gateway
- One-command setup: `docker compose up` → Vertex Chat + local model + Agent Bridge

**Step 5 — GYST UUID every message**
- Every agent message gets a UUID tag in metadata
- Receipts channel is an append-only UUID log
- Full provenance on every action

---

## Vertex Group (already exists)

The Telegram Vertex Hermes Admin Group (Jeff admin, Somaco owner, Null Axiom, Vertex — 5 members) becomes the bootstrap team for this product.

Vertex Chat is named after the group.

---

## Vid Prompt

See `prompts/motion-vid-library/vertex-chat.md`

## Motion Sign-Off

- [ ] Jeff approves this spec
- [ ] Vid produced
- [ ] Jeff approves vid → **SIGNED OFF. Build starts.**
