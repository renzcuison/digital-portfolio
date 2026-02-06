"use client";
import { Html, Float } from "@react-three/drei";

export function ContentStage() {
  return (
    <group position={[-0.8, 0, -3]}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
        <Html
          transform
          distanceFactor={12}
          className="pointer-events-none select-none"
        >
          <div className="flex flex-col items-start font-medium antialiased max-w-sm">

            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] tracking-[0.6em] text-[#2563EB]">
                BIOGRAPHY / 01
              </span>
              <div className="h-[1.2px] w-12 bg-[#2563EB]/20" />
            </div>

            <h1 className="text-[9rem] text-black/[0.03] leading-[0.7] tracking-tighter uppercase mb-6">
              RENZ
            </h1>

            <div className="flex flex-col gap-8 ml-1">
              <p className="text-[15px] leading-relaxed text-black/70 tracking-tight max-w-[280px]">
                A Design Engineer bridging the gap between
                <span className="text-black font-semibold"> pure aesthetics </span>
                and functional performance. Focused on crafting
                immersive digital environments that feel
                as precise as they are fluid.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-[#2563EB]">Current Focus</span>
                  <span className="text-[12px] text-black/50 uppercase tracking-widest">3D Web / Creative Development</span>
                </div>

                <div className="h-10 w-[1.2px] bg-black/10 rotate-[25deg] origin-top mt-2" />
              </div>
            </div>

          </div>
        </Html>
      </Float>
    </group>
  );
}