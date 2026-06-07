# Grok Go — Free / low-cost LLM endpoint arsenal

Jeff's ask: *"give grok all kinds of endpoints to have at his disposal... there has to be a ton of free shit out there."* There is. This is the catalog. Verified June 2026.

**How Grok Go uses this:**
- **On the FREE local model (now):** reason over this list, prioritize, document how to wire each. Can't live-browse.
- **On the GROK $200 hybrid (when flipped):** Grok has live web/X tools — crawl the aggregator repos + X + Reddit for NEW endpoints and append them here.
- **To actually wire one** as a backup brain: add `base_url` + key to `~/.hermes/config.yaml` `fallback_providers`. Free keys only — **never auto-wire a paid endpoint** (the OpenAI-fallback-during-a-crash already burned money once; removed).

---

## Tier 1 — FREE, no credit card, just a free key (best value)

| Provider | OpenAI-compatible base URL | Free limit | Get key |
|---|---|---|---|
| **Google Gemini** (AI Studio) | `generativelanguage.googleapis.com/v1beta/openai/` | ~1,500 req/day Flash, **1M context** | aistudio.google.com |
| **Groq** | `api.groq.com/openai/v1` | 30 RPM / 1,000 RPD, **fastest** | console.groq.com |
| **Cerebras** | `api.cerebras.ai/v1` | **1M tokens/day**, very fast | cloud.cerebras.ai |
| **GitHub Models** | `models.github.ai` | **1M tokens/day** — free for any GitHub user (✅ Jeff already has GitHub) | a GitHub PAT |
| **OpenRouter** | `openrouter.ai/api/v1` | many `:free` models, 20 RPM / 50 RPD (1,000 RPD if ≥$10 balance) | openrouter.ai |
| **Cloudflare Workers AI** | `api.cloudflare.com/.../ai/run` | 10,000 neurons/day | CF account |
| **Mistral** (La Plateforme) | `api.mistral.ai/v1` | free experimental tier | console.mistral.ai |
| **NVIDIA NIM** | `integrate.api.nvidia.com/v1` | free credits, 60+ models | build.nvidia.com |
| **SambaNova** | `api.sambanova.ai/v1` | free tier, fast | cloud.sambanova.ai |
| **HuggingFace** | `router.huggingface.co/v1` | free serverless tier | hf.co |
| **Z.ai / Zhipu (GLM)** | `api.z.ai/...` | free tier | z.ai |
| **Cohere** | `api.cohere.com` | free trial keys | cohere.com |

## Tier 0 — KEYLESS (no signup at all)

- **Pollinations** — `text.pollinations.ai/openai`, model `openai`. ✅ *Tested working* but **anonymous = queued (1 concurrent), rate-limited**. Fine for occasional calls, NOT a reliable primary fallback.
- **OVHcloud AI Endpoints** — no-registration basic access, 30+ models, GDPR. (verify path)

## Nous Research specifically (Jeff asked)

- **Nous Portal** (`portal.nousresearch.com`) — the "free" tier is only **$0.10/mo credit = evaluation only**, NOT real workloads. Real use needs $20 Plus / $100 Super / $200 Ultra, OR you supply your own keys. It's **powered by OpenRouter** (236 models).
- **Honest take:** the Nous *portal* "free" isn't actually useful-free. Two better moves for the same Nous models:
  1. **Hermes 3 405B is FREE on OpenRouter** → `nousresearch/hermes-3-llama-3.1-405b:free`
  2. Run Hermes/Qwen **weights locally** (already doing this — Qwen on `:8000`, $0).

## Already in the arsenal

- **Local Qwen** `127.0.0.1:8000` — free, the default brain. (16GB mini = memory-bound; watchdog auto-restarts it.)
- **xAI Grok** — $200 pay-as-you-go, the paid hybrid brain (flip to this for live web/X/Reddit crawling).

## Aggregators — keep mining these (Grok Go: scrape on the hybrid)

- `github.com/cheahjs/free-llm-api-resources` — the canonical maintained list
- `github.com/amardeeplakshkar/awesome-free-llm-apis` — permanent-free, OpenAI-compat flags
- `github.com/mnfst/awesome-free-llm-apis`
- `github.com/tashfeenahmed/freellmapi` — a proxy that stacks 16 free tiers (~1.7B tokens/mo) behind one `/v1` (personal use)

## Recommended free fallbacks to wire next (need free keys from Jeff)

1. **GitHub Models** — Jeff already has GitHub; 1M tok/day; just needs a PAT.
2. **Groq** — fastest, dead-simple free key.
3. **Cerebras** — 1M tok/day headroom.

Wire shape (`~/.hermes/config.yaml`):
```yaml
fallback_providers:
  - name: groq
    provider: custom
    base_url: https://api.groq.com/openai/v1
    model: llama-3.3-70b-versatile
    api_key_env: GROQ_API_KEY
```

---
*Sources: openai.com/api/pricing, OpenAI Help Center (data-sharing free tokens), portal.nousresearch.com, openrouter.ai, console.groq.com, cloud.cerebras.ai, github.com/cheahjs/free-llm-api-resources, tokenmix.ai/blog/free-llm-api. Built 2026-06-07.*
