# Compute Hunt Mode Policy

Date: 2026-06-10
Status: active policy / planning

## Mission

Find as much legitimate low-cost and free compute as possible for Grok Go without getting accounts banned, leaking secrets, or building around unstable gray-market access.

The goal is aggressive but clean:

```text
local models first
  -> approved free tiers
  -> free gateway/router
  -> low-cost trials
  -> paid frontier only when approved
```

## Hard No

Do not do these:

- Create many accounts to evade free-tier limits.
- Use VPN/incognito/browser-profile churn to bypass provider quotas.
- Use shared-key dumps, leaked keys, or scraped credentials.
- Use Twilio or phone workarounds to mass-create accounts.
- Auto-wire providers that can bill without a cap.
- Hide public posting, API calls, or account actions from Jeff.

Reason: account farming and quota evasion can violate provider terms and get the whole stack banned. It also makes the organism fragile because the substrate disappears when the provider clamps down.

## Allowed Compute Hunt Tactics

Use these hard:

- One legitimate account per provider unless team/org usage is explicitly allowed.
- Free tiers with documented limits.
- Trial credits after Jeff approval.
- Local models: Qwen, LM Studio, llama.cpp, Ollama, MLX.
- Self-hosted gateways that route only approved keys/models.
- Provider dashboards and usage APIs for quota tracking.
- Tailscale-private worker nodes and routers.
- Receipts for every test: model, endpoint, latency, quota, output quality, ToS notes.

## Claude Code Gateway Reality

Local observed state:

- Claude Code is installed as `claude`, version `2.1.156`.
- No `ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_API_KEY`, `NVIDIA_NIM_API_KEY`, or `OPENROUTER_API_KEY` is currently set in this shell.

Official Claude Code docs say gateway routing is through environment variables such as:

```bash
export ANTHROPIC_BASE_URL="https://gateway.example/v1-or-api"
export ANTHROPIC_AUTH_TOKEN="provider-or-gateway-token"
export ANTHROPIC_API_KEY=""
```

Claude Code LLM gateway requirements:

- Anthropic Messages-compatible endpoint: `/v1/messages` and `/v1/messages/count_tokens`, or a supported Bedrock/Vertex path.
- Headers such as `anthropic-beta` and `anthropic-version` must pass through.
- Optional model discovery can be enabled with `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`.

Source:

- https://code.claude.com/docs/en/llm-gateway
- https://openrouter.ai/docs/cookbook/coding-agents/claude-code-integration

## freemodel.dev Status

freemodel.dev exists and advertises an OpenAI-compatible API.

Current tested status, 2026-06-10:

- Jeff supplied a test API key.
- `/v1/models` returned 200 OK.
- `/v1/chat/completions` returned 200 OK for a tiny smoke prompt.
- Provider-advertised model IDs included `gpt-5.5`, `gpt-5.4`, `gpt-5.4-mini`, and `gpt-5.3-codex`.
- `/v1/messages` returned 404.
- `/v1/messages/count_tokens` returned 404.
- The public dashboard/docs claim Claude Code should use a separate base URL: `https://cc.freemodel.dev`.
- `https://cc.freemodel.dev` has not been smoke-tested with Jeff's key yet.

Conclusion:

- It works technically as an OpenAI-compatible route.
- `https://api.freemodel.dev/v1` is **not** direct free Claude Code access.
- `https://cc.freemodel.dev` is a provider-claimed Claude Code route and needs a separate no-secret receipt.
- Keep it trust-quarantined: no secrets, no private memory, no full repo dumps, no autonomous loop.
- If we want Claude Code to use it, we need a reviewed local Anthropic-to-OpenAI proxy.

Do not assume Grok's `~/.config/claude-code/config.json` instructions are correct. Current official Claude Code routing is env/settings based, not that config path.

Provider-claimed Claude Code config shape:

```bash
export ANTHROPIC_API_KEY="entered-locally-not-in-chat"
export ANTHROPIC_BASE_URL="https://cc.freemodel.dev"
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC="1"
claude
```

Security note: their docs also show plaintext `apiKeyHelper` examples. Prefer a local shell prompt, macOS Keychain, or an ignored env file over committing or chatting the key.

Public Telegram group FAQ notes from Jeff:

- Credit top-ups are one-time balance; monthly plans are rate-limit tiers.
- Tier 0 request body limit is 3 MB; Tier 1+ is 5 MB.
- Slow Claude sessions should be restarted with fresh context.
- `ip_account_conflict` means only one free account per IP.
- The group suggests VPN/mobile-network workarounds, but Grok Go policy still forbids quota evasion. If blocked, use a legitimate existing key, a paid/top-up path after approval, or another provider.

## Better Claude Code Free/Low-Cost Routes To Evaluate

### 1. OpenRouter Direct

OpenRouter documents Claude Code routing directly:

```bash
export OPENROUTER_API_KEY="..."
export ANTHROPIC_BASE_URL="https://openrouter.ai/api"
export ANTHROPIC_AUTH_TOKEN="$OPENROUTER_API_KEY"
export ANTHROPIC_API_KEY=""
claude
```

Useful because it has dashboard visibility and can route to free/low-cost models.

### 2. NVIDIA NIM / OpenRouter / LM Studio Proxy

The `free-claude-code` project is a local proxy that accepts Claude Code traffic and routes to NVIDIA NIM, OpenRouter, or LM Studio.

Source:

- https://github.com/Rishurajgautam24/free-claude-code

Current status:

- Needs code/security review before running.
- Good candidate for Compute Hunt because it supports local models and free providers without pretending they are Anthropic.
- Must not be exposed publicly; localhost or Tailscale-private only.

### 3. freellmapi / free LLM gateway

Already tracked in the free endpoint catalog as a free-tier pooling router.

Good for:

- OpenAI-compatible workloads;
- local routing;
- quota/failover telemetry;
- low-metabolism foraging.

Needs:

- review;
- one local snapshot;
- no paid providers enabled;
- no shared keys.

## Provider Targets

First legal targets:

- Local Qwen / LM Studio / llama.cpp.
- GitHub Models free tier.
- Groq free tier.
- Cerebras free tier.
- NVIDIA NIM free tier.
- OpenRouter `:free` models.
- Gemini free/API Studio lane.
- Cloudflare Workers AI free quota.
- HuggingFace router/serverless.
- Mistral experimental/free routes where terms allow.

Do not create multiple accounts for the same provider unless:

- provider explicitly supports seats/team keys;
- Jeff owns the org/account structure;
- each key is tracked under a real project/user;
- terms allow it.

## Test Receipt Schema

Every endpoint test should write a receipt like:

```json
{
  "provider": "openrouter",
  "route": "claude-code-gateway",
  "model": "deepseek/deepseek-r1-0528:free",
  "account": "jeff-approved-key-001",
  "cost_mode": "free-tier",
  "quota_observed": "unknown",
  "latency_ms": 0,
  "output_ok": false,
  "tool_use_ok": false,
  "tested_at": "2026-06-10T00:00:00Z",
  "artifact": "path/to/output.md",
  "notes": "No secrets in receipt."
}
```

## Router Rule

Cells may call compute in this order:

1. deterministic scripts;
2. local Qwen / local model server;
3. approved free gateway;
4. one approved free provider route;
5. low-cost/trial route with active quota;
6. paid frontier model with Jeff approval.

No cell may bypass this order unless the task itself says why and writes the reason into the receipt.

## Dashboard Card

`COMPUTE HUNT MODE`

Aggressively find legal free/low-cost compute. No account farming, no shared keys, no hidden billing. Every endpoint gets a quota receipt before it joins the mesh.
