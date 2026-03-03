"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { HiBolt, HiCheckCircle } from "react-icons/hi2";

const VALUE_BULLETS = [
  "Verified campaigns with real budgets and clear contracts.",
  "Opportunities delivered to you—no more cold DMs or hunting.",
  "Training, support, and a serious creator community in one place.",
] as const;

/* What makes ELEVN different vs other platforms */
const DIFFERENTIATORS = [
  {
    title: "Verified, not volume",
    body: "We don’t flood you with random briefs. Every campaign is vetted for fit, budget, and timing—quality over quantity.",
  },
  {
    title: "Creator-first economics",
    body: "Clear rates, clear scope, clear timelines. No surprise clauses, no hidden fees, and on‑time payments as a standard.",
  },
  {
    title: "Human support on every deal",
    body: "Behind the platform there’s a team that answers, negotiates, and helps you grow. Not just an inbox of automated messages.",
  },
] as const;

export function BenefitsSectionV2({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-100 dark:bg-elevn-dark"
      aria-labelledby="benefits-section-title"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-16 pb-20 max-[400px]:px-3 max-[400px]:pt-12 max-[400px]:pb-14 sm:px-6 sm:pt-18 sm:pb-24 md:px-10 md:pt-20 md:pb-26 lg:max-w-[1600px] lg:px-12 lg:pt-22 lg:pb-30 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        {/* Section title */}
        <motion.h2
          id="benefits-section-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 16 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-3xl font-bold tracking-tight text-slate-950 max-[400px]:text-2xl sm:text-4xl md:text-5xl dark:text-elevn-ice"
        >
          <span className="bg-elevn-gradient bg-clip-text text-transparent">Why ELEVN is different</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 8 }}
          transition={{ duration: 0.32, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-center text-base font-semibold text-slate-700 dark:text-elevn-ice/85 md:text-lg"
        >
          Not just another creator marketplace. A system designed to protect your work and unlock better campaigns.
        </motion.p>

        {/* Condensed value prop + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.32, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16"
        >
          <div className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-elevn-cyan sm:text-base">
              In plain terms
            </p>
            <h2
              id="benefits-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-slate-950 max-[400px]:text-2xl sm:mt-5 sm:text-4xl md:text-5xl lg:text-5xl dark:text-elevn-ice"
            >
              What you actually get on ELEVN
            </h2>
            <ul className="mt-8 space-y-4 max-[400px]:mt-6 sm:mt-8 sm:space-y-4 md:space-y-5">
              {VALUE_BULLETS.map((line, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-950 dark:text-elevn-ice/95">
                  <HiCheckCircle className="mt-0.5 h-7 w-7 shrink-0 text-elevn-cyan max-[400px]:h-6 max-[400px]:w-6 sm:h-8 sm:w-8" aria-hidden />
                  <span className="text-base font-semibold leading-snug sm:text-lg md:text-xl">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-base font-semibold text-slate-800 dark:text-elevn-ice/85 sm:mt-9 md:text-lg">
              Campaigns are already live. Apply once, stay in the loop.
            </p>
            <div className="mt-5 space-y-3 text-left text-xs font-medium text-slate-600 sm:text-sm dark:text-elevn-ice/80">
              {DIFFERENTIATORS.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-elevn-cyan shadow-[0_0_10px_rgba(6,182,212,0.7)]" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-elevn-cyan sm:text-[11px]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed sm:text-xs">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA: Get opportunities instantly */}
          <div className="flex flex-col lg:h-full lg:min-h-0">
            <div className="relative flex min-h-[420px] w-full max-w-full flex-col overflow-hidden rounded-3xl border-2 border-elevn-cyan/40 bg-white p-8 shadow-xl dark:border-elevn-cyan/50 dark:bg-elevn-surface/90 dark:shadow-[0_0_40px_-8px_rgba(6,182,212,0.4)] sm:p-10 lg:h-full lg:min-h-0">
              <div className="absolute inset-0 bg-gradient-to-br from-elevn-primary/5 via-transparent to-elevn-cyan/5 dark:from-elevn-cyan/10 dark:to-elevn-violet/5" aria-hidden />
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-elevn-gradient text-white shadow-lg shadow-elevn-cyan/25 dark:text-elevn-ice dark:shadow-elevn-neon/30">
                    <HiBolt className="text-3xl" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-elevn-cyan">Stop chasing briefs</p>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl dark:text-elevn-ice">
                      Let the right ones find you
                    </h3>
                  </div>
                </div>
                <p className="relative mt-4 text-sm font-medium leading-snug text-slate-700 dark:text-elevn-ice/90">
                  ELEVN matches you with campaigns that fit your niche, audience size, and rates—so you spend less time pitching and more time creating. Free to apply.
                </p>
                <ul className="relative mt-4 space-y-1.5 text-xs font-semibold text-slate-600 dark:text-elevn-ice/85">
                  <li className="flex items-center gap-2">
                    <HiCheckCircle className="h-4 w-4 shrink-0 text-elevn-cyan" aria-hidden />
                    One profile, multiple campaigns over time
                  </li>
                  <li className="flex items-center gap-2">
                    <HiCheckCircle className="h-4 w-4 shrink-0 text-elevn-cyan" aria-hidden />
                    No cold outreach. No guessing if a brief is real
                  </li>
                </ul>
                <div className="relative mt-6 border-t border-slate-200/80 pt-5 dark:border-white/15 sm:mt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-elevn-cyan/90">Why it&apos;s different</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80">
                    Other platforms optimize for volume. ELEVN optimizes for fit: fewer, better campaigns where both sides
                    are protected.
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80">
                    You keep control of your rates, brand, and time. We handle verification, context, and support.
                  </p>
                </div>
                <div className="relative mt-auto flex-1 min-h-4" />
              </div>
              <Button
                type="button"
                size="lg"
                onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
                className="relative mt-6 w-full bg-elevn-gradient py-7 text-lg font-bold text-white shadow-xl shadow-elevn-primary/20 transition hover:opacity-95 hover:shadow-2xl dark:text-elevn-ice dark:shadow-elevn-cyan/20"
              >
                <HiBolt className="mr-2 text-2xl" aria-hidden />
                Apply once. Let us handle the rest.
              </Button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
