export const COMPANIONS = [
    {
        id: "mage",
        name: "FRIEREN",
        path: "/Omdr4O7xSkx4qbQ.png",
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

export type CompanionId = (typeof COMPANIONS)[number]["id"];

export const COMPANION_THEMES = {
    mage: {
        light: {
            c1: "#3b82f6", c2: "#1d4ed8", c3: "#1e40af", c4: "#172554",
            dot: "#1e3a8a", halo: "rgba(59,130,246,0.15)", fallbackBg: "#f1f5f9",
            filter: "brightness(0.9) contrast(1.2)"
        },
        dark: {
            c1: "#ffffff", c2: "#60a5fa", c3: "#38bdf8", c4: "#0ea5e9",
            dot: "white", halo: "rgba(96,165,250,0.4)", fallbackBg: "#020617",
            filter: "brightness(1.5) drop-shadow(0 0 15px rgba(96,165,250,0.7))"
        }
    },
    devil: {
        light: {
            c1: "#7e22ce", c2: "#581c87", c3: "#3b0764", c4: "#2e1065",
            dot: "#3b0764", halo: "rgba(126,34,206,0.15)", fallbackBg: "#faf5ff",
            filter: "brightness(0.85) contrast(1.2)"
        },
        dark: {
            c1: "#e9d5ff", c2: "#a855f7", c3: "#d946ef", c4: "#701a75",
            dot: "white", halo: "rgba(168,85,247,0.4)", fallbackBg: "#1e1b4b",
            filter: "brightness(1.4) drop-shadow(0 0 12px rgba(168,85,247,0.6))"
        }
    },
    hybrid: {
        light: {
            c1: "#be123c", c2: "#9f1239", c3: "#881337", c4: "#4c0519",
            dot: "#4c0519", halo: "rgba(190,18,60,0.15)", fallbackBg: "#fff1f2",
            filter: "brightness(0.85) contrast(1.2)"
        },
        dark: {
            c1: "#ffe4e6", c2: "#fb7185", c3: "#f43f5e", c4: "#e11d48",
            dot: "white", halo: "rgba(244,63,94,0.4)", fallbackBg: "#4c0519",
            filter: "brightness(1.4) drop-shadow(0 0 15px rgba(244,63,94,0.7))"
        }
    }
} as const;

export const COMPANION_CONFIG = {
    SPRING_ZOOM: { stiffness: 300, damping: 30 },
    SPRING_MOUSE: { stiffness: 200, damping: 30 },
    ZOOM: { MIN: 1.0, MAX: 1.35, SPEED: 0.001 },
    TRANSFORMS: {
        TRANSLATE_X: { input: [-0.5, 0.5], output: [-40, 40] },
        ROTATE_X: { input: [-0.5, 0.5], output: [20, -20] },
        ROTATE_Y: { input: [-0.5, 0.5], output: [-25, 25] },
        MOUSE_Y_MULTIPLIER: 60,
        BREATH_AMPLITUDE: 0.015,
    }
};