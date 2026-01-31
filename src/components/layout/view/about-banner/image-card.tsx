import React from "react";

export const DigitalStreamFilter = () => (
    <svg className="absolute w-0 h-0">
        <filter id="digital-stream">
            <feTurbulence type="fractalNoise" baseFrequency="0 0.15" numOctaves="1" result="warp">
                <animate attributeName="baseFrequency" dur="2s" values="0 0.15; 0 0.18; 0 0.15" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="4" />
        </filter>
    </svg>
);

export const ImageCard = ({ src, alt }: { src: string, alt: string }) => (
    <div className="flex-1 relative bg-white/50 dark:bg-black/40 backdrop-blur-sm border border-zinc-200 dark:border-white/10 rounded-[2vh] p-3 flex flex-col items-center justify-center overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] xl:aspect-square">
        <div
            className="absolute inset-0 z-30 pointer-events-none opacity-[0.12] mix-blend-overlay"
            style={{
                background: `linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
                     linear-gradient(90deg, rgba(0, 150, 255, 0.1), rgba(0, 255, 255, 0.05), rgba(0, 100, 255, 0.1))`,
                backgroundSize: '100% 4px, 3px 100%'
            }}
        />
        <div className="w-full h-full flex items-center justify-center relative p-[10%]">
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain object-center z-20"
                style={{
                    filter: 'url(#digital-stream) brightness(var(--img-brightness, 1)) contrast(1.1) sepia(1) saturate(3) hue-rotate(190deg)',
                    WebkitMaskImage: `radial-gradient(circle at center, black 35%, transparent 92%)`,
                    maskImage: `radial-gradient(circle at center, black 35%, transparent 92%)`,
                }}
            />
        </div>
    </div>
);