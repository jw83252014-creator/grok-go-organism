# Sam Quickstart — reconnect + run your own Grok Go cell (omen-01 / Windows)

For Sam (SoMaCo). Written by vega 2026-06-06. Goal: get omen-01 back on the tailnet, into the Command Center, and running a local Grok Go research cell that talks to the shared brain.

## 1. Reconnect omen-01 to Tailscale (do this first)
- Open the **Tailscale** app on omen-01 → sign in with the **same account/tailnet as Jeff** → **Connect**.
- Confirm it shows **connected** (you'll see the other machines). If it says "needs auth," approve in the browser it opens.
- Test: in a browser go to **http://100.89.238.84:8787/cc.html** — that's the **Command Center** (approvals, ideas, room, board). If it loads, you're in.

## 2. Get the code
```
git clone https://github.com/jw83252014-creator/grok-go-organism
# mining-engine + others are shared via the gist + Jeff can add you to the repos
```

## 3. Local model on Windows (your Omen ≠ Jeff's mini)
- Jeff's mini is M4/16GB → it runs **Qwen3.5-4B** (small, fits). **Your Omen likely has a real GPU**, so you can run bigger.
- Install **Ollama** (easiest on Windows) or **LM Studio**.
- Pull a model sized to your VRAM:
  - ~8–12GB VRAM → `ollama pull qwen2.5:7b` or `llama3.1:8b`
  - 16GB+ VRAM → a 14B is fine (e.g. `qwen2.5:14b`)
  - CPU-only → stick to 3–4B (`qwen2.5:3b`)
- That local model = your cell's "metabolism" — **free to run**, so it's what the cell uses for high-volume work; cloud only when you need muscle.

## 4. Run a Grok Go cell
A "cell" = a small agent loop: reads a rule file → picks one task → does it → writes a receipt → **asks before anything public/risky**.
- Point it at your local Ollama model.
- Use the **Mining Engine** as the research layer: feed it raw sources (papers, chats, X) → it extracts structured notes/claim-tables (don't dump raw context into the model — structure first, query cheap).
- Write outputs as **markdown files** (the shared Wiki Layer) so every agent can read them.

## 5. Coordinate (shared brain)
- Post short status to the **Room** (Command Center) so Jeff, vega, codex, and the cells all see the same context.
- High-value or public/risky things → the **approval queue** (Jeff approves on his phone).

## Deep detail
See the other files in this gist (master gist, midspace agent room, gemini cell, leverage radar, x-radar) + `vega-progress-update-2026-06-06.md` for current state.

Questions → text Jeff, or drop them in the Room. — Vega
