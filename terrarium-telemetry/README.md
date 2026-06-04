# Grok Go Terrarium Telemetry

This is the local read-only telemetry bridge for the terrarium website.

It tails:

- `~/.grok/logs/unified.jsonl`
- `~/mining-engine/.git/logs/HEAD`

Then it broadcasts display events over:

```text
ws://127.0.0.1:8799/ws/terrarium
```

## Local Run

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn terrarium_server:app --host 127.0.0.1 --port 8799
```

Health check:

```text
http://127.0.0.1:8799/health
```

## Safety Boundary

This server is read-only. It does not type into terminals, edit files, post to X, send email, move money, or expose shell access.

If tunneled publicly, expose only this telemetry server and keep control surfaces private.
