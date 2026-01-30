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
import { AboutBanner } from "@/components/layout/about-banner";

const Companion = dynamic(() => import("@/components/ui/companion"), {
  loading: () => <div className="fixed inset-0 bg-transparent" />,
});

export default function Home() {
  const {
    mounted, copied, menuOpen, setMenuOpen, activeCompanion,
    selectedId, setSelectedId, isBoosting,
    copyEmail, isReady, setSystemReady, holdProgress, isCurrentSynced, startHold, stopHold,
    mouseRawX, mouseRawY, isMobile, progress, loadingStatus
  } = usePortfolioLogic();

  const [animationFinished, setAnimationFinished] = React.useState(false);

  if (!mounted) return <div className="h-screen bg-white dark:bg-black" />;

  const showContent = isReady && animationFinished;

  return (
    <main className="relative min-h-screen w-full bg-transparent transition-colors duration-500 overflow-x-hidden">
      <AnimatePresence>
        {!showContent && (
          <LoadingScreen
            key="loader"
            progress={progress}
            status={loadingStatus}
            onComplete={() => setAnimationFinished(true)}
          />
        )}
      </AnimatePresence>

      <motion.div
        key="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.43, 0.13, 0.23, 0.96]
        }}
        className={`relative h-full w-full ${!showContent ? "pointer-events-none" : ""}`}
      >
        <div className="fixed inset-0 z-0 pointer-events-none text-black/10 dark:text-white/10" />

        <div className="relative h-screen w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full z-[105] flex items-center justify-center pointer-events-none">
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
                // Update: Signal the hook that the main asset is ready
                onLoad={setSystemReady}
              />
            </div>
          </div>

          <SyncStatus holdProgress={holdProgress} isCurrentSynced={isCurrentSynced} show={!menuOpen} />

          <div className="relative h-full z-[100] flex flex-col pt-16 pointer-events-none">
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
        </div>

        <AboutBanner />

        <div className="fixed top-0 left-0 w-full z-[300] pointer-events-none pt-[env(safe-area-inset-top)] bg-transparent">
          <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} copied={copied} onCopyEmail={copyEmail} />
        </div>
      </motion.div>

      <MobileMenu
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
        copied={copied}
        onCopyEmail={copyEmail}
      />
    </main>
  );
}