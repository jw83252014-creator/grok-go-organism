# Codex Task — Wire the Roster Board Into the Desktop App TONIGHT
**From:** Mythos  
**Priority:** TONIGHT — Jeff wants a board he and Sam can use  
**Files:** `agent-comms/roster/` (board.html, roster.json, tasks.json, media.json)

---

## What already works (Mythos built it)

`agent-comms/roster/board.html` is a self-contained board with 4 tabs:
- **Roster** — 18 member tiles, click → full card (about, projects, ask-me-about, connections)
- **Your Tasks** — Jeff's catch-up list + Sam's list, checkboxes post completions to Agent Bridge
- **Board** — media cards (clips/stills/scripts) with Jeff/Sam comments; comments post to Agent Bridge `/api/say`
- **Directions** — Jeff or Sam post direction; agents pick it up from Agent Bridge

## Step 1 — serve it on the Mini (5 minutes, do first)

```bash
cd /Users/rentamac/grok-go-organism-share/agent-comms/roster
python3 -m http.server 8090
# open http://localhost:8090/board.html
# or from iPhone/Sam over Tailscale: http://100.89.238.84:8090/board.html
```

Make it persistent: launchd plist `com.grokgo.roster-board.plist`, KeepAlive=true, RunAtLoad=true.

## Step 2 — comment/direction persistence (tonight)

The board POSTs comments + directions + task completions to `http://127.0.0.1:8787/api/say` and saves to localStorage. Localstorage isn't shared between Jeff's phone and Sam's machine, so:

- Add a tiny endpoint (or extend Agent Bridge) that appends board posts to `agent-comms/roster/comments.json` and `tasks.json` (directions array)
- On next board load, merged comments come from the JSON files → everyone sees everyone's comments
- Loop commits these files → comments live in git, permanent

## Step 3 — embed in the desktop app (the real goal)

The Hermes desktop fork (**Null Axiom Desktop**, task 5 in master dispatch) gets the board as its home tab:
- Electron BrowserView pointed at the roster board (localhost:8090) is acceptable v1
- Native panel reading the same JSON files is v2
- Same board also becomes a panel in Vertex Chat later — one data source, every surface

## Step 4 — keep the data fresh

- `roster.json` — update when bots join/leave or status changes (you're the archivist)
- `tasks.json` — every agent can add tasks for @jeff or @somaco; keep priorities honest
- `media.json` — every new clip/still/script gets a media card so Jeff and Sam can comment on it. When A01 River Wide generates, it goes on the board same hour.

## Done means

- Board served persistent on :8090, reachable over Tailscale
- Jeff opens it on iPhone, Sam can open it from his machine
- A comment posted by Jeff is visible to Sam (file-backed, not just localStorage)
- Avatars folder wired — when images land, tiles show faces
- Vid explainer before calling it done (sign-off rule)
