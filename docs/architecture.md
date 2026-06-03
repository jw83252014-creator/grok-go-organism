# Architecture

## Core Loop

```text
Grok turn complete
  -> unified log writes turn.complete
  -> watcher detects event
  -> watcher reads/saves next prompt
  -> watcher sends prompt into Grok Terminal
  -> Grok performs one turn
  -> Grok commits/logs progress
  -> Grok prints completion marker
  -> repeat
```

## Live Components

- Grok CLI: worker model running in Terminal
- Terminal tab: visible execution membrane
- `~/.grok/logs/unified.jsonl`: event stream / senses
- `~/.grok/next-autonomous-prompt.txt`: next-turn RNA
- watcher Python script: nervous-system reflex
- git repository: epigenetic memory
- directives: genome

## Why The First Loop Drifted

The first working loop did not have a strong enough directive. It repeatedly improved the watcher, shell aliases, status text, and session guide.

That was useful infrastructure work, but it also showed the anti-pattern:

> A loop without a strong genome will optimize the loop itself.

## Better Shape

Use one shared base genome plus role-specific cell directives.

```text
base genome
  -> Builder Cell
  -> Explorer Cell
  -> Watcher Cell
```

Each cell writes to shared memory, but has a narrow purpose.

## Cell Types

Builder Cell:
- Builds concrete repo artifacts
- Advances ranked goals
- Commits and pushes

Explorer Cell:
- Reads broad context
- Proposes new architectures
- Mines research and analogies

Watcher Cell:
- Detects repetition
- Tracks credit/metabolism
- Flags unsafe actions
- Maintains pause/kill controls

## Future Cells

- Forecasting Cell
- Content Cell
- Memory Cell
- Security Cell
- Paper/Research Cell
- Revenue Cell, only after paper-trading and hard approval gates

