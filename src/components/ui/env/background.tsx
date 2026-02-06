"use client";
import React from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";

interface GridProps {
    mouseX: MotionValue<number>;
    mouseY: MotionValue<number>;
}

export function Grid({ mouseX, mouseY }: GridProps) {
    const smoothX = useSpring(mouseX, { stiffness: 50, damping: 25 });
    const smoothY = useSpring(mouseY, { stiffness: 50, damping: 25 });

    const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
    const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div style={{ perspective: "1000px" }} className="w-full h-full flex items-center justify-center">
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="absolute w-[150%] h-[150%] opacity-[0.25]"
                >
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `radial-gradient(#000 1.5px, transparent 0)`,
                            backgroundSize: '30px 30px',
                            maskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 85%)'
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );
}