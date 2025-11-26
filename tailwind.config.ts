import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // we'll run dark mode only but keep this for future
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx,mdx}",
    "./src/content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#050509",        // main app background
          raised: "#0E1014",         // cards / panels
        },
        border: {
          subtle: "#1C1F26",
        },
        accent: {
          primary: "#4C8DFF",        // primary blue accent
          soft: "#A970FF",           // secondary purple accent
        },
        text: {
          primary: "#E5E7EB",
          muted: "#9CA3AF",
          subtle: "#6B7280",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 18px 40px rgba(0, 0, 0, 0.45)",
      },
      spacing: {
        13: "3.25rem",
        15: "3.75rem",
      },
    },
  },
  plugins: [],
};

export default config;

