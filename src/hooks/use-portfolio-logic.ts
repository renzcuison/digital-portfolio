import { COMPANIONS } from "@/lib/constants";
import { useEnvironment } from "./use-environment";
import { useAssetLoader } from "./use-asset-loader";
import { useSyncLogic } from "./use-sync-logic";
import { useUIState } from "./use-ui-state";
import { useMouseTracker } from "./use-mouse-tracker";

export function usePortfolioLogic() {
  const { mounted, isMobile } = useEnvironment();
  const { isReady, progress, loadingStatus, setSystemReady } = useAssetLoader();
  const { menuOpen, setMenuOpen, copied, copyEmail, selectedId, setSelectedId } = useUIState();

  const activeCompanion = COMPANIONS.find((c) => c.id === selectedId) || COMPANIONS[0];

  const { holdProgress, isBoosting, isCurrentSynced, startHold, stopHold } =
    useSyncLogic(activeCompanion.id, isMobile);

  const { mouseRawX, mouseRawY } = useMouseTracker(isMobile);

  return {
    mounted, isReady, progress, loadingStatus, setSystemReady,
    menuOpen, setMenuOpen, copied, copyEmail,
    isMobile, selectedId, setSelectedId, activeCompanion,
    holdProgress, isBoosting, isCurrentSynced, startHold, stopHold,
    mouseRawX, mouseRawY
  };
}