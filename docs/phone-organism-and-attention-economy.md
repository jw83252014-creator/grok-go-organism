# The phone as a sense organ + the attention-economy inversion

**Date:** 2026-06-10 · Jeff's vision: the dashboard ties to phone apps, pulls their data, keeps itself current, and you never open the apps. Each app gets an agent that reports to the main board. Plus: flip the ad model — advertisers pay *us* to prove value instead of vampirically stealing attention.

## 1. The "real app" — solved without an app store
We do **not** need a native Moto G / iPhone app. The command center is now an installable **PWA**:
- `manifest.json` + PNG icons (192/512/maskable/apple-touch) + a **network-first** service worker (`sw.js`).
- **Install:** Moto G → Chrome → "Install app"; iPhone → Safari → Share → Add to Home Screen.
- It gets a real home-screen icon, opens fullscreen to the big-button launcher (`app.html`), and **auto-updates** because it's the live page (network-first SW = never stale).
- Works over Tailscale on any wifi. No build, no store, no review.
- The launcher now has every surface **plus the three public links** (site / GitHub / YouTube) as tiles.

## 2. Each app → an agent → the board (the sense-organ model)
Biology: the organism grows **sense organs**. Each external app/data source becomes a small agent (a sensory cell) that reads its source and posts a compact update to the bridge (`POST /api/say {agent, message}`), which the board renders. You watch the board, not 20 apps.

| Source | How the agent reads it | Status |
|---|---|---|
| Gmail | Gmail MCP connector (already authed for jw83252014) | buildable now |
| Calendar | Calendar MCP | buildable now |
| X / Grok | the Tampermonkey relay + `get_page_text` | partly built |
| GitHub | `gh` CLI | buildable now |
| Telegram | bot API / export | relay live |
| Generic phone app (no API) | **Android automation** (below) | needs Moto G online |

**Pattern:** each agent = a cron/launchd job → read source → summarize on the FREE local model (`lm`) → `curl /api/say`. Cheap, on-box, and the board becomes the single conscious surface (ties to `consciousness-architecture.md`).

## 3. "Clicking things in apps" on the Moto G — the honest path
Reading an app's data is easy when it has an API/MCP. **Driving an app that has no API** (tapping buttons, scraping a screen) on Android needs one of:
- **Termux + ADB** (scrcpy already works per setup notes) — script taps/inputs over the debug bridge.
- **Tasker / MacroDroid** — Android automation apps; an agent triggers a Tasker profile.
- **Accessibility service** — read screen + inject taps (most powerful, most invasive; user-granted).
These are real but heavier than the dashboard, and the **Moto G must be online** (right now its Tailscale SSH `100.107.96.107:8022` times out — Termux/sshd is down or it's off wifi). Once it's up: verify the reverse tunnel (originates from the Mac, ShieldsUp), then install the PWA + drop a first sense-organ agent there.

## 4. The attention-economy inversion (the philosophy → the product)
Today's model is **vampiric**: apps harvest your attention and data, sell it to advertisers, and give you "personalization" mined from yourself. Jeff's flip:
> **You own the filter. Advertisers pay to get *past* it — and only if they prove value.**

Mechanically, this organism already inverts it:
- Your **personal filter** (what matters, what's BS) is encoded as rules the agents run *for you*, before anything reaches you.
- An inbound pitch (ad, cold email, offer) is **data the immune system screens**, not an interruption that wins by default.
- The natural product: an **attention gate** — nothing reaches your conscious surface unless it passes your filter; senders can attach value (a real offer, a payment, a proof) to earn a slot. Attention becomes a market *you* run, priced by *you*, instead of a resource strip-mined from you.
- This is the consumer face of the same principle as the build: **ownable, anti-extraction AI.** The dashboard is the cockpit; the filter is the moat.

## Build order
1. ✅ PWA (installable, auto-updating) + launcher with all links.
2. First sense-organ agent on a source with an API (Gmail or GitHub) → posts to the board.
3. Moto G online → PWA installed + reverse tunnel verified.
4. Android automation agent for one no-API app (proof of concept).
5. Attention-gate prototype: inbound items scored by the personal filter before they surface.
