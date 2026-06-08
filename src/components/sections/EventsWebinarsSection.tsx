"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HiBookOpen, HiVideoCamera, HiUserGroup } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const STEP_ICONS = [HiBookOpen, HiVideoCamera, HiUserGroup] as const;
const STEP_STYLES = [
  { number: "01", gradient: "from-[#83207f] to-[#799cbf]" },
  { number: "02", gradient: "from-[#83207f] to-[#799cbf]" },
  { number: "03", gradient: "from-[#83207f] to-[#799cbf]" },
] as const;

const STEP_KEYS = [
  { titleKey: "studio.step1Title", bodyKey: "studio.step1Body" },
  { titleKey: "studio.step2Title", bodyKey: "studio.step2Body" },
  { titleKey: "studio.step3Title", bodyKey: "studio.step3Body" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function EventsWebinarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);
  const { t } = useTranslation();

  return (
    <section
      ref={sectionRef}
      id="events-webinars"
      className="relative overflow-hidden"
      aria-labelledby="events-webinars-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 sm:py-16 max-[400px]:px-5 max-[400px]:py-12 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center"
        >
          <h2
            id="events-webinars-heading"
            className="whitespace-nowrap text-[1.9rem] font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-elevn-ice"
          >
            <span className="inline-flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3 md:gap-4">
              <img
                src="/assets/images/icono%20eleven%20.png"
                alt=""
                aria-hidden
                className="h-[1.25em] w-auto object-contain"
              />
              {t("eventsWebinars.heading")}
            </span>
          </h2>
        </motion.div>

        <div className="mt-10 max-[400px]:mt-8 lg:mt-20">
          <div className="relative mx-auto w-full max-w-5xl pb-10 pt-2 max-[400px]:pb-8 max-[400px]:pt-1 md:pb-16 md:pt-4 lg:max-w-6xl">
            <motion.div
              className="relative mx-auto w-full space-y-4 max-[400px]:space-y-3 md:space-y-5"
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease }}
            >
              {STEP_STYLES.map((step, i) => {
                const Icon = STEP_ICONS[i];
                const keys = STEP_KEYS[i];
                const stepDelay = 0.2 + i * 0.14;
                const stairOffsets = ["md:ml-0", "md:ml-24 lg:ml-40", "md:ml-48 lg:ml-80"] as const;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{
                      opacity: sectionInView ? 1 : 0,
                      y: sectionInView ? 0 : 24,
                    }}
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.4, delay: stepDelay * 0.4, ease }}
                    className={`relative flex w-full max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/[0.03] backdrop-blur-sm backdrop-saturate-150 shadow-[0_8px_32px_-4px_rgba(31,38,135,0.1),inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-white/[0.06] dark:from-white/[0.02] dark:to-transparent dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.05)] ${stairOffsets[i]}`}
                  >
                    <div
                      className={`flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 bg-gradient-to-b ${step.gradient} py-3 sm:py-4 max-[400px]:w-16 max-[400px]:py-3 md:w-24 md:gap-1 md:py-6`}
                    >
                      <span className="text-2xl font-bold tabular-nums text-white/95 drop-shadow-sm max-[400px]:text-xl md:text-3xl">
                        {step.number}
                      </span>
                      <span className="text-white/95 dark:text-elevn-ice/90">
                        <Icon className="text-lg max-[400px]:text-base md:text-2xl" aria-hidden />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:py-4 max-[400px]:px-5 max-[400px]:py-3 md:px-7 md:py-6">
                      <h4 className="text-base font-bold tracking-tight text-slate-950 max-[400px]:text-sm md:text-lg dark:text-elevn-ice">
                        {t(keys.titleKey)}
                      </h4>
                      <p className="mt-1.5 min-w-0 max-w-full text-[11px] sm:text-xs font-medium leading-[1.65] text-slate-950 max-[400px]:text-[11px] md:mt-2 md:text-sm md:leading-[1.7] dark:text-elevn-ice/90">
                        {t(keys.bodyKey)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
