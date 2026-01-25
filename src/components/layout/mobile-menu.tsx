import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface MobileMenuProps {
    isOpen: boolean;
    copied: boolean;
    onCopyEmail: () => void;
}

export function MobileMenu({ isOpen, copied, onCopyEmail }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-3xl z-[200] md:hidden"
                >
                    <nav className="flex flex-col justify-center h-full px-12 gap-12 pointer-events-auto">
                        <div className="flex flex-col gap-10">
                            <MobileNavLink href={SITE_CONFIG.links.github} delay={0.1}>GitHub</MobileNavLink>
                            <MobileNavLink href={SITE_CONFIG.links.linkedin} delay={0.2}>LinkedIn</MobileNavLink>
                            <button onClick={onCopyEmail} className="flex flex-col text-left group">
                                <span className="text-3xl font-light tracking-tight text-slate-900 dark:text-white">E-mail</span>
                                <span className="text-xs font-mono text-slate-400 dark:text-zinc-600">
                                    {copied ? "[copied to clipboard!]" : `[${SITE_CONFIG.email}]`}
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center justify-between pt-12 border-t border-slate-200 dark:border-zinc-800">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 dark:text-zinc-600 font-bold">Appearance</span>
                            <ModeToggle />
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            href={href}
            target="_blank"
            className="text-3xl font-light tracking-tight text-slate-900 dark:text-white"
        >
            {children}
        </motion.a>
    );
}