import React from "react";

export function StatusIndicator({ isBoosting }: { isBoosting: boolean }) {
    return (
        <span className={`text-[8px] 2xl:text-[10px] font-mono flex items-center gap-2 transition-colors duration-300 ${isBoosting ? "text-cyan-400 font-bold" : "text-zinc-500"}`}>
            <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping ${isBoosting ? "bg-red-400" : "bg-cyan-400"}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isBoosting ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"}`} />
            </span>
            {isBoosting ? "SYSTEM_BOOST_ACTIVE_099" : "STABLE_CONNECTION_001"}
        </span>
    );
}

export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`text-[10px] 2xl:text-xs font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white ${className}`}>
            {children}
        </span>
    );
}