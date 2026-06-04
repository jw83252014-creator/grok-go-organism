"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type TelemetryType =
  | "metabolic_pulse"
  | "epigenetic_memory"
  | "cell_spawn"
  | "immune_signal"
  | "research_output";

export interface TelemetryEvent {
  id: string;
  type: TelemetryType;
  data: string;
  timestamp: string;
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
    data: "turn.complete detected from unified.jsonl"
  },
  {
    type: "epigenetic_memory",
    data: "commit fc4f833 Add Grok Go research paper package"
  },
  {
    type: "research_output",
    data: "Researcher drafted source matrix task from Science Skills fork"
  },
  {
    type: "immune_signal",
    data: "watcher health: X data is partial until fresh archive arrives"
  },
  {
    type: "cell_spawn",
    data: "proposed cell: source-verification researcher"
  }
];

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
  if (lower.includes("x ") || lower.includes("api") || lower.includes("source")) return "sensory";
  return "builder";
}

function normalizeIncoming(raw: unknown): TelemetryEvent {
  const payload = raw && typeof raw === "object" ? (raw as Partial<TelemetryEvent>) : {};
  const type = payload.type || "metabolic_pulse";
  return {
    id: payload.id || eventId(),
    type,
    data: String(payload.data || "pulse"),
    timestamp: payload.timestamp || nowStamp()
  };
}

export function useTerrariumTelemetry() {
  const wsUrl = process.env.NEXT_PUBLIC_TERRARIUM_WS_URL || "ws://127.0.0.1:8799/ws/terrarium";
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
    let demoTimer: ReturnType<typeof setInterval> | null = null;
    let socket: WebSocket | null = null;

    function pushEvent(event: TelemetryEvent) {
      setEvents(prev => [event, ...prev].slice(0, 36));
      if (event.type === "metabolic_pulse") {
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
      demoTimer = setInterval(() => {
        const base = demoPulses[index % demoPulses.length];
        pushEvent({
          ...base,
          id: eventId(),
          timestamp: nowStamp()
        });
        index += 1;
      }, 2600);
    }

    try {
      socket = new WebSocket(wsUrl);
      socket.onopen = () => {
        if (!active) return;
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
      if (!connected) startDemo();
    }, 1400);

    return () => {
      active = false;
      window.clearTimeout(fallback);
      if (demoTimer) clearInterval(demoTimer);
      socket?.close();
    };
  }, [connected, wsUrl]);

  const commits = useMemo(
    () => events.filter(event => event.type === "epigenetic_memory").slice(0, 5),
    [events]
  );

  return {
    events,
    commits,
    cells,
    pulse,
    connected,
    transport,
    wsUrl
  };
}
