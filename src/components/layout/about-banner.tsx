"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCard = ({ src, alt, isCenter = false }: { src: string, alt: string, isCenter?: boolean }) => (
    <div className="relative shrink-0 [perspective:1000px] w-full xs:w-[280px] md:w-56 lg:w-64 xl:w-72">
        <div className={`relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border bg-[#050505] shadow-2xl transition-all duration-700 ${isCenter ? 'border-zinc-200/40 dark:border-white/10' : 'border-zinc-200/10 dark:border-white/5'
            }`}>
            <div className="absolute inset-0 z-30 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
            <div className="w-full h-full flex items-end justify-center relative">
                <div
                    className={`absolute bottom-0 w-full h-2/3 blur-[80px] rounded-full z-0 transition-opacity duration-1000 ${isCenter ? 'opacity-100 bg-white/10' : 'opacity-40 bg-white/5'
                        }`}
                    style={{ mixBlendMode: 'soft-light' }}
                />
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-[92%] object-contain object-bottom transition-all duration-700 z-20"
                    style={{
                        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                        filter: isCenter
                            ? 'brightness(1.1) contrast(1.1) drop-shadow(0 0 20px rgba(255,255,255,0.1))'
                            : 'brightness(0.8) contrast(1.2) grayscale(0.5)',
                    }}
                />
                <div className="absolute inset-0 z-25 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
            </div>
        </div>
    </div>
);

export function AboutBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState([
        { id: 1, src: "/renz-left.png", alt: "Renz Left" },
        { id: 2, src: "/renz-digital.png", alt: "Digital Renz" },
        { id: 3, src: "/renz-right.png", alt: "Renz Right" },
    ]);

    const rotateRight = () => setImages((prev) => [prev[1], prev[2], prev[0]]);
    const rotateLeft = () => setImages((prev) => [prev[2], prev[0], prev[1]]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
    const yTranslate = useTransform(smoothProgress, [0, 1], [30, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full pt-12 pb-24 px-8 md:px-12 overflow-hidden flex items-center justify-start bg-transparent">
            <motion.div style={{ opacity, y: yTranslate }} className="relative z-10 w-full flex flex-col xl:flex-row gap-16 xl:gap-8 items-center justify-between">

                <div className="flex-1 space-y-6 md:space-y-8 z-20">
                    <div className="space-y-2">
                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">About Me</span>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-black italic tracking-tighter text-slate-950 dark:text-white uppercase leading-[0.8]">Renz Cuison</h2>
                    </div>
                    <p className="max-w-[450px] text-xs md:text-[11px] lg:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                        Hi, I'm a creative developer (on web). I like making things cool. I work efficiently as it shows in my works. I like coding, and the fun's on another level when I'm in control. Everything I build is simple, sleek, and just works well.
                    </p>
                    <div className="grid grid-cols-2 md:flex gap-3 pt-4 w-full md:w-auto">
                        <a href="/resume.pdf" target="_blank" className="group relative w-full md:w-auto px-4 md:px-8 py-3 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden bg-transparent">
                            <div className="absolute inset-0 bg-slate-950 dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white dark:group-hover:text-black transition-colors">View Resume</span>
                        </a>
                        <button className="group relative w-full md:w-auto px-4 md:px-8 py-3 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden bg-transparent">
                            <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">Learn More</span>
                        </button>
                    </div>
                </div>

                <div className="flex-[2] relative w-full flex flex-col items-center justify-center">

                    <button onClick={rotateLeft} className="absolute left-0 xl:left-[-20px] z-50 p-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all active:scale-90 hidden md:flex">
                        <ChevronLeft size={20} />
                    </button>

                    <button onClick={rotateRight} className="absolute right-0 xl:right-[-20px] z-50 p-4 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-white hover:bg-white hover:text-black transition-all active:scale-90 hidden md:flex">
                        <ChevronRight size={20} />
                    </button>

                    {/* Image Track */}
                    <div className="flex items-center justify-center gap-4 lg:gap-8 overflow-visible relative">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {images.map((img, index) => {
                                const isCenter = index === 1;
                                return (
                                    <motion.div
                                        key={img.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: isCenter ? 1 : 0.3,
                                            scale: isCenter ? 1 : 0.9,
                                            zIndex: isCenter ? 30 : 10
                                        }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 260, damping: 25 }}
                                        className={index === 0 || index === 2 ? "hidden md:block" : "block"}
                                    >
                                        <ImageCard src={img.src} alt={img.alt} isCenter={isCenter} />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    <div className="flex md:hidden gap-6 mt-8">
                        <button onClick={rotateLeft} className="p-4 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/40 shadow-lg active:scale-90">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={rotateRight} className="p-4 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-black/40 shadow-lg active:scale-90">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

            </motion.div>
        </section>
    );
}