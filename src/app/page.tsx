"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/layout/view/hero-about";
import { Header } from "@/components/layout/view/header/index";
import { MobileMenu } from "@/components/layout/view/header/mobile/layout-tray";
// import { AboutBanner } from "@/components/layout/view/about-banner";
// import { Projects } from "@/components/layout/view/projects";
import { usePortfolioLogic } from "@/hooks/ui/use-portfolio-logic";
import { ObjectStage } from "@/components/layout/view/hero-about/object-stage";
import { LoadingScreen } from "@/components/loading-screen";

export default function Home() {
  const logic = usePortfolioLogic();

  if (!logic.mounted) return <div className="h-screen bg-white" />;

  return (
    <main className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <LoadingScreen />
      <motion.div
        key="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 2.2
        }}
        className="relative w-full"
      >
        <div className="fixed top-0 left-0 w-full z-[300] pointer-events-none pt-[env(safe-area-inset-top)] bg-transparent">
          <Header
            menuOpen={logic.menuOpen}
            setMenuOpen={logic.setMenuOpen}
            copied={logic.copied}
            onCopyEmail={logic.copyEmail}
          />
        </div>

        <div className="relative w-full h-screen z-[100]">
          <ObjectStage logic={logic} />

          <AnimatePresence mode="wait">
            {!logic.menuOpen && (
              <Hero
                key="hero-content"
                activePage={logic.activePage}
                selectedId={logic.selectedId}
                setSelectedId={logic.setSelectedId}
                logic={logic}
              />
            )}
          </AnimatePresence>
        </div>

        {/* <AboutBanner />
        <Projects /> */}
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