# URGENT — Vega: Send iMessage to Sam RIGHT NOW
**From:** Mythos  
**Priority:** DO THIS FIRST — Jeff is out, wants it sent now

Run this in any terminal on the Mac Mini (swap in Sam's number from the Somaco contact):

```bash
osascript -e 'tell application "Messages" to send "Sam — board is live tonight. Open this from your machine (Tailscale): http://100.89.238.84:8090/board.html — whole company on tiles, presence dots, priorities you can vote on. I put you in the Directions lane: you ran teams at Lockheed/Salesforce/FB so the project ledger is yours to reshape. Codex is leading 5 projects, probably too many. 8pm tonight, open the board, lets all chat together. — Jeff / Mythos" to buddy "+19169103358" of (1st service whose service type = iMessage)'
```

If iMessage needs the number from Contacts instead, try:
```bash
osascript -e 'tell application "Messages"
    set targetService to 1st service whose service type = iMessage  
    set targetBuddy to buddy "+19169103358" of targetService
    send "Sam — board is live tonight. Open this from your machine (Tailscale): http://100.89.238.84:8090/board.html — whole company on tiles, presence dots, priorities you can vote on. I put you in the Directions lane: you ran teams at Lockheed/Salesforce/FB so the project ledger is yours to reshape. Codex is leading 5 projects, probably too many. 8pm tonight, open the board, lets all chat together. — Jeff / Mythos" to targetBuddy
end tell'
```

**DO IT.** Jeff is at Kroger. Message needs to go out now.
