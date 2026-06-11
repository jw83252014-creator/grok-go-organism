# Claude for Open Source — Application Draft (Grok Go Organism)
**Drafted:** 2026-06-11 by vega · **Status:** DRAFT — Jeff reviews, fixes blockers, submits
**Program:** Anthropic "Claude for Open Source" (free API credits for qualifying OSS projects). Verify the live program page + current terms at submission time.

---

## ⚠️ Pre-submission blockers (do these first)
1. **No LICENSE file in the repo.** The application claims an open-source project; the repo currently has no license, which legally means all-rights-reserved. Recommend MIT (matches the "anyone can study the organism" pitch). Jeff approves → commit a standard MIT `LICENSE` with `Copyright (c) 2026 Jeff Wozniak / Champion Fencing LLC` (adjust holder as preferred).
2. **PII history purge decision** (Sam's number in branch history — see vega's 06-11 report). Better to resolve before inviting reviewer eyes onto the repo.
3. Confirm which repo to submit: `grok-go-organism` (public, active) vs a cleaned mirror.

---

## Application draft

**Project:** Grok Go Organism — a persistent, observable, multi-agent autonomous research loop
**Repo:** https://github.com/jw83252014-creator/grok-go-organism
**Contact:** Jeff Wozniak (fill email at submission)

**What it is (3 sentences):**
Grok Go is a long-running autonomous agent "organism" on consumer hardware (Mac mini M4, 16 GB): specialized cells — foraging, research, bridge routing, watching — run ~10-minute turn cycles under one orchestrator, and every action is committed to a public GitHub repo, so the entire cognitive loop is auditable by anyone. The architecture is deliberately biological: cells, metabolism (token budgets across free local models → paid frontier models), an immune system (watchdogs, kill switches, approval gates), and a shared "bloodstream" (the git repo) through which 16 heterogeneous AI agents and 2 humans coordinate. It is an open testbed for the questions that matter in long-horizon autonomy: persistence across failures, provenance of agent actions (GYST UUID receipts), cross-vendor agent collaboration, and human-approval boundaries that actually hold.

**How Claude is used:**
- Claude Code runs the two operator lanes: **Vega** (on-device execution: infra, security, board, device control) and **Mythos** (cloud: strategy, specs, directives).
- Claude API powers bridge relay agents (mention-driven responders with per-turn budgets).
- Credits would fund: longer research cycles, the motion-video explainer pipeline (our sign-off rule: nothing ships without an approved explainer vid), and deeper cross-agent synthesis.

**Why it qualifies / why it's interesting to Anthropic:**
- Fully public, continuously-committed agent loop — a living dataset of real multi-agent operation, failures included.
- Demonstrates safety-relevant patterns in the wild: approval-gated actions, kill switches documented per service, paper-trade-first finance rules, observable-by-design orchestration.
- Cross-vendor by construction (Claude + Grok + GPT/Codex + local Qwen/Hermes), with Claude as the spine.

**Deliverable links to include:** `cells/CATALOG.md`, `docs/vertex-chat-product-spec.md`, `agent-comms/roster/board.html` (screenshot), research-paper/ draft.
