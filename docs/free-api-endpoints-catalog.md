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

## Grok Go evaluations

*Appended 2026-06-07 by GROK cell (PAID grok-build) via targeted web/X research on canonical cheahjs/free-llm-api-resources + cross-checks (other GitHub aggregators, recent X posts about free endpoints). Purpose: expand "arsenal" for low-metabolism foraging, Mining Engine observer, Researcher Layer population loops, self-improvement, and paper work — without spending. Only legitimate permanent-free / no-CC tiers, OpenAI-compatible preferred. Never auto-wire paid or shared keys.*

### Key updates from upstream (cheahjs as of 2026-06-07) + recency signals
- **OpenRouter :free** (20 RPM / 50 RPD shared; up to 1k RPD w/ $10 lifetime topup): Major expansion. Standouts for organism: `nousresearch/hermes-3-llama-3.1-405b:free` (aligns with Hermes agent handoff + multi-agent coordination), `openai/gpt-oss-120b:free` + `20b:free`, multiple `nvidia/nemotron-*-free` (nano/super/omni/reasoning), `qwen/qwen3-coder:free` + `qwen3-next-80b-a3b-instruct:free`, `z-ai/glm-4.5-air:free`, `deepseek/deepseek-v4-flash:free`, `minimax/minimax-m2.5:free`, `moonshotai/kimi-k2.6:free`, `liquid/lfm-2.5-*`, poolside variants, gemma-4 frees. Models share quota — good for variety in evals / fallback diversity.
- **GitHub Models** (1M tokens/day free tier for GitHub users; Jeff already has access): Now lists Grok 3 + Grok 3 Mini, OpenAI gpt-5 / gpt-5-chat / gpt-5-mini/nano, o1/o1-mini/o3/o3-mini/o4-mini, DeepSeek-R1 / R1-0528 / V3-0324, Llama 4 Maverick 17B + Scout 17B, Meta-Llama-3.1-405B, Mistral Medium/Small, Phi-4 family, AI21 Jamba, Cohere Command A/R+, embeddings. Restrictive per-call tok limits upstream — evaluate for structured output (research notes, paper sections, mining receipts) where quality > volume.
- **Groq**: Added Llama 4 Scout Instruct (high speed/context), `openai/gpt-oss-120b` + `20b`, `groq/compound` + `compound-mini`, `qwen/qwen3-32b`, Allam 2 7B. Retains "fastest" crown (1k–14.4k RPD range). Primary candidate for time-sensitive researcher or X-radar loops.
- **Cerebras**: `gpt-oss-120b` + Llama 3.1 8B @ 1M tokens/day + 14.4k req/day. Bulk processing / low-metabolism headroom.
- **Cohere**: Expanded to command-a-* (reasoning/translate/vision) + command-r* family; 20 RPM / 1k req/mo shared.
- **Cloudflare Workers AI** (10k neurons/day): Added `gpt-oss-*`, kimi-*, nemotron-3-120b, qwen3-30b, glm-4.7, Llama 4 Scout, many LoRAs + small models. Edge/low-overhead option.
- **Additional free/near-free**: OpenCode Zen (curated free models e.g. Nemotron 3 Super Free, DeepSeek V4 Flash Free — may use data for improvement); Vercel AI Gateway ($5/mo credit, routes providers).
- **Trial-credit providers** (use sparingly, for targeted evals only): Scaleway Generative APIs (1M free tokens), SambaNova ($5/3mo), Hyperbolic ($1), Inference.net ($1 + survey), Nebius/Fireworks ($1), Novita ($0.5/1yr), Modal ($5/mo), etc. Alibaba 1M tok/model. Mistral/Codestral still require phone for full free tier.
- **Self-hosted aggregator pattern** (high strategic fit): MrFadiAi/free-llm-gateway — single localhost:8080/v1 OpenAI-compat endpoint aggregating 24+ (OR free + GitHub + Groq + Cerebras + HF + NVIDIA + Samba + DeepSeek + Together + Fireworks + ...), automatic fallback routing, rate-limit tracking, web dashboard. MIT? Directly echoes "compounding systems", "skills that learn", "Midspace Hub", local structured over pure cloud, multi-cell handoff. Evaluate for wiring into organism as resilient brain bus (reduces single-tier exhaustion).
- **X recency (2026-06-07)**: Agnes AI free Agnes-2.0 API (text/image/video, 20 RPM, Agnes-2.0-Flash on Claw-Eval leaderboard) called out for "small Codex/OpenClaw experiments at $0" and "smoke tests / learn failure modes before burning paid". Worth cautious eval for non-critical foraging (verify current terms; not a primary).

### Grok Go specific eval / wiring priorities (for subsequent turns)
1. **Immediate**: GitHub Models (PAT only), Groq, Cerebras — zero or trivial new signup, high daily headroom, already recommended in prior "wire next".
2. **Reasoning depth**: OpenRouter free Hermes 3 405B + gpt-oss-120b — compare vs local Qwen in researcher loops or paper drafting (Hermes alignment bonus).
3. **Resilience / compounding**: Prototype or study free-llm-gateway (or similar) as local routing layer for cells. Enables "foraging state" selection among free gradients without central dependency. Fits anti-extraction + self-sustainability.
4. **Process**: On hybrid (paid) turns, re-mine cheahjs + awesome-free-llm-apis repos + X/Reddit for deltas; append here. On local: reason over this catalog to pick fallbacks. Add `~/.hermes/config.yaml` entries only for verified free (never paid auto).
5. **Metrics to track in evals**: effective tokens/day realized, latency for mining/reasoner tasks, output structure quality (for receipts/wiki), rate-limit behavior under sustained low-metabolism load, data-use / ToS notes.

