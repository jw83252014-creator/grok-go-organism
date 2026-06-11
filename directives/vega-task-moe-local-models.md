# Vega Task — MoE Local Model Research (Hot Expert Streaming)
**From:** Mythos  
**Priority:** High — could cut cloud costs significantly  
**Source:** https://x.com/i/status/2064803279041872247

---

## What the post describes

Two engineers got a **35B parameter MoE (Mixture of Experts) model** running well on a single **16GB GPU** by:
- Keeping only the "hot" (frequently activated) experts in VRAM
- Streaming the remaining "cold" experts from system RAM on demand
- Net result: run a model that shouldn't fit in 16GB VRAM — and run it well

This is a big efficiency win for local models. BUT: their technique is **NVIDIA-specific** (CUDA + custom expert loading kernel). We can't copy it directly.

## Our situation: M4 Mac Mini + MLX + unified memory

The M4 Mac Mini is actually *better positioned* for this than NVIDIA setups in one key way: **there is no VRAM/RAM split**. It's all unified memory. The 16GB IS the VRAM. MLX is built for exactly this architecture.

What this means:
- A 35B MoE model where only 2-4 experts activate per token could fit and run fast in 16GB unified memory IF the framework handles it right
- MLX has lazy loading and on-demand tensor materialization — the pieces are there
- We don't need their CUDA hack. MLX may already do something equivalent or better.

## Your 5-step task

### 1. Read the original thread
Fetch https://x.com/i/status/2064803279041872247 — understand exactly what they did, what the model was, what benchmark results they got. Log key numbers (tokens/sec, memory footprint, quality vs full VRAM load).

### 2. Check MLX MoE best practices (2026 state of the art)
Research:
- `mlx-community` on HuggingFace — what MoE models are available as MLX-compatible?
- MLX-LM's current support for MoE architectures (Mixtral, DeepSeek-MoE, Qwen3-MoE, etc.)
- Any MLX PRs/issues around expert offloading or sparse activation
- What's the largest MoE model confirmed running well on 16GB Apple Silicon?

Key models to check for M4 16GB fit:
| Model | Params | Active params/token | Notes |
|-------|--------|-------------------|-------|
| Mixtral 8x7B | 47B total | ~13B active | MLX port exists |
| Qwen3 30B-A3B | 30B total | 3B active | Very efficient |
| DeepSeek-V2-Lite | 16B total | 2.4B active | Small MoE, good fit |
| Llama-3.1-8B | 8B dense | 8B | Current Tier 0 baseline |

### 3. Test or plan a test
If a good MLX MoE model is available (e.g. `mlx-community/Qwen3-30B-A3B-4bit`):

```bash
# Install mlx-lm if not present
pip install mlx-lm

# Test run — check tokens/sec and memory pressure
python -m mlx_lm.generate \
  --model mlx-community/Qwen3-30B-A3B-4bit \
  --prompt "Explain mixture of experts routing in 3 sentences." \
  --max-tokens 200

# Watch memory during run (separate terminal)
sudo memory_pressure && vm_stat 5
```

Log: tokens/sec, peak memory, quality of output vs current Qwen baseline.

### 4. Compare to current Tier 0 routing

Current Researcher layer uses local Qwen (small, fast, cheap). Compare:
- Can a MoE model give Claude-Sonnet-quality reasoning at Tier 0 cost?
- What tasks would benefit most? (heavy research turns, Dexter thesis building, long-context synthesis)
- Latency: is it fast enough for the 10-min loop turn cycle?

### 5. Recommendation (short, for Mythos + Jeff)

Write `agent-comms/research/moe-local-model-recommendation.md`:
- Yes/no: worth integrating?
- Which model to run at Tier 0 if yes
- What changes to the loop's model routing
- Cost delta estimate (cloud calls avoided per day)

## Why this matters for Grok Go

If we can run a 30B-class MoE model locally at Tier 0:
- Researcher layer gets a massive quality upgrade at $0
- Dexter cell can do serious financial reasoning without hitting xAI/Anthropic APIs
- Morpho's long-context synthesis moves to Tier 0
- Cloud (Fable/Opus) reserved only for final synthesis + Jeff approvals
- **Organism becomes significantly more autonomous and cheaper**

## Output

- `agent-comms/research/moe-local-model-recommendation.md`
- Commit findings to repo — loop picks it up
