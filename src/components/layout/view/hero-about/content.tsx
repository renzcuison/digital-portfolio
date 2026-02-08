"use client";

import React from "react";
import { Pages, PageId } from "@/lib/constants";
import { PageSelector } from "./navigation";

const navStyle = "text-[10px] font-medium tracking-[0.2em] text-[#000000] subpixel-antialiased select-none lowercase";

export function HeroContent({ activePage, selectedId, setSelectedId }: any) {
    return (
        <div className="relative z-20 flex flex-col flex-1 w-full pointer-events-none h-full">
            <div className="absolute top-[6rem] left-0 px-8 md:px-12 flex flex-col items-start -z-10">
                <div className="max-w-[320px] md:max-w-[420px] text-left flex flex-col gap-8">

                    <p className="text-[12px] font-semibold text-[#000000] tracking-[0.2em] leading-[1.8] lowercase">
                        i believe web design should be more than just boxes. I’m obsessed with expressive code
                        and 3D, always trying to build things that actually feel interesting to interact with.
                    </p>

                    <p className="text-[12px] font-semibold text-[#000000] tracking-[0.2em] leading-[1.8] lowercase opacity-60">
                        this is frieren, my favorite anime character—reimagined as an interactive 3d model.
                        feel free to interact with her.
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full" />

            <div className="w-full p-8 md:p-12 flex justify-between items-end">
                <div className="hidden md:flex flex-col gap-6 pointer-events-auto">
                    <div className="flex flex-col">
                        <p className={`${navStyle} leading-[2] font-light text-[#000000]`}>
                            based in the philippines, aspiring creative dev. <br />
                            fullstack background, specialized in frontend dev.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] font-medium tracking-[0.2em] text-[#8E8E8A] lowercase">
                            © renz cuison
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-end pointer-events-auto">
                    {Pages.map((page) => (
                        <PageSelector
                            key={page.id}
                            pageName={page.name}
                            isActive={selectedId === page.id}
                            onClick={() => setSelectedId(page.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}