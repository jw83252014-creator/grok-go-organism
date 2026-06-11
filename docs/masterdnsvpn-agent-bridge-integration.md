# MasterDnsVPN — Agent Bridge Integration Plan
**Source:** Grok analysis (captured from session 2026-06-10)  
**Owner:** Vega (implements on Mini) + Mythos (spec)  
**Status:** RESEARCH → BUILD — pending Jeff go/no-go on VPS spend (~$3-5/mo)

---

## TLDR

Everything in the agent bridge rides through DNS port 53 (almost never blocked anywhere). Self-hosted. AES-256-GCM encrypted. Packet-duplicated across 12 resolvers for reliability. SOCKS5 proxy at `127.0.0.1:18000`. Complements Tailscale — Tailscale for clean networks, DNS tunnel for hotel/airport/fencing-job connections.

**Why we need this:** Jeff works fencing jobs. Hotel/corporate/airport Wi-Fi kills VPN traffic regularly. Agents need to stay connected to the Mac Mini brain even when the network is hostile. Port 53 UDP cannot be blocked without breaking the entire internet for everyone on the network.

---

## Architecture fit

```
CURRENT:
iPhone / iPad → Tailscale → Mac Mini (Agent Bridge :8787)
Moto G (Frankenstein) → Tailscale → Mac Mini
Sam (SoMaCoSF) → Tailscale → Agent Bridge

AFTER:
All of the above, PLUS:
Any network anywhere → DNS tunnel (port 53) → VPS → Mac Mini
                     (hotel, airport, job site, corporate firewall)

Tailscale = fast lane (low latency, clean networks)
DNS tunnel = resilience lane (hostile networks, fallback)
Both run simultaneously = maximum uptime
```

---

## Server setup (one-time, on a $3-5/mo VPS)

**Prerequisites:**
- A domain you control (e.g. existing domain for Champion Fencing LLC)
- A cheap VPS (Hetzner, Vultr, Contabo — Jeff picks)
- Create DNS NS record: `v.yourdomain.com` → VPS IP

```bash
# On the VPS:
bash <(curl -Ls https://raw.githubusercontent.com/masterking32/MasterDnsVPN/main/server_linux_install.sh)

# Opens UDP 53:
sudo ufw allow 53/udp

# Copy encrypt_key.txt somewhere safe (1Password)
```

**Docker version (recommended — survives reboots):**
```yaml
# docker-compose.yml on VPS
version: '3'
services:
  masterdns:
    image: masterking32/masterdnsvpn-server:latest
    restart: unless-stopped
    ports:
      - "53:53/udp"
    volumes:
      - ./config:/config
```

---

## Client setup (on every node)

Nodes that need it:
| Node | Platform | Why |
|------|---------|-----|
| Mac Mini | macOS ARM64 | outbound resilience on bad networks |
| Moto G (Frankenstein) | Android ARM64 | Termux agent, always-on |
| iPad / iPhone | iOS | Jeff's on-the-go access |
| Future VPS nodes | Linux AMD64 | second-brain / Cyprus remote |

```toml
# client_config.toml
DOMAINS = ["v.yourdomain.com"]
ENCRYPTION_KEY = "paste-from-server-encrypt_key.txt"
DATA_ENCRYPTION_METHOD = 5          # AES-256-GCM
LISTEN_IP = "127.0.0.1"
LISTEN_PORT = 18000                 # SOCKS5 proxy
PACKET_DUPLICATION_COUNT = 2        # send each packet 2 paths minimum
```

```
# client_resolvers.txt (one per line)
1.1.1.1
8.8.8.8
9.9.9.9
208.67.222.222
```

```bash
# Run client
./masterdnsvpn-client -config client_config.toml

# Test it
curl -x socks5://127.0.0.1:18000 https://ifconfig.me
```

**Mac Mini persistent service (launchd):**
```xml
<!-- ~/Library/LaunchAgents/com.grokgo.masterdns.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>com.grokgo.masterdns</string>
  <key>ProgramArguments</key>
  <array>
    <string>/Users/rentamac/bin/masterdnsvpn-client</string>
    <string>-config</string>
    <string>/Users/rentamac/.masterdns/client_config.toml</string>
  </array>
  <key>KeepAlive</key><true/>
  <key>RunAtLoad</key><true/>
  <key>StandardOutPath</key><string>/tmp/masterdns.log</string>
  <key>StandardErrorPath</key><string>/tmp/masterdns.err</string>
</dict>
</plist>
```
```bash
launchctl load ~/Library/LaunchAgents/com.grokgo.masterdns.plist
```

---

## Wiring into agent code (Python — most of our agents)

```python
import httpx

# DNS tunnel proxy — use when Tailscale is down or on hostile network
DNS_PROXY = "socks5://127.0.0.1:18000"

async def resilient_client(use_tunnel: bool = False):
    """Returns an httpx client — direct or through DNS tunnel."""
    proxies = {"http://": DNS_PROXY, "https://": DNS_PROXY} if use_tunnel else {}
    return httpx.AsyncClient(proxies=proxies, timeout=90.0)

# Agent Bridge calls through tunnel:
async with resilient_client(use_tunnel=True) as client:
    await client.post("http://127.0.0.1:8787/api/say", json={"text": "..."})
```

**For Frankenstein (Moto G Termux):**
```bash
# After installing ARM64 binary in Termux:
pkg install proxychains-ng
# Add to /data/data/com.termux/files/usr/etc/proxychains.conf:
# socks5 127.0.0.1 18000
proxychains4 python frankenstein_loop.py
```

---

## Integration with Tailscale (the smart failover)

```python
import asyncio, httpx

TAILSCALE_BRIDGE = "http://100.89.238.84:8787"
LOCAL_BRIDGE = "http://127.0.0.1:8787"
DNS_PROXY = "socks5://127.0.0.1:18000"

async def bridge_say(text: str):
    """Try direct → try Tailscale → fallback to DNS tunnel."""
    for url, proxy in [
        (LOCAL_BRIDGE, None),
        (TAILSCALE_BRIDGE, None),
        (LOCAL_BRIDGE, DNS_PROXY),
    ]:
        try:
            proxies = {"http://": proxy, "https://": proxy} if proxy else {}
            async with httpx.AsyncClient(proxies=proxies, timeout=10) as c:
                await c.post(f"{url}/api/say", json={"from": "agent", "text": text})
            return  # success
        except Exception:
            continue
```

---

## Kill switch

```bash
launchctl unload ~/Library/LaunchAgents/com.grokgo.masterdns.plist
# or:
pkill masterdnsvpn-client
```

Kill switch documented in `compute-mesh/nodes.json` per persistence rules.

---

## What this unlocks for the organism

| Scenario | Before | After |
|----------|--------|-------|
| Jeff on a fencing job, hotel WiFi | Agents unreachable | Full agent bridge access via DNS |
| ISP blocking "unusual" traffic | Loop stalls | Invisible in DNS queries |
| Frankenstein phone on mobile data | Intermittent | ARQ + packet duplication = reliable |
| Future Cyprus Mac Mini node | VPN may be blocked | DNS always works |
| Sam coordinating from anywhere | Tailscale only | DNS fallback always available |

---

## Approval gate

- [ ] Jeff approves VPS spend (~$3-5/mo — pick a provider)
- [ ] Jeff picks a domain/subdomain to use for the tunnel
- [ ] Encryption key stored in 1Password (never in repo)
- [ ] Vega builds it on the Mini
- [ ] Test: fencing job or hotspot → confirm bridge stays up
