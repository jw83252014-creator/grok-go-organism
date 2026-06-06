# Gemini + Librarian Hermes Cell Plan

**Date:** June 5, 2026  
**Status:** implementation handoff  
**Purpose:** Turn the downloaded Gemini tab context plus Librarian's X context lane into a usable Hermes/Agent Bridge research cell without pretending one browser tab is a full autonomous agent by itself.

## Downloads Scanned

Recent Downloads contained four highly relevant source groups:

| Source | What It Contributes | Repo Status |
| --- | --- | --- |
| `AI-Agents-Inspired-by-Biological-Life (1).md` | Newer Gemini export with Grok Go biology framing, research paper plans, terrarium code, and Gemini's own capability limits. | Copied into `source-artifacts/gemini/AI-Agents-Inspired-by-Biological-Life.md` |
| `Agent-Bridge-Persistent-Link-File.md` | Research Harvester idea, X bookmark workflow, and the "Chrome tab becomes Hermes Agent" architecture. | Mined into this plan |
| `Grok-Comedy-Bot-X-Automation.md` | X automation warning rules, approval-gated posting flow, memory vault, and metrics loop. | Mined into this plan |
| `researcher-population-loop-skeleton.py` + `researcher-dashboard-population-logic.md` | Outer Researcher loop, marker scoring, dashboard population, and paper-generation loop. | Already present in `researcher/` |

The older `hermes-webui-master.zip` is not one of the newest downloads, but its README reinforces the right direction: Hermes WebUI already has profiles, sessions, workspace browsing, memory, scheduling, messaging access, provider choice, and mobile-friendly control surfaces. That means we should integrate with Hermes concepts instead of rebuilding all of that from scratch.

## Core Decision

Gemini should become a **Synthesis Cell**, not the X sensor and not the filesystem owner.

Librarian should own the logged-in X/Grok context because one X Premium/Grok identity should not be split into five pretend X agents.

```text
Gemini tab export
  -> durable memory pack
  -> Gemini Synthesis Cell

Librarian / X-Grok lane
  -> live X source packets
  -> bookmarks, follows, likes, thread context

Midspace / Agent Bridge
  -> routes tasks and receipts
  -> shows Jeff/Sam approvals

Codex / Grok Go
  -> code, commits, site, build artifacts
```

This keeps each organ honest:

- Gemini is good at long-context synthesis and research drafting.
- Librarian is good at X/web source intake.
- Hermes is good at persistence, scheduling, phone access, and memory.
- Agent Bridge is the shared nervous system.
- Git is the durable epigenetic memory.

## Why Not Just Let Gemini Run The Browser

The Gemini export itself says the important boundary plainly:

- Gemini can draft, synthesize, and generate code.
- Gemini does not gain local filesystem or GitHub write access just because the web account has a bigger context window.
- Browser tab context is not durable memory until it is exported, summarized, and written to files.

So the correct migration is:

```text
web tab history
  -> exported transcript
  -> source artifact
  -> summarized memory pack
  -> Hermes profile / Agent Bridge lane
  -> verified role replay
```

## Cell Roles

### Gemini Synthesis Cell

Primary jobs:

- read the Gemini transcript memory pack;
- synthesize research papers, NotebookLM prompts, X thread plans, and biology mappings;
- compare new source packets against the Grok Go research frame;
- ask Librarian for fresh X context when needed;
- write synthesis receipts, not public posts.

Hard boundaries:

- no credentials;
- no X posting;
- no betting;
- no direct browser-control autonomy unless wrapped by the Web AI lane adapter;
- no filesystem authority except through approved Hermes/Agent Bridge tools.

### Librarian X Sensor Cell

Primary jobs:

- intake pasted links, bookmarks, follower/like reports, X thread links, GitHub links, and screenshots;
- use the logged-in X/Grok lane to expand context;
- produce compact source packets with links, people, why it matters, and suggested moves;
- file X Radar receipts;
- send high-leverage opportunities into Midspace.

Hard boundaries:

- read-only X by default;
- no posting, liking, following, DMs, deleting, money, or account changes without explicit human approval;
- source packets must include uncertainty when a browser scrape may be incomplete.

### Midspace Router

Primary jobs:

