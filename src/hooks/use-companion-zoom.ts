import { useEffect, useRef, useState } from "react";
import { MotionValue } from "framer-motion";
import { COMPANION_CONFIG } from "@/lib/constants";

export function useCompanionZoom(rawZoom: MotionValue<number>) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const element = containerRef.current;
        if (!element) return;

        const handleWheel = (e: WheelEvent) => {
            if (isHovering) {
                if (e.cancelable) e.preventDefault();

                const { MIN, MAX, SPEED } = COMPANION_CONFIG.ZOOM;
                const currentZoom = rawZoom.get();
                const nextZoom = Math.min(Math.max(currentZoom + e.deltaY * -SPEED, MIN), MAX);

                rawZoom.set(nextZoom);
            }
        };

        element.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            element.removeEventListener("wheel", handleWheel);
        };
    }, [isHovering, rawZoom]);

    return {
        containerRef,
        setIsHovering,
        isHovering
    };
}