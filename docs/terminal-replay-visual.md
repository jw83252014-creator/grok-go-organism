# Terminal Replay Visual

The public terrarium should show the terminal as a small replay, not as a live raw screen recording.

## Why Replay Instead Of Raw Screen Recording

Raw terminal video can leak:

- account paths and usernames
- auth events
- local repo names that are not meant to be public
- prompts, private notes, or API-adjacent metadata
- unrelated windows if focus changes

A replay generated from logs is safer and more useful. It lets the viewer see the loop breathing without exposing private state.

## What To Show

The corner terminal should show only sanitized operational signals:

```text
[grok] turn.complete ok=true elapsed=26.0s
[watcher] marker detected
[watcher] wrote ~/.grok/next-autonomous-prompt.txt
[watcher] sent next prompt to Grok terminal
[git] committed autonomous turn
[immune] polishing-loop risk detected
[researcher] paper/source pack queued
```

That is enough to communicate the mechanism:

1. Grok finishes.
2. Watcher sees the marker.
3. Watcher writes/sends the next prompt.
4. Grok edits files and commits.
5. Researcher/Watcher records what happened.

## Visual Placement

Use a compact terminal panel:

- bottom-left on large desktop only
- hidden on tablet/mobile
- no more than 320 px wide
- 6 to 8 lines visible
- semi-transparent black
- small monospace type
- labeled `sanitized replay`

Do not place it on top of the organism core or the main telemetry graphs.

## Local Log Inputs

Useful local sources:

```text
~/.grok/logs/unified.jsonl
~/.grok/autonomous-watcher.log
/Users/rentamac/mining-engine/autonomy/turns/
/Users/rentamac/mining-engine/research-sources/
```

The public app should never read these directly. A local script should create a sanitized replay artifact first.

## Safe Output Options

1. HTML snippet
   - Best for embedding in the website.

2. Markdown transcript
   - Best for research paper appendices and NotebookLM source packs.

3. Video/GIF generated from sanitized text
   - Best for X posts.

4. Actual screen recording
   - Best only for private archival evidence after manual review/redaction.

## Rule

For public sharing, prefer generated replay over raw capture.
