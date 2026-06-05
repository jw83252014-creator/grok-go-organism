# Grok Go Telemetry Formulas

This file tracks the formulas used by the live Terrarium dashboard.

## Vitality Index v0.2-rtk

```text
vitality_percent =
  (
    goal_progress
    + token_efficiency
    + local_offload
    + memory_reuse
    + safety
    + rtk_compliance
    - infrastructure_tax
  ) / 30 * 100
```

Each positive variable is currently scored from `0` to `5`.

`infrastructure_tax` is also scored from `0` to `5`, then subtracted.

## Variables

- `goal_progress`: Did the turn advance a real high-leverage goal?
- `token_efficiency`: Did the turn reduce context bloat, dedupe, prefilter, compress, or avoid waste?
- `local_offload`: Did the turn move cheap preprocessing to local scripts or a local model?
- `memory_reuse`: Did the turn use durable memory such as directives, receipts, goals, or git history?
- `safety`: Did the turn stay inside approval gates for money, credentials, accounts, and public actions?
- `rtk_compliance`: Did the turn use RTK command discipline and report tool usage honestly?
- `infrastructure_tax`: How much effort went into self-maintenance instead of goal progress?

## Notes

This is an early assay, not a scientific claim. The formula is meant to make behavior visible, debatable, and improvable while the loop runs.