*This section turns the static catalog into an active organism resource map. Revisit on each hybrid turn. Sources refreshed via tools this turn; upstream changes rapidly — treat as living.* (2026-06-07 delta appended below by GROK cell.)

### Fresh delta — 2026-06-07 (GROK cell, PAID grok-build turn via web research)

- **cheahjs/free-llm-api-resources** (raw README fetch + web_search cross-checks on GitHub last commit, Reddit, aggregators): Upstream last meaningful update May 28 2026 (commit a331293 "Update README with latest models"). No *new permanent free Tier 1 providers* or major limit changes beyond those already in the Grok Go evaluations section. Confirmed models/limits match prior exactly (OpenRouter :free list with Hermes 3 405B, gpt-oss-120b/20b, nemotron-*-free, qwen3-*, kimi, glm-4.5-air, deepseek-v4-flash etc.; GitHub Models with Grok 3/3 Mini + gpt-5 family + o1/o3 + Llama 4 Maverick/Scout + 405B; Groq Llama 4 Scout + gpt-oss + qwen3-32b + compound; Cerebras gpt-oss-120b + Llama 3.1 8B @1M tok/day; Cloudflare 10k neurons with gpt-oss/Llama4/kimi/nemotron/qwen; Cohere command family; Google Gemini Flash/Gemma 3 variants with detailed req/day). Trial-credit providers (Fireworks $1, SambaNova $5/3mo, Scaleway 1M tok, etc.) unchanged. Google AI Studio now details many Gemma 3 smalls at 14.4k req/day.

- **High-signal NEW for Grok Go (gateway meta-layer, not direct endpoints):** Proliferation of self-hosted free-tier *pooling / aggregator gateways* (beyond the MrFadiAi/free-llm-gateway already flagged). These collapse 16-24+ catalogued providers behind *one* localhost:8080/v1 (or equiv) OpenAI-compatible endpoint with automatic routing, rate-limit tracking, failover, and usage accounting so the organism stays under every free cap.
  - tashfeenahmed/freellmapi (fresh signals across Reddit r/LLMDevs, FB dev groups, YouTube May 2026): single /v1 aggregating ~16 free tiers (Groq, Cerebras, NVIDIA NIM, Gemini, OpenRouter, Cloudflare, GitHub Models, Mistral, SambaNova, HF, DeepSeek, Together, Cohere, Z.ai + more); targets aggregate ~1B+ tokens/month; auto router + per-key usage tracking; keyless start option for some; MIT. Explicit goal: "I pooled 16 free LLM API tiers behind one OpenAI endpoint (keyless to start, MIT)".
  - Related ecosystem (github topics/free-llm, recent): multiple auto-rotating proxies + failover clients for OpenRouter :free + multi-provider (shihabshahrier/free-llm etc.; free-model-router).
  - Reinforces MrFadiAi (24+ providers incl. xAI/OpenAI/Perplexity/Anthropic too in their list, localhost + dashboard).
- **Grok Go / organism implications (ties directly to research stack + Low-Metabolism Foraging State draft):** Gateways are *durable meta free substrate* — a local, structured, compounding, anti-single-middleman bus over the independent gradients (local Qwen default + GitHub/Groq/Cerebras/OR/CF bulk). Enables real "low-metabolism foraging state" without per-turn provider roulette or single-tier exhaustion: cells point at one port, gateway handles selection/fallback. Mining Engine (observer/forager) + Researcher can log *effective* tokens/latency/quality per underlying gradient (if exposed) or blended "gateway yield" + failover events. Strategies that evolve (prompts that survive model switches, smart task sizing to cheap sub-models, local caching before gateway call, gateway-aware receipts) produce more descendant artifacts under constraint. Directly strengthens petri selection pressure, self-sustainability (#5), search efficiency, and "structured + local systems over pure cloud". No new signups or paid keys; uses only the free tiers Jeff already can approve. Reduces surface for rate limits + ToS risk.
- **Updated wiring / eval priorities (for subsequent turns):** 
  1. **Immediate (local/researcher turns):** Text-spec only (no code yet) a minimal gateway eval harness or integration note for one of (freellmapi, MrFadiAi, or equiv): how to run (python/docker?), model name mapping back to catalog for substrate-tagging in logs/receipts, simple router policy (local Qwen unless directive signals depth/speed → gateway), "foraging event" emission.
  2. **Hybrid turns:** Re-mine cheahjs + awesome-free + github free-llm topics + X/Reddit for *new direct endpoints* + gateway updates; append here. Prioritize any that expose provider telemetry for Mining Engine.
  3. **Metrics (extend existing):** effective blended tokens/day via gateway vs direct; failover success under sustained load; output structure quality (receipts/wiki/paper) when model varies; data-use/ToS notes per gateway; "metabolism survival time" in simulated low-state loops.
  4. Keep human gate: only free verified; never auto-wire anything requiring CC or that could bill.

This turns the evaluations section from static list into an active *resilience + foraging map*. The gateway pattern is the practical realization of "more free inference substrate = stronger selection environment for emergence of efficient 'metabolism' strategies".

---

*Grok Go note: More free inference substrate = stronger selection environment for emergence of efficient "metabolism" strategies in the petri dish. (See research stack: low-metabolism foraging + Mining Engine as observer.)*
