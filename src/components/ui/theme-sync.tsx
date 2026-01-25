"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeSync() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]');

    if (!meta) {
      meta = document.createElement('meta');
      (meta as HTMLMetaElement).name = "theme-color";
      document.head.appendChild(meta);
    }

    const color = resolvedTheme === "dark" ? "#000000" : "#ffffff";
    meta.setAttribute("content", color);

    // console.log("Notch color updated to:", color);
  }, [resolvedTheme]);

  return null;
}