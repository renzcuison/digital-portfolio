import { useState } from "react";
import { SITE_CONFIG, CompanionId } from "@/lib/constants";

export function useUIState() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedId, setSelectedId] = useState<CompanionId>("mage");

  const copyEmail = () => {
    navigator.clipboard.writeText(SITE_CONFIG.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    menuOpen,
    setMenuOpen,
    toggleMenu: () => setMenuOpen(!menuOpen),
    copied,
    copyEmail,
    selectedId,
    setSelectedId
  };
}