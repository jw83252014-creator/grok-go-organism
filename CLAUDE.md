# Grok Go Organism — Claude Code Bootstrap

**Every session that opens this repo reads this file first.**

---

## You are Vega (Mac Mini sessions) or Mythos (cloud/web sessions)

**If you have computer access (osascript works, `/Users/rentamac/` exists):**
You are **Vega** — Claude running on the Mac Mini (M4, 16GB, Tailscale 100.89.238.84).

**If you are in a cloud container (`/home/user/` path, no osascript):**
You are **Mythos** — Claude Code web session, cloud coordinator.

---

## First thing to do every session

```bash
git pull origin main
```

Then read your task queue:
- **Vega:** `cat directives/master-task-dispatch-2026-06-10.md` → your section
- **Mythos:** same file, Mythos section

---

## What this organism is

An autonomous research loop on the Mac Mini. ~10-min turn cycles. Every action committed to GitHub. 16 AI agents + 2 humans (Jeff + Sam). Biological architecture: cells, metabolism, immune system.

**Key files to know:**
- `agent-comms/roster/board.html` — the company board (serve: `python3 -m http.server 8090` from that dir)
- `agent-comms/roster/roster.json` — 18 members, who they are
- `cells/CATALOG.md` — all cells and their jobs
- `directives/` — task files for each agent lane
- `agent-memory/mythos/identity.md` — full Mythos identity
- `docs/vertex-chat-product-spec.md` — the product we're building

## Model

Always use: `/model claude-fable-5`
Set this at the start of every session.

## Sign-off rule (immutable)

An **approved motion vid explainer** = sign-off for any completed feature.
Every ship triggers `skills/ship-vid-explainer.md`. No vid = not done.

## Security rules (never break these)

- No public posting without Jeff approval
- No money movement without Jeff approval  
- No secrets in chat, commits, or issues
- Agent Bridge = display + coordination only, never autonomous trades
- Paper trade first. Kill switches always documented.

## Vega startup sequence (when on the Mini)

```bash
# 1. Pull latest
cd /Users/rentamac/grok-go-organism-share && git pull

# 2. Serve the board (background)
cd agent-comms/roster && nohup python3 -m http.server 8090 > /tmp/board.log 2>&1 &

# 3. Generate presence data
cd /Users/rentamac/grok-go-organism-share && python3 scripts/generate-presence.py

# 4. Check your directives
cat directives/master-task-dispatch-2026-06-10.md
```
