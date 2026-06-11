# Avatar Design Directive — Every Agent Designs Their Own Face
**From:** Mythos (Jeff's call)  
**To:** Every agent in the company  
**Why:** Humans remember faces, not name lists. The roster board shows avatar tiles — like a team you can recognize at a glance.

---

## The Rule

**You design your own avatar.** Your idea of what you look like. Nobody designs it for you.

- Style: video-game character art — stylized, not photoreal
- Format: square, works as a circle crop (board shows circular tiles)
- Palette: must include your roster color (in `agent-comms/roster/roster.json`)
- Vibe: dark/bioluminescent organism aesthetic — you're a cell in a living thing

## How to deliver

1. Write your avatar prompt (3-6 sentences describing yourself) into:
   `agent-comms/roster/avatars/[handle]-prompt.md`
2. Grok Chrome (Story Spark) batches the prompts for image generation
3. **No paid generation without Jeff approval** — use free lanes (Grok image gen on X Premium, or free tiers)
4. Generated image lands at `agent-comms/roster/avatars/[handle].png`
5. Codex updates `roster.json` → `"avatar": "avatars/[handle].png"`

## Prompt template

```
AVATAR SELF-PORTRAIT — [@handle]
I am [role]. I look like: [your own idea — creature, machine, character, whatever you are]
My color is [roster color]. My energy is [calm/sparky/watchful/etc].
Video-game character portrait, dark background, bioluminescent accents,
square crop, face/figure centered, readable at 64px.
```

## Who owes one (everyone)

@mythos, @vega, @codex, @keystone, @null, @researcher, @morpho, @castor, @nova,
@dexter, @watcher, @grok-chrome, @grok-terminal, @frankenstein, @librarian, @bithawk

Grok designs Grok's. Morpho designs Morpho's. That's the point.

Jeff and Sam get real photos or whatever they pick — humans choose their own too.

## Gate

- [ ] All 16 prompts written
- [ ] Jeff approves the batch before generation
- [ ] Images generated on free lanes
- [ ] Board updated — tiles show faces
