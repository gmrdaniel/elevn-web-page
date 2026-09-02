"use client";

import { useTranslation } from "react-i18next";
import { ElevnBrand } from "@/components/ui/ElevnBrand";

const STATS = [
  { numKey: "community.stat1Num", labelKey: "community.stat1Label" },
  { numKey: "community.stat2Num", labelKey: "community.stat2Label" },
  { numKey: "community.stat3Num", labelKey: "community.stat3Label" },
  { numKey: "community.stat4Num", labelKey: "community.stat4Label" },
] as const;

export function CommunitySection() {
  const { t } = useTranslation();

  return (
    <section
      id="community"
      className="relative overflow-hidden bg-[#f7f7fc] px-6 py-24 font-poppins text-[#1a1a2e] sm:px-10 md:px-16 lg:px-20 lg:py-28 scroll-mt-24"
      aria-labelledby="community-heading"
    >
      <div
        className="proto-blob animate-proto-blob"
        style={{
          width: 500,
          height: 500,
          top: -100,
          right: -100,
          opacity: 0.07,
          background: "linear-gradient(135deg, #493fe2, #5895c0)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 sm:py-16 max-[400px]:px-5 max-[400px]:py-12 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.32, ease }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397aa7] sm:text-sm">
            {t("community.label")}
          </p>
          <h2
            id="community-heading"
            className="mb-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.15] tracking-[-1px] text-[#1a1a2e]"
          >
            {t("community.titleLine1")}
            <br />
            {t("community.titleLine2")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/85 md:text-lg">
            {t("community.description")}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-xs sm:text-sm font-medium text-slate-500 dark:text-elevn-ice/75 md:text-base">
            {t("community.subDescription")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 12 }}
          transition={{ duration: 0.35, delay: 0.25, ease }}
          className="mt-8 flex flex-col items-center gap-4 sm:mt-10"
        >
          <a
            href={DISCORD_ONBOARDING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#397aa7] to-[#84a3c4] px-7 py-2.5 text-xs sm:text-sm font-semibold text-elevn-ice shadow-lg shadow-elevn-primary/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-elevn-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-elevn-dark"
          >
            <ElevnBrand>{t("community.discordButton")}</ElevnBrand>
            <HiArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.4, delay: 0.35, ease }}
          className="mt-10 overflow-hidden sm:mt-12 lg:mt-14"
        >
          <div className="relative">
            <motion.div
              className="flex gap-4 sm:gap-5 lg:gap-6"
              animate={sectionInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
              transition={
                sectionInView
                  ? { duration: 35, ease: "linear", repeat: Infinity }
                  : { duration: 0 }
              }
            >
              {[...COMMUNITY_ITEMS, ...COMMUNITY_ITEMS].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={`${item.labelKey}-${index}`}
                    className="relative flex h-[220px] min-w-[170px] max-w-[190px] flex-col overflow-hidden rounded-2xl bg-slate-950/90 text-slate-50 shadow-[0_14px_40px_rgba(15,23,42,0.6)] sm:h-[260px] sm:min-w-[200px] sm:max-w-[220px]"
                    aria-label={t(item.labelKey)}
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={item.image}
                        alt={t(item.labelKey)}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: item.imageFocus }}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"
                        aria-hidden
                      />
                      <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-slate-900 shadow-sm">
                          <Icon className="h-3 w-3" aria-hidden />
                          {t(item.labelKey)}
                        </span>
                        <p className="text-[11px] font-medium leading-snug text-slate-100">
                          {t(item.descKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-100 dark:from-elevn-dark via-slate-100/40 dark:via-elevn-dark/40 to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-100 dark:from-elevn-dark via-slate-100/40 dark:via-elevn-dark/40 to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
