# Frankenstein Phone Automation — Research
**Date:** 2026-06-10  
**Agent:** Mythos (this session)  
**Vessel:** Moto G (Frankenstein cell, Grok via X/browser)  
**Status:** RESEARCH — no execution without Jeff approval

---

## Setup Path (ADB over WiFi from Mac Mini)

ADB is the most reliable path. No third-party automation framework needed.

```bash
# On Moto G: enable Developer Options + USB Debugging + Wireless Debugging
# Settings → About Phone → tap Build Number 7x → Developer Options → enable
# Developer Options → Wireless Debugging → enable

# Get Moto G's WiFi IP (or Tailscale IP)
# On Mac Mini:
adb connect [motog-ip]:5555

# Verify connected
adb devices

# Screenshot (see what Frankenstein sees)
adb exec-out screencap -p > screen.png

# Tap a coordinate (x=540, y=1200)
adb shell input tap 540 1200

# Swipe
adb shell input swipe 300 800 300 400 300

# Type text
adb shell input text "hello"

# Launch app by package name
adb shell monkey -p com.example.app -c android.intent.category.LAUNCHER 1
```

---

## Tool Assessment

### ADB (Android Debug Bridge) ✅ BEST PATH
- Already built into Android, no install on phone needed
- Full UI control: tap, swipe, type, screenshot, launch apps
- Can be driven from Mac Mini scripts (bash, Python)
- Works over WiFi once paired once via USB
- Works over Tailscale if Moto G has Tailscale installed
- **Verdict: Use this. Everything else is extra complexity.**

### Griptape ❌ NOT FOR PHONE AUTOMATION
- Griptape is a Python AI agent framework (tools, pipelines, memory)
- Has no Android/phone automation modules
- Useful for orchestrating Frankenstein's DECISIONS (what to do next)
- Not for clicking through phone UIs
- **Verdict: Could wrap ADB scripts as Griptape tools. Not the automation layer itself.**

### Scrapfly ❌ WRONG TOOL
- Cloud scraping service (web scraping, not phone automation)
- No ADB, no Android, no UI automation
- Useful if Frankenstein needs to scrape web data FROM the Mac Mini
- **Verdict: Wrong tool for phone automation. Potential use for web research tasks.**

### Jenni Mobile ❓ UNCLEAR / LOW PRIORITY
- No strong reference to "Jenni Mobile" as Android automation tool
- Possibly confused with Appium (open source mobile automation)
- **Verdict: Research Appium instead — it's the standard tool for Android UI automation**

### Appium 🔶 BACKUP IF ADB NOT ENOUGH
- Open source mobile automation framework
- Wraps ADB with higher-level selectors (XPath, accessibility IDs)
- Better for complex app automation that needs element detection
- Requires Appium server running on Mac Mini + Appium client
- **Verdict: Good backup for complex game UIs that need element detection**

---

## Money-Making Paths (ToS-aware, Jeff-approved only)

### Path 1: Micro-task platforms (LOWEST RISK)
Real money, legitimate, Frankenstein's browser does the work.

| Platform | Task type | Est. earnings | ToS on automation |
|----------|-----------|---------------|-------------------|
| Amazon MTurk | Image labeling, surveys, transcription | $0.05-$2/task | Technically prohibits bots |
| Remotasks | AI training data labeling | $0.10-$5/task | Prohibits bots |
| Appen | Short classification tasks | $9-14/hr | Prohibits bots |

**Risk:** All of these technically prohibit automation. Must review ToS per platform before executing. Human-in-the-loop (Jeff watches and approves each session) is safest.

### Path 2: Real-money game tournaments (MEDIUM RISK)
Skillz platform hosts real-cash tournaments for mobile games.

**Approved games list (by Jeff only):**
| App | Tournament type | Automation risk |
|-----|----------------|-----------------|
| Solitaire Grand Harvest | Solitaire, cash prizes | ToS prohibits bots |
| 21 Blitz | Card game, cash prizes | ToS prohibits bots |
| Blackout Bingo | Bingo, cash | ToS prohibits bots |

**Frankenstein's ADB strategy:**
1. Screenshot → analyze game state (send to Grok for vision analysis)
2. Grok decides best move
3. ADB sends tap command
4. Loop

**Risk:** Every Skillz game prohibits automation. Account ban + clawback of winnings is real.  
**Verdict: Research only until Jeff makes explicit go/no-go call per app.**

### Path 3: Content generation (NO RISK)
Frankenstein generates content on Moto G, posts to platforms Jeff controls.
- X posts (via X app ADB automation) → Jeff approves before posting
- Short-form video captions
- Market research summaries

**Verdict: Safest money path long-term (content → audience → revenue). Start here.**

---

## ADB Script Template (for Frankenstein loop)

```python
# frankenstein_loop.py — runs on Mac Mini, drives Moto G via ADB
import subprocess
import time
from pathlib import Path

MOTOG_IP = "100.x.x.x"  # Tailscale IP
ADB_PORT = "5555"

def adb(cmd):
    return subprocess.run(
        f"adb -s {MOTOG_IP}:{ADB_PORT} {cmd}",
        shell=True, capture_output=True, text=True
    ).stdout

def screenshot(filename="screen.png"):
    subprocess.run(
        f"adb -s {MOTOG_IP}:{ADB_PORT} exec-out screencap -p > {filename}",
        shell=True
    )

def tap(x, y):
    adb(f"shell input tap {x} {y}")
    time.sleep(0.5)

def swipe(x1, y1, x2, y2, duration=300):
    adb(f"shell input swipe {x1} {y1} {x2} {y2} {duration}")

# Connect
adb(f"connect {MOTOG_IP}:{ADB_PORT}")

# Main loop — replace with actual game logic
while True:
    screenshot("current_state.png")
    # Send to Grok vision → get tap coordinates → execute
    # ALL execution gated on Jeff approval via Agent Bridge
    break
```

---

## Next Steps

- [ ] Jeff enables wireless ADB on Moto G (Settings → Developer Options → Wireless Debugging)
- [ ] Mac Mini connects: `adb connect [motog-tailscale-ip]:5555`
- [ ] Test screenshot round-trip: `adb exec-out screencap -p > test.png`
- [ ] Jeff approves which money path to try first
- [ ] Frankenstein loop script written for approved path

---

## APPROVAL GATE

- [ ] Jeff approves automation tool (ADB chosen above)
- [ ] Jeff approves money-making path (content gen recommended as first step)
- [ ] Jeff approves Moto G wireless debugging enabled
- [ ] NO account actions, money moves, or tournament entries without per-session Jeff approval
