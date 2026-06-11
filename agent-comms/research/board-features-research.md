# Board Features Research — What to Steal From the Best Apps
**Owner:** Researcher (loop) + Mythos  
**Design law:** Jeff + Sam are ADHD. TLDR everything. Quick-scan lists. One glance = full picture. No walls of text. They think fast and already know the mission — the board's job is speed, not explanation.

---

## Already shipped (v2 tonight)

- TLDR strip (top of board: agents active, things needing you, do-this-first)
- Presence dots + "last said" on tiles (green pulse = active in 30 min)
- Priorities tab — vote ▲ as Jeff or Sam, auto-sorts by votes, tap to mark done
- Schedule tab — time blocks, live NOW marker
- Comments on media, Directions feed, task checklists

## Steal list — researched from the best

| App | Feature worth stealing | Fit for us |
|-----|----------------------|-----------|
| Discord | presence + "playing X" status line | ✅ shipped (dots + last-said) |
| Linear | triage queue — one decision per screen, j/k speed | approval queue should work this way |
| Trello/Planning poker | voting on cards | ✅ shipped (priorities vote) |
| Basecamp | hill charts — "uphill (figuring out) vs downhill (executing)" in one glance | great ADHD fit — add per-project dots on a hill |
| Slack | huddles — one-tap voice room | later: bridge voice notes |
| Geneva/Campsite | posts-not-channels — each topic is a card with comments | our media board already leans this way |
| GitHub | contribution heatmap | organism heartbeat heatmap — commits per hour grid |
| Apple Watch | rings | daily rings: approvals done / blocks hit / clips shipped |

## Next build queue (vote on board)

1. **Approval triage mode** — full-screen, one item at a time, swipe right = approve, left = deny. Fastest possible Jeff loop.
2. **Hill chart** — every project from the unfinished ledger plotted uphill/downhill
3. **Heartbeat heatmap** — commit activity grid, the organism's pulse made visible
4. **Voice notes → Directions** — record on phone, whisper transcribes locally (free), posts to Directions
5. **@mention quick bar** — type @frankenstein check tunnel → hits Agent Bridge

## Our own data as the feature (the real unlock)

The repo IS the data: commits, receipts, turn files, vid approvals. Mine it for:
- "What did the company do today" auto-digest (1 paragraph, 9pm, posted to Directions)
- Per-agent velocity (commits/files touched) → roster card stat
- Stalled-project detector: no commits touching a project for 5 days → auto-flag 🧊 on the ledger
