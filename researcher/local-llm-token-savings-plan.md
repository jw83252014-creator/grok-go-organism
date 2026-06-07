# Local LLM Token Savings Plan

**Date:** 2026-06-05  
**Hardware observed:** Mac mini M4, 16 GB unified memory  
**Local model observed:** `Qwen3.5-9B-Q4_K_M.gguf`

## Goal

Use local compute as the organism's cheap reflex layer.

The local model should reduce paid-model calls by cleaning, clustering, and scoring context before Grok Go sends expensive prompts to cloud models.

## What Worked

The local GGUF model loads through `llama-cli` with Metal on the M4. Startup is possible on this machine.

## What Failed

The first quick `llama-cli` test dropped into interactive chat mode and flooded blank prompt output instead of returning one clean JSON object.

This is a harness problem, not proof that the model is useless.

## Safer Harness

Use one of these paths before connecting local LLM output to any autonomous loop:

1. `llama-server` with a bounded HTTP request and timeout.
2. A non-interactive wrapper that kills the process after one answer.
3. A strict JSON parser that rejects malformed output.
4. A queue file where failed jobs become failure receipts instead of retries forever.

Harness finding from 2026-06-05:

- `llama-cli` auto-entered conversation mode and flooded blank prompts.
- `llama-completion` was the right binary in principle, but this local build exited with code 1 during quick one-shot tests.
- Do not wire either CLI directly into Grok Go yet.
- The next implementation should use `llama-server` so the model stays loaded and the caller gets bounded HTTP requests with timeouts and JSON validation.

## Best Local Jobs

- Bookmark clustering.
- X post/reply classification.
- Duplicate source detection.
- Short snippet summaries.
- "Worth sending to Grok?" scoring.
- Grok Go log repetition detection.
- Turn receipt cleanup.

## Jobs To Keep Cloud-Side

- Hard architecture decisions.
- Final public post wording.
- Scientific-paper claims.
- Code edits with broad blast radius.
- Financial or trading reasoning.

## Minimal Interface

```json
{
  "task_id": "local-prefilter-001",
  "input_kind": "x_bookmark_batch",
  "model": "local-qwen-gguf",
  "output_schema": {
    "clusters": [],
    "duplicates": [],
    "high_value_items": [],
    "send_to_cloud": true
  }
}
```

The output should be treated as a draft filter, not a final decision.

## Skill Envelope Pattern

"Teaching" the local model a skill should mean giving it a small, repeatable harness, not pretending it permanently learned something:

1. A short `SKILL.md`-style instruction.
2. A strict input schema.
3. A strict output schema.
4. A few examples.
5. A timeout.
6. A JSON verifier.
7. A blocker receipt when the job fails.

This is enough for useful basal chores such as source extraction, classification, clustering, and blocker surfacing.

Example output for a blocked local job:

```json
{
  "status": "blocked",
  "task": "arxiv-2606-03300-source-packet",
  "blocker": "could not fetch arXiv PDF from local network path",
  "checked": ["https://arxiv.org/abs/2606.03300"],
  "needs": "Codex help",
  "recommended_next_action": "fetch the PDF/HTML with a network-enabled tool and rerun extraction"
}
```

## New Safe Research Chore

The Parisi/Zamponi arXiv source about AI-assisted proof is a good local-model job:

- extract all mentions of Claude/model use;
- extract all verification/correction language;
- build a claim table;
- flag hype-risk wording;
- propose questions for a stronger model or human reviewer.

Do not let the local model explain or validate the physics proof as a final claim.
