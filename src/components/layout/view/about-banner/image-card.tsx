// import React from "react";

// export const DigitalStreamFilter = () => (
//     <svg className="absolute w-0 h-0">
//         <filter id="digital-stream">
//             <feTurbulence type="fractalNoise" baseFrequency="0 0.15" numOctaves="1" result="warp">
//                 <animate attributeName="baseFrequency" dur="2s" values="0 0.15; 0 0.18; 0 0.15" repeatCount="indefinite" />
//             </feTurbulence>
//             <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" />
//         </filter>
//     </svg>
// );

// export const ImageCard = ({ src, alt }: { src: string, alt: string }) => (
//     <div className="relative flex-1 min-w-0 bg-white dark:bg-black/20 backdrop-blur-sm rounded-[2vh] p-3 flex flex-col items-center justify-center overflow-hidden aspect-square md:aspect-[4/5] lg:aspect-square">
//         <div className="w-full h-full flex items-center justify-center relative p-[10%]">
//             <img
//                 src={src}
//                 alt={alt}
//                 className="w-full h-full object-contain object-center z-20"
//                 style={{
//                     filter: 'url(#digital-stream) brightness(var(--img-brightness, 1)) contrast(1.1) sepia(1) saturate(3) hue-rotate(190deg)',
//                     WebkitMaskImage: `radial-gradient(circle at center, black 35%, transparent 92%)`,
//                     maskImage: `radial-gradient(circle at center, black 35%, transparent 92%)`,
//                 }}
//             />
//         </div>
//     </div>
// );