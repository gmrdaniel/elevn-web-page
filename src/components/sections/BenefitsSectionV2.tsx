"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  HiBriefcase,
  HiAcademicCap,
  HiShieldCheck,
  HiUserGroup,
  HiBolt,
  HiCheckCircle,
} from "react-icons/hi2";

/* Above the fold: quick-scan value props (bullet points) */
const VALUE_BULLETS = [
  "Verified campaigns from trusted brands—real briefs, real pay.",
  "Opportunities delivered to you. No more manual searching or cold DMs.",
  "Elite training and a creator community that gets your niche.",
  "Clear briefs, transparent compensation, and on-time payments.",
] as const;

/* Below the fold: extended benefit detail (same content as legacy BenefitsSection) */
const BENEFITS_DETAIL = [
  {
    number: "01",
    title: "No more searching",
    body: "Eliminate the friction in finding opportunities. Instead of spending hours searching and applying, you get a constant stream of verified options that align with your profile, niche, and goals. Your time is valuable—invest it in creating, not searching.",
    gradient: "from-elevn-primary to-elevn-cyan",
    icon: HiBriefcase,
  },
  {
    number: "02",
    title: "Education that stays relevant",
    body: "Ongoing education keeps your skills sharp. The digital ecosystem changes fast—creators who stay up-to-date thrive. Our platform keeps you informed on emerging trends, new platforms, algorithm changes, and the latest best practices.",
    gradient: "from-elevn-cyan to-elevn-violet",
    icon: HiAcademicCap,
  },
  {
    number: "03",
    title: "Professional credibility",
    body: "Being part of a verified ecosystem changes how brands see you. When you apply through ELEVN, they know they're looking at a creator validated by a professional platform. That opens doors to better opportunities.",
    gradient: "from-elevn-violet to-elevn-magenta",
    icon: HiShieldCheck,
  },
  {
    number: "04",
    title: "A community that has your back",
    body: "Creators who thrive rarely do it alone. Our community connects you with people who understand your challenges, offer perspective from similar experiences, and are willing to collaborate rather than compete.",
    gradient: "from-elevn-magenta to-elevn-primary",
    icon: HiUserGroup,
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function BenefitsSectionV2({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-elevn-dark"
      aria-labelledby="benefits-section-title"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionTransition inView={sectionInView} className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 max-[400px]:px-3 max-[400px]:py-14 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:max-w-[1600px] lg:px-12 lg:py-32 xl:max-w-[1800px] xl:px-16 xl:py-36 2xl:max-w-[1920px] 2xl:px-20">
        {/* Section title: blue then black */}
        <motion.h2
          id="benefits-section-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 16 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-3xl font-bold tracking-tight max-[400px]:text-2xl sm:text-4xl md:text-5xl"
        >
          <span className="text-elevn-cyan">Benefits</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 8 }}
          transition={{ duration: 0.32, delay: 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-center text-base font-semibold text-slate-950 dark:text-elevn-ice md:text-lg"
        >
          What awaits creators at ELEVN
        </motion.p>

        {/* ——— Above the fold: condensed value prop + CTA ——— */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.32, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-2 lg:items-stretch lg:gap-12 xl:gap-16"
        >
          <div className="flex flex-col">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-elevn-cyan sm:text-base">
              What you get
            </p>
            <h2
              id="benefits-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-slate-950 max-[400px]:text-2xl sm:mt-5 sm:text-4xl md:text-5xl lg:text-5xl dark:text-elevn-ice"
            >
              What you&apos;ll find on ELEVN
            </h2>
            <ul className="mt-8 space-y-4 max-[400px]:mt-6 sm:mt-10 sm:space-y-5 md:space-y-6">
              {VALUE_BULLETS.map((line, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-950 dark:text-elevn-ice/95">
                  <HiCheckCircle className="mt-0.5 h-7 w-7 shrink-0 text-elevn-cyan max-[400px]:h-6 max-[400px]:w-6 sm:h-8 sm:w-8" aria-hidden />
                  <span className="text-base font-semibold leading-snug sm:text-lg md:text-xl">{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base font-semibold text-slate-800 dark:text-elevn-ice/85 sm:mt-10 md:text-lg">
              Active opportunities are live now. Pre-register to get early access.
            </p>
          </div>

          {/* CTA: Get opportunities instantly — same height as left column */}
          <div className="flex flex-col lg:h-full lg:min-h-0">
            <div className="relative flex min-h-[420px] w-full max-w-full flex-col overflow-hidden rounded-3xl border-2 border-elevn-cyan/40 bg-white p-8 shadow-xl dark:border-elevn-cyan/50 dark:bg-elevn-surface/90 dark:shadow-[0_0_40px_-8px_rgba(6,182,212,0.4)] sm:p-10 lg:h-full lg:min-h-0">
              <div className="absolute inset-0 bg-gradient-to-br from-elevn-primary/5 via-transparent to-elevn-cyan/5 dark:from-elevn-cyan/10 dark:to-elevn-violet/5" aria-hidden />
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-elevn-primary to-elevn-cyan text-white shadow-lg shadow-elevn-cyan/25 dark:text-elevn-ice dark:shadow-elevn-neon/30">
                    <HiBolt className="text-3xl" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-elevn-cyan">No more searching</p>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl dark:text-elevn-ice">
                      Get opportunities instantly
                    </h3>
                  </div>
                </div>
                <p className="relative mt-4 text-sm font-medium leading-snug text-slate-700 dark:text-elevn-ice/90">
                  Stop searching. We match you with campaigns that fit your profile—verified briefs delivered to you. Join once, get early access. Free to register.
                </p>
                <ul className="relative mt-4 space-y-1.5 text-xs font-semibold text-slate-600 dark:text-elevn-ice/85">
                  <li className="flex items-center gap-2">
                    <HiCheckCircle className="h-4 w-4 shrink-0 text-elevn-cyan" aria-hidden />
                    One application, ongoing opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <HiCheckCircle className="h-4 w-4 shrink-0 text-elevn-cyan" aria-hidden />
                    Spots fill fast—secure your place now
                  </li>
                </ul>
                <div className="relative mt-6 border-t border-slate-200/80 pt-5 dark:border-white/15 sm:mt-8">
                  <p className="text-xs font-semibold uppercase tracking-wider text-elevn-cyan/90">Why register now</p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80">
                    New campaigns go live regularly. Pre-register and you&apos;ll be first in line for briefs from brands you already trust—no cold outreach, no wasted time.
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80">
                    Your profile, one place. We handle the matching so you can focus on creating.
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
                Start Accelerating Your Content
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ——— Below the fold: extended benefit detail ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
          transition={{ duration: 0.32, delay: 0.08, ease }}
          className="mt-24 border-t border-slate-200 pt-20 dark:border-white/10 sm:mt-28 md:mt-32 lg:mt-36 lg:pt-24"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-elevn-cyan sm:text-base">
            The full picture
          </p>
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:mt-5 sm:text-3xl md:text-4xl dark:text-elevn-ice">
            Why creators choose our platform
          </h3>
          <p className="mt-3 max-w-2xl text-base font-medium text-slate-700 dark:text-elevn-ice/85 md:text-lg">
            Professionalizing your career as a creator requires access to the tools, opportunities, and resources that turn your audience into a sustainable business. Here&apos;s how ELEVN supports you.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:mt-14 md:grid-cols-2 lg:mt-16 lg:gap-10">
            {BENEFITS_DETAIL.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.article
                  key={benefit.number}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 16 }}
                  transition={{ duration: 0.32, delay: 0.05 + i * 0.04, ease }}
                >
                  <Card className="h-full overflow-hidden border-2 border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-elevn-surface/70 dark:shadow-elevn-neon/10">
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${benefit.gradient} opacity-90`}
                      aria-hidden
                    />
                    <CardContent className="relative flex gap-5 p-6 sm:p-8">
                      <span
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient} text-white dark:text-elevn-ice sm:h-16 sm:w-16`}
                      >
                        <Icon className="text-2xl sm:text-3xl" aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <span
                          className={`text-xl font-bold tabular-nums bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent sm:text-2xl`}
                        >
                          {benefit.number}
                        </span>
                        <h4 className="mt-2 text-xl font-bold tracking-tight text-slate-950 dark:text-elevn-ice sm:text-2xl">
                          {benefit.title}
                        </h4>
                        <p className="mt-3 text-base font-medium leading-relaxed text-slate-700 dark:text-elevn-ice/90 sm:text-lg">
                          {benefit.body}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
