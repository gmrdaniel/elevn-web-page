"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const OPP_STYLES = [
  { id: "meta", titleKey: "opportunities.metaTitle", descKey: "opportunities.metaDesc", image: "/assets/images/META.png", url: "https://laneta-portal.netlify.app/opportunities/meta-fast-track", gradient: "from-elevn-primary to-elevn-cyan" },
  { id: "gyre", titleKey: "opportunities.gyreTitle", descKey: "opportunities.gyreDesc", image: "/assets/images/GYRE.png", url: "https://laneta-portal.netlify.app/opportunities/gyre", gradient: "from-elevn-cyan to-elevn-violet" },
  { id: "tubi", titleKey: "opportunities.tubiTitle", descKey: "opportunities.tubiDesc", image: "/assets/images/TUBI.png", url: "https://laneta-portal.netlify.app/opportunities/tubi", gradient: "from-elevn-violet to-elevn-magenta" },
  { id: "air", titleKey: "opportunities.airTitle", descKey: "opportunities.airDesc", image: "/assets/images/AIR.png", url: "https://laneta-portal.netlify.app/opportunities/air-media-msn", gradient: "from-elevn-magenta to-elevn-primary" },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ActiveOpportunitiesSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const [marqueePaused, setMarqueePaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blockOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const blockY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);
  const { t } = useTranslation();

  return (
    <section
      id="opportunities"
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-labelledby="opportunities-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-8 md:py-24 lg:max-w-[1600px] lg:px-8 lg:py-28 xl:max-w-[1800px] xl:px-10 2xl:max-w-[1920px] 2xl:px-12">
        <motion.div
          style={{ opacity: blockOpacity, y: blockY }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-elevn-cyan">
            {t("opportunities.topLabel")}
          </p>
          <h2
            id="opportunities-heading"
            className="mt-4 text-5xl font-bold tracking-tight text-slate-950 md:text-6xl lg:text-7xl dark:text-elevn-ice"
          >
            {t("opportunities.heading")}
          </h2>
          <p className="mx-auto mt-6 max-w-5xl text-balance text-lg font-semibold leading-relaxed text-slate-950 md:text-xl dark:text-elevn-ice/90">
            {t("opportunities.description")}
          </p>
        </motion.div>

        <div
          className="relative mt-14 overflow-hidden lg:mt-20"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <div
            className="flex w-max gap-4 will-change-transform lg:gap-6"
            style={{
              animation: "elevn-marquee-right 60s linear infinite",
              animationPlayState: marqueePaused ? "paused" : "running",
            }}
          >
            {[...OPP_STYLES, ...OPP_STYLES].map((opp, i) => (
              <article
                key={`${opp.id}-${i}`}
                className="w-72 shrink-0 sm:w-80 lg:w-96"
                onMouseEnter={() => setMarqueePaused(true)}
                onMouseLeave={() => setMarqueePaused(false)}
              >
                <Card className="group h-full overflow-hidden border-slate-200 bg-white shadow-md transition-shadow hover:shadow-lg hover:shadow-slate-200/50 dark:border-white/10 dark:bg-elevn-surface/50 dark:hover:shadow-elevn-primary/10">
                  <a
                    href={opp.url}
                    target={opp.url.startsWith("http") ? "_blank" : undefined}
                    rel={opp.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-full flex-col"
                  >
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
                    <CardContent className="flex flex-1 flex-col p-4 md:p-5">
                      <h3 className="text-base font-bold tracking-tight text-slate-950 md:text-lg dark:text-elevn-ice">
                        {t(opp.titleKey)}
                      </h3>
                      <p className="mt-2 flex-1 text-xs font-medium leading-relaxed text-slate-950 md:text-sm dark:text-elevn-ice/90">
                        {t(opp.descKey)}
                      </p>
                      <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-950 transition-colors group-hover:bg-slate-200 group-hover:text-slate-950 dark:border-white/20 dark:bg-white/5 dark:text-elevn-ice dark:group-hover:bg-white/10 dark:group-hover:text-elevn-ice">
                        {t("opportunities.viewOpportunity")}
                        <HiArrowTopRightOnSquare className="text-sm" aria-hidden />
                      </span>
                    </CardContent>
                  </a>
                </Card>
              </article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: sectionInView ? 1 : 0 }}
          transition={{ duration: 0.32, delay: 0.12, ease }}
          className="mt-10 flex flex-col items-center gap-6 text-center"
        >
          <p className="text-sm font-semibold text-slate-950 dark:text-elevn-ice/80">
            {t("opportunities.moreOpportunities")}
          </p>
          <Button
            type="button"
            size="lg"
            onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
            className="bg-gradient-to-br from-[#1d96c3] to-[#393da3] px-8 py-6 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice"
          >
            {t("opportunities.ctaButton")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
