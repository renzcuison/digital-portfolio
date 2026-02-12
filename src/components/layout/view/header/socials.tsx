"use client";
import React, { useState, useEffect } from "react";
import { Check, Sun, Moon } from "lucide-react";
import { SiteConfig } from "@/lib/constants";

const navStyle = "text-[12px] font-semibold tracking-[0.1em] text-[#000000] subpixel-antialiased select-none uppercase";

export function SocialActions({ copied, onCopyEmail }: { copied: boolean; onCopyEmail: () => void }) {
    return (
        <div className="hidden md:flex items-center gap-8 select-none pointer-events-auto">
            <SocialLink href={SiteConfig.links.github} label="github" />
            <SocialLink href={SiteConfig.links.linkedin} label="linkedin" />

            <div className="flex items-center gap-8">
                <button
                    onClick={onCopyEmail}
                    className={`${navStyle} flex items-center transition-colors duration-300 hover:opacity-50`}
                >
                    <span className="flex items-center gap-2">
                        {copied && <Check className="h-3 w-3 stroke-[2.5px]" />}
                        {copied ? "copied" : "EMAIL"}
                    </span>
                </button>

                <RealTimeClock />
            </div>
        </div>
    );
}

function RealTimeClock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hour = time.getHours();
    const isDay = hour >= 6 && hour < 18;

    return (
        <div className="flex items-center gap-2.5">
            <div className={`${navStyle} tabular-nums`}>
                {time.toLocaleTimeString("en-US", {
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                })}
            </div>
            <div className="flex items-center justify-center translate-y-[-0.5px]">
                {isDay ? (
                    <Sun className="h-3 w-3 text-black fill-black stroke-[0.5px]" />
                ) : (
                    <Moon className="h-3 w-3 text-black fill-black stroke-[0.5px]" />
                )}
            </div>
        </div>
    );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${navStyle} transition-all duration-300 hover:opacity-50`}
        >
            {label}
        </a>
    );
}