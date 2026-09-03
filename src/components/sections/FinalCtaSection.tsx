"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { staggerContainer, fadeUp } from "@/lib/motion";

export function FinalCtaSection({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      className="relative overflow-hidden py-20 sm:py-24 scroll-mt-24"
      aria-labelledby="final-cta-heading"
    >
      <div className="relative mx-auto w-full max-w-3xl px-6 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full bg-elevn-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-elevn-primary dark:bg-elevn-cyan/10 dark:text-elevn-cyan"
          >
            {t("finalCta.pill")}
          </motion.span>

          <motion.h2
            variants={fadeUp}
            id="final-cta-heading"
            className="mt-5 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-slate-950 dark:text-elevn-ice"
          >
            {t("finalCta.titleLine1")}{" "}
            <span className="bg-gradient-to-r from-elevn-primary via-elevn-cyan to-elevn-violet bg-clip-text text-transparent">
              {t("finalCta.titleHighlight")}
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-elevn-ice/75 sm:text-base"
          >
            {t("finalCta.body")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
              className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-gradient-to-r from-elevn-primary to-elevn-cyan px-8 py-3 text-base font-semibold text-white shadow-elevn-glow transition-all duration-200 hover:scale-[1.02] sm:w-auto"
            >
              {t("finalCta.ctaPrimary")}
            </button>
            <p className="text-xs font-medium text-slate-500 dark:text-elevn-ice/60">
              {t("finalCta.note")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
