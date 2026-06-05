"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type TelemetryType =
  | "metabolic_pulse"
  | "epigenetic_memory"
  | "cell_spawn"
  | "immune_signal"
  | "research_output"
  | "research_pulse"
  | "assay_score"
  | "local_model";

export interface AssayScore {
  vitality: number;
  goal_progress: number;
  token_efficiency: number;
  local_offload: number;
  memory_reuse: number;
  infrastructure_tax: number;
  safety: number;
  queue_health: "clean" | "warn" | string;
}

export interface TelemetryEvent {
  id: string;
  type: TelemetryType;
  data: string;
  timestamp: string;
  source?: "live_grok" | "live_git" | "live_receipt" | "study_replay" | "historical_git" | "demo" | "system";
  phase?: "live" | "historical_replay";
  score?: Partial<AssayScore>;
}

export interface CellNode {
  id: string;
  name: string;
  angle: number;
  radius: number;
  role: "builder" | "watcher" | "researcher" | "memory" | "sensory";
}

const demoPulses: Array<Omit<TelemetryEvent, "id" | "timestamp">> = [
  {
    type: "metabolic_pulse",
    data: "study replay: Grok Go first autonomous loop booted from Terminal watcher",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "immune_signal",
    data: "failure mode: GUI injection switched tabs but did not reliably type into Grok",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "immune_signal",
    data: "mitigation: watcher wrote next prompt to file and copied it with pbcopy",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "cell_spawn",
    data: "proposed cell: Watcher / immune system",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "cell_spawn",
    data: "proposed cell: Researcher / read-only observer",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "cell_spawn",
    data: "proposed cell: Source verification researcher",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "research_output",
    data: "observed pathology: loop spent too many turns polishing continuation machinery",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "epigenetic_memory",
    data: "git memory replay: watcher banners, continuation helpers, shell fallback, session guide",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "research_output",
    data: "research package: working paper, Science Skills plan, and terrarium source notes",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "local_model",
    data: "local Qwen lane: cheap chunking, dedupe, and prefilter summaries before Grok synthesis",
    source: "demo",
    phase: "historical_replay"
  },
  {
    type: "assay_score",
    data: "vitality 82 | goal 4/5 | token 5/5 | local 5/5 | tax 1/5 | queue clean",
    source: "demo",
    phase: "historical_replay",
    score: {
      vitality: 82,
      goal_progress: 4,
      token_efficiency: 5,
      local_offload: 5,
      memory_reuse: 4,
      infrastructure_tax: 1,
      safety: 5,
      queue_health: "clean"
    }
  }
];

function defaultLocalWsUrl() {
  if (typeof window === "undefined") return "";
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "ws://127.0.0.1:8799/ws/terrarium";
  }
  return "";
}

function nowStamp() {
  return new Date().toISOString();
}

function eventId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function roleFromText(text: string): CellNode["role"] {
  const lower = text.toLowerCase();
  if (lower.includes("watch") || lower.includes("immune")) return "watcher";
  if (lower.includes("research") || lower.includes("paper")) return "researcher";
  if (lower.includes("memory") || lower.includes("git") || lower.includes("commit")) return "memory";
  if (lower.includes("x ") || lower.includes("api") || lower.includes("source") || lower.includes("qwen") || lower.includes("local")) return "sensory";
  return "builder";
}

function normalizeIncoming(raw: unknown): TelemetryEvent {
  const payload = raw && typeof raw === "object" ? (raw as Partial<TelemetryEvent>) : {};
  const type = payload.type || "metabolic_pulse";
  return {
    id: payload.id || eventId(),
    type,
    data: String(payload.data || "pulse"),
    timestamp: payload.timestamp || nowStamp(),
    source: payload.source,
    phase: payload.phase,
    score: payload.score
  };
}

export function useTerrariumTelemetry() {
  const [wsUrl, setWsUrl] = useState("");
  const [events, setEvents] = useState<TelemetryEvent[]>([]);
  const [cells, setCells] = useState<CellNode[]>([
    {
      id: "grok-go",
      name: "Grok Go",
      angle: 0,
      radius: 0,
      role: "builder"
    }
  ]);
  const [pulse, setPulse] = useState(false);
  const [connected, setConnected] = useState(false);
  const [transport, setTransport] = useState<"websocket" | "demo">("demo");
  const cellCounter = useRef(0);

  useEffect(() => {
    let active = true;
    let opened = false;
    let demoTimer: ReturnType<typeof setInterval> | null = null;
    let socket: WebSocket | null = null;
    const resolvedWsUrl = process.env.NEXT_PUBLIC_TERRARIUM_WS_URL || defaultLocalWsUrl();
    setWsUrl(resolvedWsUrl);

    function pushEvent(event: TelemetryEvent) {
      setEvents(prev => [event, ...prev].slice(0, 36));
      if (event.type === "metabolic_pulse" || event.type === "research_pulse" || event.type === "assay_score") {
        setPulse(true);
        window.setTimeout(() => setPulse(false), 380);
      }
      if (event.type === "cell_spawn" || event.data.toLowerCase().includes("proposed cell")) {
        cellCounter.current += 1;
        const angle = (cellCounter.current * 63) % 360;
        const radius = 170 + (cellCounter.current % 3) * 46;
        setCells(prev => {
          if (prev.some(cell => cell.name === event.data.slice(0, 42))) return prev;
          return [
            ...prev,
            {
              id: event.id,
              name: event.data.replace(/^proposed cell:\s*/i, "").slice(0, 34),
              angle,
              radius,
              role: roleFromText(event.data)
            }
          ].slice(0, 13);
        });
      }
    }

    function startDemo() {
      if (!active || demoTimer) return;
      setTransport("demo");
      let index = 0;
      const tick = () => {
        const base = demoPulses[index % demoPulses.length];
        pushEvent({
          ...base,
          id: eventId(),
          timestamp: nowStamp()
        });
        index += 1;
      };
      tick();
      demoTimer = setInterval(tick, 1300);
    }

    if (!resolvedWsUrl) {
      startDemo();
      return () => {
        active = false;
        if (demoTimer) clearInterval(demoTimer);
      };
    }

    try {
      socket = new WebSocket(resolvedWsUrl);
      socket.onopen = () => {
        if (!active) return;
        opened = true;
        setConnected(true);
        setTransport("websocket");
      };
      socket.onmessage = event => {
        try {
          pushEvent(normalizeIncoming(JSON.parse(event.data)));
        } catch {
          pushEvent(
            normalizeIncoming({
              type: "metabolic_pulse",
              data: String(event.data)
            })
          );
        }
      };
      socket.onerror = () => {
        setConnected(false);
        startDemo();
      };
      socket.onclose = () => {
        setConnected(false);
        startDemo();
      };
    } catch {
      startDemo();
    }

    const fallback = window.setTimeout(() => {
      if (!opened) startDemo();
    }, 1400);

    return () => {
      active = false;
      window.clearTimeout(fallback);
      if (demoTimer) clearInterval(demoTimer);
      socket?.close();
    };
  }, []);

  const commits = useMemo(
    () => events.filter(event => event.type === "epigenetic_memory").slice(0, 5),
    [events]
  );

  const assayScore = useMemo(
    () => events.find(event => event.type === "assay_score" && event.score)?.score,
    [events]
  );

  return {
    events,
    commits,
    assayScore,
    cells,
    pulse,
    connected,
    transport,
    wsUrl
  };
}
