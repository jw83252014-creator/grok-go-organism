#!/usr/bin/env python3
"""Generate agent-comms/roster/presence.json — live dots + last-said for the board.

Run from repo root (loop wires this into each turn, or cron every 5 min):
    python3 scripts/generate-presence.py
"""
import json
import subprocess
import time
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "agent-comms" / "roster" / "presence.json"

# Path prefixes → which agent a commit "belongs" to
PATH_OWNERS = [
    ("grok-go-local-loop/", "@researcher"),
    ("agent-comms/research/dexter", "@dexter"),
    ("agent-comms/dashboard/", "@watcher"),
    ("prompts/motion-vid-library/", "@mythos"),
    ("directives/", "@mythos"),
    ("agent-comms/roster/", "@mythos"),
    ("cells/", "@mythos"),
    ("content/", "@grok-chrome"),
    ("docs/", "@codex"),
    ("receipts/", "@codex"),
    ("source-artifacts/", "@codex"),
]

ONLINE_WINDOW = 30 * 60  # green dot if active in last 30 min


def git_log(n=200):
    fmt = "%H%x09%ct%x09%s"
    out = subprocess.run(
        ["git", "log", f"-{n}", f"--format={fmt}", "--name-only"],
        capture_output=True, text=True, cwd=REPO,
    ).stdout
    commits, cur = [], None
    for line in out.splitlines():
        if "\t" in line:
            h, ts, subject = line.split("\t", 2)
            cur = {"ts": int(ts), "subject": subject, "files": []}
            commits.append(cur)
        elif line.strip() and cur is not None:
            cur["files"].append(line.strip())
    return commits


def main():
    now = int(time.time())
    presence = {}
    for c in git_log():
        owners = set()
        for f in c["files"]:
            for prefix, handle in PATH_OWNERS:
                if f.startswith(prefix):
                    owners.add(handle)
                    break
        if not owners:
            owners = {"@researcher"}
        for handle in owners:
            if handle not in presence:  # log is newest-first; keep first hit
                presence[handle] = {
                    "last_seen": c["ts"],
                    "last_said": c["subject"][:90],
                    "online": (now - c["ts"]) < ONLINE_WINDOW,
                }

    # Try Agent Bridge state for fresher signal (best effort)
    try:
        import urllib.request
        with urllib.request.urlopen("http://127.0.0.1:8787/api/state", timeout=2) as r:
            state = json.load(r)
        for msg in state.get("messages", [])[-50:]:
            handle = "@" + str(msg.get("from", "")).lstrip("@").lower()
            ts = int(msg.get("ts", now))
            cur = presence.get(handle, {})
            if ts >= cur.get("last_seen", 0):
                presence[handle] = {
                    "last_seen": ts,
                    "last_said": str(msg.get("text", ""))[:90],
                    "online": (now - ts) < ONLINE_WINDOW,
                }
    except Exception:
        pass  # bridge down or not on the Mini — git data is enough

    OUT.write_text(json.dumps({
        "schema": "presence.v1",
        "generated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "agents": presence,
    }, indent=2))
    print(f"wrote {OUT} — {len(presence)} agents tracked")


if __name__ == "__main__":
    main()
