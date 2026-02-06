// "use client";
// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { PROJECTS } from "@/lib/constants";
// import { Navigation } from "lucide-react";
// import { MAP_POSITIONS, MAP_CONFIG } from "@/lib/constants/project-map";
// import { ProjectNode } from "./project-node";
// import { ProjectHeroCard } from "./project-hero-card";

// export function ProjectTimeline() {
//     const [activeId, setActiveId] = useState(PROJECTS[0].id);
//     const [hoveredProject, setHoveredProject] = useState<any>(null);

//     return (
//         <section className="w-full">
//             <div className="flex flex-col lg:flex-row-reverse gap-4 items-stretch h-auto lg:h-[580px]">
//                 <div className="relative w-full lg:w-[38%] bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-zinc-200 dark:border-white/10 rounded-[2.5vh] overflow-visible min-h-[450px] lg:min-h-0 cursor-default">
//                     <div className="absolute inset-0 opacity-30 dark:opacity-40 pointer-events-none overflow-hidden rounded-[2.5vh]">
//                         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//                             <defs>
//                                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                                     <path
//                                         d="M 40 0 L 0 0 0 40"
//                                         fill="none"
//                                         stroke="currentColor"
//                                         strokeWidth="1"
//                                         className="text-zinc-300 dark:text-zinc-800"
//                                     />
//                                 </pattern>
//                             </defs>
//                             <rect width="100%" height="100%" fill="url(#grid)" />
//                         </svg>
//                     </div>

//                     <div className="absolute inset-0 p-4 flex justify-between items-start pointer-events-none opacity-30">
//                         <div className="text-[8px] font-mono uppercase tracking-tighter">
//                             Lat: {MAP_CONFIG.LAT}<br />Lon: {MAP_CONFIG.LON}
//                         </div>
//                         <div className="text-[8px] font-mono uppercase text-right">
//                             Alt: {MAP_CONFIG.ALT}<br />Status: {MAP_CONFIG.STATUS}
//                         </div>
//                     </div>

//                     {PROJECTS.map((project, index) => (
//                         <ProjectNode
//                             key={project.id}
//                             project={project}
//                             isActive={activeId === project.id}
//                             isHovered={hoveredProject?.id === project.id}
//                             onSelect={setActiveId}
//                             onHover={setHoveredProject}
//                             position={MAP_POSITIONS[index] || { left: '50%', top: '50%' }}
//                         />
//                     ))}

//                     <div className="absolute bottom-6 right-6 flex items-center gap-3">
//                         <div className="flex flex-col text-right">
//                             <span className="text-[7px] font-mono text-zinc-400 uppercase tracking-[0.2em]">Map_Reference</span>
//                             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{MAP_CONFIG.SECTOR}</span>
//                         </div>
//                         <Navigation size={14} className="text-cyan-500" />
//                     </div>
//                 </div>

//                 <div className="flex-1 relative">
//                     <AnimatePresence mode="wait">
//                         {PROJECTS.filter(p => p.id === activeId).map((project) => (
//                             <motion.div
//                                 key={project.id}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: 20 }}
//                                 transition={{ duration: 0.4 }}
//                                 className="h-full"
//                             >
//                                 <ProjectHeroCard project={project} />
//                             </motion.div>
//                         ))}
//                     </AnimatePresence>
//                 </div>
//             </div>
//         </section>
//     );
// }