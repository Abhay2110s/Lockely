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
        // High-Contrast Cinematic Brutalist Palette
        "bg-void": "var(--bg-void)",
        "bg-surface": "var(--bg-surface)",
        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        "accent-cyber": "var(--accent-cyber)",
        "accent-alert": "var(--accent-alert)",
        "border-harsh": "var(--border-harsh)",

        // Direct Utility Tokens
        void: "#000000",
        surface: "#111111",
        cyber: "#00FF66",
        alert: "#FF3366",
        harsh: "#222222",
      },
      fontFamily: {
        sans: [
          "Geist",
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
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px", // Strict brutalist sharp edges
      },
      borderWidth: {
        DEFAULT: "1px",
        1: "1px",
      },
      boxShadow: {
        none: "none",
        cyber: "0 0 0 1px #00FF66",
        alert: "0 0 0 1px #FF3366",
      },
    },
  },
  plugins: [],
};
