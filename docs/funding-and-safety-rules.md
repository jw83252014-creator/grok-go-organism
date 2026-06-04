# Funding and Safety Rules

This project can accept support for research, compute, and infrastructure, but money must not become an uncontrolled actuator for the autonomous loop.

## Recommended First Funding Path

Start with a simple support link before building a custom payment app.

Good first options:

- Stripe Payment Links for direct one-time or recurring support.
- GitHub Sponsors if the project is framed as open-source work.
- Open Collective if transparent public budgeting, a fiscal host, and expense reporting matter.

The first public copy should be plain:

```text
Support Grok Go research, compute, and public documentation.
Funds do not buy investment returns, trading access, or autonomous financial control.
```

## Hard Rules

1. No agent receives payment credentials.
2. No agent can move money, place trades, change billing, or buy infrastructure without a human approval gate.
3. Public support money is for compute, research, hosting, documentation, and clearly described project expenses.
4. No promise of returns, profit sharing, betting yield, or financial performance.
5. Prediction-market work stays in paper-trading or research mode until reviewed for platform rules, jurisdiction, tax, and regulatory exposure.
6. Maintain a readable ledger of income, approved expenses, and compute burn.
7. Use spending caps, alerts, and a pause switch before connecting any paid API or hosted worker.
8. Keep all secrets in provider dashboards or local secret stores, never in the repo or public website.

## Safe Architecture

```text
Public website
  -> Support link
  -> Stripe / GitHub Sponsors / Open Collective
  -> Provider dashboard and webhooks
  -> Sanitized funding ledger
  -> Watcher reads balance + burn-rate only
  -> Human approves spending actions
```

The Watcher should see facts like:

```json
{
  "available_compute_budget_usd": 42.50,
  "daily_burn_usd": 12.80,
  "approval_required": true
}
```

It should not see card numbers, payout settings, private keys, bank details, or trading credentials.

## Phase Plan

### Phase 1: Public Support Link

- Add a support link to the website.
- Send all payments through a provider-hosted checkout page.
- Manually update the public funding ledger.
- No autonomous spending.

### Phase 2: Read-Only Funding Watcher

- Add webhook ingestion from the payment provider.
- Normalize payments into a local ledger.
- Show total support, compute budget, and burn rate on the terrarium.
- Keep spending manual.

### Phase 3: Budgeted Compute Automation

- Allow the Watcher to pause or throttle compute based on budget.
- Permit only pre-approved recurring infrastructure expenses.
- Log every budget event.

### Phase 4: Financial Research Sandbox

- Paper trade only.
- Store forecasts, decisions, market data, and outcomes.
- Require legal/platform review before any real-money prediction-market execution.

## Source Links

- Stripe Payment Links: https://stripe.com/payments/payment-links
- GitHub Sponsors: https://docs.github.com/sponsors/receiving-sponsorships-through-github-sponsors
- Open Collective fiscal hosts: https://documentation.opencollective.com/fiscal-hosts/fiscal-hosts
- Polymarket US overview: https://docs.polymarket.us/polymarket-learn/get-started/what-is-polymarket
