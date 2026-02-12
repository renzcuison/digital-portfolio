import { useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";

export function useMouseTracker(isMobile: boolean) {
  const mouseRawX = useRef(useMotionValue(0)).current;
  const mouseRawY = useRef(useMotionValue(0)).current;

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRawX.set(e.clientX / window.innerWidth - 0.5);
      mouseRawY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  return { mouseRawX, mouseRawY };
}