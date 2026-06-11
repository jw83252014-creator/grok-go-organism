# Cell: Metabolism Checker (homeostasis sensor / hunger signal)

**Biological function:** the organism's blood-glucose / energy sensor. It measures how much "food" (free compute + credit runway) is left and sets the organism's METABOLIC STATE, which every other cell reads to decide how hard to work and whether to forage.

**Brain:** local Qwen (free). **Gating:** read-only, zero spend.

## The function (metabolic_energy)
Each cycle, compute from cheap local signals:
- `free_brain_up` = local model :8000 reachable? (yes = base energy)
- `free_gateway_up` = approved free LLM gateway reachable? (yes = pooled free substrate)
- `free_quota_left` = % remaining across free cloud tiers (Gemini/Groq/GitHub/etc.)
- `fable5_available` = Anthropic API key + approved budget present? (never counts as free energy)
- `paid_runway_days` = (xAI cap − spent) ÷ recent daily burn
- `cost_per_useful_output` = $ per accepted artifact (efficiency)

## States (set one per cycle; write to grok-go-local-loop/METABOLISM.md)
| State | Trigger | Mode the organism runs in |
|---|---|---|
| 🟢 **SATED** | free brain up + free quotas <70% used + runway >14d | Pure research/build. Spend freely on free brains. |
| 🟡 **HUNGRY** | free quotas >70% used OR runway 3–14d | Activate **Funding Forager**; prefer free brains; throttle paid turns. |
| 🟠 **FORAGING** | free tiers exhausted OR runway 1–3d | Minimal compute; **aggressive funding applications drafted**; activate **Revenue Research cell**; alert Jeff. |
| 🔴 **STARVING** | runway <1d / no free brain | Halt non-essential cells; alert Jeff loudly (Telegram); surface funding + revenue moves for human action. |

## Output
- Write current state + the 4 inputs to `grok-go-local-loop/METABOLISM.md` (dated line).
- Other cells read that file and adapt. State transitions are the organism's autonomic nervous system.
- On any drop to 🟠/🔴, ping Jeff via the Communication cell.

## Frontier Escalation Rule

Claude Fable 5 (`claude-fable-5`) is an expensive expert lane, not metabolism.

Only route to Fable 5 when all are true:

- the task is high-value deep synthesis, paper methodology, emergence analysis, hard architecture, or major creative structure;
- local Qwen and free gateway routes are insufficient or inappropriate;
- the estimated cost is written before the call;
- Jeff has approved the call or a tiny bounded smoke-test budget is active;
- no public posting, spending, trading, account mutation, or credential action is being delegated.

If `fable5_available=false`, mark Fable as `needs-key-and-budget` and continue with local/free routes.
