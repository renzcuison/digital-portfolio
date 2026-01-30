"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useVelocity, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion";

import { useMousePosition } from "@/hooks/use-mouse-position";
import { useWeapon } from "@/hooks/use-weapon";
import { BulletHole } from "./bullet-hole";
import { GUN_SETTINGS, INTERACTIVE_ELEMENTS } from "@/lib/constants";

export function CursorFollower() {
    const { x, y } = useMousePosition();
    const { heat, isFiring, isOverheated, incrementHeat, fireInterval, stopFiring } = useWeapon();

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkLoading = () => {
            const loader = document.querySelector('[data-loading-active="true"]') ||
                document.querySelector('.loading-screen-container');

            setIsVisible(!loader);
        };

        const interval = setInterval(checkLoading, 100);
        return () => clearInterval(interval);
    }, []);

    const [holes, setHoles] = useState<{ id: string; x: number; y: number }[]>([]);
    const [pews, setPews] = useState<{ id: string; x: number; y: number; offsetX: number; offsetY: number }[]>([]);

    const mousePos = useRef({ x: 0, y: 0 });
    const lastFireTime = useRef<number>(0);

    const recoilValue = useMotionValue(0);
    const recoilSpring = useSpring(recoilValue, {
        stiffness: GUN_SETTINGS.RECOIL_STIFFNESS,
        damping: GUN_SETTINGS.RECOIL_DAMPING
    });

    const combinedY = useTransform([y, recoilSpring], ([latestY, latestRecoil]) =>
        (latestY as number) + (latestRecoil as number)
    );

    const speed = useTransform([useVelocity(x), useVelocity(y)], ([vx, vy]) =>
        Math.sqrt(Math.pow(vx as number, 2) + Math.pow(vy as number, 2))
    );
    const stretch = useSpring(useTransform(speed, [0, 3000], [1, 1.15]), { stiffness: 400, damping: 30 });

    const executeShot = () => {
        const now = Date.now();
        if (now - lastFireTime.current < 90) return;
        lastFireTime.current = now;

        const id = Math.random().toString(36).substr(2, 9);
        const { x: curX, y: curY } = mousePos.current;

        recoilValue.set(GUN_SETTINGS.RECOIL_FORCE);
        setTimeout(() => recoilValue.set(0), 30);

        const offX = (Math.random() - 0.5) * GUN_SETTINGS.PEW_SCATTER_RANGE;
        const offY = (Math.random() - 0.5) * GUN_SETTINGS.PEW_SCATTER_RANGE;

        setHoles(prev => [...prev, { id, x: curX, y: curY }].slice(-GUN_SETTINGS.MAX_VISIBLE_HOLES));
        setPews(prev => [...prev, { id, x: curX, y: curY, offsetX: offX, offsetY: offY }]);
        setTimeout(() => setPews(prev => prev.filter(p => p.id !== id)), 250);

        incrementHeat();
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY }; };

        const handleDown = (e: MouseEvent) => {
            if (isOverheated) return;

            const target = e.target as HTMLElement;
            if (target.closest(INTERACTIVE_ELEMENTS) || window.getComputedStyle(target).cursor === 'pointer') return;

            executeShot();
            fireInterval.current = setInterval(executeShot, GUN_SETTINGS.FIRE_RATE);
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
    }, [isOverheated, stopFiring]);

    if (!isVisible) return null;

    return (
        <>
            <AnimatePresence>
                {holes.map((h) => (
                    <BulletHole key={h.id} x={h.x} y={h.y} onComplete={() => setHoles(p => p.filter(i => i.id !== h.id))} />
                ))}
            </AnimatePresence>

            <AnimatePresence>
                {pews.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: p.offsetY }}
                        animate={{ opacity: 1, y: p.offsetY - 20 }}
                        exit={{ opacity: 0 }}
                        className="fixed pointer-events-none z-[9999] text-white font-black text-[10px] italic mix-blend-difference tracking-widest"
                        style={{ left: p.x + p.offsetX, top: p.y, transform: "translate(-50%, -50%)" }}
                    >PEW!</motion.div>
                ))}
            </AnimatePresence>

            <motion.div
                className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
                style={{ x, y: combinedY, translateX: "-50%", translateY: "-50%" }}
            >
                <motion.div
                    className="relative flex items-center justify-center"
                    animate={{
                        scale: isFiring ? [1, 0.85, 1] : 1,
                        x: isOverheated ? [0, -1, 1, -1, 1, 0] : 0
                    }}
                    transition={isOverheated ? { repeat: Infinity, duration: 0.1 } : {}}
                    style={{ scaleX: stretch }}
                >
                    <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors duration-300 border-2`}
                        style={{
                            background: isOverheated
                                ? 'transparent'
                                : `conic-gradient(white ${heat}%, transparent ${heat}%)`,
                            borderColor: isOverheated ? '#dc2626' : 'rgba(255,255,255,0.2)',
                            WebkitMask: 'radial-gradient(transparent 58%, black 60%)',
                        }}
                    />

                    <div className="absolute flex items-center justify-center">
                        <div className={`w-1 h-1 rotate-[45deg] transition-colors ${isOverheated ? 'bg-red-600 shadow-[0_0_8px_red]' : 'bg-white'}`} />

                        {[0, 90, 180, 270].map((angle) => (
                            <div
                                key={angle}
                                className={`absolute w-[1px] h-2 transition-colors ${isOverheated ? 'bg-red-600' : 'bg-white/60'}`}
                                style={{ transform: `rotate(${angle}deg) translate(0, -12px)` }}
                            />
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}