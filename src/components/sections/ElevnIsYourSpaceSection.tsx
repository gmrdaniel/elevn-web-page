"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { HiSparkles, HiCheckBadge, HiScale, HiHeart } from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;

const GRADIENT_TITLE =
  "linear-gradient(135deg, #22d3ee 0%, #06b6d4 30%, #8b5cf6 65%, #d946ef 100%)";

const PILLARS = [
  {
    label: "On Elevn",
    title: "Your space",
    line: "Verified opportunities and a community of creators who take the craft seriously.",
    icon: HiCheckBadge,
    gradient: "from-elevn-cyan to-elevn-primary",
    borderHover: "hover:border-elevn-cyan/50",
  },
  {
    label: "The standard",
    title: "Real professionalism",
    line: "Tools, transparency, and the same expectations you'd have in any serious industry.",
    icon: HiScale,
    gradient: "from-elevn-violet to-elevn-cyan",
    borderHover: "hover:border-elevn-violet/50",
  },
  {
    label: "Our promise",
    title: "A real ecosystem",
    line: "Creativity and creators deserve more. Elevn is here to make it happen.",
    icon: HiHeart,
    gradient: "from-elevn-magenta to-elevn-violet",
    borderHover: "hover:border-elevn-magenta/50",
  },
] as const;

export function ElevnIsYourSpaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });

  return (
    <section
      id="elevn-is-your-space"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-elevn-dark"
      aria-labelledby="elevn-is-your-space-heading"
    >
      {/* Top accent line */}
      <div
        className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-elevn-primary via-elevn-cyan via-elevn-violet to-elevn-magenta opacity-90"
        aria-hidden
      />
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-25" aria-hidden />
      <SectionTransition inView={sectionInView} className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 max-[400px]:px-3 max-[400px]:py-14 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:max-w-[1600px] lg:px-12 lg:py-32 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        {/* Hook: headline + one-liner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.4, ease }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: sectionInView ? 1 : 0, scale: sectionInView ? 1 : 0.96 }}
            transition={{ duration: 0.35, delay: 0.05, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-elevn-cyan/40 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-elevn-cyan shadow-sm dark:border-elevn-cyan/50 dark:bg-elevn-surface/80 dark:text-elevn-cyan"
          >
            <HiSparkles className="text-sm" aria-hidden />
            Where creators level up
          </motion.span>
          <h2
            id="elevn-is-your-space-heading"
            className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 max-[400px]:text-3xl sm:text-5xl md:text-6xl lg:text-6xl dark:text-elevn-ice"
          >
            <span className="block">Elevn is</span>
            <span
              className="mt-1 block bg-clip-text font-extrabold text-transparent"
              style={{
                background: GRADIENT_TITLE,
                WebkitBackgroundClip: "text",
              }}
            >
              your space
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-slate-700 dark:text-elevn-ice/90 sm:text-xl">
            One place where your opportunities, community, and growth come together. Real briefs. Real collaborations. Real standards—backed by years in the industry.
          </p>
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-elevn-ice/60">
            See what&apos;s next ↓
          </p>
        </motion.div>

        {/* Three pillars — staggered */}
        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 sm:mt-16 sm:gap-8">
          {PILLARS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: sectionInView ? 1 : 0,
                  y: sectionInView ? 0 : 20,
                }}
                transition={{ duration: 0.35, delay: 0.12 + i * 0.08, ease }}
                className={`group relative overflow-hidden rounded-2xl border-2 border-slate-200/80 bg-white px-6 py-6 text-center shadow-lg transition-all duration-300 dark:border-white/10 dark:bg-elevn-surface/60 dark:shadow-elevn-neon/10 sm:px-7 sm:py-8 ${item.borderHover}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.12]`}
                  aria-hidden
                />
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.gradient} opacity-80`}
                  aria-hidden
                />
                <div className="relative">
                  <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-md dark:text-elevn-ice`}>
                    <Icon className="text-xl" aria-hidden />
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-elevn-ice/70">
                    {item.label}
                  </p>
                  <p className="mt-1.5 font-bold tracking-tight text-slate-950 dark:text-elevn-ice sm:text-lg">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-snug text-slate-600 dark:text-elevn-ice/85">
                    {item.line}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
