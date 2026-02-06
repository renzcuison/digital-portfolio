"use client";
import React from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

export function ProjectHeroCard({ project }: { project: any }) {
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
                    <h3 className="text-2xl md:text-3xl lg:text-5xl font-extrabold uppercase tracking-tighter leading-[1.1] md:leading-[0.9] text-slate-950 dark:text-white max-w-full break-words [text-wrap:balance]">
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