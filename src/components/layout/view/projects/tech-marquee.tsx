import { motion } from "framer-motion";

interface TechItem {
    name: string;
    slug: string;
}

export const TechMarquee = ({ items }: { items: TechItem[] }) => (
    <div className="flex-1 relative bg-white/50 dark:bg-black/40 backdrop-blur-sm border border-zinc-200 dark:border-white/10 rounded-[2vh] flex items-center overflow-hidden py-12 shadow-sm">
        <div className="flex w-max">
            <motion.div
                className="flex gap-16 items-center px-8"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            >
                {[...items, ...items].map((tech, index) => (
                    <div key={index} className="flex flex-col items-center gap-3 shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm">
                            <img
                                src={`https://cdn.simpleicons.org/${tech.slug}`}
                                alt={tech.name}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                            {tech.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    </div>
);