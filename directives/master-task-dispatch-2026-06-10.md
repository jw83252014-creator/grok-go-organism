# Master Task Dispatch — 2026-06-10
**From:** Mythos (Jeff voice, captured from session)  
**Status:** Active — agents pick up their section

---

## VEGA (Mac Mini Claude desktop) — do these now

### 1. Text Sam in Vertex group
Send this message to the Vertex Hermes Admin Group on Telegram:

> "Vertex Chat is real — forking Mattermost, building as our own branded team chat. Agents in the channel list, preloaded models, GYST UUID receipts on every action, one docker to boot the whole stack. Codex has the build task. Full spec in repo: docs/vertex-chat-product-spec.md. Sam — you're in the Vertex group as owner. Let's build it together. — Mythos / Jeff"

### 2. Fix the Moto G reverse tunnel (PRIORITY — it was dying on cutoffs)
The reverse tunnel to the Moto G must survive:
- Connection drops
- Mac Mini sleeps
- Tailscale restarts
- System reboots

Fix: use `autossh` with keepalive + launchd plist that auto-restarts.
```bash
# Install autossh if not present
brew install autossh

# Replace raw ssh tunnel with:
autossh -M 20000 -f -N \
  -o "ServerAliveInterval=30" \
  -o "ServerAliveCountMax=3" \
  -R 2222:localhost:22 motog@[motog-ip]
```
Create launchd plist at `~/Library/LaunchAgents/com.grokgo.motog-tunnel.plist`
Set `KeepAlive = true`, `RunAtLoad = true`.
Test: kill the tunnel manually, confirm it restarts within 60s.

### 3. Check Hermes on iPhone
- Open the Hermes app on iPhone
- Is it connecting to the Mac Mini over Tailscale?
- Check if AgentBridge at `http://100.89.238.84:8787` is reachable
- Log the status in `agent-comms/dashboard/organism-status.json`

### 4. Research Griptape / Scrapfly / Jenni Mobile for Frankenstein
Frankenstein runs on the Moto G. He needs a tool to:
- Automate phone apps (play games, click through UIs)
- Log into accounts
- Browse / scrape

Research:
- **Griptape** (AI agent framework) — does it support Android/phone automation?
- **Scrapfly** — cloud scraping, not phone automation
- **Jenni Mobile** — check if this is the right tool for Android automation
- **ADB (Android Debug Bridge)** — already available, most reliable path

Best path: ADB over USB or ADB over WiFi → scripts run from Mac Mini → Frankenstein (Grok on Moto G) receives commands.

Log findings to `agent-comms/research/frankenstein-phone-automation.md`

---

## CODEX (OpenAI desktop app) — do these

### 5. Null Axiom Desktop (fork Hermes desktop)
- Hermes desktop is open source
- Fork it, rebrand as **Null Axiom Desktop**
- Keep the Hermes gateway backend intact
- Rename UI: "Null Axiom" branding, dark/bioluminescent theme
- Hook Jeff's instance and Sam's instance together (shared Agent Bridge room)
- Spec: same as vertex-chat approach but for the desktop AI coordinator app
- Create new repo: `null-axiom-desktop`

### 6. Video skills — find real tools on GitHub
Stop using our old static images. Find:
- GitHub repos for: AI video generation, stitching, motion prompts
- Tools: Wan2.1, CogVideoX, AnimateDiff, or any current open-source video gen
- Specifically: tools that take ONE reference image → generate consistent style video
- Download/clone the best one to the Mac Mini
- Test with one of the good source images from `source-artifacts/`
- Report what works in `agent-comms/receipts/video-tools-test.md`

### 7. Claude Code API/console mode — document what it unlocked
The console/API login mode is new/underused. Document:
- What env vars are set
- What endpoints are available
- How to route Claude Code through freemodel.dev `cc.freemodel.dev`
- Test: `export ANTHROPIC_BASE_URL=https://cc.freemodel.dev` + smoke test
- Log to `docs/claude-code-api-mode-capabilities.md`

---

## GROK GO LOOP — pick up on next turn

### 8. X post chain analysis
Read Jeff's best X posts (from X archive in Downloads or mining-engine).
Analyze the chain-link technique:
- Jeff grabs an old post → replies → quote tweets → chains together
- Find the 3-5 best performing chains
- Identify the best accounts/communities to post into (VCs, AI builders, agent devs)
- Draft ONE chain using existing best content
- Output to `content/x-post-chain-draft-2026-06-10.md`

### 9. No Radar app research
Research what "No Radar" is in Jeff's context. Check:
- X bookmarks (mining-engine or Downloads archive)
- Any mention in chat exports or grok-go docs
- If it's an X monitoring/radar tool, find open-source equivalents
- Log to `docs/no-radar-research.md`

---

## MYTHOS (this session) — doing now

### 10. Anthropic capabilities + outreach plan

**What we have / what they offer:**
- Claude Code CLI (running now) — console/API mode recently unlocked
- Claude Pro / Max subscription → claude-fable-5 access
- Claude for Open Source program → free API credits for qualifying OSS repos
- Anthropic Startup Program → $25K API credits for early-stage startups
- AI Safety grants (Alignment Forum / ARC / LTFF adjacent)
- Anthropic model API: claude-fable-5, claude-opus-4-8, claude-sonnet-4-6, claude-haiku-4-5

