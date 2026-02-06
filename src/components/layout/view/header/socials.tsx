"use client";
import React from "react";
import { Check } from "lucide-react";
import { SiteConfig } from "@/lib/constants";

const NAV_STYLE = "text-[10px] font-medium tracking-[0.5em] uppercase text-black antialiased select-none";

export function SocialActions({ copied, onCopyEmail }: { copied: boolean; onCopyEmail: () => void }) {
    return (
        <div className="hidden md:flex items-center gap-7">
            <SocialLink href={SiteConfig.links.github} label="Github" />

            <div className="h-3 w-[1.2px] bg-black/40 rotate-[25deg]" />

            <SocialLink href={SiteConfig.links.linkedin} label="Linkedin" />

            <div className="h-3 w-[1.2px] bg-black/40 rotate-[25deg]" />

            <button
                onClick={onCopyEmail}
                className={`${NAV_STYLE} transition-all duration-300 hover:opacity-40 flex items-center gap-4 group`}
            >
                <div className="relative flex items-center justify-center">
                    {copied ? (
                        <Check className="h-3 w-3 text-black stroke-[3px]" />
                    ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-black" />
                    )}
                </div>
                <span>{copied ? "Copied" : "Email"}</span>
            </button>
        </div>
    );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${NAV_STYLE} hover:opacity-40 transition-opacity duration-300`}
        >
            {label}
        </a>
    );
}