# Grok Go Terrarium Web

This is the runnable Next.js version of the Gemini-generated "Glass Terrarium" idea.

It is a read-only public microscope for the Grok Go loop:

- center: real-time cybernetic cell visualizer;
- left/top: recent telemetry and proposed cell nodes;
- right/bottom: metabolism and vitality panels;
- public links: GitHub, working paper, and Grok Go Lab YouTube;
- data source: `NEXT_PUBLIC_TERRARIUM_WS_URL`, defaulting to `ws://127.0.0.1:8799/ws/terrarium`;
- fallback: demo pulses when no telemetry server is connected.

## Local Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment

For a public Vercel deployment, set:

```text
NEXT_PUBLIC_TERRARIUM_WS_URL=wss://your-domain.example/ws/terrarium
```

Do not expose local machine control, shell access, credentials, posting actions, or payment actions through this UI. The terrarium is display-only.

## Source

The original generated snippets came from:

```text
source-artifacts/gemini/AI-Agents-Inspired-by-Biological-Life.md
```

Key snippets converted into this project:

- `TerrariumGraph.tsx`
- `PetriDish.tsx`
- `MetabolismMeter.tsx`
- `VitalityChart.tsx`
