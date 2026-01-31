"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SyncStatus } from "@/components/ui/feedback/sync-status";

const Companion = dynamic(() => import("@/components/ui/companion"), {
    loading: () => <div className="fixed inset-0 bg-transparent" />,
    ssr: false
});

interface InteractiveStageProps {
    logic: any;
}

export function InteractiveStage({ logic }: InteractiveStageProps) {
    const activeId = logic.activeCompanion?.id;

    return (
        <div className="relative h-screen w-full overflow-hidden select-none">
            <div className="absolute top-0 left-0 w-full h-full z-[105] flex items-center justify-center pointer-events-none">

                {logic.isMobile && (
                    <div
                        className="md:hidden w-[280px] h-[280px] pointer-events-auto rounded-full absolute"
                        onTouchStart={(e) => {
                            e.preventDefault();
                            logic.startHold();
                        }}
                        onTouchEnd={logic.stopHold}
                    />
                )}

                <div className="w-full max-w-[700px] h-[50vh] flex items-center justify-center pointer-events-none md:pointer-events-auto cursor-crosshair">
                    {activeId && (
                        <Companion
                            key={`${activeId}-${logic.activeCompanion.path}`}
                            characterId={activeId}
                            imagePath={logic.activeCompanion.path}
                            isActive={true}
                            isBoosting={logic.isBoosting}
                            isMobile={logic.isMobile}
                            mouseRawX={logic.mouseRawX}
                            mouseRawY={logic.mouseRawY}
                            onStartHold={logic.startHold}
                            onStopHold={logic.stopHold}
                            onLoad={logic.setSystemReady}
                        />
                    )}
                </div>
            </div>

            <div className={!logic.menuOpen ? "pointer-events-none" : ""}>
                <SyncStatus
                    holdProgress={logic.holdProgress}
                    isCurrentSynced={logic.isCurrentSynced}
                    show={!logic.menuOpen}
                />
            </div>
        </div>
    );
}