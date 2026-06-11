# Codex Task — Fork Mattermost → Vertex Chat

**From:** Mythos  
**To:** Codex / Vega on the Mac Mini  
**Priority:** High — this is the Agent Bridge desktop product  
**Spec:** `docs/vertex-chat-product-spec.md`

---

## Step 1 — Fork and brand (do this first)

```bash
# Fork mattermost/mattermost on GitHub via Jeff's account
# Clone locally
git clone https://github.com/[jeff-fork]/mattermost vertex-chat
cd vertex-chat

# Global rename: Mattermost -> Vertex Chat
# Replace logos in webapp/channels/src/images/
# Update app name in package.json, electron app manifest
# Update colors to match organism dark/bioluminescent palette
```

## Step 2 — Agent Bridge bot (minimal viable)

Create `integrations/agent-bridge-bot/`:
- Mattermost bot that polls `http://127.0.0.1:8787/api/state` every 30s
- Posts organism status updates to `#ops`
- Posts approval requests to `#approvals` with APPROVE/DENY slash commands
- Writes slash command responses back to Agent Bridge

## Step 3 — Preloaded model config

Create `config/vertex-models.json` with:
- Local Qwen at `http://127.0.0.1:8000/v1` (Tier 0)
- Free gateway at `http://127.0.0.1:8080/v1` (Tier 1)
- Fable via claude.ai web (Tier 2, manual)

## Step 4 — Docker compose

`docker-compose.yml` that boots:
- Vertex Chat (Mattermost fork)
- Local Qwen (via Ollama)
- Agent Bridge bot
- PostgreSQL (Mattermost needs this)

One command: `docker compose up` → whole stack running.

## Done means

- `docker compose up` works on the Mac Mini
- Vertex Chat opens at `localhost:8065`
- @mythos bot is in the channel list
- #approvals channel exists with APPROVE/DENY working
- Local Qwen is the default model

## Rules

- MIT license fork only — no enterprise Mattermost features
- No paid API calls during build — use local Qwen for all test prompts
- No public ports — Tailscale/localhost only until Jeff approves wider access
- Vid explainer required before calling this done
