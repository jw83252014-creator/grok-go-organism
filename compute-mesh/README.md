# Grok Go Compute Mesh

Status: planning / approval-gated

This folder defines the safe version of the compute mesh: local models, approved free endpoints, and approved free-tier VM/container workers behind private networking and explicit budgets.

It is not a botnet, shared-key pool, billing evasion scheme, or public autonomous cloud. Every node must have an owner, allowed jobs, network boundary, budget, log path, and kill switch.

## Routing Tiers

```text
Tier 0: Mac mini local Qwen and deterministic scripts
Tier 1: approved free-provider gateway
Tier 2: logged-in web/desktop lanes such as Vega Fable, Morpho Gemini, Grok web
Tier 3: paid frontier APIs such as Claude Fable 5
```

## Rules

- Use legitimate free tiers only.
- No shared-key dumps or credential scraping.
- No hidden billing, auto-scaling, or credit-card-backed background jobs.
- Keep internal routers and workers Tailscale/private by default.
- All public posting, account mutation, trading, spending, and paid-model calls require Jeff approval.
- Every model call should write a receipt with node, model, task, output artifact, and cost/free-tier status.

## First Nodes

See `nodes.json`.

Planned bootstrap:

1. Keep `mac-mini-local` active as the default reflex brain.
2. Review one self-hosted free LLM gateway locally before wiring it.
3. Add Oracle Always Free only after Jeff completes account setup and approves a Tailscale-only worker.
4. Add Claude Fable 5 only after Jeff creates an Anthropic key and approves a smoke-test budget.

## Kill Switches

Each live worker should support at least one clean stop path:

- local launchd service disable;
- tmux session stop;
- Docker compose down;
- Tailscale ACL/offline;
- API key removal or budget cap.

If a node cannot be stopped cleanly or explain what it is allowed to touch, it is not ready for autonomous use.
