# X Context Ingestion

The best way to give another agent complete X context is not screenshots or manual paste. Use the most complete source available.

## Best Options

1. X data export
   - Most complete for your own posts/replies.
   - Download from X account settings.
   - Feed the archive to a local summarizer or agent.

2. Manual report from logged-in Grok/Hermes/Chrome agent
   - Good for recent threads and social context.
   - Less complete than export.
   - Useful when the browser agent can see likes/replies/context.

3. Copy/paste selected threads
   - Fastest for a small number of posts.
   - Best when you want exact narrative control.

4. Official API
   - Best for repeatable automation.
   - May require paid access and app setup.

## Current Local Pipeline

The live Agent Bridge pipeline now has four pieces:

1. Historical archive parser:
   - `agent-comms/bin/x-archive-ingest`
   - Uses the downloaded X archive that currently stops at May 19, 2026.

2. Visible notification snapshots:
   - AppleScript snapshot path exists, but is not reliable enough as a background watcher.
   - Treat it as a one-shot extraction fallback only.

3. Relationship ledger and graph:
   - `agent-comms/bin/x-build-ledger`
   - Produces `x-engagement-ledger.jsonl` and `x-relationship-graph.json`.

4. Chrome extension capture:
   - `agent-comms/tools/x-notification-capture-extension`
   - Posts visible notification cells to Agent Bridge `POST /api/x/notifications`.
   - Requires a one-time manual Chrome step: load unpacked extension from `chrome://extensions`.

Important precision: this does not yet mean every recent X data point has been captured. It means we have old official archive data plus visible current notification data, and a path to keep collecting visible notifications after the extension is loaded.

## Recommended Report Format

Ask the browser/X agent to produce:

```md
# X Context Report

## Summary

## Important Threads

## Notable Replies From Others

## Likes / Signals From High-Signal People

## Ideas Worth Preserving

## Questions Asked Publicly

## Prompts / Images Posted

## Links

## Recommended Next Posts
```

## Caution

Browser collection can miss replies, hide rate-limited content, or summarize inaccurately. For durable research, save links and raw text wherever possible.
