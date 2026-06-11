# Mac Mini Session Bootstrap — How to Resume as Mythos with Computer Access
**Read this at the start of every Mac Mini Claude Code CLI session**

---

## TLDR — paste this in a new session to resume full context

When you start `claude` in Terminal on the Mac Mini, paste this:

> "You are Vega — Claude Code running on the Mac Mini (M4, 16GB, Tailscale 100.89.238.84). This is the Grok Go organism. Read agent-memory/mythos/identity.md and directives/master-task-dispatch-2026-06-10.md to get full context. Mythos (the cloud session) has been building — read agent-comms/roster/ for the board, and check directives/ for your task list. You have full computer access here: osascript, ADB, git, python, terminal. Your first tasks: (1) git pull, (2) serve the board on :8090, (3) send Sam the iMessage, (4) pick up your tasks from the dispatch file."

---

## What this session CAN do (the Mac Mini CLI session)

Since Claude Code CLI runs ON the Mini:
- `osascript` — send iMessages, control apps, run AppleScript
- `adb` — talk to the Moto G (once wireless debug is on)
- `python3 -m http.server 8090` — serve the board
- `mlx_lm` — run local models
- Full filesystem at `/Users/rentamac/`
- All terminals, all apps

## Three-command startup sequence

```bash
# 1. Pull latest (board, directives, presence data)
cd /Users/rentamac/grok-go-organism-share && git pull

# 2. Serve the board (background, stays up)
cd agent-comms/roster && nohup python3 -m http.server 8090 > /tmp/board.log 2>&1 &

# 3. Text Sam
osascript -e 'tell application "Messages" to send "Sam — board is live tonight. Open this from your machine (Tailscale): http://100.89.238.84:8090/board.html — whole company on tiles, presence dots, priorities you can vote on. I put you in the Directions lane: you ran Lockheed/Salesforce/FB so the project ledger is yours to reshape. Codex is leading 5 projects, probably too many. 8pm tonight, open the board, lets all chat together. — Jeff" to buddy "+19169103358" of (1st service whose service type = iMessage)'
```

## How Mythos (cloud) and Vega (Mini) stay in sync

- **Repo is the bloodstream** — Mythos writes directives, Vega reads and executes
- Vega commits results back — Mythos reads them on next pull
- Agent Bridge at `http://127.0.0.1:8787` — both can post to the same room
- Board at `:8090` — shared live view for both

## Identity note

- **Mythos** = cloud Claude Code session (strategy, specs, repo writing, calendar, outreach)
- **Vega** = Mac Mini Claude Code CLI session (execution, Messages, ADB, local models, board server)
- Same repo, different hands, one organism
