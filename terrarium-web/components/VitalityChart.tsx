"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Activity, AlertTriangle, TrendingDown } from "lucide-react";

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

export default function VitalityChart() {
  const currentVitality = historicalData[historicalData.length - 1].vitality;

  return (
    <section className="terrarium-panel rounded-md p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-300" />
            <h2 className="text-sm font-semibold text-cyan-100">Vitality Index</h2>
          </div>
          <p className="text-xs text-slate-400">self-maintenance versus goal progress</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 rounded border border-rose-400/25 bg-rose-950/30 px-3 py-1">
            <TrendingDown className="h-4 w-4 text-rose-300" />
            <span className="text-lg font-semibold text-rose-200">{currentVitality.toFixed(1)}</span>
          </div>
          <div className="mt-1 flex items-center justify-end gap-1 text-xs text-amber-200">
            <AlertTriangle className="h-3 w-3" />
            preening detected
          </div>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart data={historicalData} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(103, 232, 249, 0.12)" vertical={false} />
            <XAxis
              dataKey="cycle"
              stroke="#67e8f9"
              fontSize={10}
              tickMargin={8}
              tickFormatter={value => `T-${value}`}
            />
            <YAxis stroke="#67e8f9" fontSize={10} domain={[0, 100]} tickCount={5} />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={30} stroke="#fb7185" strokeDasharray="3 3" />
            <Area
              type="monotone"
              dataKey="vitality"
              stroke="#67e8f9"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVitality)"
            />
            <Area
              type="monotone"
              dataKey="polishing"
              stroke="#fb7185"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPolishing)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
