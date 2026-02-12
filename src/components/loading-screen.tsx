"use client";
import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

interface LoadingScreenProps {
    onFinished?: () => void;
}

export function LoadingScreen({ onFinished }: LoadingScreenProps) {
    const { progress } = useProgress();
    const [active, setActive] = useState(true);
    const [isSliding, setIsSliding] = useState(false);

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => {
                setIsSliding(true);
                setTimeout(() => {
                    setActive(false);
                    if (onFinished) onFinished();
                }, 1000);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    if (!active) return null;

    return (
        <div
            className={`fixed inset-0 z-[10000] bg-white transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
                isSliding ? "translate-y-full" : "translate-y-0"
            }`}
        >
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <div className="relative flex items-center">
                    <span className="text-[24px] md:text-[26px] font-bold tracking-[0.2em] text-black antialiased lowercase leading-none">
                        cui
                    </span>

                    <div className="mx-3 relative flex items-center justify-center w-[30px] h-10">
                        <div
                            className="w-full h-[1px] bg-black origin-center"
                            style={{
                                animation: 'spin-modern 2.4s cubic-bezier(0.68,-0.55,0.265,1.55) infinite'
                            }}
                        />
                    </div>

                    <span className="text-[24px] md:text-[26px] font-bold tracking-[0.2em] text-black antialiased lowercase leading-none">
                        son
                    </span>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin-modern {
                    0% { transform: rotate(-10deg); }
                    80%, 100% { transform: rotate(350deg); }
                }
            `}</style>
        </div>
    );
}