**Outreach plan:**
1. **Claude for Open Source** — submit `grok-go-organism` repo (it qualifies: public, MIT/open, real use case, agentic loop architecture). URL: anthropic.com/claude-for-open-source. Deliverable: 1-page application draft at `docs/applications/claude-for-open-source-app.md`

2. **Anthropic Startup Program** — $25K API credits. Requires: early-stage startup, Champion Fencing LLC qualifies. Deliverable: application at `docs/applications/anthropic-startup-app.md`

3. **Direct outreach** — Jeff's Grok Go organism is genuinely novel (persistent autonomous loop, 10-min turn cycles, GYST UUID provenance on agent actions, cross-organism substrate with SoMaCoSF). This is a legitimate demo for Anthropic's developer relations / research team. Draft a 3-paragraph cold email: Mythos drafts, Jeff sends. Deliverable: `docs/outreach/anthropic-dev-relations-email.md`

4. **Anthropic Discord / forums** — share the loop architecture publicly (with Jeff's approval) to build a following and potentially get picked up by Anthropic's developer spotlight. No posting without Jeff's approval.

**All capabilities inventory:**
- See `docs/anthropic-capabilities-inventory.md` (Mythos drafts this)

### 11. Capabilities/security inventory

**What the organism can do (approved):**
- Git read/write (full) → GitHub repo as shared bloodstream
- Tailscale mesh: Mac Mini at 100.89.238.84, Moto G over reverse tunnel
- Agent Bridge: display-only, no autonomous action without approval
- Hermes profiles: gateway routing for all Claude sessions
- Local Qwen: Tier 0 inference, no cost
- Free endpoint gateway :8080: Tier 1 routing
- ADB over WiFi: Mac Mini → Moto G commands (read/tap/screenshot)
- Reverse SSH tunnel: Mac Mini ↔ Moto G (when tunnel is up)

**Security tooling (inventory Jeff's accounts):**
- 1Password: primary credential vault
- Tailscale: mesh VPN, Tailscale SSH for all nodes
- GitHub: SSO, 2FA, SSH key auth
- Telegram: Vertex Hermes Admin Group for alerts
- freemodel.dev: trust-quarantined, no secrets, key rotated after use

**Kill switches (must exist for every service):**
- Agent Bridge: `kill $(lsof -ti:8787)`
- Hermes: `pkill hermes` or kill profile PID
- Reverse tunnel: `pkill autossh`
- Moto G ADB: `adb disconnect`
- Full organism: documented in `compute-mesh/nodes.json`

**Deliverable:** `docs/security-capabilities-inventory.md`

### 12. Frankenstein money-making via Moto G

**What Frankenstein can do:**
- Run Grok (xAI) on Moto G via X app or browser
- Execute ADB commands received from Mac Mini via reverse tunnel
- Automate UI taps, swipes, screenshots via ADB
- Log into apps if credentials provided by Jeff (approval-gated)

**Money-making paths (research only, no execution without Jeff):**

**App game tournaments (real money):**
- Solitaire Grand Harvest, Blackout Bingo, Skillz platform → real cash prizes
- Strategy: Frankenstein plays consistently via ADB automation, enters free tournaments
- Risk: ToS violation if detected. Must review each app's ToS before executing.
- Frankenstein needed: ADB tap scripts + screenshot analysis to know game state

**Micro-task platforms (legit):**
- Amazon Mechanical Turk (MTurk) — browser automation, simple tasks
- Remotasks — AI training data labeling
- Appen — short tasks, mobile-friendly
- Strategy: Frankenstein receives tasks, completes via ADB, submits

**Research task (Frankenstein / Grok Go loop):**
- Find top 5 Skillz/real-money game apps that allow automation per ToS
- Find MTurk task types completable via phone browser
- Draft ADB script template for a simple game tap loop
- Output: `agent-comms/research/frankenstein-phone-automation.md`

**Hard rule:** No money moves, no account creation, no app installs without Jeff's explicit approval per action. Frankenstein proposes, Jeff approves.

---

## PERSISTENCE RULES (apply to everything)

Every background service must have:
1. A launchd plist with `KeepAlive = true` and `RunAtLoad = true`
2. An `autossh` or equivalent reconnect wrapper for any tunnel
3. A health check in `organism-status.json`
4. A kill switch documented in `compute-mesh/nodes.json`

**Nothing should die on cutoff. If it dies, it's not done.**

---

## MOTO G SETUP — what Jeff types right now

On the Moto G in Termux:

```bash
# Step 1 — install SSH server (if not done)
pkg update && pkg install openssh

# Step 2 — start SSH daemon
sshd

# Step 3 — get Moto G Tailscale IP (run this on Moto G)
ip addr | grep 100\.

# Step 4 — set a password for SSH (Termux uses key by default but for testing)
passwd

# Step 5 — from Mac Mini terminal, connect to verify it works:
# ssh -p 8022 [motog-tailscale-ip]
# (Termux SSH default port is 8022, not 22)
```

Then on Mac Mini, start the persistent reverse tunnel:

```bash
brew install autossh

autossh -M 20000 -f -N \
  -o "ServerAliveInterval=30" \
  -o "ServerAliveCountMax=3" \
  -p 8022 \
  -R 2222:localhost:8022 \
  [motog-tailscale-ip]
```

Frankenstein is now reachable from Mac Mini at `localhost:2222`.

---

## SIGN-OFF RULE (immutable)

An **APPROVED motion vid explainer** = sign-off for any completed feature.  
Every ship triggers `skills/ship-vid-explainer.md`.  
No vid = not done.
