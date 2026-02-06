"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ABOUT_IMAGES, ABOUT_TEXT } from "@/lib/constants";
import { useAboutScroll } from "@/hooks/ui/use-about-scroll";
import { ImageCard, DigitalStreamFilter } from "./image-card";

export function AboutBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { yTranslate, opacity } = useAboutScroll(containerRef);

    return (
        <section ref={containerRef} className="relative w-full pt-12 pb-24 px-8 md:px-12 overflow-hidden bg-transparent">
            <DigitalStreamFilter />

            <motion.div
                style={{ opacity, y: yTranslate }}
                className="relative z-10 w-full flex flex-col xl:flex-row gap-8 lg:gap-32 items-stretch"
            >
                <div className="w-full xl:w-[500px] shrink-0 z-20 flex flex-col justify-between py-1">
                    <div className="space-y-8">
                        <div className="space-y-1">
                            <span className="text-[10px] 2xl:text-xs font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white">
                                {ABOUT_TEXT.label}
                            </span>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold uppercase italic text-slate-950 dark:text-white leading-none text-left">
                                {ABOUT_TEXT.name}
                            </h2>
                        </div>
                        <p className="max-w-xl text-xs md:text-sm lg:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                            {ABOUT_TEXT.description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-12 w-full">
                        <ActionButton text="View Resume" onClick={() => window.open("/resume.pdf", "_blank")} />
                        <ActionButton text="Contact Me" onClick={() => { /* scroller */ }} />
                    </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-row gap-2 md:gap-3 overflow-hidden">
                    {ABOUT_IMAGES.slice(0, 3).map((img) => (
                        <ImageCard key={img.id} src={img.src} alt={img.alt} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

const ActionButton = ({ text, onClick }: { text: string, onClick: () => void }) => (
    <motion.button
        whileHover="hover"
        onClick={onClick}
        className="group relative px-8 h-12 md:h-10 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer w-full sm:w-auto sm:min-w-[150px]"
    >
        <motion.div
            variants={{ hover: { y: 0 } }}
            initial={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute inset-0 bg-slate-950 dark:bg-white"
        />
        <span className="relative text-xs md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
            {text}
        </span>
    </motion.button>
);