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
                    transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                    className="fixed inset-0 bg-white z-[200] md:hidden antialiased"
                >
                    <nav className="flex flex-col items-center justify-center h-full">
                        <div className="flex flex-col items-center">

                            <MobileNavLink href={SiteConfig.links.github} delay={0.1}>
                                github
                            </MobileNavLink>

                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 0.6, width: "32px" }}
                                transition={{ delay: 0.15, duration: 0.8 }}
                                className="h-[1px] bg-black rotate-[-10deg] my-8 origin-center"
                            />

                            <MobileNavLink href={SiteConfig.links.linkedin} delay={0.2}>
                                linkedin
                            </MobileNavLink>

                            <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 0.6, width: "32px" }}
                                transition={{ delay: 0.25, duration: 0.8 }}
                                className="h-[1px] bg-black rotate-[-10deg] my-8 origin-center"
                            />

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                onClick={onCopyEmail}
                                className="flex flex-col items-center group py-4"
                            >
                                <span className="text-[14px] font-medium tracking-[0.3em] lowercase transition-colors duration-300 group-hover:text-[#8E8E8A]">
                                    {copied ? "copied" : "email"}
                                </span>
                                {!copied && (
                                    <span className="text-[8px] mt-4 font-medium opacity-20 lowercase tracking-[0.4em]">
                                        rbboy099@gmail.com
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
            transition={{ delay, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            whileTap={{ color: "#8E8E8A", scale: 0.95 }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14px] font-medium tracking-[0.3em] lowercase text-black py-4 transition-colors duration-300 hover:text-[#8E8E8A]"
        >
            {children}
        </motion.a>
    );
}