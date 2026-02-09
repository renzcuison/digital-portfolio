"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            <div className="flex items-center justify-end">
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0, x: 10 }}
                            animate={{ opacity: 1, scaleX: 1, x: 0 }}
                            exit={{ opacity: 0, scaleX: 0, x: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="mr-4 w-6 h-[1.5px] bg-[#000000] rotate-[-10deg] origin-right"
                        />
                    )}
                </AnimatePresence>

                <motion.span
                    initial={false}
                    animate={{
                        color: "#000000",
                    }}
                    style={{
                        display: "block",
                        transformOrigin: "right center",
                        willChange: "transform",
                    }}
                    className="text-[19px] font-bold tracking-[0.2em] lowercase subpixel-antialiased whitespace-nowrap leading-none transition-opacity duration-300 group-hover:opacity-60"
                >
                    {pageName}
                </motion.span>
            </div>
        </button>
    );
});