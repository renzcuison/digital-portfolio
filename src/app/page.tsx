"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/view/header";
import { Hero } from "@/components/layout/view/hero";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { MobileMenu } from "@/components/layout/mobile-menu";
import AboutBanner from "@/components/layout/view/about-banner";
import { Projects } from "@/components/layout/view/projects";
import { InteractiveStage } from "@/components/layout/interactive-stage";
import { usePortfolioLogic } from "@/hooks/use-portfolio-logic";

export default function Home() {
  const logic = usePortfolioLogic();
  const [animationFinished, setAnimationFinished] = React.useState(false);

  if (!logic.mounted) return <div className="h-screen bg-white dark:bg-black" />;

  const showContent = logic.isReady && animationFinished;

  return (
    <main className="relative min-h-screen w-full bg-transparent transition-colors duration-500 overflow-x-hidden">
      <AnimatePresence>
        {!showContent && (
          <LoadingScreen
            key="loader"
            progress={logic.progress}
            status={logic.loadingStatus}
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

        <InteractiveStage logic={logic} />

        <div className="absolute top-0 left-0 w-full h-screen z-[100] flex flex-col pt-16 pointer-events-none">
          <AnimatePresence mode="wait">
            {!logic.menuOpen && (
              <Hero
                activeCompanion={logic.activeCompanion}
                selectedId={logic.selectedId}
                setSelectedId={logic.setSelectedId}
                isBoosting={logic.isBoosting}
              />
            )}
          </AnimatePresence>
        </div>

        <AboutBanner />
        <Projects />

        <div className="fixed top-0 left-0 w-full z-[300] pointer-events-none pt-[env(safe-area-inset-top)] bg-transparent">
          <Header
            menuOpen={logic.menuOpen}
            setMenuOpen={logic.setMenuOpen}
            copied={logic.copied}
            onCopyEmail={logic.copyEmail}
          />
        </div>
      </motion.div>

      <MobileMenu
        isOpen={logic.menuOpen}
        setIsOpen={logic.setMenuOpen}
        copied={logic.copied}
        onCopyEmail={logic.copyEmail}
      />
    </main>
  );
}