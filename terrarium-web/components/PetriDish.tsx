"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { CellNode } from "@/lib/useTerrariumTelemetry";

function MotherCell({ isPulsing }: { isPulsing: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const target = useMemo(() => new THREE.Vector3(1, 1, 1), []);

  useFrame(state => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.16;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.22;
    const scale = isPulsing ? 1.32 : 1;
    target.set(scale, scale, scale);
    meshRef.current.scale.lerp(target, 0.12);
  });

  return (
    <Sphere ref={meshRef} args={[1, 96, 96]}>
      <MeshDistortMaterial
        color="#13b8a6"
        emissive="#155e75"
        emissiveIntensity={0.55}
        roughness={0.18}
        metalness={0.18}
        distort={isPulsing ? 0.54 : 0.28}
        speed={isPulsing ? 4.6 : 1.8}
        wireframe
      />
    </Sphere>
  );
}

function SatelliteCell({ cell, index }: { cell: CellNode; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const colorByRole: Record<CellNode["role"], string> = {
    builder: "#22d3ee",
    watcher: "#f59e0b",
    researcher: "#a78bfa",
    memory: "#60a5fa",
    sensory: "#34d399"
  };

  useFrame(state => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.18 + index;
    meshRef.current.position.y += Math.sin(t) * 0.0009;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.26;
  });

  const angle = (cell.angle * Math.PI) / 180;
  const orbit = 2.05 + index * 0.06;
  const x = Math.cos(angle) * orbit;
  const y = Math.sin(angle) * orbit * 0.56;

  return (
    <group position={[x, y, -0.3]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color={colorByRole[cell.role]}
          emissive={colorByRole[cell.role]}
          emissiveIntensity={0.65}
          roughness={0.25}
        />
      </mesh>
      <line>
        <bufferGeometry
          attach="geometry"
          attributes={{
            position: new THREE.BufferAttribute(new Float32Array([0, 0, 0, -x, -y, 0.3]), 3)
          }}
        />
        <lineBasicMaterial attach="material" color={colorByRole[cell.role]} transparent opacity={0.24} />
      </line>
    </group>
  );
}

export default function PetriDish({
  pulse,
  cells
}: {
  pulse: boolean;
  cells: CellNode[];
}) {
  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Canvas camera={{ position: [0, 0, 6], fov: 46 }} dpr={[1, 1.8]}>
        <color attach="background" args={["#020409"]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 4, 5]} intensity={2.3} color="#67e8f9" />
        <pointLight position={[-4, -3, 2]} intensity={1.4} color="#a78bfa" />
        <Stars radius={80} depth={30} count={1300} factor={3} saturation={0} fade speed={0.4} />
        <MotherCell isPulsing={pulse} />
        {cells.slice(1).map((cell, index) => (
          <SatelliteCell key={cell.id} cell={cell} index={index} />
        ))}
      </Canvas>
      <div className="pointer-events-none absolute inset-0 grid-field opacity-45" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full scanline opacity-35" />
    </div>
  );
}
