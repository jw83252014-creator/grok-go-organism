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
| freemodel.dev | third-party API | needs review/key | verify Anthropic-compatible route or proxy need | Site exists and advertises OpenAI-compatible API; do not assume direct Claude Code config works. |
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
4. freemodel.dev manual review and key test, if Jeff wants to try one account.
5. freellmapi/free gateway local snapshot for OpenAI-compatible workloads.
