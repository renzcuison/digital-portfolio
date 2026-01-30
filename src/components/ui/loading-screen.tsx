"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LOADING_CIRCLE_CIRCUMFERENCE } from "@/lib/constants";
import { useLoadingProgress } from "@/hooks/use-loading-progress";

interface LoadingScreenProps {
    progress: number;
    onComplete?: () => void;
    status?: string;
}

export function LoadingScreen({ progress, onComplete, status }: LoadingScreenProps) {
    const [mounted, setMounted] = useState(false);
    const displayValue = useLoadingProgress(progress, onComplete);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-white dark:bg-black flex flex-col items-center justify-center font-mono transition-colors duration-500">
            <motion.div exit={{ opacity: 0, filter: "blur(20px)" }} className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                    <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" strokeWidth="1" className="stroke-black dark:stroke-white opacity-10" />
                        <motion.circle
                            cx="60" cy="60" r="50" fill="none" strokeWidth="2" className="stroke-black dark:stroke-white"
                            strokeDasharray={LOADING_CIRCLE_CIRCUMFERENCE}
                            animate={{ strokeDashoffset: LOADING_CIRCLE_CIRCUMFERENCE - (LOADING_CIRCLE_CIRCUMFERENCE * displayValue) / 100 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-black italic tracking-widest text-black dark:text-white">
                            {displayValue.toString().padStart(3, '0')}
                        </span>
                    </div>
                </div>

                {status && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-[10px] uppercase tracking-[0.3em] text-black/40 dark:text-white/40">
                        {status}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}