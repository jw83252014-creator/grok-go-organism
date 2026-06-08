# Grok Go — project backlog (run all day, one concrete step per turn)

Jeff's directive 2026-06-08: keep working these autonomously. Save findings to `docs/`, append to the relevant catalog, and publish to the PUBLIC repo (github.com/jw83252014-creator/grok-go-organism — Jeff shares this). Anything that spends money, posts publicly, or changes configs/keys = TEXT proposal only, human-approved.

## 1. Free ENDPOINTS (expand `docs/free-api-endpoints-catalog.md`)
- Add: **NVIDIA NIM** (build.nvidia.com — free model credits, 60+ models), AWS Bedrock free tier, Google Vertex/AI Studio, Cloudflare Workers AI, and any new free LLM APIs.
- For each: model name, limits, OpenAI-compatibility, exact "how to wire into Hermes."

## 2. Free COMPUTE to run cells (new `docs/free-compute-for-cells.md`)
- Storage ≠ compute. To *run* an agent loop for $0, research: **Oracle Cloud always-free VMs**, **GitHub Actions** minutes (cron-run a cell), **Hugging Face Spaces**, **Fly.io / Railway** free, AWS/GCP/Azure free tiers, **Modal / Replicate** credits.
- Note which can host a Hermes loop for free + the signup steps (human does signups).

## 3. AGENT COMBINATIONS (new `docs/agent-combinations.md`)
- Concrete recipes: Hermes+local Qwen, **Hermes ⇄ Gemini CLI**, Hermes+Groq, multi-cell handoff, a **Gemini-tab "memory" cell**, researcher+Science-Skills.
- For each: which brain (prefer FREE), tools, inputs/outputs, how cells hand off.

## 4. FUNDING (new `docs/funding-sources.md`)
- Research-credit programs: **Anthropic AI-for-Science (~$20k)**, **OpenAI Researcher Access**, **Google for Startups / $300 Cloud trial**, **NVIDIA Inception**, Azure founders, AWS Activate.
- Grants, sponsorships, crowdfunding. Honest eligibility + exact apply links. (Jeff submits.)

## 5. CREATE-CELL skill
- When a project needs a new specialized cell, draft its spec in `cells/<name>.md`: purpose, brain (FREE endpoint preferred), tools/skills, I/O, and whether it needs spend/public/credentials.
- Free + sandboxed cell specs may be drafted freely. Anything needing money/public/credentials = human-approved before activation.

## Toolkit attached
- **Science Skills** repo: github.com/jw83252014-creator/science-skills — reference its grounding/efficiency methods in research.
- Findings live in this PUBLIC repo (grok-go-local-loop/, grok-cell/, research-paper/, researcher/, docs/, cells/).

## 6. AGENTBRIDGE = the organism's nervous system (from the 2026-05-19 Grok design chat, filed in mining-engine/research-sources/grok-chats/)
Most is already built (the running command center). Harden it as TEXT proposals, tied to biology:
- Host-side credential proxy — agents never see raw keys = **blood-brain barrier**
- Sandbox-per-cell = **cell membrane** (isolation)
- Self-writing identity files per cell = **cell differentiation**
- Markdown vault as shared memory = **shared DNA / epigenome**
Reuse the existing ~/agent-comms bridge; do NOT rebuild.
