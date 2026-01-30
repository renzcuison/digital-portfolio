"use client";
import React, { useEffect } from "react";
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

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            className="fixed pointer-events-none z-[9997] bg-white border border-black/30"
            style={{
                left: x,
                top: y,
                width: '4px',
                height: '4px',
                borderRadius: '1px',
                transform: "translate(-50%, -50%)",
            }}
        />
    );
};