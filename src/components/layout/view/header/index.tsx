"use client";
import React from "react";
import { Logo } from "./logo";
import { SocialActions } from "./socials";
import { MobileToggle } from "./mobile/close-button";

interface HeaderProps {
    menuOpen: boolean;
    setMenuOpen: (val: boolean) => void;
    copied: boolean;
    onCopyEmail: () => void;
}

export function Header({ menuOpen, setMenuOpen, copied, onCopyEmail }: HeaderProps) {
    return (
        <header className="w-full px-6 md:px-12 py-4 md:py-6 flex items-center justify-between pointer-events-auto relative z-[250] bg-transparent">
            <Logo menuOpen={menuOpen} />

            <div className="flex items-center gap-6 md:gap-8">
                <SocialActions copied={copied} onCopyEmail={onCopyEmail} />
                <MobileToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
        </header>
    );
}