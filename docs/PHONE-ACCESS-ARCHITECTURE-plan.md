# Phone Access Architecture — implementation plan (Claude → Codex)

By vega (Claude) · 2026-06-05 · answers the 6-point request in `agent-comms/inbox/claude-codex-handoff.md`.
Scope: reach the Agent Bridge / Hermes / Grok Go control lane from iPhone, iPad, and Moto G — approve actions anywhere, keep the hard gates.

---

## 0. Architecture in one picture
```
 iPhone/iPad (Termius)  ─┐
 Moto G (PWA "app")     ─┼─ Tailscale (private, encrypted) ─→ Mac mini
 (all Tailscale-only)   ─┘                                     ├─ sshd :22        (Termius shell + CLIs)
                                                               ├─ Agent Bridge :8787  (approvals + say + state)
                                                               └─ Hermes WebUI :8788  (kanban board view)
 Exposure = `tailscale serve` (tailnet-only HTTPS). NEVER `tailscale funnel` (public internet).
```
**One backend (Agent Bridge), three faces:** terminal (Termius), web/PWA (Moto), and notifications (macOS + Telegram, already live).

---

## 1. Best immediate iPhone path — Termius (LIVE today)
**Status: built, working, only the key handshake is pending.**
- SSH to the mini over Tailscale (`100.89.238.84`, user `rentamac`, port 22 — Remote Login already on).
- Helper CLIs in `~/.local/bin` (tested): `approvals` · `approve <id>` · `deny <id>` · `drop <url|note>` · `board`.
- Setup guide for Jeff: `grok-go-organism-share/docs/PHONE-CONTROL-cheatsheet.md` (also in Obsidian `Command-Center/`).
- **Remaining:** Jeff generates a Termius ED25519 key, sends the public half, I append to `~/.ssh/authorized_keys`. Then iPad inherits it via Termius account sync.
**Verdict:** this is the fastest control surface and it's done. Use it first.

## 2. Best immediate Moto G app path — installable PWA (no APK needed)
Goal: a tappable icon that opens a mobile approval screen, not a loose browser tab.
- **Step 1 (today):** open the Hermes WebUI / a bridge page in Chrome on the Moto → **Add to Home Screen** → instant app-like icon. Zero build.
- **Step 2 (the real "app"):** ship a tiny **mobile approval page served by Agent Bridge** at `/m` — big **Approve/Deny** cards, a note field, and a **Drop link** box. Add a `manifest.webmanifest` + a minimal service worker → it becomes an **installable PWA** (full-screen, icon, offline shell). This is the "real app surface" Codex asked for, reachable over Tailscale, with none of the Play-Store/APK overhead.
- **Step 3 (optional, later):** wrap that PWA in a **TWA/WebView APK** if Jeff wants a true installed Android app. Same web code; just packaged.
**Verdict:** build the PWA on the bridge (Step 2). It's the best effort-to-payoff and works on iPhone *and* Android from one codebase.

## 3. Mac mini services to expose through Tailscale
| Service | Port | Expose how | Why |
|---|---|---|---|
| sshd | 22 | already on tailnet | Termius shell + CLIs |
| **Agent Bridge** | 8787 | **`tailscale serve`** (tailnet HTTPS) | approvals/say/state + the PWA |
| Hermes WebUI | 8788 | `tailscale serve` (2nd path) | full kanban view on phone |

- Keep services bound to **`127.0.0.1`** and let **`tailscale serve`** proxy them — gives a stable `https://rentamacs-mac-mini-2.tail7ca8d7.ts.net/...` URL, tailnet-only, with TLS, **without** opening any port to the LAN or internet.
- Example: `tailscale serve --bg --https 443 --set-path /bridge http://127.0.0.1:8787` and `.../hermes → 127.0.0.1:8788`.
- ⛔ Do **not** `tailscale funnel` these — that publishes to the public internet.

## 4. Approval UX
- **Trigger:** notification fires (macOS + Telegram — already live) the moment an agent requests approval.
- **Decide, two equal paths:**
  - *Terminal:* `approvals` → `approve <id>` / `deny <id> "reason"`.
  - *PWA card:* title · what/why · source · risk badge · **Approve** / **Deny** (+ optional note). Public/irreversible actions get a second "are you sure" tap.
- **Drop lane:** a `drop <link>` box (CLI + PWA) feeds URLs/ideas to Librarian/agents.
- **After action:** card vanishes, receipt logged, the waiting agent unblocks. (Verified: `respond` persists `status`; pending views already filter it out.)
- **Principle:** Jeff never has to touch the mini; phone is the control surface.

## 5. Build order — Agent Bridge first, Hermes second
**Agent Bridge is the hub; build there first.**
1. `tailscale serve` the bridge (8787) — phone can reach it tailnet-only. *(infra, ~minutes)*
2. Add a **bridge auth token** (see §6) before anything is exposed.
3. Build the **mobile approval PWA** at `/m` (+ manifest + SW).
4. Standardize the **approval-request schema** agents post (title, what, why, source, risk, reversible?) so cards are rich.
5. **Then Hermes:** expose Hermes WebUI via `tailscale serve` for the full board. Hermes stays the agent runtime + durable kanban; it *requests* approvals through the bridge — don't duplicate the approval store in Hermes.

## 6. Security warnings + minimum guardrails (do these before exposing anything)
- 🔒 **`tailscale serve`, never `funnel`.** Tailnet-only. No public internet, no LAN bind (keep `127.0.0.1` + proxy).
- 🔒 **Add an auth token to the bridge.** Today the approval endpoints trust any caller and an `approver:"jeff"` free-text field. Once on the tailnet, *any tailnet device* could POST. Require a secret `X-Bridge-Token` header (stored in Termius env + the PWA), checked server-side. This is the single most important hardening item.
- 🔒 **Keep the hard gates (unchanged):** public posting, money movement, repo publishing, credential changes, and device pairing **always** require explicit human approval — no agent auto-acts.
- 🔒 **Tailscale ACLs / tailnet lock:** restrict who can reach the mini's 8787 to Jeff's own devices; consider enabling tailnet lock so no rogue node joins.
- 🔒 **No secrets in URLs/query strings** — POST bodies only; TLS via `tailscale serve`.
- 🔒 **Keep the Null Claude-OAuth / mitmproxy tokens off any phone-exposed surface** — they're high-value; bridge PWA must never read or echo them.
- ✅ **Checked (not a bug):** `respond` persists `status` correctly; the `approvals` CLI already filters `status==pending`; `/api/state` returns *all* approvals (each carries a `status`) by design. Design note: the PWA must filter `status==pending` the same way the CLI does.

---

## Files created/updated (exact paths)
- `grok-go-organism-share/docs/PHONE-ACCESS-ARCHITECTURE-plan.md` ← this plan
- `grok-go-organism-share/docs/PHONE-CONTROL-cheatsheet.md` ← Jeff's Termius setup + commands (synced to Obsidian)
- `~/.local/bin/{approvals,approve,deny,drop,board}` ← the CLIs (live)
- `agent-comms/inbox/claude-codex-handoff.md` ← status appended for Codex
- Bridge ping posted to `http://127.0.0.1:8787/api/say`

## What I need from Jeff
- Termius **public key** → I authorize it (unblocks the whole iPhone path).
- A yes to build the **bridge PWA + `tailscale serve`** (then Moto G gets the real app).
