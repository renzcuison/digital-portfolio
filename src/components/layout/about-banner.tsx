"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const IMAGES = [
    { id: 1, src: "/renz-left.png", alt: "Left View" },
    { id: 2, src: "/renz-digital.png", alt: "Center View" },
    { id: 3, src: "/renz-right.png", alt: "Right View" },
];

const ImageCard = ({ src, alt }: { src: string, alt: string }) => (
    <div className="relative shrink-0 flex-none [perspective:1000px]
        w-[calc((100vw-4.5rem)/3)]
        md:w-[calc((100vw-7rem)/3)]
        lg:w-[35vh]
        xl:w-[45vh]
        max-w-full">

        <svg className="absolute w-0 h-0">
            <filter id="digital-stream">
                <feTurbulence type="fractalNoise" baseFrequency="0 0.15" numOctaves="1" result="warp">
                    <animate attributeName="baseFrequency" dur="2s" values="0 0.15; 0 0.18; 0 0.15" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" />
            </filter>
        </svg>

        <div className="relative aspect-square rounded-[1.5vh] md:rounded-[3vh] overflow-hidden border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-black shadow-xl backdrop-blur-sm transition-all duration-500">
            <div className="w-full h-full flex items-center justify-center relative p-[10%]">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-contain object-center z-20 grayscale contrast-125 dark:grayscale-0 dark:invert-0 transition-all duration-700"
                    style={{
                        filter: 'url(#digital-stream) brightness(var(--img-brightness, 1)) contrast(1.1)',
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
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "center center"] });
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const yTranslate = useTransform(smoothProgress, [0, 1], [30, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full pt-12 pb-24 px-6 md:px-12 overflow-hidden bg-transparent">
            <motion.div style={{ opacity, y: yTranslate }} className="relative z-10 w-full flex flex-col xl:flex-row gap-8 lg:gap-12 items-center justify-between">

                <div className="w-full xl:flex-1 space-y-8 z-20 flex flex-col justify-center">
                    <div className="space-y-1">
                        <span className="text-[10px] 2xl:text-xs font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white">
                            Creative Web Developer
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold uppercase italic text-slate-950 dark:text-white leading-none text-left">
                            Renz Cuison
                        </h2>
                    </div>

                    <p className="max-w-2xl text-xs md:text-sm lg:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                        I am a Creative Web Developer who aspires to create really nice digital experiences. While I am very fond of creative web development, I have a good background in Full Stack Development creating and engineering web systems.
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
                                    variants={{
                                        initial: { y: "100%" },
                                        hover: { y: 0 }
                                    }}
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
                        {IMAGES.map((img) => (
                            <ImageCard key={img.id} src={img.src} alt={img.alt} />
                        ))}
                    </div>
                </div>

            </motion.div>
        </section >
    );
}

export default AboutBanner;