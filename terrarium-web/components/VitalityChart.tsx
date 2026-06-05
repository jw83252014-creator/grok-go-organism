"use client";

import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Activity, AlertTriangle, TrendingUp } from "lucide-react";
import type { AssayScore } from "@/lib/useTerrariumTelemetry";

const historicalData = [
  { cycle: 40, vitality: 82, polishing: 10 },
  { cycle: 42, vitality: 80, polishing: 15 },
  { cycle: 44, vitality: 75, polishing: 25 },
  { cycle: 46, vitality: 50, polishing: 65 },
  { cycle: 48, vitality: 42, polishing: 78 },
  { cycle: 50, vitality: 35, polishing: 85 },
  { cycle: 55, vitality: 28, polishing: 92 },
  { cycle: 60, vitality: 25, polishing: 95 },
  { cycle: 65, vitality: 22, polishing: 98 },
  { cycle: 67, vitality: 20, polishing: 99 }
];

function CustomTooltip({
  active,
  payload,
  label
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-cyan-400/25 bg-black/90 p-3 text-xs shadow-xl">
      <div className="mb-2 text-cyan-100">Turn {label}</div>
      {payload.map(item => (
        <div key={item.name} style={{ color: item.color }}>
          {item.name}: {item.value}
        </div>
      ))}
    </div>
  );
}

export default function VitalityChart({ assayScore }: { assayScore?: Partial<AssayScore> }) {
  const currentVitality =
    typeof assayScore?.vitality === "number"
      ? assayScore.vitality
      : historicalData[historicalData.length - 1].vitality;
  const currentPolishing =
    typeof assayScore?.infrastructure_tax === "number"
      ? Math.min(Math.max(assayScore.infrastructure_tax * 20, 0), 100)
      : historicalData[historicalData.length - 1].polishing;
  const chartData = assayScore
    ? [
        { cycle: 67, vitality: 20, polishing: 99 },
        { cycle: 68, vitality: currentVitality, polishing: currentPolishing }
      ]
    : historicalData;
  const status = currentVitality >= 65 ? "building" : "preening";

  return (
    <section className="terrarium-panel rounded-md p-2">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-cyan-300" />
            <h2 className="text-xs font-semibold text-cyan-100">Vitality Index</h2>
          </div>
          <p className="text-[10px] text-slate-400">maintenance vs goals</p>
        </div>
        <div className="text-right">
          <div
            className={`flex items-center gap-1.5 rounded border px-1.5 py-0.5 ${
              currentVitality >= 65
                ? "border-emerald-400/25 bg-emerald-950/30"
                : "border-rose-400/25 bg-rose-950/30"
            }`}
          >
            <TrendingUp className={`h-3 w-3 ${currentVitality >= 65 ? "text-emerald-300" : "text-rose-300"}`} />
            <span className={`text-sm font-semibold ${currentVitality >= 65 ? "text-emerald-200" : "text-rose-200"}`}>
              {currentVitality.toFixed(1)}
            </span>
          </div>
          <div
            className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
              currentVitality >= 65 ? "text-emerald-200" : "text-amber-200"
            }`}
          >
            <AlertTriangle className="h-3 w-3" />
            {status}
          </div>
        </div>
      </div>

      <div className="h-12 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
            <defs>
              <linearGradient id="colorVitality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#67e8f9" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#67e8f9" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPolishing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb7185" stopOpacity={0.24} />
                <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={30} stroke="#fb7185" strokeDasharray="3 3" strokeOpacity={0.7} />
            <Area
              type="monotone"
              dataKey="vitality"
              stroke="#67e8f9"
              strokeWidth={1.6}
              fillOpacity={1}
              fill="url(#colorVitality)"
            />
            <Area
              type="monotone"
              dataKey="polishing"
              stroke="#fb7185"
              strokeWidth={1.6}
              fillOpacity={1}
              fill="url(#colorPolishing)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
