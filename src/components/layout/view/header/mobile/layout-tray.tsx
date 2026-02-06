"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SiteConfig } from "@/lib/constants";

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    copied: boolean;
    onCopyEmail: () => void;
}

export function MobileMenu({ isOpen, setIsOpen, copied, onCopyEmail }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 bg-white z-[200] md:hidden antialiased"
                >
                    <nav className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center">
                            <MobileNavLink href={SiteConfig.links.github} delay={0.1}>
                                Github
                            </MobileNavLink>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.2, scale: 1 }}
                                transition={{ delay: 0.15 }}
                                className="h-12 w-[1.5px] bg-black rotate-[25deg] my-4"
                            />

                            <MobileNavLink href={SiteConfig.links.linkedin} delay={0.2}>
                                Linkedin
                            </MobileNavLink>

                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 0.2, scale: 1 }}
                                transition={{ delay: 0.25 }}
                                className="h-12 w-[1.5px] bg-black rotate-[25deg] my-4"
                            />

                            <motion.button
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                onClick={onCopyEmail}
                                className="flex flex-col items-center group text-black py-4"
                            >
                                <span className="text-xl font-light tracking-[0.5em] uppercase">
                                    {copied ? "Copied" : "Email"}
                                </span>
                                {!copied && (
                                    <span className="text-[9px] mt-4 font-light opacity-30 uppercase tracking-[0.3em]">
                                        Touch to copy
                                    </span>
                                )}
                            </motion.button>
                        </div>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function MobileNavLink({ href, delay, children }: { href: string; delay: number; children: React.ReactNode; }) {
    return (
        <motion.a
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-light tracking-[0.5em] uppercase text-black py-4"
        >
            {children}
        </motion.a>
    );
}