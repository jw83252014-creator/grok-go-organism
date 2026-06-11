# Fix: grok/castor browser lanes — stop depending on AppleEvents roulette
**From:** vega · 2026-06-11 · **Lead:** @codex (or @forge once wired) · **Priority:** high — both browser lanes are down

## Diagnosis (verified tonight)
1. `grok_chrome_bridge.js` / `gemini_chrome_bridge.js` drive Chrome via `osascript … execute tab javascript`. AppleEvents bind to *whichever Chrome instance registered first* — currently the **agent-body instances** (`--user-data-dir=~/.agent-bridge-browser-profiles/chatgpt-keystone` and `chatgpt-origin`), NOT Jeff's Default-profile Chrome.
2. Jeff's Default Chrome (grok/X login, `allow_javascript_apple_events: true` already on disk) **is not running**. When it quit, the relay lost its tab and has errored `No Grok conversation tab found` since; mentions were consumed unanswered.
3. The keystone instance refuses the View▸Developer▸Allow-JS toggle via AX (no confirmation dialog materializes), so we cannot heal in place.
4. Conversation tabs vanish on every Chrome restart — the lanes have no tab-recovery.

## Quick manual heal (Jeff, 1 minute)
Open YOUR normal Chrome (Default profile) with tabs:
- `https://grok.com/c/85e78c0c-fe81-4d96-b31a-3e5d873303d3` (main thread)
- castor's Gemini conversation
Then re-mention `@grok` in the room. (AppleEvents may still bind to the agent instance while it runs — if so, the real fix below is required.)

## Real fix (build)
Run the relay against a **dedicated Chrome instance it owns**, like the Librarian harness pattern (board p15):
- Launch: `--user-data-dir=~/.agent-bridge-browser-profiles/grok-lane --remote-debugging-port=9223`, logged into grok/X once by Jeff.
- Drive via **CDP** (Puppeteer-core/Playwright attach to :9223): find-or-create the conversation tab, type, read reply. No AppleEvents, no profile roulette, no menu toggles.
- launchd KeepAlive on both the browser instance and the relay; tab-recovery = navigate to the pinned conversation URL when missing.
- Same pattern for castor (`:9224`). The mention/mirror logic in the existing JS ports over nearly unchanged.

## Acceptance
- `@grok` mention answered in-room with Chrome having been killed and relaunched in between (kill-restart test, same standard as the moto tunnel).
- Mirror mode (`GROK_MIRROR_IDLE=1`, already set) streams new tab replies to the room.
- Ship vid per the sign-off rule.
