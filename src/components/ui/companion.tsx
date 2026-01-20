"use client";
import { motion, useMotionValue, useTransform, useSpring, useVelocity, useAnimationFrame } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence } from "framer-motion";

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

        const handleGlobalDown = (e: MouseEvent) => {
            if (e.button === 0) {
                joltProgress.set(1.5);
                meltEnergy.set(200);
            }
        };
        const handleGlobalUp = () => {
            joltProgress.set(0);
            meltEnergy.set(0);
        };

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

            <svg className="absolute h-0 w-0 invisible">
                <filter id="fluid-morph" x="-150%" y="-150%" width="400%" height="400%" colorInterpolationFilters="sRGB">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.035 0.025"
                        numOctaves="1"
                        seed={seed}
                        stitchTiles="stitch"
                        result="noise"
                    />
                    <feOffset dx="0" dy="0">
                        <animate
                            attributeName="dx"
                            values="-200; 200; -200"
                            dur="7s"
                            repeatCount="indefinite"
                            calcMode="linear"
                        />
                        <animate
                            attributeName="dy"
                            values="-120; 120; -120"
                            dur="4.7s"
                            repeatCount="indefinite"
                            calcMode="linear"
                        />
                    </feOffset>
                    <feDisplacementMap
                        in="SourceGraphic"
                        scale={distortionScale}
                    />
                </filter>
            </svg>

            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                animate={{
                    y: [0, -40, 0],
                    rotateZ: [-1, 1, -1],
                    scale: [1, 1.03, 1]
                }}
                transition={{
                    y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"

                    },
                    scale: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    rotateZ: {
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                className="relative flex items-center justify-center w-full h-full max-w-[700px] -translate-y-8 md:translate-y-0"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={imagePath}
                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            filter: "brightness(2) blur(15px)"
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "brightness(1) blur(0px)"
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.1,
                            filter: "brightness(4) blur(20px)"
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeInOut"
                        }}
                        className="relative w-full h-full max-h-[45vh] md:max-h-[650px] p-4 md:p-12"
                        style={{
                            filter: impactFilter,
                            WebkitMaskImage: imageMask,
                            maskImage: imageMask,
                            WebkitMaskSize: 'contain',
                            maskSize: 'contain',
                            WebkitMaskRepeat: 'no-repeat',
                            WebkitMaskPosition: 'center',
                            maskPosition: 'center',
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
                </AnimatePresence>
            </motion.div>
        </div>
    );
}