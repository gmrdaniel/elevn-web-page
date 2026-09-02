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
        // Prototype tokens (ELEVN_Landing_v3)
        proto: {
          teal: "#5895c0",
          indigo: "#3c3e9e",
          electric: "#493fe2",
          lavender: "#9183ff",
          blue: "#4684ea",
          navy: "#124a96",
          off: "#f7f7fc",
          dark: "#0d0d1a",
          text: "#1a1a2e",
          muted: "#6b7280",
        },
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        poppins: ["Poppins", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
        eleven: ["ElevenBrand", "Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "elevn-gradient": "linear-gradient(135deg, #2563eb 0%, #0ea5e9 25%, #06b6d4 50%, #8b5cf6 75%, #d946ef 100%)",
        "elevn-gradient-subtle": "linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(217,70,239,0.08) 100%)",
        "elevn-mesh": "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(37,99,235,0.2) 0%, rgba(37,99,235,0.05) 40%, transparent 70%), radial-gradient(ellipse 100% 70% at 100% 50%, rgba(139,92,246,0.1) 0%, transparent 50%), radial-gradient(ellipse 80% 80% at 0% 100%, rgba(6,182,212,0.08) 0%, transparent 50%)",
        "elevn-mesh-light": "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(37,99,235,0.06) 0%, rgba(37,99,235,0.02) 40%, transparent 70%), radial-gradient(ellipse 100% 70% at 100% 50%, rgba(139,92,246,0.04) 0%, transparent 50%), radial-gradient(ellipse 80% 80% at 0% 100%, rgba(6,182,212,0.03) 0%, transparent 50%)",
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
        "proto-blob": "proto-blob 8s ease-in-out infinite",
        "proto-blob-slow": "proto-blob 10s ease-in-out infinite reverse",
        "proto-pulse": "proto-pulse 2s ease-in-out infinite",
        "proto-marquee": "proto-marquee 22s linear infinite",
        "proto-bar": "proto-bar 1.5s ease 0.6s both",
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
        "proto-blob": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(10px,-15px) scale(1.03)" },
          "66%": { transform: "translate(-8px,10px) scale(0.97)" },
        },
        "proto-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.4)" },
        },
        "proto-marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "proto-bar": {
          from: { width: "0%" },
          to: { width: "68%" },
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
