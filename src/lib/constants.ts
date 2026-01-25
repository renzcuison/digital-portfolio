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