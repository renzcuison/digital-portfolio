"use client";
import React from "react";
import { Check } from "lucide-react";
import { SiteConfig } from "@/lib/constants";

const navStyle = "text-[12px] font-medium tracking-[0.2em] text-[#000000] subpixel-antialiased select-none lowercase";

export function SocialActions({ copied, onCopyEmail }: { copied: boolean; onCopyEmail: () => void }) {
    return (
        <div className="hidden md:flex items-center select-none pointer-events-auto">
            <SocialLink href={SiteConfig.links.github} label="github" />

            { }
            <div className="mx-5 w-4 h-[1px] bg-black opacity-60 rotate-[-10deg]" />

            <SocialLink href={SiteConfig.links.linkedin} label="linkedin" />

            <div className="mx-5 w-4 h-[1px] bg-black opacity-60 rotate-[-10deg]" />

            <button
                onClick={onCopyEmail}
                className={`${navStyle} flex items-center gap-3 transition-colors duration-300 hover:text-[#8E8E8A] group`}
            >
                <div className="flex items-center justify-center">
                    {copied ? (
                        <Check className="h-3 w-3 text-[#000000] stroke-[2px]" />
                    ) : (

                        <div className="h-[3px] w-[3px] rounded-full bg-black/50 transition-all duration-300 group-hover:bg-[#8E8E8A]" />
                    )}
                </div>
                <span className="font-medium"> { }
                    {copied ? "copied" : "rbboy099@gmail.com"}
                </span>
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
            className={`${navStyle} font-medium transition-all duration-300 hover:text-[#8E8E8A]`}
        >
            {label}
        </a>
    );
}