# Hermes Desktop Cell Plan

**Status:** planning note
**Date:** 2026-06-09
**Scope:** Make Hermes Desktop / Hermes Gateway part of the Grok Go living dashboard without turning it into an unsafe all-powerful control plane.

## Core Idea

Hermes can be a major Grok Go cell, but it should not be treated as one shapeless pile of agents. The safe model is:

```text
Hermes Desktop / Gateway Cell
  -> profiles
  -> sessions
  -> tools
  -> messaging targets
  -> dashboard panels
```

Each visible dashboard feature that Hermes powers should still have a named owner, inputs, outputs, and gates. Hermes becomes the desktop body/shell that can host or route many specialized cells.

## Current Observed State

As of the local audit on 2026-06-09:

- Hermes Null gateway is running.
- Telegram and Discord targets are configured.
- One default Hermes profile is active under `~/.hermes-null`.
- Hermes Desktop GUI was not observed as an open app process during the audit.
- The active Hermes lane is therefore gateway/profile/session infrastructure, not yet a custom desktop dashboard shell.

## How Many Agents Can Live There?

Architecturally, many. Practically, each agent needs one of these forms:

1. A Hermes profile with its own model/tool/memory settings.
2. A Hermes session with a clear role and title.
3. A browser/desktop bridge cell that reports through Hermes or Agent Bridge.
4. A local script cell that uses Hermes `send`, `gateway`, or session APIs.

The limiting factors are not "number of agents" as an abstract count. The limits are:

- available model/provider credentials;
- context and token budget;
- launchd/process reliability;
- memory boundaries;
- human approval throughput;
- dashboard clarity.

The dashboard should display agent capacity as lanes/cells, not as a raw count.

## Recommended Role Split

### Hermes Desktop Cell

Owns the local desktop/gateway shell:

- profile/session list;
- configured messaging targets;
- active gateway state;
- dashboard links;
- safe send targets;
- connector/account status without exposing secrets.

### Agent Cells Hosted Or Routed By Hermes

Examples:

- Null coordination cell;
- Researcher digest cell;
- Visuals lead cell;
- Tech lead cell;
- Free Endpoint Forager cell;
- Approval cell;
- Chat Harvester cell;
- Browser Broadcast cell.

Hermes may provide the body, but each cell still has its own job.

## Browser/Tampermonkey Cells

Tampermonkey scripts are strong candidates for "surface cells" because they live inside the web apps where the work happens.

Possible cells:

- Chat Export Cell: export current Grok/Gemini/ChatGPT chat to markdown.
- Chat Harvester Cell: walk a chat list, export each chat, and record URL/title/file status.
- Browser Broadcast Cell: insert the same question into multiple selected Grok/Gemini/ChatGPT tabs, collect replies, and compare them.
- Files/Attachments Cell: detect per-chat downloads/attachments and save a manifest so every chat's files remain linked to the right conversation.
- Visual Prompt Cell: generate and refine prompts for images/video/visual fights, with all public outputs approval-gated.

These should start as manual or semi-automatic tools. Full auto-walking across accounts/chats should require explicit scope, rate limits, and a dry-run mode.

## Golden Pointer / Marked Tab

The current known scripts do not intentionally create a golden cursor/pointer. The known pieces are:

- `AgentBridge-Grok-Relay.user.js`: manual Agent Bridge overlay for Grok/X.
- `grokgo-chat-export.user.js`: green export button for Grok/ChatGPT/Gemini.
- `grok_chrome_bridge.js`: AppleScript/DOM bridge that types `@grok` room messages into the logged-in Grok tab and captures replies.

If a Grok tab appears gold, treat that as a useful marker, but do not assume it is a controlled automation feature until the exact source is identified.

## Next Build Steps

1. Add Hermes Desktop/Gateway as a first-class dashboard panel.
2. Add panel entries for Chat Harvester, Browser Broadcast, Visuals Lead, Tech Lead, and Free Endpoint Forager.
3. Turn the current export userscript into a real manifest-writing exporter:
   - chat URL;
   - title;
   - timestamp;
   - downloaded markdown path;
   - detected attachments/files;
   - account/lane if known.
4. Add a dry-run chat-list walker for Grok:
   - read visible chat links;
   - do not click yet;
   - output a proposed crawl plan.
5. Add a scoped manual run mode:
   - click one chat;
   - export markdown;
   - detect/download visible files;
   - return to list;
   - repeat only for approved count/range.
6. Keep all external posting, account changes, billing, and public publishing behind Jeff approval.

## Safety Rule

The desktop dashboard should make agents easier to supervise, not harder. If a cell cannot explain what it is doing, where its files went, and what it is allowed to touch, it is not ready to run automatically.
