"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { staggerContainer, fadeUp } from "@/lib/motion";

const LANETA_URL = "https://laneta-portal.netlify.app/";

export function PoweredBySection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="powered-by-laneta"
      className="relative overflow-hidden py-16 sm:py-20 scroll-mt-24"
      aria-labelledby="powered-by-laneta-heading"
    >
      <div className="relative mx-auto w-full max-w-4xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-5 rounded-3xl border border-slate-200/80 bg-white/70 px-6 py-10 text-center shadow-elevn-card backdrop-blur-sm dark:border-white/10 dark:bg-elevn-surface/60 sm:px-10 sm:py-14"
        >
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600 dark:border-white/15 dark:bg-elevn-dark/60 dark:text-elevn-ice/75">
              {t("poweredBy.eyebrow")}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-elevn-primary/15 to-elevn-cyan/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-elevn-primary dark:text-elevn-cyan">
              {t("poweredBy.metaBadge")}
            </span>
          </motion.div>

          <motion.h2
            id="powered-by-laneta-heading"
            variants={fadeUp}
            className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-elevn-ice sm:text-3xl"
          >
            {t("poweredBy.heading")}
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-elevn-ice/75 sm:text-base"
          >
            {t("poweredBy.body")}
          </motion.p>

          <motion.a
            variants={fadeUp}
            href={LANETA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-elevn-primary to-elevn-cyan px-6 py-2.5 text-sm font-semibold text-white shadow-elevn-glow transition-all duration-200 hover:scale-[1.02]"
          >
            {t("poweredBy.cta")}
            <HiArrowUpRight className="h-4 w-4" aria-hidden />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
