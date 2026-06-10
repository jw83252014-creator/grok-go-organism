# Organism Dashboard Roadmap

The dashboard should show the health, activity, and evolution of the Agent Bridge / Grok Go organism.

Use biological framing first. Traditional dev metrics are still useful, but they should be translated into organism concepts: metabolism, cells, immune system, memory, digestion, evolution, and energy flow.

## Dashboard As Conscious Interface

The dashboard is the organism's conscious interface, not only a display. The Researcher and Mining Engine are the subconscious digestion layer: they read logs, exports, source notes, room chatter, and cell outputs, then compress that material into patterns and recommendations. The dashboard is the upper surface where the human sees what is ready for attention.

Each dashboard feature should be treated as a small bounded agent or cell:

- a metabolism knob or meter belongs to the Metabolism Checker Cell;
- an approvals panel belongs to the Approval Cell;
- an Easy List belongs to the Project Manager Cell;
- a bridge-health card belongs to the Watcher / Immune Cell;
- a research digest belongs to the Researcher Cell;
- a funding panel belongs to the Funding Forager Cell.

This is how the dashboard can feel alive without becoming unsafe. Every visible control must expose its owner, inputs, allowed action, and approval gate.

## Public Vs Private Boundary

The dashboard should have two layers:

- Public Terrarium: sanitized telemetry, research progress, repo links, public paper links, active cell concepts, high-level vitality.
- Private Control Room: credits, revenue, X analytics, account events, raw logs, follower graph, funding details, credentials-adjacent status, and anything that could expose private operations.

The public page must never become a control plane for posting, trading, funding, shell commands, credentials, or account changes.

## Core Sections

### 1. Overall Organism Health

- Metabolic balance: current compute/fuel vs burn rate.
- Research output: papers, summaries, insights, source notes produced recently.
- Active cells: number of agents running and their status.
- Wiki layer health: structured knowledge vs raw undigested data.
- Vitality index: current composite score and formula version.

### 2. Cell Status

Track each cell as a role with state, task, and risk.

- Grok Go Cell: current task, research activity, commits/receipts, local-model usage.
- Researcher / Token Scout: tasks completed, new findings, source quality.
- Social Researcher Cell: public drafts, X/YouTube monitoring, contributor routing.
- Watcher Cell: loop health, approval gates, prompt handoff, failure isolation.
- Future cells: Hermes, Codex, Gemini, NotebookLM, local model workers.

Suggested status labels:

- Healthy
- Working
- Waiting
- Warning
- Critical
- Gated

### 3. Immune System / Watcher Summary

- Recent anomalies or risky behavior.
- Approval gates triggered.
- Queue health.
- Failure isolation events.
- Marker/continuation reliability.
- Repetition or self-polish risk.
- Last human intervention.

### 4. Memory And Digestion

This is the wiki / Obsidian / research-source layer.

- Total structured wiki pages.
- Recent additions and updates.
- Raw sources waiting for digestion.
- Coverage gaps.
- Search efficiency or retrieval quality when measurable.
- Compression and dedup wins.
- Local prefilter indexes available.

### 5. Evolution And Research Progress

- Active research threads.
- Papers in progress.
- Recently discovered insights.
- New genome/directive changes.
- New cell types proposed or activated.
- Emergence markers observed.
- Failed hypotheses and negative results.

### 6. Energy / Resource Flow

- Compute usage.
- API/subscription burn.
- Local model offload.
- Funding runway.
- Funding sources.
- Revenue experiments.
- Approval state for money-related systems.

Money systems stay read-only or paper-trade until explicit approval, compliance, and safety infrastructure exist.

## Recommended First Version

Start with a simple Markdown + Obsidian dashboard and mirror a sanitized subset into the web page.

First private Markdown dashboard:

```text
agent-comms/dashboard/organism-status.md
```

First public website sections:

- Metabolic balance
- Active cells
- Recent research output
- Wiki layer coverage
- Watcher alerts
- Current formula version
- Links to paper, repo, and contribution plan

## Queryable Data Shape

For agents, the dashboard should be backed by a small JSON status file:

```json
{
  "updated_at": "2026-06-05T00:00:00Z",
  "overall_status": "working",
  "vitality": 77,
  "formula_version": "v0.2-rtk",
  "cells": [
    {
      "name": "Grok Go",
      "role": "builder",
      "status": "working",
      "current_task": "local prefilter and token reduction",
      "risk": "uncommitted outputs"
    }
  ],
  "watcher": {
    "status": "healthy",
    "last_marker_seen": "",
    "approval_gates_triggered": 0
  },
  "memory": {
    "structured_pages": 0,
    "raw_sources_waiting": 0,
    "coverage_gaps": []
  }
}
```

The Markdown view is for humans. The JSON view is for agents.

## Design Principles

- Simple and scannable first.
- Biological language should clarify, not obscure.
- Separate public observability from private control.
- Every displayed metric should have a source or formula.
- Prefer live receipts and structured logs over vibes.
- Start small, then grow sections as the organism adds real cells.

## Near-Term Implementation Steps

1. Add a private Markdown dashboard generated from current logs, receipts, git status, and research notes.
2. Add a public sanitized dashboard data file to the Terrarium app.
3. Show active cells and watcher health on the web page.
4. Add wiki digestion stats from `research-sources/`, `agent-comms/research/`, and Obsidian when wired.
5. Add Social Researcher drafts as a gated section: draft only, never auto-post.
6. Add YouTube/public update queue when the channel exists.
7. Add contribution/funding panel only after safety language is clear.
8. Add a panel-to-cell manifest so every knob, meter, button, and list item has an owning cell and a risk gate.
