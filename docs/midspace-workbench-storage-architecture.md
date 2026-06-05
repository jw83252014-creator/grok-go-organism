# Midspace Workbench And Storage Architecture

**Status:** implementation plan  
**Date:** June 2026  
**Scope:** Jeff/Sam shared hub, upload/intake, connected local computers, storage, retrieval, and the Grok Go public/private split

## Short Answer

Use a hybrid organism.

Do **not** make Jeff's Mac mini, Sam's computer, Telegram, GitHub, or Vercel alone become the whole brain.

Use each as the organ it is good at:

| Layer | Best Tool | Biological Role |
| --- | --- | --- |
| Public website | Vercel / Next.js | Public skin and microscope |
| Private workbench | Authenticated `/midspace` app | Prefrontal cortex / active tissue board |
| Metadata and cards | Postgres / SQLite-to-Postgres sync | Nervous system state |
| Large files | Vercel Blob or S3-compatible object storage | Fat stores / raw nutrients |
| Code and public docs | GitHub | Epigenetic memory |
| Local private files | Jeff/Sam machines | Private organs and caches |
| Local agents | Mac mini, Sam laptop, Moto G workers | Cells and mitochondria |
| Agent messages | Agent Bridge / Mattermost/Rocket.Chat later | Extracellular signaling |
| Telegram | Notification and emergency transport | Messenger hormone, not the skeleton |

The cloud hub should store enough shared state that the organism keeps continuity, but the local computers should keep doing the heavy/private work.

## What Gemini's Page Is

The pasted Gemini page is a good first **Neural Spatial Workspace**.

It should be treated as:

- a visible tactical board;
- an ADHD-friendly spatial map;
- a human approval surface;
- an energy-mode switch between high-metabolism and low-metabolism work;
- a future control panel for local worker cells.

It should **not** be treated as the backend itself.

The current Grok Go website already has the Terrarium as the public microscope. The Midspace page should be a second surface:

```text
/             public terrarium / research demo
/midspace     private or semi-private workbench for Jeff + Sam
```

The first prototype route is static/client-side. The next step is to connect it to real storage.

## The Core Product Idea

This can become a saleable product:

> An ADHD-friendly agent-organism command center that captures scattered ideas, digests them into ranked work, routes them to local/cloud agents, and keeps humans in control of expensive or risky execution.

The sellable wedge is not "another kanban board."

The wedge is:

- capture everything without shame;
- prevent shiny-object overload;
- score work by leverage;
- keep only a few active cells alive;
- preserve the rest without guilt;
- connect local AI workers to shared memory;
- require approval gates for money, posting, credentials, and infrastructure.

## Shared Space Vs Connected Computers

Jeff and Sam do **not** need to share one filesystem.

They need one shared canonical hub plus local adapters.

### Shared Canonical Hub

Stores:

- cards;
- task state;
- approvals;
- public-safe notes;
- artifact indexes;
- links to raw files;
- digest summaries;
- cross-agent receipts.

### Jeff Local Adapter

Runs on Jeff's Mac mini.

It can:

- watch Downloads, repos, screenshots, Agent Bridge logs, Grok Go logs;
- summarize with local Qwen;
- upload selected artifacts;
- push public-safe docs to GitHub;
- keep private raw data local unless explicitly shared.

### Sam Local Adapter

Runs on Sam's machine.

It can:

- watch Sam's repos and notes;
- read the public Grok Go repo;
- produce integration maps;
- upload only what Sam approves;
- keep Sam-private data local.

### Why This Is Better

This avoids forcing both humans into one messy shared drive.

Each computer remains its own organ, but the shared hub gets a clean index and shared action state.

## Storage Recommendation

### 1. GitHub

Use for:

- code;
- public-safe docs;
- research paper;
- specs;
- prompts;
- reproducible scripts.

Do not use GitHub for:

- raw screenshots;
- giant chat exports;
- private X archives;
- credentials;
- customer/client/private financial data;
- video dumps.

### 2. Vercel Blob Or S3-Compatible Storage

Use for:

- images;
- PDFs;
- markdown exports;
- videos;
- zipped source packs;
- generated visuals;
- public downloadable artifacts.

Vercel Blob is attractive because it plugs directly into the existing Vercel app.

Important constraints as of the June 2026 Vercel docs:

- Hobby includes limited Blob usage; the Blob pricing page lists **1 GB/month** included for Hobby storage.
- Maximum individual file size is **5 TB**.
- Blobs larger than **512 MB** are not cached and will generate cache misses on access.
- Server uploads can cost more than client uploads, so direct client uploads are preferred for user uploads.

### 3. Database

Use a real database for:

