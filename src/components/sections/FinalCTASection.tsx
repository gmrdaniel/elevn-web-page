"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { HiChevronDown } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;
const GRADIENT_TITLE =
  "linear-gradient(135deg, #22d3ee 0%, #06b6d4 30%, #8b5cf6 65%, #d946ef 100%)";

const FAQ_KEYS = [
  { qKey: "faq.q1", aKey: "faq.a1" },
  { qKey: "faq.q2", aKey: "faq.a2" },
  { qKey: "faq.q3", aKey: "faq.a3" },
  { qKey: "faq.q4", aKey: "faq.a4" },
  { qKey: "faq.q5", aKey: "faq.a5" },
  { qKey: "faq.q6", aKey: "faq.a6" },
  { qKey: "faq.q7", aKey: "faq.a7" },
] as const;

export function FinalCTASection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useTranslation();

  return (
    <section
      id="join"
      ref={sectionRef}
      className="relative overflow-hidden scroll-mt-24"
      aria-labelledby="final-cta-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-25" aria-hidden />
        {/* CTA block */}
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 pb-20 max-[400px]:px-3 max-[400px]:py-12 max-[400px]:pb-16 sm:px-6 sm:py-20 sm:pb-24 md:px-10 md:py-24 md:pb-28 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20 space-y-14 sm:space-y-16 lg:space-y-20">

        <motion.div
          id="faq"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
          transition={{ duration: 0.35, delay: 0.08, ease }}
          className="mx-auto max-w-3xl scroll-mt-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-elevn-cyan sm:text-sm">
              {t("faq.label")}
            </p>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl md:text-3xl dark:text-elevn-ice">
              {t("faq.heading")}
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80 md:text-base">
              {t("faq.description")}
            </p>
          </div>

          <div className="mt-8 space-y-3 sm:mt-10">
            {FAQ_KEYS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item.qKey}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 12 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.04, ease }}
                  className={`overflow-hidden rounded-2xl border bg-white/95 shadow-sm transition-colors duration-200 dark:bg-elevn-surface/90 ${
                    isOpen
                      ? "border-elevn-cyan/70 shadow-[0_0_32px_rgba(34,211,238,0.2)] dark:border-elevn-cyan/80"
                      : "border-slate-200/80 dark:border-white/10"
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-4.5"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elevn-cyan/10 text-[11px] font-bold text-elevn-cyan ring-1 ring-elevn-cyan/40">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 sm:text-base dark:text-elevn-ice">
                        {t(item.qKey)}
                      </span>
                    </div>
                    <HiChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                        isOpen ? "rotate-180 text-elevn-cyan" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease }}
                      >
                        <div className="px-4 pb-4 text-sm font-medium leading-relaxed text-slate-600 sm:px-5 sm:pb-5 dark:text-elevn-ice/85">
                          {t(item.aKey)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 28,
          }}
          transition={{ duration: 0.4, ease }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-elevn-cyan/30 bg-white/95 px-6 py-10 shadow-xl dark:border-elevn-cyan/40 dark:bg-elevn-surface/90 dark:shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] sm:px-10 sm:py-12 md:px-14 md:py-16">
            <div
              className="absolute inset-0 bg-gradient-to-br from-elevn-primary/[0.04] via-transparent to-elevn-cyan/[0.06] dark:from-elevn-cyan/10 dark:to-elevn-violet/10"
              aria-hidden
            />
            <div className="relative text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-elevn-cyan">
                {t("finalCta.label")}
              </p>
              <h2
                id="final-cta-heading"
                className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl lg:text-5xl dark:text-elevn-ice"
              >
                {t("finalCta.heading")}{" "}
                <span
                  className="bg-clip-text font-extrabold"
                  style={{
                    background: GRADIENT_TITLE,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {t("finalCta.headingHighlight")}
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg font-semibold leading-relaxed text-slate-700 dark:text-elevn-ice/90 md:text-xl">
                {t("finalCta.description")}
              </p>
              <p className="mt-3 text-base font-bold text-slate-800 dark:text-elevn-ice/95">
                {t("finalCta.boldText")}
              </p>
              <Button
                type="button"
                size="lg"
                className="mt-10 w-full bg-gradient-to-br from-[#1d96c3] to-[#393da3] px-10 py-7 text-lg font-bold text-white shadow-xl shadow-elevn-primary/25 transition hover:opacity-95 hover:shadow-2xl hover:shadow-elevn-cyan/20 dark:text-elevn-ice dark:shadow-elevn-cyan/20"
                onClick={onOpenJoinForm ?? (() => window.open("https://laneta-portal.netlify.app/", "_blank", "noopener,noreferrer"))}
              >
                {t("finalCta.ctaButton")}
              </Button>
              <p className="mt-6 text-sm font-semibold text-slate-600 dark:text-elevn-ice/75">
                {t("finalCta.ctaFooter")}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
