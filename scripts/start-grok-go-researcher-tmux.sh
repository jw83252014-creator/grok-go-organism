#!/bin/bash
# Create a researcher-wrapped tmux layout for a Grok Go restart.

set -euo pipefail

SESSION="${1:-grok-go-researcher}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
SHARE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RECEIPT_DIR="$HOME/.grok/researcher-receipts"
PANE_LOG_DIR="$RECEIPT_DIR/${STAMP}-tmux-pane-logs"

mkdir -p "$PANE_LOG_DIR"

if tmux has-session -t "$SESSION" 2>/dev/null; then
  echo "Session already exists: $SESSION"
  echo "Attach with: tmux attach -t $SESSION"
  exit 0
fi

PREFLIGHT="$("$SHARE_DIR/scripts/grok-go-preflight-receipt.sh")"

tmux new-session -d -s "$SESSION" -n "grok-go" -c "$SHARE_DIR" \
  "echo 'Researcher pane'; echo 'Preflight: $PREFLIGHT'; echo; echo 'Tailing Grok and watcher logs read-only.'; tail -n 40 -F \"$HOME/.grok/logs/unified.jsonl\" \"$HOME/.grok/autonomous-watcher.log\""

tmux split-window -h -t "$SESSION:0" -c "$SHARE_DIR" \
  "echo 'Watcher pane'; echo; echo 'Start watcher when ready:'; echo './scripts/start-watcher.sh'; echo; exec \"$SHELL\" -l"

tmux split-window -v -t "$SESSION:0.1" -c "$HOME/mining-engine" \
  "echo 'Grok worker pane'; echo; echo 'Start Grok CLI / Grok Build here manually.'; echo 'Then use directive:'; echo '$SHARE_DIR/directives/grok-go-restart-researcher-wrapper.md'; echo; exec \"$SHELL\" -l"

tmux select-layout -t "$SESSION:0" tiled >/dev/null
tmux pipe-pane -o -t "$SESSION:0.0" "cat >> '$PANE_LOG_DIR/researcher-pane.log'"
tmux pipe-pane -o -t "$SESSION:0.1" "cat >> '$PANE_LOG_DIR/watcher-pane.log'"
tmux pipe-pane -o -t "$SESSION:0.2" "cat >> '$PANE_LOG_DIR/grok-worker-pane.log'"

echo "Created tmux session: $SESSION"
echo "Preflight receipt: $PREFLIGHT"
echo "Pane logs: $PANE_LOG_DIR"
echo "Attach with: tmux attach -t $SESSION"

