"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiArrowTopRightOnSquare, HiBolt } from "react-icons/hi2";

const OPPORTUNITIES = [
  {
    id: "meta",
    title: "META Breakthrough Bonus Program",
    description:
      "Identify and support emerging creators with significant growth potential. Direct financial bonuses, META training resources, and increased visibility.",
    image: "/assets/images/META.png",
    url: "https://laneta-portal.netlify.app/opportunities/meta?open=connect_new_opportunities",
    gradient: "from-elevn-primary to-elevn-cyan",
  },
  {
    id: "gyre",
    title: "Gyre 24/7: Pre-Recorded Streaming for YouTube",
    description:
      "Partnership model for pre-recorded streams on YouTube—streaming technology, technical support, and performance-based monetization.",
    image: "/assets/images/GYRE.png",
    url: "https://laneta-portal.netlify.app/opportunities/gyre",
    gradient: "from-elevn-cyan to-elevn-violet",
  },
  {
    id: "tubi",
    title: "Tubi: Mystery and Thriller Content",
    description:
      "Exclusive opportunity for creators specializing in mystery and thriller. Develop content for Tubi's audience with licensing and recognition potential.",
    image: "/assets/images/TUBI.png",
    url: "https://laneta-portal.netlify.app/opportunities/tubi",
    gradient: "from-elevn-violet to-elevn-magenta",
  },
  {
    id: "air",
    title: "Air Media Tech: Your Content, Every Language",
    description:
      "Expand reach through content localization—dubbing, subtitling, and distribution in international markets while retaining full ownership.",
    image: "/assets/images/AIR.png",
    url: "https://laneta-portal.netlify.app/opportunities/air-media-msn",
    gradient: "from-elevn-magenta to-elevn-primary",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ActiveOpportunitiesSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });

  return (
    <section
      id="opportunities"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-elevn-dark"
      aria-labelledby="opportunities-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionTransition inView={sectionInView} className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 24,
          }}
          transition={{ duration: 0.32, ease }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-elevn-cyan">
          Discover what Elevn has for you—new opportunities every day
          </p>
          <h2
            id="opportunities-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl dark:text-elevn-ice"
          >
            Active opportunities
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold leading-relaxed text-slate-950 md:text-xl dark:text-elevn-ice/90">
            These opportunities are already live and waiting for creators like you to make the most of them. Real briefs, real pay, ready to run. Register now and get in.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-20 lg:gap-10 xl:gap-12">
          {OPPORTUNITIES.map((opp, i) => (
            <motion.article
              key={opp.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: sectionInView ? 1 : 0,
                y: sectionInView ? 0 : 24,
              }}
              transition={{ duration: 0.32, delay: 0.04 + i * 0.04, ease }}
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
                  <CardContent className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="text-xl font-bold tracking-tight text-slate-950 md:text-2xl dark:text-elevn-ice">
                      {opp.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm font-medium leading-relaxed text-slate-950 md:text-base dark:text-elevn-ice/90">
                      {opp.description}
                    </p>
                    <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors group-hover:bg-slate-200 group-hover:text-slate-950 dark:border-white/20 dark:bg-white/5 dark:text-elevn-ice dark:group-hover:bg-white/10 dark:group-hover:text-elevn-ice">
                      View opportunity
                      <HiArrowTopRightOnSquare className="text-base" aria-hidden />
                    </span>
                  </CardContent>
                </a>
              </Card>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: sectionInView ? 1 : 0 }}
          transition={{ duration: 0.32, delay: 0.12, ease }}
          className="mt-10 flex flex-col items-center gap-6 text-center"
        >
          <p className="text-sm font-semibold text-slate-950 dark:text-elevn-ice/80">
            More opportunities added regularly. Apply through Elevn and get access.
          </p>
          <Button
            type="button"
            size="lg"
            onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
            className="bg-elevn-gradient px-8 py-6 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice"
          >
            <HiBolt className="mr-2 text-xl" aria-hidden />
            Apply for the Creator Ecosystem
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
