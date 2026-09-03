/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-End Light Theme Palette
        cream: {
          DEFAULT: "#FDFBF7",
          50: "#FFFFFF",
          100: "#FAF8F3",
          200: "#F4EFE6",
          300: "#EAE2D4",
        },
        blush: {
          DEFAULT: "#F4C2C2",
          50: "#FDF7F7",
          100: "#FAEEEE",
          200: "#F4C2C2",
          300: "#EAA7A7",
          400: "#DE8C8C",
          500: "#D27070",
        },
        burgundy: {
          DEFAULT: "#8B263E",
          hover: "#A8324E",
          light: "#B83A58",
          dark: "#6D1C2F",
          deep: "#4E1422",
        },
        "warm-gray": {
          DEFAULT: "#E6E0D5",
          light: "#F2EFE9",
          dark: "#D1C9BC",
        },
        charcoal: {
          DEFAULT: "#1a1a1a",
          light: "#2d2d2d",
          muted: "#6B6560",
        },

        // Semantic CSS variable tokens
        "bg-primary": "var(--bg-primary)",
        "bg-surface": "var(--bg-surface)",
        "bg-card": "var(--bg-card)",
        "bg-card-hover": "var(--bg-card-hover)",
        "accent-burgundy": "var(--accent-burgundy)",
        "accent-blush": "var(--accent-blush)",
        "border-warm": "var(--border-warm)",
        "text-charcoal": "var(--text-charcoal)",
        "text-muted": "var(--text-muted)",

        // Legacy compatibility aliases mapped to light theme
        void: "#FDFBF7",
        surface: "#FFFFFF",
        cyber: "#8B263E",
        alert: "#8B263E",
        harsh: "#E6E0D5",
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        none: "0px",
        sm: "0.375rem", // 6px
        DEFAULT: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "2rem", // 32px
        full: "9999px",
      },
      boxShadow: {
        card: "0 10px 30px -10px rgba(139, 38, 62, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)",
        "card-hover": "0 20px 40px -15px rgba(139, 38, 62, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.04)",
        button: "0 4px 14px rgba(139, 38, 62, 0.25)",
        "button-hover": "0 6px 20px rgba(139, 38, 62, 0.35)",
        glow: "0 0 25px rgba(244, 194, 194, 0.4)",
      },
    },
  },
  plugins: [],
};
