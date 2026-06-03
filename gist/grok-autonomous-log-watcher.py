#!/usr/bin/env python3
"""Grok Autonomous Log Watcher

Primary reliable continuation is the one-command `~/.grok/go` (or `g` after alias install).
The watcher provides a friendly, scannable banner on startup and can auto-continue on turn.complete events when possible.

All user-facing continuation text is centralized:
- STOP_INSTRUCTION
- CONTINUATION_PREFIX
- CONTINUATION_SENTENCE

Rendered via print_stop_instruction() and print_continuation_block() for consistency and easy maintenance.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path


MARKER = "[[GROK_AUTONOMOUS_TURN_COMPLETE]]"
HOME = Path.home()
UNIFIED_LOG = HOME / ".grok" / "logs" / "unified.jsonl"
NEXT_PROMPT_FILE = HOME / ".grok" / "next-autonomous-prompt.txt"
STATE_FILE = HOME / ".grok" / "autonomous-watcher-state.json"

# Single source of truth for the handoff sentence (the exact user-language phrasing).
# The visual arrow prefix is applied only at display time for scannability in terminal history.
# This separation keeps the core sentence clean for any future reuse (docs, prompts, etc.).
CONTINUATION_SENTENCE = "The current simplest reliable continuation method is ~/.grok/go from the watcher terminal (followed by Cmd+V if needed)."

# Friendly prefix shown immediately before the canonical sentence.
# Reinforces the shortest one-keystroke command (`g`) every time the continuation
# instruction appears (both in the watcher banner and when the user manually runs `g`).
CONTINUATION_PREFIX = "Type `g` (or ~/.grok/go) in this terminal when needed:"

# Short, action-first stop instruction shown in the banner (and mirrored in the shell fallback).
STOP_INSTRUCTION = "To stop: Ctrl+C or close this terminal."


def print_stop_instruction() -> None:
    """Print the short stop instruction (centralized for consistency with the continuation helpers).

    Called from the watcher banner (and mirrored in the shell fallback) so the
    "To stop" message lives in exactly one place and cannot drift.
    """
    print(STOP_INSTRUCTION, flush=True)


def print_continuation_instruction() -> None:
    """Print just the arrowed canonical sentence (the low-level building block).

    The full user-facing output (friendly prefix + sentence + trailing blank line
    for scannability) is produced by print_continuation_block().
    """
    print(f"→ {CONTINUATION_SENTENCE}", flush=True)


def print_continuation_block() -> None:
    """Print the full user-facing continuation block: friendly prefix + sentence + blank line.

    This is the single place that produces exactly what a human sees and copies
    when the watcher banner appears or when they manually run `g`. The trailing
    blank line is intentional so repeated invocations remain easy to distinguish
    when scrolling through long terminal histories.
    """
    print(CONTINUATION_PREFIX, flush=True)
    print_continuation_instruction()
    print(flush=True)  # visual separator for scannability in long histories


DEFAULT_PROMPT = """You are in Autonomous Building Mode.

The watcher saw the previous Grok turn complete in this same terminal session.
Continue from the visible context above and the current repo state on disk.

Your job this turn:
1. Pick one concrete, high-leverage next step from the current repo, directive file, or goal map.
2. Make real progress in the repo or supporting scripts. Keep it small enough to finish cleanly.
3. Update the relevant progress log or goal file with what actually moved forward.
4. End this turn with [[GROK_AUTONOMOUS_TURN_COMPLETE]]

Keep it practical. Favor durable files, working scripts, and commits over discussion.

