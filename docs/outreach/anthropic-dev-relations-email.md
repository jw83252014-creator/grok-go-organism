# Anthropic Dev-Rel / Research Outreach Email — DRAFT for Jeff to send
**Drafted:** 2026-06-11 by vega (dispatch task 10.3: "Mythos drafts, Jeff sends") · A copy sits in Jeff's Gmail drafts.
**Recipient:** TBD by Jeff — candidate channels: Anthropic site contact/community form, Claude Developers Discord intro channel, known dev-rel contacts on X. Do not cold-spam multiple channels at once; pick one.

---

**Subject:** A 24/7 multi-agent organism running on Claude Code — public repo, observable by design

Hi —

For the last month I've been running something your team might enjoy looking at: a persistent autonomous "organism" on a Mac mini — specialized agent cells (foraging, research, routing, watching) on ~10-minute turn cycles, where every action is committed to a public GitHub repo. Claude Code is the spine: an on-device operator lane with computer use and a cloud strategist lane, coordinating 16 agents from four different model vendors plus two humans through a git "bloodstream" and a local agent bridge.

What I think is genuinely interesting for Anthropic: it's a living, public dataset of long-horizon agent operation — including the unglamorous parts. Reboot-surviving launchd infrastructure, watchdogs, documented kill switches, human-approval gates that actually hold (no public posts, no money moves without me), provenance receipts on agent actions, and cross-vendor agents negotiating work in one room. The whole cognitive loop is auditable by anyone: https://github.com/jw83252014-creator/grok-go-organism

If anyone on the dev-rel or research side wants a walkthrough of how Claude Code behaves as the operator of a system like this — what works, what breaks, what the API could do better for persistent agents — I'd love 20 minutes. Happy to share the architecture writeup either way.

Jeff Wozniak
(contact details)
