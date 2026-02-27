"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { Card, CardContent } from "@/components/ui/card";
import {
  HiBriefcase,
  HiAcademicCap,
  HiShieldCheck,
  HiUserGroup,
} from "react-icons/hi2";

const SLIDE_DURATION_MS = 6000;

const BENEFITS = [
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

/* 2.5D effect */
const SLIDE_VARIANTS_2_5D = [
  { initial: { rotateY: 22, z: -220, scale: 0.94 }, exit: { rotateY: -22, z: -420, scale: 0.86 } },
  { initial: { rotateY: -22, z: -220, scale: 0.94 }, exit: { rotateY: 22, z: -420, scale: 0.86 } },
  { initial: { rotateX: 14, z: -220, scale: 0.94 }, exit: { rotateX: -14, z: -420, scale: 0.86 } },
  { initial: { rotateX: -14, z: -220, scale: 0.94 }, exit: { rotateX: 14, z: -420, scale: 0.86 } },
] as const;

function BenefitSlide({
  benefit,
  variantIndex,
}: {
  benefit: (typeof BENEFITS)[number];
  variantIndex: number;
}) {
  const Icon = benefit.icon;
  const variant = SLIDE_VARIANTS_2_5D[variantIndex % SLIDE_VARIANTS_2_5D.length];
  return (
    <motion.article
      initial={variant.initial}
      animate={{ rotateY: 0, rotateX: 0, z: 0, scale: 1 }}
      exit={variant.exit}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
      className="absolute inset-0 flex origin-center items-stretch justify-center"
    >
      <Card className="group relative flex w-full flex-1 overflow-hidden border-slate-200 bg-white p-4 shadow-md dark:border-white/10 dark:bg-elevn-surface max-[400px]:p-3 max-[650px]:p-6 sm:p-8 md:p-14 lg:p-16 xl:p-20">
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${benefit.gradient} opacity-80`}
          aria-hidden
        />
        <div
          className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-[0.03] transition group-hover:opacity-[0.06]`}
          aria-hidden
        />
        <CardContent className="relative flex flex-col gap-4 p-0 max-[400px]:gap-3 max-[650px]:gap-5 sm:flex-row sm:items-start sm:gap-10 md:gap-12">
          <span
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${benefit.gradient} text-white shadow-elevn-neon max-[400px]:h-12 max-[400px]:w-12 max-[650px]:h-[72px] max-[650px]:w-[72px] sm:h-24 sm:w-24 md:h-28 md:w-28 dark:text-elevn-ice`}
          >
            <Icon className="text-xl max-[400px]:text-2xl max-[650px]:text-3xl sm:text-4xl md:text-5xl" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <span
              className={`inline-block text-2xl font-bold tabular-nums max-[400px]:text-3xl max-[650px]:text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r ${benefit.gradient} bg-clip-text text-transparent`}
            >
              {benefit.number}
            </span>
            <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950 max-[400px]:mt-1.5 max-[400px]:text-lg max-[650px]:mt-3 max-[650px]:text-3xl sm:mt-4 sm:text-4xl md:text-5xl dark:text-elevn-ice">
              {benefit.title}
            </h3>
            <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-950 max-[400px]:mt-2 max-[400px]:text-xs max-[400px]:leading-[1.6] max-[650px]:mt-4 max-[650px]:text-lg sm:mt-6 sm:text-xl md:text-2xl md:leading-relaxed dark:text-elevn-ice/90">
              {benefit.body}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });

  const [index, setIndex] = useState(0);
  const total = BENEFITS.length;
  const currentBenefit = BENEFITS[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-elevn-dark"
      aria-labelledby="benefits-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionTransition inView={sectionInView} className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 max-[400px]:px-3 max-[400px]:py-12 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 24,
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-elevn-cyan max-[400px]:tracking-[0.15em] sm:text-sm">
            Benefits of being a member
          </p>
          <h2
            id="benefits-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-slate-950 max-[400px]:mt-2 max-[400px]:text-xl sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl dark:text-elevn-ice"
          >
            Why creators choose our platform
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 max-[400px]:mt-8 max-[400px]:gap-5 lg:mt-20 lg:grid-cols-[1fr_4fr] lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-center lg:pr-4">
            <div className="relative border-l-2 border-elevn-cyan/50 pl-4 max-[400px]:pl-3 sm:pl-6 md:pl-8">
              <p className="text-sm font-medium leading-[1.7] text-slate-950 max-[400px]:text-xs max-[400px]:leading-[1.65] sm:text-base sm:leading-[1.75] md:text-lg md:leading-[1.8] dark:text-elevn-ice/90">
                Professionalizing your career as a creator requires more than an audience. It requires access to the tools, opportunities, and resources that turn that audience into a sustainable business.{" "}
                <span className="font-semibold text-slate-950 dark:text-elevn-ice">
                  ELEVN provides that in one place
                </span>{" "}
                so you can focus on what you do best: creating.
              </p>
            </div>
          </div>
          <div
            className="relative min-h-[380px] overflow-hidden rounded-xl max-[400px]:min-h-[420px] max-[400px]:rounded-lg max-[650px]:min-h-[480px] sm:min-h-[420px] md:min-h-[480px] md:rounded-2xl lg:min-h-[520px]"
            style={{ perspective: "1800px", perspectiveOrigin: "50% 50%" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <BenefitSlide
                key={currentBenefit.number}
                benefit={currentBenefit}
                variantIndex={index}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
