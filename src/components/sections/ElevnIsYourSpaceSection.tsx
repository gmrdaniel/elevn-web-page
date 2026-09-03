"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAnimeTitle } from "@/hooks/useAnimeTitle";
import { staggerContainer, fadeUp } from "@/lib/motion";
import { useTranslation } from "react-i18next";

const LOGO_LIGHT = "/assets/images/logo%20eleven%20negro.png";
const LOGO_DARK = "/assets/images/logo%20eleven.png";

export function ElevnIsYourSpaceSection({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const titleRef = useAnimeTitle({ inView: true, staggerMs: 45, gradientLastWords: 0 });

  return (
    <section
      id="elevn-is-your-space"
      ref={sectionRef}
      className="relative flex items-center overflow-hidden"
      aria-labelledby="elevn-is-your-space-heading"
    >
      <div className="relative mx-auto w-full max-w-5xl px-6 pb-16 pt-28 sm:pb-20 sm:pt-32 md:pb-24 md:pt-36">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <img
              src={LOGO_LIGHT}
              alt="ELEVN"
              className="h-16 w-auto object-contain dark:hidden sm:h-20"
              width={200}
              height={80}
            />
            <img
              src={LOGO_DARK}
              alt="ELEVN"
              className="hidden h-16 w-auto object-contain dark:block sm:h-20"
              width={200}
              height={80}
            />
          </motion.div>

          <h1
            id="elevn-is-your-space-heading"
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 dark:text-elevn-ice sm:text-6xl md:text-7xl"
          >
            <span ref={titleRef} className="anime-title block">
              {t("hero.headline")}
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-xs font-semibold uppercase tracking-[0.22em] text-elevn-primary dark:text-elevn-cyan sm:text-sm"
          >
            {t("hero.tagline")}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-sm font-medium leading-relaxed text-slate-700 dark:text-elevn-ice/85 sm:text-base md:text-lg"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4">
            <Button
              type="button"
              size="lg"
              onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
              className="w-full max-w-xs bg-gradient-to-br from-elevn-primary to-elevn-cyan px-8 py-6 text-base font-semibold text-white shadow-elevn-glow transition hover:opacity-95 sm:w-auto"
            >
              {t("hero.cta")}
            </Button>
            <p className="text-xs font-semibold text-slate-500 dark:text-elevn-ice/70">
              {t("hero.ctaHelper")}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
