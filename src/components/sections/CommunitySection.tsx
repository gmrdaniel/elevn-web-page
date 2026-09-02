"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { staggerContainer, fadeUp } from "@/lib/motion";

const NICHE_ITEMS = [
  { labelKey: "community.niche1", descKey: "community.niche1Desc", image: "/assets/images/community/fashion.webp" },
  { labelKey: "community.niche2", descKey: "community.niche2Desc", image: "/assets/images/community/sports.webp" },
  { labelKey: "community.niche3", descKey: "community.niche3Desc", image: "/assets/images/community/travel.webp" },
  { labelKey: "community.niche4", descKey: "community.niche4Desc", image: "/assets/images/community/cooking.webp" },
  { labelKey: "community.niche5", descKey: "community.niche5Desc", image: "/assets/images/community/streaming.webp" },
  { labelKey: "community.niche6", descKey: "community.niche6Desc", image: "/assets/images/community/dancer.webp" },
  { labelKey: "community.niche7", descKey: "community.niche7Desc", image: "/assets/images/community/bloguer.webp" },
  { labelKey: "community.niche8", descKey: "community.niche8Desc", image: "/assets/images/community/influencer_famel.webp" },
] as const;

export function CommunitySection({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="community"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28 scroll-mt-24"
      aria-labelledby="community-heading"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-elevn-primary dark:text-elevn-cyan sm:text-sm"
          >
            {t("community.label")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="community-heading"
            className="mt-4 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-slate-950 dark:text-elevn-ice"
          >
            {t("community.titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-elevn-violet via-elevn-primary to-elevn-magenta bg-clip-text text-transparent">
              {t("community.titleLine2")}
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-elevn-ice/80 sm:text-base"
          >
            {t("community.description")}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-2 max-w-xl text-xs text-slate-500 dark:text-elevn-ice/60 sm:text-sm"
          >
            {t("community.subDescription")}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <button
              type="button"
              onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-elevn-primary to-elevn-cyan px-7 py-2.5 text-sm font-semibold text-white shadow-elevn-glow transition-all duration-200 hover:scale-[1.02]"
            >
              {t("community.ctaButton")}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: sectionInView ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative mt-14 overflow-hidden sm:mt-16"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <motion.div
            className="flex gap-4 sm:gap-5"
            animate={sectionInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
            transition={
              sectionInView
                ? { duration: 32, ease: "linear", repeat: Infinity }
                : { duration: 0 }
            }
          >
            {[...NICHE_ITEMS, ...NICHE_ITEMS].map((item, index) => (
              <div
                key={`${item.labelKey}-${index}`}
                className="relative flex h-[220px] min-w-[170px] max-w-[190px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 shadow-elevn-card sm:h-[250px] sm:min-w-[200px] sm:max-w-[220px]"
              >
                <img
                  src={item.image}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-elevn-dark/90 via-elevn-dark/30 to-transparent" aria-hidden />
                <div className="relative mt-auto flex flex-col gap-1 p-3.5">
                  <span className="inline-flex w-fit items-center rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-900 shadow-sm">
                    {t(item.labelKey)}
                  </span>
                  <p className="text-[11px] font-medium leading-snug text-white/90">
                    {t(item.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