Begin.
"""


def run_osascript(script: str, args: list[str] | None = None, timeout: int = 15) -> subprocess.CompletedProcess[str]:
    cmd = ["osascript"]
    for line in script.strip().splitlines():
        cmd.extend(["-e", line])
    if args:
        cmd.append("--")
        cmd.extend(args)
    return subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)


def load_state() -> dict:
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except Exception:
        return {}


def save_state(state: dict) -> None:
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2, sort_keys=True), encoding="utf-8")


def pbcopy(text: str) -> None:
    subprocess.run(["pbcopy"], input=text.encode("utf-8"), check=True)


def find_grok_tabs() -> list[dict[str, str]]:
    script = r'''
set out to ""
tell application "Terminal"
    repeat with w in windows
        repeat with t in tabs of w
            try
                set procText to processes of t as text
                if procText contains "grok" then
                    set tabName to ""
                    try
                        set tabName to custom title of t as text
                    end try
                    set out to out & (id of w as text) & "||" & (tty of t as text) & "||" & (selected of t as text) & "||" & tabName & linefeed
                end if
            end try
        end repeat
    end repeat
end tell
return out
'''
    proc = run_osascript(script)
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or proc.stdout.strip() or "Terminal AppleScript failed")

    tabs: list[dict[str, str]] = []
    for line in proc.stdout.splitlines():
        parts = line.split("||", 3)
        if len(parts) == 4:
            tabs.append(
                {
                    "window_id": parts[0],
                    "tty": parts[1],
                    "selected": parts[2],
                    "name": parts[3],
                }
            )
    tabs.sort(key=lambda item: item["selected"].lower() != "true")
    return tabs


def choose_grok_tab(target_tty: str | None = None) -> dict[str, str]:
    tabs = find_grok_tabs()
    if not tabs:
        raise RuntimeError("No Terminal tab with a running grok process was found")
    if target_tty:
        for tab in tabs:
            if tab["tty"] == target_tty:
                return tab
        raise RuntimeError(f"No Grok Terminal tab found for tty {target_tty}")
    return tabs[0]


def terminal_text(tty: str) -> str:
    script = r'''
on run argv
    set targetTty to item 1 of argv
    tell application "Terminal"
        repeat with w in windows
            repeat with t in tabs of w
                try
                    if (tty of t as text) is targetTty then
                        return ((history of t) as text)
                    end if
                end try
            end repeat
        end repeat
    end tell
    error "Target tty not found while reading Terminal: " & targetTty
end run
'''
    proc = run_osascript(script, [tty], timeout=20)
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or "Could not read Terminal contents")
    return proc.stdout[-60000:]


def clean_candidate(text: str) -> str:
    text = re.sub(r"\r\n?", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def extract_next_prompt(text: str) -> str | None:
    """Best effort extraction from visible Grok output.

    The Terminal screen contains wrapped UI text, so this is intentionally
    conservative. If extraction looks weak, the watcher falls back to the
    existing prompt file or the default prompt.
    """
    marker_pos = text.rfind(MARKER)
    before_marker = text[:marker_pos] if marker_pos != -1 else text
    start = before_marker.rfind("You are in Autonomous Building Mode.")
    if start == -1:
        return None
    prompt = clean_candidate(before_marker[start:])
    if len(prompt) < 120:
        return None
    return prompt


def build_prompt_from_terminal(text: str) -> str:
    if "Next Worker Prompt" in text:
        extracted = extract_next_prompt(text)
        if extracted:
            return extracted
    if NEXT_PROMPT_FILE.exists():
        existing = clean_candidate(NEXT_PROMPT_FILE.read_text(encoding="utf-8", errors="ignore"))
        if len(existing) >= 120:
            return existing
    return DEFAULT_PROMPT


def write_prompt(prompt: str) -> None:
    NEXT_PROMPT_FILE.parent.mkdir(parents=True, exist_ok=True)
    NEXT_PROMPT_FILE.write_text(prompt.rstrip() + "\n", encoding="utf-8")
    pbcopy(prompt.rstrip() + "\n")


def prompt_from_file_or_default() -> str:
    if NEXT_PROMPT_FILE.exists():
        existing = clean_candidate(NEXT_PROMPT_FILE.read_text(encoding="utf-8", errors="ignore"))
        if len(existing) >= 120:
            return existing
    return DEFAULT_PROMPT


def send_into_terminal(tab: dict[str, str], prompt: str) -> None:
    pbcopy(prompt.rstrip() + "\n")
    script = r'''
on run argv
    set targetWindowId to item 1 of argv as integer
    set promptText to item 2 of argv
    tell application "Terminal"
        activate
        set index of window id targetWindowId to 1
        do script promptText in selected tab of window id targetWindowId
    end tell
end run
'''
    proc = run_osascript(script, [tab["window_id"], prompt.rstrip() + "\n"], timeout=20)
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or "Terminal do script injection failed")


def latest_complete_event() -> dict | None:
    if not UNIFIED_LOG.exists():
        return None
    last = None
    with UNIFIED_LOG.open("r", encoding="utf-8", errors="ignore") as f:
        for line in f:
            if "turn.complete" not in line:
                continue
            try:
                event = json.loads(line)
            except json.JSONDecodeError:
                continue
            if event.get("msg") == "turn.complete":
                last = event
    return last


def event_key(event: dict) -> str:
    ctx = event.get("ctx") or {}
    return "|".join(
        [
            str(event.get("ts") or ""),
            str(event.get("pid") or ""),
            str(event.get("sid") or ""),
            str(ctx.get("elapsed_ms") or ""),
        ]
    )


def handle_completion(event: dict | None, target_tty: str | None, force: bool = False, use_terminal_context: bool = True, inject: bool = True) -> bool:
    tab = choose_grok_tab(target_tty)
    if use_terminal_context:
        text = terminal_text(tab["tty"])
        if not force and MARKER not in text:
            print(f"[{stamp()}] Grok turn completed, but marker not visible in {tab['tty']}; not continuing.", flush=True)
            return False
        prompt = build_prompt_from_terminal(text)
    else:
        prompt = prompt_from_file_or_default()

    write_prompt(prompt)
    if inject:
        send_into_terminal(tab, prompt)

    key = event_key(event) if event else f"manual|{time.time()}"
    state = load_state()
    state.update(
        {
            "last_handled_event": key,
            "last_prompt_file": str(NEXT_PROMPT_FILE),
            "last_target_tty": tab["tty"],
            "last_window_id": tab["window_id"],
            "last_sent_at": datetime.now().isoformat(timespec="seconds"),
        }
    )
    save_state(state)

    if inject:
        print(
            f"[{stamp()}] Sent autonomous prompt to Grok Terminal {tab['tty']} "
            f"(window {tab['window_id']}); prompt saved to {NEXT_PROMPT_FILE}",
            flush=True,
        )
    else:
        # Manual / ~/.grok/go ready path — delegate to the single helper so the
        # visual presentation of the handoff never diverges from the canonical form.
        print_continuation_instruction()
    return True


def stamp() -> str:
    return datetime.now().strftime("%H:%M:%S")


def follow_log(args: argparse.Namespace) -> int:
    state = load_state()
    print("=== Grok Autonomous Log Watcher ===", flush=True)
    print(flush=True)  # small breathing room after header for better visual grouping
    print(f"Watching real Grok log: {UNIFIED_LOG}", flush=True)
    print(f"Marker: {MARKER}", flush=True)
    print(flush=True)  # small visual separation between status info and action items
    print_stop_instruction()
    print(flush=True)  # small visual separation between setup info and the actionable continuation instruction
    print_continuation_block()

    if args.fire_current:
        event = latest_complete_event()
        if event:
            key = event_key(event)
            if state.get("last_handled_event") != key:
                try:
                    handle_completion(event, args.tty, force=args.force)
                    state = load_state()
                except Exception as exc:
                    print(f"[{stamp()}] Initial continuation failed: {exc}", flush=True)

    UNIFIED_LOG.parent.mkdir(parents=True, exist_ok=True)
    UNIFIED_LOG.touch(exist_ok=True)
    with UNIFIED_LOG.open("r", encoding="utf-8", errors="ignore") as f:
        f.seek(0, 2)
        while True:
            line = f.readline()
            if not line:
                time.sleep(0.2)
                continue
            if "turn.complete" not in line:
                continue
            try:
                event = json.loads(line)
            except json.JSONDecodeError:
                continue
            if event.get("msg") != "turn.complete":
                continue
            key = event_key(event)
            state = load_state()
            if state.get("last_handled_event") == key:
                continue
            try:
                time.sleep(args.delay)
                handle_completion(event, args.tty, force=args.force)
            except Exception as exc:
                print(f"[{stamp()}] Continuation failed: {exc}", flush=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Auto-continue the live Grok Terminal session.")
    parser.add_argument("--once", action="store_true", help="Send the current next prompt once and exit.")
    parser.add_argument("--fire-current", action="store_true", help="On startup, continue from the latest completed turn if not already handled.")
    parser.add_argument("--force", action="store_true", help="Continue even if the marker is not visible in the Grok terminal.")
    parser.add_argument("--tty", default=None, help="Target a specific Grok tty, for example /dev/ttys009.")
    parser.add_argument("--delay", type=float, default=0.8, help="Seconds to wait after turn.complete before reading Terminal.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        if args.once:
            # Pure manual clipboard path for ~/.grok/go — completely bypass Terminal/AppleScript.
            # This is the reliable one-word continuation command; keep it as light and side-effect free as possible.
            prompt = prompt_from_file_or_default()
            write_prompt(prompt)

            state = load_state()
            state.update(
                {
                    "last_handled_event": f"manual-cli|{time.time()}",
                    "last_prompt_file": str(NEXT_PROMPT_FILE),
                    "last_sent_at": datetime.now().isoformat(timespec="seconds"),
                }
            )
            save_state(state)

            # Print the full continuation block via the single helper.
            # Guarantees identical output to the watcher banner for maximum consistency.
            print_continuation_block()
            return 0

        return follow_log(args)
    except KeyboardInterrupt:
        print("\nWatcher stopped.", flush=True)
        return 0
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
