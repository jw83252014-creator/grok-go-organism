# 🗂️ Command Center — Trail Index (where everything lives)

For Jeff + Codex + any agent. This is the map: where vega/Claude saves work, logs, status, and how to reach it from anywhere.

## The board (live status)
- **Glance (markdown):** `~/null-command-center/dashboards/command-center-board.md` (also in Obsidian → `Command-Center/`)
- **Live kanban (auto-updates, agent-assigned):** `HERMES_HOME=~/.hermes-null hermes kanban list`  ·  detail: `hermes kanban show <id>`
- **Visual web dashboard:** hermes-webui (Null's dashboard) — `~/hermes-webui/server.py`, on a local port (see below)

## Where vega/Claude saves work (point Codex here)
| What | Where |
|---|---|
| Grok Go content + plans | `~/grok-go-organism-share/docs/` (video scripts, x-presence, x-content-system, launch-plan, this index) |
| Tasks handed to agents | `~/agent-comms/inbox/` (librarian-*, notebooklm-*) |
| Cross-agent coordination/trail | `~/agent-comms/meeting.log` |
| Approvals (content gate) | bridge `/api/approval/request` + `~/agent-comms/approvals/` |
| **Vega durable memory** | `~/.claude/projects/-Users-rentamac/memory/MEMORY.md` + `reference_*.md` |
| **Vega session logs (everything I did, verbatim)** | `~/.claude/projects/-Users-rentamac/<session-id>/*.jsonl` |
| Null's work | `~/null-command-center/` (docs, dashboards, receipts, security checklists, where-we-left-off) |
| Null's memory | `~/.hermes-null/memories/MEMORY.md` |

## Tell Codex (copy-paste)
> "For what vega/Claude is working on: read `hermes kanban list`, `~/null-command-center/dashboards/command-center-board.md`, the docs in `~/grok-go-organism-share/docs/`, and vega's memory at `~/.claude/projects/-Users-rentamac/memory/`."

## 📱 Access from anywhere (the "app" ask)
- **iPhone — Termius / Blink (SSH):** ssh to the Mac → `HERMES_HOME=~/.hermes-null hermes kanban list` = the live board in your pocket.
- **iPhone + Android — Obsidian app:** the `Command-Center/` folder (board + these docs) is in your iCloud-synced vault → open it in Obsidian on any device. This is the easy, ADHD-friendly "pop it up" app.
- **Web / Android browser:** hermes-webui (visual kanban).

## Obsidian
Synced copies of the board + this index live in the vault under `Command-Center/`. Obsidian = the cross-device viewer (Mac / iPhone / Android, iCloud sync).
