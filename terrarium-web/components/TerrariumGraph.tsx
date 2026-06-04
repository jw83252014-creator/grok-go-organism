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
    <section className="terrarium-panel pointer-events-auto absolute left-4 right-4 top-4 z-20 rounded-md p-3 sm:left-5 sm:right-auto sm:w-[380px] max-[900px]:relative max-[900px]:left-auto max-[900px]:right-auto max-[900px]:top-auto max-[900px]:order-1 max-[900px]:w-full">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-base font-semibold text-white">Grok Go Terrarium</h1>
          <p className="text-xs text-cyan-100/70">read-only telemetry microscope</p>
        </div>
        <div className="flex items-center gap-2 rounded border border-cyan-400/25 bg-cyan-950/25 px-2 py-1 text-xs text-cyan-100">
          <span className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-400" : "bg-amber-400"}`} />
          {transport}
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        {cells.slice(0, 6).map(cell => (
          <div key={cell.id} className={`min-h-12 rounded border px-3 py-2 ${roleColor(cell.role)}`}>
            <div className="truncate text-xs font-medium">{cell.name}</div>
            <div className="mt-1 text-xs opacity-75">{cell.role}</div>
          </div>
        ))}
      </div>

      <div className="h-36 overflow-hidden rounded border border-cyan-400/20 bg-black/45 p-3">
        <div className="mb-2 text-xs text-cyan-100/75">metabolic pulse log</div>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {events.slice(0, 5).map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="grid grid-cols-[64px_1fr] gap-2 text-xs leading-snug"
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
