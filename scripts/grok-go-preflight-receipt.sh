#!/bin/bash
# Write a pre-restart receipt before launching Grok Go.

set -u

STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
RECEIPT_DIR="$HOME/.grok/researcher-receipts"
RECEIPT="$RECEIPT_DIR/${STAMP}-grok-go-preflight.md"
SHARE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LIVE_REPO="$HOME/mining-engine"
DIRECTIVE="$SHARE_DIR/directives/grok-go-restart-researcher-wrapper.md"
GROK_LOG="$HOME/.grok/logs/unified.jsonl"
WATCHER_LOG="$HOME/.grok/autonomous-watcher.log"
PROMPT_FILE="$HOME/.grok/next-autonomous-prompt.txt"

mkdir -p "$RECEIPT_DIR"

append_cmd() {
  local title="$1"
  shift
  {
    echo
    echo "## $title"
    echo
    echo '```text'
    "$@" 2>&1 || true
    echo '```'
  } >> "$RECEIPT"
}

{
  echo "# Grok Go Preflight Receipt"
  echo
  echo "- timestamp_utc: $STAMP"
  echo "- host: $(hostname)"
  echo "- user: $(whoami)"
  echo "- share_dir: $SHARE_DIR"
  echo "- live_repo: $LIVE_REPO"
  echo "- grok_log: $GROK_LOG"
  echo "- watcher_log: $WATCHER_LOG"
  echo "- prompt_file: $PROMPT_FILE"
  echo "- directive: $DIRECTIVE"
  if [ -f "$DIRECTIVE" ]; then
    echo "- directive_sha256: $(shasum -a 256 "$DIRECTIVE" | awk '{print $1}')"
  else
    echo "- directive_sha256: missing"
  fi
} > "$RECEIPT"

append_cmd "Tooling" bash -lc 'command -v tmux; tmux -V; command -v script; command -v grok || true; command -v rtk || true'
append_cmd "Share Repo Git Status" git -C "$SHARE_DIR" status --short
append_cmd "Share Repo Latest Commit" git -C "$SHARE_DIR" log -1 --oneline
if [ -d "$LIVE_REPO/.git" ]; then
  append_cmd "Live Mining Engine Git Status" git -C "$LIVE_REPO" status --short
  append_cmd "Live Mining Engine Latest Commit" git -C "$LIVE_REPO" log -1 --oneline
fi
append_cmd "Grok And Watcher Processes" bash -lc "pids=\$(pgrep -f 'grok|grok-autonomous|autonomous-watcher|grok-go' | paste -sd, -); [ -n \"\$pids\" ] && ps -p \"\$pids\" -o pid,ppid,etime,command || true"
append_cmd "Relevant Listening Ports" bash -lc "lsof -nP -iTCP -sTCP:LISTEN | egrep '8787|3001|8080|8000|5173|3000' || true"
append_cmd "Grok Log Tail" bash -lc "[ -f '$GROK_LOG' ] && tail -n 20 '$GROK_LOG' | sed -E 's/\"(sent_key_prefix|current_key_prefix|disk_key_prefix|rt_prefix|key_prefix|old_key_prefix|new_key_prefix)\":\"[^\"]+\"/\"\\1\":\"[REDACTED]\"/g' || echo missing"
append_cmd "Watcher Log Tail" bash -lc "[ -f '$WATCHER_LOG' ] && tail -n 40 '$WATCHER_LOG' || echo missing"
append_cmd "Prompt File Metadata" bash -lc "[ -f '$PROMPT_FILE' ] && ls -lah '$PROMPT_FILE' && shasum -a 256 '$PROMPT_FILE' || echo missing"
append_cmd "Directive Preview" bash -lc "[ -f '$DIRECTIVE' ] && sed -n '1,180p' '$DIRECTIVE' || echo missing"

echo "$RECEIPT"
