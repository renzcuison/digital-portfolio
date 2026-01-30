import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMousePosition() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const mainConfig = { damping: 30, stiffness: 400, mass: 0.1 };
    const trailConfig = { damping: 40, stiffness: 150, mass: 0.5 };

    const x = useSpring(mouseX, mainConfig);
    const y = useSpring(mouseY, mainConfig);
    const tx = useSpring(mouseX, trailConfig);
    const ty = useSpring(mouseY, trailConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return { x, y, tx, ty };
}