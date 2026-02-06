// "use client";

// import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
// import React, { useState, useEffect, useMemo } from "react";
// import { useTheme } from "next-themes";
// import { COMPANION_THEMES, getGradientString, COMPANION_CONFIG } from "@/lib/constants";
// import { useCompanionAnimation } from "@/hooks/companion/use-companion-animation";
// import { useImagePreloader } from "@/hooks/companion/use-image-preloader";
// import { useCompanionZoom } from "@/hooks/companion/use-companion-zoom";

// interface CompanionProps {
//     characterId: keyof typeof COMPANION_THEMES;
//     imagePath: string;
//     isActive: boolean;
//     isBoosting: boolean;
//     isMobile: boolean;
//     mouseRawX: any;
//     mouseRawY: any;
//     onStartHold?: () => void;
//     onStopHold?: () => void;
//     onLoad?: () => void;
// }

// export default function Companion({
//     characterId,
//     imagePath,
//     isActive,
//     isBoosting,
//     isMobile,
//     mouseRawX,
//     mouseRawY,
//     onStartHold,
//     onStopHold,
//     onLoad
// }: CompanionProps) {
//     const { theme } = useTheme();
//     const [mounted, setMounted] = useState(false);

//     const imageLoaded = useImagePreloader(imagePath, onLoad);
//     const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

//     useEffect(() => {
//         const img = new Image();
//         img.src = imagePath;
//         if (img.complete) {
//             setHasLoadedOnce(true);
//         } else {
//             setHasLoadedOnce(false);
//             img.onload = () => setHasLoadedOnce(true);
//         }
//     }, [imagePath]);

//     useEffect(() => {
//         if (imageLoaded) setHasLoadedOnce(true);
//     }, [imageLoaded]);

//     const anim = useCompanionAnimation(isActive, isBoosting);
//     const rawZoom = useSpring(1, COMPANION_CONFIG.SPRING_ZOOM);
//     const mouseX = useSpring(mouseRawX, COMPANION_CONFIG.SPRING_MOUSE);
//     const mouseY = useSpring(mouseRawY, COMPANION_CONFIG.SPRING_MOUSE);
//     const { containerRef, setIsHovering } = useCompanionZoom(rawZoom);

//     const activeTheme = theme === "dark" ? "dark" : "light";
//     const characterTheme = COMPANION_THEMES[characterId] || Object.values(COMPANION_THEMES)[0];
//     const themeConfig = characterTheme[activeTheme];

//     const dotColor = themeConfig.dot;
//     const { TRANSFORMS } = COMPANION_CONFIG;

//     const translateX = useTransform(mouseX as any, TRANSFORMS.TRANSLATE_X.input, TRANSFORMS.TRANSLATE_X.output);
//     const rotateX = useTransform(mouseY as any, TRANSFORMS.ROTATE_X.input, TRANSFORMS.ROTATE_X.output);
//     const rotateY = useTransform(mouseX as any, TRANSFORMS.ROTATE_Y.input, TRANSFORMS.ROTATE_Y.output);
//     const combinedY = useTransform(mouseY, (latest: any) => Number(latest) * TRANSFORMS.MOUSE_Y_MULTIPLIER);

//     const finalScale = useTransform([rawZoom, anim.time], ([z, t]) =>
//         (z as number) * (1 + Math.sin((t as number) * 2) * TRANSFORMS.BREATH_AMPLITUDE)
//     );

//     const rgbBackground = useTransform(
//         [anim.p1x, anim.p1y, anim.p2x, anim.p2y],
//         ([x1, y1, x2, y2]) => getGradientString(
//             activeTheme,
//             themeConfig as any,
//             { x1: x1 as number, y1: y1 as number, x2: x2 as number, y2: y2 as number },
//             isMobile
//         )
//     );

//     useEffect(() => { setMounted(true); }, []);

//     if (!mounted) return null;

//     return (
//         <div
//             className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-transparent pointer-events-none select-none"
//             style={{ perspective: "1200px", cursor: "auto" }}
//         >
//             <AnimatePresence mode="popLayout">
//                 {!hasLoadedOnce && (
//                     <motion.div
//                         key="halo-loader"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: [0.1, 0.3, 0.1] }}
//                         exit={{ opacity: 0 }}
//                         transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
//                         className="absolute w-64 h-80 blur-[80px] rounded-full"
//                         style={{ background: themeConfig.halo }}
//                     />
//                 )}
//             </AnimatePresence>

