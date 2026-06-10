# Pocket App, Mattermost, And Public X Roadmap

Date: 2026-06-10
Status: first launcher shipped; Mattermost and X departments are planning lanes

## Pocket App Now

The immediate app is the Agent Bridge Pocket launcher:

`http://100.89.238.84:8787/app.html?fresh=20260610`

It links to:

- Easy List
- Command Center
- Posts
- Grok Live
- Done
- Accounts
- Topics
- Room

This is the lightweight mobile surface while the living dashboard is still forming.

## App Path

Short term:

- iPhone: Safari -> Add to Home Screen.
- Moto G: Chrome -> Install app or Add to Home screen.
- Blink Shell / Termius: keep URLs and SSH repair commands as the terminal control path.

Next technical step:

- Add HTTPS through Tailscale cert, reverse proxy, or a real domain.
- Then choose Android wrapper:
  - Trusted Web Activity for simplest Android package.
  - Capacitor if we need native hooks later.

## Mattermost Later

Mattermost is the likely private "real team chat" layer.

Use it as a mirror/control room for Agent Bridge, not as a replacement for approval gates.

Proposed channels:

- `approvals`
- `research`
- `creative`
- `dashboard`
- `ops`
- `receipts`

Bridge shape:

```text
Agent Bridge -> Mattermost incoming webhook
Mattermost outgoing webhook / bot -> Agent Bridge API
```

Rules:

- No secrets in Mattermost.
- No public actions from chat without approval receipts.
- Agent Bridge remains the source of truth until Mattermost is fully trusted.

## Public X Departments

The safe version of "X as public Slack" is a set of clearly branded project/team feeds.

Possible feeds:

- Grok Go Lab: main experiment updates.
- Creative Department: clips, visual prompts, memes, making-of.
- Science / Research Team: Morpho, Researcher Layer, TAME, source notes.
- Dashboard Team: app screenshots, alive dashboard progress.
- Build / Infra Team: compute mesh, local models, free tiers, receipts.

Agents can:

- research people and topics in their field;
- draft posts, replies, bios, and collaborator asks;
- prepare follow/repost recommendations;
- save everything to the Posts board.

Humans must approve:

- posting;
- replies;
- follows;
- reposts;
- likes;
- DMs;
- account creation;
- any use of phone/SMS/Twilio or paid services.

Hard rules:

- No fake-human accounts.
- No automated engagement loops.
- No mass follows or mass replies.
- No Twilio/phone workarounds to create accounts at scale.
- Every public account should clearly be a project/team feed assisted by AI tools.

## First Public X Experiment

Start with one main account and one department account before adding more:

1. Main: Grok Go Lab.
2. Department: Creative Department or Science Team.

Each account needs:

- bio;
- pinned intro post;
- source policy;
- approval owner;
- first 10 draft posts;
- receipt folder.

No auto-posting until Jeff explicitly approves the exact text and account.
