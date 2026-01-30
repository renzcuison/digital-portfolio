import { useState, useEffect } from "react";
import { CRITICAL_ASSETS } from "@/lib/constants";

export function useAssetLoader() {
    const [isReady, setIsReady] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loadingStatus, setLoadingStatus] = useState("");

    useEffect(() => {
        const uniqueAssets = Array.from(new Set(CRITICAL_ASSETS));
        let loadedCount = 0;

        if (uniqueAssets.length === 0) {
            setIsReady(true);
            setProgress(100);
            return;
        }

        uniqueAssets.forEach((src) => {
            const img = new Image();
            img.src = src;

            img.onload = () => {
                loadedCount++;
                const currentPercent = Math.round((loadedCount / uniqueAssets.length) * 90);
                setProgress(currentPercent);
                setLoadingStatus(`SYNCING: ${src.split('/').pop()}`);

                if (loadedCount === uniqueAssets.length) {
                    setLoadingStatus("ASSETS SYNCED");

                }
            };

            img.onerror = () => {
                console.error(`Failed to load asset: ${src}`);
                loadedCount++;
            };
        });
    }, []);

    const setSystemReady = () => {
        setProgress(100);
        setLoadingStatus("READY");
        setIsReady(true);
    };

    return { isReady, progress, loadingStatus, setSystemReady };
}