import { useState } from "react";
import { SiteConfig, Pages, type PageId } from "@/lib/constants";

export function useUIState() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const [selectedId, setSelectedId] = useState<PageId>("about");

  const copyEmail = () => {
    navigator.clipboard.writeText(SiteConfig.email);
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