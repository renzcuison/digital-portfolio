"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/lib/constants";
import { ArrowUpRight, Navigation, Globe, Cpu, Crown } from "lucide-react";

export function ProjectTimeline() {
    const [activeId, setActiveId] = useState(PROJECTS[0].id);
    const [hoveredProject, setHoveredProject] = useState<any>(null);

    return (
        <section className="w-full">
            <div className="flex flex-col lg:flex-row-reverse gap-4 items-stretch h-auto lg:h-[580px]">

                <div className="relative w-full lg:w-[38%] bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-[2.5vh] overflow-visible min-h-[450px] lg:min-h-0 cursor-default">

                    <div className="absolute inset-0 opacity-30 dark:opacity-40 pointer-events-none overflow-hidden rounded-[2.5vh]">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path
                                        d="M 40 0 L 0 0 0 40"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                        className="text-zinc-300 dark:text-zinc-800"
                                    />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    <div className="absolute inset-0 p-4 flex justify-between items-start pointer-events-none opacity-30">
                        <div className="text-[8px] font-mono uppercase tracking-tighter">Lat: 14.5995° N<br />Lon: 120.9842° E</div>
                        <div className="text-[8px] font-mono uppercase text-right">Alt: 420m<br />Status: Online</div>
                    </div>

                    {PROJECTS.map((project, index) => {
                        const isBest = project.isBest;
                        const isActive = activeId === project.id;
                        const positions = [
                            { left: '25%', top: '25%' },
                            { left: '75%', top: '35%' },
                            { left: '30%', top: '60%' },
                            { left: '70%', top: '80%' },
                            { left: '50%', top: '50%' },
                        ];
                        const pos = positions[index] || { left: '50%', top: '50%' };

                        return (
                            <div key={project.id} className="absolute z-30 -translate-x-1/2 -translate-y-1/2" style={pos}>
                                <div className="flex items-center gap-3">
                                    <motion.button
                                        onClick={() => setActiveId(project.id)}
                                        onMouseEnter={() => setHoveredProject(project)}
                                        onMouseLeave={() => setHoveredProject(null)}
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
                                    {hoveredProject?.id === project.id && (
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
                    })}

                    <div className="absolute bottom-6 right-6 flex items-center gap-3">
                        <div className="flex flex-col text-right">
                            <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-[0.2em]">Map_Reference</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Sector_09_RC</span>
                        </div>
                        <Navigation size={14} className="text-cyan-500" />
                    </div>
                </div>

                <div className="flex-1 relative">
                    <AnimatePresence mode="wait">
                        {PROJECTS.filter(p => p.id === activeId).map((project) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                className="h-full"
                            >
                                <ProjectHeroCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

function ProjectHeroCard({ project }: { project: any }) {
    const isBest = project.isBest;

    return (
        <div className="h-full flex flex-col md:flex-row bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-[2.5vh] overflow-hidden transition-all duration-500">
            <div className="relative w-full md:w-[42%] h-[280px] md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10 bg-zinc-900">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000" />

                {isBest && (
                    <div className="absolute bottom-6 left-6 py-1.5 px-3 backdrop-blur-md border border-amber-400/30 bg-amber-500/20 rounded-full">
                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-amber-400">
                            <Crown size={12} /> MAGNUM OPUS
                        </span>
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col p-8 lg:p-14 justify-between">
                <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl lg:text-5xl font-extrabold uppercase italic tracking-tighter leading-[1.1] md:leading-[0.9] text-slate-950 dark:text-white max-w-full break-words [text-wrap:balance]">
                        {project.title}
                    </h3>
                    <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech?.map((t: string) => (
                            <span key={t} className="text-[10px] font-bold border border-zinc-200 dark:border-white/5 text-zinc-400 px-3 py-1 rounded-full uppercase tracking-widest">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-12">
                    <div className="flex items-center justify-between pt-8 border-t border-zinc-200 dark:border-white/10">
                        <span className="text-[10px] font-mono text-zinc-500">{project.year}</span>

                        <motion.button
                            whileHover="hover"
                            onClick={() => window.open(project.github, '_blank')}
                            className="group relative px-8 h-12 md:h-10 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer w-full sm:w-auto sm:min-w-[180px]"
                        >
                            <motion.div
                                variants={{ hover: { y: 0 } }}
                                initial={{ y: "100%" }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="absolute inset-0 bg-slate-950 dark:bg-white"
                            />
                            <span className="relative text-xs md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                                See Files
                            </span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}