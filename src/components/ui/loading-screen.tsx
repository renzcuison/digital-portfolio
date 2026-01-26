"use client";
import React from "react";
import { motion } from "framer-motion";

export function LoadingScreen() {
    const strokeColor = "currentColor";

    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white"
        >
            <div className="relative h-24 w-24">
                <motion.svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 h-full w-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="1"
                        strokeDasharray="10 20"
                        className="opacity-20"
                    />
                </motion.svg>

                <motion.svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 h-full w-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth="2"
                        strokeDasharray="60 100"
                        strokeLinecap="round"
                        className="opacity-60"
                    />
                </motion.svg>

                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="h-4 w-4 rounded-full border border-current shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                </motion.div>

                {[0, 90, 180, 270].map((angle) => (
                    <div
                        key={angle}
                        className="absolute h-full w-full"
                        style={{ transform: `rotate(${angle}deg)` }}
                    >
                        <div className="mx-auto h-2 w-[1px] bg-current opacity-40" />
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] opacity-50"
            >
                System_Initializing...
            </motion.div>
        </motion.div>
    );
}