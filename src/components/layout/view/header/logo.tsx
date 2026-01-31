import React, { useState } from "react";

export function Logo({ menuOpen }: { menuOpen: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`flex items-center group cursor-default select-none transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
        >
            <div className="flex items-center font-black tracking-tighter text-slate-950 dark:text-white text-xl md:text-2xl leading-none">
                <span>R</span>
                <div className={`flex overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-w-[100px] opacity-100" : "max-w-0 opacity-0"}`}>
                    <span>enz</span>
                </div>
                <span>C</span>
                <div className={`flex overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0"}`}>
                    <span>uison</span>
                </div>
            </div>
        </div>
    );
}