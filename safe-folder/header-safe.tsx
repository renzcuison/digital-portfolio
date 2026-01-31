// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/global/button";
// import { Github, Mail, Linkedin, Check } from "lucide-react";
// import { ModeToggle } from "@/components/ui/theme/mode-toggle";
// import { SITE_CONFIG } from "@/lib/constants";

// interface HeaderProps {
//     menuOpen: boolean;
//     setMenuOpen: (val: boolean) => void;
//     copied: boolean;
//     onCopyEmail: () => void;
// }

// export function Header({ menuOpen, setMenuOpen, copied, onCopyEmail }: HeaderProps) {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <header className="w-full px-6 py-3 flex items-center justify-between pointer-events-auto relative z-[250]">
//             <div
//                 className={`flex items-center group cursor-default select-none transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
//                     }`}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 onClick={() => setIsHovered(!isHovered)}
//             >
//                 <div className="flex items-center font-black tracking-tighter text-slate-950 dark:text-white text-xl md:text-2xl leading-none">
//                     <span>R</span>
//                     <div className={`flex overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"}`}>
//                         <span>enz</span>
//                     </div>
//                     <span>C</span>
//                     <div className={`flex overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0"}`}>
//                         <span>uison</span>
//                     </div>
//                 </div>
//             </div>

//             <div className="hidden md:flex items-center gap-1 -mr-2">
//                 <SocialButton href={SITE_CONFIG.links.github} icon={<Github className="h-5 w-5" />} label="GitHub" />
//                 <SocialButton href={SITE_CONFIG.links.linkedin} icon={<Linkedin className="h-5 w-5" />} label="LinkedIn" />

//                 <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={onCopyEmail}
//                     className="text-slate-950 dark:text-white group w-auto px-2 justify-start overflow-hidden transition-all duration-300"
//                 >
//                     <div className="flex items-center">
//                         <div className="shrink-0">
//                             {copied ? <Check className="h-5 w-5 text-green-500" /> : <Mail className="h-5 w-5" />}
//                         </div>
//                         <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] group-hover:ml-2 transition-all duration-300 text-sm font-medium whitespace-nowrap">
//                             {copied ? "Copied!" : SITE_CONFIG.email}
//                         </span>
//                     </div>
//                 </Button>

//                 <div className="border-l border-slate-200 dark:border-zinc-800 ml-1 pl-1">
//                     <ModeToggle />
//                 </div>
//             </div>

//             <button
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="md:hidden relative z-[210] w-10 h-10 flex flex-col items-end justify-center gap-1.5 focus:outline-none"
//             >
//                 <motion.span
//                     animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
//                     className="h-[1.2px] w-5 bg-slate-950 dark:bg-white block origin-center transition-colors"
//                 />
//                 <motion.span
//                     animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
//                     className="h-[1.2px] w-5 bg-slate-950 dark:bg-white block origin-center transition-colors"
//                 />
//             </button>
//         </header>
//     );
// }

// function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
//     return (
//         <Button variant="ghost" size="icon" asChild className="text-slate-950 dark:text-white group w-auto px-2 justify-start overflow-hidden transition-all duration-300">
//             <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center">
//                 <div className="shrink-0">{icon}</div>
//                 <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 text-sm font-medium whitespace-nowrap">
//                     {label}
//                 </span>
//             </a>
//         </Button>
//     );
// }