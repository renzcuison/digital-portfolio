export const COMPANIONS = [
  {
    id: "mage",
    name: "FRIEREN",
    path: "/frieren.png",
    bio: "A legendary elven mage who views time through the lens of eternity. Specialized in the quiet pursuit of human understanding.",
  },
  {
    id: "devil",
    name: "REZE",
    path: "/reze.png",
    bio: "A Soviet sleeper agent with an explosive secret. A fleeting shadow that leaves a brilliant, devastating glow in her wake.",
  },
  {
    id: "hybrid",
    name: "ZEROTWO",
    path: "/zerotwo.png",
    bio: "CODE:002. An elite pilot with klaxosaur blood and a defiant spirit. The raw intersection of humanity and machine.",
  },
] as const;

export const SITE_CONFIG = {
  name: "Renz Cuison",
  email: "rbboy099@gmail.com",
  phrase: "NOTHING FANCY, REALLY",
  links: {
    github: "https://github.com/renzcuison",
    linkedin: "https://linkedin.com/in/renzcuison",
  },
};

export type CompanionId = (typeof COMPANIONS)[number]["id"];

export const COMPANION_THEMES = {
  light: {
    c1: "#0047ab",
    c2: "#00a3a3",
    c3: "#6a00c2",
    c4: "#b30000",
    dot: "#1a1a1a",
    halo: "radial-gradient(circle, rgba(0,71,171,0.15) 0%, transparent 70%)",
    fallbackBg: "#eee",
    filter: "brightness(1.0) saturate(1.2) drop-shadow(0 0 2px rgba(0,0,0,0.15))"
  },
  dark: {
    c1: "#00ffff",
    c2: "#8b00ff",
    c3: "#ff00ff",
    c4: "#0055ff",
    dot: "white",
    halo: "radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)",
    fallbackBg: "#111",
    filter: "brightness(1.5) drop-shadow(0 0 3px rgba(255,255,255,0.7))"
  }
} as const;


export const getGradientString = (
  theme: "light" | "dark",
  colors: typeof COMPANION_THEMES['light'] | typeof COMPANION_THEMES['dark'],
  p: { x1: number, y1: number, x2: number, y2: number },
  isMobile: boolean
) => {
  if (isMobile) {
    return `linear-gradient(to bottom, ${colors.c1}, ${colors.c2})`;
  }

  return `radial-gradient(circle at ${p.x1}% ${p.y1}%, ${colors.c1} 0%, transparent 50%),
          radial-gradient(circle at ${p.y2}% ${p.x2}%, ${colors.c2} 0%, transparent 50%),
          radial-gradient(circle at ${100 - p.x2}% ${100 - p.y1}%, ${colors.c3} 0%, transparent 50%),
          radial-gradient(circle at ${p.y1}% ${p.x1}%, ${colors.c4} 0%, transparent 50%),
          ${theme === "dark" ? "#000" : "#fff"}`;
};