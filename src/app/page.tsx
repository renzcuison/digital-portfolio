"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin, Check } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Mage = dynamic(() => import("@/components/ui/mage"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-transparent" />
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPhrase, setShowPhrase] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const phrase = "TUFF SKIBIDI DEV.";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered) {
      timer = setTimeout(() => setShowPhrase(true), 500);
    } else {
      setShowPhrase(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  const copyEmail = () => {
    navigator.clipboard.writeText("rbboy099@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-black" />;
  }

  const menuLinkVars = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <main className="relative min-h-screen w-full bg-white dark:bg-black transition-colors duration-500 overflow-hidden">
      <div className="relative z-[100] flex flex-col items-center min-h-screen w-full pointer-events-none">

        <header className="w-full px-6 py-3 flex items-center justify-between pointer-events-auto">
          <div
            className="flex items-center group cursor-default pointer-events-auto select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
          >
            <div className="flex flex-col justify-center relative">
              <div className="flex items-center font-black tracking-tighter text-slate-950 dark:text-white text-xl md:text-2xl leading-none">
                <span>R</span>
                <div className={`flex overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-w-[80px] md:max-w-[100px] opacity-100" : "max-w-0 opacity-0"}`}>
                  <span>enz</span>
                </div>
                <span>C</span>
                <div className={`flex overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? "max-w-[120px] md:max-w-[150px] opacity-100" : "max-w-0 opacity-0"}`}>
                  <span>uison</span>
                </div>
              </div>

              <div className="absolute top-full left-0 w-full">
                <div className="flex items-center h-4 mt-1">
                  <AnimatePresence>
                    {showPhrase && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center"
                      >
                        {phrase.split("").map((char, i) => (
                          <motion.span
                            key={`char-${i}`}
                            initial={{ display: "none", opacity: 0 }}
                            animate={{ display: "inline-block", opacity: 1 }}
                            transition={{ duration: 0, delay: i * 0.04 }}
                            className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-zinc-600 whitespace-pre"
                          >
                            {char}
                          </motion.span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="hidden md:flex items-center gap-1 -mr-2">
              <Button variant="ghost" size="icon" asChild className="text-slate-950 dark:text-white group w-auto px-2 justify-start overflow-hidden transition-all duration-300">
                <a href="https://github.com/renzcuison" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Github className="h-5 w-5 shrink-0" />
                  <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap">
                    GitHub
                  </span>
                </a>
              </Button>

              <Button variant="ghost" size="icon" asChild className="text-slate-950 dark:text-white group w-auto px-2 justify-start overflow-hidden transition-all duration-300">
                <a href="https://linkedin.com/in/renzcuison" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Linkedin className="h-5 w-5 shrink-0" />
                  <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] group-hover:ml-2 transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap">
                    LinkedIn
                  </span>
                </a>
              </Button>

              <Button variant="ghost" size="icon" onClick={copyEmail} className="text-slate-950 dark:text-white group w-auto px-2 justify-start overflow-hidden transition-all duration-300">
                <div className="flex items-center">
                  <div className="shrink-0">
                    {copied ? <Check className="h-5 w-5 text-green-500" /> : <Mail className="h-5 w-5" />}
                  </div>
                  <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] group-hover:ml-2 transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap">
                    {copied ? "Copied!" : "rbboy099@gmail.com"}
                  </span>
                </div>
              </Button>

              <div className="border-l border-slate-200 dark:border-zinc-800 ml-1 pl-1">
                <ModeToggle />
              </div>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center justify-end">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="relative z-[110] w-10 h-10 flex items-center justify-end focus:outline-none"
                aria-label="Toggle Menu"
              >
                <div className="flex flex-col items-end gap-1.5">
                  <motion.span
                    animate={menuOpen ? { rotate: 45, y: 4.5, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
                    className="h-[1.2px] bg-slate-950 dark:bg-white block origin-center transition-colors"
                  />
                  <motion.span
                    animate={menuOpen ? { rotate: -45, y: -4.5, width: "20px" } : { rotate: 0, y: 0, width: "20px" }}
                    className="h-[1.2px] bg-slate-950 dark:bg-white block origin-center transition-colors"
                  />
                </div>
              </button>
            </div>
          </div>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-3xl z-[99] md:hidden pointer-events-auto"
            >
              <nav className="flex flex-col justify-center h-full px-12 gap-12">
                <div className="flex flex-col gap-10">
                  <motion.a
                    variants={menuLinkVars} initial="initial" animate="animate" transition={{ delay: 0.1 }}
                    href="https://github.com/renzcuison" target="_blank"
                    className="text-3xl font-light tracking-tight text-slate-900 dark:text-white"
                  >
                    GitHub
                  </motion.a>
                  <motion.a
                    variants={menuLinkVars} initial="initial" animate="animate" transition={{ delay: 0.2 }}
                    href="https://linkedin.com/in/renzcuison" target="_blank"
                    className="text-3xl font-light tracking-tight text-slate-900 dark:text-white"
                  >
                    LinkedIn
                  </motion.a>
                  <motion.button
                    variants={menuLinkVars}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 0.3 }}
                    onClick={copyEmail}
                    className="flex items-baseline gap-3 text-left"
                  >
                    <span className="text-3xl font-light tracking-tight text-slate-900 dark:text-white">
                      E-mail
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-zinc-600 transition-colors duration-300">
                      {copied ? "[copied to clipboard!]" : "[rbboy099@gmail.com]"}
                    </span>
                  </motion.button>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between pt-12 border-t border-slate-200 dark:border-zinc-800"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] text-slate-400 dark:text-zinc-600 font-bold">
                    Appearance
                  </span>
                  <ModeToggle />
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div className="fixed inset-0 z-0">
        <Mage />
      </div>
    </main>
  );
}