#!/usr/bin/env python3
"""Build a sanitized terminal replay from Grok Go logs.

This script is intentionally conservative. It extracts operational signals from
local logs, redacts local/private details, and writes either Markdown or HTML.
It does not expose raw prompt text or auth fields.
"""

from __future__ import annotations

import argparse
import html
import json
import re
from pathlib import Path
from typing import Iterable


DEFAULT_LOG = Path.home() / ".grok" / "logs" / "unified.jsonl"
DEFAULT_WATCHER_LOG = Path.home() / ".grok" / "autonomous-watcher.log"

KEEP_PATTERNS = (
    "turn.complete",
    "Sent autonomous prompt",
    "Auto-sent",
    "marker",
    "Marker:",
    "GROK_AUTONOMOUS_TURN_COMPLETE",
    "commit",
    "pushed",
    "watcher",
    "error",
)

DROP_PATTERNS = (
    "auth",
    "auth.json",
    "AuthManager",
    "GROK_AUTH",
    "token",
    "secret",
    "password",
    "cookie",
    "credential",
)


def sanitize(text: str) -> str:
    text = re.sub(r"/Users/[^/\s\"']+", "~", text)
    text = text.replace(str(Path.home()), "~")
    text = re.sub(r"https://auth\.x\.ai::[A-Za-z0-9-]+", "[auth-scope]", text)
    text = re.sub(r"\b100\.(?:\d{1,3}\.){2}\d{1,3}\b", "[tailnet-ip]", text)
    text = re.sub(r"\b[A-Fa-f0-9]{32,}\b", "[hex-redacted]", text)
    text = re.sub(
        r"\b[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}\b",
        "[id]",
        text,
    )
    text = re.sub(r"Bearer\s+[A-Za-z0-9._~+/=-]+", "Bearer [redacted]", text)
    text = re.sub(r"(api[_-]?key|token|secret|password)[=:]\S+", r"\1=[redacted]", text, flags=re.I)
    return text.strip()


def useful(text: str) -> bool:
    lower = text.lower()
    if any(pattern.lower() in lower for pattern in DROP_PATTERNS):
        return False
    return any(pattern.lower() in lower for pattern in KEEP_PATTERNS)


def read_unified(path: Path) -> Iterable[str]:
    if not path.exists():
        return
    with path.open("r", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                payload = json.loads(line)
            except json.JSONDecodeError:
                if useful(line):
                    yield sanitize(line)
                continue

            msg = str(payload.get("msg", ""))
            if not useful(msg):
                continue

            ts = str(payload.get("ts", ""))[11:19] or "--:--:--"
            src = str(payload.get("src", "grok"))
            ctx = payload.get("ctx") if isinstance(payload.get("ctx"), dict) else {}

            if msg == "turn.complete":
                elapsed = ctx.get("elapsed_ms")
                ok = ctx.get("ok")
                elapsed_s = f"{int(elapsed) / 1000:.1f}s" if isinstance(elapsed, int) else "unknown"
                yield sanitize(f"[{ts}] {src}: turn.complete ok={ok} elapsed={elapsed_s}")
            else:
                yield sanitize(f"[{ts}] {src}: {msg}")


def read_watcher(path: Path) -> Iterable[str]:
    if not path.exists():
        return
    with path.open("r", encoding="utf-8", errors="replace") as handle:
        for line in handle:
            line = line.strip()
            if useful(line):
                yield sanitize(f"[watcher] {line}")


def dedupe_keep_order(lines: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for line in lines:
        compact = re.sub(r"\[\d\d:\d\d:\d\d\]", "[time]", line)
        if compact in seen:
            continue
        seen.add(compact)
        out.append(line)
    return out


def write_markdown(lines: list[str], output: Path) -> None:
    body = "\n".join(lines)
    output.write_text(
        "# Sanitized Grok Go Terminal Replay\n\n"
        "Generated from local logs after redaction. Review before public use.\n\n"
        "```text\n"
        f"{body}\n"
        "```\n",
        encoding="utf-8",
    )


def write_html(lines: list[str], output: Path) -> None:
    rows = "\n".join(f"<div>{html.escape(line)}</div>" for line in lines)
    output.write_text(
        "<!doctype html>\n"
        "<meta charset=\"utf-8\">\n"
        "<title>Grok Go Sanitized Terminal Replay</title>\n"
        "<style>\n"
        "body{margin:0;background:#020409;color:#dffbff;font:13px ui-monospace,SFMono-Regular,Menlo,monospace;}\n"
        ".terminal{max-width:760px;margin:24px auto;padding:16px;border:1px solid rgba(34,211,238,.25);background:rgba(0,0,0,.76);box-shadow:0 0 30px rgba(34,211,238,.12);}\n"
        ".title{color:#67e8f9;margin-bottom:12px;font-weight:700;}\n"
        ".line{white-space:pre-wrap;line-height:1.45;}\n"
        "</style>\n"
        "<main class=\"terminal\">\n"
        "<div class=\"title\">Grok Go - sanitized terminal replay</div>\n"
        f"<div class=\"line\">{rows}</div>\n"
        "</main>\n",
        encoding="utf-8",
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--log", type=Path, default=DEFAULT_LOG)
    parser.add_argument("--watcher-log", type=Path, default=DEFAULT_WATCHER_LOG)
    parser.add_argument("--output", type=Path, default=Path("sanitized-grok-terminal-replay.md"))
    parser.add_argument("--format", choices=("md", "html"), default="md")
    parser.add_argument("--limit", type=int, default=120)
    args = parser.parse_args()

    lines = dedupe_keep_order([*read_unified(args.log), *read_watcher(args.watcher_log)])
    if args.limit > 0:
        lines = lines[-args.limit :]
    if not lines:
        lines = ["[system] no replay lines matched the safe extraction filters"]

    args.output.parent.mkdir(parents=True, exist_ok=True)
    if args.format == "html":
        write_html(lines, args.output)
    else:
        write_markdown(lines, args.output)
    print(f"wrote {args.output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
