"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const OPP_STYLES = [
  { id: "meta", titleKey: "opportunities.metaTitle", descKey: "opportunities.metaDesc", image: "/assets/images/For-professionals,-freelancers,-and-general-public.png", gradient: "from-elevn-primary to-elevn-cyan" },
  { id: "tubi", titleKey: "opportunities.tubiTitle", descKey: "opportunities.tubiDesc", image: "/assets/images/For-growing-creators.png", gradient: "from-elevn-violet to-elevn-magenta" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ActiveOpportunitiesSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blockOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const blockY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);
  const { t } = useTranslation();
  const handleJoin = onOpenJoinForm ?? (() => window.location.assign("#join"));

  return (
    <section
      id="opportunities"
      className="relative overflow-hidden bg-white pb-24 pt-2 font-poppins text-[#1a1a2e] scroll-mt-24"
      aria-labelledby="opportunities-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-7 py-16 sm:py-20 md:px-8 md:py-24 lg:max-w-[1600px] lg:px-8 lg:py-28 xl:max-w-[1800px] xl:px-10 2xl:max-w-[1920px] 2xl:px-12">
        <motion.div
          style={{ opacity: blockOpacity, y: blockY }}
          className="text-center"
        >
          <h2
            id="opportunities-heading"
            className="text-[2.1rem] font-bold tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl dark:text-elevn-ice"
          >
            <span className="inline-flex items-center justify-center gap-3 md:gap-4">
              <img
                src="/assets/images/icono%20eleven%20.png"
                alt=""
                aria-hidden
                className="h-[1.25em] w-auto object-contain"
              />
              {t("opportunities.heading")}
            </span>
          </h2>
        </motion.div>

        <div className="relative mt-10 sm:mt-14 lg:mt-20">
          <div className="mx-auto grid w-full max-w-6xl gap-5 sm:gap-6 sm:grid-cols-2 lg:gap-10">
            {OPP_STYLES.map((opp) => (
              <article key={opp.id} className="w-full">
                <Card className="group h-full overflow-hidden border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg hover:shadow-slate-200/50 dark:border-white/10 dark:bg-elevn-surface/50 dark:hover:shadow-elevn-primary/10">
                  <div className="flex h-full flex-col">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-elevn-surface">
                      <img
                        src={opp.image}
                        alt=""
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.03]"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100 dark:from-elevn-dark/80`}
                        aria-hidden
                      />
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${opp.gradient} opacity-80`}
                        aria-hidden
                      />
                    </div>
                    <CardContent className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                      <h3 className="text-base font-bold tracking-tight text-slate-950 md:text-lg dark:text-elevn-ice">
                        {t(opp.titleKey)}
                      </h3>
                      <p className="mt-2 flex-1 text-[11px] sm:text-xs font-medium leading-relaxed text-slate-950 md:text-sm dark:text-elevn-ice/90">
                        {t(opp.descKey)}
                      </p>
                      <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-slate-950 transition-colors group-hover:bg-slate-200 group-hover:text-slate-950 dark:border-white/20 dark:bg-white/5 dark:text-elevn-ice dark:group-hover:bg-white/10 dark:group-hover:text-elevn-ice">
                        {t("opportunities.viewOpportunity")}
                        <HiArrowTopRightOnSquare className="text-sm" aria-hidden />
                      </span>
                    </CardContent>
                  </div>
                </Card>
              </article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: sectionInView ? 1 : 0 }}
          transition={{ duration: 0.32, delay: 0.12, ease }}
          className="mt-10 flex flex-col items-center gap-5 sm:gap-6 text-center"
        >
          <p className="text-sm font-semibold text-slate-950 dark:text-elevn-ice/80">
            {t("opportunities.moreOpportunities")}
          </p>
          <Button
            type="button"
            size="lg"
            onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
            className="w-full max-w-sm sm:w-auto sm:max-w-none bg-gradient-to-br from-[#397aa7] to-[#84a3c4] px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice"
          >
            <div
              className="relative flex h-[140px] items-center justify-center overflow-hidden"
              style={{ background: opp.thumb }}
            >
              <span
                aria-hidden
                className="text-[40px] text-white/60"
                style={{ filter: "brightness(0) invert(1)" }}
              >
                {opp.glyph}
              </span>
              <span
                className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] ${STATUS_STYLES[opp.status]}`}
              >
                {t(`opportunities.status.${opp.status}`)}
              </span>
            </div>
            <div className="flex flex-1 flex-col px-5 py-6">
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                {t(opp.platformKey)}
              </p>
              <h3 className="mb-1.5 text-base font-extrabold text-[#1a1a2e]">
                {t(opp.titleKey)}
              </h3>
              <p className="mb-4 flex-1 text-[13px] leading-[1.5] text-[#6b7280]">
                {t(opp.descKey)}
              </p>
              <button
                type="button"
                onClick={handleJoin}
                className="inline-flex items-center gap-1.5 self-start text-[13px] font-bold text-[#493fe2] transition-[gap] duration-200 hover:gap-2.5"
              >
                {t("opportunities.applyNow")} <span aria-hidden>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
