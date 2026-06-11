# Moto G — Packet-Level Traffic Inspection ("who is my phone talking to")
**From:** vega (Head of Security) · 2026-06-11 · for Jeff · **Status:** plan — needs Jeff's go + phone SSH up

## What Jeff wants
1. See, at the packet level, everything the Moto G talks to — catch anything spying.
2. Route phone traffic through an LLM that flags the suspicious stuff, then on to the phone.

## What we already have
- **mitmproxy is already running on the mini** (`mitmweb` 127.0.0.1:8081, null's `null_inspect_addon.py`) — it inspects MODEL traffic today, sanitized receipts, no payload logging. Same engine points at the phone.
- Local LLM (qwen on the mini) for the "flag suspicious" brain — $0.
- Reverse SSH tunnel Mac↔Moto G (when Termux sshd is up).

## The honest caveats (so we don't fool ourselves)
- **Certificate pinning:** big apps (Google, banking, etc.) pin certs — even with our CA installed we CANNOT read their encrypted *payloads*. BUT we still see **WHICH servers the phone connects to** (domain/SNI/DNS). For "is something phoning home / is an app spying," the *destination list* is 90% of the answer.
- The mini has Tailscale **ShieldsUp** (blocks phone→mini inbound), so the cleanest v1 runs the capture **on the phone itself**, not by proxying to the mini.

## Recommended design (v1 — runs on the phone, no ShieldsUp fight)
1. **mitmproxy in the phone's proot Ubuntu**, phone Wi-Fi proxy → `127.0.0.1:8080`, mitmproxy CA cert installed on the phone (user cert). Captures all the phone's own HTTP/S.
2. Addon writes a **sanitized connection log** (timestamp, destination domain, bytes, app if resolvable) — NOT payloads/credentials.
3. Sync that log to the mini over the existing SSH tunnel.
4. **Mini's qwen reads the domain list and flags**: known trackers/ad/analytics servers, unexpected foreign endpoints, anything an app shouldn't be calling. Output = a plain "here's who your phone talked to today, here's what looks off" report on the board.
5. Kill switch: remove the proxy setting + `pkill mitmproxy`; CA cert is a user cert you can delete anytime in Settings.

## What it will and won't tell you
- ✅ Every domain/server the phone reaches → catches spyware/trackers/unexpected callbacks.
- ✅ Apps making background connections you didn't expect.
- ❌ Won't decrypt pinned-app payloads (but the destination still shows).
- ❌ Not a substitute for a malware scan — pairs with one.

## Blocked on
- Phone Termux sshd up (watchdog shows it flapping) + Jeff's go to install the CA cert on the phone (a device-config change — Jeff approves per the per-action rule).
