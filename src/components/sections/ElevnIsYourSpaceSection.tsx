"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { HiSparkles, HiCheckBadge, HiScale, HiHeart } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

const GRADIENT_TITLE =
  "linear-gradient(135deg, #22d3ee 0%, #06b6d4 30%, #8b5cf6 65%, #d946ef 100%)";

const LOGO_URL = "/assets/images/elevn.png";

const PILLAR_ICONS = [HiCheckBadge, HiScale, HiHeart] as const;
const PILLAR_STYLES = [
  { gradient: "from-elevn-cyan to-elevn-primary", borderHover: "hover:border-elevn-cyan/50" },
  { gradient: "from-elevn-violet to-elevn-cyan", borderHover: "hover:border-elevn-violet/50" },
  { gradient: "from-elevn-magenta to-elevn-violet", borderHover: "hover:border-elevn-magenta/50" },
] as const;

export function ElevnIsYourSpaceSection({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const { t } = useTranslation();

  const pillars = [
    { labelKey: "hero.pillar1Label", titleKey: "hero.pillar1Title", lineKey: "hero.pillar1Line" },
    { labelKey: "hero.pillar2Label", titleKey: "hero.pillar2Title", lineKey: "hero.pillar2Line" },
    { labelKey: "hero.pillar3Label", titleKey: "hero.pillar3Title", lineKey: "hero.pillar3Line" },
  ];

  return (
    <section
      id="elevn-is-your-space"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-100 dark:bg-elevn-dark"
      aria-labelledby="elevn-is-your-space-heading"
    >
      <SectionDivider className="mb-0" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 max-[400px]:px-3 max-[400px]:py-14 sm:px-6 sm:py-24 md:px-10 md:py-28 lg:flex lg:max-w-[1600px] lg:items-center lg:justify-between lg:gap-16 lg:px-12 lg:py-32 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.4, ease }}
          className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: sectionInView ? 1 : 0, scale: sectionInView ? 1 : 0.96 }}
            transition={{ duration: 0.35, delay: 0.04, ease }}
            className="inline-flex items-center gap-3 rounded-full border border-elevn-cyan/40 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-elevn-cyan shadow-sm dark:border-elevn-cyan/50 dark:bg-elevn-surface/80 dark:text-elevn-cyan"
          >
            <HiSparkles className="text-sm" aria-hidden />
            {t("hero.comingSoon")}
          </motion.div>

          <div className="mt-6 flex flex-col items-center gap-4 lg:items-start">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt=""
                className="h-12 w-auto object-contain sm:h-14"
                width={96}
                height={52}
              />
              <span className="font-sans text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
                ELEVN
              </span>
            </div>
            <h1
              id="elevn-is-your-space-heading"
              className="text-3xl font-extrabold tracking-tight text-slate-950 max-[400px]:text-2xl sm:text-4xl md:text-5xl dark:text-elevn-ice"
            >
              <span
                className="block bg-clip-text text-transparent"
                style={{
                  background: GRADIENT_TITLE,
                  WebkitBackgroundClip: "text",
                }}
              >
                {t("hero.headline")}
              </span>
            </h1>
          </div>

          <p className="mt-5 text-base font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-elevn-ice/70 sm:text-sm">
            {t("hero.tagline")}
          </p>

          <p className="mt-5 text-sm font-medium leading-relaxed text-slate-700 dark:text-elevn-ice/85 sm:text-base">
            {t("hero.description")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-center lg:justify-start">
            <Button
              type="button"
              size="lg"
              onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
              className="w-full max-w-xs bg-elevn-gradient px-8 py-6 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice sm:w-auto"
            >
              {t("hero.cta")}
            </Button>
            <p className="text-xs font-semibold text-slate-500 dark:text-elevn-ice/70">
              {t("hero.ctaHelper")}
            </p>
          </div>
        </motion.div>

        {/* What to expect on ELEVN */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.35, delay: 0.1, ease }}
          className="relative mx-auto mt-16 w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-5 shadow-xl shadow-slate-200/50 dark:border-white/10 dark:bg-elevn-surface/95 dark:shadow-slate-900/20 sm:mt-12 sm:p-6 lg:p-7 min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]"
        >
          <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-elevn-ice/60">
              {t("hero.expectTitle")}
            </p>
            <p className="text-sm font-medium text-slate-500 dark:text-elevn-ice/70">
              {t("hero.expectSubtitle")}
            </p>
          </div>
          <div className="mt-6 grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {pillars.map((item, i) => {
              const Icon = PILLAR_ICONS[i];
              const style = PILLAR_STYLES[i];
              return (
                <div
                  key={item.labelKey}
                  className="relative flex h-full flex-col gap-3 rounded-2xl bg-gradient-to-br from-white/90 to-slate-50/90 p-4 shadow-sm ring-1 ring-slate-100/80 dark:from-elevn-surface/90 dark:to-elevn-dark/80 dark:ring-white/10"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${style.gradient} text-white shadow-md dark:text-elevn-ice`}
                    >
                      <Icon className="text-lg" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-elevn-ice/70">
                        {t(item.labelKey)}
                      </p>
                      <p className="text-sm sm:text-base lg:text-sm xl:text-base font-semibold tracking-tight text-slate-900 dark:text-elevn-ice break-words">
                        {t(item.titleKey)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80 break-words">
                    {t(item.lineKey)}
                  </p>
                  {i < pillars.length - 1 && (
                    <span className="pointer-events-none absolute right-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent sm:block dark:via-white/15" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
