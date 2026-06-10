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
| Living dashboard architecture | `~/grok-go-organism-share/docs/dashboard-as-conscious-interface.md` |
| Dashboard + movie production plan | `~/grok-go-organism-share/docs/dashboard-movie-grok-gemini-production-plan.md` |
| Movie creative department ledger | `~/grok-go-organism-share/docs/movie-creative-department-ledger-2026-06-10.md` |
| The Device / Vajra video prompt pack | `~/grok-go-organism-share/docs/the-device-vajra-video-prompt-pack-2026-06-10.md` |
| Grok Chrome creative handoff | `~/grok-go-organism-share/source-artifacts/grok-reports/2026-06-10-grok-chrome-creative-handoff.md` |
| The Device movie-side creative launch mirror | `~/The-Device/production/Creative-Department-Video-Launch-2026-06-10.md` |
| Tonight Meta Cron clip scripts | `~/The-Device/scripts/Tonight-Clip-Scripts-2026-06-10.md` |
| Clip A/B frame shotlist from Grok Terminal | `~/The-Device/production/Clip-A-B-Frame-Shotlist-2026-06-10.md` |
| NotebookLM Meta Cron podcast source pack | `~/The-Device/production/NotebookLM-Meta-Cron-Podcast-Source-2026-06-10.md` |
| Downloads Meta Cron/Vajra harvest map | `~/The-Device/production/Downloads-Meta-Cron-Vajra-Harvest-2026-06-10.md` |
| Vega Creative Director pass | `~/The-Device/production/Vega-Creative-Director-Pass-2026-06-10.md` |
| Dashboard/movie X drafts | `~/grok-go-organism-share/docs/x-posts-dashboard-movie-grok-gemini-2026-06-09.md` |
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
