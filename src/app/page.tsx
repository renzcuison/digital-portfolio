"use client";

import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => setIsReady(true), 2800);
      return () => clearTimeout(timer);
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
            <div className="fixed inset-0 z-0">
              <Companion
                imagePath={activeCompanion.path}
                isActive={true}
                setIsBoosting={setIsBoosting}
              />
            </div>

            {/* UI Layer: Controls & Text */}
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
            className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-3xl z-[150] md:hidden"
          >
            <nav className="flex flex-col justify-center h-full px-12 gap-12 pointer-events-auto">
              <div className="flex flex-col gap-10">
                <MobileNavLink href={SITE_CONFIG.links.github} delay={0.1}>
                  GitHub
                </MobileNavLink>
                <MobileNavLink href={SITE_CONFIG.links.linkedin} delay={0.2}>
                  LinkedIn
                </MobileNavLink>

                <button onClick={copyEmail} className="flex flex-col text-left group">
                  <span className="text-3xl font-light tracking-tight text-slate-900 dark:text-white">
                    E-mail
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-zinc-600">
                    {copied ? "[copied to clipboard!]" : `[${SITE_CONFIG.email}]`}
                  </span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-12 border-t border-slate-200 dark:border-zinc-800">
                <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 dark:text-zinc-600 font-bold">
                  Appearance
                </span>
                <ModeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function MobileNavLink({
  href,
  delay,
  children,
}: {
  href: string;
  delay: number;
  children: React.ReactNode;
}) {
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