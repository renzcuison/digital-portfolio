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
            className="md:hidden relative z-[210] w-10 h-10 flex flex-col items-end justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle Menu"
        >
            <motion.span
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="h-[1.2px] w-5 bg-slate-950 dark:bg-white block origin-center transition-colors"
            />
            <motion.span
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="h-[1.2px] w-5 bg-slate-950 dark:bg-white block origin-center transition-colors"
            />
        </button>
    );
}