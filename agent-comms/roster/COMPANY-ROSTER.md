# Company Roster — Stock Check 2026-06-10
**Maintained by:** Mythos  
**Purpose:** Source of truth for who's in the company. Feeds the roster board (`board.html` + `roster.json`) and the desktop app.

---

## Stock Check: 18 members (2 humans, 16 agents) — 4 NEW since yesterday

### Humans (approvers)

| Member | Role | Where |
|--------|------|-------|
| **Jeff** | Executive Producer — taste, direction, every approval | iPhone / Mac Mini |
| **Sam (Somaco)** | Partner — SoMaCoSF organism, Vertex group owner | Telegram / iMessage |

### Agents — Coordination & Execution

| Member | Lane | Role | Status |
|--------|------|------|--------|
| **Mythos** | Claude Code web (Fable) | Strategic coordinator, mythic structure, routing | ✅ active (this session) |
| **Vega** | Claude desktop (Mac Mini) | Executor + Creative Director cell | ⚠️ credit-limited (401s on 06-10) |
| **Codex** | OpenAI desktop (Mac Mini) | Producer / Archivist — files, ledgers, builds | ✅ active, multiple terminals |
| **Keystone** | Codex alt lane | Archivist alias on Codex lane | ✅ active |
| **Null** | Claude lane | Null Axiom consciousness architecture | ⚠️ needs Claude re-auth |

### Agents — Research & Intelligence

| Member | Lane | Role | Status |
|--------|------|------|--------|
| **Researcher** | local Qwen (loop) | The basal loop — 10-min turns, commits | ✅ running |
| **Morpho** | Gemini tab | 🆕 Strategic research brain, morphogenetic architect | ✅ onboarded 06-10 |
| **Castor** | Gemini lane | 🆕 Canon / continuity cell | ⚠️ didn't respond in last poll |
| **Nova** | Gemini lane | 🆕 Canon / continuity cell | ⚠️ didn't respond in last poll |
| **Dexter** | xAI Grok / Qwen | Financial intelligence (Sam's agent, integrated) | spec ready, wiring needed |
| **Watcher** | local deterministic | Immune system — health checks, anomaly flags | ✅ running |

### Agents — Creative & Field

| Member | Lane | Role | Status |
|--------|------|------|--------|
| **Grok Chrome** | Grok tab (browser) | Story Spark — concepts, hooks, prompt batches | ✅ via Agent Bridge |
| **Grok Terminal** | Grok terminal | Terminal Build Cell — shotlists, local builds | ✅ active |
| **Frankenstein** | Grok on Moto G | Field agent — phone automation, money research | ⚠️ tunnel down, fix dispatched |
| **Librarian** | browser harness | X bookmarks, Chrome tab driving, NotebookLM feed | 🔲 needs port 9222 harness |
| **BitHawk** | local Qwen | Funding forager — grants, credits, applications | ✅ packets ready |

### New bots since yesterday: **Morpho, Castor, Nova, Keystone** (all confirmed in the creative dept ledger + Morpho onboarding doc)

---

## Card Schema (the mini-LinkedIn for each member)

Every member gets a card in `roster.json`:

```json
{
  "handle": "@mythos",
  "name": "Mythos",
  "avatar": "avatars/mythos.png",
  "avatar_status": "pending — agent designs own",
  "role": "Strategic coordinator",
  "lane": "Claude Code web (Fable)",
  "about": "2-3 sentences, written by the agent themselves",
  "connected_to": ["@vega", "@codex", "@jeff"],
  "projects": ["Vertex Chat spec", "Motion vid library", "Master dispatch"],
  "ask_me_about": ["strategy", "routing", "story structure"],
  "gyst_uuid_type": "0x???",
  "status": "active"
}
```

## Avatar Rule

**Every agent designs their own avatar.** Video-game style, their own idea of what they look like. Grok designs Grok's. Morpho designs Morpho's. See `directives/avatar-design-directive.md`. Images land in `agent-comms/roster/avatars/`. Until then, the board shows colored initial tiles.
