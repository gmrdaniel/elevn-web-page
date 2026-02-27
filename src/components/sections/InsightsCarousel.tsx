import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiBriefcase,
  HiDocumentText,
  HiBanknotes,
  HiUserGroup,
  HiGlobeAlt,
  HiArrowTrendingUp,
} from "react-icons/hi2";
import type { IconType } from "react-icons";

const AUTO_ADVANCE_MS = 5500;

const INSIGHTS_SLIDES: {
  icon: IconType;
  title: string;
  metric: string;
  metricLabel: string;
  impact: string;
  copy: string;
}[] = [
  {
    icon: HiBriefcase,
    title: "Opportunities that actually exist",
    metric: "100%",
    metricLabel: "verified",
    impact: "No sketchy DMs. Just real briefs from brands looking for talent like you.",
    copy: "Every opportunity on ELEVN goes through verification. You know what they want, what they pay, and who you're working with. Your time matters.",
  },
  {
    icon: HiDocumentText,
    title: "Clear briefs from day one",
    metric: "0",
    metricLabel: "surprises along the way",
    impact: "You know exactly what to deliver and when you get paid.",
    copy: "No back-and-forth. On ELEVN the brief is set: deliverables, deadlines, and compensation. You focus on creating.",
  },
  {
    icon: HiBanknotes,
    title: "On-time payments, transparent contracts",
    metric: "On-time",
    metricLabel: "payments",
    impact: "Stop chasing payments. Clear contracts and payouts that land when they should.",
    copy: "ELEVN standardizes timelines and payment terms. Less stress, more time for what matters: your content.",
  },
  {
    icon: HiUserGroup,
    title: "A community that gets it",
    metric: "1",
    metricLabel: "ecosystem",
    impact: "Creators like you who take what they do seriously.",
    copy: "On ELEVN you're not alone. You're with people who live the same reality: opportunities, learnings, and support when you need it.",
  },
  {
    icon: HiGlobeAlt,
    title: "Brands in 15+ countries looking for talent",
    metric: "15+",
    metricLabel: "countries",
    impact: "Global opportunities without hunting each one down yourself.",
    copy: "ELEVN connects with brands that already trust the ecosystem. You show up on their radar with a profile that speaks for itself.",
  },
  {
    icon: HiArrowTrendingUp,
    title: "Your career to the next level",
    metric: "Training",
    metricLabel: "and real support",
    impact: "Learn what actually works today. No outdated theory.",
    copy: "ELEVN has training built for creators: monetization, negotiation, metrics. And support when you need it.",
  },
];

