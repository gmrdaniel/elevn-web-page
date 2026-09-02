import type { Variants } from "framer-motion";

/** Shared easing + scroll-reveal variants — used across sections for a
 * consistent "cascade on scroll" and text-block reveal feel. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeUpCard: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

/** Reusable glass-card treatment: soft elevation at rest, lift + glow on hover. */
export const CARD_CLASS =
  "rounded-2xl border border-slate-200/80 bg-white/80 shadow-elevn-card backdrop-blur-sm backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1.5 hover:border-elevn-cyan/50 hover:shadow-elevn-glow dark:border-white/10 dark:bg-elevn-surface/60";
