/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Vibrant modern cool palette
        ink: "#0f172a",          // Slate 900
        paper: "#f8fafc",        // Slate 50
        surface: "#ffffff",      // White cards
        line: "#e2e8f0",         // Slate 200
        muted: "#64748b",        // Slate 500
        
        signal: "#0d9488",       // Teal 600
        "signal-soft": "#f0fdfa", // Teal 50
        
        redline: "#e11d48",      // Rose 600
        "redline-soft": "#fff1f2", // Rose 50
        
        accent: "#6366f1",       // Indigo 500 (vibrant brand color)
        "accent-hover": "#4f46e5", // Indigo 600
        "accent-soft": "#eef2ff", // Indigo 50
        
        amber: "#d97706",        // Amber 600
        "amber-soft": "#fef3c7", // Amber 50

        violet: "#8b5cf6",       // Violet 500
        "violet-soft": "#f5f3ff", // Violet 50
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        outfit: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        paper: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        premium: "0 10px 25px -5px rgba(99, 102, 241, 0.08), 0 8px 16px -6px rgba(99, 102, 241, 0.04)",
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        glow: "0 0 15px rgba(99, 102, 241, 0.15)",
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(2200%)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: 0.6, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.02)" },
        }
      },
      animation: {
        scan: "scan 1.4s linear infinite",
        fadeUp: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
