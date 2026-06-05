"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  Bot,
  Check,
  Clipboard,
  Copy,
  ExternalLink,
  Inbox,
  Link as LinkIcon,
  MessageSquareText,
  RefreshCcw,
  Send,
  Sparkles,
  Users
} from "lucide-react";

interface AgentConnector {
  key: string;
  label: string;
  status: string;
  detail: string;
  needsJeff: boolean;
}

interface Agent {
  id: string;
  name: string;
  provider?: string;
  connectors?: AgentConnector[];
}

interface Approval {
  id: string;
  status: string;
  agent: string;
  kind: string;
  title: string;
}

interface BridgeState {
  meeting: string[];
  tasks: string;
  agents: Agent[];
  approvals: Approval[];
}

interface ChatMessage {
  raw: string;
  timestamp: string;
  agent: string;
  message: string;
}

const suggestedAgents = ["all", "grok", "claude", "gemini", "librarian", "codex", "sam"];
const urlPattern = /https?:\/\/[^\s<>"')]+/gi;
const quickMoves = [
  {
    id: "x-radar",
    label: "X Radar",
    because: "Find who cares, where to reply, and why it matters today.",
    owner: "librarian",
    message:
      "@librarian Run X Radar. Look at recent likes/follows/replies/bookmarks available to you, research the people lightly, find the highest-leverage threads/rooms for Grok Go, Bid Local, comedy, and agent-organism work. Output: 5 places to show up, why each matters, exact draft replies, and risk notes. Do not post."
  },
  {
    id: "mine-backlog",
    label: "Mine Backlog",
    because: "Turn the pile of chats/downloads into ranked moves.",
    owner: "grok-go",
    message:
      "@grok @codex Mine the backlog for highest-leverage projects. Use the Mining Engine framing: capture repeated themes, score by impact/effort/revenue/public signal, and return the top 7 next moves in plain English. Output each as: Do this / because / who owns it / first artifact."
  },
  {
    id: "push-grok-go",
    label: "Push Grok Go",
    because: "Give the organism one concrete build/research task.",
    owner: "grok",
    message:
      "@grok Push Grok Go forward one useful step. Avoid self-polishing. Pick one concrete artifact that improves the public research organism, telemetry, researcher layer, or revenue path. Output: what to build, why it matters, exact next prompt or task."
  },
  {
    id: "make-post",
    label: "Draft X Post",
    because: "Turn current work into a post with a target audience.",
    owner: "librarian",
    message:
      "@librarian Draft one high-leverage X post from current Agent Bridge/Grok Go context. Include: target audience, emotional hook, why they would care, exact post, image idea, and where to reply or quote for leverage. Approval required before posting."
  },
  {
    id: "make-video",
    label: "Video Move",
    because: "Turn the best idea into a simple Grok Go Lab clip.",
    owner: "claude",
    message:
      "@claude @gemini Create one plain-English Grok Go Lab video move. Output: title, 30-second hook, 2-minute outline, visual direction, and why this video helps sell the project. No long technical explanation."
  },
  {
    id: "sync-sam",
    label: "Sync Sam",
    because: "Give Sam the clean cofounder view, not the whole storm.",
    owner: "sam",
    message:
      "@sam @codex Create a Sam sync brief. Explain in plain English: what changed, why it matters for Jeff/Sam, what Sam should look at, and the 3 highest-leverage cofounder actions this week."
  }
];

function fallbackBridgeUrl() {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return "http://127.0.0.1:8787";
  if (host.startsWith("100.")) return `http://${host}:8787`;
  if (host.endsWith(".local")) return `http://${host}:8787`;
  return "";
}

function parseMeetingLine(line: string): ChatMessage {
  const match = line.match(/^\[([^\]]+)\]\s+([^:]+):\s*([\s\S]*)$/);
  if (!match) {
    return {
      raw: line,
      timestamp: "",
      agent: "bridge",
      message: line
    };
  }
  return {
    raw: line,
    timestamp: match[1],
    agent: match[2].trim(),
    message: match[3].trim()
  };
}

