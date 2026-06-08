"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { HiSparkles } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

const LOGO_URL = "/assets/images/logo%20eleven.png";

export function ElevnIsYourSpaceSection({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const { t } = useTranslation();

  return (
    <section
      id="elevn-is-your-space"
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-labelledby="elevn-is-your-space-heading"
    >
      <SectionDivider className="mb-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-16 sm:py-20 max-[400px]:px-5 max-[400px]:py-14 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:max-w-[1600px] lg:px-12 lg:py-32 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.4, ease }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center lg:max-w-6xl xl:max-w-[1400px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: sectionInView ? 1 : 0, scale: sectionInView ? 1 : 0.96 }}
            transition={{ duration: 0.35, delay: 0.04, ease }}
            className="hidden items-center gap-3 rounded-full border border-[#397aa7]/60 bg-white/90 px-4 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#397aa7] shadow-sm transition-all duration-300 hover:border-white/20 hover:bg-gradient-to-br hover:from-[#397aa7] hover:to-[#84a3c4] hover:text-white sm:inline-flex dark:border-[#397aa7]/70 dark:bg-elevn-surface/80 dark:text-[#397aa7] dark:hover:text-white"
          >
            <HiSparkles className="text-sm" aria-hidden />
            {t("hero.comingSoon")}
          </motion.div>

          <div className="mt-6 flex flex-col items-center gap-4 sm:gap-5">
            <div className="flex items-center gap-4">
              <img
                src={LOGO_URL}
                alt=""
                className="h-36 w-auto object-contain sm:h-40 lg:h-44"
                width={220}
                height={176}
              />
            </div>
            <h1
              id="elevn-is-your-space-heading"
              className="whitespace-nowrap text-[2rem] font-extrabold tracking-tight text-slate-950 max-[400px]:text-[1.7rem] sm:text-[3.3rem] md:text-[4.2rem] lg:text-[5.5rem] xl:text-[6.5rem] dark:text-elevn-ice"
            >
              <span className="block">
                {t("hero.headline").split(" ").map((word, i, arr) => (
                  <motion.span
                    key={i}
                    className="inline-block font-eleven text-white"
                    initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
                    animate={{
                      opacity: sectionInView ? 1 : 0,
                      y: sectionInView ? 0 : 16,
                      filter: sectionInView ? "blur(0px)" : "blur(3px)",
                    }}
                    transition={{
                      duration: 1.1,
                      delay: 0.25 + i * 0.28,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}
                    {i < arr.length - 1 ? " " : ""}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>

          <p className="mt-5 max-w-xl text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-elevn-ice/70 sm:text-sm">
            {t("hero.tagline")}
          </p>

          <p className="mt-5 max-w-xl text-balance text-[10px] font-medium leading-relaxed text-slate-700 dark:text-elevn-ice/85 sm:text-base lg:max-w-6xl">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:gap-5">
            <Button
              type="button"
              size="lg"
              onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
              className="w-full max-w-xs bg-gradient-to-br from-[#397aa7] to-[#84a3c4] px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice sm:w-auto"
            >
              {t("hero.cta")}
            </Button>
            <p className="text-center text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-elevn-ice/70">
              {t("hero.ctaHelper")}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
