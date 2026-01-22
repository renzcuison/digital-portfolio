"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Mail, Linkedin, Check } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Companion = dynamic(() => import("@/components/ui/companion"), {
  loading: () => <div className="fixed inset-0 bg-transparent" />
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPhrase, setShowPhrase] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("mage");
  const [isBoosting, setIsBoosting] = useState(false);

  const phrase = "NOTHING FANCY, REALLY";

  const companions = [
    {
      id: "mage",
      name: "FRIEREN",
      path: "/frieren.png",
      bio: "A legendary elven mage who views time through the lens of eternity. Specialized in the quiet pursuit of human understanding."
    },
    {
      id: "devil",
      name: "REZE",
      path: "/reze.png",
      bio: "A Soviet sleeper agent with an explosive secret. A fleeting shadow that leaves a brilliant, devastating glow in her wake."
    },
    {
      id: "hybrid",
      name: "ZEROTWO",
      path: "/zerotwo.png",
      bio: "CODE:002. An elite pilot with klaxosaur blood and a defiant spirit. The raw intersection of humanity and machine."
    }
  ];

  const activeCompanion = companions.find(c => c.id === selectedId) || companions[0];

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
    return <div className="h-screen bg-white dark:bg-black" />;
  }

  const menuLinkVars = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  const pulseClass = "animate-pulse text-cyan-500 dark:text-cyan-400";

  return (
    <main className="relative h-screen w-full bg-white dark:bg-black transition-colors duration-500 overflow-hidden">

      {/* Background Companion Layer - Now correctly handled */}
      <div className="fixed inset-0 z-0">
        <Companion
          imagePath={activeCompanion.path}
          isActive={true}
          setIsBoosting={setIsBoosting}
        />
      </div>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-[100] flex flex-col pointer-events-none">

        {/* Header Section */}
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
                  <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap">
                    GitHub
                  </span>
                </a>
              </Button>

              <Button variant="ghost" size="icon" asChild className="text-slate-950 dark:text-white group w-auto px-2 justify-start overflow-hidden transition-all duration-300">
                <a href="https://linkedin.com/in/renzcuison" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <Linkedin className="h-5 w-5 shrink-0" />
                  <span className="max-w-0 overflow-hidden group-hover:max-w-[100px] transition-all duration-300 ease-in-out text-sm font-medium whitespace-nowrap">
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
          {!menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-1 w-full"
            >
              <div className="w-full px-8 md:px-12 mt-4 flex justify-between items-start">
                <div className="flex flex-col gap-1 2xl:gap-1.5 3xl:gap-2">
                  <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-black uppercase tracking-[0.4em] text-slate-950 dark:text-white transition-all duration-300">
                    Neural.Link
                  </span>

                  <span className={`text-[8px] 2xl:text-[10px] 3xl:text-xs font-mono flex items-center gap-2 2xl:gap-2.5 transition-colors duration-300 ${isBoosting ? "text-cyan-400 font-bold" : "text-zinc-500"
                    }`}>

                    <span className="relative flex h-1.5 w-1.5 2xl:h-2 2xl:w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isBoosting ? "bg-red-500" : "bg-cyan-400"
                        }`}></span>
                      <span className={`relative inline-flex rounded-full h-1.5 w-1.5 2xl:h-2 2xl:w-2 ${isBoosting ? "bg-red-600" : "bg-cyan-500"
                        }`}></span>
                    </span>

                    <span className="tracking-tight 2xl:tracking-normal">
                      {isBoosting ? "SYSTEM_BOOST_ACTIVE_099" : "STABLE_CONNECTION_001"}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] 2xl:text-xs 3xl:text-sm font-black uppercase tracking-[0.4em] -mr-[0.4em] text-slate-950 dark:text-white">
                    Protocol: Select
                  </span>
                  <span className="text-[8px] 2xl:text-[10px] 3xl:text-xs font-mono text-zinc-500">
                    ACTIVE_MODE: {activeCompanion.id.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full" />

              <div className="w-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="w-full md:max-w-[320px] 2xl:max-w-[450px] 3xl:max-w-[550px] space-y-5 2xl:space-y-8 pointer-events-auto">
                  <div className="space-y-2 2xl:space-y-4">
                    <h2 className="text-[10px] md:text-xs 2xl:text-sm 3xl:text-base font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      Select Interface
                    </h2>
                    <div className="flex gap-2 2xl:gap-4 w-full">
                      {companions.map((comp) => (
                        <button
                          key={comp.id}
                          onClick={() => setSelectedId(comp.id)}
                          className="group relative flex-1 h-12 md:h-10 2xl:h-14 3xl:h-16 border border-zinc-200 dark:border-white/10 flex items-center justify-center transition-all overflow-hidden cursor-pointer"
                        >
                          <motion.div
                            className="absolute inset-0 bg-slate-950 dark:bg-white"
                            initial={false}
                            animate={{ y: selectedId === comp.id ? 0 : "100%" }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                          />
                          <span className={`relative text-xs md:text-[10px] 2xl:text-xs 3xl:text-sm font-bold transition-colors duration-300 ${selectedId === comp.id ? "text-white dark:text-black" : "text-zinc-500"
                            }`}>
                            0{companions.indexOf(comp) + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="hidden sm:block text-[9px] md:text-[10px] 2xl:text-xs font-mono text-zinc-500 uppercase tracking-tight">
                    Initialize synchronization to deploy the active entity into the workspace.
                  </p>
                </div>

                <div className="w-full md:max-w-[350px] lg:max-w-[450px] text-left md:text-right pointer-events-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedId}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3 md:space-y-2"
                    >
                      <h1 className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl 3xl:text-9xl font-black italic tracking-tighter text-slate-950 dark:text-white uppercase leading-[0.8]">
                        {activeCompanion.name}
                      </h1>
                      <p className="text-xs md:text-[11px] lg:text-sm 2xl:text-base leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium max-w-[400px] 2xl:max-w-[500px] md:ml-auto">
                        {activeCompanion.bio}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
    </main>
  );
}