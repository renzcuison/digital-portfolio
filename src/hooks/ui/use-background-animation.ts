import { useMotionValue, useSpring, useTransform, useAnimationFrame } from "framer-motion";
import { useRef, useEffect } from "react";

export function useBackgroundAnimation(isActive: boolean, isBoosting: boolean) {
    const positionRef = useRef({ x: 0, y: 0 });
    const time = useMotionValue(0);

    const posLayer1 = useMotionValue("0px 0px");
    const posLayer2 = useMotionValue("0px 0px");
    const posLayer3 = useMotionValue("0px 0px");
    const posLayer4 = useMotionValue("0px 0px");

    const boostSpring = useSpring(isBoosting ? 1 : 0, { stiffness: 80, damping: 20 });

    useEffect(() => {
        boostSpring.set(isBoosting ? 1 : 0);
    }, [isBoosting, boostSpring]);

    const p1x = useTransform(time, t => 50 + Math.cos(t * 0.5) * 25);
    const p1y = useTransform(time, t => 50 + Math.sin(t * 0.3) * 25);
    const p2x = useTransform(time, t => 50 + Math.sin(t * 0.4) * 30);
    const p2y = useTransform(time, t => 50 + Math.cos(t * 0.6) * 30);

    const morphValue = useTransform(time, t => Math.sin(t * 3));
    const noiseW = useTransform(time, t => Math.sin(t * 12) * 0.2);
    const noiseH = useTransform(time, t => Math.cos(t * 15) * 0.2);

    const dwStr = useTransform([morphValue, noiseW], ([v, nw]) =>
        `${2.4 + (v as number) * 0.3 + (nw as number)}px`
    );
    const dhStr = useTransform([morphValue, noiseH], ([v, nh]) =>
        `${2.4 - (v as number) * 0.3 + (nh as number)}px`
    );

    const blobW = useTransform(time, t => `${4 + Math.sin(t * 1.5) * 0.7 + Math.sin(t * 8) * 0.2}px`);
    const blobH = useTransform(time, t => `${4 + Math.cos(t * 1.2) * 0.7 + Math.cos(t * 7) * 0.2}px`);

    useAnimationFrame((t, delta) => {
        if (!isActive) return;

        const seconds = t / 1000;
        time.set(seconds);

        const speed = (0.0075 * (1 + boostSpring.get() * 2.5)) * delta;

        positionRef.current.x += speed;
        positionRef.current.y += speed * 0.4;

        const { x: px, y: py } = positionRef.current;

        posLayer1.set(`${px + Math.sin(seconds * 0.8) * 5}px ${py + Math.cos(seconds * 0.5) * 5}px`);
        posLayer2.set(`${-px * 1.4 + Math.cos(seconds * 1.1) * 8}px ${py * 1.8 + Math.sin(seconds * 0.9) * 8}px`);
        posLayer3.set(`${px * 0.6 + Math.sin(seconds * 1.4) * 12}px ${-py * 0.9 + Math.cos(seconds * 1.2) * 10}px`);
        posLayer4.set(`${px * 2 + Math.cos(seconds * 2.1) * 4}px ${py * 0.2 + Math.sin(seconds * 1.8) * 4}px`);
    });

    return {
        time,
        p1x, p1y, p2x, p2y,
        dwStr, dhStr,
        blobW, blobH,
        posLayer1, posLayer2, posLayer3, posLayer4
    };
}