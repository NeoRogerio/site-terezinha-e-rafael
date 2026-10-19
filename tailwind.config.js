/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          olive: "#566443",
          "olive-dark": "#3b462c",
          "olive-light": "#6a7b54",
          sage: "#82916b",
          "sage-light": "#a3b18a",
          "sage-tint": "#eef2e6",
          cream: "#FAFBF8",
          "cream-alt": "#F3F6EE",
          white: "#FFFFFF",
          charcoal: "#2C2A29",
          muted: "#666B60",
          marsala: "#7A2A38",
          rose: "#C98791",
        },
      },
      fontFamily: {
        script: ["English111", "Great Vibes", "cursive"],
        serif: ["Cinzel", "Playfair Display", "serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        wedding: "0 10px 30px -5px rgba(86, 100, 67, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)",
        "wedding-hover": "0 20px 40px -5px rgba(86, 100, 67, 0.20), 0 8px 20px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "pulse-subtle": "pulseSubtle 3s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
      },
    },
  },
  plugins: [],
};
