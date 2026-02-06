"use client";

import React from "react";
import { Pages, PageId } from "@/lib/constants";
import { PageSelector } from "./navigation";

interface HeroContentProps {
    activePage: typeof Pages[number];
    selectedId: PageId;
    setSelectedId: (id: PageId) => void;
}

export function HeroContent({ activePage, selectedId, setSelectedId }: HeroContentProps) {
    return (
        <div className="relative z-20 flex flex-col flex-1 w-full pointer-events-none h-full">
            <div className="flex-1 w-full" />

            <div className="w-full p-8 md:p-12 flex justify-between items-end">

                <div className="flex flex-col gap-10 pointer-events-auto">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-5">
                            <span className="text-[11px] md:text-xs uppercase tracking-[0.6em] text-black font-medium antialiased select-none">
                                {activePage.name}
                            </span>
                            <div className="h-3.5 w-[1.2px] bg-[#2563EB] rotate-[25deg]" />
                        </div>
                    </div>

                    <div className="flex gap-2 items-start -ml-[6px]">
                        {Pages.map((page, idx) => (
                            <PageSelector
                                key={page.id}
                                index={idx}
                                isActive={selectedId === page.id}
                                onClick={() => setSelectedId(page.id)}
                            />
                        ))}
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-4 pointer-events-auto">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-black font-medium antialiased">
                            Digital Portfolio
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-medium text-black/30 tracking-[0.3em] uppercase">
                                All Rights Reserved
                            </span>
                        </div>
                    </div>

                    <div className="h-6 w-[1.2px] bg-black/20 rotate-[25deg]" />

                    <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-black tracking-[0.2em]">
                            ©
                        </span>
                        <span className="text-[9px] font-medium text-black tracking-[0.1em]">
                            2026
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}