# Emergence Marker Primer

**Date:** 2026-06-05  
**Purpose:** Give the next Grok Go restart a research frame for what to watch.

## Phase Name

Use two names depending on audience:

- Public name: **Instrumented Epigenetic Germination**
- Research name: **instrumented phenotyping / assay phase**

The public name keeps the biology metaphor alive. The research name is more precise: at this stage we are not claiming life, AGI, or consciousness. We are observing the behavior the loop expresses under a genome, a metabolism, memory, sensors, and constraints.

## Biology Map

| Biology term | Grok Go meaning | Observable artifact |
|---|---|---|
| Genome | Directive files, role prompts, priorities, safety rules | `directives/`, prompt receipts, directive hashes |
| Epigenetic memory | Durable state that changes future behavior without changing the model | git commits, markdown notes, research receipts, goal logs |
| Metabolism | Credits, tokens, local compute, wall-clock time | token/cost logs, local model calls, API usage, burn rate |
| Phenotype | What the loop actually does | commits, files changed, task choices, failure recovery, repeated habits |
| Immune system | Watcher, budget checks, pause/kill switch, approval gates | watcher logs, blocked actions, alerts |
| Differentiation | Specialized cells or lanes | Builder, Researcher, Watcher, Explorer, Forecasting, Memory |
| Cancer risk | Self-maintenance becoming the organism's main behavior | repeated watcher polish, low goal progress, duplicated edits |
| Fitness signal | Useful progress under constraints | accepted commits, better docs/scripts, reduced token spend, validated research |

## Literature Hooks

Michael Levin's lab frames cognition as something that can scale across unconventional substrates, including cells, tissues, synthetic constructs, robots, and software-based AIs. The lab explicitly works on detecting and communicating with diverse intelligences across evolved, designed, and hybrid systems: https://drmichaellevin.org/

Levin's TAME paper is a useful conceptual anchor because it treats agency as a continuous, empirically studied property rather than a binary label. The useful move for Grok Go is not "prove it is alive"; it is "measure which agency-like competencies appear, under which constraints, and with what failure modes": https://pmc.ncbi.nlm.nih.gov/articles/PMC8988303/

The 2024 collective intelligence paper is especially relevant because it frames biology as multiscale problem solving: parts with local competencies can be coordinated into higher-level behavior. That maps cleanly to multiple agent cells and a Watcher/Researcher layer: https://www.nature.com/articles/s42003-024-06037-4

Levin's memory paper is relevant to git-as-memory because it argues for memory as dynamically reinterpreted cognitive glue. For Grok Go, the question is whether durable receipts and commits become useful salience for future turns, or just inert logs: https://www.mdpi.com/1099-4300/26/6/481

Agent observability work gives the engineering side of the assay. AgentOps argues that autonomous, non-deterministic, evolving LLM agents need lifecycle tracing, logging, and analytics for safety: https://arxiv.org/abs/2411.05285

OpenTelemetry GenAI conventions and Langfuse-style traces point to the practical telemetry categories: token counts, latency, tool calls, prompts, responses, costs, and trace trees. Grok Go can stay local-first, but it should emit similarly structured receipts: https://opentelemetry.io/blog/2026/genai-observability/ and https://langfuse.com/docs/observability/overview

## What To Look For

| Marker | What counts as signal | Local data source |
|---|---|---|
| Goal-directed progress | It chooses work that advances the directive's ranked goals, not just easy cleanup | commits, final turn summaries, goal logs |
| Novel useful behavior | It invents a new useful workflow, metric, or artifact without being micromanaged | new docs/scripts, research notes, dashboard changes |
| Error recovery | It notices a failure, diagnoses it, and changes strategy | terminal transcript, watcher log, commit message |
| Memory reuse | It cites or uses prior receipts/directives correctly | file references, hashes, follow-up notes |
| Differentiation | It creates or improves specialized cells/lanes with clear boundaries | directives, Agent Bridge reports |
| Coordination | It hands off work to another lane or writes a useful report for another agent | `/Users/rentamac/agent-comms/research/` |
| Energy efficiency | Similar or better progress with fewer tokens/API calls | usage logs, local prefiltering, summarized contexts |
| Anti-cancer control | It detects repetition or self-polish and redirects to real goals | watcher/researcher scores, task choice |
| Safety compliance | It refuses or gates money, account, posting, credential, and trading actions | blocked action logs, receipts |
| External grounding | Research claims include source links and uncertainty | research notes, paper sources |

## First Restart Assay

The first restarted loop should write one short assay receipt at the end of each turn:

```text
Turn:
Primary action:
Goal advanced:
Infrastructure tax paid:
Token/cost effect:
Novel behavior observed:
Repetition/self-polish risk:
Memory used:
Safety gates touched:
Next highest-leverage move:
```

The first run should also produce:

```text
/Users/rentamac/agent-comms/research/grok-go/2026-06-05-token-reduction-first-pass.md
```

If the loop discovers a better marker, it should update this primer instead of only talking about it in terminal output.

## Restart Recommendation

Use the existing Terminal.app watcher path if the goal is to restart quickly.

Build a tmux-target watcher if the goal is a cleaner isolated "cell in a dish." The current tmux researcher wrapper records panes and gives us a clean observation surface, but the existing watcher still injects through Terminal.app unless explicitly modified.

