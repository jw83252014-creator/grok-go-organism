# Agent Bridge Dashboard

This folder is the durable GitHub-facing home for the dashboard concept.

The dashboard is the conscious interface for the Grok Go / Agent Bridge organism. It should make the living system legible from a phone or browser without exposing unsafe controls.

## Model

```text
Human operator
  <-> dashboard / terminal / approval surface
  <-> Researcher + Mining Engine subconscious layer
  <-> agent cells
  <-> Mac mini body substrate
```

The dashboard is not one giant control panel. It is a set of small bounded dashboard-cells. Each panel, knob, meter, or button has:

- an owner cell;
- a data source;
- an allowed action;
- a risk gate.

## Current Artifacts

- Architecture note: `../docs/dashboard-as-conscious-interface.md`
- Roadmap: `../docs/organism-dashboard-roadmap.md`
- Research paper section: `../research-paper/grok-go-living-research-organism.md`
- Panel/cell manifest: `panel-cell-manifest.json`

## Public / Private Boundary

The public Terrarium can show sanitized telemetry, research progress, repo links, paper links, and high-level vitality.

The private Control Room can show raw logs, approvals, credits, account-adjacent status, pending actions, and operational blockers.

The public dashboard must never become a control plane for posting, trading, shell commands, funding, credentials, billing, account changes, or unbounded loops.

## First Build Target

1. Generate a private `organism-status.md` from Agent Bridge state.
2. Generate a small JSON status file from the same state.
3. Render a phone-first Easy List from that JSON.
4. Keep each panel mapped to a cell in `panel-cell-manifest.json`.
5. Add public Terrarium output only after sanitizing the data.
