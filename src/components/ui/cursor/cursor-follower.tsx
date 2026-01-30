"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useVelocity, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";

import { useMousePosition } from "@/hooks/cursor/use-mouse-position";
import { useWeapon } from "@/hooks/cursor/use-weapon";
import { BulletHole } from "./bullet-hole";
import { GUN_SETTINGS, INTERACTIVE_ELEMENTS } from "@/lib/constants";

export function CursorFollower() {
    const { x, y } = useMousePosition();
    const { heat, isFiring, isOverheated, incrementHeat, fireInterval, stopFiring } = useWeapon();

    const [isVisible, setIsVisible] = useState(true);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [holes, setHoles] = useState<{ id: string; x: number; y: number }[]>([]);
    const [pews, setPews] = useState<{ id: string; x: number; y: number; offsetX: number; offsetY: number }[]>([]);
    const [flashes, setFlashes] = useState<{ id: string }[]>([]);

    const mousePos = useRef({ x: 0, y: 0 });
    const lastFireTime = useRef<number>(0);
    const isOverheatedRef = useRef(false);

    useEffect(() => {
        isOverheatedRef.current = isOverheated;
    }, [isOverheated]);

    useEffect(() => {
        setMounted(true);
        const hasTouch = navigator.maxTouchPoints > 0 || /Android|iPad|iPhone|iPod/i.test(navigator.userAgent);
        setIsTouchDevice(hasTouch);

        const handleHide = () => setIsVisible(false);
        const handleShow = () => setIsVisible(true);
        window.addEventListener("app_loading_start", handleHide);
        window.addEventListener("app_loading_end", handleShow);

        return () => {
            window.removeEventListener("app_loading_start", handleHide);
            window.removeEventListener("app_loading_end", handleShow);
        };
    }, []);

    const recoilValue = useMotionValue(0);
    const recoilSpring = useSpring(recoilValue, { stiffness: 800, damping: 12 });

    const combinedY = useTransform([y, recoilSpring], ([latestY, latestRecoil]) =>
        (latestY as number) + (latestRecoil as number)
    );

    const speed = useTransform([useVelocity(x), useVelocity(y)], ([vx, vy]) =>
        Math.sqrt(Math.pow(vx as number, 2) + Math.pow(vy as number, 2))
    );
    const stretch = useSpring(useTransform(speed, [0, 3000], [1, 1.15]), { stiffness: 400, damping: 30 });

    const executeShot = useCallback(() => {
        const now = Date.now();
        if (now - lastFireTime.current < 90 || isOverheatedRef.current) return;
        lastFireTime.current = now;

        const id = Math.random().toString(36).substr(2, 9);
        const pageX = mousePos.current.x + window.scrollX;
        const pageY = mousePos.current.y + window.scrollY;

        setFlashes(prev => [...prev, { id }]);
        setTimeout(() => setFlashes(prev => prev.filter(f => f.id !== id)), 50);

        recoilValue.set(-12);
        setTimeout(() => recoilValue.set(0), 40);

        const offX = (Math.random() - 0.5) * GUN_SETTINGS.PEW_SCATTER_RANGE;
        const offY = (Math.random() - 0.5) * GUN_SETTINGS.PEW_SCATTER_RANGE;

        setHoles(prev => [...prev, { id, x: pageX, y: pageY }].slice(-GUN_SETTINGS.MAX_VISIBLE_HOLES));
        setPews(prev => [...prev, { id, x: pageX, y: pageY, offsetX: offX, offsetY: offY }]);
        setTimeout(() => setPews(prev => prev.filter(p => p.id !== id)), 250);

        incrementHeat();
    }, [incrementHeat, recoilValue]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
        const handleDown = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest(INTERACTIVE_ELEMENTS) || window.getComputedStyle(target).cursor === 'pointer') return;

            executeShot();
            if (!isOverheatedRef.current) {
                fireInterval.current = setInterval(executeShot, GUN_SETTINGS.FIRE_RATE);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleDown);
        window.addEventListener("mouseup", stopFiring);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleDown);
            window.removeEventListener("mouseup", stopFiring);
            stopFiring();
        };
    }, [stopFiring, executeShot, fireInterval]);

    if (!isVisible || isTouchDevice || !mounted) return null;

    const circumference = 53.4;
    const currentOffset = circumference - (circumference * heat) / 100;

    const shakeStyle = heat > 5 ? {
        '--shake-x': `${(heat / 100) * 6}px`,
        '--shake-y': `${heat > 50 ? (heat / 100) * 3 : 0}px`,
    } as React.CSSProperties : {};

    return (
        <>
            {createPortal(
                <div className="absolute top-0 left-0 w-full pointer-events-none z-[9999]">
                    <AnimatePresence>
                        {holes.map((h) => (
                            <BulletHole key={h.id} x={h.x} y={h.y} onComplete={() => setHoles(p => p.filter(i => i.id !== h.id))} />
                        ))}
                    </AnimatePresence>
                    <AnimatePresence>
                        {pews.map((p) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, scale: 0.5, y: p.offsetY, rotate: Math.random() * 20 - 10 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1.4,
                                    y: p.offsetY - 40,
                                    rotate: Math.random() * 40 - 20
                                }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute pointer-events-none font-black text-[11px] italic tracking-[0.2em] text-black dark:text-white mix-blend-difference"
                                style={{
                                    left: p.x + p.offsetX,
                                    top: p.y,
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                PEW!
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>,
                document.body
            )}

            <motion.div
                className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
                style={{ x, y: combinedY, translateX: "-50%", translateY: "-50%" }}
            >
                <AnimatePresence>
                    {flashes.map(f => (
                        <motion.div
                            key={f.id}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 3.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute w-5 h-5 bg-white rounded-full blur-md"
                        />
                    ))}
                </AnimatePresence>

                <motion.div
                    className={`relative w-8 h-8 flex items-center justify-center ${heat > 5 ? 'animate-shake' : ''}`}
                    style={{
                        ...shakeStyle,
                        scaleX: stretch
                    }}
                >
                    <div className={`w-[3px] h-[3px] rounded-full transition-all duration-200 bg-white dark:bg-white shadow-[0_0_8px_white] ${isOverheated ? 'scale-150' : 'scale-100'}`} />

                    <motion.div
                        className={`absolute rounded-full border-[2px] transition-colors duration-300 border-white/50`}
                        animate={{
                            width: isFiring ? [14, 30, 22] : 22,
                            height: isFiring ? [14, 30, 22] : 22,
                            opacity: isOverheated ? [1, 0.3, 1] : 1
                        }}
                        transition={{
                            duration: 0.1,
                            opacity: { repeat: isOverheated ? Infinity : 0, duration: 0.2 }
                        }}
                    />

                    <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 24 24">
                        <circle
                            cx="12"
                            cy="12"
                            r="8.5"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeDasharray={circumference}
                            strokeDashoffset={currentOffset}
                            style={{
                                opacity: heat > 1 ? 0.9 : 0
                            }}
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </>
    );
}