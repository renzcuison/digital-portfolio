"use client";
import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function LoadingScreen() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [phase, setPhase] = useState<"swarm" | "text" | "silhouette">("swarm");

    const colors = isDark
        ? { cyan: "#00ffff", purple: "#8b00ff" }
        : { cyan: "#00a3a3", purple: "#6a00c2" };

    useEffect(() => {
        const toText = setTimeout(() => setPhase("text"), 1500);
        const toSilhouette = setTimeout(() => setPhase("silhouette"), 4000);
        return () => { clearTimeout(toText); clearTimeout(toSilhouette); };
    }, []);

    const butterflyData = useMemo(() => {
        const scaleFactor = 1.3;
        const textPoints = [
            { x: -100, y: 0 }, { x: -100, y: -10 }, { x: -100, y: -20 }, { x: -95, y: -28 }, { x: -80, y: -28 },
            { x: -65, y: -12 }, { x: -55, y: -12 }, { x: -45, y: -12 }, { x: -35, y: -12 },
            { x: -65, y: -18 }, { x: -65, y: -6 }, { x: -35, y: -18 },
            { x: -60, y: -26 }, { x: -50, y: -26 }, { x: -40, y: -26 },
            { x: -60, y: 0 }, { x: -50, y: 0 }, { x: -40, y: 0 }, { x: -35, y: -4 },
            { x: -10, y: -26 }, { x: 5, y: -26 }, { x: 20, y: -26 }, { x: -10, y: -19 },
            { x: -10, y: -13 }, { x: 5, y: -13 }, { x: 20, y: -13 }, { x: 20, y: -7 },
            { x: -10, y: 0 }, { x: 5, y: 0 }, { x: 20, y: 0 },
            { x: 45, y: -45 }, { x: 45, y: -30 }, { x: 45, y: -15 }, { x: 45, y: 0 },
            { x: 55, y: -13 }, { x: 70, y: -13 }, { x: 75, y: -5 }, { x: 75, y: 0 },
            { x: 95, y: -20 }, { x: 95, y: -10 }, { x: 95, y: 0 }, { x: 95, y: -38 },
            { x: 110, y: 0 }
        ];

        const silhouettePoints = [
            { x: 0, y: -120 }, { x: 0, y: -90 }, { x: 0, y: -60 }, { x: 0, y: -30 },
            { x: 0, y: 30 }, { x: 0, y: 70 }, { x: 0, y: 110 }, { x: 0, y: 150 },
            { x: -50, y: -100 }, { x: -80, y: -120 }, { x: -30, y: -80 },
            { x: 50, y: -100 }, { x: 80, y: -120 }, { x: 30, y: -80 },
            { x: -40, y: 130 }, { x: 40, y: 130 }, { x: -60, y: 160 }, { x: 60, y: 160 },
        ];

        const totalDots = 100;
        return Array.from({ length: totalDots }).map((_, i) => {
            const isCyan = i % 2 === 0;
            const tP = textPoints[i % textPoints.length];
            const sP = silhouettePoints[i % silhouettePoints.length];

            return {
                color: isCyan ? colors.cyan : colors.purple,
                textX: tP.x * scaleFactor,
                textY: tP.y * scaleFactor,
                silX: sP.x,
                silY: sP.y,
                randomX: (Math.random() - 0.5) * 800,
                randomY: (Math.random() - 0.5) * 800,
                delay: i * 0.005
            };
        });
    }, [isDark, colors]);

    return (
        <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-white dark:bg-black">
            <div className="relative flex items-center justify-center">
                {butterflyData.map((b, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-1.5 w-1.5 rounded-full"
                        animate={
                            phase === "swarm" ? {
                                x: [b.randomX, (Math.random() - 0.5) * 200, b.randomX],
                                y: [b.randomY, (Math.random() - 0.5) * 200, b.randomY],
                                opacity: [0, 0.7, 0],
                            } : phase === "text" ? {
                                x: b.textX,
                                y: b.textY,
                                opacity: 1,
                                scale: 1,
                            } : {
                                x: b.silX,
                                y: b.silY,
                                opacity: 0.4,
                                scale: 1.4,
                            }
                        }
                        transition={{
                            type: phase === "swarm" ? "tween" : "spring",
                            stiffness: phase === "text" ? 150 : 40,
                            damping: 18,
                            delay: phase === "swarm" ? Math.random() * 1 : b.delay,
                            duration: phase === "swarm" ? 3 : 0.6
                        }}
                        style={{
                            backgroundColor: b.color,
                            // Matched the Companion's glow intensity
                            boxShadow: isDark ? `0 0 8px ${b.color}` : "none",
                            mixBlendMode: isDark ? "screen" : "multiply",
                            filter: isDark ? "brightness(1.5)" : "none"
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}