export function InsightsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const total = INSIGHTS_SLIDES.length;

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + total) % total);
    setProgress(0);
    startTimeRef.current = Date.now();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
      setDirection(1);
      setProgress(0);
      startTimeRef.current = Date.now();
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
      setDirection(1);
      setProgress(0);
      startTimeRef.current = Date.now();
    }, AUTO_ADVANCE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total]);

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [index]);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress(
        Math.min((Date.now() - startTimeRef.current) / AUTO_ADVANCE_MS, 1)
      );
    }, 80);
    return () => clearInterval(t);
  }, []);

  const slide = INSIGHTS_SLIDES[index];
  const Icon = slide.icon;

  return (
    <motion.div
      className="insights-carousel-card w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/50 backdrop-blur-xl dark:border-white/10 dark:bg-transparent dark:shadow-none sm:rounded-2xl xl:rounded-3xl"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.12 }}
    >
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-6 sm:py-4 md:px-8 md:py-5">
        <h2 className="min-w-0 shrink-0 text-base font-bold text-slate-900 dark:text-elevn-ice sm:text-lg md:text-xl lg:text-2xl">
          What you get with ELEVN
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(index - 1, -1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-elevn-ice dark:hover:bg-white/10 dark:hover:border-elevn-cyan/30 sm:h-10 sm:w-10 sm:rounded-xl"
            aria-label="Previous"
          >
            <span className="text-lg sm:text-xl">←</span>
          </button>
          <span className="min-w-[3ch] text-center text-xs font-medium text-slate-600 dark:text-elevn-ice/80 sm:min-w-[3.5ch] sm:text-sm">
            {index + 1}/{total}
          </span>
          <button
            type="button"
            onClick={() => goTo(index + 1, 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-100 text-slate-700 transition hover:bg-slate-200 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-elevn-ice dark:hover:bg-white/10 dark:hover:border-elevn-cyan/30 sm:h-10 sm:w-10 sm:rounded-xl"
            aria-label="Next"
          >
            <span className="text-lg sm:text-xl">→</span>
          </button>
        </div>
      </div>

      <div className="relative min-h-[280px] overflow-hidden sm:min-h-[270px] md:min-h-[315px] lg:min-h-[345px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col gap-4 overflow-auto px-4 pt-4 pb-2 sm:gap-6 sm:px-6 sm:pt-6 md:flex-row md:items-center md:gap-10 md:px-10 md:py-10 md:overflow-visible lg:gap-12 lg:px-12 lg:py-12"
          >
            <motion.span
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl sm:h-24 sm:w-24 sm:rounded-2xl md:h-28 md:w-28 lg:h-32 lg:w-32"
              style={{
                background:
                  "linear-gradient(135deg, #2563eb 0%, #06b6d4 40%, #8b5cf6 70%, #d946ef 100%)",
                boxShadow: "0 0 30px -5px rgba(6, 182, 212, 0.5), 0 0 60px -15px rgba(139, 92, 246, 0.3)",
                color: "#e0f2fe",
              }}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.06, duration: 0.22 }}
            >
              <Icon className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" />
            </motion.span>
            <div className="min-w-0 flex-1 overflow-hidden">
              <motion.h3
                className="text-xl font-bold leading-tight text-slate-900 break-words dark:text-elevn-ice sm:text-2xl md:text-3xl lg:text-4xl"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 }}
              >
                {slide.title}
              </motion.h3>
              <motion.div
                className="mt-2 flex flex-wrap items-baseline gap-1.5 sm:mt-3 md:mt-4 md:gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.07 }}
              >
                <span className="bg-gradient-to-r from-elevn-cyan to-elevn-violet bg-clip-text font-mono text-2xl font-bold text-transparent break-all sm:text-3xl md:text-4xl lg:text-5xl">
                  {slide.metric}
                </span>
                <span className="text-sm text-slate-600 break-words dark:text-elevn-ice/70 sm:text-base md:text-lg">
                  {slide.metricLabel}
                </span>
              </motion.div>
              <motion.p
                className="mt-2 text-sm font-semibold text-slate-800 dark:text-elevn-ice/95 sm:mt-3 sm:text-base md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {slide.impact}
              </motion.p>
              <motion.p
                className="mt-1.5 text-sm leading-relaxed text-slate-600 break-words dark:text-elevn-ice/75 sm:mt-2 sm:text-base md:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 }}
              >
                {slide.copy}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="insights-carousel-footer relative z-10 flex flex-wrap items-center gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 sm:gap-3 sm:px-6 sm:py-4 md:px-8 md:py-5">
        <div className="h-1.5 w-full min-w-0 flex-1 overflow-hidden rounded-full bg-slate-200 sm:h-2 sm:w-auto dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-elevn-gradient"
            style={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <div className="flex shrink-0 gap-1.5 sm:gap-2">
          {INSIGHTS_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`rounded-full transition-all sm:h-2.5 ${
                i === index
                  ? "h-2 w-5 bg-elevn-cyan shadow-[0_0_12px_rgba(6,182,212,0.6)] sm:h-2.5 sm:w-7"
                  : "h-2 w-2 bg-slate-300 hover:bg-slate-400 sm:h-2.5 sm:w-2.5 dark:bg-white/40 dark:hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
