# Second Brain VPS — plan + one-paste setup (2026-06-09)

**Problem:** the 16GB mini = ONE heavy brain at a time (local Qwen vs Grok cell compete; OOM history).
**Fix:** a second brain on a remote box, joined to the tailnet, serving an OpenAI-compatible endpoint 24/7. The mini's cells call it like they call `:8000` today.

## Options (researched, best→)
| Option | Cost | What you get | Speed (8B Q4) |
|---|---|---|---|
| **Oracle Cloud Always Free ARM A1** | **$0/mo forever** | 4 OCPU + 24GB RAM + 200GB disk | ~8–12 tok/s |
| **Hetzner CPX41** | ~€15/mo (~$16) | 8 vCPU EPYC + 16GB RAM | ~10–15 tok/s |
| GPU VPS (GPU Mart etc.) | $21–40/mo | entry GPU | faster but cramped |

**Verdict:** Try Oracle first ($0 — foraging win; 24GB > what the mini can spare). Hetzner CPX41 is the paid fallback at half the $40 budget. Skip cheap GPU rentals.

**Oracle gotchas:** "Out of host capacity" in busy regions — pick a quieter home region; upgrading to Pay-As-You-Go (card verify, ~$100 temp hold that drops) makes A1 provisioning reliable WITHOUT losing the free tier. Jeff does signup (human-only step).

## One-paste setup (Ubuntu ARM/x86, run as root after first SSH)
```bash
# 1. join the tailnet (auth interactively)
curl -fsSL https://tailscale.com/install.sh | sh && tailscale up
# 2. ollama + an 8B brain
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen3.5:8b
# 3. serve on the tailnet only (OpenAI-compatible at :11434/v1)
mkdir -p /etc/systemd/system/ollama.service.d
printf '[Service]\nEnvironment="OLLAMA_HOST=0.0.0.0:11434"\n' > /etc/systemd/system/ollama.service.d/tailnet.conf
systemctl daemon-reload && systemctl restart ollama
# 4. firewall: tailnet only
ufw allow in on tailscale0 to any port 11434 proto tcp; ufw deny 11434; ufw --force enable
```

## Wiring on the mini (I do this once it's up)
- Add `http://<vps-tailscale-ip>:11434/v1` as a fallback/primary provider in `~/.hermes/config.yaml`.
- Point `lm`/`digest` at it via `LM_API` env when the mini model is paused.
- Health plane: probe the VPS brain; prefer it when the mini is under memory pressure → **one-brain constraint dissolves**.

## Biology
This is **symbiosis** — an external organ on the same nervous system (tailnet). Metabolically: moves baseline cognition off the mini's scarce ATP (RAM) onto free/cheap external metabolism.
