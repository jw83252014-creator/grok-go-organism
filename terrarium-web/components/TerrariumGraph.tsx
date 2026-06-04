"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CellNode, TelemetryEvent } from "@/lib/useTerrariumTelemetry";

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
        {cells.slice(0, 4).map(cell => (
          <div key={cell.id} className={`min-h-10 rounded border px-2 py-1.5 ${roleColor(cell.role)}`}>
            <div className="truncate text-[11px] font-medium">{cell.name}</div>
            <div className="mt-0.5 text-[10px] opacity-75">{cell.role}</div>
          </div>
        ))}
      </div>

      <div className="h-24 overflow-hidden rounded border border-cyan-400/20 bg-black/45 p-2">
        <div className="mb-2 text-xs text-cyan-100/75">metabolic pulse log</div>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {events.slice(0, 3).map(event => (
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
