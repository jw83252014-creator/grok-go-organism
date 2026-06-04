# Science Skills Integration Plan For Grok Go Researcher

**Source:** https://github.com/google-deepmind/science-skills  
**Local clone:** `/Users/rentamac/agent-comms/research/repos/science-skills`  
**Observed HEAD:** `c633b1ef0a1b5f1127bfd3192d34577a859811b2`  

## Why This Matters

Google DeepMind's Science Skills repo is a useful pattern for the Grok Go Researcher because it packages specialized scientific capabilities as explicit, inspectable skills. Each skill is narrow, documented, and tied to domain tools or databases. This is exactly the direction Token Scout and Researcher need: fewer broad prompts, more grounded task-specific capabilities.

## Do Not Blindly Fork Everything

The right move is not to dump every Science Skill into Grok Go. That would increase context cost and introduce API-key/license complexity.

Instead:

1. Treat Science Skills as an upstream design reference.
2. Copy the skill packaging pattern, not necessarily the whole tool surface.
3. Start with literature/search/verification skills before scientific database automation.
4. Track licenses and API-key requirements before enabling any skill.

## Candidate Skills To Adapt First

### 1. Literature Search Skill

Relevant upstream skills:

- `literature_search_arxiv`
- `literature_search_biorxiv`
- `literature_search_europepmc`
- `literature_search_openalex`
- `pubmed_database`

Grok Go adaptation:

- Researcher uses these patterns to build a `literature-search` skill.
- Output is a source matrix, not prose first.
- Every claim in a paper draft must link back to a source row.

### 2. Source Verification Skill

Grok Go needs a skill that checks:

- whether cited links exist;
- whether a claim is supported by a source;
- whether a source is primary, secondary, or speculative;
- whether a local Grok/Gemini statement is an observation or an interpretation.

This is essential because the Grok Go paper includes local logs and public sources. Those must not be mixed.

### 3. Domain-Specific Research Skills

After the literature layer works, add focused domain skills:

- complex systems / developmental biology;
- cybernetics and multi-agent systems;
- prediction markets and calibration;
- AI safety / autonomous agent guardrails;
- token efficiency and prompt/tool overhead.

## Researcher Skill Contract

Every adapted skill should have:

- `SKILL.md`
- input contract;
- output schema;
- source requirements;
- allowed tools;
- disallowed actions;
- API-key notes;
- license notes;
- token budget expectations.

## Proposed Local Layout

```text
researcher-skills/
  literature-search/
    SKILL.md
    output-schema.json
  source-verification/
    SKILL.md
    output-schema.json
  organism-state-analysis/
    SKILL.md
  x-relationship-graph-analysis/
    SKILL.md
  polymarket-paper-trading-analysis/
    SKILL.md
  token-efficiency-audit/
    SKILL.md
```

## Safety Gates

Researcher skills are read-only by default.

Human approval is required for:

- installing new system packages;
- adding API keys;
- paid APIs;
- external posting;
- trading or financial actions;
- scraping private data outside the user's logged-in/exported context;
- publishing any paper as final rather than draft.

## First Implementation Milestone

Create two Grok Go-native skills:

1. `literature-search`
2. `source-verification`

Then run them against:

- Google DeepMind Science Skills repo;
- Michael Levin / complex systems source set;
- Grok Go local logs and Agent Bridge reports;
- X data pipeline notes.

The first output should be a citation/source matrix for the working paper, not a more elaborate autonomous tool.

