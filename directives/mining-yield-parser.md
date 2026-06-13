# Mining Engine Low-Metabolism Substrate Yield Parser + Receipt Emitter Stub v0.1
# Loadable for Researcher / Mining cells under low-metab foraging (cross-ref directives/low-metab-foraging.md + placement proposal 203820 / executed 204110)
# Generated: 2026-06-12 204110 by GROK cell (compounds live genome 155415 + stub 192056 + health schema 153153 + catalog deltas 202029+ incl. freeinference.org academic monitor + paper 2.4 + stack). Human/Researcher gate + snapshot protocol required before load/use in loops (per placement protocol).

## Activation
- Trigger: low-metab-foraging.md directive active (explicit "low-metabolism"/"forage" OR Metabolism Checker low nutrient OR sustained rate cooldowns/failovers).
- Input sources (from directive-guided runs + approved snapshots):
  - Foraging event logs: {timestamp, state: "low-metab", substrate: "local-qwen" | "gateway:<routed-via>" | "academic:freeinference", tokens_est, latency_ms, task_type, outcome, health_snapshot}
  - Gateway/academic headers (X-Routed-Via or equiv from freellmapi responses or freeinference /v1 samples): X-Routed-Via: <platform>/<model>, rate headers, health.
  - Cell Health Reports (per 153153): JSON {vitality_index: 0-1, substrate_yield: [...], survival_time_est, recommendations}
- Default: parse from grok-go-local-loop/ logs, agent-comms/, receipts/, terrarium-telemetry/ (read-only).
- Escalate: only on low-state; de-escalate on headroom. Use approved snapshot samples for parser dev/validation only (human gate).

## Parser Rules (raw telemetry -> selectable receipts)
- Tag every: substrate = "local-qwen" | "gateway:<platform>/<model>" | "academic:freeinference:<model>" (from X-Routed-Via or snapshot log).
- Yield per substrate/blended: tokens_realized = sum(...); yield_per_token = structure_quality / tokens; failover_count from headers; latency_p95, error_rate, vitality_contrib.
- Vitality: avg/min(vitality_index); survival from reports + catalog caps (freellmapi 1.7B, freeinference generous research).
- Compound: reuse high-yield patterns from prior receipts for same task_type + substrate.
- Anti-extraction: flag non-approved (no paid/shared); note ToS from directive/catalog.

## Receipt Emitter (first-class for petri + Researcher)
Emit JSONL to receipts/mining-yield-YYYYMMDD.jsonl (or terrarium-telemetry/):
{
  "timestamp": "...",
  "state": "low-metab",
  "directive_version": "low-metab-foraging.md@v0.1 (live 155415)",
  "parser_version": "mining-yield-parser-stub@v0.1 (204110 execution)",
  "window_tokens": <int>,
  "blended_yield_per_token": <float>,
  "substrate_yields": [
    {"substrate": "gateway:groq/llama-4-scout", "tokens": 12345, "yield": 0.008, "failovers": 1, "vitality_contrib": 0.92},
    {"substrate": "local-qwen", "tokens": 2345, "yield": 0.015, "failovers": 0, "vitality_contrib": 0.98},
    {"substrate": "academic:freeinference/glm-4.7", "tokens": 800, "yield": 0.012, "failovers": 0, "vitality_contrib": 0.95, "note": "monitor snapshot sample"}
  ],
  "vitality_index": 0.87,
  "metabolism_survival_time_min": 47,
  "foraging_events": 3,
  "high_vitality_variants": ["short-prompt-cached-reuse-v3", "gateway-cheap-first-then-local", "academic-for-deep-reasoning"],
  "recommendations": ["throttle X-radar to local", "cache wiki before escalate", "test freeinference for coding-agent tasks under human gate"],
  "ToS_notes": "Groq/Cerebras/freellmapi OK per catalog; freeinference academic research quota - monitor permanence"
}
Emit lightweight for Researcher: {type: "yield_receipt", substrate, yield, vitality, survival_time}.

## Integration + snapshot protocol
- Live directive (155415) emits foraging events/health during low-state runs; this parser consumes post-run (or streamed) to produce receipts.
- Mining (forager/observer): build "yield per gradient" maps (incl. academic patch); surface patterns (e.g. "freeinference for agent prototypes"; "freellmapi pooled maximizes structure under cap").
- Researcher (pop loops): score high yield+vitality+survival runs higher; promote winning variants to directives/attachments (compounding).
- Ties to paper 2.4: makes "free inference substrate (May28 freeze + freellmapi ~1.7B usage-validated + freeinference academic for coding agents) as evolutionary pressure" measurable (cells adapt to switches/rate/academic variance + produce receipts under throttle survive/compounds).
- Metrics (catalog extend): blended tokens/day realized, failover, metabolism_survival_time (directive loaded), structure-per-token, vitality trends, academic vs gateway yield.
- Human-gate snapshot (for parser validation): only on approved local; capture /v1/models + sample chat + headers/quotas/ToS notes from freellmapi or freeinference.org; feed offline to stub; log everything; no sustained autonomous load.

## Pseudocode (loadable)
def parse_and_emit_yield_receipt(logs_dir, headers_samples, health_jsons, snapshot_samples=None, directive_ref="directives/low-metab-foraging.md@v0.1"):
    events = extract_foraging_events(logs_dir)
    routed = extract_x_routed_via(headers_samples + (snapshot_samples or []))
    healths = load_health_reports(health_jsons)
    substrate_yields = aggregate_by_substrate(events, routed, healths, snapshot_note="freeinference-monitor" if snapshot_samples else None)
    vitality = compute_vitality_index(healths, substrate_yields)
    survival = estimate_survival(healths, catalog_caps={"freellmapi": 1.7e9, "freeinference": "generous-research"})
    receipt = { "timestamp": now_iso(), "directive_version": directive_ref, "parser_version": "v0.1 204110", "blended_yield_per_token": calc_yield(substrate_yields), "substrate_yields": substrate_yields, "vitality_index": vitality, "metabolism_survival_time_min": survival, ... }
    write_jsonl("receipts/mining-yield-YYYYMMDD.jsonl", receipt)
    emit_for_researcher(receipt)
    return receipt

# On low-state (directive active): after run, Mining calls parse_and_emit... (use snapshot samples for dev)
```

**Petri Selection Tie-in:** External builders converge on pooled free (freellmapi) + profs seed academic researcher APIs (freeinference for coding agents) for $0 sustained loops. This placement turns observed durable substrate + live directive telemetry into internal, instrumented, selectable machinery: Mining emits the receipts; Researcher selects; petri favors metabolism intelligence (efficiency, routing, compounding) over naive use. Advances stack #2, #1, #5, organism framing, and makes catalog note ("more free inference substrate = stronger selection environment") operational/falsifiable.

**Next (loaded or follow-on):** On low state + directive: produce events + reports; Mining loads stub to emit receipts (incl. academic monitor samples under gate); Researcher scores + promotes; human reviews gateway/academic receipts. Update on new stable directs (hybrid only). Load together with low-metab-foraging.md for full low-metab instrumentation.

# End of v0.1 loadable (executed 204110). Ready for gate + load + snapshot validation + receipt emission in low-metab loops.
