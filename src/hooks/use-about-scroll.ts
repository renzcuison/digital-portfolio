import { useScroll, useTransform, useSpring } from "framer-motion";

export function useAboutScroll(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const yTranslate = useTransform(smoothProgress, [0, 1], [30, 0]);
  const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

  return { yTranslate, opacity };
}