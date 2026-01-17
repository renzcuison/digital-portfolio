"use client";
import { motion, useMotionValue, useTransform, useSpring, useVelocity } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

export default function Mage() {
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. Mouse Tracking for Tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

    // 2. Scroll-to-Melt Logic
    const meltEnergy = useMotionValue(0);
    const springMelt = useSpring(meltEnergy, { stiffness: 60, damping: 20 });
    const meltVelocity = useVelocity(springMelt);
    const [distortionScale, setDistortionScale] = useState(25);

    // 3. 3D Jolt Logic (Z-Axis Movement)
    const joltProgress = useMotionValue(0);
    const joltSpring = useSpring(joltProgress, { stiffness: 300, damping: 15 });

    // This maps the click from 0 to 1 into a physical Z-translation
    const zDepth = useTransform(joltSpring, [0, 1], [80, 250]);
    const impactFilter = useTransform(joltSpring, [0, 1], [
        "url(#fluid-morph) invert(0) brightness(1)",
        "url(#fluid-morph) invert(1) brightness(2.5)"
    ]);

    useEffect(() => {
        const updateDistortion = () => {
            const total = 25 + Math.abs(meltVelocity.get() / 15);
            setDistortionScale(total);
        };
        const unsubScroll = meltVelocity.on("change", updateDistortion);

        const handleGlobalDown = (e: MouseEvent) => {
            if (e.button === 0) joltProgress.set(1);
        };
        const handleGlobalUp = () => joltProgress.set(0);

        window.addEventListener("mousedown", handleGlobalDown);
        window.addEventListener("mouseup", handleGlobalUp);

        return () => {
            unsubScroll();
            window.removeEventListener("mousedown", handleGlobalDown);
            window.removeEventListener("mouseup", handleGlobalUp);
        };
    }, [meltVelocity, joltProgress]);

    const imageMask = 'url("/frieren.png")';
    const dotPattern = "radial-gradient(circle, white 1.8px, transparent 1.8px)";

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black [perspective:2000px] select-none cursor-auto"
            onMouseMove={(e) => {
                const { innerWidth, innerHeight } = window;
                x.set(e.clientX / innerWidth - 0.5);
                y.set(e.clientY / innerHeight - 0.5);
            }}
            onWheel={(e) => meltEnergy.set(meltEnergy.get() + e.deltaY)}
        >
            <svg className="absolute h-0 w-0">
                <filter id="fluid-morph" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015 0.01" numOctaves="2" seed="5">
                        <animate attributeName="baseFrequency" dur="10s" values="0.015 0.01; 0.025 0.02; 0.015 0.01" repeatCount="indefinite" />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale={distortionScale} />
                </filter>
            </svg>

            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                animate={{ y: [0, -45, 0] }}
                transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
                className="relative h-[95vh] w-full max-w-[800px]"
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        filter: impactFilter,
                        WebkitMaskImage: imageMask,
                        maskImage: imageMask,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        // Physical Z-depth move
                        translateZ: zDepth,
                    }}
                >
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff00ff, #ff0000)",
                            backgroundSize: "400% 100%",
                            WebkitMaskImage: dotPattern,
                            maskImage: dotPattern,
                            WebkitMaskSize: "7px 7px",
                        }}
                        animate={{ backgroundPosition: ["0% 0%", "133.33% 0%"] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}