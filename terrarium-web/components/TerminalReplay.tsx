"use client";

import { useEffect, useMemo, useState } from "react";
import { Terminal } from "lucide-react";

const replayLines = [
  "[00:16:06] grok: turn.complete ok=true elapsed=26.0s",
  "[watcher] marker detected: [[GROK_AUTONOMOUS_TURN_COMPLETE]]",
  "[watcher] wrote ~/.grok/next-autonomous-prompt.txt",
  "[watcher] copied prompt fallback: ~/.grok/go",
  "[watcher] sent next prompt to Grok Terminal",
  "[git] autonomous turn committed to memory",
  "[immune] low-value polishing risk detected",
  "[researcher] bookmark source pack queued",
  "[paper] evidence matrix updated",
  "[terrarium] public view is study replay only"
];

export default function TerminalReplay() {
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCursor(value => (value + 1) % replayLines.length);
    }, 1100);
    return () => window.clearInterval(timer);
  }, []);

  const visibleLines = useMemo(() => {
    return Array.from({ length: 7 }, (_, offset) => {
      const index = (cursor + offset) % replayLines.length;
      return replayLines[index];
    });
  }, [cursor]);

  return (
    <section className="pointer-events-none absolute bottom-5 left-5 z-20 hidden w-[320px] rounded-md border border-cyan-300/20 bg-black/60 p-3 font-mono text-[10.5px] leading-relaxed text-cyan-50/75 shadow-[0_0_28px_rgba(34,211,238,0.12)] backdrop-blur-md min-[1180px]:block">
      <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-cyan-200/80">
        <Terminal className="h-3.5 w-3.5" />
        <span>sanitized replay</span>
      </div>
      <div className="space-y-0.5">
        {visibleLines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            className={index === visibleLines.length - 1 ? "text-cyan-100" : "text-cyan-50/60"}
          >
            {line}
          </div>
        ))}
      </div>
    </section>
  );
}