- give Jeff and Sam one chat-first workbench;
- route pasted URLs to Librarian automatically;
- let Gemini/Claude/Grok/Codex contribute through agent chips;
- show pending approvals;
- keep incubation in the background so every shiny idea is captured but not activated.

### Hermes Profile

Primary jobs:

- persist the cell's role and memory;
- run scheduled checks when safe;
- send phone-visible receipts;
- let Jeff/Sam ask the cell questions without re-pasting all context.

## First Data Flow

```text
1. Jeff exports a Gemini tab to Downloads.
2. Codex copies that export into source-artifacts/gemini/.
3. Mining Engine distills the export into agent-memory/gemini-librarian-research-cell/.
4. Jeff/Sam paste an X link into Midspace.
5. Midspace posts the message to Agent Bridge and creates a Librarian link-intake task.
6. Librarian expands the X context and writes a source packet.
7. Gemini Synthesis Cell reads its memory pack + Librarian source packet.
8. Gemini writes a synthesis receipt:
   - what this connects to;
   - which Grok Go project it advances;
   - suggested X post / research note / build move;
   - risks and approval needs.
9. Jeff approves public-facing moves.
10. Codex or Grok Go turns approved moves into code, docs, site updates, or posts.
```

## File Layout

Recommended durable layout:

```text
source-artifacts/gemini/
  AI-Agents-Inspired-by-Biological-Life.md

agent-memory/gemini-librarian-research-cell/
  README.md
  identity.md
  directive.md
  working-memory-summary.md
  open-tasks.md
  migration-receipt.md

research/x-intake/
  YYYY-MM-DD-source-packet-<slug>.md

research/x-radar/
  YYYY-MM-DD-x-radar-receipt-<slug>.md
```

## Web Lane Adapter Contract

If we later connect Gemini or Grok web tabs directly, use the existing Web AI lane contract:

```text
observe()
fingerprint()
send(task)
wait_for_stable_output()
receipt()
```

This prevents stale captures, half-written model outputs, and uncontrolled browser actions.

## Prompt For The Gemini Synthesis Cell

```text
You are the Gemini Synthesis Cell for Grok Go / Null Axiom.

Your durable memory is not the live browser tab. Your durable memory is the exported transcript, source artifacts, Agent Bridge receipts, and files in agent-memory/gemini-librarian-research-cell/.

Primary mission:
Turn raw X links, Gemini/Grok/Claude/Codex exports, research notes, and Grok Go telemetry into compact research synthesis that moves the organism forward.

You do not own X. Librarian owns X context and produces source packets. When you need live X context, ask Librarian for a source packet instead of guessing.

Each task:
1. Read the relevant memory summary and directive.
2. Read any Librarian source packet or pasted source.
3. Connect it to Grok Go, Mining Engine, Researcher, Midspace, X leverage, YouTube, or Sam/Jeff project priorities.
4. Produce one useful artifact:
   - research note;
   - X post draft;
   - NotebookLM prompt;
   - paper section;
   - build recommendation;
   - source map.
5. Mark what requires human approval.

Rules:
- No public posting.
- No betting or spending.
- No credential handling.
- Keep outputs concise enough for Midspace and phone review.
- If context is missing, ask Librarian or Codex for the specific missing packet.
```

## First Implementation Moves

1. Keep the latest Gemini export in `source-artifacts/gemini/`.
2. Maintain the `agent-memory/gemini-librarian-research-cell/` seed pack.
3. Teach Midspace's link skill to prefer this route:

```text
URL -> Librarian source packet -> Gemini synthesis -> human approval -> build/post
```

4. Do not make Gemini directly control X.
5. Do not auto-post. Draft first, approve second, post last.
6. Let local Qwen do cheap digestion:

- cluster;
- dedupe;
- summarize;
- source-pack preparation;
- repeat detection;
- "does this need Gemini/Grok/Codex?" triage.

## Plain English

Gemini is the long-memory thinker.

Librarian is the eyes on X.

Hermes is the persistent phone-access shell.

Agent Bridge is the room.

Midspace is the human console.

Grok Go and Codex build the actual artifacts.

The downloaded Gemini tab becomes useful only after we turn it into portable memory.
