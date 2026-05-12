"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  HiBriefcase,
  HiAcademicCap,
  HiChatBubbleLeftRight,
  HiHeart,
  HiBolt,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const BEAT_ICONS = [HiBriefcase, HiAcademicCap, HiChatBubbleLeftRight, HiHeart] as const;
const BEAT_STYLES = [
  { id: "opportunities", number: "01", gradient: "from-elevn-primary to-elevn-cyan", image: "/assets/images/influencer_famel.jpg" },
  { id: "development", number: "02", gradient: "from-elevn-cyan to-elevn-violet", image: "/assets/images/edition.jpg" },
  { id: "support", number: "03", gradient: "from-elevn-violet to-elevn-magenta", image: "/assets/images/bloguer.jpg" },
  { id: "community", number: "04", gradient: "from-elevn-magenta to-elevn-primary", image: "/assets/images/lifestyle.jpg" },
] as const;

const BEAT_KEYS = [
  { titleKey: "forCreators.beat1Title", lineKey: "forCreators.beat1Line", detailKey: "forCreators.beat1Detail", extraKey: "forCreators.beat1Extra" },
  { titleKey: "forCreators.beat2Title", lineKey: "forCreators.beat2Line", detailKey: "forCreators.beat2Detail", extraKey: "forCreators.beat2Extra" },
  { titleKey: "forCreators.beat3Title", lineKey: "forCreators.beat3Line", detailKey: "forCreators.beat3Detail", extraKey: "forCreators.beat3Extra" },
  { titleKey: "forCreators.beat4Title", lineKey: "forCreators.beat4Line", detailKey: "forCreators.beat4Detail", extraKey: "forCreators.beat4Extra" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ForCreatorsSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const containerVariants = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease },
    },
  } as const;

  return (
    <section
      id="creators"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-100 dark:bg-elevn-dark"
      aria-labelledby="for-creators-heading"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-18 md:px-10 md:py-22 lg:py-24 xl:max-w-[1600px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-elevn-cyan sm:text-sm">
            {t("forCreators.tagline")}
          </p>
          <h2
            id="for-creators-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.1] dark:text-elevn-ice"
          >
            <span className="ml-2 bg-elevn-gradient bg-clip-text text-transparent">
              {t("forCreators.heading")}
            </span>
          </h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700 sm:text-base dark:text-elevn-ice/85">
            {t("forCreators.description")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {BEAT_STYLES.map((beat, index) => {
            const Icon = BEAT_ICONS[index];
            const keys = BEAT_KEYS[index];
            const objectPosition =
              index === 0 ? "center 28%" : index === 1 ? "center 18%" : "center";
            return (
              <motion.article
                key={beat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, ease }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 shadow-[0_14px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(15,23,42,0.24)] dark:border-white/10 dark:bg-elevn-surface/90 dark:shadow-elevn-neon/20 dark:hover:shadow-elevn-neon/35"
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${beat.gradient} opacity-[0.03] group-hover:opacity-[0.08]`}
                  aria-hidden
                />
                <div className="relative h-32 w-full overflow-hidden sm:h-36 md:h-32 lg:h-40">
                  <img
                    src={beat.image}
                    alt={t(keys.titleKey)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    style={{ objectPosition }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent dark:from-elevn-dark/80"
                    aria-hidden
                  />
                  <div className="absolute left-2.5 top-2.5 flex items-center gap-2 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm ring-1 ring-white/15 dark:bg-elevn-dark/85">
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br ${beat.gradient} text-[9px] font-bold text-white`}
                    >
                      {beat.number}
                    </span>
                    <span className="truncate">{t(keys.titleKey)}</span>
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col gap-3 p-5">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${beat.gradient} text-white shadow-elevn-neon ring-1 ring-white/40 dark:text-elevn-ice dark:ring-elevn-dark/60`}
                  >
                    <Icon className="text-sm" aria-hidden />
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-slate-950 sm:text-lg dark:text-elevn-ice">
                    {t(keys.titleKey)}
                  </h3>
                  <p className="text-xs font-medium leading-relaxed text-slate-700 sm:text-sm dark:text-elevn-ice/85">
                    {t(keys.lineKey)}
                  </p>
                  <p className="text-[11px] font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/75">
                    {t(keys.detailKey)}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold leading-relaxed text-elevn-cyan dark:text-elevn-cyan/90">
                    {t(keys.extraKey)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:mt-14">
          <p className="mx-auto max-w-xl text-base font-semibold text-slate-700 dark:text-elevn-ice/90">
            {t("forCreators.ctaText")}
          </p>
          <Button
            type="button"
            size="lg"
            onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
            className="bg-elevn-gradient px-8 py-6 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice"
          >
            <HiBolt className="mr-2 text-xl" aria-hidden />
            {t("forCreators.ctaButton")}
          </Button>
        </div>
      </div>
    </section>
  );
}