//             <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: hasLoadedOnce ? 1 : 0.98 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 ref={containerRef}
//                 onMouseEnter={() => setIsHovering(true)}
//                 onMouseLeave={() => {
//                     setIsHovering(false);
//                     onStopHold?.();
//                 }}
//                 style={{
//                     rotateX: isMobile ? 0 : rotateX,
//                     rotateY: isMobile ? 0 : rotateY,
//                     x: translateX,
//                     y: combinedY,
//                     scale: finalScale,
//                     transformStyle: "preserve-3d",
//                 }}
//                 className="relative flex items-center justify-center w-full h-full max-w-[700px] 2xl:max-w-[900px] 3xl:max-w-[1100px] -translate-y-19 md:translate-y-0 will-change-transform pointer-events-none"
//             >
//                 <AnimatePresence mode="wait">
//                     <motion.div
//                         key={imagePath}
//                         initial={{ opacity: 0, scale: 0.98 }}
//                         animate={{ opacity: hasLoadedOnce ? 1 : 0, scale: hasLoadedOnce ? 1 : 0.98 }}
//                         exit={{ opacity: 0, scale: 1.02 }}
//                         transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
//                         className="relative w-full h-full max-h-[45vh] md:max-h-[50vh] 2xl:max-h-[70vh] flex items-center justify-center pointer-events-auto"
//                         onMouseDown={(e) => {
//                             e.stopPropagation();
//                             onStartHold?.();
//                         }}
//                         onMouseUp={(e) => {
//                             e.stopPropagation();
//                             onStopHold?.();
//                         }}
//                         onMouseLeave={(e) => {
//                             e.stopPropagation();
//                             onStopHold?.();
//                         }}
//                         style={{ filter: isMobile ? "none" : themeConfig.filter }}
//                     >
//                         <motion.div
//                             className="relative w-full h-full p-4 md:p-12 pointer-events-none"
//                             style={{
//                                 WebkitMaskImage: `url("${imagePath}")`,
//                                 maskImage: `url("${imagePath}")`,
//                                 WebkitMaskSize: "contain",
//                                 maskSize: "contain",
//                                 WebkitMaskRepeat: "no-repeat",
//                                 WebkitMaskPosition: "center",
//                                 backgroundColor: !hasLoadedOnce ? themeConfig.fallbackBg : 'transparent',
//                                 opacity: hasLoadedOnce ? 1 : 0.5,
//                                 transform: "translateZ(0)",
//                                 WebkitBackfaceVisibility: "hidden"
//                             }}
//                         >
//                             <motion.div className="absolute inset-0 opacity-95" style={{
//                                 background: rgbBackground as any,
//                                 backgroundSize: "22px 22px",
//                                 WebkitMaskImage: `radial-gradient(var(--dw) var(--dh) at 50% 50%, ${dotColor} 85%, transparent 105%)`,
//                                 WebkitMaskSize: `11px 11px`,
//                                 WebkitMaskPosition: anim.posLayer1 as any,
//                                 // @ts-ignore
//                                 "--dw": anim.dwStr, "--dh": anim.dhStr,
//                                 transform: "rotate(-12deg) scale(1.5)"
//                             }} />

//                             {!isMobile && (
//                                 <>
//                                     <motion.div className="absolute inset-0 opacity-40" style={{ background: rgbBackground as any, backgroundSize: "14px 14px", WebkitMaskImage: `radial-gradient(1px 1px at 50% 50%, ${dotColor} 90%, transparent 100%)`, WebkitMaskSize: `7px 7px`, WebkitMaskPosition: anim.posLayer4 as any, transform: "rotate(10deg) scale(1.5)" }} />
//                                     <motion.div className="absolute inset-0 opacity-50" style={{
//                                         background: rgbBackground as any, backgroundSize: "46px 46px", WebkitMaskImage: `radial-gradient(var(--bw) var(--bh) at 50% 50%, ${dotColor} 70%, transparent 100%)`, WebkitMaskSize: `23px 23px`, WebkitMaskPosition: anim.posLayer3 as any, // @ts-ignore
//                                         "--bw": anim.blobW, "--bh": anim.blobH, transform: "rotate(45deg) scale(1.6)"
//                                     }} />
//                                     <motion.div className="absolute inset-0 opacity-80" style={{
//                                         background: rgbBackground as any, backgroundSize: "28px 28px", WebkitMaskImage: `radial-gradient(var(--dh) var(--dw) at 30% 70%, ${dotColor} 80%, transparent 100%)`, WebkitMaskSize: `14px 14px`, WebkitMaskPosition: anim.posLayer2 as any, // @ts-ignore
//                                         "--dw": anim.dwStr, "--dh": anim.dhStr, transform: "rotate(18deg) scale(1.5)"
//                                     }} />
//                                 </>
//                             )}
//                         </motion.div>
//                     </motion.div>
//                 </AnimatePresence>
//             </motion.div>
//         </div>
//     );
// }