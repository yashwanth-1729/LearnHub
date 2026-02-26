import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}","./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Syne'","sans-serif"],
        body:    ["'DM Sans'","sans-serif"],
        mono:    ["'JetBrains Mono'","monospace"],
      },
      colors: {
        ink:            "#0D0D0F",
        surface:        "#141417",
        card:           "#1C1C21",
        border:         "#2A2A32",
        muted:          "#5A5A70",
        accent:         "#7C6AF7",
        "accent-bright":"#A399FF",
        "accent-glow":  "rgba(124,106,247,0.15)",
        success:        "#4ADE80",
      },
    },
  },
  plugins: [],
};
export default config;
