"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { HiAcademicCap, HiBookOpen, HiVideoCamera, HiUserGroup } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const STEP_ICONS = [HiBookOpen, HiVideoCamera, HiUserGroup] as const;
const STEP_STYLES = [
  { number: "01", gradient: "from-elevn-primary to-elevn-cyan" },
  { number: "02", gradient: "from-elevn-cyan to-elevn-violet" },
  { number: "03", gradient: "from-elevn-violet to-elevn-magenta" },
] as const;

const STEP_KEYS = [
  { titleKey: "studio.step1Title", bodyKey: "studio.step1Body" },
  { titleKey: "studio.step2Title", bodyKey: "studio.step2Body" },
  { titleKey: "studio.step3Title", bodyKey: "studio.step3Body" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ElevnStudioSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const { t } = useTranslation();

  return (
    <section
      id="elevn-studio"
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-labelledby="elevn-studio-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 max-[400px]:px-3 max-[400px]:py-12 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.32, ease }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-elevn-cyan max-[400px]:tracking-[0.15em] sm:text-sm">
            {t("studio.label")}
          </p>
          <h2
            id="elevn-studio-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-slate-950 max-[400px]:mt-2 max-[400px]:text-xl sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl dark:text-elevn-ice"
          >
            {t("studio.heading")}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-relaxed text-slate-700 md:text-lg dark:text-elevn-ice/90">
            {t("studio.description")}
          </p>
        </motion.div>

        <div className="mt-10 max-[400px]:mt-8 lg:mt-20">
          <motion.div
            className="mb-8 flex items-center gap-3 max-[400px]:mb-6 max-[400px]:gap-2 max-[650px]:mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 16 }}
            transition={{ duration: 0.28, delay: 0.02, ease }}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-elevn-primary to-elevn-cyan text-white max-[400px]:h-9 max-[400px]:w-9 max-[400px]:rounded-lg dark:text-elevn-ice">
              <HiAcademicCap className="text-xl max-[400px]:text-base" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-elevn-cyan max-[400px]:text-[10px] max-[400px]:tracking-[0.2em]">
                {t("studio.forCreators")}
              </p>
              <h3 className="text-lg font-bold text-slate-950 max-[400px]:text-base md:text-xl dark:text-elevn-ice">
                {t("studio.learnGrowAccelerate")}
              </h3>
            </div>
          </motion.div>

          <div className="relative mx-auto w-full max-w-4xl pb-10 pt-2 max-[400px]:pb-8 max-[400px]:pt-1 md:max-w-5xl md:pb-16 md:pt-4 lg:max-w-6xl xl:max-w-[1400px]">
            <motion.div
              className="relative mx-auto w-full max-w-4xl space-y-5 max-[400px]:space-y-4 max-[650px]:space-y-7 md:max-w-5xl md:space-y-8 lg:max-w-6xl xl:max-w-[1400px]"
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease }}
            >
              {STEP_STYLES.map((step, i) => {
                const Icon = STEP_ICONS[i];
                const keys = STEP_KEYS[i];
                const stepDelay = 0.2 + i * 0.14;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{
                      opacity: sectionInView ? 1 : 0,
                      y: sectionInView ? 0 : 24,
                    }}
                    transition={{ duration: 0.4, delay: stepDelay * 0.4, ease }}
                    className="relative flex overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/[0.03] backdrop-blur-sm backdrop-saturate-150 shadow-[0_8px_32px_-4px_rgba(31,38,135,0.1),inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-white/[0.06] dark:from-white/[0.02] dark:to-transparent dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                  >
                    <div
                      className={`flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 bg-gradient-to-b ${step.gradient} py-4 max-[400px]:w-16 max-[400px]:py-3 max-[650px]:py-5 md:w-28 md:gap-1 md:py-9`}
                    >
                      <span className="text-2xl font-bold tabular-nums text-white/95 drop-shadow-sm max-[400px]:text-xl max-[650px]:text-3xl md:text-4xl">
                        {step.number}
                      </span>
                      <span className="text-white/95 dark:text-elevn-ice/90">
                        <Icon className="text-xl max-[400px]:text-lg max-[650px]:text-2xl md:text-3xl" aria-hidden />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 max-[400px]:px-3 max-[400px]:py-3 max-[650px]:px-5 max-[650px]:py-5 md:px-8 md:py-7">
                      <h4 className="text-base font-bold tracking-tight text-slate-950 max-[400px]:text-sm max-[650px]:text-lg md:text-xl dark:text-elevn-ice">
                        {t(keys.titleKey)}
                      </h4>
                      <p className="mt-1.5 min-w-0 max-w-full text-xs font-medium leading-[1.65] text-slate-950 max-[400px]:mt-1 max-[400px]:leading-[1.6] max-[650px]:mt-2 max-[650px]:text-sm max-[650px]:leading-[1.7] md:text-base md:leading-[1.75] dark:text-elevn-ice/90">
                        {t(keys.bodyKey)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease }}
            className="mx-auto mt-5 h-1 w-full max-w-4xl origin-left rounded-full bg-gradient-to-r from-elevn-primary via-elevn-violet to-elevn-magenta opacity-60 max-[400px]:mt-4 max-[650px]:mt-6 md:mt-8 md:max-w-5xl lg:max-w-6xl xl:max-w-[1400px]"
            aria-hidden
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
          transition={{ duration: 0.32, delay: 0.2, ease }}
          className="mt-12 flex flex-col items-center text-center sm:mt-14"
        >
          <Button
            type="button"
            size="lg"
            onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
            className="w-full max-w-sm bg-gradient-to-br from-[#1d96c3] to-[#393da3] px-8 py-6 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice sm:w-auto"
          >
            {t("studio.ctaButton")}
          </Button>
          <p className="mt-4 text-sm font-semibold text-slate-600 dark:text-elevn-ice/80">
            {t("studio.ctaHelper")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
