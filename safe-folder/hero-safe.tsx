// "use client";
// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { COMPANIONS, CompanionId } from "@/lib/constants";

// interface HeroProps {
//     activeCompanion: typeof COMPANIONS[number];
//     selectedId: CompanionId;
//     setSelectedId: (id: CompanionId) => void;
//     isBoosting: boolean;
// }

// export function Hero({ activeCompanion, selectedId, setSelectedId, isBoosting }: HeroProps) {
//     return (
//         <div className="flex flex-col flex-1 w-full">
//             <div className="w-full px-8 md:px-12 mt-4 flex justify-between items-start">
//                 <div className="flex flex-col gap-1 2xl:gap-1.5">
//                     <SectionLabel>Neural.Link</SectionLabel>
//                     <StatusIndicator isBoosting={isBoosting} />
//                 </div>

//                 <div className="flex flex-col items-end gap-1">
//                     <SectionLabel className="-mr-[0.4em]">Protocol: Select</SectionLabel>
//                     <span className="text-[8px] 2xl:text-[10px] font-mono text-zinc-500">
//                         ACTIVE_MODE: {activeCompanion.id.toUpperCase()}
//                     </span>
//                 </div>
//             </div>

//             <div className="flex-1 w-full" />

//             <div className="w-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8">

//                 {/* Selection Interface */}
//                 <div className="w-full md:max-w-[320px] 2xl:max-w-[450px] space-y-5 pointer-events-auto">
//                     <div className="space-y-3">
//                         <SectionLabel>Select Interface</SectionLabel>
//                         <div className="flex gap-2 2xl:gap-4 w-full">
//                             {COMPANIONS.map((comp, idx) => (
//                                 <CompanionSelector
//                                     key={comp.id}
//                                     id={comp.id}
//                                     index={idx}
//                                     isActive={selectedId === comp.id}
//                                     onClick={() => setSelectedId(comp.id)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                     <p className="hidden sm:block text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-tight">
//                         Initialize synchronization to deploy the active entity into the workspace.
//                     </p>
//                 </div>

//                 {/* Name and Bio */}
//                 <div className="w-full md:max-w-[350px] lg:max-w-[450px] text-left md:text-right pointer-events-auto">
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={selectedId}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: -20 }}
//                             className="space-y-3 md:space-y-2"
//                         >
//                             <h2 className="text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-extrabold uppercase italic text-slate-950 dark:text-white leading-none">
//                                 {activeCompanion.name}
//                             </h2>
//                             <p className="text-xs md:text-sm lg:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium md:ml-auto tracking-tight">
//                                 {activeCompanion.bio}
//                             </p>
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//     return (
//         <span className={`text-[10px] 2xl:text-xs font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white ${className}`}>
//             {children}
//         </span>
//     );
// }

// function StatusIndicator({ isBoosting }: { isBoosting: boolean }) {
//     return (
//         <span className={`text-[8px] 2xl:text-[10px] font-mono flex items-center gap-2 transition-colors duration-300 ${isBoosting ? "text-cyan-400 font-bold" : "text-zinc-500"}`}>
//             <span className="relative flex h-2 w-2">
//                 <span className={`absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping ${isBoosting ? "bg-red-400" : "bg-cyan-400"}`} />
//                 <span className={`relative inline-flex rounded-full h-2 w-2 ${isBoosting ? "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"}`} />
//             </span>
//             {isBoosting ? "SYSTEM_BOOST_ACTIVE_099" : "STABLE_CONNECTION_001"}
//         </span>
//     );
// }

// function CompanionSelector({ id, index, isActive, onClick }: { id: string; index: number; isActive: boolean; onClick: () => void }) {
//     return (
//         <button
//             onClick={onClick}
//             className="group relative flex-1 h-12 md:h-10 border border-zinc-200 dark:border-white/10 flex items-center justify-center overflow-hidden cursor-pointer"
//         >
//             <motion.div
//                 className="absolute inset-0 bg-slate-950 dark:bg-white"
//                 initial={false}
//                 animate={{ y: isActive ? 0 : "100%" }}
//                 transition={{ type: "spring", bounce: 0, duration: 0.4 }}
//             />
//             <span className={`relative text-xs md:text-[10px] font-bold transition-colors duration-300 ${isActive ? "text-white dark:text-black" : "text-zinc-500"}`}>
//                 0{index + 1}
//             </span>
//         </button>
//     );
// }