# MoE Local Model — Recommendation (vega, 2026-06-11)
**Task:** `directives/vega-task-moe-local-models.md` (hot-expert streaming, 35B MoE on 16GB) · **Verdict: YES, but not the way the task assumed.**

## TL;DR
- **Do NOT full-load a 30B-class MoE in MLX on this mini.** Qwen3-30B-A3B 4-bit MLX weighs **~17.5 GB — more than our 16 GB total**, and this box already hard-rebooted once from GPU memory pressure (qwen at 0.85 utilization). 18 GB+ machines are the documented floor for that path.
- **DO test the llama.cpp expert-offload path:** community result (May 2026) runs **Qwen3.6-35B-A3B at ~30 tok/s with a ~6 GB resident budget** by keeping hot experts resident and paging cold experts (`--n-cpu-moe` / mmap). On M4 unified memory this degrades gracefully (OS evicts mmap'd pages) instead of OOM-rebooting like MLX full-load. This IS the Mac-shaped version of the technique in the X post (whose CUDA kernel we can't use).
- **Safe small-MoE fallback:** DeepSeek-V2-Lite-class (16B total / ~2.4B active, 4-bit ≈ 8.5 GB) fits today's envelope if the llama.cpp test disappoints.
- **Teknium/Nous news (same X thread cluster):** Hermes-4 series is Nous's current model line, and **Hermes Desktop is now in public preview** — that's the exact fork target for Null Axiom Desktop (board p6). Fork-when: now.

## Test plan (GATED — needs Jeff's go)
1. Disk: ~18–20 GB for the GGUF (we have space post-cleanup). Download via `llama.cpp` + `Qwen3.6-35B-A3B` quant from the May-2026 writeup.
2. Run **only when the grok cell is idle** (16 GB = one heavy brain): single slot, `--n-cpu-moe` offload, watch `memory_pressure` live; kill switch = `pkill llama-server`.
3. Log tok/s, peak resident, output quality vs qwen3.5-4b on one heavy research prompt.
4. If ≥15 tok/s and no pressure events → wire as **Tier 0-heavy** lane (heavy synthesis turns only; 4b stays for fast routing). Cloud reserved for final synthesis + Jeff approvals.

## Cost delta (rough)
Heavy research/synthesis turns currently escalate to cloud; at ~a dozen heavy turns/day moved to Tier 0, that's the bulk of routine cloud spend avoided — exact number depends on the loop's turn mix; measure after one week.

## Sources
- llama.cpp MoE offload result: mychen76.medium.com "Run Qwen3.6-35B-A3B on 6GB VRAM Using Llama.cpp (~30 tps)" (May 2026)
- 30B-A3B memory floor: unsloth.ai Qwen3-Coder guide; codersera.com Qwen3-VL-30B macOS guide
- Apple Silicon tok/s reference: llmcheck.net/benchmarks
- Hermes Desktop public preview: marktechpost.com (2026-06-03); NousResearch/hermes-agent releases v0.15.x
- Original technique thread: x.com/i/status/2064803279041872247 (CUDA-specific; not directly portable)
