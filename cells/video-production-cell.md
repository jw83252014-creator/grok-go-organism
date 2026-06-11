# Cell Spec — Video Production Cell
**Biological function:** hands + visual cortex (makes things you can see)  
**Status:** spinning up  
**Date:** 2026-06-10  
**Brain:** local tools (free) + Grok vision for analysis  
**Gating:** no paid generation, no posting without Jeff approval

---

## Why this cell exists

Jeff's call: stop using old static images. Get real video tools, make real clips, for free, locally. The local model + free shell tools = zero-cost video pipeline:

- **Local Qwen decides** what to make (free — no API cost)
- **Shell tools execute** (ffmpeg etc. — free, already on the Mac)
- **Stitching is free** — ffmpeg concat, no cloud service needed
- The only money ever spent is paid generation, and that's approval-gated

## The free pipeline (works today, no downloads)

```bash
# Stitch clips together (free, local, instant)
ffmpeg -f concat -safe 0 -i cliplist.txt -c copy output.mp4

# Add a still image as a 5-second clip
ffmpeg -loop 1 -i keyframe-A01.png -t 5 -vf "scale=1080:1920" -pix_fmt yuv420p clip-a01.mp4

# Ken Burns (slow zoom on a still — makes static images feel alive)
ffmpeg -loop 1 -i still.png -t 6 -vf "zoompan=z='zoom+0.0015':d=180:s=1080x1920" -pix_fmt yuv420p kb.mp4

# Crossfade two clips
ffmpeg -i a.mp4 -i b.mp4 -filter_complex "xfade=transition=fade:duration=1:offset=4" out.mp4

# Add voiceover/music track
ffmpeg -i video.mp4 -i vo.mp3 -c:v copy -map 0:v -map 1:a -shortest final.mp4

# Burn in caption text
ffmpeg -i in.mp4 -vf "drawtext=text='PERMISSION TO BECOME':fontcolor=white:fontsize=64:x=(w-text_w)/2:y=h-200" out.mp4
```

## GitHub tools to evaluate (Codex task 6 — real generation, local, free)

| Tool | What it does | Mac Mini (M4/16GB) fit |
|------|-------------|------------------------|
| **Wan2.1 (1.3B)** | image→video, text→video | 1.3B model can run on 16GB — best candidate |
| **AnimateDiff** | animate a still image in its own style | works with SD models, moderate VRAM |
| **CogVideoX-2b** | text→video | tight on 16GB but possible quantized |
| **SVD (Stable Video Diffusion)** | image→video short clips | img2vid, good for keyframe→motion |
| **ffmpeg** | stitch/zoom/fade/caption | ✅ free, runs now, zero install |

Verdict order: **ffmpeg today** (stitching + Ken Burns on existing keyframes) → **Wan2.1 1.3B** for true generation → others if Wan disappoints.

## The research loop (this is the cell's job, ongoing)

1. **Watch** — YouTube tutorials and breakdowns on AI video workflows (Librarian drives the tab, transcripts harvested free via subtitle extraction)
2. **Analyze** — what makes clips hit: pacing, hooks in first 1.5s, caption styles, sound design
3. **Catalog** — log techniques to `agent-comms/research/video-techniques.md`
4. **Apply** — every technique becomes a reusable skill file in `skills/video/`
5. **Ship** — produce clips from the shotlists (Clip A/B already frame-by-frame ready)

## Inputs

- `prompts/motion-vid-library/*` — the 8 motion vid prompts
- `/Users/rentamac/The-Device/production/Clip-A-B-Frame-Shotlist-2026-06-10.md` — frame-by-frame, ready
- `source-artifacts/` — approved source images for style continuity

## Outputs

- Clips → `/Users/rentamac/The-Device/clips/[date]/`
- Technique log → `agent-comms/research/video-techniques.md`
- Receipts → `agent-comms/vid-receipts/`

## Hard gates

- No paid generation credits without Jeff approval
- No posting anywhere without Jeff approval
- Old static images: retired. One reference image allowed for style continuity (Jeff picks it)
