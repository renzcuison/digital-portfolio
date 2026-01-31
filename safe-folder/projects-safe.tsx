// "use client";
// import React, { useRef } from "react";
// import { motion } from "framer-motion";
// import { useAboutScroll } from "@/hooks/use-about-scroll";
// import { TECH_STACK, PROJECTS_CONTENT } from "@/lib/constants";
// import { SKILL_ANIMATIONS } from "../src/components/layout/view/projects/skill-icons";

// export function Projects() {
//     const containerRef = useRef<HTMLDivElement>(null);
//     const { yTranslate, opacity } = useAboutScroll(containerRef);

//     return (
//         <section ref={containerRef} className="relative w-full pt-0 pb-24 px-8 md:px-12 overflow-hidden bg-transparent">
//             <motion.div
//                 style={{ opacity, y: yTranslate }}
//                 className="relative z-10 w-full flex flex-col xl:flex-row-reverse gap-8 lg:gap-32 items-stretch"
//             >
//                 <div className="w-full xl:w-[500px] shrink-0 z-20 flex flex-col justify-between text-right py-1">
//                     <div className="space-y-8">
//                         <div className="space-y-1">
//                             <span className="text-[10px] 2xl:text-xs font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white">
//                                 {PROJECTS_CONTENT.badge}
//                             </span>
//                             <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase italic text-slate-950 dark:text-white leading-none">
//                                 {PROJECTS_CONTENT.title}
//                             </h2>
//                         </div>
//                         <p className="max-w-xl ml-auto text-xs md:text-sm lg:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
//                             {PROJECTS_CONTENT.description}
//                         </p>
//                     </div>

//                     <div className="flex flex-col sm:flex-row-reverse gap-3 pt-12 w-full">
//                         <GithubButton url={PROJECTS_CONTENT.githubUrl} />
//                     </div>
//                 </div>

//                 <div className="flex-1 min-w-0 relative flex flex-col gap-4">
//                     <TechMarquee items={TECH_STACK} />
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                         {Object.entries(SKILL_ANIMATIONS).map(([title, Animation]) => (
//                             <SkillCard key={title} title={title}>
//                                 <Animation />
//                             </SkillCard>
//                         ))}
//                     </div>
//                 </div>
//             </motion.div>
//         </section>
//     );
// }

// const SkillCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
//     <div className="h-24 md:h-28 relative bg-white/50 dark:bg-black/40 backdrop-blur-sm border border-zinc-200 dark:border-white/10 rounded-[2vh] p-3 flex flex-col items-center justify-center gap-2">
//         <div className="flex-1 flex items-center justify-center scale-90">{children}</div>
//         <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-center">{title}</span>
//     </div>
// );

// const TechMarquee = ({ items }: { items: typeof TECH_STACK }) => (
//     <div className="flex-1 relative bg-white/50 dark:bg-black/40 backdrop-blur-sm border border-zinc-200 dark:border-white/10 rounded-[2vh] flex items-center overflow-hidden py-12 shadow-sm">
//         <motion.div
//             className="flex gap-16 items-center px-8"
//             animate={{ x: ["0%", "-50%"] }}
//             transition={{ duration: 25, ease: "linear", repeat: Infinity }}
//         >
//             {[...items, ...items].map((tech, index) => (
//                 <div key={index} className="flex flex-col items-center gap-3 shrink-0">
//                     <div className="w-12 h-12 flex items-center justify-center p-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 shadow-sm">
//                         <img src={`https://cdn.simpleicons.org/${tech.slug}`} alt={tech.name} className="w-full h-full object-contain" />
//                     </div>
//                     <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{tech.name}</span>
//                 </div>
//             ))}
//         </motion.div>
//     </div>
// );

// const GithubButton = ({ url }: { url: string }) => (
//     <motion.button
//         initial="initial"
//         whileHover="hover"
//         onClick={() => window.open(url, '_blank')}
//         className="group relative px-8 h-12 md:h-10 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer w-full sm:w-auto sm:min-w-[180px]"
//     >
//         <motion.div variants={{ initial: { y: "100%" }, hover: { y: 0 } }} transition={{ type: "spring", bounce: 0, duration: 0.4 }} className="absolute inset-0 bg-slate-950 dark:bg-white" />
//         <span className="relative text-xs md:text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
//             View GitHub Archive
//         </span>
//     </motion.button>
// );