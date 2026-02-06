"use client";
import React from "react";

export function Logo({ menuOpen }: { menuOpen: boolean }) {
    return (
        <div className={`transition-all duration-700 ${menuOpen ? "opacity-0 -translate-y-1" : "opacity-100"}`}>
            <div className="flex items-center space-x-4 select-none">
                <span className="text-lg font-medium tracking-[0.4em] uppercase text-black antialiased">
                    Renz
                </span>
                <div className="h-4 w-[1.2px] bg-black/30 rotate-[25deg]" />
                <span className="text-lg font-medium tracking-[0.4em] uppercase text-black antialiased">
                    Cuison
                </span>
            </div>
        </div>
    );
}