- task cards;
- artifact metadata;
- users;
- access controls;
- approvals;
- source pointers;
- digest state;
- cell status;
- retrieval indexes.

Good choices:

- Neon Postgres through Vercel Marketplace;
- Supabase Postgres;
- Turso/SQLite sync if we want a local-first style later;
- plain local SQLite first, then migrate when the model is stable.

The first version can be JSON or SQLite locally, but the first serious shared version should be Postgres.

### 4. Telegram

Telegram should **not** be the primary database.

It can be useful for:

- notifications;
- approval pings;
- quick file drop;
- human-in-the-loop messages;
- emergency transport;
- a cheap backup lane for small artifacts.

But it is not a clean backend.

Official Bot API constraints matter:

- sending files by URL is limited to 5 MB for photos and 20 MB for other content;
- multipart upload through the normal Bot API is limited to 10 MB for photos and 50 MB for other files;
- `file_id` reuse works after Telegram has the file, but those IDs are bot-specific and not a durable storage API contract.

Telegram-as-unlimited-storage is clever but brittle. Treat it as an auxiliary organ, not the skeleton.

## Upload And Retrieval Flow

The workflow should look like this:

```text
Jeff/Sam captures idea, link, screenshot, export, repo note, or voice note
  -> /midspace intake endpoint receives it
  -> raw file goes to Blob/local storage
  -> metadata card goes to database
  -> local worker summarizes and tags it
  -> Mining Engine finds nearest neighbors
  -> Researcher proposes lane and score
  -> human approves activation
  -> correct cell executes
  -> receipt goes back to hub
```

Retrieval should use two layers:

1. **Fast card search** from database metadata.
2. **Deep artifact retrieval** from stored markdown/files/vector index when needed.

Do not shove raw files into model context unless the Researcher asks for a specific slice.

## Data Model V0

Start with these entities.

```text
IdeaCard
  id
  title
  body
  source_type
  source_owner
  source_url
  artifact_ids
  lane
  metabolism
  impact
  effort
  risk
  revenue_potential
  public_signal
  status
  created_at
  updated_at

Artifact
  id
  filename
  mime_type
  storage_provider
  storage_key
  sha256
  visibility
  owner
  summary
  tags
  created_at

Approval
  id
  action_type
  target_id
  proposed_by
  risk_level
  prompt
  status
  decided_by
  decided_at

Cell
  id
  name
  role
  machine
  status
  current_task_id
  metabolism_mode
  last_seen_at

Receipt
  id
  cell_id
  task_id
  message
  artifact_ids
  commit_sha
  created_at
```

## Access Model

Split the app into three membranes.

### Public

Can see:

- Terrarium;
- public research paper;
- public docs;
- public telemetry replay;
- contribution links.

Cannot see:

- private intake;
- raw files;
- approvals;
- private Jeff/Sam project cards.

### Collaborator

Sam and trusted collaborators can see:

- shared business board;
- selected docs;
- selected artifacts;
- shared approvals;
- assigned work.

### Private

Jeff-only / Sam-only data remains local or private unless deliberately shared.

## Build Order

### Phase 1: Prototype

- Add `/midspace` as a static interactive route.
- Keep data client-side.
- Use it to refine the lanes, language, and visual model.

### Phase 2: Local Data

- Store cards in local JSON or SQLite.
- Add CLI script: `midspace ingest <file-or-url>`.
- Add local watcher for Jeff's Downloads and Agent Bridge exports.

### Phase 3: Shared Cloud Hub

- Add auth.
- Add Postgres for cards/approvals.
- Add Blob for file uploads.
- Add direct upload from browser to Blob.
- Add admin-only visibility for private cards.

### Phase 4: Local Cell Sync

- Jeff Mac mini adapter posts receipts and digests.
- Sam adapter posts repo/project maps.
- Local Qwen performs cheap summaries and dedupe.
- Larger models only get selected context.

### Phase 5: Productization

- Public landing/demo stays clean.
- Private Midspace becomes the product surface.
- Add pricing/donation/sponsor paths only after the safety gates are clear.

## What To Avoid

- Do not dump everything into GitHub.
- Do not expose private local logs through Vercel.
- Do not make Telegram the canonical database.
- Do not let agents post, spend, or bet without human approval.
- Do not start with a giant custom backend before the board behavior is right.
- Do not make every captured idea become active work.

## Immediate Recommendation

Keep the current public Grok Go Terrarium at `/`.

Add `/midspace` as the ADHD-friendly workspace prototype.

Then build one ingestion path:

```text
paste idea/link -> creates incubation card -> local worker summarizes -> human approves lane
```

That one loop proves the product.

Everything else is an organ we add after the first loop breathes.
