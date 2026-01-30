"use client";
import { useState, useEffect, useRef } from "react";
import { GUN_SETTINGS } from "@/lib/constants";

export function useWeapon() {
    const [heat, setHeat] = useState(0);
    const [isFiring, setIsFiring] = useState(false);
    const [isOverheated, setIsOverheated] = useState(false);
    const fireInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const coolDown = setInterval(() => {
            setHeat((prev) => {
                const rate = isOverheated ? GUN_SETTINGS.COOL_OVERHEAT : GUN_SETTINGS.COOL_NORMAL;
                const next = Math.max(0, prev - rate);

                if (next === 0 && isOverheated) setIsOverheated(false);
                return next;
            });
        }, 50);

        return () => clearInterval(coolDown);
    }, [isOverheated]);

    const incrementHeat = () => {
        setHeat((prev) => {
            const next = prev + GUN_SETTINGS.HEAT_INC;
            if (next >= 100) {
                setIsOverheated(true);
                stopFiring();
                return 100;
            }
            return next;
        });
    };

    const startFiring = (callback: () => void) => {
        if (isOverheated) return;
        setIsFiring(true);
        callback();
    };

    const stopFiring = () => {
        if (fireInterval.current) {
            clearInterval(fireInterval.current);
            fireInterval.current = null;
        }
    };

    return {
        heat,
        isOverheated,
        isFiring,
        incrementHeat,
        fireInterval,
        stopFiring
    };
}