# Grok Go Organism

Grok Go is a small autonomous-loop experiment for turning a terminal-based AI agent into a persistent build cell.

It is not AGI. It is a harness:

1. Grok finishes a turn.
2. Grok logs `turn.complete`.
3. A watcher sees the event.
4. The watcher writes the next prompt to `~/.grok/next-autonomous-prompt.txt`.
5. The watcher sends that prompt back into the same Grok terminal tab.
6. Grok edits files, commits to git, prints a completion marker, and the loop continues.

The useful framing is biological:

- Genome: directive files and prompts
- Metabolism: API credits and compute
- Memory: git, markdown, and structured notes
- Senses: logs, files, browser context, APIs
- Signaling: Agent Bridge / shared message layer
- Immune system: watcher, safety rules, budget checks, pause/kill switch
- Differentiation: specialized cells such as Builder, Explorer, Watcher, Forecasting, Memory

## Repository Layout

```text
scripts/
  grok-autonomous-log-watcher.py   # main event-driven watcher
  start-watcher.sh                 # foreground launcher
  force-next-turn.sh               # one-shot continuation helper

launchd/
  com.example.grok-autonomous-watcher.plist

directives/
  base-genome.md
  personal-organism.md
  clean-room-organism.md
  cell-types.md

docs/
  architecture.md
  glossary.md
  safety.md
  x-context-ingestion.md
  caveman-explainer.md
  live-mac-layout.md
  public-framing.md
```

## Current Status

The live Mac mini version proved the loop can run hands-off by targeting the Grok Terminal tab directly. The first failure mode was focus-based clipboard paste. The working path uses Terminal AppleScript `do script` against the Grok tab.

The first emergent failure mode was also clear: without a better genome, the loop spent too many turns polishing its own continuation scripts instead of attacking larger goals.

The next step is multi-cell structure:

- Builder Cell: advances concrete goals
- Explorer Cell: discovers new directions and architectures
- Watcher Cell: immune system, loop health, budget, guardrails

## Quick Start

This package is a shareable skeleton. Paths are currently written for macOS Terminal and Grok CLI.

1. Install and authenticate Grok CLI.
2. Start a normal Grok Terminal session.
3. Start the watcher:

```bash
./scripts/start-watcher.sh
```

4. To force one continuation:

```bash
./scripts/force-next-turn.sh
```

5. For background launch on macOS, adapt:

```text
launchd/com.example.grok-autonomous-watcher.plist
```

The launchd plist is intentionally an example. Replace `/Users/YOUR_USER/path/to/grok-go-organism-share` before loading it.

## Live System Notes

The original live loop was writing into a separate local repo, not this share package:

- Live repo: `/Users/rentamac/mining-engine`
- Live Grok log: `~/.grok/logs/unified.jsonl`
- Live prompt handoff: `~/.grok/next-autonomous-prompt.txt`

See `docs/live-mac-layout.md` for the full map.

## Safety Note

Do not connect money, trading, infrastructure, external posting, or credential-changing actions to this loop without a separate approval layer and hard risk limits.

Paper trade first. Log everything. Make pause/kill switches boring and reliable.

## License / Sharing

This is a private share package unless Jeff explicitly publishes it under an open-source license.
