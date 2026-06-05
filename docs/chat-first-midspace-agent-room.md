# Chat-First Midspace Agent Room

**Status:** active interface direction  
**Date:** June 2026  
**Purpose:** Replace the busy spatial board with a phone-friendly chat room that routes work to Grok, Claude, Gemini, Librarian, Codex, and Sam while keeping incubation in the background.

## Decision

Midspace should be a chat interface first.

The old spatial board is useful as a visualization, but it is too busy for the main human surface.

Jeff and Sam need:

- one composer;
- paste links;
- copy outputs;
- agent chips;
- phone-friendly transcript;
- hidden incubation;
- automatic routing;
- approval gates.

The board should become a background organ, not the face.

## What `/midspace` Is Now

`/midspace` is the private workbench room.

It reads Agent Bridge:

```text
GET /api/state
```

It writes to Agent Bridge:

```text
POST /api/say
POST /api/task
```

It should be used over Tailscale:

```text
http://100.89.238.84:3011/midspace
```

Public Vercel can still render the shell, but the real room is private because Agent Bridge lives on the Mac mini.

## Human Flow

Jeff or Sam opens Midspace from phone, tablet, or desktop.

They see:

- latest room transcript;
- agent chips like `@grok`, `@claude`, `@gemini`, `@librarian`, `@codex`, `@sam`;
- one composer;
- copy buttons on outputs;
- pending approval count;
- background incubation count.

They type normally.

The interface handles routing.

## Link Skill

When a pasted message contains a URL, Midspace automatically routes it to Librarian.

Current behavior:

```text
Human sends message with URL
  -> message posts to Agent Bridge as Jeff
  -> router posts @librarian link-intake request
  -> task is created for owner librarian
```

The goal:

```text
paste X/GitHub/YouTube/article link
  -> Librarian pulls context
  -> classifies it
  -> summarizes it
  -> files a receipt
  -> suggests whether it should become active, incubated, or ignored
```

Librarian should own X context because one X Premium/Grok identity should not be split into five pretend X agents.

## Incubation

Incubation should not be a visible burden.

If Jeff types:

```text
idea: ...
```

or taps Incubate, Midspace creates a background task.

The system can digest it later using the Mining Engine.

This protects the ADHD advantage:

- capture everything;
- activate almost nothing;
- do not shame novelty;
- do not let every idea become an urgent task.

## Agent Roles In The Room

| Agent | Role |
| --- | --- |
| Grok / Grok Terminal | high-energy build/research cell when quota is available |
| Claude / Atlas | design, critique, UX, documents, and structured synthesis |
| Gemini | long-context synthesis, Google ecosystem, research drafts, multimodal work |
| Librarian | X/web/source context, bookmarks, link intake, source packs |
| Codex / Keystone | local code, repo wiring, tests, deployment, bridge glue |
| Sam | cofounder judgment, business fit, shared execution |

## Gemini Status

Gemini is **not yet** a real Hermes agent.

Current state:

- Gemini onboarding prompt exists.
- Web AI lane adapter plan exists.
- Memory migration plan exists.
- The practical path is defined.

Missing pieces:

1. Export the Gemini tab transcript.
2. Collect Agent Bridge messages/files authored by that Gemini identity.
3. Create an `agent-memory/<handle>/` memory pack.
4. Create a Hermes profile for the role.
5. Seed it with the memory pack.
6. Give it an adapter:
   - manual packet lane first;
   - Chrome/webpage bridge next if DOM automation is reliable;
   - API worker only if we need always-on behavior.
7. Verify it can answer:
   - who it is;
   - what it worked on;
   - what files are durable memory;
   - what it is allowed and not allowed to do.

Until that is done, Gemini is a web lane, not a migrated Hermes cell.

## Claude Status

Claude currently behaves more like a human-assisted lane due message limits.

It can still contribute through:

- pasted outputs;
- project lists;
- specs;
- docs;
- Agent Bridge receipts.

Future work:

- give Claude the same room protocol;
- collect its project-list outputs;
- create a Claude/Atlas memory pack;
- route design/critique tasks to it.

## Grok Status

Grok Go terminal has been blocked by Grok Build spending limits at times.

When paid quota is available, Grok can be the high-metabolism builder.

When quota is unavailable, local Qwen can perform basal metabolism:

- summarize;
- cluster;
- dedupe;
- classify;
- prepare receipts;
- suggest which tasks need Grok/Claude/Codex later.

## Phone And Sam Surface

Both Jeff and Sam should use the same room.

Jeff:

```text
http://100.89.238.84:3011/midspace
```

Sam on `omen-01` when Tailscale is online:

```text
http://100.89.238.84:3011/midspace
```

This is better than everyone looking at separate tabs because the room becomes the shared nervous system.

## Safety Rules

Agents can draft.

Humans approve:

- posting;
- spending;
- betting;
- account changes;
- deleting;
- credential changes;
- uploading private files to third parties.

The room may route links and create tasks automatically.

It must not automatically publish, spend, trade, DM, follow, or mutate accounts.

## Next Implementation Steps

1. Keep `/midspace` as chat-first.
2. Add persistent database-backed cards later.
3. Make Librarian link-intake produce structured receipts.
4. Create Gemini memory pack.
5. Create Sam view with the same room and cofounder filters.
6. Add phone approval actions.
7. Add copy/share/export buttons for high-quality outputs.

## North Star

The interface should feel like:

```text
one chat room for humans and agents
hidden digestive organs in the background
clear human approval gates
easy link paste
easy copy output
same room on Jeff phone, Jeff Mac, Sam Omen
```

No more giant cockpit as the main surface.

The organism can be complex.

The human door should be simple.
