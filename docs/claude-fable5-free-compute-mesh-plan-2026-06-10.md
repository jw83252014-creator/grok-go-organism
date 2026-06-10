# Claude Fable 5 + Free Compute Mesh Plan

Date: 2026-06-10
Status: planning / approval-gated

## Verification

Claude Fable 5 is real and officially announced by Anthropic on 2026-06-09.

Official facts to preserve:

- Claude Fable 5 is a Mythos-class model made available for general use.
- API model ID: `claude-fable-5`.
- Claude Mythos 5 is not generally available; it is limited to Project Glasswing / trusted access.
- Fable 5 has a 1M token context window and 128k max output in the Claude API docs.
- Pricing is paid API pricing: `$10 / MTok` input and `$50 / MTok` output.
- Anthropic says Fable 5 is included for Pro, Max, Team, and seat-based Enterprise subscription users through 2026-06-22, with usage credits required starting 2026-06-23 unless capacity changes.

Sources:

- https://www.anthropic.com/news/claude-fable-5-mythos-5
- https://platform.claude.com/docs/en/about-claude/models/overview
- https://platform.claude.com/docs/en/release-notes/overview
- https://platform.claude.com/docs/en/about-claude/pricing

## Core Routing Decision

Do not make Fable 5 the default organism brain.

Use it as a rare high-intelligence escalation layer:

```text
Tier 0: Local Qwen / deterministic scripts
  Cheap reflexes, compression, triage, receipts, clustering.

Tier 1: Legitimate free endpoint gateway
  GitHub Models, Groq, Cerebras, OpenRouter :free, Gemini free, Cloudflare Workers AI, etc.
  Prefer one self-hosted local /v1 gateway so cells do not hard-code providers.

Tier 2: Logged-in web/desktop subscription lanes
  Claude Desktop / Vega Fable, Gemini/Morpho, Grok web.
  Good for manual or browser-adapter work while credits/subscription allow.

Tier 3: Paid frontier escalation
  Claude Fable 5 API, xAI paid, OpenAI paid.
  Use only after local/free paths fail or when the task has high value.
```

## Where Fable 5 Belongs

Good fits:

- Researcher Layer: difficult synthesis, emergence detection, methodology drafting.
- Morpho support: formalizing Vitality Index, paper architecture, and long-context biological framing.
- Intelligence Forager: hard scenario trees and synthesis from many noisy signals.
- Prediction Market Cell: probability-path analysis and uncertainty review, with no trades without approval.
- Creative Department: high-value story structure, trailer scripts, canon, and visual direction.
- Funding Forager: polishing high-stakes personalized pitches after local/free drafting.

Bad fits:

- Background loops.
- Routine summaries.
- Bulk extraction.
- Chat harvesting.
- Always-on dashboard commentary.
- Any task that can be handled by local Qwen, deterministic scripts, or free endpoint routes.

## Spend Gate

Before any Fable 5 API call:

1. State the task and why local/free models are insufficient.
2. Estimate prompt/output size and approximate cost.
3. Confirm the call is not public posting, trading, account mutation, credential handling, or high-risk external action.
4. Require Jeff approval unless there is a pre-approved tiny smoke-test budget.
5. Log model, task, estimated cost, actual token count, and artifact path.

No unbounded loops. No autonomous retries. No container background job may call Fable 5 without an explicit spend cap.

## Free Compute Mesh

The safe version of the "network of free cloud compute" is a private, auditable mesh of legitimate free-tier nodes and local models:

```text
Mac mini local Qwen
  -> default reflex brain

Self-hosted free LLM gateway
  -> one local OpenAI-compatible /v1 endpoint
  -> pools approved free keys
  -> exposes routing/failover telemetry

Oracle Always Free ARM VM
  -> candidate remote worker/router node
  -> Tailscale-only access
  -> Docker worker, queue tailer, light model/server/gateway jobs

GitHub/Groq/Cerebras/OpenRouter/Gemini/Cloudflare
  -> provider endpoints inside the gateway
  -> no shared keys, no stolen keys, no ToS evasion

Fable 5 API
  -> expensive expert brain
  -> not part of free metabolism
```

Rules:

- Use only legitimate free tiers and accounts Jeff controls.
- One account per provider unless the provider explicitly allows more.
- No shared-key dumps.
- No hidden billing or credit-card-backed auto-scaling.
- No public exposure of internal routers; use Tailscale/private interfaces.
- Every node needs a name, owner, purpose, allowed actions, budget, log path, and kill switch.

## Minimal Node Manifest

Start with a file like `/Users/rentamac/grok-go-organism-share/compute-mesh/nodes.json`:

```json
{
  "nodes": [
    {
      "id": "mac-mini-local",
      "kind": "local",
      "endpoint": "http://127.0.0.1:8000/v1",
      "brains": ["qwen3.5-4b"],
      "allowed_jobs": ["triage", "compression", "receipts", "clustering"],
      "spend": "zero",
      "network": "local",
      "status": "active"
    },
    {
      "id": "free-llm-gateway",
      "kind": "local-router",
      "endpoint": "http://127.0.0.1:8080/v1",
      "brains": ["approved-free-provider-pool"],
      "allowed_jobs": ["foraging", "drafting", "researcher-low-metabolism"],
      "spend": "free-tier-only",
      "network": "tailscale/private",
      "status": "planned"
    },
    {
      "id": "oracle-free-arm-01",
      "kind": "free-vm",
      "endpoint": "tailscale-only",
      "brains": ["light-router", "queue-worker", "small-local-model-if-viable"],
      "allowed_jobs": ["queue-tail", "gateway", "source-mirror", "light-worker"],
      "spend": "free-tier-only",
      "network": "tailscale/private",
      "status": "needs-human-signup"
    },
    {
      "id": "claude-fable5-expert",
      "kind": "paid-frontier-api",
      "model": "claude-fable-5",
      "allowed_jobs": ["deep-research", "paper-methodology", "hard-synthesis", "high-value-creative"],
      "spend": "paid-approval-gated",
      "network": "anthropic-api",
      "status": "needs-key-and-budget"
    }
  ]
}
```

## Immediate Build Order

1. Add Fable 5 as a `needs-key` model/provider lane in Agent Bridge.
2. Add usage rules to the Metabolism Checker and Cell Catalog.
3. Review the existing free gateway spec from `grok-cell/turn-20260607-080608.md`.
4. Create `compute-mesh/nodes.json` and `compute-mesh/README.md`.
5. If Jeff approves, run a local-only gateway snapshot: `GET /v1/models`, one tiny prompt, capture routing headers/telemetry.
6. After Jeff signs into Oracle Free Tier, provision a Tailscale-only VM worker with Docker and no public LLM port.
7. Only after Anthropic key/budget approval, run one tiny Fable 5 smoke test on a high-value planning task.

## Dashboard Card

`FABLE 5 / FREE MESH`

Local/free first. Fable 5 only for hard synthesis. Free cloud nodes must be Tailscale-private, ToS-clean, and receipt-logged. Status: Fable API needs key; free mesh needs gateway review.
