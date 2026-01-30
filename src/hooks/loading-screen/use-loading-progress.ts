import { useState, useEffect } from "react";

export function useLoadingProgress(progress: number, onComplete?: () => void) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (displayValue < progress) setDisplayValue(prev => prev + 1);
        }, 10);
        return () => clearTimeout(timer);
    }, [displayValue, progress]);

    useEffect(() => {
        if (displayValue >= 100) onComplete?.();
    }, [displayValue, onComplete]);

    return displayValue;
}