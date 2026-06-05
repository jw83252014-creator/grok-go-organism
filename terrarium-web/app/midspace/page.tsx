"use client";

import { useMemo, useState } from "react";
import {
  Archive,
  BatteryCharging,
  CheckCircle2,
  Compass,
  Flame,
  Inbox,
  Layers,
  Link as LinkIcon,
  Play,
  Plus,
  ShieldAlert,
  Upload,
  Zap
} from "lucide-react";

type Lane = "active" | "high-meta" | "low-meta" | "incubation" | "boneyard";
type Metabolism = "high" | "low";

interface Task {
  id: string;
  title: string;
  lane: Lane;
  metabolism: Metabolism;
  source: "genome" | "jeff" | "sam" | "researcher";
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Polymarket weather cell: convert current thesis into paper-trading runbook",
    lane: "active",
    metabolism: "high",
    source: "genome"
  },
  {
    id: "2",
    title: "Build upload/intake API for ideas, screenshots, docs, and X links",
    lane: "high-meta",
    metabolism: "high",
    source: "researcher"
  },
  {
    id: "3",
    title: "Map Sam overlap against Grok Go repo and shared business board",
    lane: "high-meta",
    metabolism: "high",
    source: "sam"
  },
  {
    id: "4",
    title: "Scan X for high-signal multi-agent / biology / autonomy threads",
    lane: "low-meta",
    metabolism: "low",
    source: "jeff"
  },
  {
    id: "5",
    title: "Mine GitHub for token-efficient local model worker patterns",
    lane: "low-meta",
    metabolism: "low",
    source: "researcher"
  },
  {
    id: "6",
    title: "Digest old Downloads folder exports into public-safe research notes",
    lane: "low-meta",
    metabolism: "low",
    source: "genome"
  },
  {
    id: "7",
    title: "Archive completed continuation-loop polish receipts",
    lane: "boneyard",
    metabolism: "low",
    source: "genome"
  }
];

const lanes: Array<{
  id: Lane;
  title: string;
  subtitle: string;
  Icon: typeof Play;
  tone: string;
  empty: string;
}> = [
  {
    id: "incubation",
    title: "Incubation",
    subtitle: "Capture first, score later",
    Icon: Inbox,
    tone: "border-sky-500/45 text-sky-300",
    empty: "No raw signal waiting"
  },
  {
    id: "active",
    title: "Active Digestion",
    subtitle: "One concrete execution loop",
    Icon: Play,
    tone: "border-teal-400/70 text-teal-300",
    empty: "No active compute cycle"
  },
  {
    id: "high-meta",
    title: "High Metabolism",
    subtitle: "API / premium model spend",
    Icon: Flame,
    tone: "border-rose-500/55 text-rose-300",
    empty: "No expensive tasks queued"
  },
  {
    id: "low-meta",
    title: "Low Metabolism",
    subtitle: "Local Qwen / cheap foraging",
    Icon: Compass,
    tone: "border-amber-500/55 text-amber-300",
    empty: "No low-cost foraging queued"
  },
  {
    id: "boneyard",
    title: "Boneyard",
    subtitle: "Completed, killed, or archived",
    Icon: CheckCircle2,
    tone: "border-zinc-700 text-zinc-400",
    empty: "Nothing assimilated yet"
  }
];

function sourceLabel(source: Task["source"]) {
  if (source === "jeff") return "Jeff";
  if (source === "sam") return "Sam";
  if (source === "researcher") return "Researcher";
  return "Genome";
}

