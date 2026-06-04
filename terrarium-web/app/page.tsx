"use client";

import dynamic from "next/dynamic";
import TerrariumGraph from "@/components/TerrariumGraph";
import MetabolismMeter from "@/components/MetabolismMeter";
import TerminalReplay from "@/components/TerminalReplay";
import { useTerrariumTelemetry } from "@/lib/useTerrariumTelemetry";

const PetriDish = dynamic(() => import("@/components/PetriDish"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-black grid-field" />
});

const VitalityChart = dynamic(() => import("@/components/VitalityChart"), {
  ssr: false,
  loading: () => (
    <section className="terrarium-panel min-h-[180px] rounded-md p-3">
      <h2 className="text-sm font-semibold text-cyan-100">Vitality Index</h2>
    </section>
  )
});

export default function Home() {
  const telemetry = useTerrariumTelemetry();

  return (
    <main className="relative h-dvh min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <PetriDish pulse={telemetry.pulse} cells={telemetry.cells} />
      </div>

      <TerrariumGraph
        events={telemetry.events}
        cells={telemetry.cells}
        connected={telemetry.connected}
        transport={telemetry.transport}
      />
      <TerminalReplay />

      <section className="pointer-events-auto absolute right-3 top-3 z-20 grid w-[min(245px,calc(100vw-24px))] gap-2 min-[1280px]:right-5 min-[1280px]:top-5 min-[1280px]:w-[260px] max-[760px]:bottom-3 max-[760px]:top-auto">
        <MetabolismMeter />
        <VitalityChart />
      </section>

      <section className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 rounded border border-cyan-400/20 bg-black/45 px-4 py-2 text-xs text-cyan-100/75 backdrop-blur-md xl:block">
        websocket: {telemetry.connected ? telemetry.wsUrl : "demo fallback"}
      </section>
    </main>
  );
}
