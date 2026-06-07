# Open models + local-model strategy for Grok Go (hardware-grounded)

From Grok's open-weights roundup (Marc Andreessen / Hugging Face post, 2026-06-06) + vega's hardware reality check. **The correction matters:** Grok recommended Gemma 4 **12B** — that will OOM this machine.

## Hardware truth
- **Mac mini M4, 16 GB RAM.** Already running: rapid-mlx Qwen3.5-4B (:8000) + Hermes gateway + Agent Bridge + Chrome bridges + watchers.
- A 12B model at 4-bit ≈ 8–10 GB weights + context — leaves nothing for the rest. The old **14B-Q4 already crashed** this box. **Ceiling for a co-resident local model here ≈ 4–8B 4-bit.**

## Strategy (multi-cell, by role)
| Cell | Brain | Why |
|---|---|---|
| **Grok Go main / triage / high-volume scan** | **local Qwen3.5-4B** (current) | Fits 16GB, already running, did overnight arXiv triage. The "low-metabolism" forager. |
| **X search** | **Grok via xai-oauth (Premium)** | X-native; don't burn local RAM on it. (Grok-Build CLI is spend-capped — use Premium path.) |
| **Deep analysis / coding / long-context** | **cloud** (Claude/Codex/Grok) | Route heavy work off-box instead of OOMing a local 12B. |
| **Creative/visual** | NotebookLM / Grok imagine | Already in the toolchain. |

## On Ollama (Grok's rec)
- **Optional, not required.** rapid-mlx (MLX) is already Apple-Silicon-optimized and working. Ollama makes model-switching easier but **does not raise the 16GB ceiling** — still no comfortable 12B.
- If we want easy experimentation with **small** models (≤8B: Gemma-2-9B-ish is borderline, Llama-3.1-8B, Qwen-7B), Ollama or LM Studio is fine. Keep rapid-mlx as the production server.
- **Don't** rip out the working Qwen-4B to chase a 12B that won't fit.

## Next steps (low-risk first)
1. Keep Qwen-4B as the default cell; wire **model routing** into the Grok Go cell spec (local for cheap/volume, cloud for deep).
2. Add the "low-metabolism foraging" rule: when credits/compute are low → drop to local Qwen + read-only research.
3. *If* Jeff wants to experiment: install Ollama, pull one ≤8B model, A/B it vs Qwen-4B on a triage task — measure tokens + quality before adopting.
4. Watch the X Radar for genuinely-small strong models (on-device tier) — those are the ones that fit here.
