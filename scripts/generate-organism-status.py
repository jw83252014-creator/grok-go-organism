#!/usr/bin/env python3
"""Generate the organism status JSON + phone-first Easy List.

Implements steps 1-3 of the near-term build plan in
docs/dashboard-as-conscious-interface.md:

  1. Put the real NEXT-7-DAYS items on the Easy List.
  2. Generate a private organism-status markdown from current repo state.
  3. Emit a small structured JSON status file with cells, metabolism,
     watcher, memory, approvals, and blockers.

Reads only files inside the repo. Writes to agent-comms/dashboard/.
Read-only with respect to the organism: this script observes, it does
not act. Every panel it feeds is a bounded cell per the design rule.

Usage:
    python3 scripts/generate-organism-status.py
"""

import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OUT_DIR = REPO / "agent-comms" / "dashboard"

CELL_FILES = {
    "Intelligence Forager": "cells/intelligence-forager-cell.md",
    "Funding Forager (BitHawk)": "cells/funding-forager-cell.md",
    "Project Manager": "cells/project-manager-cell.md",
    "Metabolism Checker": "cells/metabolism-checker-cell.md",
    "Revenue Research": "cells/revenue-research-cell.md",
    "Security": "cells/security-cells.md",
}

FUNDING_APPS = [
    "Emergent Ventures ($5K-$50K+, broadest fit — submit first)",
    "OpenAI Researcher Access (up to $1K credits)",
    "AWS Activate Founders (~$5K)",
    "MS Founders Hub (up to $150K Azure)",
    "Google for Startups (up to $350K)",
    "Anthropic AI-for-Science (~$20K API credits)",
    "NVIDIA Inception (partner credits)",
]


def read(rel):
    p = REPO / rel
    return p.read_text(encoding="utf-8", errors="replace") if p.exists() else ""


def git(*args):
    try:
        return subprocess.run(
            ["git", *args], cwd=REPO, capture_output=True, text=True, timeout=30
        ).stdout.strip()
    except Exception:
        return ""


def latest_loop_turn():
    turns = sorted((REPO / "grok-go-local-loop").glob("turn-*.md"))
    if not turns:
        return None, None
    latest = turns[-1]
    stamp = latest.stem.replace("turn-", "")
    return latest.name, stamp


def metabolic_state():
    metab = read("grok-go-local-loop/METABOLISM.md")
    for emoji, name in [("🔴", "STARVING"), ("🟠", "FORAGING"),
                        ("🟡", "HUNGRY"), ("🟢", "SATED")]:
        if emoji in metab:
            return name
    # Fall back to the assumption documented in NEXT-7-DAYS
    return "HUNGRY/FORAGING (assumed — Metabolism Checker not yet live)"


def current_move():
    state = read("grok-go-local-loop/STATE.md")
    m = re.search(r"Next: ([^.]+\.?)", state)
    return m.group(1).strip() if m else "unknown — check STATE.md"


def build_status():
    turn_file, turn_stamp = latest_loop_turn()
    last_commit = git("log", "origin/main", "-1", "--format=%h %ad %s",
                      "--date=format:%Y-%m-%d %H:%M")

    cells = []
    for name, rel in CELL_FILES.items():
        spec_exists = (REPO / rel).exists()
        cells.append({
            "name": name,
            "spec": rel,
            "status": "spec-defined" if spec_exists else "missing",
            "runnable": False,  # flips true when its local script lands
        })

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "schema_version": 1,
        "organism": "Grok Go",
        "vessel": "Champion Fencing LLC (GA)",
        "metabolic_state": metabolic_state(),
        "loop": {
            "latest_turn_file": turn_file,
            "latest_turn_stamp": turn_stamp,
            "last_main_commit": last_commit,
            "current_move": current_move(),
        },
        "cells": cells,
        "watcher": {
            "status": "unknown-from-cloud",
            "note": "Bridge health only visible from the Mac mini; "
                    "run scripts/start-watcher.sh status locally.",
        },
        "approvals_pending": {
            "funding_applications": FUNDING_APPS,
            "other": [
                "Grab free Gemini/Groq/GitHub API keys",
                "Confirm OpenAI free-token eligibility on sandbox project",
                "Install Tampermonkey X export script",
                "Add X-Bridge-Token auth before widening Tailscale access",
            ],
        },
        "blockers": [
            "Command Center + Midspace unreachable from outside Tailscale "
            "(check Mini awake + tailscale up)",
            "Metabolism Checker cell not yet runnable (Day 1 item)",
        ],
        "memory": {
            "turn_files": len(list((REPO / "grok-go-local-loop").glob("turn-*.md"))),
            "docs": len(list((REPO / "docs").glob("*.md"))),
            "cells_defined": len(cells),
        },
    }


def render_easy_list(status):
    lines = [
        "# 📱 Easy List — one thing at a time",
        "",
        f"*Generated {status['generated_at']} by scripts/generate-organism-status.py*",
        f"*Metabolic state: {status['metabolic_state']}*",
        "",
        "## 🎯 Do this one first",
        "",
        "- [ ] Submit **Emergent Ventures** application (packet is drafted, "
        "broadest fit, ~15 min)",
        "",
        "## 💰 Then these (one per day is fine)",
        "",
    ]
    for app in status["approvals_pending"]["funding_applications"][1:]:
        lines.append(f"- [ ] Submit {app}")
    lines += ["", "## 🔑 Quick unlocks (5 min each)", ""]
    for item in status["approvals_pending"]["other"]:
        lines.append(f"- [ ] {item}")
    lines += [
        "",
        "## 🤖 The organism handles these (no action needed)",
        "",
        f"- Loop current move: {status['loop']['current_move']}",
        f"- Latest turn: {status['loop']['latest_turn_file']}",
        f"- Last commit on main: {status['loop']['last_main_commit']}",
        "",
        "## 🚧 Blockers",
        "",
    ]
    for b in status["blockers"]:
        lines.append(f"- {b}")
    lines.append("")
    return "\n".join(lines)


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    status = build_status()
    (OUT_DIR / "organism-status.json").write_text(
        json.dumps(status, indent=2) + "\n", encoding="utf-8")
    (OUT_DIR / "EASY-LIST.md").write_text(render_easy_list(status),
                                          encoding="utf-8")
    print(f"wrote {OUT_DIR / 'organism-status.json'}")
    print(f"wrote {OUT_DIR / 'EASY-LIST.md'}")


if __name__ == "__main__":
    main()
