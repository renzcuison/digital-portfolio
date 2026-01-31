import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SyncStatusProps {
    holdProgress: number;
    isCurrentSynced: boolean;
    show: boolean;
    className?: string;
}

export function SyncStatus({ holdProgress, isCurrentSynced, show, className }: SyncStatusProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={cn(
                        "!hidden xl:!flex absolute bottom-20 left-1/2 -translate-x-1/2 z-[110] flex-col items-center pointer-events-none",
                        className
                    )}
                >
                    <motion.span
                        animate={isCurrentSynced ? { opacity: 0.5 } : { opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="text-[9px] uppercase tracking-[0.6em] text-slate-500 dark:text-zinc-500 mb-3 font-bold select-none"
                    >
                        {isCurrentSynced ? "Link Active" : holdProgress > 0 ? "Synchronizing..." : "Hold to Synchronize"}
                    </motion.span>

                    <div className="relative w-48 h-[2px]">
                        <div className="absolute inset-0 bg-slate-200 dark:bg-white/10 rounded-full" />
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                            style={{ width: `${holdProgress}%` }}
                        />
                        {isCurrentSynced && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -inset-1 bg-cyan-400/20 blur-sm rounded-full"
                            />
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}