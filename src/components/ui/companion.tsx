"use client";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { COMPANION_THEMES, getGradientString } from "@/lib/constants";
import { useCompanionAnimation } from "@/hooks/use-companion-animation";

interface CompanionProps {
    imagePath: string;
    isActive: boolean;
    isBoosting: boolean;
    isMobile: boolean;
    mouseRawX: any;
    mouseRawY: any;
    onStartHold?: () => void;
    onStopHold?: () => void;
}

export default function Companion({
    imagePath,
    isActive,
    isBoosting,
    isMobile,
    mouseRawX,
    mouseRawY,
    onStartHold,
    onStopHold
}: CompanionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const anim = useCompanionAnimation(isActive, isBoosting);

    const rawZoom = useSpring(1, { stiffness: 300, damping: 30 });
    const mouseX = useSpring(mouseRawX, { stiffness: 200, damping: 30 });
    const mouseY = useSpring(mouseRawY, { stiffness: 200, damping: 30 });

    const activeTheme = theme === "dark" ? "dark" : "light";
    const themeConfig = COMPANION_THEMES[activeTheme];
    const dotColor = themeConfig.dot;

    const translateX = useTransform(mouseX as any, [-0.5, 0.5], [-40, 40]);
    const rotateX = useTransform(mouseY as any, [-0.5, 0.5], [20, -20]);
    const rotateY = useTransform(mouseX as any, [-0.5, 0.5], [-25, 25]);
    const combinedY = useTransform(mouseY, (latest: any) => Number(latest) * 60);
    const finalScale = useTransform([rawZoom, anim.time], ([z, t]) =>
        (z as number) * (1 + Math.sin((t as number) * 2) * 0.015)
    );

    const rgbBackground = useTransform(
        [anim.p1x, anim.p1y, anim.p2x, anim.p2y],
        ([x1, y1, x2, y2]) => getGradientString(
            activeTheme,
            themeConfig as any,
            {
                x1: x1 as number,
                y1: y1 as number,
                x2: x2 as number,
                y2: y2 as number
            },
            isMobile
        )
    );

    useEffect(() => {
        setMounted(true);
        setImageLoaded(false);
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            img.decode().then(() => setImageLoaded(true)).catch(() => setImageLoaded(true));
        };
    }, [imagePath]);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const handleWheel = (e: WheelEvent) => {
            if (e.cancelable) {
                e.preventDefault();
            }

        };

        element.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            element.removeEventListener("wheel", handleWheel);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-transparent pointer-events-none select-none" style={{ perspective: "1200px", cursor: "auto" }}>

            <AnimatePresence>
                {!imageLoaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="absolute w-64 h-80 blur-[80px] rounded-full"
                        style={{ background: themeConfig.halo }}
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: imageLoaded ? 1 : 0.98 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onWheel={(e) => {
                    const next = Math.min(Math.max(rawZoom.get() + e.deltaY * -0.001, 1.0), 1.35);
                    rawZoom.set(next);
                }}
                style={{
                    rotateX: isMobile ? 0 : rotateX,
                    rotateY: isMobile ? 0 : rotateY,
                    x: translateX,
                    y: combinedY,
                    scale: finalScale,
                    transformStyle: "preserve-3d",
                }}
                className="relative flex items-center justify-center w-full h-full max-w-[700px] 2xl:max-w-[900px] 3xl:max-w-[1100px] -translate-y-19 md:translate-y-0 will-change-transform pointer-events-none"
            >
                <motion.div
                    key={imagePath}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative w-full h-full max-h-[45vh] md:max-h-[50vh] 2xl:max-h-[70vh] flex items-center justify-center pointer-events-auto"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        onStartHold?.();
                    }}
                    onMouseUp={(e) => {
                        e.stopPropagation();
                        onStopHold?.();
                    }}
                    onMouseLeave={(e) => {
                        e.stopPropagation();
                        onStopHold?.();
                    }}
                    style={{ filter: isMobile ? "none" : themeConfig.filter }}
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
                            backgroundColor: !imageLoaded ? themeConfig.fallbackBg : 'transparent',
                            opacity: imageLoaded ? 1 : 0.5
                        }}
                    >
                        <motion.div className="absolute inset-0 opacity-95" style={{
                            background: rgbBackground as any,
                            backgroundSize: "22px 22px",
                            WebkitMaskImage: `radial-gradient(var(--dw) var(--dh) at 50% 50%, ${dotColor} 85%, transparent 105%)`,
                            WebkitMaskSize: `11px 11px`,
                            WebkitMaskPosition: anim.posLayer1 as any,
                            // @ts-ignore
                            "--dw": anim.dwStr, "--dh": anim.dhStr,
                            transform: "rotate(-12deg) scale(1.5)"
                        }} />

                        {!isMobile && (
                            <>
                                <motion.div className="absolute inset-0 opacity-40" style={{ background: rgbBackground as any, backgroundSize: "14px 14px", WebkitMaskImage: `radial-gradient(1px 1px at 50% 50%, ${dotColor} 90%, transparent 100%)`, WebkitMaskSize: `7px 7px`, WebkitMaskPosition: anim.posLayer4 as any, transform: "rotate(10deg) scale(1.5)" }} />
                                <motion.div className="absolute inset-0 opacity-50" style={{
                                    background: rgbBackground as any, backgroundSize: "46px 46px", WebkitMaskImage: `radial-gradient(var(--bw) var(--bh) at 50% 50%, ${dotColor} 70%, transparent 100%)`, WebkitMaskSize: `23px 23px`, WebkitMaskPosition: anim.posLayer3 as any, // @ts-ignore
                                    "--bw": anim.blobW, "--bh": anim.blobH, transform: "rotate(45deg) scale(1.6)"
                                }} />
                                <motion.div className="absolute inset-0 opacity-80" style={{
                                    background: rgbBackground as any, backgroundSize: "28px 28px", WebkitMaskImage: `radial-gradient(var(--dh) var(--dw) at 30% 70%, ${dotColor} 80%, transparent 100%)`, WebkitMaskSize: `14px 14px`, WebkitMaskPosition: anim.posLayer2 as any, // @ts-ignore
                                    "--dw": anim.dwStr, "--dh": anim.dhStr, transform: "rotate(18deg) scale(1.5)"
                                }} />
                            </>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}