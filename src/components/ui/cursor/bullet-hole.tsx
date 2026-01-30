"use client";
import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { GUN_SETTINGS } from "@/lib/constants";

interface BulletHoleProps {
    x: number;
    y: number;
    onComplete: () => void;
}

export const BulletHole = ({ x, y, onComplete }: BulletHoleProps) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, GUN_SETTINGS.HOLE_STAY_TIME);
        return () => clearTimeout(timer);
    }, [onComplete]);

    const rotation = useMemo(() => Math.random() * 360, []);

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(4px)" }}
            className="absolute pointer-events-none z-[9997]"
            style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                willChange: "transform, opacity"
            }}
        >
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                    <motion.div
                        key={angle}
                        initial={{ width: 0 }}
                        animate={{ width: Math.random() * 25 + 10 }}
                        className="absolute bg-current opacity-30 dark:text-white text-black"
                        style={{
                            height: '1px',
                            transform: `rotate(${angle}deg) translateX(2px)`,
                            transformOrigin: "left center",
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{
                    scale: 1.8,
                    opacity: 1
                }}
                animate={{
                    scale: 1,
                    opacity: 0.9
                }}
                transition={{
                    duration: GUN_SETTINGS.HOLE_STAY_TIME / 1000,
                    ease: "linear"
                }}
                className="w-[4px] h-[4px] rounded-full bg-current dark:text-white text-black shadow-[0_0_10px_rgba(255,255,255,0.2)] dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                style={{
                    boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5)'
                }}
            />
        </motion.div>
    );
};