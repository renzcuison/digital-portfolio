// import { motion } from "framer-motion";

// export const SKILL_ANIMATIONS = {
//     "Full-Stack": () => (
//         <div className="relative w-16 h-12 flex flex-col gap-2 items-center justify-center">
//             <motion.div animate={{ width: [30, 45, 30] }} transition={{ duration: 2, repeat: Infinity }} className="h-1.5 w-10 bg-zinc-400/50 rounded-full" />
//             <motion.div animate={{ scaleX: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} className="h-2 w-12 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
//             <motion.div animate={{ width: [30, 45, 30] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} className="h-1.5 w-10 bg-zinc-400/50 rounded-full" />
//         </div>
//     ),
//     "UI/UX Design": () => (
//         <div className="relative w-12 h-10 border-2 border-dashed border-zinc-300 dark:border-white/20 rounded-sm">
//             <motion.div animate={{ top: ["10%", "60%", "10%"], left: ["10%", "60%", "10%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_10px_#22d3ee]" />
//             <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-2 right-2 w-4 h-1 bg-zinc-400/40 rounded-full" />
//         </div>
//     ),
//     "DB Management": () => (
//         <div className="flex flex-col gap-1 w-10">
//             {[0, 1, 2].map((i) => (
//                 <div key={i} className="h-2 w-full bg-zinc-400/10 rounded-sm overflow-hidden relative border border-white/5">
//                     <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} className="absolute inset-0 bg-emerald-500/40" />
//                     <div className="absolute inset-y-0 left-1 w-1 bg-emerald-500" />
//                 </div>
//             ))}
//         </div>
//     ),
//     "Sys Architecture": () => (
//         <div className="relative w-12 h-12 flex items-center justify-center">
//             <svg width="40" height="40" viewBox="0 0 40 40" className="text-purple-500">
//                 <motion.circle cx="20" cy="20" r="4" fill="currentColor" animate={{ r: [4, 6, 4] }} transition={{ repeat: Infinity, duration: 2 }} />
//                 <motion.path d="M20 20 L35 5 M20 20 L35 35 M20 20 L5 35 M20 20 L5 5" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" animate={{ strokeDashoffset: [0, -10] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="opacity-40" />
//             </svg>
//         </div>
//     ),
// };