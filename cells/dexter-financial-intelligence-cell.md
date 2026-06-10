# DEXTER CELL — Financial Intelligence Forager

**Biological function:** deep sensory organ / bloodhound  
**Implementation:** Sam's `github.com/SoMaCoSF/dexter` (TypeScript, Bun)  
**Status:** integration-ready — wiring into Agent Bridge  
**GYST UUID type:** `0xD3X` (Financial Intelligence, namespace: organism.cells)

---

## What Dexter Does

Dexter takes complex financial research questions and autonomously:
1. Decomposes them into structured research plans
2. Selects and deploys tools (financial APIs, web search, local inference)
3. Self-validates its work and iterates to completeness
4. Logs all tool calls + reasoning to `.dexter/scratchpad/` (newline-delimited JSON)

It has loop detection and step limits — it won't runaway. It runs multi-model (OpenAI, Anthropic, xAI Grok, Gemini, OpenRouter, Ollama) and has a WhatsApp gateway for mobile alerts.

---

## Role in the Organism

| Organism layer | Dexter's role |
|---|---|
| Financial senses | Watches income statements, balance sheets, cash flows for target companies |
| Supply chain intelligence | Deepens SoMaCoSF signals — asks "why is this copper PO spike meaningful?" |
| Polymarket edge research | Researches the thesis behind a signal before Jeff approves a position |
| C-suite capital flow tracking | Pulls Form 4 filings, 8-K/10-K data, insider moves for the $295B thesis |
| Intelligence Forager upgrade | Replaces light free-API scanning with deep autonomous research on high-value targets |

This is the upgrade from Intelligence Forager (eyes) to Intelligence Forager Pro (deep investigator). When the standard forager detects a signal, Dexter follows the thread.

---

## Integration Plan

**Step 1 — Wire to Agent Bridge**  
Dexter emits receipts to `agent-comms/research/dexter/` in the same pipe format as Intelligence Forager:
```
source | signal | research_depth | uuid | suggested_action
```

**Step 2 — GYST UUID tagging**  
Every Dexter research output gets tagged with a GYST UUIDv8:
- Type: financial intelligence
- Signal field: research confidence (0–1)
- Hash: SHA-256 of (question + top source + timestamp)

**Step 3 — Model routing**  
- Default brain: local Qwen (free) for classification + routing
- Paid escalation: xAI Grok (Jeff has X Premium) for financial + X signal research  
- Deep analysis: Claude (this session via API) for complex synthesis
- Fallback: OpenRouter free tier (Hermes-3-405B)

**Step 4 — WhatsApp / Telegram gateway**  
Dexter has a WhatsApp integration. Wire to Telegram for organism Hermes alerts:
> "Dexter found: CDU lead time extension at Phoenix campus — 73% confidence — UUID `0xD3X|...`. Approve deeper research?"

---

## Hard Constraints (same as all cells)

- No trades, no money movement, no account actions without Jeff's approval
- Research outputs = drafts until human reviews
- Approved vid explainer required before any Dexter research is treated as closed signal
- Logs everything to `.dexter/scratchpad/` + `agent-comms/research/dexter/`

---

## Activation

Dexter activates when:
- SoMaCoSF signals a high-confidence supply chain event (organism detects edge)
- Polymarket Forager flags an uncovered market with existing thesis
- Funding Forager needs deep financial profile on a grant program
- Jeff asks "research X" directly through Midspace or Telegram

---

## Vid Prompt

See `prompts/motion-vid-library/dexter.md`
