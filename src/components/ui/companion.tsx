"use client";
import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

interface CompanionProps {
    imagePath: string;
    isActive: boolean;
    setIsBoosting?: (boosting: boolean) => void;
}

export default function Companion({ imagePath, isActive, setIsBoosting }: CompanionProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const positionRef = useRef({ x: 0, y: 0 });

    const posLayer1 = useMotionValue("0px 0px");
    const posLayer2 = useMotionValue("0px 0px");
    const posLayer3 = useMotionValue("0px 0px");
    const posLayer4 = useMotionValue("0px 0px");

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const time = useMotionValue(0);

    const rawZoom = useMotionValue(1);
    const zoomSpring = useSpring(rawZoom, { stiffness: 300, damping: 30 });

    const p1x = useTransform(time, t => 50 + Math.cos(t * 0.5) * 25);
    const p1y = useTransform(time, t => 50 + Math.sin(t * 0.3) * 25);
    const p2x = useTransform(time, t => 50 + Math.sin(t * 0.4) * 30);
    const p2y = useTransform(time, t => 50 + Math.cos(t * 0.6) * 30);

    const morphValue = useTransform(time, (t) => Math.sin(t * 3));
    const noiseW = useTransform(time, (t) => Math.sin(t * 12) * 0.2);
    const noiseH = useTransform(time, (t) => Math.cos(t * 15) * 0.2);

    const dwStr = useTransform([morphValue, noiseW], ([v, n]) => `${2.4 + (v as number) * 0.3 + (n as number)}px`);
    const dhStr = useTransform([morphValue, noiseH], ([v, n]) => `${2.4 - (v as number) * 0.3 + (n as number)}px`);

    const blobW = useTransform(time, (t) => `${4 + Math.sin(t * 1.5) * 0.7 + Math.sin(t * 8) * 0.2}px`);
    const blobH = useTransform(time, (t) => `${4 + Math.cos(t * 1.2) * 0.7 + Math.cos(t * 7) * 0.2}px`);

    const boostProgress = useSpring(0, { stiffness: 80, damping: 20 });
    const mouseX = useSpring(x, { stiffness: 200, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 30 });

    const combinedY = useTransform([mouseY, time], ([latestY, t]) => {
        const mouseShift = (latestY as number) * 60;
        const autoFloat = Math.sin((t as number) * 2) * 20;
        return mouseShift + autoFloat;
    });

    const translateX = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);

    const finalScale = useTransform([zoomSpring, time], ([z, t]) => {
        const breath = 1 + Math.sin((t as number) * 2) * 0.015;
        return (z as number) * breath;
    });

    const colors = theme === "light"
        ? { c1: "#0047ab", c2: "#00a3a3", c3: "#6a00c2", c4: "#b30000" }
        : { c1: "#00ffff", c2: "#8b00ff", c3: "#ff00ff", c4: "#0055ff" };

    const rgbBackground = useTransform([p1x, p1y, p2x, p2y], ([x1, y1, x2, y2]) => {

        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            return `linear-gradient(to bottom, ${colors.c1}, ${colors.c2})`;
        }

        const X1 = x1 as number;
        const Y1 = y1 as number;
        const X2 = x2 as number;
        const Y2 = y2 as number;

        return `
            radial-gradient(circle at ${X1}% ${Y1}%, ${colors.c1} 0%, transparent 50%),
            radial-gradient(circle at ${Y2}% ${X2}%, ${colors.c2} 0%, transparent 50%),
            radial-gradient(circle at ${100 - X2}% ${100 - Y1}%, ${colors.c3} 0%, transparent 50%),
            radial-gradient(circle at ${Y1}% ${X1}%, ${colors.c4} 0%, transparent 50%),
            ${theme === "dark" ? "#000" : "#fff"}
        `;
    });

    useAnimationFrame((t, delta) => {
        if (!isActive) return;

        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            time.set(t / 1000);
            return;
        }

        const seconds = t / 1000;
        time.set(seconds);

        const currentBoost = boostProgress.get();
        const baseIdleSpeed = 0.075;
        const speed = (baseIdleSpeed * (1 + currentBoost * 2.5)) * (delta * 0.1);

        positionRef.current.x += speed;
        positionRef.current.y += speed * 0.4;

        const px = positionRef.current.x;
        const py = positionRef.current.y;

        posLayer1.set(`${px + Math.sin(seconds * 0.8) * 5}px ${py + Math.cos(seconds * 0.5) * 5}px`);
        posLayer2.set(`${-px * 1.4 + Math.cos(seconds * 1.1) * 8}px ${py * 1.8 + Math.sin(seconds * 0.9) * 8}px`);
        posLayer3.set(`${px * 0.6 + Math.sin(seconds * 1.4) * 12}px ${-py * 0.9 + Math.cos(seconds * 1.2) * 10}px`);
        posLayer4.set(`${px * 2 + Math.cos(seconds * 2.1) * 4}px ${py * 0.2 + Math.sin(seconds * 1.8) * 4}px`);
    });

    useEffect(() => {
        boostProgress.set(isPressed ? 1 : 0);
    }, [isPressed, boostProgress]);

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX / window.innerWidth - 0.5);
            y.set(e.clientY / window.innerHeight - 0.5);
        };

        const handleWheel = (e: WheelEvent) => {
            const zoomStep = e.deltaY * -0.001;
            const nextZoom = Math.min(Math.max(rawZoom.get() + zoomStep, 1.0), 1.35);
            rawZoom.set(nextZoom);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("wheel", handleWheel);
        };
    }, [x, y, rawZoom]);

    if (!mounted) return null;

    const glowFilter = theme === "dark"
        ? "brightness(1.5) drop-shadow(0 0 3px rgba(255,255,255,0.7))"
        : "brightness(1.0) saturate(1.2) drop-shadow(0 0 2px rgba(0,0,0,0.15))";

    const dotColor = theme === "light" ? "#1a1a1a" : "white";

    const patternSmall = `radial-gradient(var(--dw) var(--dh) at 50% 50%, ${dotColor} 85%, transparent 105%)`;
    const patternMedium = `radial-gradient(var(--dh) var(--dw) at 30% 70%, ${dotColor} 80%, transparent 100%)`;
    const patternLarge = `radial-gradient(var(--bw) var(--bh) at 50% 50%, ${dotColor} 70%, transparent 100%)`;
    const patternDust = `radial-gradient(1px 1px at 50% 50%, ${dotColor} 90%, transparent 100%)`;

    return (
        <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-transparent pointer-events-none select-none" style={{ perspective: "1200px" }}>
            <motion.div
                style={{ rotateX, rotateY, x: translateX, y: combinedY, scale: finalScale, transformStyle: "preserve-3d", pointerEvents: "auto", cursor: "pointer" }}
                className="relative flex items-center justify-center w-full h-full max-w-[700px] 2xl:max-w-[900px] 3xl:max-w-[1100px]  -translate-y-19 md:translate-y-0 will-change-transform"
                onMouseDown={() => {
                    setIsPressed(true);
                    setIsBoosting?.(true);
                }}
                onMouseUp={() => {
                    setIsPressed(false);
                    setIsBoosting?.(false);
                }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={imagePath}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ filter: glowFilter }}
                    >
                        <motion.div
                            className="relative w-full h-full max-h-[45vh] md:max-h-[60vh] 2xl:max-h-[70vh] p-4 md:p-12"
                            style={{
                                WebkitMaskImage: `url("${imagePath}")`,
                                maskImage: `url("${imagePath}")`,
                                WebkitMaskSize: 'contain',
                                maskSize: 'contain',
                                WebkitMaskRepeat: 'no-repeat',
                                WebkitMaskPosition: 'center',
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 opacity-40"
                                style={{
                                    background: rgbBackground as any,
                                    backgroundSize: "14px 14px",
                                    WebkitMaskImage: patternDust,
                                    maskImage: patternDust,
                                    WebkitMaskSize: `7px 7px`,
                                    WebkitMaskPosition: posLayer4 as any,
                                    transform: "rotate(10deg) scale(1.5)",
                                }}
                            />

                            <motion.div
                                className="absolute inset-0 opacity-50"
                                style={{
                                    background: rgbBackground as any,
                                    backgroundSize: "46px 46px",
                                    WebkitMaskImage: patternLarge,
                                    maskImage: patternLarge,
                                    WebkitMaskSize: `23px 23px`,
                                    WebkitMaskPosition: posLayer3 as any,
                                    // @ts-ignore
                                    "--bw": blobW, "--bh": blobH,
                                    transform: "rotate(45deg) scale(1.6)",
                                }}
                            />

                            <motion.div
                                className="absolute inset-0 opacity-95"
                                style={{
                                    background: rgbBackground as any,
                                    backgroundSize: "22px 22px",
                                    WebkitMaskImage: patternSmall,
                                    maskImage: patternSmall,
                                    WebkitMaskSize: `11px 11px`,
                                    WebkitMaskPosition: posLayer1 as any,
                                    // @ts-ignore
                                    "--dw": dwStr, "--dh": dhStr,
                                    transform: "rotate(-12deg) scale(1.5)",
                                }}
                            />

                            <motion.div
                                className="absolute inset-0 opacity-80"
                                style={{
                                    background: rgbBackground as any,
                                    backgroundSize: "28px 28px",
                                    WebkitMaskImage: patternMedium,
                                    maskImage: patternMedium,
                                    WebkitMaskSize: `14px 14px`,
                                    WebkitMaskPosition: posLayer2 as any,
                                    // @ts-ignore
                                    "--dw": dwStr, "--dh": dhStr,
                                    transform: "rotate(18deg) scale(1.5)",
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}