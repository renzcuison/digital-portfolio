"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function AboutBanner() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const yTranslate = useTransform(smoothProgress, [0, 1], [30, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

    const techStack = ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Framer"];

    return (
        <section
            ref={containerRef}
            className="relative w-full pt-4 pb-24 px-8 md:px-12 overflow-hidden flex items-center justify-start bg-transparent"
        >
            <motion.div
                style={{ opacity, y: yTranslate }}
                className="relative z-10 w-full flex flex-col md:flex-row gap-12 md:gap-24 items-center"
            >
                {/* name/bio and buttons */}
                <div className="flex-1 space-y-6 md:space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                            About Me
                        </span>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black italic tracking-tighter text-slate-950 dark:text-white uppercase leading-[0.8]">
                            Renz Cuison
                        </h2>
                    </div>

                    <p className="max-w-[450px] text-xs md:text-[11px] lg:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>

                    <div className="grid grid-cols-2 md:flex gap-3 pt-4 w-full md:w-auto">
                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            className="group relative w-full md:w-auto px-4 md:px-8 py-3 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer bg-transparent"
                        >
                            <motion.div
                                className="absolute inset-0 bg-slate-950 dark:bg-white"
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            />
                            <span className="relative text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                                View Resume
                            </span>
                        </motion.a>

                        <motion.button
                            className="group relative w-full md:w-auto px-4 md:px-8 py-3 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer bg-transparent"
                        >
                            <motion.div
                                className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800"
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            />
                            <span className="relative text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-slate-950 dark:group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                Learn More
                            </span>
                        </motion.button>
                    </div>

                </div>
                {/* name/bio and buttons end*/}

                {/* image start */}
                <div className="w-full flex flex-row md:contents items-center justify-center md:justify-start gap-6 md:gap-10">
                    <div className="relative shrink-0 flex items-center justify-center [perspective:1000px]">
                        <div className="relative w-40 h-52 md:w-64 md:h-80 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-white/10 bg-black shadow-2xl">

                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                    rotateY: [-8, 8, -8]
                                }}
                                transition={{
                                    y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                                    rotateY: { repeat: Infinity, duration: 7, ease: "easeInOut" }
                                }}
                                className="w-full h-full relative z-10 flex items-center justify-center p-4"
                            >
                                <img
                                    src="/renz.png"
                                    alt="Renz Cuison"
                                    className="w-full h-full object-contain brightness-0 invert contrast-[150%] opacity-80 transition-all duration-500"
                                    style={{
                                        filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5)) url(#subtle-laser-glitch)"
                                    }}
                                />
                            </motion.div>

                            <motion.div
                                animate={{ y: [-20, 320] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                                className="absolute inset-x-0 h-[1px] bg-white/20 shadow-[0_0_10px_white] z-30"
                            />

                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] z-40" />
                        </div>

                        <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 px-1.5 md:px-2.5 py-0.5 md:py-1 rounded-md z-50">
                            <span className="text-[6px] md:text-[7px] font-mono text-zinc-950 dark:text-white font-bold uppercase tracking-[0.2em]">
                                Entity_v.01
                            </span>
                        </div>
                    </div>
                    {/* image end */}
                </div>

            </motion.div>

            <svg className="hidden">
                <defs>
                    <filter id="subtle-laser-glitch">
                        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.1" numOctaves="2" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>
        </section>
    );
}