# Mattermost / Durable Chaos Bridge Plan

**Date:** 2026-06-10  
**Status:** immediate bridge-native chat shipped; real Mattermost server next  
**Prepared by:** Codex / Keystone

## Sam Reply

Sam replied that he wants a machine-native chat with `@vega` and `@keystone`, not just texting. He said Slack, Discord, WhatsApp, or Telegram would work, and he liked the phrase:

```text
Durable chaos
```

## What Shipped Now

Agent Bridge now has a Mattermost-style team chat page:

```text
http://100.89.238.84:8787/team.html?fresh=20260610
```

Local path:

```text
/Users/rentamac/agent-comms/app/public/team.html
```

Launcher updated:

```text
/Users/rentamac/agent-comms/app/public/app.html
```

Channels:

- `team`
- `ops`
- `creative`
- `research`
- `dashboard`
- `approvals`
- `receipts`

Messages are stored in Agent Bridge `meeting.log` as:

```text
[channel] @target message
```

This is the immediate useful bridge room for Jeff, Sam, Vega, Keystone, and the cells.

## Mattermost Desktop

Mattermost Desktop was installed on the Mac:

```text
/Applications/Mattermost.app
```

Important: the desktop and mobile apps are clients. They need a Mattermost server URL before they are useful.

Official app page:

```text
https://mattermost.com/apps/
```

## Real Mattermost Server Options

Mattermost is a self-hosted Slack-style chat system. The official container deployment is the normal route, but the docs say Docker server deployment is officially supported on Linux.

Official docs:

```text
https://docs.mattermost.com/deployment-guide/server/deploy-containers.html
https://docs.mattermost.com/deployment-guide/server/containers/install-docker.html
https://github.com/mattermost/docker
```

### Option A: Linux VPS / Cloud Cell

Best serious path.

- rent or use a small Linux VPS;
- run official Mattermost Docker deployment;
- point a domain/subdomain at it;
- enable HTTPS;
- create team `Durable Chaos`;
- invite Jeff, Sam, Vega;
- create bot account `keystone`;
- create incoming/outgoing webhooks.

Pros:

- closest to official support;
- reachable by Sam without needing Jeff's Mac online;
- cleaner for mobile push and public/private access.

Cons:

- needs VPS/cloud setup;
- requires domain/HTTPS and admin hardening.

### Option B: Mac Mini Local Test With Docker/Colima

Good test path.

- install Docker or Colima;
- run the official Docker deployment locally;
- expose only over Tailscale;
- use it as a private prototype.

Pros:

- fast local experiment;
- private over Tailscale;
- no new public server yet.

Cons:

- Docker was not installed during the audit;
- official Docker server support is Linux-first;
- Mac sleep/network issues can interrupt it.

### Option C: Stay On Agent Bridge Team Chat For Now

Best immediate path.

- use `team.html`;
- keep Agent Bridge as source of truth;
- defer Mattermost server until we know Sam's access path.

Pros:

- already shipped;
- no accounts;
- no secrets;
- no billing;
- same approval gates.

Cons:

- not a full Slack/Mattermost replacement;
- no native mobile push;
- Tailscale/Funnel access must be solved for Sam.

## Bridge Design Once Mattermost Server Exists

```text
Agent Bridge meeting.log
  -> Mattermost incoming webhook
  -> channel messages

Mattermost bot / outgoing webhook
  -> Agent Bridge /api/say
  -> meeting.log and agent lanes
```

Channel map:

| Mattermost channel | Agent Bridge tag | Use |
|---|---|---|
| `town-square` | `[team]` | general Jeff/Sam/Vega/Keystone room |
| `ops` | `[ops]` | infra, server, Tailscale, compute |
| `creative` | `[creative]` | Vega, Mythos, movie, clips |
| `research` | `[research]` | Morpho, Researcher, science |
| `dashboard` | `[dashboard]` | app, living dashboard, UI |
| `approvals` | `[approvals]` | human gates |
| `receipts` | `[receipts]` | commits, files, links |

## Safety Rules

- No secrets in Mattermost or Agent Bridge chat history.
- No account/billing/public posting/financial actions from chat without approval receipts.
- Agent Bridge remains source of truth until Mattermost is proven reliable.
- Bot tokens live in local secrets files only, not docs or chat.

## Next Step

Use `team.html` with Sam now. Then pick one server path:

1. Linux VPS Mattermost for real use, or
2. local Mac Docker/Colima Mattermost for private prototype.