function extractUrls(value: string) {
  return Array.from(new Set(value.match(urlPattern) || []));
}

function compactTime(iso: string) {
  if (!iso) return "";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function visibleAgentName(agent: Agent) {
  return agent.name || agent.id;
}

export default function MidspacePage() {
  const [bridgeUrl, setBridgeUrl] = useState("");
  const [state, setState] = useState<BridgeState | null>(null);
  const [composer, setComposer] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("all");
  const [copiedId, setCopiedId] = useState("");
  const [status, setStatus] = useState("connecting");
  const [isSending, setIsSending] = useState(false);
  const [linkAutoRoute, setLinkAutoRoute] = useState(true);
  const endRef = useRef<HTMLDivElement | null>(null);

  const messages = useMemo(() => (state?.meeting || []).map(parseMeetingLine).slice(-80), [state]);
  const linksInDraft = useMemo(() => extractUrls(composer), [composer]);
  const pendingApprovals = useMemo(
    () => (state?.approvals || []).filter(approval => approval.status === "pending"),
    [state]
  );
  const incubationCount = useMemo(() => {
    const tasks = state?.tasks || "";
    return tasks
      .split(/\r?\n/)
      .filter(line => /incubat|inbox|librarian|x context|link/i.test(line))
      .length;
  }, [state]);
  const activeAgents = useMemo(() => {
    const bridgeAgents = state?.agents?.map(agent => agent.id).filter(Boolean) || [];
    return Array.from(new Set([...suggestedAgents, ...bridgeAgents])).slice(0, 28);
  }, [state]);

  const refresh = useCallback(async () => {
    const resolved = bridgeUrl || fallbackBridgeUrl();
    if (!resolved) {
      setStatus("public demo mode");
      return;
    }
    setBridgeUrl(resolved);
    try {
      const response = await fetch(`${resolved}/api/state`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Bridge returned ${response.status}`);
      const payload = (await response.json()) as BridgeState;
      setState(payload);
      setStatus("live");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "bridge offline");
    }
  }, [bridgeUrl]);

  useEffect(() => {
    setBridgeUrl(fallbackBridgeUrl());
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), 5000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  async function postJson(path: string, body: Record<string, unknown>) {
    const resolved = bridgeUrl || fallbackBridgeUrl();
    if (!resolved) throw new Error("Agent Bridge URL is not available on this network");
    const response = await fetch(`${resolved}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error(`${path} returned ${response.status}`);
  }

  async function sendMessage() {
    const text = composer.trim();
    if (!text || isSending) return;
    setIsSending(true);
    try {
      const directed = selectedAgent === "all" ? text : `@${selectedAgent} ${text}`;
      await postJson("/api/say", {
        agent: "jeff",
        message: directed
      });

      if (linkAutoRoute && linksInDraft.length > 0) {
        const linkList = linksInDraft.join(" ");
        await postJson("/api/say", {
          agent: "router",
          message: `@librarian Link intake from Midspace. Pull context, classify, summarize, and file a receipt. Links: ${linkList}`
        });
        await postJson("/api/task", {
          owner: "librarian",
          task: `Incubate link(s) from Midspace: ${linkList}`
        });
      }

      if (/idea:|incubat|someday|maybe|park this|save this/i.test(text)) {
        await postJson("/api/task", {
          owner: "incubation",
          task: text.replace(/^idea:\s*/i, "")
        });
      }

      setComposer("");
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "send failed");
    } finally {
      setIsSending(false);
    }
  }

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(""), 1400);
  }

  async function runQuickMove(move: (typeof quickMoves)[number]) {
    if (isSending) return;
    setIsSending(true);
    try {
      await postJson("/api/say", {
        agent: "jeff",
        message: move.message
      });
      await postJson("/api/task", {
        owner: move.owner,
        task: `${move.label}: ${move.because}`
      });
      await refresh();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "quick move failed");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="min-h-dvh overflow-hidden bg-[#030507] text-cyan-50">
      <div className="pointer-events-none fixed inset-0 grid-field opacity-30" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.16),transparent_35%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.72))]" />

      <div className="relative z-10 mx-auto flex h-dvh max-w-5xl flex-col px-3 py-3 sm:px-5 sm:py-4">
        <header className="mb-3 rounded-md border border-cyan-400/15 bg-black/55 px-3 py-3 backdrop-blur-md sm:px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <MessageSquareText className="h-5 w-5 text-teal-300" />
                <h1 className="truncate text-base font-semibold tracking-wide text-cyan-50 sm:text-xl">
                  Grok Go Room
                </h1>
              </div>
              <p className="mt-1 text-xs text-cyan-100/55">
                Chat first. Incubation, routing, and receipts happen behind the glass.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              <span className="rounded-full border border-cyan-400/20 bg-black/55 px-2.5 py-1 text-cyan-100/70">
                {status}
              </span>
              <button
                onClick={() => void refresh()}
                className="rounded-full border border-cyan-400/20 bg-black/55 p-2 text-cyan-100/70 transition hover:border-teal-300/50 hover:text-teal-100"
                aria-label="Refresh bridge state"
              >
                <RefreshCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 grid gap-2 text-[11px] sm:grid-cols-3">
            <div className="rounded border border-cyan-400/12 bg-cyan-950/12 px-3 py-2">
              <div className="flex items-center gap-2 text-cyan-100/50">
                <Users className="h-3.5 w-3.5" />
                Agents
              </div>
              <div className="mt-1 font-semibold text-cyan-50">{state?.agents?.length ?? 0} visible</div>
            </div>
            <div className="rounded border border-cyan-400/12 bg-cyan-950/12 px-3 py-2">
              <div className="flex items-center gap-2 text-cyan-100/50">
                <Inbox className="h-3.5 w-3.5" />
                Incubation
              </div>
              <div className="mt-1 font-semibold text-cyan-50">{incubationCount} background items</div>
            </div>
            <div className="rounded border border-cyan-400/12 bg-cyan-950/12 px-3 py-2">
              <div className="flex items-center gap-2 text-cyan-100/50">
                <Check className="h-3.5 w-3.5" />
                Approvals
              </div>
              <div className="mt-1 font-semibold text-cyan-50">{pendingApprovals.length} pending</div>
            </div>
          </div>
        </header>

        <section className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {activeAgents.map(agent => (
            <button
              key={agent}
              onClick={() => setSelectedAgent(agent)}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-medium transition ${
                selectedAgent === agent
                  ? "border-teal-300/70 bg-teal-400/12 text-teal-100"
                  : "border-cyan-400/14 bg-black/45 text-cyan-100/62 hover:border-cyan-300/40"
              }`}
            >
              {agent === "all" ? "@all" : `@${agent}`}
            </button>
          ))}
        </section>

        <section className="mb-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {quickMoves.map(move => (
            <button
              key={move.id}
              onClick={() => void runQuickMove(move)}
              disabled={isSending}
              className="rounded-md border border-cyan-400/14 bg-black/48 p-3 text-left transition hover:border-teal-300/45 hover:bg-teal-950/14 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-cyan-50">
                <Sparkles className="h-4 w-4 text-teal-300" />
                {move.label}
              </div>
              <p className="mt-1 text-xs leading-5 text-cyan-100/52">{move.because}</p>
            </button>
          ))}
        </section>

        <section className="min-h-0 flex-1 overflow-y-auto rounded-md border border-cyan-400/14 bg-black/50 p-3 backdrop-blur-md">
          {messages.length === 0 ? (
            <div className="grid h-full place-items-center text-center text-sm text-cyan-100/45">
              <div>
                <Bot className="mx-auto mb-3 h-8 w-8 text-cyan-100/35" />
                No bridge messages loaded yet.
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((item, index) => {
                const id = `${item.timestamp}-${item.agent}-${index}`;
                const isHuman = item.agent === "jeff" || item.agent === "sam";
                return (
                  <article
                    key={id}
                    className={`group rounded-md border p-3 ${
                      isHuman
                        ? "border-teal-300/22 bg-teal-950/16"
                        : "border-cyan-400/12 bg-zinc-950/72"
                    }`}
                  >
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-cyan-50">@{item.agent}</span>
                          <span className="text-[10px] uppercase tracking-[0.16em] text-cyan-100/35">
                            {compactTime(item.timestamp)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => void copyText(id, item.message)}
                        className="shrink-0 rounded border border-cyan-400/12 bg-black/35 p-1.5 text-cyan-100/45 opacity-100 transition hover:border-teal-300/45 hover:text-teal-100 sm:opacity-0 sm:group-hover:opacity-100"
                        aria-label="Copy message"
                      >
                        {copiedId === id ? <Clipboard className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                    <p className="whitespace-pre-wrap break-words text-sm leading-6 text-cyan-50/84">{item.message}</p>
                    {extractUrls(item.message).length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {extractUrls(item.message).slice(0, 4).map(link => (
                          <a
                            key={link}
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex max-w-full items-center gap-1 rounded border border-cyan-400/14 bg-black/35 px-2 py-1 text-[11px] text-cyan-100/62 hover:text-teal-100"
                          >
                            <ExternalLink className="h-3 w-3 shrink-0" />
                            <span className="truncate">{link}</span>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </article>
                );
              })}
              <div ref={endRef} />
            </div>
          )}
        </section>

        <footer className="mt-3 rounded-md border border-cyan-400/15 bg-black/65 p-3 backdrop-blur-md">
          {linksInDraft.length > 0 ? (
            <div className="mb-2 flex flex-wrap items-center gap-2 rounded border border-teal-300/18 bg-teal-950/15 px-3 py-2 text-xs text-teal-50/75">
              <LinkIcon className="h-4 w-4 text-teal-300" />
              {linkAutoRoute ? "Link will auto-route to @librarian for X/web context and filing." : "Link detected; auto-route is off."}
            </div>
          ) : null}

          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <textarea
              value={composer}
              onChange={event => setComposer(event.target.value)}
              onKeyDown={event => {
                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  void sendMessage();
                }
              }}
              rows={3}
              placeholder={`Message ${selectedAgent === "all" ? "@all" : `@${selectedAgent}`}... paste links here and Librarian gets a background task.`}
              className="min-h-24 resize-none rounded border border-cyan-400/14 bg-black/55 px-3 py-3 text-sm leading-6 text-cyan-50 outline-none placeholder:text-cyan-100/35 focus:border-teal-300/55"
            />
            <div className="grid gap-2 sm:w-36">
              <button
                onClick={() => void sendMessage()}
                disabled={isSending || composer.trim().length === 0}
                className="inline-flex items-center justify-center gap-2 rounded border border-teal-300/55 bg-teal-500/14 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-50 transition hover:bg-teal-400/20 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Send className="h-4 w-4" />
                Send
              </button>
              <button
                onClick={() => setLinkAutoRoute(value => !value)}
                className={`inline-flex items-center justify-center gap-2 rounded border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] transition ${
                  linkAutoRoute
                    ? "border-cyan-300/30 bg-cyan-950/16 text-cyan-100"
                    : "border-zinc-700 bg-zinc-950 text-zinc-400"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Link Skill
              </button>
              <button
                onClick={() => {
                  setComposer(current => `idea: ${current}`.trim());
                }}
                className="inline-flex items-center justify-center gap-2 rounded border border-cyan-400/14 bg-black/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-cyan-100/65 transition hover:border-cyan-300/35"
              >
                <Archive className="h-3.5 w-3.5" />
                Incubate
              </button>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-cyan-100/35">
            Tip: press Cmd/Ctrl+Enter to send. Public posting, spending, betting, and account changes still require explicit human approval.
          </p>
        </footer>
      </div>
    </main>
  );
}
