# Grok Go Restart Runbook

**Date:** 2026-06-05  
**Mode:** Researcher-wrapped restart with telemetry first

## Goal

Restart Grok Go without losing observability.

The old loop proved the cell can keep breathing. The next loop should generate study data while it works:

- terminal transcript;
- watcher log;
- Grok unified log;
- git commits;
- preflight and postflight receipts;
- token-reduction notes;
- Researcher observations.

## Layout

Use one tmux session with three panes:

```text
grok-go-researcher
  pane 0: Researcher telemetry tail
  pane 1: Watcher shell
  pane 2: Grok worker shell
```

The helper script creates the panes and records pane output, but it does not automatically start Grok or the watcher. The human starts those commands after checking the preflight receipt.

## Preflight

Run:

```bash
./scripts/grok-go-preflight-receipt.sh
```

This writes a receipt under:

```text
~/.grok/researcher-receipts/
```

The receipt captures git status, recent Grok log state, running Grok/watcher processes, listening ports, current prompt file metadata, and the directive hash.

## Create The Researcher Terminal

Run:

```bash
./scripts/start-grok-go-researcher-tmux.sh
```

Then in the Grok worker pane:

1. start the Grok CLI / Grok Build terminal session;
2. paste or reference:

```text
directives/grok-go-restart-researcher-wrapper.md
```

In the watcher pane:

```bash
./scripts/start-watcher.sh
```

## First Mission

The first restarted Grok Go turn should focus on:

1. reducing token spend;
2. moving cheap filtering to local scripts or local server mode;
3. documenting RTK/context-saving discipline;
4. improving Researcher telemetry;
5. avoiding low-value watcher polish.

## Hard Guards

- No live trading.
- No public X actions.
- No account settings.
- No credentials.
- No funding/card/subscription actions.
- No destructive git operations.

Kalshi and Polymarket stay read-only or paper-trade until the approval layer exists.

