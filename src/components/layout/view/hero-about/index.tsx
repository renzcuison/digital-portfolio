"use client";

import React from "react";
import { Pages, PageId } from "@/lib/constants";
import { ObjectStage } from "./object-stage";
import { Grid } from "../../../ui/env/background";
import { HeroContent } from "./content";

interface HeroProps {
    activePage: typeof Pages[number];
    selectedId: PageId;
    setSelectedId: (id: PageId) => void;
    logic: any;
}

export function Hero({ activePage, selectedId, setSelectedId, logic }: HeroProps) {
    return (
        <div className="relative flex flex-col h-full w-full overflow-hidden bg-[#fdfdfc]">
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-[0.12] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="absolute inset-0 z-0 mix-blend-multiply opacity-90">
                <Grid mouseX={logic.mouseRawX} mouseY={logic.mouseRawY} />
            </div>

            <div className="absolute inset-0 z-10">
                <ObjectStage logic={logic} />
            </div>

            <HeroContent
                activePage={activePage}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
        </div>
    );
}