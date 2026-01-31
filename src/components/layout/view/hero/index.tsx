"use client";
import React from "react";
import { COMPANIONS, CompanionId } from "@/lib/constants";
import { StatusIndicator, SectionLabel } from "./status-indicator";
import { CompanionSelector } from "./companion-selector";
import { HeroContent } from "./hero-content";
import { InteractiveStage } from "./interactive-stage";

interface HeroProps {
    activeCompanion: typeof COMPANIONS[number];
    selectedId: CompanionId;
    setSelectedId: (id: CompanionId) => void;
    isBoosting: boolean;
    logic: any;
}

export function Hero({
    activeCompanion,
    selectedId,
    setSelectedId,
    isBoosting,
    logic
}: HeroProps) {
    return (
        <div className="relative flex flex-col h-full w-full overflow-hidden">

            <div className="absolute inset-0 z-0">
                <InteractiveStage logic={logic} />
            </div>

            <div className="relative z-10 flex flex-col flex-1 w-full pointer-events-none">

                <div className="w-full px-8 md:px-12 pt-16 md:pt-20 flex justify-between items-start pointer-events-auto">
                    <div className="flex flex-col gap-1 2xl:gap-1.5">
                        <SectionLabel>Neural.Link</SectionLabel>
                        <StatusIndicator isBoosting={isBoosting} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <SectionLabel className="-mr-[0.4em]">Protocol: Select</SectionLabel>
                        <span className="text-[8px] 2xl:text-[10px] font-mono text-zinc-500 uppercase">
                            ACTIVE_MODE: {activeCompanion.id}
                        </span>
                    </div>
                </div>

                <div className="flex-1 w-full" />

                <div className="w-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8">

                    <div className="w-full md:max-w-[320px] 2xl:max-w-[450px] space-y-5 pointer-events-auto">
                        <div className="space-y-3">
                            <SectionLabel>Select Interface</SectionLabel>
                            <div className="flex gap-2 2xl:gap-4 w-full">
                                {COMPANIONS.map((comp, idx) => (
                                    <CompanionSelector
                                        key={comp.id}
                                        index={idx}
                                        isActive={selectedId === comp.id}
                                        onClick={() => setSelectedId(comp.id)}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="hidden sm:block text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-tight">
                            Initialize synchronization to deploy the active entity into the workspace.
                        </p>
                    </div>

                    <div className="pointer-events-auto">
                        <HeroContent
                            selectedId={selectedId}
                            name={activeCompanion.name}
                            bio={activeCompanion.bio}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}