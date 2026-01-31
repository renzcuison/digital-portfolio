import { useMemo, useCallback } from "react";
import { COMPANIONS, type CompanionId } from "@/lib/constants"; // Imported CompanionId
import { useEnvironment } from "../companion/use-environment";
import { useAssetLoader } from "../feedback/use-asset-loader";
import { useSyncLogic } from "../companion/use-sync-logic";
import { useUIState } from "./use-ui-state";
import { useMouseTracker } from "../cursor/use-mouse-tracker";

export function usePortfolioLogic() {
  const { mounted, isMobile } = useEnvironment();
  const { isReady, progress, loadingStatus, setSystemReady } = useAssetLoader();
  const { menuOpen, setMenuOpen, copied, copyEmail, selectedId, setSelectedId } = useUIState();

  const activeCompanion = useMemo(() =>
    COMPANIONS.find((c) => c.id === selectedId) || COMPANIONS[0],
    [selectedId]
  );

  const { holdProgress, isBoosting, isCurrentSynced, startHold, stopHold } =
    useSyncLogic(activeCompanion.id, isMobile);

  const { mouseRawX, mouseRawY } = useMouseTracker(isMobile);

  const handleSetSelectedId = useCallback((id: CompanionId) => {
    setSelectedId(id);
  }, [setSelectedId]);

  return {
    mounted, isReady, progress, loadingStatus, setSystemReady,
    menuOpen, setMenuOpen, copied, copyEmail,
    isMobile, selectedId, setSelectedId: handleSetSelectedId, activeCompanion,
    holdProgress, isBoosting, isCurrentSynced, startHold, stopHold,
    mouseRawX, mouseRawY
  };
}