"use client";
import { motion, useMotionValue, useTransform, useSpring, useAnimationFrame, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useTheme } from "next-themes";

interface CompanionProps {
    imagePath: string;
    isActive: boolean;
    setIsBoosting?: (boosting: boolean) => void;
    onStartHold?: () => void;
    onStopHold?: () => void;
}

export default function Companion({
    imagePath,
    isActive,
    setIsBoosting,
    onStartHold,
    onStopHold
}: CompanionProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const positionRef = useRef({ x: 0, y: 0 });
    const winWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1024);
    const containerRef = useRef<HTMLDivElement>(null);

    const posLayer1 = useMotionValue("0px 0px");
    const posLayer2 = useMotionValue("0px 0px");
    const posLayer3 = useMotionValue("0px 0px");
    const posLayer4 = useMotionValue("0px 0px");
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const time = useMotionValue(0);
    const rawZoom = useMotionValue(1);

    const zoomSpring = useSpring(rawZoom, { stiffness: 300, damping: 30 });
    const boostProgress = useSpring(0, { stiffness: 80, damping: 20 });
    const mouseX = useSpring(x, { stiffness: 200, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 200, damping: 30 });

    const colors = useMemo(() => theme === "light"
        ? { c1: "#0047ab", c2: "#00a3a3", c3: "#6a00c2", c4: "#b30000" }
        : { c1: "#00ffff", c2: "#8b00ff", c3: "#ff00ff", c4: "#0055ff" }, [theme]);

    const p1x = useTransform(time, t => 50 + Math.cos(t * 0.5) * 25);
    const p1y = useTransform(time, t => 50 + Math.sin(t * 0.3) * 25);
    const p2x = useTransform(time, t => 50 + Math.sin(t * 0.4) * 30);
    const p2y = useTransform(time, t => 50 + Math.cos(t * 0.6) * 30);

    const morphValue = useTransform(time, t => Math.sin(t * 3));
    const noiseW = useTransform(time, t => Math.sin(t * 12) * 0.2);
    const noiseH = useTransform(time, t => Math.cos(t * 15) * 0.2);

    const dwStr = useTransform([morphValue, noiseW], ([v, nw]) => `${2.4 + (v as number) * 0.3 + (nw as number)}px`);
    const dhStr = useTransform([morphValue, noiseH], ([v, nh]) => `${2.4 - (v as number) * 0.3 + (nh as number)}px`);

    const blobW = useTransform(time, t => `${4 + Math.sin(t * 1.5) * 0.7 + Math.sin(t * 8) * 0.2}px`);
    const blobH = useTransform(time, t => `${4 + Math.cos(t * 1.2) * 0.7 + Math.cos(t * 7) * 0.2}px`);

    const combinedY = useTransform(mouseY, latestY => (latestY as number) * 60);
    const translateX = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);

    const finalScale = useTransform([zoomSpring, time], ([z, t]) =>
        (z as number) * (1 + Math.sin((t as number) * 2) * 0.015)
    );

    const rgbBackground = useTransform([p1x, p1y, p2x, p2y], ([x1, y1, x2, y2]) => {
        if (winWidthRef.current < 768) return `linear-gradient(to bottom, ${colors.c1}, ${colors.c2})`;
        return `radial-gradient(circle at ${x1}% ${y1}%, ${colors.c1} 0%, transparent 50%), radial-gradient(circle at ${y2}% ${x2}%, ${colors.c2} 0%, transparent 50%), radial-gradient(circle at ${100 - (x2 as number)}% ${100 - (y1 as number)}%, ${colors.c3} 0%, transparent 50%), radial-gradient(circle at ${y1}% ${x1}%, ${colors.c4} 0%, transparent 50%), ${theme === "dark" ? "#000" : "#fff"}`;
    });

    useAnimationFrame((t, delta) => {
        if (!isActive || !imageLoaded) return;
        const seconds = t / 1000;
        time.set(seconds);
        if (winWidthRef.current < 768) return;

        const speed = (0.0075 * (1 + boostProgress.get() * 2.5)) * delta;
        positionRef.current.x += speed;
        positionRef.current.y += speed * 0.4;

        const { x: px, y: py } = positionRef.current;

        posLayer1.set(`${px + Math.sin(seconds * 0.8) * 5}px ${py + Math.cos(seconds * 0.5) * 5}px`);
        posLayer2.set(`${-px * 1.4 + Math.cos(seconds * 1.1) * 8}px ${py * 1.8 + Math.sin(seconds * 0.9) * 8}px`);
        posLayer3.set(`${px * 0.6 + Math.sin(seconds * 1.4) * 12}px ${-py * 0.9 + Math.cos(seconds * 1.2) * 10}px`);
        posLayer4.set(`${px * 2 + Math.cos(seconds * 2.1) * 4}px ${py * 0.2 + Math.sin(seconds * 1.8) * 4}px`);
    });

    useEffect(() => {
        setImageLoaded(false);
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            img.decode().then(() => setImageLoaded(true)).catch(() => setImageLoaded(true));
        };
    }, [imagePath]);

    useEffect(() => { boostProgress.set(isPressed ? 1 : 0); }, [isPressed]);

    useEffect(() => {
        setMounted(true);
        const handleResize = () => { winWidthRef.current = window.innerWidth; };
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX / window.innerWidth - 0.5);
            y.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, [x, y]);

    if (!mounted) return null;

    const dotColor = theme === "light" ? "#1a1a1a" : "white";

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden bg-transparent pointer-events-none select-none" style={{ perspective: "1200px", cursor: "auto" }}>

            {/* SKELETON GLOW: Pulsing placeholder while loading */}
            <AnimatePresence>
                {!imageLoaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute w-64 h-80 blur-[80px] rounded-full"
                        style={{
                            background: theme === "dark"
                                ? "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)"
                                : "radial-gradient(circle, rgba(0,71,171,0.15) 0%, transparent 70%)"
                        }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={imageLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onWheel={(e) => {
                    const next = Math.min(
                        Math.max(rawZoom.get() + e.deltaY * -0.001, 1.0),
                        1.35
                    );
                    rawZoom.set(next);
                }}
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    x: translateX,
                    y: combinedY,
                    scale: finalScale,
                    transformStyle: "preserve-3d",
                }}
                className="relative flex items-center justify-center w-full h-full max-w-[700px] 2xl:max-w-[900px] 3xl:max-w-[1100px] -translate-y-19 md:translate-y-0 will-change-transform pointer-events-none"
            >
                <AnimatePresence mode="wait">
                    {imageLoaded && (
                        <motion.div
                            key={imagePath}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="relative w-full h-full max-h-[45vh] md:max-h-[50vh] 2xl:max-h-[70vh] flex items-center justify-center pointer-events-auto"
                            onMouseDown={(e) => {
                                e.stopPropagation();
                                setIsPressed(true);
                                setIsBoosting?.(true);
                                onStartHold?.();
                            }}
                            onMouseUp={(e) => {
                                e.stopPropagation();
                                setIsPressed(false);
                                setIsBoosting?.(false);
                                onStopHold?.();
                            }}
                            onMouseLeave={() => {
                                if (isPressed) {
                                    setIsPressed(false);
                                    setIsBoosting?.(false);
                                    onStopHold?.();
                                }
                            }}
                            style={{
                                filter:
                                    theme === "dark"
                                        ? "brightness(1.5) drop-shadow(0 0 3px rgba(255,255,255,0.7))"
                                        : "brightness(1.0) saturate(1.2) drop-shadow(0 0 2px rgba(0,0,0,0.15))"
                            }}
                        >
                            <motion.div
                                className="relative w-full h-full p-4 md:p-12 pointer-events-none"
                                style={{
                                    WebkitMaskImage: `url("${imagePath}")`,
                                    maskImage: `url("${imagePath}")`,
                                    WebkitMaskSize: "contain",
                                    maskSize: "contain",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center",
                                }}
                            >
                                <motion.div className="absolute inset-0 opacity-40" style={{ background: rgbBackground as any, backgroundSize: "14px 14px", WebkitMaskImage: `radial-gradient(1px 1px at 50% 50%, ${dotColor} 90%, transparent 100%)`, WebkitMaskSize: `7px 7px`, WebkitMaskPosition: posLayer4 as any, transform: "rotate(10deg) scale(1.5)" }} />
                                <motion.div className="absolute inset-0 opacity-50" style={{
                                    background: rgbBackground as any, backgroundSize: "46px 46px", WebkitMaskImage: `radial-gradient(var(--bw) var(--bh) at 50% 50%, ${dotColor} 70%, transparent 100%)`, WebkitMaskSize: `23px 23px`, WebkitMaskPosition: posLayer3 as any, // @ts-ignore
                                    "--bw": blobW, "--bh": blobH, transform: "rotate(45deg) scale(1.6)"
                                }} />
                                <motion.div className="absolute inset-0 opacity-95" style={{
                                    background: rgbBackground as any, backgroundSize: "22px 22px", WebkitMaskImage: `radial-gradient(var(--dw) var(--dh) at 50% 50%, ${dotColor} 85%, transparent 105%)`, WebkitMaskSize: `11px 11px`, WebkitMaskPosition: posLayer1 as any, // @ts-ignore
                                    "--dw": dwStr, "--dh": dhStr, transform: "rotate(-12deg) scale(1.5)"
                                }} />
                                <motion.div className="absolute inset-0 opacity-80" style={{
                                    background: rgbBackground as any, backgroundSize: "28px 28px", WebkitMaskImage: `radial-gradient(var(--dh) var(--dw) at 30% 70%, ${dotColor} 80%, transparent 100%)`, WebkitMaskSize: `14px 14px`, WebkitMaskPosition: posLayer2 as any, // @ts-ignore
                                    "--dw": dwStr, "--dh": dhStr, transform: "rotate(18deg) scale(1.5)"
                                }} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}