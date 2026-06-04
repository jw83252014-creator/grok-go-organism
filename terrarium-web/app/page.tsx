"use client";

import dynamic from "next/dynamic";
import TerrariumGraph from "@/components/TerrariumGraph";
import MetabolismMeter from "@/components/MetabolismMeter";
import { useTerrariumTelemetry } from "@/lib/useTerrariumTelemetry";

const PetriDish = dynamic(() => import("@/components/PetriDish"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-black grid-field" />
});

const VitalityChart = dynamic(() => import("@/components/VitalityChart"), {
  ssr: false,
  loading: () => (
    <section className="terrarium-panel min-h-[320px] rounded-md p-4">
      <h2 className="text-sm font-semibold text-cyan-100">Vitality Index</h2>
    </section>
  )
});

export default function Home() {
  const telemetry = useTerrariumTelemetry();

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white max-[900px]:flex max-[900px]:flex-col max-[900px]:gap-4 max-[900px]:overflow-auto max-[900px]:p-4">
      <div className="absolute inset-0 z-0 max-[900px]:relative max-[900px]:order-2 max-[900px]:h-[320px] max-[900px]:overflow-hidden max-[900px]:rounded-md max-[900px]:border max-[900px]:border-cyan-400/20">
        <PetriDish pulse={telemetry.pulse} cells={telemetry.cells} />
      </div>

      <TerrariumGraph
        events={telemetry.events}
        cells={telemetry.cells}
        connected={telemetry.connected}
        transport={telemetry.transport}
      />

      <section className="pointer-events-auto absolute bottom-4 left-4 right-4 z-20 grid gap-4 lg:left-auto lg:right-6 lg:top-6 lg:w-[430px] lg:grid-cols-1 max-[900px]:relative max-[900px]:bottom-auto max-[900px]:left-auto max-[900px]:right-auto max-[900px]:order-3 max-[900px]:w-full">
        <MetabolismMeter />
        <VitalityChart />
      </section>

      <section className="pointer-events-none absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 rounded border border-cyan-400/20 bg-black/45 px-4 py-2 text-xs text-cyan-100/75 backdrop-blur-md xl:block">
        websocket: {telemetry.connected ? telemetry.wsUrl : "demo fallback"}
      </section>
    </main>
  );
}
