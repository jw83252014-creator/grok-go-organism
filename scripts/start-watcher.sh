#!/bin/bash
# Easy launcher for the Grok autonomous log watcher.
# Run this in a separate terminal while your main Grok worker session is running.

set -e

echo "=== Grok Autonomous Log Watcher Launcher ==="
echo

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WATCHER_SCRIPT="$PROJECT_DIR/scripts/grok-autonomous-log-watcher.py"
LOG_FILE="$HOME/.grok/logs/unified.jsonl"

mkdir -p "$(dirname "$LOG_FILE")"

echo "Project dir:       $PROJECT_DIR"
echo "Watcher script:    $WATCHER_SCRIPT"
echo "Grok event log:    $LOG_FILE"
echo

if [ ! -f "$WATCHER_SCRIPT" ]; then
    echo "ERROR: Watcher script not found at $WATCHER_SCRIPT"
    exit 1
fi

echo "How to use:"
echo "1. Keep your existing Grok terminal open. No script/current-worker.log wrapper is needed."
echo ""
echo "2. This watcher reads the real Grok log:"
echo "   $LOG_FILE"
echo ""
echo "3. When Grok logs turn.complete, the watcher finds the Terminal tab running grok,"
echo "   copies the next prompt to ~/.grok/next-autonomous-prompt.txt, then pastes it"
echo "   back into that same Grok tab."
echo ""
echo "CRITICAL: For typing to work, you MUST grant Accessibility permission:"
echo "   System Settings → Privacy & Security → Accessibility"
echo "   Turn ON the toggle for Terminal."
echo ""
echo "To STOP the watcher at any time: just press Ctrl+C in this terminal, or close the window."
echo "Closing this terminal stops the loop cleanly. No background process will keep running."
echo ""
echo "Press Enter to start the watcher now, or Ctrl+C to cancel."
read -r

echo "Starting watcher... (Ctrl+C to stop at any time)"
echo "-----------------------------------------------"
python3 "$WATCHER_SCRIPT"
