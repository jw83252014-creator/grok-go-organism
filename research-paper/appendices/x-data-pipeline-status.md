# X Data Pipeline Status - 2026-06-03

Owner: Keystone
Mode: read-only

## What We Found

### Local X Archive

Existing archive:

`/Users/rentamac/Downloads/twitter-2026-05-19-cb2a79182d2f32780613c4b6ccc6e4efa612ae6ebba97620c037c4f2f7d529fe`

Mirror/import copy:

`/Users/rentamac/Documents/Jwnull/_grok-import/twitter-2026-05-19-cb2a79182d2f32780613c4b6ccc6e4efa612ae6ebba97620c037c4f2f7d529fe`

Parsed baseline:

`/Users/rentamac/agent-comms/research/x-context/archive-ingest/2026-06-03T220728578Z-x-archive-summary.md`

Counts:

- tweets: 215
- deleted tweets: 2
- likes: 1192
- followers: 125
- following: 1084
- latest archived tweet: 2026-05-19T02:30:32Z

Use this for historical baseline, old likes/follow graph, and account history. It does not include the June 2026 Grok Go spread.

### Live Logged-In X Notifications

Chrome currently has logged-in X notification tabs:

`https://x.com/notifications`

Read-only DOM snapshot works from an interactive session using Chrome Apple Events. It captured visible notification cells without clicking or changing the account.

Latest snapshot:

`/Users/rentamac/agent-comms/research/x-context/live-notifications/20260603T220728Z-x-notifications-visible.md`

Captured signals include:

- Mathelirium, Asym, Leto, and ankita followed
- Indu Tripathi followed
- Lilith Datura liked and replied multiple times
- Teknium liked replies
- Wiz liked/replied
- Leto liked 2 posts
- Grok replied on several May 30 threads
- Links/status IDs were captured for visible replies where X exposed them in the DOM

### Librarian X Search

Librarian can run xAI/X search and found 6 visible posts for June 2-3:

`/Users/rentamac/agent-comms/research/x-context/2026-06-03-jeff-x-context-librarian.md`

Limitation: x_search does not expose private notifications, full follower list, or all who-liked data.

### Frankenstein / Moto

Frankenstein/Moto is not currently reachable:

- Mac keepawake LaunchAgent is running
- Termux SSH at `100.107.96.107:8022` timed out

Do not build the first watcher on Frankenstein until Termux SSH is restored.

## Tools Added

Archive parser:

`/Users/rentamac/agent-comms/bin/x-archive-ingest`

Visible notification snapshot:

`/Users/rentamac/agent-comms/bin/x-notifications-snapshot`

Deduping poller:

`/Users/rentamac/agent-comms/bin/x-notifications-poll`

The poller initializes quietly on first run, then reports only newly seen visible notifications to Agent Bridge.

Interactive watch loop:

`/Users/rentamac/agent-comms/bin/x-notifications-watch-loop`

Stop script:

`/Users/rentamac/agent-comms/bin/x-notifications-watch-stop`

Status: the loop works while attached to an interactive execution context, but detached shell launch did not persist reliably in the Codex tool environment. Use the one-shot poller for now unless a human keeps a terminal session open for the loop.

## Background Watcher Finding

A LaunchAgent template was created here:

`/Users/rentamac/Library/LaunchAgents/com.rentamac.x-notifications-watcher.plist`

It is currently disabled.

Reason: launchd background execution hung on the Chrome AppleScript call. Manual/interactive execution works, but macOS Automation/TCC does not currently allow that same Apple Event flow cleanly from launchd.

Do not enable this LaunchAgent until the carrier is changed or macOS automation permissions are handled.

Additional carrier test: starting the loop through `nohup` from Codex wrote one successful poll while attached, but a detached `nohup` launch exited before polling. This confirms the data path is good and the remaining issue is process carrier / macOS automation context, not X parsing.

Follow-up after reapproval attempt: repeated AppleScript/Chrome carrier tests can leave Chrome Apple Events temporarily hanging, even for a manual poll. The stuck X poll was terminated without killing the separate Grok bridge AppleScript process. Treat AppleScript as a useful one-shot extraction path, not the durable watcher carrier.

## Recommended Architecture

### Phase 1 - Current Best Path

Use the Mac mini logged-in Chrome tab as the live source, but trigger snapshots from an interactive/agent context that already has permission.

Run:

`/Users/rentamac/agent-comms/bin/x-notifications-poll`

This gives current notifications and new follows without public actions.

### Phase 2 - Background-Safe Watcher

Best options:

1. Chrome extension/content script that reads the notifications page and POSTs read-only JSON to Agent Bridge. This is now the recommended next build.
2. Dedicated Chrome/Chromium profile launched with Chrome DevTools Protocol enabled, then logged into X once.
3. Android notification listener on the Moto G after Frankenstein/Termux SSH is restored.

### Chrome Extension Status

Implemented locally:

`/Users/rentamac/agent-comms/tools/x-notification-capture-extension`

Agent Bridge endpoint:

`POST http://127.0.0.1:8787/api/x/notifications`

Endpoint status: smoke-tested successfully after restarting `com.agentbridge.web`.

Output directory:

`/Users/rentamac/agent-comms/research/x-context/live-notifications/extension`

The extension is read-only. It only runs on `https://x.com/notifications*`, extracts visible notification cells, and posts JSON to the local Agent Bridge endpoint. It does not click, like, follow, reply, post, DM, or change X state.

Manual step still needed: load the unpacked extension in Chrome from `chrome://extensions`. Once loaded, refresh `https://x.com/notifications`, then run `/Users/rentamac/agent-comms/bin/x-build-ledger` to fold captures into the graph.

Avoid as first choice:

- Carbonyl: would require another login and is weaker than the already logged-in Chrome tab.
- SwiftUI WKWebView: possible, but it creates another browser/login surface and adds app complexity.
- mitmproxy API capture: powerful but brittle and should be deliberate because it relies on private X web API traffic.

## Data Products To Build

1. `x-engagement-ledger.jsonl`
   - One row per notification/post/follow/reply/like.
2. `x-relationship-graph.json`
   - Accounts, edges, weights, first seen, last seen, signal type.
3. `x-daily-context.md`
   - Daily summary for Jeff, Librarian, Researcher, and Grok.
4. `research-paper-outreach-map.md`
   - Accounts to watch/contact: Michael Levin network, Stephen Wolfram signal, Teknium/Hermes/Noul/Grok ecosystem, systems/cybernetics accounts.

## Immediate Next Step

Keep collecting live notification snapshots and parse them into a ledger. Once the fresh X archive arrives, merge it with:

- old archive baseline
- live notification snapshots
- Librarian x_search results
- Grok/Gemini research-paper context

Then let Researcher build the connection map and outreach strategy.
