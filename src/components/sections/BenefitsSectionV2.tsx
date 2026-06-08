"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { HiBolt, HiCheckCircle } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { ElevnBrand } from "@/components/ui/ElevnBrand";

const BULLET_KEYS = ["benefits.bullet1", "benefits.bullet2", "benefits.bullet3"] as const;

const BULLET_ICON_GRADIENTS = [
  "from-[#83207f] to-[#799cbf]",
  "from-[#83207f] to-[#799cbf]",
  "from-[#83207f] to-[#799cbf]",
] as const;

export function BenefitsSectionV2({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const plainTermsOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const plainTermsY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);
  const whatYouGetOpacity = useTransform(scrollYProgress, [0.08, 0.24], [0, 1]);
  const whatYouGetY = useTransform(scrollYProgress, [0.08, 0.24], [30, 0]);
  const { t } = useTranslation();

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionDivider className="mb-0" />

      <motion.div
        style={{ y: parallaxY }}
        className="relative mx-auto w-full max-w-7xl px-6 pt-16 pb-16 sm:pb-20 max-[400px]:px-5 max-[400px]:pt-12 max-[400px]:pb-14 sm:px-6 sm:pt-18 sm:pb-24 md:px-10 md:pt-20 md:pb-26 lg:max-w-[1600px] lg:px-12 lg:pt-22 lg:pb-30 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        {/* Condensed value prop + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.32, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:gap-12 xl:gap-16"
        >
          <div className="flex flex-col">
            <motion.p
              style={{ opacity: plainTermsOpacity, y: plainTermsY }}
              className="text-center text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white sm:text-base"
            >
              {t("benefits.inPlainTerms")}
            </motion.p>
            <motion.h2
              id="benefits-heading"
              style={{ opacity: whatYouGetOpacity, y: whatYouGetY }}
              className="mt-4 text-center text-3xl font-bold tracking-tight max-[400px]:text-2xl sm:mt-5 sm:text-4xl md:text-5xl lg:text-5xl"
            >
              <span className="bg-gradient-to-t from-[#397aa7] to-[#EBF2EE] bg-clip-text text-transparent"><ElevnBrand>{t("benefits.whatYouGet")}</ElevnBrand></span>
            </motion.h2>
            <ul className="mx-auto mt-6 sm:mt-8 grid w-full max-w-5xl grid-cols-1 gap-4 max-[400px]:mt-6 sm:mt-8 sm:grid-cols-3 sm:gap-5 md:gap-6">
              {BULLET_KEYS.map((key, i) => (
                <li
                  key={i}
                  className="relative flex items-center justify-start gap-4 overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/[0.03] p-4 sm:p-5 text-left text-slate-950 backdrop-blur-sm backdrop-saturate-150 shadow-[0_8px_32px_-4px_rgba(31,38,135,0.1),inset_0_1px_0_0_rgba(255,255,255,0.35)] transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_40px_-2px_rgba(64,49,175,0.55),inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-white/[0.06] dark:from-white/[0.02] dark:to-transparent dark:text-elevn-ice/95 dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.05)] dark:hover:shadow-[0_0_40px_-2px_rgba(105,47,201,0.6),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br sm:h-12 sm:w-12 ${BULLET_ICON_GRADIENTS[i]} text-white shadow-md dark:text-elevn-ice`}
                  >
                    <HiCheckCircle className="text-2xl sm:text-3xl" aria-hidden />
                  </span>
                  <span className="text-base font-semibold leading-snug sm:text-lg md:text-xl">{t(key)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-center text-sm sm:text-base font-semibold text-slate-800 dark:text-elevn-ice/85 sm:mt-9 md:text-lg">
              {t("benefits.campaignsLive")}
            </p>
          </div>

          {/* CTA: Get opportunities instantly */}
          <div className="flex flex-col">
            <div className="relative mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 backdrop-blur-sm backdrop-saturate-150 shadow-[0_8px_32px_-4px_rgba(31,38,135,0.1),inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-white/[0.06] dark:from-white/[0.02] dark:to-transparent dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.05)] sm:p-7">
              <div className="relative flex flex-1 flex-col">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#83207f] to-[#799cbf] text-white shadow-lg shadow-[#83207f]/25 dark:text-elevn-ice dark:shadow-[#83207f]/30">
                    <HiBolt className="text-3xl" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#397aa7]">{t("benefits.stopChasing")}</p>
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl dark:text-elevn-ice">
                      {t("benefits.letRightOnes")}
                    </h3>
                  </div>
                </div>
                <p className="relative mt-4 text-xs sm:text-sm font-medium leading-snug text-slate-700 dark:text-elevn-ice/90">
                  {t("benefits.ctaDescription")}
                </p>
                <div className="relative mt-5 border-t border-slate-200/80 pt-4 dark:border-white/15">
                  <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80">
                    {t("benefits.whyDifferentP2")}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                size="lg"
                onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
                className="relative mt-5 w-full bg-gradient-to-br from-[#397aa7] to-[#84a3c4] py-5 text-sm sm:text-base font-bold text-white shadow-xl shadow-elevn-primary/20 transition hover:opacity-95 hover:shadow-2xl dark:text-elevn-ice dark:shadow-elevn-cyan/20"
              >
                {t("benefits.ctaButton")}
              </Button>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