function nextId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function MidspacePage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [draft, setDraft] = useState("");
  const [isLowMetabolismMode, setIsLowMetabolismMode] = useState(false);

  const counts = useMemo(
    () =>
      lanes.reduce(
        (acc, lane) => ({
          ...acc,
          [lane.id]: tasks.filter(task => task.lane === lane.id).length
        }),
        {} as Record<Lane, number>
      ),
    [tasks]
  );

  function toggleMetabolismMode() {
    setIsLowMetabolismMode(prev => {
      const next = !prev;
      if (next) {
        setTasks(current =>
          current.map(task =>
            task.lane === "active" && task.metabolism === "high"
              ? { ...task, lane: "low-meta", metabolism: "low" }
              : task
          )
        );
      }
      return next;
    });
  }

  function moveTask(id: string, lane: Lane) {
    setTasks(current =>
      current.map(task =>
        task.id === id
          ? {
              ...task,
              lane,
              metabolism: lane === "high-meta" ? "high" : lane === "low-meta" ? "low" : task.metabolism
            }
          : task
      )
    );
  }

  function addIdea() {
    const title = draft.trim();
    if (!title) return;
    setTasks(current => [
      {
        id: nextId(),
        title,
        lane: "incubation",
        metabolism: "low",
        source: "jeff"
      },
      ...current
    ]);
    setDraft("");
  }

  return (
    <main className="h-dvh overflow-y-auto bg-black text-cyan-50 selection:bg-teal-400 selection:text-black">
      <div className="pointer-events-none fixed inset-0 grid-field opacity-50" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_35%_12%,rgba(20,184,166,0.16),transparent_34%),radial-gradient(circle_at_80%_28%,rgba(14,165,233,0.12),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.86))]" />

      <div className="relative z-10 mx-auto flex min-h-full max-w-[1720px] flex-col gap-5 p-4 sm:p-6">
        <header className="terrarium-panel rounded-md p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Layers className="h-6 w-6 text-teal-300" />
                <h1 className="text-lg font-semibold uppercase tracking-[0.22em] text-teal-100 sm:text-2xl">
                  Neural Spatial Workspace
                </h1>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-cyan-100/68">
                Midspace for Jeff + Sam: capture everything, activate almost nothing, and require visible human gates before
                expensive execution.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="rounded border border-cyan-400/20 bg-black/45 px-3 py-2 text-right">
                <div className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/45">Autonomic State</div>
                <div className={isLowMetabolismMode ? "text-sm font-semibold text-amber-300" : "text-sm font-semibold text-teal-300"}>
                  {isLowMetabolismMode ? "Hibernation / Foraging" : "Optimal Metabolic Flow"}
                </div>
              </div>
              <button
                onClick={toggleMetabolismMode}
                className={`flex h-11 items-center justify-center gap-2 rounded border px-4 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  isLowMetabolismMode
                    ? "border-amber-400/60 bg-amber-950/40 text-amber-200"
                    : "border-teal-300/60 bg-teal-950/30 text-teal-100"
                }`}
              >
                <BatteryCharging className="h-4 w-4" />
                Metabolism
              </button>
            </div>
          </div>
        </header>

        <section className="terrarium-panel rounded-md p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center">
            <label className="group flex min-h-14 items-center gap-3 rounded border border-cyan-400/18 bg-black/50 px-3 focus-within:border-teal-300/70">
              <Plus className="h-4 w-4 shrink-0 text-teal-300" />
              <input
                value={draft}
                onChange={event => setDraft(event.target.value)}
                onKeyDown={event => {
                  if (event.key === "Enter") addIdea();
                }}
                placeholder="Capture idea, X link, file note, Sam thought, or customer problem..."
                className="w-full bg-transparent text-sm text-cyan-50 outline-none placeholder:text-cyan-100/35"
              />
            </label>
            <button
              onClick={addIdea}
              className="flex h-14 items-center justify-center gap-2 rounded border border-teal-300/50 bg-teal-950/35 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-100 transition hover:bg-teal-800/45"
            >
              <Inbox className="h-4 w-4" />
              Intake
            </button>
            <button className="flex h-14 items-center justify-center gap-2 rounded border border-cyan-400/20 bg-black/45 px-5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100/70">
              <Upload className="h-4 w-4" />
              Upload Dock
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.16em] text-cyan-100/44">
            <span className="inline-flex items-center gap-1 rounded border border-cyan-400/15 px-2 py-1">
              <LinkIcon className="h-3 w-3" /> future: URL capture
            </span>
            <span className="rounded border border-cyan-400/15 px-2 py-1">future: file upload</span>
            <span className="rounded border border-cyan-400/15 px-2 py-1">future: phone approval</span>
            <span className="rounded border border-cyan-400/15 px-2 py-1">future: Sam sync</span>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-5">
          {lanes.map(lane => {
            const laneTasks = tasks.filter(task => task.lane === lane.id);
            const disabled = isLowMetabolismMode && lane.id === "high-meta";
            return (
              <section
                key={lane.id}
                className={`rounded-md border bg-zinc-950/82 p-3 shadow-[0_0_22px_rgba(34,211,238,0.05)] transition ${
                  disabled ? "border-zinc-900 opacity-35" : lane.tone
                }`}
              >
                <div className="mb-3 border-b border-white/8 pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <lane.Icon className="h-4 w-4" />
                      <h2 className="text-xs font-bold uppercase tracking-[0.17em]">{lane.title}</h2>
                    </div>
                    <span className="rounded bg-white/6 px-2 py-0.5 text-[10px] text-cyan-100/65">{counts[lane.id]}</span>
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-cyan-100/43">{lane.subtitle}</p>
                </div>

                <div className="space-y-3">
                  {laneTasks.length === 0 ? (
                    <p className="py-8 text-center text-[11px] uppercase tracking-[0.14em] text-zinc-600">{lane.empty}</p>
                  ) : (
                    laneTasks.map(task => (
                      <article key={task.id} className="group rounded border border-white/8 bg-black/62 p-3">
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span className="rounded bg-white/7 px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-cyan-100/52">
                            {sourceLabel(task.source)}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.14em] ${
                              task.metabolism === "high" ? "text-rose-300/75" : "text-amber-300/75"
                            }`}
                          >
                            {task.metabolism === "high" ? <Zap className="h-3 w-3" /> : <BatteryCharging className="h-3 w-3" />}
                            {task.metabolism}
                          </span>
                        </div>
                        <p className={lane.id === "boneyard" ? "text-xs leading-5 text-zinc-500 line-through" : "text-xs leading-5 text-cyan-50/82"}>
                          {task.title}
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                          {lane.id !== "active" && lane.id !== "boneyard" ? (
                            <button
                              onClick={() => moveTask(task.id, "active")}
                              className="rounded border border-teal-300/30 bg-teal-950/25 px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-100"
                            >
                              Approve
                            </button>
                          ) : null}
                          {lane.id !== "low-meta" && lane.id !== "boneyard" ? (
                            <button
                              onClick={() => moveTask(task.id, "low-meta")}
                              className="rounded border border-amber-300/25 bg-amber-950/20 px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-100"
                            >
                              Forage
                            </button>
                          ) : null}
                          {lane.id !== "boneyard" ? (
                            <button
                              onClick={() => moveTask(task.id, "boneyard")}
                              className="rounded border border-zinc-600/50 bg-zinc-900/40 px-2 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-300"
                            >
                              <Archive className="mx-auto h-3.5 w-3.5" />
                            </button>
                          ) : null}
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </section>
            );
          })}
        </section>

        <footer className="flex flex-wrap items-center gap-2 pb-4 text-[10px] uppercase tracking-[0.17em] text-cyan-100/42">
          <ShieldAlert className="h-3.5 w-3.5 text-cyan-100/48" />
          <span>Strict petri dish protocol active</span>
          <span className="text-cyan-100/22">//</span>
          <span>Human execution gates armed</span>
          <span className="text-cyan-100/22">//</span>
          <span>Storage/backend pending</span>
        </footer>
      </div>
    </main>
  );
}
