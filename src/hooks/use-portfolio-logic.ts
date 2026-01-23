// src/hooks/use-portfolio-logic.ts
import { useState, useEffect } from "react";
import { SITE_CONFIG, CompanionId, COMPANIONS } from "@/lib/constants";

export function usePortfolioLogic() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<CompanionId>("mage");
  const [isBoosting, setIsBoosting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeCompanion = COMPANIONS.find((c) => c.id === selectedId) || COMPANIONS[0];

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return {
    mounted,
    copied,
    menuOpen,
    setMenuOpen,
    toggleMenu,
    selectedId,
    setSelectedId,
    activeCompanion,
    isBoosting,
    setIsBoosting,
    copyEmail,
  };
}