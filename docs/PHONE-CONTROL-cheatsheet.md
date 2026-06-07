# 📱 Phone Control — full setup + daily commands (Termius / Blink)

Run the whole command center from your iPhone/iPad over SSH. Approvals also pop a **macOS notification + Telegram**, so you know when something needs you.

---

# ⚡ TL;DR — 3 steps to connect
1. **Tailscale ON** on the phone.
2. **Make an SSH key in Termius** → paste me the *public* key → I authorize it on the mini.
3. **Add the host** (Mac mini, below) → tap it → you're in. Type `approvals`.

The Mac mini:
```
Address : 100.89.238.84
Username: rentamac
Port    : 22
```
(Remote Login is already ON, 2 keys already trusted, ~/.ssh locked down. Ready for you.)

---

# PART 1 — Tailscale (do once per device)
Termius reaches the mini over your private Tailscale network, so Tailscale must be running.
1. App Store → install **Tailscale** → open it.
2. Sign in with the **same account** as your other machines.
3. Toggle it **ON** (top switch). You'll see your devices listed — `rentamacs-mac-mini-2` is the one we want.
That's it — leave Tailscale on. (iPad: same steps.)

---

# PART 2 — The SSH key (the part people get stuck on)
**Secure way (recommended): Termius makes the key, you send me only the *public* half.**
1. Termius → bottom tab **Keychain** (key icon) → **+** → **Generate Key**.
   - Type: **ED25519**
   - Name: `iphone-termius`
   - (passphrase optional) → **Generate**.
2. Tap the new key → **Copy Public Key** (a.k.a. "Export Public Key").
3. **Paste that line to me here.** It starts with `ssh-ed25519 ...`. (Public keys are safe to share; the private half never leaves your phone.)
4. I append it to the mini's `~/.ssh/authorized_keys` → done in seconds.

> Prefer no back-and-forth? Tell me and I'll generate a key *on the mini* and hand you the private key to import (Termius → Keychain → **Import**). Slightly less ideal but one-step.

---

# PART 3 — Add the Mac mini host in Termius
1. Termius → **Hosts** tab → **+** → **New Host**.
2. Set:
   - **Alias:** `Mac mini`
   - **Address:** `100.89.238.84`
   - **Port:** `22`
3. **Username** shows "Select identity / Create identity." Termius bundles login = username + key into an **Identity**. Tap **Create Identity**:
   - **Username:** `rentamac`
   - **Key:** pick `iphone-termius`
   - **Name:** `mini – rentamac`
   - Save → it's now selected for the host. (Reuse pattern: ThinkPad = new identity `jeff` + same key; Moto = `u0_a484` + same key, port 8022.)
4. **SSH Agent Forwarding: leave OFF** (only needed to hop onward/`git push` from the mini using your phone key). **"Set up for AI assistants": optional, skip.**
5. **Save** → tap **Mac mini** → trust the fingerprint (`SHA256:FzhVm1uDnLir3ZHcseb3pTHiIM7vTHtpxf3tZNB9NX0`) → you get a shell.
6. Test: type `approvals` and hit return.

---

# PART 4 — Daily commands (just type them)
| Command | What it does |
|---|---|
| `approvals` | list everything waiting for your yes |
| `approve <id>` | approve it — e.g. `approve appr_20260605134003_buylsk` |
| `deny <id>` | deny it (optionally `deny <id> "reason"`) |
| `drop <url or note>` | **feed a link/idea to the agents** — saved + posted to the bridge |
| `board` | the live kanban board |

**Speed flow:** notification pops → `approvals` → `approve <id>`. See a good article → `drop <link>` → Librarian grabs it. `board` anytime.

---

# PART 5 — iPad (set up once, works everywhere)
Make a **free Termius account** and log in on both iPhone + iPad. Your hosts and keys **sync automatically** — set up the iPhone once and the iPad already has the Mac mini host. (Just install + turn on Tailscale on the iPad too.)
Blink Shell works the same way; it has its own key manager under Settings → Keys.

---

# PART 6 — All your machines on Tailscale (add any you want in Termius)
| Device | Address | Username | Port | Note |
|---|---|---|---|---|
| **Mac mini** (command center) | `100.89.238.84` | `rentamac` | `22` | **the one you need** |
| ThinkPad X220 | `100.119.33.21` | `jeff` | `22` | linux jump host |
| Moto G (Frankenstein) | `100.107.96.107` | `u0_a484` | `8022` | Termux — note port 8022 |
| iPad / iPhone | (clients) | — | — | you connect *from* these |

Same iPhone key works on all three — once it's in each machine's `authorized_keys`. The mini's is handled; say the word and I'll prep the ThinkPad/Moto too.

---

# Also on the phone (no SSH needed)
**Obsidian app** → `Command-Center/` folder = the board + plans + this cheatsheet (iCloud-synced, read-anywhere). The easy "pop it up" view.
