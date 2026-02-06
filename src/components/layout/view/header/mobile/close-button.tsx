"use client";

import React from "react";
import { motion } from "framer-motion";

interface MobileToggleProps {
    menuOpen: boolean;
    setMenuOpen: (val: boolean) => void;
}

export function MobileToggle({ menuOpen, setMenuOpen }: MobileToggleProps) {
    return (
        <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-[210] w-10 h-10 flex flex-col items-end justify-center group focus:outline-none"
            aria-label="Toggle Menu"
        >
            <div className="flex flex-col items-end gap-[6px]">
                <motion.span
                    animate={
                        menuOpen
                            ? { rotate: 45, y: 4, width: "24px" }
                            : { rotate: 0, y: 0, width: "20px" }
                    }
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[1.2px] bg-black block origin-center antialiased"
                />

                <motion.span
                    animate={
                        menuOpen
                            ? { rotate: -45, y: -4, width: "24px" }
                            : { rotate: 25, y: 0, width: "12px" }
                    }
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-[1.2px] bg-black block origin-center antialiased"
                />
            </div>

            <motion.div
                className="absolute inset-0 bg-neutral-100 rounded-full -z-10 scale-0 group-hover:scale-100 transition-transform duration-300"
            />
        </button>
    );
}