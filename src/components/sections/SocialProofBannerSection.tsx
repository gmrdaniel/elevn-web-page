"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";

const ease = [0.22, 1, 0.36, 1] as const;

const BANNER_IMAGE_SRC = "/assets/images/geek_famel.jpg";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
} as const;

export function SocialProofBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-50 dark:bg-elevn-dark"
      aria-labelledby="social-proof-heading"
    >
      <SectionDivider className="mb-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto flex w-full max-w-7xl flex-col items-stretch gap-8 px-4 py-12 sm:px-6 sm:py-14 md:flex-row md:items-center md:gap-12 md:px-10 lg:py-16 lg:px-12 xl:max-w-[1600px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20"
      >
        {/* Image banner */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/95 shadow-[0_20px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-elevn-surface/90 dark:shadow-elevn-neon/25 md:w-1/2"
        >
          <div className="relative aspect-[16/10] w-full md:aspect-[5/3]">
            <img
              src={BANNER_IMAGE_SRC}
              alt="Creator collaborating with brands under ELEVN's safety guarantee"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/5 to-transparent dark:from-elevn-dark/80"
              aria-hidden
            />

            <div
              className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-col items-start gap-2 sm:inset-x-8 sm:bottom-7"
              role="group"
              aria-label="ELEVN safety, guarantee, and payment protection snapshot"
            >
              <div className="pointer-events-auto flex max-w-xs flex-col gap-2 rounded-2xl bg-slate-950/85 px-3 py-2 text-[10px] text-slate-100 shadow-[0_14px_35px_rgba(15,23,42,0.85)] ring-1 ring-slate-800/80 backdrop-blur-2xl sm:max-w-none sm:px-4 sm:py-3 sm:text-[11px] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-300 text-[9px] font-semibold text-slate-950 shadow-[0_0_0_1px_rgba(15,23,42,0.9)] sm:h-8 sm:w-8 sm:text-[10px]">
                    SAFE
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.22em] text-slate-400 sm:text-[10px] sm:tracking-[0.26em]">
                      ELEVN Safety Guarantee
                    </span>
                    <span className="text-[10px] text-slate-100/90 sm:text-[11px]">
                      Clear terms, protected work, and secure payouts every time.
                    </span>
                  </div>
                </div>
                <div className="mt-1 flex items-center gap-3 sm:gap-4 sm:mt-0">
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:text-[10px] sm:tracking-[0.2em]">
                      On-time payments
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-300">
                      100% guaranteed
                    </span>
                  </div>
                  <div className="h-8 w-px bg-slate-800/80" />
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] uppercase tracking-[0.18em] text-slate-400 sm:text-[10px] sm:tracking-[0.2em]">
                      Your work
                    </span>
                    <span className="text-[11px] font-semibold">
                      Always protected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Copy + stats */}
        <motion.div variants={itemVariants} className="md:w-1/2">
          <p className="inline-flex items-center gap-3 rounded-full border border-elevn-cyan/30 bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-elevn-cyan shadow-sm dark:border-elevn-cyan/40 dark:bg-elevn-surface/90 dark:text-elevn-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-300 shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
            Trusted by creators across the Americas
          </p>
          <h2
            id="social-proof-heading"
            className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.1] dark:text-elevn-ice"
          >
            Social proof that protects
            <span className="relative ml-2 inline-flex bg-gradient-to-r from-cyan-300 via-sky-400 to-emerald-300 bg-clip-text text-transparent">
              your work.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-slate-700 sm:text-[15px] dark:text-elevn-ice/85">
            No vanity metrics. ELEVN prioritizes verified campaigns, on-time
            payments, and long-term relationships between creators and brands.
            Every opportunity is designed to protect your work and your time.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/90 bg-white px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-elevn-surface/95 dark:shadow-elevn-neon/20">
              <p className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-elevn-ice">
                15+
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-elevn-ice/70">
                Active countries
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-elevn-surface/95 dark:shadow-elevn-neon/20">
              <p className="text-2xl font-semibold tracking-tight text-emerald-300">
                0
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-elevn-ice/70">
                Late payments
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white px-4 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:col-span-1 col-span-2 sm:col-auto dark:border-white/10 dark:bg-elevn-surface/95 dark:shadow-elevn-neon/20">
              <p className="text-2xl font-semibold tracking-tight text-cyan-400 dark:text-cyan-300">
                100%
              </p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-elevn-ice/70">
                Verified briefs
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-elevn-ice/80">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200 dark:bg-elevn-surface/90 dark:ring-white/15">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              Guaranteed by contract
            </span>
            <span className="h-3 w-px bg-slate-200 dark:bg-white/30" />
            <span>Human support on every campaign.</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

