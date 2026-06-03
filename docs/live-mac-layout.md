# Live Mac Layout

This share repo is a cleaned export. The live experiment that inspired it was running in a separate local repo.

## Live Paths

- Main working repo: `/Users/rentamac/mining-engine`
- Watcher script: `/Users/rentamac/mining-engine/autonomy/watchers/grok-autonomous-log-watcher.py`
- Grok event stream: `~/.grok/logs/unified.jsonl`
- Next prompt file: `~/.grok/next-autonomous-prompt.txt`
- Watcher state: `~/.grok/autonomous-watcher-state.json`
- Watcher stdout/stderr: `~/.grok/autonomous-watcher.log` and `~/.grok/autonomous-watcher.err.log`
- LaunchAgent: `~/Library/LaunchAgents/com.rentamac.grok-autonomous-watcher.plist`

## What Grok Was Writing

Grok was editing and committing into the `mining-engine` repo. The watcher itself only watched the Grok log, wrote the next prompt file, and injected the next prompt into the same Terminal tab.

Chrome or browser-hosted Grok may mention sandbox paths such as `/home/workdir/artifacts/mining_engine.md`. Treat those as browser-agent workspace paths unless they are explicitly copied into the Mac repo.

## Share Repo Boundary

This repo does not include private logs, credentials, GitHub auth, X cookies, API keys, or the full personal goal corpus. It contains the reusable harness, directives, glossary, and architecture notes.
