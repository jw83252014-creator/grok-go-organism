# Source Note: Google DeepMind Science Skills

**Repository:** https://github.com/google-deepmind/science-skills  
**Owner/name:** `google-deepmind/science-skills`  
**Local clone:** `/Users/rentamac/agent-comms/research/repos/science-skills`  
**Observed HEAD:** `c633b1ef0a1b5f1127bfd3192d34577a859811b2`  
**Observed tags:** `v1.0.0`, `v1.0.1`, `v1.0.2`, `v1.0.3`  
**GitHub latest release observed by `gh repo view`:** `GDM Science Skills v1.0.2`, published `2026-05-28T11:10:06Z`  
**License observed:** Apache License 2.0 for software; repository README also notes CC-BY 4.0 for other materials and third-party source terms in `SKILL_LICENSES.md`.  

## Repository Description

The repository describes itself as a collection of agent skills for scientific research tasks, spanning genomics, structural biology, cheminformatics, literature search, and related workflows. It advertises better grounding and higher token efficiency for agentic scientific workflows and mentions integration with tools/databases such as AlphaGenome, AFDB, UniProt, and many others.

## Relevant Structure

The repo uses a skill-directory pattern:

- `SKILL.md`
- optional `scripts/`
- optional `references/`

Local skill inventory includes literature search skills, biological database skills, structure/protein skills, and a common support skill.

## Relevance To Grok Go

Science Skills is a concrete reference for the Researcher / Token Scout layer:

- narrow skill packages;
- explicit instructions;
- helper scripts;
- scientific database grounding;
- dependency management through `uv`;
- API-key and license awareness;
- token-efficiency framing.

## Use Boundary

Do not treat this repo as automatically installed or integrated. It is currently a research source and design pattern. Any adapted skill should preserve license notes and API-key requirements.

