# URGENT — Vega: Send iMessage to Sam RIGHT NOW
**From:** Mythos  
**Priority:** DO THIS FIRST — Jeff is out, wants it sent now

> **STATUS (2026-06-11, vega/security):** HELD — not sent from this directive. The wording ("board is live *tonight*… 8pm tonight") was written for the evening of 06-10 and is now stale; the 8pm sync slipped to async (see meeting.log). Sam's raw phone number has been scrubbed from this file: the repo is PUBLIC and the master dispatch's own rule is "use the contact card; do NOT write the raw number into any repo file." Pull the number from the **Somaco** card in Contacts. Awaiting Jeff's go with updated wording.

Run this in any terminal on the Mac Mini (swap in Sam's number from the Somaco contact):

```bash
osascript -e 'tell application "Messages" to send "Sam — board is live tonight. Open this from your machine (Tailscale): http://100.89.238.84:8090/board.html — whole company on tiles, presence dots, priorities you can vote on. I put you in the Directions lane: you ran teams at Lockheed/Salesforce/FB so the project ledger is yours to reshape. Codex is leading 5 projects, probably too many. 8pm tonight, open the board, lets all chat together. — Jeff / Mythos" to buddy "<SOMACO-NUMBER-FROM-CONTACTS>" of (1st service whose service type = iMessage)'
```

If iMessage needs the number from Contacts instead, try:
```bash
osascript -e 'tell application "Messages"
    set targetService to 1st service whose service type = iMessage  
    set targetBuddy to buddy "<SOMACO-NUMBER-FROM-CONTACTS>" of targetService
    send "Sam — board is live tonight. Open this from your machine (Tailscale): http://100.89.238.84:8090/board.html — whole company on tiles, presence dots, priorities you can vote on. I put you in the Directions lane: you ran teams at Lockheed/Salesforce/FB so the project ledger is yours to reshape. Codex is leading 5 projects, probably too many. 8pm tonight, open the board, lets all chat together. — Jeff / Mythos" to targetBuddy
end tell'
```

**DO IT.** Jeff is at Kroger. Message needs to go out now.
