# Grok Go Research Output Map

**Date:** 2026-06-05  
**Purpose:** Define where Grok Go and the Researcher wrapper should put research outputs.

## Rule

Do not dump everything into one folder.

Use the folder that matches the research's lifecycle:

1. private working research;
2. Agent Bridge coordination receipts;
3. NotebookLM source packs;
4. Researcher telemetry;
5. public/shareable artifacts;
6. paper-ready sources.

## Canonical Paths

### 1. Live Working Research

Use for Grok Go's private working notes while operating inside the original local loop.

```text
/Users/rentamac/mining-engine/research-sources/
/Users/rentamac/mining-engine/research/
/Users/rentamac/mining-engine/mining-runs/
```

Use `research-sources/` for source notes, links, extracted ideas, and dated research findings.

Use `research/` for larger topic reports.

Use `mining-runs/` for run-level traces or batches from mining passes.

### 2. Agent Bridge Shared Research

Use when the research is meant for other agents to see or act on.

```text
/Users/rentamac/agent-comms/research/grok-go/
/Users/rentamac/agent-comms/research/grok-reports/
/Users/rentamac/agent-comms/research/web-lanes/
/Users/rentamac/agent-comms/research/web-agent-memory/
```

Use `grok-go/` for restarted-loop findings, Researcher summaries, and restart-specific reports.

Use `grok-reports/` for Grok web/tab reports that are not necessarily from the autonomous terminal loop.

Use `web-lanes/` for browser-lane adapter findings.

Use `web-agent-memory/` for agent memory migration inventory.

### 3. NotebookLM Source Packs

Use when research is being curated for NotebookLM ingestion.

```text
/Users/rentamac/agent-comms/research/notebooklm/
```

These should be compact, source-backed, and grouped by topic. Do not feed NotebookLM raw logs unless they have been cleaned and summarized.

### 4. Researcher Telemetry And Receipts

Use for preflight receipts, pane logs, terminal transcripts, and restart study data.

```text
/Users/rentamac/.grok/researcher-receipts/
```

These are local/private by default. Review and sanitize before copying anything public.

### 5. Public/Shareable Source Artifacts

Use after review when a local research artifact is safe to publish in the Grok Go public repo.

```text
/Users/rentamac/grok-go-organism-share/source-artifacts/
/Users/rentamac/grok-go-organism-share/source-artifacts/grok-reports/
/Users/rentamac/grok-go-organism-share/source-artifacts/gemini/
```

Do not put credentials, raw private logs, raw X archives, cookies, account screenshots, or unsanitized terminal output here.

### 6. Paper-Ready Research

Use when the research is mature enough to cite in the working paper.

```text
/Users/rentamac/grok-go-organism-share/research-paper/
/Users/rentamac/grok-go-organism-share/research-paper/sources/
/Users/rentamac/grok-go-organism-share/research-paper/appendices/
```

Use `sources/` for source notes.

Use `appendices/` for supporting outlines, data-pipeline notes, and detailed evidence.

## Naming Convention

Use ISO-style dates and a short topic:

```text
2026-06-05-token-reduction-first-pass.md
2026-06-05-web-lane-memory-inventory.md
2026-06-05-researcher-telemetry-summary.md
```

Each research file should include:

- source or trigger;
- what was observed;
- why it matters;
- confidence level;
- next concrete action;
- whether it is safe to publish.

## First Restart Output Target

The first restarted Grok Go turn should write its result here:

```text
/Users/rentamac/agent-comms/research/grok-go/2026-06-05-token-reduction-first-pass.md
```

If it also updates private working memory, it may mirror a concise source note to:

```text
/Users/rentamac/mining-engine/research-sources/2026-06-05-token-reduction-first-pass.md
```

Do not publish to the public repo until a human or Researcher has reviewed the content for secrets and relevance.

