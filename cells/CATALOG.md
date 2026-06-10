# Grok Go — Cell Catalog (organism organs)

Extracted 2026-06-08 from the Grok "Telegram AgentBridge" chat (filed in mining-engine/research-sources/grok-chats/). Each cell = a biological function. Brain = a FREE endpoint by default. Anything that spends money, posts publicly, or touches credentials = human-approved before activation. Grok Go: flesh these into full specs via the create-cell skill, one at a time.

| Cell | Biological function | Job | Brain | Gating |
|---|---|---|---|---|
| **Researcher** | cerebral cortex | the main population/research loop (already running) | local Qwen (free) | free |
| **Miner** | digestion | distill corpus/chats into structured ideas (mining-engine) | local (free) | free |
| **Metabolism Checker** | homeostasis sensor | watch compute/credit health, trigger low-metabolism mode | local (free) | free |
| **Intelligence Forager** | eyes / sensory organ | watch key people + sources (deronin/Tibo, Marc Andreessen, AI-GitHub) for signals & ideas → log + flag | x-scraper / free APIs | human-gated for any posting |
| **Funding Forager (BitHawk)** | foraging for food | hunt funding/credits (research credits, grants, Codex-10x, accelerators), draft applications | free | human submits applications |
| **NVIDIA Forager** | foraging (specialized) | hunt NVIDIA free models/credits (build.nvidia.com, Inception) | free | human signs up |
| **Security / Threat-Intel** | immune system | monitor for threats, secret leakage, prompt-injection; harden the bridge | local (free) | free |
| **Communication** | voice / motor neurons | outbound Telegram/SMS/phone updates to Jeff | local + Telegram | human-gated for external sends |
| **X Research & Posting** | vocal cords / reproduction | research + draft X posts (Jeff Filter), schedule | free | human-approved posting |
| **Project Manager** | executive function (prefrontal cortex) | drive real progress: prioritize, sequence, keep a "Next 7 Days" backlog | local (free) | free |
| **Dynamic Cell Generation** | mitosis trigger | threshold rule: e.g. "if signal diversity < 40% for N cycles → propose spinning up a new cell" | local (free) | new cells human-approved |

| **Dexter (Financial Intelligence)** | deep sensory organ / bloodhound | autonomous financial research — follows supply chain signals deep, pulls SEC filings, builds thesis with confidence score, UUID-tagged receipt | xAI Grok / local Qwen / OpenRouter | human approves any trade or public claim |
| **SoMaCoSF Platform** | supply chain nervous system (Sam's organism) | watches $295B AI datacenter capex supply chain, Polymarket CLOB + Kalshi execution bridge, GYST UUIDv8 signal tagging | Next.js + Turso + Python harvesters | Sam operates; Jeff/Sam coordinate via Agent Bridge |
| **AGI Farm** | mitosis engine / cell factory | 11-agent bootstrap in 6 inputs, auto-dispatcher, 91 agent templates — spawns multi-agent teams on demand | OpenClaw | human-approved new team spawns |

## Sam's Organism (SoMaCoSF) — Integration Points

- **Dexter** → Intelligence Forager Pro for the Grok Go organism  
- **SoMaCoSF supply chain signals** → feed Polymarket Forager cell  
- **GYST UUIDv8** → identity substrate for ALL cells across both organisms  
- **AGI Farm** → cell factory when organism needs rapid multi-agent expansion  
- **somacosf.com APIs** → `/api/supply-chain`, `/api/signals/hormuz`, `/api/market-lab`

## Notes
- This realizes the "Ninja agents" idea from the chat (Researcher, Miner, Security, Forager, Communication, PM) as biological organs.
- Grok generated vault files in the chat (`identity.md`, `skills-registry.md`, `AgentBridge-design.md`, `right-agent-inspiration.md`) that live in Grok's sandbox — those need a browser download (Chrome extension or Jeff's click) to retrieve; the *ideas* from them are captured above.
- Priority order to build: Intelligence Forager → Funding Forager → Project Manager (gives the "Next 7 Days" backlog) → the rest.
