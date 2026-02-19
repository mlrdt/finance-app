import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
        card: "#111111",
        "card-hover": "#1a1a1a",
        primary: "#3b82f6",
        secondary: "#8b5cf6",
        accent: "#f59e0b",
        success: "#10b981",
        danger: "#ef4444",
        border: "#27272a",
      },
    },
  },
  plugins: [],
};

export default config;
