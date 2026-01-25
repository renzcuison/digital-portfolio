import { useState, useEffect, useRef } from "react";
import { SITE_CONFIG, CompanionId, COMPANIONS } from "@/lib/constants";

export function usePortfolioLogic() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<CompanionId>("mage");
  const [isBoosting, setIsBoosting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [syncedCompanionId, setSyncedCompanionId] = useState<string | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const drainIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const readyTimer = setTimeout(() => setIsReady(true), 3500);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(readyTimer);
      if (holdTimer.current) clearInterval(holdTimer.current);
      if (drainIntervalRef.current) clearInterval(drainIntervalRef.current);
    };
  }, []);

  const activeCompanion = COMPANIONS.find((c) => c.id === selectedId) || COMPANIONS[0];
  const isCurrentSynced = syncedCompanionId === activeCompanion.id;

  const startHold = () => {
    if (isMobile || isCurrentSynced) return;

    if (drainIntervalRef.current) clearInterval(drainIntervalRef.current);

    holdTimer.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          setSyncedCompanionId(activeCompanion.id);
          if (holdTimer.current) clearInterval(holdTimer.current);
          return 100;
        }
        return prev + 1.5;
      });
    }, 16);
  };

  const stopHold = () => {
    if (holdTimer.current) clearInterval(holdTimer.current);

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
    if (!isMobile && syncedCompanionId !== activeCompanion.id) {
      setHoldProgress(0);
    }
  }, [activeCompanion.id, syncedCompanionId, isMobile]);

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return {
    mounted,
    isReady,
    copied,
    menuOpen,
    setMenuOpen,
    toggleMenu,
    selectedId,
    setSelectedId,
    activeCompanion,
    isBoosting,
    setIsBoosting,
    holdProgress,
    isCurrentSynced,
    startHold,
    stopHold,
    isMobile,
    copyEmail,
  };
}