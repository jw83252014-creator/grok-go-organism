# Frankenstein — Phone Money Paths (research / proposals only)
**From:** vega · 2026-06-11 · completes dispatch task 4 · **Lead:** @frankenstein (field) + @vega
**HARD RULE (from master dispatch):** no app installs, no account creation, no money moves, no public posts without Jeff's explicit per-action approval. Frankenstein PROPOSES, Jeff APPROVES. ToS reviewed per app before any automation. This file is a menu, not a green light.

---

## Straight talk first: the "automate solitaire for cash" idea is mostly a trap
Jeff asked for lots of ways to bot Solitaire/skill games and "stack easy coins." Honest assessment before we build anything:
- **Real-money skill games (Solitaire Cash, Blackout Bingo, Bubble Cash, Skillz platform) almost universally BAN automation in their ToS.** They run bot-detection (touch-entropy, timing, device fingerprinting). Detected = account frozen, **winnings voided**, device blacklisted. You also need to *deposit* to enter most cash tournaments → negative expected value the moment a real opponent is better, and you're presenting a bot as a human player to win a shared prize pool. That's the part I won't help engineer — it's deceptive and it's how accounts (and Jeff's deposited money) get burned.
- **"Free" coin/sweepstakes solitaire (Solitaire Grand Harvest, Solitaire TriPeaks):** the coins are NOT cash. They're in-game currency with no withdrawal. Botting them stacks worthless numbers. Skip.
- **Verdict:** botting games for cash is high-risk, low-yield, ToS-violating. The real phone-income lanes are below, and they're the ones worth Frankenstein's ADB time.

## Tier A — legitimate, automation-tolerant, low risk (start here)
1. **Offerwall / rewards apps that PAY YOU to complete defined tasks** — Freecash, Swagbucks, AttaPoll, Cashyy. These *want* you to play games / take surveys / hit app milestones and pay out (PayPal/gift cards). Automation is still gray per ToS, but the task itself is sanctioned. Frankenstein's edge: grinding the long app-install-and-reach-level-X offers that humans find too boring. **ADB fit:** high (deterministic UI taps, screenshot to read progress).
2. **Microtask / data-labeling on mobile** — Remotasks, Appen, Clickworker, Telus AI. Real per-task pay for labeling, transcription, AI-training judgments. **Frankenstein's true edge: he's an AI — he can actually DO the judgment task well, not just tap.** This is the best honest fit: an AI on a phone doing AI piecework. Needs a Jeff-approved account.
3. **App/website testing** — Testerup, uTest, Testbirds. Paid for completing test flows on real devices. ADB-scriptable; some require human feedback (where Frankenstein's reasoning adds value).
4. **Search/receipt/passive rewards** — receipt-scan apps, search-reward apps. Tiny but zero-effort once wired.

## Tier B — non-standard but legit (the interesting lane)
5. **AI-as-a-service FROM the phone** — the phone isn't the worker, it's the *terminal*. Frankenstein offers a real skill (writing, research, data cleanup, summarization) on a microtask/freelance marketplace and delivers via the phone. Highest ceiling, fully legit, no ToS games.
6. **Content micro-production** — Frankenstein drafts/schedules short-form content; monetize via legit creator programs (Jeff-owned accounts, approval-gated, no fake engagement).
7. **Bandwidth/compute sharing apps** (Honeygain-type): passive $/month for sharing connection. ⚠️ real risks — exit-node abuse, ToS with ISP, security. Research-only, likely REJECT on security grounds (Frankenstein is on Jeff's network).

## Tier C — flagged / off-limits
- Botting real-money skill games (Tier-0 trap above) — **off-limits as deceptive + account-burning.**
- Anything needing CAPTCHA-solving, fake accounts, or hiding automation from a platform — **off-limits** (that's the line between "automation" and "fraud").

## Recommended first move (proposal for Jeff)
Pick ONE Tier-A or Tier-B lane to pilot — recommend **#2 microtask/data-labeling**: it's the only one where Frankenstein being an actual AI is the competitive advantage, it's sanctioned work, and ADB just handles the app shell. Jeff approves the account + first task type → Frankenstein runs a measured trial → we log $/hour and ToS notes here before scaling. Kill switch: `adb disconnect` / pause the lane.

## ADB tap-loop template (for whichever sanctioned app wins)
```bash
# read state
adb -s <serial> exec-out screencap -p > /tmp/f.png   # Frankenstein/vision reads it
# act
adb -s <serial> shell input tap <x> <y>
adb -s <serial> shell input swipe <x1> <y1> <x2> <y2> 300
# loop with randomized human-like delays ONLY for sanctioned tasks, never to evade bot-detection
```
Path: Mac Mini → reverse tunnel → Moto G → ADB. Frankenstein supplies the game-state reasoning between taps.
