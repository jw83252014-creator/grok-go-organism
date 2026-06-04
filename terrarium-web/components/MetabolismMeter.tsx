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
    <section className="terrarium-panel rounded-md p-3">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BatteryCharging className="h-4 w-4 text-emerald-300" />
          <h2 className="text-sm font-semibold text-emerald-100">Metabolic Core</h2>
        </div>
        <div className="flex items-center gap-1 rounded border border-amber-400/25 bg-amber-950/30 px-2 py-1 text-xs text-amber-100">
          <ShieldAlert className="h-3 w-3" />
          gated
        </div>
      </div>

      <div className="mb-3">
        <div className="mb-1 flex items-end justify-between gap-3">
          <span className="text-xs text-slate-300">available compute fuel</span>
          <span className="text-base font-semibold text-emerald-200">
            ${currentBalanceUSD.toFixed(2)}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full border border-emerald-400/25 bg-black p-[1px]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-300 to-sky-400"
            initial={{ width: 0 }}
            animate={{ width: `${fuelPercentage}%` }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-cyan-400/15 pt-3 text-xs">
        <div>
          <div className="mb-1 text-xs text-slate-400">24h burn</div>
          <div className="text-rose-200">${dailyBurnUSD.toFixed(2)} / day</div>
          <div className="mt-2 h-1 overflow-hidden rounded bg-black">
            <motion.div
              className="h-full rounded bg-rose-400"
              initial={{ width: 0 }}
              animate={{ width: `${burnIntensity}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
        <div className="text-right">
          <div className="mb-1 text-xs text-slate-400">lifetime raised</div>
          <div className="text-sky-200">${totalRaisedUSD.toFixed(2)}</div>
          <div className="mt-2 text-[11px] text-cyan-200">approval gate</div>
        </div>
      </div>
    </section>
  );
}
