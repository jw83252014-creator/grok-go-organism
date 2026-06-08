# Metabolism Checker / Cell Health Monitor Spec

## Purpose
Monitor the organism's energy state and determine whether to pursue growth or conserve. Inspired by Conway's Game of Life + low-metabolism foraging state.

## Metrics to Track
1. **Token Burn Rate** — tokens spent per hour (research, mining, browser actions)
2. **Compute Load** — % CPU/GPU utilization during inference
3. **Context Quality** — % of turns where model output is high-value vs. filler
4. **Cell Vitality** — cumulative score from:
   - Research progress (new insights logged)
   - Mining yield (patterns extracted per hour)
   - Skill accumulation (new skills written to skills folder)
   - Rest/low-burn periods (unpaid compute time)

## Thresholds (adjustable)
- **Growth Mode**: > 3 points/hour — pursue new research, expand mining radius
- **Conserve Mode**: < 1.5 points/hour — reduce token spend, prioritize low-burn activities
- **Critical**: < 0.5 points/hour — halt all spending, focus on rest/recovery

## Implementation Notes
- Run automatically after each research turn
- Append to `~/grok-go-organism-share/research/vitality-logs/`
- Trigger state change if thresholds crossed

## Next Step
Draft the JSON schema for the cell health report.