"use client";
import React from "react";
import { ModeToggle } from "@/components/ui/theme/mode-toggle";
import { Logo } from "./logo";
import { SocialActions } from "./social-actions";
import { MobileToggle } from "./mobile-toggle";

interface HeaderProps {
    menuOpen: boolean;
    setMenuOpen: (val: boolean) => void;
    copied: boolean;
    onCopyEmail: () => void;
}

export function Header({ menuOpen, setMenuOpen, copied, onCopyEmail }: HeaderProps) {
    return (
        <header className="w-full px-6 py-3 flex items-center justify-between pointer-events-auto relative z-[250]">
            <Logo menuOpen={menuOpen} />

            <div className="flex items-center gap-2">
                <SocialActions copied={copied} onCopyEmail={onCopyEmail} />

                <div className="hidden md:block border-l border-slate-200 dark:border-zinc-800 ml-1 pl-1 -mr-2">
                    <ModeToggle />
                </div>

                <MobileToggle menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
        </header>
    );
}

export { MobileMenu } from "./mobile-menu";