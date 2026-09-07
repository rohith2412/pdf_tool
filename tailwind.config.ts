import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0a",
        subink: "#3f3f46",
        muted: "#71717a",
        accent: "#dc2626",
        "accent-soft": "#fef2f2",
        line: "#e4e4e7",
        "line-strong": "#a1a1aa",
        surface: "#fafaf9",
        "surface-2": "#f4f4f5",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        xs: ["12px", "18px"],
        sm: ["13px", "20px"],
        base: ["15px", "24px"],
        lg: ["18px", "28px"],
        xl: ["24px", "32px"],
        "2xl": ["32px", "40px"],
        "3xl": ["44px", "52px"],
      },
      letterSpacing: {
        tightish: "-0.01em",
        tighter2: "-0.02em",
      },
      maxWidth: {
        page: "1040px",
      },
      borderRadius: {
        DEFAULT: "6px",
        card: "10px",
      },
      boxShadow: {
        card: "0 1px 0 rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 1px 0 rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.06)",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
