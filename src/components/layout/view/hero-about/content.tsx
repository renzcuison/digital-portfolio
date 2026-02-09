"use client";

import React from "react";
import { Pages, PageId } from "@/lib/constants";
import { PageSelector } from "./navigation";

const navStyle = "text-[10px] font-medium tracking-[0.2em] text-[#000000] subpixel-antialiased select-none lowercase";

export function HeroContent({ activePage, selectedId, setSelectedId }: any) {
    return (
        <div className="relative z-20 flex flex-col flex-1 w-full pointer-events-none h-full">
            <div className="absolute top-20 md:top-[6rem] left-0 w-full px-6 md:px-12 flex flex-col items-start -z-10">
                <div className="w-full max-xl:landscape:max-w-[200px] md:max-w-[420px] xl:max-w-[420px] flex flex-col gap-4 md:gap-8">

                    <p className="text-[clamp(7.5px,2.3vw,14px)] max-xl:landscape:text-[9px] md:text-[12px] font-medium text-black tracking-[0.2em] leading-[1.5] lowercase text-left w-full">
                        i believe web design should be more than just boxes. i’m obsessed with expressive code
                        and 3d, always trying to build things that actually feel interesting to interact with.
                    </p>

                    <p className="text-[clamp(7.5px,2.3vw,14px)] max-xl:landscape:text-[9px] md:text-[12px] font-medium text-black tracking-[0.2em] leading-[1.5] lowercase opacity-40 md:opacity-60 text-left w-full">
                        this is frieren, my favorite anime character—reimagined as an interactive 3d model.
                        feel free to interact with her.
                    </p>
                </div>
            </div>

            <div className="flex-1 w-full" />

            <div className="w-full p-8 md:p-12 flex justify-between items-end">

                <div className="flex flex-col gap-6 pointer-events-auto">
                    <div className="hidden md:flex flex-col">
                        <p className={`${navStyle} leading-[2] font-light text-[#000000]`}>
                            based in the philippines, aspiring creative dev. <br />
                            fullstack background, specialized in frontend dev.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[9px] md:text-[10px] font-medium tracking-[0.2em] text-[#8E8E8A] lowercase">
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