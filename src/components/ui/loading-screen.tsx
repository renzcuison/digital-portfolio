"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
    progress: number;
    onComplete?: () => void;
    status?: string;
}

export function LoadingScreen({ progress, onComplete, status }: LoadingScreenProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const strokeDash = 314.159;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (displayValue < progress) {
                setDisplayValue(prev => prev + 1);
            }
        }, 10);
        return () => clearTimeout(timer);
    }, [displayValue, progress]);

    useEffect(() => {
        if (displayValue >= 100) {
            onComplete?.();
        }
    }, [displayValue, onComplete]);

    return (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center font-mono">
            <motion.div exit={{ opacity: 0, filter: "blur(20px)" }} className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                    <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="1" className="opacity-10" />
                        <motion.circle
                            cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="2"
                            strokeDasharray={strokeDash}
                            animate={{ strokeDashoffset: strokeDash - (strokeDash * displayValue) / 100 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-black italic tracking-widest text-white">
                            {displayValue.toString().padStart(3, '0')}
                        </span>
                    </div>
                </div>

                {status && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/40"
                    >
                        {status}
                    </motion.p>
                )}
            </motion.div>
        </div>
    );
}