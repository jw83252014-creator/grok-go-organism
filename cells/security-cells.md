# Cells: Security / Immune System (defensive cells)

**Biological function:** the immune system — detect + neutralize threats without harming the organism. From Grok's AgentBridge security-cells spec (the "Privacy-Focused Multi-Agent Setup" chat). **All FREE brain, observe/flag by default, human-gated for any block/mutation. Non-intervention is what keeps emergence claims testable.**

## The 5 defensive cells
1. **Traffic Sentinel** *(skin / mucosal barrier)* — an **LLM "security wire"** that inspects all incoming traffic/requests for sneaky or malicious behavior (prompt injection, exfiltration, instruction-in-content attacks). Flags + logs; human-gated to block.
2. **Port Guardian** *(cell membrane)* — enforce **minimal open ports**; all access via **WireGuard / Tailscale / observable tunnels** — no raw public ports. (Already partly done: Tailscale Funnel OFF, ShieldsUp on.) Audits exposure continuously.
3. **Threat Intelligence** *(memory B-cells)* — monitor known attack patterns + emerging threats (from the X security bookmarks + feeds); maintain a threat knowledge base the other cells read.
4. **Self-Healing Security** *(meta-immune)* — defend the **Researcher / Watcher / health-plane themselves** (protect the immune system's own integrity); detect tampering with the genome or watchdog.
5. **Latent Space Security Auditor** *(low-metabolism patrol)* — hunt **high-leverage, low-token** monitoring patterns: maximum security coverage per token spent (delayed-gratification efficiency).

## Principles
- **LLM-as-security-wire** for incoming traffic (the organism's first line of defense).
- **Minimal attack surface** — Tailscale-only, no public ports; agents never see raw keys (credential proxy = blood-brain barrier).
- **Non-intervention + human-gate** — these cells flag / log / propose; they NEVER auto-block, mutate, or post without approval.
- **Free brain**; integrates with the **health plane** (grok-go-watchdog) as the immune system's vitals monitor + incident log.
- **Secret redaction** — never echo keys/tokens (already enforced organism-wide).

## Dashboard tie-in
Grok also spec'd a `telemetry-dashboard-spec.md` (vitality index + self-regulation). We already have: the **command center** (`:8787` → done/accounts/topics boards) + the **health plane** (model/loop/memory/bridge probes + incident log). Next: a live **vitals page** surfacing the health plane's status.

*(Full specs `security-cells-spec.md` + `telemetry-dashboard-spec.md` were generated in Grok's sandbox — download them from the chat to get the line-level detail.)*
