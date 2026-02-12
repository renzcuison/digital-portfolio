"use client";
import React from "react";
import { motion } from "framer-motion";

interface PageSelectorProps {
    pageName: string;
    isActive: boolean;
    onClick: () => void;
}

export const PageSelector = React.memo(function PageSelector({
    pageName,
    isActive,
    onClick
}: PageSelectorProps) {
    return (
        <button
            onClick={onClick}
            className="group relative flex items-center justify-end w-fit ml-auto h-12 cursor-pointer outline-none pointer-events-auto"
            aria-label={`Go to ${pageName}`}
        >
            <div className="flex items-center justify-end relative">
                <motion.span
                    initial={false}
                    animate={{
                        color: isActive ? "#8E8E8A" : "#000000",
                    }}
                    style={{
                        display: "block",
                        transformOrigin: "right center",
                        willChange: "transform",
                    }}
                    className="text-[16px] font-bold tracking-[0.1em] uppercase subpixel-antialiased whitespace-nowrap leading-none transition-opacity duration-300 group-hover:opacity-50"
                >
                    {pageName}
                </motion.span>
            </div>
        </button>
    );
});