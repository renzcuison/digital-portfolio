"use client";
import { motion, useMotionValue, useTransform, useSpring, useVelocity, useAnimationFrame } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

interface CompanionProps {
    imagePath: string;
    isActive: boolean;
}

export default function Companion({ imagePath, isActive }: CompanionProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const [seed, setSeed] = useState(1);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);

    const meltEnergy = useMotionValue(0);
    const springMelt = useSpring(meltEnergy, { stiffness: 60, damping: 20 });
    const meltVelocity = useVelocity(springMelt);
    const [distortionScale, setDistortionScale] = useState(25);

    const joltProgress = useMotionValue(0);
    const joltSpring = useSpring(joltProgress, { stiffness: 300, damping: 15 });
    const zDepth = useTransform(joltSpring, [0, 1], [80, 250]);

    const rainbowPos = useMotionValue(0);

    useAnimationFrame((_, delta) => {
        if (!isActive) return;
        const speedMultiplier = 0.05 + (joltSpring.get() * 0.2);
        const currentPos = rainbowPos.get();
        rainbowPos.set((currentPos + delta * speedMultiplier) % 133.33);
    });

    const rainbowX = useTransform(rainbowPos, (v) => `${v}%`);
    const [rippleDur, setRippleDur] = useState("10s");
    const [dotColor, setDotColor] = useState("white");
    const [isLightMode, setIsLightMode] = useState(false);

    const impactFilter = useTransform(joltSpring, [0, 1], [
        "url(#fluid-morph) invert(0) brightness(1)",
        isLightMode
            ? "url(#fluid-morph) invert(0) brightness(0.1)"
            : "url(#fluid-morph) invert(1) brightness(2.5)"
    ]);

    useEffect(() => {
        setMounted(true);
        setSeed(Math.floor(Math.random() * 1000));

        if (theme === "light") {
            setDotColor("black");
            setIsLightMode(true);
        } else {
            setDotColor("white");
            setIsLightMode(false);
        }

        if (!isActive) return;

        joltProgress.set(1);
        meltEnergy.set(50);

        const wakeUpTimer = setTimeout(() => {
            joltProgress.set(0);
            meltEnergy.set(0);
        }, 150);

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            x.set(e.clientX / innerWidth - 0.5);
            y.set(e.clientY / innerHeight - 0.5);
        };

        const handleWheel = (e: WheelEvent) => {
            meltEnergy.set(meltEnergy.get() + e.deltaY);
        };

        const unsubMelt = meltVelocity.on("change", (v) => {
            setDistortionScale(25 + Math.abs(v / 15));
        });

        const unsubJolt = joltSpring.on("change", (v) => {
            setRippleDur(v > 0.5 ? "1.5s" : "10s");
        });

        const handleGlobalDown = (e: MouseEvent) => { if (e.button === 0) joltProgress.set(1); };
        const handleGlobalUp = () => joltProgress.set(0);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("wheel", handleWheel);
        window.addEventListener("mousedown", handleGlobalDown);
        window.addEventListener("mouseup", handleGlobalUp);

        return () => {
            clearTimeout(wakeUpTimer);
            unsubMelt();
            unsubJolt();
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("mousedown", handleGlobalDown);
            window.removeEventListener("mouseup", handleGlobalUp);
        };
    }, [theme, meltVelocity, joltSpring, joltProgress, x, y, meltEnergy, isActive, imagePath]);

    const imageMask = `url("${imagePath}")`;
    const dotPattern = `radial-gradient(circle, ${dotColor} 1.8px, transparent 1.8px)`;

    if (!mounted) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-transparent pointer-events-none select-none"
            style={{ perspective: "2000px" }}
        >
            <svg className="absolute h-0 w-0">
                <filter id="fluid-morph" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.015 0.01"
                        numOctaves="2"
                        seed={seed}
                    >
                        <animate
                            attributeName="baseFrequency"
                            dur={rippleDur}
                            values="0.015 0.01; 0.025 0.02; 0.015 0.01"
                            repeatCount="indefinite"
                            begin="0s"
                        />
                    </feTurbulence>
                    <feDisplacementMap in="SourceGraphic" scale={distortionScale} />
                </filter>
            </svg>

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                animate={{ y: [0, -20, 0] }} // Subtle float for smaller objects
                transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
                className="relative flex items-center justify-center h-[75vh] w-full max-w-[800px]"
            >
                <motion.div
                    className="relative w-full h-full p-20 md:p-32"
                    style={{
                        filter: impactFilter,
                        WebkitMaskImage: imageMask,
                        maskImage: imageMask,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center bottom',
                        translateZ: zDepth,
                        willChange: "filter, transform",
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
                            backgroundPositionX: rainbowX,
                        }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}