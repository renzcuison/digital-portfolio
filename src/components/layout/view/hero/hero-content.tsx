import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroContentProps {
    selectedId: string;
    name: string;
    bio: string;
}

export function HeroContent({ selectedId, name, bio }: HeroContentProps) {
    return (
        <div className="w-full md:max-w-[350px] lg:max-w-[450px] text-left md:text-right pointer-events-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-3 md:space-y-2"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold uppercase italic text-slate-950 dark:text-white leading-none">
                        {name}
                    </h2>
                    <p className="text-xs md:text-sm lg:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium md:ml-auto tracking-tight">
                        {bio}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}