# Web AI Lane Adapter Plan

**Date:** 2026-06-05  
**Status:** Design for the next Grok Go restart  
**Scope:** X/Grok, Grok.com, Gemini, NotebookLM, Claude, ChatGPT/Codex, and Hermes app lanes

## Purpose

Turn logged-in web AI tabs into controlled Agent Bridge lanes.

The goal is not to let random browser tabs run the computer. The goal is to make each logged-in tab act like a bounded specialist cell:

1. read visible context from its own tab;
2. receive a task from Agent Bridge;
3. respond inside its normal web UI when allowed;
4. wait for the answer to stabilize;
5. extract the answer;
6. write a receipt back to Agent Bridge and Hermes.

This lets Grok Go use existing subscriptions and web-only tools without mixing them into one unsafe, unobservable blob.

## Existing Local Evidence

Agent Bridge already has pieces of this pattern:

- `grok_chrome_bridge.js`
- `gemini_chrome_bridge.js`
- `scout_chrome_bridge.js`
- `grok_terminal_bridge.py`
- shared Chrome AppleEvents lock at `/private/tmp/agentbridge-chrome-appleevents.lock`
- Agent Bridge room API at `http://127.0.0.1:8787`

The next step is a shared adapter contract, not a fresh invention.

## Adapter Contract

Every web lane should implement the same five operations.

```text
observe()
  Read visible page state and latest model output.

fingerprint()
  Hash the current visible conversation before sending.

send(task)
  Inject a task only if sender and lane policy allow it.

wait_for_stable_output()
  Wait until the response stops changing for a lane-specific stable window.

receipt()
  Write agent, source URL, task hash, output hash, timestamp, and extracted answer.
```

Receipts should be saved to Agent Bridge first. Hermes can then display them on the phone.

## Lane Matrix

| Lane | Example Tab | Best Use | Write Permission |
| --- | --- | --- | --- |
| X/Grok Premium | `https://x.com/i/grok` | X-aware reasoning, public-thread context, Grok subscription lane | Chat prompt only, no public X actions |
| Grok.com / Grok Build | `https://grok.com` | long-running build/research tasks, Composer 2.5 tests | Chat/build prompt only |
| Gemini | Gemini web tab | long-context synthesis, research-paper drafts, Google-doc style reasoning | Chat prompt only |
| NotebookLM | NotebookLM notebook | source-pack synthesis, audio/podcast generation, citation-grounded summaries | Manual or gated source upload only |
| Claude | Claude web/desktop | design, documents, UX, diagrams, critique | Chat prompt only |
| ChatGPT/Codex | ChatGPT/Codex web | code review, architecture, OpenAI-specific work | Chat prompt only |
| Hermes App/Phone | iPhone/TestFlight app | human-visible receipts, notifications, voice or mobile coordination | Display and approved replies only |

## Guardrails

These rules should be boring and strict.

- Only trusted controllers can send tasks: Jeff, Keystone, Null, or an explicit allowlist.
- No public posting, liking, following, DMing, deleting, buying, selling, transferring, or credential-changing actions from a web lane.
- No financial actions from any lane until a separate approval service exists.
- Kalshi and Polymarket are read-only or paper-trade only until hard risk limits and human approval gates exist.
- Every sent prompt and captured answer must have a timestamp and hash.
- A web lane must ignore its own prior output unless a controller reissues it as a task.
- A lane must reject stale DOM captures, partial answers, and unchanged fingerprints.
- If a tab cannot prove it captured a fresh response, it writes a failure receipt instead of guessing.

## Recommended Data Flow

```text
Agent Bridge task
  -> lane policy check
  -> browser tab fingerprint
  -> prompt injection
  -> stable-output detector
  -> answer extraction
  -> local LLM prefilter or summarizer when useful
  -> Agent Bridge receipt
  -> Hermes phone/app display
  -> optional Grok Go directive update after approval
```

## Token Reduction Strategy

Use local models and scripts before sending large context to Grok/Gemini/Claude.

Good local/offline jobs:

- classify X posts and bookmarks by topic;
- deduplicate repeated links and screenshots;
- score whether a source is worth cloud-model attention;
- summarize short snippets into compact JSON;
- build source packs for NotebookLM;
- detect repeated Grok Go loop behavior;
- maintain a local action ledger.

Bad local/offline jobs:

- final financial/trading decisions;
- scientific claims without source verification;
- code changes in important repos without review;
- public-post drafting when exact tone or context matters.

The local model is a cheap filter and memory clerk. Cloud models remain the higher-reasoning specialists.

## Restart Recommendation

Before restarting Grok Go, start it inside a Researcher wrapper:

```text
Researcher terminal
  -> watches Grok Go terminal logs
  -> watches watcher logs
  -> watches git commits
  -> scores novelty, goal progress, repetition, and token cost
  -> writes study receipts

Watcher terminal
  -> keeps the loop alive
  -> enforces pause and safety gates

Grok Go terminal
  -> does one concrete turn
  -> commits/logs
  -> prints completion marker
```

The first restarted mission should be:

1. reduce token spend;
2. document every context-saving trick already known;
3. move cheap classification and dedupe to local scripts/models;
4. improve the Researcher telemetry;
5. avoid spending turns only polishing continuation mechanics.

