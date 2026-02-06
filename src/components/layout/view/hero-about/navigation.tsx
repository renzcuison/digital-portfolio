"use client";
import React from "react";
import { motion } from "framer-motion";

interface PageSelectorProps {
    index: number;
    isActive: boolean;
    onClick: () => void;
}

const ActiveBlue = "#2563EB";

export const PageSelector = React.memo(function PageSelector({
    index,
    isActive,
    onClick
}: PageSelectorProps) {
    return (
        <button
            onClick={onClick}
            className="group relative w-12 h-12 flex items-center justify-center cursor-pointer outline-none pointer-events-auto"
            aria-label={`Go to page ${index + 1}`}
        >
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                <motion.circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="transparent"
                    stroke={isActive ? ActiveBlue : "currentColor"}
                    strokeWidth={isActive ? "1.5" : "1"}
                    className={isActive ? "opacity-100" : "opacity-10 group-hover:opacity-30"}
                    initial={false}
                    animate={{
                        pathLength: isActive ? 1 : 0.15,
                        rotate: isActive ? 0 : -90,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25
                    }}
                    style={{
                        strokeLinecap: "round",
                    }}
                />
            </svg>

            <span
                className={`relative font-mono text-[11px] tracking-tight transition-all duration-300 ${isActive
                    ? "text-black font-medium scale-110"
                    : "text-black/30 group-hover:text-black font-medium"
                    }`}
            >
                {String(index + 1).padStart(2, '0')}
            </span>

            {isActive && (
                <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#2563EB]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </button>
    );
});