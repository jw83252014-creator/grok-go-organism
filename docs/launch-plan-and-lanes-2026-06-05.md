# Grok Go — Launch & X Content Plan + Lane Assignments

Date: 2026-06-05 · Author: vega (Claude on Mac mini) · Trail doc — update as lanes progress.

## Goal
Launch Grok Go publicly and run a continuous, approval-gated content + engagement engine: YouTube (@grokgolab), X (Articles + replies in Jeff's voice), backed by NotebookLM research. Nothing public ships without Jeff's approval.

## Lanes (who does what)
| Lane | Agent / tool | Job | Status |
|---|---|---|---|
| Research brain | **Null** (Hermes `~/.hermes-null`) | NotebookLM ingest of Grok Go sources → briefs + **Audio Overviews** (explainer audio for videos) | researcher skill + MCP live; ingest = next |
| X intel + replies + Articles | **Librarian** (Hermes X) | Feed monitor → Jeff-Filter reply drafts; X features/Articles research; @grokgolab profile + first Article | 2 tasks queued in `agent-comms/inbox/` |
| Visuals / clips | **Grok** (Creator Studio / imagine / clips) | Biology-metaphor stills, motion, short clips | lane to wire |
| Scripts / Articles / coord | **Vega (me)** | Video scripts, Articles, plans, infra | scripts v1 + profile + Article drafted |
| Publish | **Chrome lane** (Mac, logged-in) | Upload YouTube, post X — approval-gated | manual/approved |
| Approval gate | **approval-notifier** (launchd) | Every pending approval → macOS notification + Telegram | LIVE + verified |

## Done (this build)
- ✅ First 5 **video scripts** → `docs/youtube-video-scripts-v1.md`
- ✅ **@grokgolab profile + first X Article** → `docs/x-presence-and-first-article.md`
- ✅ **Approval notifier** live (`com.agentbridge.approval-notifier`) — approvals pop on the mini + Telegram
- ✅ Librarian tasks queued: `librarian-x-reply-monitor-task-2026-06-05.md`, `librarian-x-features-and-articles-research-2026-06-05.md`
- ✅ Null = NotebookLM researcher (skill + authed MCP)

## Next (executable)
1. **NotebookLM ingest** (Null): add site/repo/paper/launch-post → generate brief + Audio Overviews (prompt ready: `agent-comms/inbox/notebooklm-grok-go-launch-prompt-2026-06-04.md`).
2. **Jeff creates @grokgolab** X account (agents can't) → Librarian fills profile + posts first Article (approved).
3. **Verify Librarian gateway + Chrome scrape** → reply candidates start flowing to the approval queue.
4. **Wire Grok media lane** (imagine/clips) for visuals.
5. **Security P0:** rotate the Anthropic keys Null flagged as pasted-in-Telegram (`null-command-center/docs/projects/where-we-left-off-2026-05-18.md`).

## Approval flow (how content reaches Jeff before upload)
draft (any lane) → `agent-comms/bin/approval-request` → bridge approval queue → **approval-notifier pops macOS + Telegram** → Jeff approves/denies → Chrome lane publishes. Source of truth = Agent Bridge (per 2026-06-05 decision); Mattermost can mirror later.

## Trails / where things live
- Content drafts: `~/grok-go-organism-share/docs/`
- Tasks for lanes: `~/agent-comms/inbox/`
- Approvals: bridge `/api/approval/request` + `~/agent-comms/approvals/`
- This plan: update it as lanes report back.
