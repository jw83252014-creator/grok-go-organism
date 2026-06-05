"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Cpu, ExternalLink, FileText, Github, ShieldCheck } from "lucide-react";
import type { AssayScore, CellNode, TelemetryEvent } from "@/lib/useTerrariumTelemetry";

const GITHUB_URL = "https://github.com/jw83252014-creator/grok-go-organism";
const RESEARCH_PAPER_URL =
  "https://github.com/jw83252014-creator/grok-go-organism/blob/main/research-paper/grok-go-living-research-organism.md";

function roleColor(role: CellNode["role"]) {
  switch (role) {
    case "watcher":
      return "border-amber-400/70 text-amber-200 bg-amber-950/35";
    case "researcher":
      return "border-violet-400/70 text-violet-100 bg-violet-950/35";
    case "memory":
      return "border-sky-400/70 text-sky-100 bg-sky-950/35";
    case "sensory":
      return "border-emerald-400/70 text-emerald-100 bg-emerald-950/35";
    default:
      return "border-cyan-400/70 text-cyan-100 bg-cyan-950/35";
  }
}

function shortTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--:--";
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function numberScore(score: Partial<AssayScore> | undefined, key: keyof AssayScore, fallback = 0) {
  const value = score?.[key];
  return typeof value === "number" ? value : fallback;
}

function queueScore(score: Partial<AssayScore> | undefined) {
  const value = score?.queue_health;
  return typeof value === "string" ? value : "pending";
}

function pulseEvent(event: TelemetryEvent) {
  return (
    event.type === "research_pulse" ||
    event.type === "assay_score" ||
    event.type === "local_model" ||
    event.type === "research_output" ||
    event.type === "epigenetic_memory"
  );
}

export default function TerrariumGraph({
  events,
  cells,
  connected,
  transport
}: {
  events: TelemetryEvent[];
  cells: CellNode[];
  connected: boolean;
  transport: "websocket" | "demo";
}) {
  const latestAssay = events.find(event => event.type === "assay_score" && event.score);
  const score = latestAssay?.score;
  const pulseEvents = events.filter(pulseEvent).slice(0, 4);
  const vitality = numberScore(score, "vitality", transport === "demo" ? 82 : 0);
  const queue = queueScore(score);

  return (
    <section className="terrarium-panel pointer-events-auto absolute left-3 top-3 z-20 w-[min(330px,calc(100vw-24px))] rounded-md p-2.5 min-[1280px]:left-5 min-[1280px]:top-5 min-[1280px]:w-[350px]">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <h1 className="text-sm font-semibold text-white">Grok Go Terrarium</h1>
          <p className="text-xs text-cyan-100/70">read-only telemetry microscope</p>
        </div>
        <div className="flex items-center gap-2 rounded border border-cyan-400/25 bg-cyan-950/25 px-2 py-1 text-[11px] text-cyan-100">
          <span className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-400" : "bg-amber-400"}`} />
          {transport}
        </div>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-1.5">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded border border-cyan-400/20 bg-cyan-950/20 px-2 py-1.5 text-[11px] text-cyan-50/90 transition hover:border-cyan-300/50 hover:bg-cyan-950/35"
        >
          <span className="flex items-center gap-1.5">
            <Github className="h-3.5 w-3.5" />
            GitHub
          </span>
          <ExternalLink className="h-3 w-3 text-cyan-100/60" />
        </a>
        <a
          href={RESEARCH_PAPER_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded border border-violet-400/20 bg-violet-950/20 px-2 py-1.5 text-[11px] text-violet-50/90 transition hover:border-violet-300/50 hover:bg-violet-950/35"
        >
          <span className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Paper
          </span>
          <ExternalLink className="h-3 w-3 text-violet-100/60" />
        </a>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-1.5">
        {cells.slice(0, 4).map(cell => (
          <div key={cell.id} className={`min-h-10 rounded border px-2 py-1.5 ${roleColor(cell.role)}`}>
            <div className="truncate text-[11px] font-medium">{cell.name}</div>
            <div className="mt-0.5 text-[10px] opacity-75">{cell.role}</div>
          </div>
        ))}
      </div>

      <div className="mb-2 rounded border border-cyan-400/20 bg-black/45 p-2">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-100">
            <Activity className="h-3.5 w-3.5 text-cyan-300" />
            live assay
          </div>
          <div
            className={`rounded border px-1.5 py-0.5 text-[10px] ${
              queue === "warn"
                ? "border-amber-400/30 bg-amber-950/30 text-amber-100"
                : "border-emerald-400/25 bg-emerald-950/25 text-emerald-100"
            }`}
          >
            queue {queue}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="rounded border border-cyan-400/15 bg-cyan-950/20 px-2 py-1.5">
            <div className="text-[10px] text-cyan-100/60">vitality</div>
            <div className="text-base font-semibold text-cyan-50">{vitality || "--"}</div>
          </div>
          <div className="rounded border border-emerald-400/15 bg-emerald-950/20 px-2 py-1.5">
            <div className="text-[10px] text-emerald-100/60">goal</div>
            <div className="text-base font-semibold text-emerald-50">
              {numberScore(score, "goal_progress") || "--"}/5
            </div>
          </div>
          <div className="rounded border border-sky-400/15 bg-sky-950/20 px-2 py-1.5">
            <div className="text-[10px] text-sky-100/60">tokens</div>
            <div className="text-base font-semibold text-sky-50">
              {numberScore(score, "token_efficiency") || "--"}/5
            </div>
          </div>
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-1.5 text-[10px]">
          <div className="flex items-center gap-1 rounded border border-violet-400/15 bg-violet-950/20 px-1.5 py-1 text-violet-100">
            <Cpu className="h-3 w-3" />
            local {numberScore(score, "local_offload") || "--"}/5
          </div>
          <div className="rounded border border-rose-400/15 bg-rose-950/20 px-1.5 py-1 text-rose-100">
            tax {numberScore(score, "infrastructure_tax") || "--"}/5
          </div>
          <div className="flex items-center justify-end gap-1 rounded border border-emerald-400/15 bg-emerald-950/20 px-1.5 py-1 text-emerald-100">
            <ShieldCheck className="h-3 w-3" />
            safe {numberScore(score, "safety") || "--"}/5
          </div>
        </div>
      </div>

      <div className="h-24 overflow-hidden rounded border border-cyan-400/20 bg-black/45 p-2">
        <div className="mb-2 text-xs text-cyan-100/75">research pulse</div>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {pulseEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="grid grid-cols-[56px_1fr] gap-2 text-[11px] leading-snug"
              >
                <span className="text-cyan-200/80">{shortTime(event.timestamp)}</span>
                <span className="truncate text-cyan-50">{event.data}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
