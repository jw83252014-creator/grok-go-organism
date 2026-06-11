# Skill: ship-vid-explainer

**Trigger:** any agent, any time a feature ships, a cell matures, or a major milestone lands  
**Invocation:** `/ship-vid-explainer [feature_name] [project_name]`  
**Output:** a Motion.so-ready micro_prompt committed to `prompts/motion-vid-library/receipts/`  
**Sign-off rule:** the APPROVED vid = the receipt. Until approved, the feature is not closed.

---

## What the agent does when invoked

1. **Read** the feature's commit message, directive, or turn receipt for what shipped
2. **Read** `directives/brand-voice.md` for vocabulary and style
3. **Read** the parent project's base prompt from `prompts/motion-vid-library/<project>.md` for visual continuity
4. **Generate** a micro_prompt using the template below
5. **Commit** the prompt to `prompts/motion-vid-library/receipts/<date>-<feature>.md`
6. **Log** to `agent-comms/vid-receipts/pending.md` — status: PENDING APPROVAL
7. **Notify** Jeff (Telegram or Command Center) that a vid prompt is ready for review

---

## Micro_Prompt Template

```
PROJECT: [project name in organism vocabulary]
FEATURE: [what shipped — one sentence, plain English]
DURATION: 15–30 seconds

SCENE:
[Describe the opening visual — what does the viewer see first?
Use the organism's visual language: cells, nodes, signals, glowing
flows, biological textures, dark substrate with light pulses.]

MOTION:
[Describe the key animation — what moves, what assembles, what
emerges? Reference the UUIDv8/Somaco substrate where relevant.]

NARRATION (voice or text overlay):
"[One or two sentences. Plain English. ADHD-friendly.
Lead with the NEED this solves. End with what it means for the organism.]"

BRAND STYLE:
- Dark background, bioluminescent accent colors
- Typography: clean, minimal, monospace for IDs/code
- Pace: fast cuts, no dead air
- Sound: ambient low hum, sharp click on key moments
- End card: [project logo or organism symbol] + repo link

SOMACO/UUIDV8 NOTE:
[If this feature touches the agentic substrate — show UUID pulse,
signal routing, or supply-chain node. Reference the substrate layer.]

APPROVAL GATE:
[ ] Jeff approves → logged to agent-comms/vid-receipts/approved.md
[ ] Vid is the sign-off. Feature is not closed until this is checked.
```

---

## Example invocation

When the organism's Metabolism Checker cell ships:

```
PROJECT: Grok Go Organism
FEATURE: Metabolism Checker cell now live — organism can sense its own
         energy state and shift between SATED, HUNGRY, FORAGING, STARVING.
DURATION: 20 seconds

SCENE:
A dark petri dish. Small glowing cells drift. A new cell appears at center —
pulsing green. It reads the light levels of nearby cells and its own glow
dims slightly, shifts to amber. The organism is aware it is hungry.

MOTION:
The new cell emits a slow radial pulse. The color state propagates outward —
green → amber across the field. A small HUD label appears: METABOLIC STATE:
HUNGRY. A UUID tag flickers briefly on the cell.

NARRATION:
"The organism now knows when it's running low. Metabolism Checker reads
compute health and sets the state — so every other cell knows whether to
forage or rest."

BRAND STYLE: [standard]
SOMACO/UUIDV8 NOTE: show UUID pulse on cell activation
APPROVAL GATE: [ ] Jeff approves
```
