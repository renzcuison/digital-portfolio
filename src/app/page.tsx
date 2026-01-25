"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { SyncStatus } from "@/components/ui/sync-status";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { usePortfolioLogic } from "@/hooks/use-portfolio-logic";

const Companion = dynamic(() => import("@/components/ui/companion"), {
  loading: () => <div className="fixed inset-0 bg-transparent" />,
});

export default function Home() {
  const {
    mounted, copied, menuOpen, setMenuOpen, activeCompanion,
    selectedId, setSelectedId, isBoosting, setIsBoosting,
    copyEmail, isReady, holdProgress, isCurrentSynced, startHold, stopHold
  } = usePortfolioLogic();

  if (!mounted) return <div className="h-screen bg-white dark:bg-black" />;

  return (
    <main className="relative h-screen w-full bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isReady ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div key="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-full w-full">

            <div className="fixed inset-0 z-[105] flex items-center justify-center pointer-events-none">
              <div
                className="w-full max-w-[700px] h-[50vh] pointer-events-auto cursor-crosshair"
                onMouseDown={startHold} onMouseUp={stopHold} onMouseLeave={stopHold}
              >
                <Companion
                  imagePath={activeCompanion.path} isActive={true}
                  setIsBoosting={setIsBoosting} onStartHold={startHold} onStopHold={stopHold}
                />
              </div>
            </div>

            <SyncStatus holdProgress={holdProgress} isCurrentSynced={isCurrentSynced} show={!menuOpen} />

            <div className="absolute inset-0 z-[100] flex flex-col pointer-events-none">
              <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} copied={copied} onCopyEmail={copyEmail} />
              <AnimatePresence mode="wait">
                {!menuOpen && (
                  <Hero activeCompanion={activeCompanion} selectedId={selectedId} setSelectedId={setSelectedId} isBoosting={isBoosting} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu isOpen={menuOpen} copied={copied} onCopyEmail={copyEmail} />
    </main>
  );
}