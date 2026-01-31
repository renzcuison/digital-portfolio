import React from "react";
import { motion } from "framer-motion";

interface CompanionSelectorProps {
    index: number;
    isActive: boolean;
    onClick: () => void;
}

export const CompanionSelector = React.memo(function CompanionSelector({
    index,
    isActive,
    onClick
}: CompanionSelectorProps) {
    return (
        <button
            onClick={onClick}
            className="group relative flex-1 h-12 md:h-10 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer"
        >
            <motion.div
                className="absolute inset-0 bg-slate-950 dark:bg-white"
                initial={false}
                animate={{ y: isActive ? 0 : "100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            />
            <span
                className={`relative text-xs md:text-[10px] font-bold transition-colors duration-300 ${isActive ? "text-white dark:text-black" : "text-zinc-500"
                    }`}
            >
                0{index + 1}
            </span>
        </button>
    );
});

CompanionSelector.displayName = "CompanionSelector";