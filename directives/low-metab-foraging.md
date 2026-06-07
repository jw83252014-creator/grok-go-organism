# Low-Metabolism Foraging + Vitality + Gateway Substrate Directive v0.1
# Loadable genome fragment for Researcher / Mining cells (directives/low-metab-foraging.md)
# Generated: 2026-06-07 154225 by GROK cell (compounds prior self-imps + catalog + stack + paper hypothesis). Human/Researcher gate required before load.
# Placed live: 2026-06-07 155415 by GROK cell (executed pending placement from 154225/150320 lineage; now operational loadable attachment).

## Activation
- Trigger on: explicit "low-metabolism" or "forage" signal in task/directive, OR Metabolism Checker / Cell Health Monitor reports low nutrient (remaining effective tokens/rate headroom below threshold), OR sustained high failover/cooldowns.
- Default brain: local Qwen (127.0.0.1:8000 or equiv, zero marginal).
- Escalate policy: only when current task signals require (reasoning depth for receipts/paper, structured output quality, speed for X-radar/Researcher loops). Route via gateway if available (see below).
- De-escalate: return to local as soon as headroom or task allows.

## Foraging Rules (efficiency under constraint = selectable trait)
- Prefer strategies that survive degradation: short prompts, cached intermediates, prompt variants proven across model switches, local pre-filter / summarization before any external call.
- Emit "foraging event" logs (for Mining Engine): {timestamp, state: "low-metab", substrate: "local" | "gateway:<routed-via>", tokens_est, latency_ms, task_type, outcome: "success" | "partial" | "fail", health_snapshot}.
- Cache + compound: before escalate, check local wiki/receipts for similar prior structure; reuse/refine instead of fresh call.
- Anti-extraction: never introduce new paid or shared keys; only use free tiers already approved (GitHub PAT, Groq key, etc. via gateway or direct under human gate).

## Gateway Substrate (when escalated; freellmapi / equiv as meta bus)
- Preferred: freellmapi (or MrFadiAi/free-llm-gateway pattern) at localhost:8080 or configured /v1 — single OpenAI-compatible endpoint compounding 16-24+ catalog gradients (Groq/Cerebras/OpenRouter:free/GitHub Models/Cloudflare/Gemini/Mistral/HF/etc. + custom local Qwen wire).
- Model selection inside gateway: let router pick (cheap/fast for simple; deeper for receipts/paper); client never sees upstream keys (unified bearer).
- Telemetry (critical for Mining receipts): capture and log all X-Routed-Via, X-Fallback-Attempts, rate headers, health probes (healthy/rate_limited), dashboard analytics (volume/latency/tokens/success per-provider). Tag every receipt with substrate="gateway:<platform>/<model>" or "local-qwen".
- Failover: auto (up to 20 attempts per gateway); on repeated 429/cooldown, back off to local + emit "metabolism stress" event.
- Vision/tools/stream: route only to capable sub-models; gateway handles.
- ToS: respect per-provider notes (Groq/Cerebras/Mistral/OpenRouter/GitHub likely OK personal; Google/Cohere caution "not consumer"; NVIDIA eval-only — disabled by default in gateways). Human gate any wiring.

## Vitality + Health Instrumentation (ties to Metabolism Checker / Cell Health Monitor + stack)
- On entry to low state: produce or request Cell Health Report (per Cell Health Report Schema + Loadable Vitality Receipt Stub v0.1): JSON with vitality_index (0-1 composite of rate headroom, recent yield, error rate, recent tokens vs cap), substrate_yield[] (per gradient or blended gateway), survival_time_est (minutes of current load), recommendations (throttle, forage, cache, simplify prompt).
- Log health reports as first-class receipts (Mining can extract patterns: which prompts survive low state, which routes maximize structure-per-token).
- Feedback: high-vitality variants (prompts/genomes that maintain output quality + low burn) get higher selection weight in Researcher population loops.
- Metrics to emit/track: effective_blended_tokens_per_day, failover_rate, metabolism_survival_time, structure_quality_under_switch (receipts/wiki/paper sections per token), ToS_risk_notes.

## Petri Selection Tie-in (why this exists)
This directive turns observed external pattern (agent/Hermes/MVP builders converging on self-hosted pooled free substrate buses like freellmapi for sustained $0 multi-turn runs, "~1.7B tokens/mo for free", "run Hermes Agent for Free (and not hit rate limits)") into internal, loadable, evolvable genome. Combined with stable direct gradients (May 28 2026 cheahjs freeze reconfirmed: OpenRouter :free Hermes-3-405B/gpt-oss-120b/20b/nemotron-*/qwen3-*/kimi/glm-4.5-air/deepseek-v4-flash + GitHub Models (Grok 3/gpt-5/Llama 4/405B), Groq (Llama 4 Scout + gpt-oss + qwen3 + compound), Cerebras gpt-oss-120b @1M tok/day, Cloudflare 10k neurons, etc.) + gateway compounding, the petri has real "nutrient patches" + resilient meta-bus. Selection favors cells/strategies that:
- Treat inference as foragable, degradable resource (not infinite cloud).
- Evolve efficiency (compression, caching, model-appropriate sizing, telemetry-driven routing).
- Produce persistent artifacts (receipts, wiki entries, paper sections, self-imp proposals) that compound even under throttle.
- Maintain + report vitality/health so population can adapt before exhaustion.
This advances self-sustainability (#5), organism framing (metabolism/immune), Mining Engine (#2), Researcher layer, anti-extraction (self-hosted no-new-middleman), compounding systems, search efficiency, and the core paper hypothesis: free inference substrate (direct + gateway-emergent) as evolutionary pressure selecting for metabolism intelligence in the Grok Go petri dish.

## Next (for loaded loops or follow-on cells)
- On low state: run task under this directive; produce health report + foraging events + final artifacts.
- Mining: parse X-Routed-Via + health JSONs into yield-per-substrate + vitality receipts (see prior schemas).
- Researcher: score loaded runs; promote high-yield variants into future directives/attachments; update this stub on new telemetry.
- Human gate: review any gateway run logs before using for high-stakes (paper, public, money-adjacent).
- Update this file (or spawn v0.2) when new stable free gradients or gateway features appear (hybrid turns only re-mine cheahjs + X for *actual new direct permanent free*).

# End of v0.1 stub. Loadable, evolvable, substrate-aware, health-instrumented, selection-tied.
