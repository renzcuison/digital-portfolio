"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/layout/hero";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { usePortfolioLogic } from "@/hooks/use-portfolio-logic";
import { SITE_CONFIG } from "@/lib/constants";

const Companion = dynamic(() => import("@/components/ui/companion"), {
  loading: () => <div className="fixed inset-0 bg-transparent" />,
});

export default function Home() {
  const {
    mounted,
    copied,
    menuOpen,
    setMenuOpen,
    selectedId,
    setSelectedId,
    activeCompanion,
    isBoosting,
    setIsBoosting,
    copyEmail,
  } = usePortfolioLogic();

  const [isReady, setIsReady] = useState(false);
  const [syncedCompanionId, setSyncedCompanionId] = useState<string | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);

  const isCurrentSynced = syncedCompanionId === activeCompanion.id;

  const startHold = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    if (isCurrentSynced) return;

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
      const drainInterval = setInterval(() => {
        setHoldProgress(prev => {
          if (prev <= 0) {
            clearInterval(drainInterval);
            return 0;
          }
          return prev - 4;
        });
      }, 16);
    }
  };

  useEffect(() => {
    if (mounted && typeof window !== 'undefined' && window.innerWidth < 768) {
      setSyncedCompanionId(activeCompanion.id);
      setHoldProgress(100);
    }
  }, [activeCompanion.id, mounted]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      if (syncedCompanionId !== activeCompanion.id) {
        setHoldProgress(0);
      } else {
        setHoldProgress(100);
      }
    }
  }, [activeCompanion.id, syncedCompanionId]);

  useEffect(() => {
    if (mounted) {
      const readyTimer = setTimeout(() => setIsReady(true), 3500);
      return () => clearTimeout(readyTimer);
    }
  }, [mounted]);

  if (!mounted) return <div className="h-screen bg-white dark:bg-black" />;

  return (
    <main className="relative h-screen w-full bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isReady ? (
          <div className="relative">
            <LoadingScreen key="loader" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-purple-500/5 to-transparent pointer-events-none" />
          </div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <div className="fixed inset-0 z-0 pointer-events-none" />

            <div
              className="fixed inset-0 z-[105] flex items-center justify-center pointer-events-none"
            >
              <div
                className="w-full max-w-[700px] h-[50vh] pointer-events-auto cursor-crosshair"
                onMouseDown={startHold}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
              >
                <Companion
                  imagePath={activeCompanion.path}
                  isActive={true}
                  setIsBoosting={setIsBoosting}
                  onStartHold={startHold}
                  onStopHold={stopHold}
                />
              </div>
            </div>

            <AnimatePresence>
              {/* HIDDEN ON MOBILE: Using 'hidden md:flex' */}
              {!menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hidden md:flex fixed bottom-20 left-1/2 -translate-x-1/2 z-[110] flex flex-col items-center pointer-events-none"
                >
                  <motion.span
                    animate={isCurrentSynced ? { opacity: 0.5 } : { opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="text-[9px] uppercase tracking-[0.6em] text-slate-500 dark:text-zinc-500 mb-3 font-bold select-none"
                  >
                    {isCurrentSynced ? "Link Active" : holdProgress > 0 ? "Synchronizing..." : "Hold to Synchronize"}
                  </motion.span>

                  <div className="relative w-48 h-[2px]">
                    <div className="absolute inset-0 bg-slate-200 dark:bg-white/10 rounded-full" />
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                      style={{ width: `${holdProgress}%` }}
                    />
                    {isCurrentSynced && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -inset-1 bg-cyan-400/20 blur-sm rounded-full"
                      />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 z-[100] flex flex-col pointer-events-none">
              <Header
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                copied={copied}
                onCopyEmail={copyEmail}
              />

              <AnimatePresence mode="wait">
                {!menuOpen && (
                  <motion.div
                    key="hero-content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-col flex-1 w-full"
                  >
                    <Hero
                      activeCompanion={activeCompanion}
                      selectedId={selectedId}
                      setSelectedId={setSelectedId}
                      isBoosting={isBoosting}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-3xl z-[200] md:hidden"
          >
            <nav className="flex flex-col justify-center h-full px-12 gap-12 pointer-events-auto">
              <div className="flex flex-col gap-10">
                <MobileNavLink href={SITE_CONFIG.links.github} delay={0.1}>GitHub</MobileNavLink>
                <MobileNavLink href={SITE_CONFIG.links.linkedin} delay={0.2}>LinkedIn</MobileNavLink>
                <button onClick={copyEmail} className="flex flex-col text-left group">
                  <span className="text-3xl font-light tracking-tight text-slate-900 dark:text-white">E-mail</span>
                  <span className="text-xs font-mono text-slate-400 dark:text-zinc-600">
                    {copied ? "[copied to clipboard!]" : `[${SITE_CONFIG.email}]`}
                  </span>
                </button>
              </div>
              <div className="flex items-center justify-between pt-12 border-t border-slate-200 dark:border-zinc-800">
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 dark:text-zinc-600 font-bold">Appearance</span>
                <ModeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function MobileNavLink({ href, delay, children }: { href: string; delay: number; children: React.ReactNode; }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      href={href}
      target="_blank"
      className="text-3xl font-light tracking-tight text-slate-900 dark:text-white"
    >
      {children}
    </motion.a>
  );
}