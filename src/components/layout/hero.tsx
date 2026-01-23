"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANIONS, CompanionId } from "@/lib/constants";

interface HeroProps {
    activeCompanion: typeof COMPANIONS[number];
    selectedId: CompanionId;
    setSelectedId: (id: CompanionId) => void;
    isBoosting: boolean;
}

export function Hero({ activeCompanion, selectedId, setSelectedId, isBoosting }: HeroProps) {
    return (
        <div className="flex flex-col flex-1 w-full">
            <div className="w-full px-8 md:px-12 mt-4 flex justify-between items-start">
                <div className="flex flex-col gap-1 2xl:gap-1.5">
                    <span className="text-[10px] 2xl:text-xs font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white">
                        Neural.Link
                    </span>
                    <span className={`text-[8px] 2xl:text-[10px] font-mono flex items-center gap-2 transition-colors duration-300 ${isBoosting ? "text-cyan-400 font-bold" : "text-zinc-500"}`}>
                        <span className="relative flex h-2 w-2">
                            {/* Outer Glow */}
                            <span className={`absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping ${isBoosting ? "bg-red-400" : "bg-cyan-400"
                                }`} />
                            {/* Inner Core */}
                            <span className={`relative inline-flex rounded-full h-2 w-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] ${isBoosting
                                    ? "bg-red-500 shadow-red-500/50"
                                    : "bg-cyan-500 shadow-cyan-500/50"
                                }`} />
                        </span>
                        {isBoosting ? "SYSTEM_BOOST_ACTIVE_099" : "STABLE_CONNECTION_001"}
                    </span>
                </div>

                <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] 2xl:text-xs font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white">
                        Protocol: Select
                    </span>
                    <span className="text-[8px] 2xl:text-[10px] font-mono text-zinc-500">
                        ACTIVE_MODE: {activeCompanion.id.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="flex-1 w-full" />

            <div className="w-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="w-full md:max-w-[320px] 2xl:max-w-[450px] space-y-5 pointer-events-auto">
                    <div className="space-y-2">
                        <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                            Select Interface
                        </h2>
                        <div className="flex gap-2 2xl:gap-4 w-full">
                            {COMPANIONS.map((comp, idx) => (
                                <button
                                    key={comp.id}
                                    onClick={() => setSelectedId(comp.id)}
                                    className="group relative flex-1 h-12 md:h-10 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-slate-950 dark:bg-white"
                                        initial={false}
                                        animate={{ y: selectedId === comp.id ? 0 : "100%" }}
                                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                    />
                                    <span className={`relative text-xs md:text-[10px] font-bold transition-colors duration-300 ${selectedId === comp.id ? "text-white dark:text-black" : "text-zinc-500"}`}>
                                        0{idx + 1}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="hidden sm:block text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-tight">
                        Initialize synchronization to deploy the active entity into the workspace.
                    </p>
                </div>

                <div className="w-full md:max-w-[350px] lg:max-w-[450px] text-left md:text-right pointer-events-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedId}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-3 md:space-y-2"
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black italic tracking-tighter text-slate-950 dark:text-white uppercase leading-[0.8]">
                                {activeCompanion.name}
                            </h1>
                            <p className="text-xs md:text-[11px] lg:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium md:ml-auto">
                                {activeCompanion.bio}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}