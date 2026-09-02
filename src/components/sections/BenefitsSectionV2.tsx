"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { staggerContainer, fadeUp, fadeUpCard, CARD_CLASS } from "@/lib/motion";

const PILLARS = [
  {
    number: "01",
    titleKey: "pillars.p1Title",
    bodyKey: "pillars.p1Body",
    linkKey: "pillars.p1Link",
    href: "#join",
  },
  {
    number: "02",
    titleKey: "pillars.p2Title",
    bodyKey: "pillars.p2Body",
    linkKey: "pillars.p2Link",
    href: "#events-webinars",
  },
  {
    number: "03",
    titleKey: "pillars.p3Title",
    bodyKey: "pillars.p3Body",
    linkKey: "pillars.p3Link",
    href: "#community",
  },
] as const;

export function BenefitsSectionV2({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handlePillarClick = (href: string) => (e: React.MouseEvent) => {
    if (href === "#join" && onOpenJoinForm) {
      e.preventDefault();
      onOpenJoinForm();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28 scroll-mt-24"
      aria-labelledby="benefits-heading"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-elevn-primary dark:text-elevn-cyan"
          >
            <span className="inline-block h-0.5 w-6 rounded bg-elevn-primary dark:bg-elevn-cyan" />
            {t("pillars.eyebrow")}
          </motion.div>
          <motion.h2
            variants={fadeUp}
            id="benefits-heading"
            className="text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-slate-950 dark:text-elevn-ice"
          >
            {t("pillars.titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-elevn-primary via-elevn-cyan to-elevn-violet bg-clip-text text-transparent">
              {t("pillars.titleLine2")}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-elevn-ice/75 sm:text-base"
          >
            {t("pillars.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 md:grid-cols-3 md:gap-6"
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.number}
              variants={fadeUpCard}
              className={`group relative flex flex-col overflow-hidden p-6 sm:p-7 ${CARD_CLASS}`}
            >
              <span className="mb-5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-elevn-primary to-elevn-violet text-base font-bold text-white shadow-md">
                {pillar.number}
              </span>
              <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-elevn-ice sm:text-xl">
                {t(pillar.titleKey)}
              </h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-elevn-ice/75">
                {t(pillar.bodyKey)}
              </p>
              <a
                href={pillar.href}
                onClick={handlePillarClick(pillar.href)}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-elevn-primary transition-[gap] duration-200 hover:gap-2.5 dark:text-elevn-cyan"
              >
                {t(pillar.linkKey)}
                <HiArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
