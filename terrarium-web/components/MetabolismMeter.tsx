"use client";

import { motion } from "framer-motion";
import { BatteryCharging, ShieldAlert } from "lucide-react";

interface MetabolismMeterProps {
  currentBalanceUSD?: number;
  dailyBurnUSD?: number;
  totalRaisedUSD?: number;
}

export default function MetabolismMeter({
  currentBalanceUSD = 42.5,
  dailyBurnUSD = 12.8,
  totalRaisedUSD = 250
}: MetabolismMeterProps) {
  const fuelPercentage = Math.min(Math.max((currentBalanceUSD / totalRaisedUSD) * 100, 0), 100);
  const burnIntensity = Math.min(Math.max((dailyBurnUSD / 30) * 100, 5), 100);

  return (
    <section className="terrarium-panel rounded-md p-2">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BatteryCharging className="h-3.5 w-3.5 text-emerald-300" />
          <h2 className="text-xs font-semibold text-emerald-100">Metabolic Core</h2>
        </div>
        <div className="flex items-center gap-1 rounded border border-amber-400/25 bg-amber-950/30 px-1.5 py-0.5 text-[10px] text-amber-100">
          <ShieldAlert className="h-3 w-3" />
          gated
        </div>
      </div>

      <div className="mb-2">
        <div className="mb-1 flex items-end justify-between gap-2">
          <span className="text-[11px] text-slate-300">compute fuel</span>
          <span className="text-sm font-semibold text-emerald-200">
            ${currentBalanceUSD.toFixed(2)}
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full border border-emerald-400/25 bg-black p-[1px]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-300 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${fuelPercentage}%` }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-cyan-400/15 pt-2 text-[10px]">
        <div>
          <div className="mb-1 text-[10px] text-slate-400">24h burn</div>
          <div className="text-rose-200">${dailyBurnUSD.toFixed(2)}/day</div>
          <div className="mt-1.5 h-1 overflow-hidden rounded bg-black">
            <motion.div
              className="h-full rounded bg-rose-400"
              initial={{ width: 0 }}
              animate={{ width: `${burnIntensity}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
        <div className="text-right">
          <div className="mb-1 text-[10px] text-slate-400">raised</div>
          <div className="text-sky-200">${totalRaisedUSD.toFixed(2)}</div>
          <div className="mt-1.5 text-[10px] text-cyan-200">gate</div>
        </div>
      </div>
    </section>
  );
}
