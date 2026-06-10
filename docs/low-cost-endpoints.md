# Low-Cost Endpoint Tracker

Date: 2026-06-10
Status: starter tracker for Compute Hunt Mode

## Current Local State

- Claude Code: installed as `claude`, version `2.1.156`.
- `ANTHROPIC_BASE_URL`: unset.
- `ANTHROPIC_AUTH_TOKEN`: unset.
- `ANTHROPIC_API_KEY`: unset.
- `NVIDIA_NIM_API_KEY`: unset.
- `OPENROUTER_API_KEY`: unset.

## Candidates

| Provider / Route | Type | Status | First Test | Notes |
|---|---|---|---|---|
| Local Qwen | local | active | already used | Default cheap reflex brain. |
| OpenRouter -> Claude Code | gateway/API | needs key | run `claude /status` after env setup | Official OpenRouter docs support Claude Code via `ANTHROPIC_BASE_URL=https://openrouter.ai/api`. |
| NVIDIA NIM | free tier | needs key | list models + one small prompt | Candidate through direct route or proxy; one legitimate account only. |
| free-claude-code proxy | local proxy | needs review | security/code review first | Routes Claude Code to NVIDIA NIM, OpenRouter, or LM Studio. Do not expose publicly. |
| freemodel.dev | third-party OpenAI-compatible API | technical smoke OK / trust quarantine | 2026-06-10: `/v1/models` OK, `/v1/chat/completions` OK; Anthropic `/v1/messages` 404 | Jeff supplied a test key. It lists provider-advertised `gpt-*` model IDs and can answer a tiny OpenAI-compatible prompt. It is **not** a direct Claude Code / Anthropic Messages gateway. Keep it quarantined: no secrets, no private prompts, no organism memory dumps. |
| GitHub Models | free tier | needs PAT/key plan | one small OpenAI-compatible prompt | Good daily quota candidate; track per-call limits. |
| Groq | free tier | needs key | one fast small prompt | Best for speed-sensitive work. |
| Cerebras | free tier | needs key | one bulk/summarization prompt | Good token/day headroom candidate. |
| Cloudflare Workers AI | free quota | needs account/key | small prompt through worker/API | Good edge/free substrate if terms fit. |
| Gemini AI Studio | free tier | needs key/auth | Gemini CLI/API smoke test | Already tracked as auth gate. |

## Trial Rules

- One real account per provider unless terms explicitly allow team seats.
- No VPN/account-farm quota evasion.
- No shared-key dumps.
- No public router ports.
- No endpoint joins Agent Bridge until a receipt exists.

## First Test Queue

1. OpenRouter Claude Code route, if Jeff provides a key.
2. NVIDIA NIM route, if Jeff provides a key.
3. `free-claude-code` proxy code review, no install/run until approved.
4. freemodel.dev — technical OpenAI-compatible smoke passed, still trust-quarantined.
5. freellmapi/free gateway local snapshot for OpenAI-compatible workloads.

## freemodel.dev Result: 2026-06-10

Receipts:

- `receipts/compute-hunt/freemodel-smoke-2026-06-10T05-06-22-753Z.json`
- `receipts/compute-hunt/freemodel-anthropic-shape-2026-06-10T05-06-56-543Z.json`

Observed:

- `GET https://api.freemodel.dev/v1/models`: 200 OK.
- `POST https://api.freemodel.dev/v1/chat/completions`: 200 OK with tiny `FM_OK` smoke output.
- Provider-advertised model IDs included `gpt-5.5`, `gpt-5.4`, `gpt-5.4-mini`, and `gpt-5.3-codex`.
- `POST https://api.freemodel.dev/v1/messages`: 404.
- `POST https://api.freemodel.dev/v1/messages/count_tokens`: 404.

Conclusion:

- Works as an OpenAI-compatible route for tiny, non-sensitive, disposable tests.
- Does **not** work as direct Claude Code access because Claude Code needs an Anthropic Messages-compatible gateway or a supported Bedrock/Vertex path.
- Could be tested behind a local Anthropic-to-OpenAI proxy later, but only after proxy security review.

## Forager's Rule

Before any endpoint joins the living dashboard: (1) **trust** — prefer first-party providers or self-hosted gateways; anonymous routers are quarantined because they can see every prompt; (2) **terms** — one honest account, no VPN/alias farms; (3) **receipts** — no endpoint joins Agent Bridge without a no-secret test receipt.

The sturdy free substrate is still **local Qwen + Oracle Always Free candidate + Groq/Gemini/GitHub Models/NVIDIA/Cloudflare free tiers + approved routers**. freemodel.dev is a temporary experimental route, not the foundation.
