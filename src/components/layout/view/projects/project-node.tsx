"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown } from "lucide-react";

interface ProjectNodeProps {
    project: any;
    isActive: boolean;
    isHovered: boolean;
    onSelect: (id: string) => void;
    onHover: (project: any | null) => void;
    position: { left: string; top: string };
}

export function ProjectNode({ project, isActive, isHovered, onSelect, onHover, position }: ProjectNodeProps) {
    const isBest = project.isBest;

    return (
        <div className="absolute z-30 -translate-x-1/2 -translate-y-1/2" style={position}>
            <div className="flex items-center gap-3">
                <motion.button
                    onClick={() => onSelect(project.id)}
                    onMouseEnter={() => onHover(project)}
                    onMouseLeave={() => onHover(null)}
                    whileHover={{ scale: 1.2 }}
                    className="relative flex items-center justify-center p-2 cursor-pointer"
                >
                    <div className={`w-3 h-3 rounded-full border-2 border-white dark:border-zinc-950 z-10 transition-all duration-500
                        ${isActive
                            ? (isBest ? 'bg-amber-400 shadow-[0_0_15px_#fbbf24]' : 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]')
                            : 'bg-zinc-400 dark:bg-zinc-700'} `}
                    />
                    {isBest && <Crown size={12} className="absolute -top-3 text-amber-500 z-30 animate-pulse" />}
                </motion.button>

                <div className="flex flex-col pointer-events-none select-none">
                    <span className={`text-[9px] font-black uppercase italic tracking-wider transition-colors duration-500 ${isActive ? (isBest ? 'text-amber-500' : 'text-cyan-500') : 'text-zinc-500/80'}`}>
                        {project.title}
                    </span>
                    <div className={`h-[1px] w-4 transition-all duration-500 ${isActive ? (isBest ? 'bg-amber-500 w-full' : 'bg-cyan-500 w-full') : 'bg-zinc-700 w-4'}`} />
                </div>
            </div>

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 0 }}
                        animate={{ opacity: 1, scale: 1, y: -10 }}
                        exit={{ opacity: 0, scale: 0.8, y: 0 }}
                        className="absolute bottom-full mb-4 left-0 z-[100] w-52 overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-md shadow-2xl pointer-events-none"
                    >
                        <div className="relative h-24 w-full bg-zinc-900">
                            <img src={project.image} alt="" className="h-full w-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        </div>
                        <div className="p-3">
                            <div className="flex items-center gap-1.5 mb-1">
                                <div className={`w-1.5 h-1.5 rounded-full ${isBest ? 'bg-amber-400' : 'bg-cyan-500'}`} />
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-400">Node_{project.id}</span>
                            </div>
                            <p className={`text-[10px] font-bold uppercase truncate ${isBest ? 'text-amber-400' : 'text-white'}`}>
                                {project.title}
                            </p>
                            <p className="text-[8px] text-zinc-400 line-clamp-1 mt-1 font-mono">{project.year} // SYSTEM_LINK</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}