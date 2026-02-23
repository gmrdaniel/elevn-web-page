/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elevn: {
          primary: "#2563eb",
          electric: "#0ea5e9",
          cyan: "#06b6d4",
          violet: "#8b5cf6",
          magenta: "#d946ef",
          dark: "#0a0e1a",
          surface: "#151b2d",
          ice: "#e0f2fe",
          // legacy aliases for gradual migration
          accent: "#06b6d4",
          light: "#22d3ee",
          pale: "#67e8f9",
          white: "#f0f9ff",
        },
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      backgroundImage: {
        "elevn-gradient": "linear-gradient(135deg, #2563eb 0%, #0ea5e9 25%, #06b6d4 50%, #8b5cf6 75%, #d946ef 100%)",
        "elevn-gradient-subtle": "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(217,70,239,0.08) 100%)",
        "elevn-mesh": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.25), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139,92,246,0.15), transparent), radial-gradient(ellipse 40% 60% at 0% 100%, rgba(6,182,212,0.12), transparent)",
        "elevn-mesh-light": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.08), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(139,92,246,0.06), transparent), radial-gradient(ellipse 40% 60% at 0% 100%, rgba(6,182,212,0.06), transparent)",
      },
      boxShadow: {
        "elevn-glow": "0 0 40px -10px rgba(37, 99, 235, 0.5), 0 0 80px -20px rgba(139, 92, 246, 0.3)",
        "elevn-card": "0 0 0 1px rgba(255,255,255,0.06), 0 20px 50px -20px rgba(0,0,0,0.4)",
        "elevn-neon": "0 0 20px rgba(6, 182, 212, 0.4)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        ".clip-hero-video": {
          clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%, 0 8%)",
        },
        ".clip-cyber": {
          clipPath: "polygon(0 0, calc(100% - 1rem) 0, 100% 1rem, 100% 100%, 1rem 100%, 0 calc(100% - 1rem))",
        },
      });
    },
  ],
};
