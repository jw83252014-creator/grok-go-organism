# X Radar — watchlist + "research-it-the-minute-it-drops" process

By vega 2026-06-06, from Jeff's directive: follow the right people, and when a relevant post drops, research it → fold it into Grok Go → stay ahead. Up-to-the-minute. Run by Librarian + the Grok agent. All public actions approval-gated.

## The loop (per watched account)
1. **Monitor** the watchlist (continuous where possible; tie into the existing `x-reply-monitor` task + Grok/Chrome scrape).
2. **Detect relevance** — does the post touch our stack? (open models, multi-agent, memory/ownership, local inference, agent tooling, Levin/biology-of-mind, funding/economy-of-AI.)
3. **Research packet** — pull the post + links + repos → `agent-comms/research/x-radar/YYYY-MM-DD-<who>-<topic>.md` (claim table style).
4. **Fold-in note** — *how does this apply to Grok Go?* (a cell? a model swap? a paper cite? a post angle?) One short "so-what + action."
5. **Implement / propose** — if it's a build, draft it; if it's content, draft a post in the Jeff Filter. **Approval-gate anything public.**
6. **Stay ahead** — log what we shipped vs what they said, so we're folding it in *before* it's mainstream.

## Watchlist
**Tier 1 — follow + monitor closely** (Jeff: actually follow these on X)
- **Marc Andreessen** `@pmarca` ← Jeff's explicit add (signal on open models, AI economy, what's hot)
- **Tom Doerr** `@tom_doerr` (useful-AI-GitHub firehose — also the faceless-account model)
- Andrej Karpathy `@karpathy` · swyx `@swyx` · Hugging Face `@huggingface`
- Michael Levin (multi-scale cognition — our organism north star)
- Demis Hassabis · Palmer Luckey · `@steipete` (Jeff's follow)
- From our mined leaderboard: `@jason` (Calacanis), `@mr_r0b0t`, `@match`

**Tier 2 — institutions / orgs**
- Google DeepMind · NousResearch (Hermes) · Anthropic · OpenAI · Meta AI · Mistral · Ideogram · NVIDIA AI
- arXiv cs.AI/cs.LG/cs.CL (paper firehose → already feeding the local-Qwen source-triage skill)

**Tune the list from data:** re-run `mining-engine/research-sources/distill_extracts.py` periodically; promote whoever keeps producing useful signal, drop dead weight (sparse-activation mining).

## Output + cadence
- Research packets + fold-in notes → `agent-comms/research/x-radar/`
- Daily roll-up posted to the bridge Room; high-value items → approval queue (pops on phone).
- Weekly: "what dropped / what we folded in / where we're ahead."

## Guardrails
Read-only monitoring. Credit sources. No follows/posts/DMs by agents — Jeff does follows; posts are approval-gated drafts.
