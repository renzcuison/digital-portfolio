// import { useState, useRef, useEffect } from "react";
// import { CompanionId } from "@/lib/constants";

// export function useSyncLogic(activeCompanionId: CompanionId, isMobile: boolean) {
//   const [syncedCompanionId, setSyncedCompanionId] = useState<string | null>(null);
//   const [holdProgress, setHoldProgress] = useState(0);
//   const [isBoosting, setIsBoosting] = useState(false);

//   const holdTimer = useRef<ReturnType<typeof setInterval> | null>(null);
//   const drainIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

//   const isCurrentSynced = syncedCompanionId === activeCompanionId;

//   const startHold = () => {
//     if (isMobile || isCurrentSynced) return;

//     clearInterval(holdTimer.current!);
//     clearInterval(drainIntervalRef.current!);

//     setIsBoosting(true);
//     holdTimer.current = setInterval(() => {
//       setHoldProgress((prev) => {
//         if (prev >= 100) {
//           setSyncedCompanionId(activeCompanionId);
//           setIsBoosting(false);
//           clearInterval(holdTimer.current!);
//           return 100;
//         }
//         return prev + 1.5;
//       });
//     }, 16);
//   };

//   const stopHold = () => {
//     setIsBoosting(false);
//     clearInterval(holdTimer.current!);
//     clearInterval(drainIntervalRef.current!);

//     if (!isCurrentSynced) {
//       drainIntervalRef.current = setInterval(() => {
//         setHoldProgress((prev) => {
//           if (prev <= 0) {
//             clearInterval(drainIntervalRef.current!);
//             return 0;
//           }
//           return prev - 4;
//         });
//       }, 16);
//     }
//   };

//   useEffect(() => {
//     if (isMobile) {
//       setSyncedCompanionId(activeCompanionId);
//       setHoldProgress(100);
//     } else if (syncedCompanionId !== activeCompanionId) {
//       setHoldProgress(0);
//     }
//   }, [activeCompanionId, isMobile, syncedCompanionId]);

//   return { holdProgress, isBoosting, isCurrentSynced, startHold, stopHold };
// }