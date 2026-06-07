# X Activity Monitor — Grok Go cell plan (reality-checked, money-aware)

*Built 2026-06-07 by vega (Claude Code) after verifying the pasted "X Activity API (XAA)" doc against live X API pricing. For the team (Claude Desktop, Grok Go cells, Codex, Sam).*

## TL;DR verdict
The pasted XAA capability is **real** (X's Account Activity API → real-time events via webhooks). **But real-time push streaming is enterprise-only (~$42,000/month).** Since **Feb 6 2026, new accounts get pay-per-use ONLY — no free tier, no Basic/Pro signup.** So the firehose framing in that doc is not viable for us. The smart path = **poll OWNED reads at $0.001 each** for the Grok Go account's own activity. ~90% of the value at trivial cost.

## What's actually real (verified June 2026)
- **Account Activity API** (docs.x.com/x-api/account-activity): real-time posts/DMs/likes/follows via **webhooks** (needs a public HTTPS server + CRC validation). Managed/enterprise ≈ **$42k/mo**. ❌ Not for us.
- **New-dev pricing (pay-per-use, since Feb 6 2026):**
  - **Owned reads** (your own posts / followers / profile): **$0.001 each** (since Apr 20 2026) ✅ cheap
  - General post read: $0.005 · user lookup: $0.010
  - Post create: **$0.015** (text/no URL) · **$0.20** (post WITH a URL) ⚠️ links are the money trap
  - Cap: 2M reads/month.
- Legacy **Basic $200/mo** & **Pro $5k/mo**: existing subscribers only (can't newly sign up). Enterprise ~$42k/mo.
- 🔎 Note: X added an **xAI credit tie-in** to API pricing — worth checking whether Jeff's xAI/Grok spend interacts with X API credits in the portal.

## What the $5 on the X account actually buys
- **~5,000 owned-read polls** ($0.001) → plenty to monitor the Grok Go account's own posts/followers/engagement.
- OR ~333 plain posts ($0.015) / only **25 link-posts** ($0.20 — avoid; put links in a reply, not the post).
- **Best split:** cheap owned-activity polling + a handful of launch posts. Don't burn it on link-posts or firehose reads.

## The cell: "X Activity Monitor" (polling, not webhooks)
A lightweight cell that POLLS owned data instead of paying $42k for push:
- **Reads (owned, $0.001 each):**
  - `GET /2/users/:id/tweets?tweet.fields=public_metrics` — recent posts + engagement
  - `GET /2/users/:id/followers` (or `/following`) — follower count / new followers
  - `GET /2/tweets/:id?tweet.fields=public_metrics` — engagement on a specific post
- **Loop (every 15–30 min while the account is active):**
  1. Poll recent posts + follower count + engagement deltas.
  2. Log to the organism (x-activity log + Mining Engine receipts).
  3. On a notable change (engagement spike, follower milestone, a post going viral) → trigger an **Emergence Report** and nudge the posting-strategy cell.
- **Auth:** OAuth 2.0 user-context — **Jeff's action** (consent + key); never me.
- **Cost guards:** bounded poll interval + a daily $ cap; owned-reads only by default; kill-switch file.

## "X Radar" for OTHER accounts (Marc Andreessen, AI-GitHub trends)
- Paid general reads ($0.005) — use sparingly, OR
- **Free path:** the **x-scraper skill** (browser-based scraping on the ThinkPad) — no API cost, not real-time, fine for a daily radar sweep.

## Jeff's-action (I can't/won't do these)
- Create the Grok Go X account (account creation).
- Generate the X API key + complete OAuth consent (credentials).
- Set/confirm the spend cap; top up beyond $5.
- → Once the key exists (drop it in env, I never echo it), I'll build the cell + cost guards.

## Endpoints / references
- Console (pay-per-use): developer.x.com
- Account Activity API: docs.x.com/x-api/account-activity
- v2 REST: `/2/users/:id/tweets`, `/2/users/:id/followers`, `/2/tweets/:id`
