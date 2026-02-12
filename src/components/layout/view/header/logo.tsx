"use client";
import React from "react";

export function Logo({ menuOpen }: { menuOpen: boolean }) {
    return (
        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] ${menuOpen ? "opacity-0" : "opacity-100"}`}>
            <div className="flex items-center select-none pointer-events-auto group cursor-crosshair">
                <div className="relative flex items-center">
                    <span className="text-[20px] font-bold tracking-[0.2em] text-black antialiased lowercase transition-all duration-500 group-hover:tracking-[0.3em]">
                        cui
                    </span>
                    <div className="ml-[1px] mr-[7px] relative flex items-center justify-center w-[28px] h-8">
                        <div
                            className="w-full h-[1px] bg-black rotate-[-10deg] origin-center transform-gpu transition-all duration-1000 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] group-hover:rotate-[350deg]"
                        />
                    </div>
                    <span className="text-[20px] font-bold tracking-[0.2em] text-black antialiased lowercase transition-all duration-500 group-hover:tracking-[0.3em]">
                        son
                    </span>
                </div>
            </div>
        </div>
    );
}