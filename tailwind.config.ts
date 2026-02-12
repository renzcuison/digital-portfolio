import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "ui-sans-serif", "system-ui"],
      },
      screens: {
        '3xl': '2000px',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(6, 182, 212, 0.5)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;