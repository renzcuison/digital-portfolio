import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

export function useMouseTracker(isMobile: boolean) {
  const mouseRawX = useMotionValue(0);
  const mouseRawY = useMotionValue(0);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRawX.set(e.clientX / window.innerWidth - 0.5);
      mouseRawY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, mouseRawX, mouseRawY]);

  return { mouseRawX, mouseRawY };
}