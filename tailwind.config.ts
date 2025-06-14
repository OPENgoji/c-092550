
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000",
        foreground: "#FAFAF8",
        primary: {
          DEFAULT: "#FFD700",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#1A1A00",
          foreground: "#FAFAF8",
        },
        success: {
          DEFAULT: "#7EBF8E",
          foreground: "#FAFAF8",
        },
        warning: {
          DEFAULT: "#D2886F",
          foreground: "#FAFAF8",
        },
        muted: {
          DEFAULT: "#605F5B",
          foreground: "#E6E4DD",
        },
        accent: {
          DEFAULT: "#FFD700",
          foreground: "#000000",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "token-fall": "token-fall 5s linear infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "token-fall": {
          "0%": { transform: "translateY(-200px) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(calc(100vh + 200px)) rotate(720deg)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
