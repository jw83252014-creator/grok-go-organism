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

## Public Links

- Website: https://grok-go.vercel.app
- GitHub: https://github.com/jw83252014-creator/grok-go-organism
- YouTube: https://youtube.com/@grokgolab
- Working paper: https://github.com/jw83252014-creator/grok-go-organism/blob/main/research-paper/grok-go-living-research-organism.md

## Repository Layout

```text
scripts/
  grok-autonomous-log-watcher.py   # main event-driven watcher
  start-watcher.sh                 # foreground launcher
  force-next-turn.sh               # one-shot continuation helper
  grok-go-preflight-receipt.sh     # pre-restart research receipt
  start-grok-go-researcher-tmux.sh # three-pane researcher wrapper

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
  biological-operating-system-master-gist.md
  conways-game-of-life-and-grok-go.md
  sam-hermes-github-integration-prompt.md
  emergence-marker-primer.md
  grok-go-restart-runbook.md
  grok-go-research-output-map.md
  telemetry-formulas.md
  web-agent-memory-migration.md
  x-context-ingestion.md
  web-ai-lane-adapter-plan.md
  notebooklm-bookmark-research-pipeline.md
  organism-dashboard-roadmap.md
  social-researcher-and-funding-plan.md
  x-growth-and-monetization-plan.md
  youtube-plain-english-outreach-plan.md
  terminal-replay-visual.md
  caveman-explainer.md
  live-mac-layout.md
  public-framing.md

research-paper/
  grok-go-living-research-organism.md
  science-skills-integration-plan.md
  sources/
  appendices/

researcher/
  researcher-population-loop-skeleton.py
  researcher-dashboard-population-logic.md
  local-llm-token-savings-plan.md
  security-cells-spec.md

terrarium-web/
  Next.js public microscope for the Grok Go organism

terrarium-telemetry/
  FastAPI WebSocket bridge for read-only local telemetry
```

## Current Status

The live Mac mini version proved the loop can keep producing committed turns, but direct GUI injection into the Grok terminal was not reliable enough to treat as solved. The durable fallback was the clipboard/prompt-file path: the watcher writes the next prompt, copies it, and makes the continuation step obvious.

The first emergent failure mode was also clear: without a better genome, the loop spent too many turns polishing its own continuation scripts instead of attacking larger goals.

The next step is multi-cell structure:

- Builder Cell: advances concrete goals
- Explorer Cell: discovers new directions and architectures
- Watcher Cell: immune system, loop health, budget, guardrails
- Researcher Cell: read-only observation, scoring, paper drafting, human feedback ingestion

The next restart should use the Researcher wrapper directive:

```text
directives/grok-go-restart-researcher-wrapper.md
```

The current research phase is framed here:

```text
docs/emergence-marker-primer.md
docs/conways-game-of-life-and-grok-go.md
```

The web-lane adapter plan for X/Grok, Grok.com, Gemini, NotebookLM, Claude, ChatGPT/Codex, and Hermes is here:

```text
docs/web-ai-lane-adapter-plan.md
```

For turning existing browser-tab agents into Hermes/Agent Bridge profiles without losing continuity, see:

```text
docs/web-agent-memory-migration.md
```

For the public X/YouTube/research-update role and serious funding paths, see:

```text
docs/social-researcher-and-funding-plan.md
docs/x-growth-and-monetization-plan.md
docs/youtube-plain-english-outreach-plan.md
```

An X-ready lessons graphic from the June 5 live-loop assay is here:

```text
source-artifacts/grok-go-lessons-2026-06-05.png
```

The Grok Go Lab YouTube/profile icon is here:

```text
source-artifacts/grok-go-lab-profile.png
```

For the next Grok Go restart, use:

```text
docs/grok-go-restart-runbook.md
scripts/grok-go-preflight-receipt.sh
scripts/start-grok-go-researcher-tmux.sh
```

## Research Paper Package

The current working paper lives here:

```text
research-paper/grok-go-living-research-organism.md
```

The paper is deliberately framed as a working preprint-style artifact, not as a final scientific claim. It separates observed local behavior from design proposals and includes limitations around X data, autonomous-turn auditing, and the Researcher layer not yet being fully autonomous.

The Google DeepMind Science Skills integration plan lives here:

```text
research-paper/science-skills-integration-plan.md
```

Science Skills is being treated as an upstream design pattern for narrow, grounded Researcher skills, not as a blindly imported tool bundle.

## Terrarium Website

The Gemini-generated "Glass Terrarium" website code has been materialized into a runnable Next.js app:

```text
terrarium-web/
```

The local read-only telemetry bridge lives here:

```text
terrarium-telemetry/
```

The website has a demo fallback, so it can render before the FastAPI WebSocket bridge is running. The bridge is display-only; it must not become a control plane for posting, payments, credentials, shell commands, or autonomous trading.

The current dashboard scoring formulas are tracked here:

```text
docs/telemetry-formulas.md
```

The next organism dashboard shape is mapped here:

```text
docs/organism-dashboard-roadmap.md
```

When the bridge is running, it sends a compact historical replay on each browser connection. That replay is built from curated first-loop study events plus recent git-memory entries from the original local loop. It is study telemetry, not the active Grok worker loop.

Public demo:

```text
https://grok-go.vercel.app
```

The public deployment runs the built-in study replay/demo mode. It is not connected to private Mac mini logs or the local WebSocket bridge.

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

## X Data Status

The current data state is:

- downloaded X archive through May 19, 2026;
- visible logged-in X notification snapshots from the browser;
- normalized local ledger and graph in Agent Bridge;
- Chrome extension path built, but it still needs to be loaded manually once through `chrome://extensions`.

This is not yet a complete fresh X export for the last few days.

## NotebookLM And Bookmark Research

The next research layer should cluster X bookmarks and Grok-expanded bookmark reports into source packs before sending anything to NotebookLM:

```text
docs/notebooklm-bookmark-research-pipeline.md
```

This keeps NotebookLM focused on useful source bundles instead of raw X/firehose context.

## Terminal Replay

The public terrarium now includes a compact desktop-only sanitized terminal replay. It is not a raw live terminal feed.

For generating reviewed replay artifacts from local logs, see:

```text
docs/terminal-replay-visual.md
scripts/sanitize-grok-terminal-replay.py
```

## Safety Note

Do not connect money, trading, infrastructure, external posting, or credential-changing actions to this loop without a separate approval layer and hard risk limits.

Paper trade first. Log everything. Make pause/kill switches boring and reliable.

See also:

```text
docs/funding-and-safety-rules.md
```

## License / Sharing

This repository is public for review and discussion.

No open-source license has been selected yet. Until a `LICENSE` file is added, do not assume reuse rights beyond viewing and discussing the public materials.
