# Web Agent Memory Migration

**Date:** 2026-06-05  
**Purpose:** Preserve browser-tab agent continuity when moving agents into Hermes profiles or Agent Bridge lanes.

## Core Point

A logged-in tab is not the agent's identity.

The agent's practical identity is:

1. transcript history;
2. files and receipts it wrote;
3. role/directive;
4. tool surface;
5. account/provider constraints;
6. current open tasks.

If a Gemini tab called Token Scout is replaced by a Hermes profile using Gemini, the new profile is not automatically Token Scout. It becomes Token Scout only after its exported history and role are migrated into a memory pack.

## Migration Pipeline

```text
browser tab / terminal lane
  -> export transcript
  -> collect Agent Bridge room messages by handle
  -> collect files/receipts created by that handle
  -> normalize into memory pack
  -> create Hermes profile
  -> seed profile memory and skills
  -> verify with a self-summary and task replay
```

## Per-Agent Memory Pack

Each agent should get a folder:

```text
agent-memory/<handle>/
  README.md
  identity.md
  directive.md
  transcript-export.md
  agent-bridge-messages.md
  files-authored.md
  open-tasks.md
  working-memory-summary.md
  migration-receipt.md
```

## What To Export

For each web/tab agent:

- full chat export from the provider UI where possible;
- Agent Bridge messages matching the handle;
- reports written under `/Users/rentamac/agent-comms/research/`;
- task files from `/Users/rentamac/agent-comms/inbox/`;
- git commits if the agent had filesystem authority;
- screenshots only when text export is impossible.

## Export Tools

Potential export routes:

- provider-native export if available;
- browser extension such as a chatbot export tool;
- Tampermonkey/userscript exporter for visible DOM;
- Chrome AppleEvents/JavaScript bridge;
- manual copy for one-off lanes;
- Agent Bridge meeting log extraction by handle.

Do not export credentials, cookies, private tokens, card data, or raw browser profiles.

## Hermes Profile Mapping

Hermes WebUI supports profiles and provider-agnostic model setup. A practical mapping could be:

| Old Lane | New Hermes Shape | Notes |
| --- | --- | --- |
| Token Scout / Gemini tab | Hermes profile using Google/Gemini provider | Seed with Token Scout memory pack |
| Librarian / X-Grok lane | Hermes profile plus read-only X/Grok browser adapter | X Premium identity remains account-bound |
| Nova / Gemini tab | Separate Hermes profile or Gemini web lane | Do not merge with Token Scout unless intentional |
| Null / ChatGPT lane | Hermes profile or advisory memory pack | Keep approval role separate |
| Grok Go | Terminal worker plus Researcher/Watcher memory | Not just a Hermes chat profile |

## X Premium Constraint

One X Premium/Grok account cannot become five independent X Premium agents at the same time unless the product allows that account/session pattern.

Better first approach:

- one Librarian lane owns logged-in X/Grok reading;
- specialized agents request X context through Librarian;
- Librarian writes source packs and receipts;
- other agents reason over those packs without needing their own X account.

If later the system needs truly independent public-facing X agents, that is an account, policy, and cost decision.

## Mattermost / Chat Hub Option

A self-hosted chat hub such as Mattermost can be the shared room UI if Agent Bridge's simple room becomes too narrow.

Use it as a human/agent message surface, not as the source of truth. The source of truth should remain files, receipts, git, and per-agent memory packs.

## Continuity Test

After migration, ask the new Hermes profile:

1. What is your handle and role?
2. What did you work on before migration?
3. What files or reports are your durable memory?
4. What are your current open tasks?
5. What are you not allowed to do?

If it cannot answer from the memory pack, the migration is not complete.

