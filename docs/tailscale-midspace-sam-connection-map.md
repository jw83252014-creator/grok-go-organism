# Tailscale Midspace / Sam Connection Map

**Status:** live-network connection notes  
**Date:** June 2026  
**Purpose:** Explain how Midspace connects to Grok Go, Agent Bridge, and Sam's `omen-01` machine over Tailscale.

## Short Version

Midspace is the private workbench/control surface.

Grok Go is the organism/cell system.

Agent Bridge is the nervous system.

Tailscale is the membrane that lets Jeff and Sam's machines talk privately without exposing the control surfaces to the open web.

Current Mac mini Tailscale identity:

```text
rentamacs-mac-mini-2
100.89.238.84
```

Sam's machine:

```text
omen-01
100.127.167.12
status observed: offline, last seen 23h ago
```

Private Midspace URL for Sam when `omen-01` is online on Tailscale:

```text
http://100.89.238.84:3011/midspace
```

Private Agent Bridge URL:

```text
http://100.89.238.84:8787
```

Private Agent Bridge state API:

```text
http://100.89.238.84:8787/api/state
```

## What Is Connected Right Now

### 1. Public Repo / Vercel Connection

The Midspace code is committed into the Grok Go organism repo.

This connects it to Grok Go as public epigenetic memory:

```text
GitHub repo -> Vercel deploy -> public website route
```

Public route after Vercel deployment:

```text
https://grok-go.vercel.app/midspace
```

This is currently a prototype page. It does not yet store real private cards in a database.

### 2. Private Tailscale Connection

The local dev Midspace app is running on the Mac mini and listening on all interfaces at port `3011`.

That means Sam can reach it over Tailscale using:

```text
http://100.89.238.84:3011/midspace
```

This is the clean private workbench lane.

### 3. Agent Bridge Connection

Agent Bridge is running on the Mac mini at port `8787` and is reachable over Tailscale.

It currently contains:

- agents;
- meeting log;
- tasks;
- attachments;
- approvals.

Observed state:

```text
agents: jeff, sam, keystone, frankenstein, claude, grok, grok-terminal, origin, castor, chatgpt-2, rivet, nova, null, scout, librarian, doombot47
meeting entries: 250
task text length: large
approvals: 6
```

This is the nervous system Midspace should read from first.

### 4. Terrarium Telemetry Connection

The telemetry bridge is running at:

```text
http://127.0.0.1:8799
ws://127.0.0.1:8799/ws/terrarium
```

It is intentionally bound to localhost only.

That is good.

It tails:

- `~/.grok/logs/unified.jsonl`
- `~/mining-engine/.git/logs/HEAD`
- Grok Go receipt directory
- curated study replay events

This should stay read-only and local unless we intentionally create a safe proxy.

## The Three-Layer Model

### Public Skin

```text
https://grok-go.vercel.app
```

For:

- public research demo;
- Terrarium replay;
- repo links;
- research paper;
- public explanation;
- future supporter/funding page.

Not for:

- private Jeff/Sam cards;
- raw logs;
- credentials;
- approvals;
- private uploads.

### Private Tailscale Workbench

```text
http://100.89.238.84:3011/midspace
http://100.89.238.84:8787
```

For:

- Jeff/Sam private command center;
- active cells;
- approvals;
- Sam integration;
- agent receipts;
- local debugging;
- work-in-progress uploads.

### Local-Only Organs

```text
127.0.0.1:8799  Terrarium telemetry
local Grok terminal
local Qwen model
local filesystem watchers
```

For:

- private logs;
- live terminal state;
- local model work;
- raw mining/digestion;
- sensitive experiment telemetry.

## Current Security Note

Tailscale Funnel is currently enabled for:

```text
https://rentamacs-mac-mini-2.tail7ca8d7.ts.net
  /       -> http://127.0.0.1:8788
  /bridge -> http://127.0.0.1:8787
```

That means Hermes and Agent Bridge may be reachable through the Funnel URL, depending on Tailscale access rules and Funnel exposure.

Sam does **not** need Funnel access if he is on Tailscale.

Recommended direction:

- Use Tailscale private IP/name for Sam.
- Do not add `/midspace` to Funnel yet.
- Keep public Vercel as the public demo.
- Keep private control surfaces private.

## How Midspace Should Connect Next

### Phase 1: Read Agent Bridge

Midspace should fetch:

```text
GET http://100.89.238.84:8787/api/state
```

Then render:

- active agents;
- pending approvals;
- latest receipts;
- tasks;
- attachments;
- Sam lane.

### Phase 2: Write Intake To Agent Bridge

Midspace should POST new captured ideas to Agent Bridge:

```text
POST http://100.89.238.84:8787/api/task
POST http://100.89.238.84:8787/api/say
```

This gives the organism one shared nervous system before we add a database.

### Phase 3: Add Real Storage

Once the behavior is right:

- Postgres for cards/approvals;
- Blob/S3/R2 for uploads;
- local adapters on Jeff and Sam machines;
- optional Mattermost/Rocket.Chat for multi-agent rooms.

### Phase 4: Sam Local Adapter

Sam's `omen-01` should eventually run a local adapter that:

- reads Sam-approved local project folders;
- reads Jeff's public Grok Go repo;
- posts summaries/receipts to Agent Bridge;
- writes integration proposals into Midspace;
- never requests secrets or spends money.

## Human Jeff / Sam Steps

### Human Jeff

Keep Mac mini awake and services running.

Do not share Funnel URLs as the private workbench path.

Use this local/private Midspace URL:

```text
http://100.89.238.84:3011/midspace
```

### Human Sam

Start Tailscale on `omen-01`.

Open:

```text
http://100.89.238.84:3011/midspace
```

Then open Agent Bridge if needed:

```text
http://100.89.238.84:8787
```

If those do not load, first check whether `omen-01` shows online in Tailscale.

## North Star

The connection should feel like:

```text
Jeff's Mac mini = organism lab
Sam's Omen = cofounder workstation cell
Tailscale = private membrane
Agent Bridge = nervous system
Midspace = shared prefrontal cortex
Grok Go = active research/build organism
Vercel = public microscope
```

Keep the public microscope public.

Keep the nervous system private.
