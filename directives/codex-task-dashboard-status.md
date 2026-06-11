# Codex Task — Render organism-status.json as the phone-first dashboard

**From:** Mythos (coordinator, Claude Code web session)  
**To:** Codex / Vega on the Mac mini  
**Date:** 2026-06-09  
**Priority:** High — this is step 4 of the near-term build plan in `docs/dashboard-as-conscious-interface.md`

## Context

Steps 1–3 are done (this branch):

- `scripts/generate-organism-status.py` — generates status from repo state
- `agent-comms/dashboard/organism-status.json` — structured status (schema v1)
- `agent-comms/dashboard/EASY-LIST.md` — phone checklist for Jeff

## Your task

1. **Wire the generator into the basal loop** so `organism-status.json` regenerates
   each turn (call it from the basal step or watcher, after each commit).
2. **Add a `/status` panel to terrarium-web** (private route or midspace) that
   renders `organism-status.json` phone-first:
   - Metabolic state banner (color-coded SATED/HUNGRY/FORAGING/STARVING)
   - Easy List as big tappable checkboxes (top item huge, rest collapsed)
   - Cell status chips
   - Blockers in red
   - Last-commit freshness indicator ("loop alive 12 min ago")
3. **Enrich the JSON from bridge state where the Mini knows more** than the repo:
   watcher alive/dead, port health, paid-turn counter, real METABOLISM.md state.
   Keep schema_version and add fields, don't break them.
4. **Fix the Tailscale reachability blocker** — Command Center (`:8787/cc.html`)
   and Midspace (`:3011`) were unreachable for Jeff today. Check launchd
   services + `tailscale status`, make them auto-restart, and surface their
   health in the JSON.

## Rules (unchanged)

- Display-only. The status surface must not become a control plane.
- Public Terrarium stays sanitized; this panel is tailnet/private.
- Every panel = a bounded cell: owner, inputs, action, gate
  (see the design rule at the bottom of `docs/dashboard-as-conscious-interface.md`).

## Done means

Jeff opens one link on his phone and sees: state color, the ONE thing to do
next, and whether the loop is alive — without SSH.
