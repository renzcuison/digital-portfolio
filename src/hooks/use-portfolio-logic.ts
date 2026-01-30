import { useState, useEffect, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { SITE_CONFIG, CompanionId, COMPANIONS, CRITICAL_ASSETS } from "@/lib/constants";

export function usePortfolioLogic() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [selectedId, setSelectedId] = useState<CompanionId>("mage");
  const [isBoosting, setIsBoosting] = useState(false);
  const [syncedCompanionId, setSyncedCompanionId] = useState<string | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("");

  const mouseRawX = useMotionValue(0);
  const mouseRawY = useMotionValue(0);

  const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const drainIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setMounted(true);

    const uniqueAssets = Array.from(new Set(CRITICAL_ASSETS));
    const totalAssets = uniqueAssets.length;
    let loadedCount = 0;

    if (totalAssets === 0) {
      setProgress(100);
      setIsReady(true);
      return;
    }

    uniqueAssets.forEach((src) => {
      const img = new Image();

      const handleLoad = () => {
        loadedCount++;
        const currentPercent = Math.round((loadedCount / totalAssets) * 90);
        setProgress(currentPercent);

        setLoadingStatus(`LOADED: ${src.split('/').pop()}`);

        if (loadedCount === totalAssets) {
          setLoadingStatus("ASSETS SYNCED");
        }
      };

      const handleError = () => {
        console.error(`Failed to load asset: ${src}`);
        handleLoad();
      };

      img.src = src;
      img.onload = handleLoad;
      img.onerror = handleError;
    });
  }, []);

  const setSystemReady = () => {
    setProgress(100);
    setLoadingStatus("READY");
    setIsReady(true);
  };

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      mouseRawX.set(e.clientX / window.innerWidth - 0.5);
      mouseRawY.set(e.clientY / window.innerHeight - 0.5);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (holdTimer.current) clearInterval(holdTimer.current);
      if (drainIntervalRef.current) clearInterval(drainIntervalRef.current);
    };
  }, [mounted, mouseRawX, mouseRawY]);

  const activeCompanion = COMPANIONS.find((c) => c.id === selectedId) || COMPANIONS[0];
  const isCurrentSynced = syncedCompanionId === activeCompanion.id;

  const startHold = () => {
    if (isMobile || isCurrentSynced) return;
    if (holdTimer.current) clearInterval(holdTimer.current);
    if (drainIntervalRef.current) clearInterval(drainIntervalRef.current);
    setIsBoosting(true);
    holdTimer.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          setSyncedCompanionId(activeCompanion.id);
          setIsBoosting(false);
          if (holdTimer.current) clearInterval(holdTimer.current);
          return 100;
        }
        return prev + 1.5;
      });
    }, 16);
  };

  const stopHold = () => {
    setIsBoosting(false);
    if (holdTimer.current) clearInterval(holdTimer.current);
    if (drainIntervalRef.current) clearInterval(drainIntervalRef.current);
    if (!isCurrentSynced) {
      drainIntervalRef.current = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev <= 0) {
            if (drainIntervalRef.current) clearInterval(drainIntervalRef.current);
            return 0;
          }
          return prev - 4;
        });
      }, 16);
    }
  };

  useEffect(() => {
    if (mounted && isMobile) {
      setSyncedCompanionId(activeCompanion.id);
      setHoldProgress(100);
    }
  }, [activeCompanion.id, mounted, isMobile]);

  useEffect(() => {
    if (mounted && !isMobile && syncedCompanionId !== activeCompanion.id) {
      setHoldProgress(0);
    }
  }, [activeCompanion.id, syncedCompanionId, isMobile, mounted]);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    mounted, isReady, progress, setSystemReady, loadingStatus, copied, menuOpen, setMenuOpen, toggleMenu: () => setMenuOpen(!menuOpen),
    copyEmail, isMobile, mouseRawX, mouseRawY, selectedId, setSelectedId,
    activeCompanion, isBoosting, holdProgress, isCurrentSynced, startHold, stopHold
  };
}