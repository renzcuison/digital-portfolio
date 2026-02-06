"use client";

import { useMemo, useCallback } from "react";
import { Pages, type PageId } from "@/lib/constants";
import { useEnvironment } from "../companion/use-environment";
import { useUIState } from "./use-ui-state";
import { useMouseTracker } from "../cursor/use-mouse-tracker";

export function usePortfolioLogic() {
  const { mounted, isMobile } = useEnvironment();

  const {
    menuOpen,
    setMenuOpen,
    copied,
    copyEmail,
    selectedId,
    setSelectedId
  } = useUIState() as {
    selectedId: PageId;
    setSelectedId: (id: PageId) => void;
    [key: string]: any;
  };

  const isReady = true;
  const progress = 100;
  const loadingStatus = "READY";
  const setSystemReady = () => { };

  const activePage = useMemo(() =>
    Pages.find((p) => p.id === selectedId) || Pages[0],
    [selectedId]
  );

  const { mouseRawX, mouseRawY } = useMouseTracker(isMobile);

  const handleSetSelectedId = useCallback((id: PageId) => {
    setSelectedId(id);
  }, [setSelectedId]);

  return {
    mounted, isReady, progress, loadingStatus, setSystemReady,
    menuOpen, setMenuOpen, copied, copyEmail,
    isMobile,
    selectedId,
    setSelectedId: handleSetSelectedId,
    activePage,
    mouseRawX, mouseRawY,
    holdProgress: 0,
    isBoosting: false,
    isCurrentSynced: true,
    startHold: () => { },
    stopHold: () => { }
  };
}