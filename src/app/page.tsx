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
    selectedId, setSelectedId, isBoosting,
    copyEmail, isReady, holdProgress, isCurrentSynced, startHold, stopHold,
    mouseRawX, mouseRawY, isMobile
  } = usePortfolioLogic();

  if (!mounted) return <div className="h-screen bg-white dark:bg-black" />;

  return (
    <main className="relative min-h-[100dvh] w-full bg-white dark:bg-black transition-colors duration-500 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isReady ? (
          <LoadingScreen key="loader" />
        ) : (
          <motion.div key="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-full w-full">

            <div className="absolute top-0 left-0 w-full h-screen z-[105] flex items-center justify-center pointer-events-none">
              <div
                className="md:hidden w-[250px] h-[250px] pointer-events-auto rounded-full absolute"
                onTouchStart={startHold}
                onTouchEnd={stopHold}
              />

              <div className="w-full max-w-[700px] h-[50vh] flex items-center justify-center pointer-events-none md:pointer-events-auto cursor-crosshair">
                <Companion
                  imagePath={activeCompanion.path}
                  isActive={true}
                  isBoosting={isBoosting}
                  isMobile={isMobile}
                  mouseRawX={mouseRawX}
                  mouseRawY={mouseRawY}
                  onStartHold={startHold}
                  onStopHold={stopHold}

                />
              </div>
            </div>

            <SyncStatus holdProgress={holdProgress} isCurrentSynced={isCurrentSynced} show={!menuOpen} />

            <div className="relative min-h-screen z-[100] flex flex-col pt-16 pointer-events-none">
              <AnimatePresence mode="wait">
                {!menuOpen && (
                  <Hero
                    activeCompanion={activeCompanion}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    isBoosting={isBoosting}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="fixed top-0 left-0 w-full z-[300] pointer-events-none pt-[env(safe-area-inset-top)]">
              <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} copied={copied} onCopyEmail={copyEmail} />
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
        copied={copied}
        onCopyEmail={copyEmail}
      />
    </main>
  );
}