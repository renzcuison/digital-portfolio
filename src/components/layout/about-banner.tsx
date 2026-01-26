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
                <div className="flex flex-col gap-1.5 shrink-0 pt-4 self-start md:self-auto">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white mb-2">
                        Core.Stack
                    </span>
                    {techStack.map((item, i) => (
                        <motion.span
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="text-[8px] 2xl:text-[10px] font-mono text-zinc-500 uppercase tracking-tighter"
                        >
                            {`> ${item}_0${i + 1}`}
                        </motion.span>
                    ))}
                </div>

                <div className="relative shrink-0 flex items-center justify-center [perspective:1000px]">
                    <div className="relative w-64 h-80 rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-white/10 bg-black shadow-2xl">

                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                                rotateY: [-8, 8, -8]
                            }}
                            transition={{
                                y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                                rotateY: { repeat: Infinity, duration: 7, ease: "easeInOut" }
                            }}
                            className="w-full h-full relative z-10 flex items-center justify-center"
                        >
                            <img
                                src="/renz.png"
                                alt="Renz Cuison"
                                className="w-full h-full object-contain scale-80 grayscale brightness-[1.3] contrast-[250%] opacity-90 transition-all duration-500"
                                style={{
                                    filter: "url(#subtle-laser-glitch) grayscale(1) brightness(1.1) contrast(2.5)"
                                }}
                            />
                        </motion.div>

                        <motion.div
                            animate={{ y: [-20, 320] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute inset-x-0 h-[1px] bg-white/20 shadow-[0_0_15px_white] z-30"
                        />

                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_40px_rgba(255,255,255,0.02)] z-40" />
                    </div>

                    <div className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 px-2.5 py-1 rounded-md z-50">
                        <span className="text-[7px] font-mono text-zinc-950 dark:text-white font-bold uppercase tracking-[0.2em]">
                            Entity_v.01
                        </span>
                    </div>
                </div>

                <div className="flex-1 space-y-6 md:space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                            About Me
                        </span>
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-slate-950 dark:text-white uppercase leading-[0.8]">
                            Renz Cuison
                        </h2>
                    </div>

                    <p className="max-w-[450px] text-xs md:text-[11px] lg:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                        A Fullstack Developer. Creation and innovation drive my passion for building digital experiences that leave a lasting impact. With expertise in both frontend and backend technologies, I craft seamless and dynamic web applications.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-4">
                        <motion.a
                            href="/resume.pdf"
                            target="_blank"
                            className="group relative px-8 py-3 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer bg-transparent"
                        >
                            <motion.div
                                className="absolute inset-0 bg-slate-950 dark:bg-white"
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            />
                            <span className="relative text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                                View Resume
                            </span>
                        </motion.a>

                        <motion.button
                            className="group relative px-8 py-3 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer bg-transparent"
                        >
                            <motion.div
                                className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800"
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            />
                            <span className="relative text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-slate-950 dark:group-hover:text-white transition-colors duration-300">
                                Learn More
                            </span>
                        </motion.button>
                    </div>
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