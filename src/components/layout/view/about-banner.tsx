"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ABOUT_IMAGES, ABOUT_TEXT } from "@/lib/constants";
import { useAboutScroll } from "@/hooks/use-about-scroll";

const ImageCard = ({ src, alt }: { src: string, alt: string }) => (
    <div className="relative shrink-0 flex-none [perspective:1000px]
        w-[calc((100vw-4.5rem)/3)]
        md:w-[calc((100vw-7rem)/3)]
        lg:w-[35vh]
        xl:w-[45vh]
        max-w-full">

        <div className="relative aspect-square rounded-[1.5vh] md:rounded-[3vh] overflow-hidden border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-black shadow-xl backdrop-blur-sm transition-all duration-500">
            <div
                className="absolute inset-0 z-30 pointer-events-none opacity-[0.12] mix-blend-overlay"
                style={{
                    background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
                                 linear-gradient(90deg, rgba(0, 150, 255, 0.1), rgba(0, 255, 255, 0.05), rgba(0, 100, 255, 0.1))`,
                    backgroundSize: '100% 4px, 3px 100%'
                }}
            />

            <div className="w-full h-full flex items-center justify-center relative p-[10%]">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain object-center z-20 transition-all duration-700"
                    style={{
                        filter: 'url(#digital-stream) brightness(var(--img-brightness, 1)) contrast(1.1) sepia(1) saturate(3) hue-rotate(190deg)',
                        WebkitMaskImage: `radial-gradient(circle at center, black 35%, transparent 92%), linear-gradient(to bottom, black 65%, transparent 95%)`,
                        maskImage: `radial-gradient(circle at center, black 35%, transparent 92%), linear-gradient(to bottom, black 65%, transparent 95%)`,
                        WebkitMaskComposite: 'source-in',
                        maskComposite: 'intersect',
                    }}
                />
            </div>
        </div>
    </div>
);

export function AboutBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { yTranslate, opacity } = useAboutScroll(containerRef);

    return (
        <section ref={containerRef} className="relative w-full pt-12 pb-24 px-8 md:px-12 overflow-hidden bg-transparent">
            <svg className="absolute w-0 h-0">
                <filter id="digital-stream">
                    <feTurbulence type="fractalNoise" baseFrequency="0 0.15" numOctaves="1" result="warp">
                        <animate attributeName="baseFrequency" dur="2s" values="0 0.15; 0 0.18; 0 0.15" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" />
                </filter>
            </svg>

            <motion.div style={{ opacity, y: yTranslate }} className="relative z-10 w-full flex flex-col xl:flex-row gap-8 lg:gap-12 items-start justify-between">
                <div className="w-full xl:flex-1 space-y-8 z-20 flex flex-col justify-center">
                    <div className="space-y-1">
                        <span className="text-[10px] 2xl:text-xs font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white">
                            {ABOUT_TEXT.label}
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold uppercase italic text-slate-950 dark:text-white leading-none text-left">
                            {ABOUT_TEXT.name}
                        </h2>
                    </div>

                    <p className="max-w-2xl text-xs md:text-sm lg:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                        {ABOUT_TEXT.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
                        {["View Resume", "Contact Me"].map((text) => (
                            <motion.button
                                key={text}
                                initial="initial"
                                whileHover="hover"
                                onClick={() => text === "View Resume" && window.open("/resume.pdf", "_blank")}
                                className="group relative px-8 h-12 md:h-10 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer w-full sm:w-auto sm:min-w-[150px]"
                            >
                                <motion.div
                                    variants={{ initial: { y: "100%" }, hover: { y: 0 } }}
                                    transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                    className="absolute inset-0 bg-slate-950 dark:bg-white"
                                />
                                <span className="relative text-xs md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                                    {text}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="w-full xl:flex-[1.5] relative">
                    <div className="grid grid-cols-3 gap-3 lg:gap-3">
                        {ABOUT_IMAGES.map((img) => (
                            <ImageCard key={img.id} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section >
    );
}

export default AboutBanner;