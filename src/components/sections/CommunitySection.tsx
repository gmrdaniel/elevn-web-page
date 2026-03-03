"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import {
  HiArrowRight,
  HiSparkles,
  HiWrenchScrewdriver,
  HiCircleStack,
  HiFilm,
  HiBolt,
} from "react-icons/hi2";

const DISCORD_ONBOARDING_URL = "https://discord.gg/bTUEWVjz";

const COMMUNITY_LINKS = [
  {
    label: "Beauty creator?",
    description: "Join beauty creators shaping the next wave with ELEVN’s community.",
    href: "#community-beauty",
    image: "/assets/images/makeup.jpg",
    imageFocus: "50% 40%",
    icon: HiSparkles,
    gradient: "from-elevn-magenta to-elevn-primary",
    glow: "group-hover:shadow-[0_0_40px_rgba(217,70,239,0.25)] dark:group-hover:shadow-elevn-neon/20",
  },
  {
    label: "DIY creator?",
    description: "Share builds and tutorials with DIY-first creators and brands.",
    href: "#community-diy",
    image: "/assets/images/DIY.jpg",
    imageFocus: "50% 45%",
    icon: HiWrenchScrewdriver,
    gradient: "from-elevn-primary to-elevn-cyan",
    glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] dark:group-hover:shadow-elevn-neon/20",
  },
  {
    label: "Food creator?",
    description: "Serve recipes and tastings with food lovers and partner brands.",
    href: "#community-food",
    image: "/assets/images/cooking.jpg",
    imageFocus: "50% 35%",
    icon: HiCircleStack,
    gradient: "from-elevn-cyan to-elevn-violet",
    glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] dark:group-hover:shadow-elevn-neon/20",
  },
  {
    label: "Entertainment creator?",
    description: "Stream, play, and perform with creators who live your world.",
    href: "#community-entertainment",
    image: "/assets/images/streaming.jpg",
    imageFocus: "50% 50%",
    icon: HiFilm,
    gradient: "from-elevn-violet to-elevn-magenta",
    glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] dark:group-hover:shadow-elevn-neon/20",
  },
  {
    label: "Sports creator?",
    description: "Train, compete, and create content with brands that move with you.",
    href: "#community-sports",
    image: "/assets/images/sports.jpg",
    imageFocus: "50% 70%",
    icon: HiBolt,
    gradient: "from-elevn-cyan to-elevn-primary",
    glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] dark:group-hover:shadow-elevn-neon/20",
  },
  {
    label: "Fashion creator?",
    description: "Show looks, trends, and shoots with fashion-first brands and audiences.",
    href: "#community-fashion",
    image: "/assets/images/infuencer_male.jpg",
    imageFocus: "50% 35%",
    icon: HiSparkles,
    gradient: "from-elevn-magenta to-elevn-cyan",
    glow: "group-hover:shadow-[0_0_40px_rgba(217,70,239,0.25)] dark:group-hover:shadow-elevn-neon/20",
  },
  {
    label: "UGC creator?",
    description: "Create UGC that converts for brands: short-form, agile, and platform-native.",
    href: "#community-ugc",
    image: "/assets/images/dancer.jpg",
    imageFocus: "50% 45%",
    icon: HiFilm,
    gradient: "from-elevn-primary to-elevn-violet",
    glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.25)] dark:group-hover:shadow-elevn-neon/20",
  },
  {
    label: "Travel creator?",
    description: "Share trips, stays, and experiences with travel lovers and tourism brands.",
    href: "#community-travel",
    image: "/assets/images/travel.jpg",
    imageFocus: "50% 50%",
    icon: HiCircleStack,
    gradient: "from-elevn-cyan to-elevn-primary",
    glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.25)] dark:group-hover:shadow-elevn-neon/20",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: false, amount: 0.4 });

  return (
    <section
      id="community"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-100 dark:bg-elevn-dark"
      aria-labelledby="community-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-72 w-72 rounded-full bg-gradient-to-br from-elevn-cyan/20 via-elevn-violet/10 to-transparent blur-3xl dark:from-elevn-cyan/25 dark:via-elevn-violet/15"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-72 w-72 rounded-full bg-gradient-to-bl from-elevn-magenta/20 via-elevn-primary/10 to-transparent blur-3xl dark:from-elevn-magenta/25 dark:via-elevn-primary/15"
        aria-hidden
      />
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 max-[400px]:px-3 max-[400px]:py-12 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.32, ease }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-elevn-cyan sm:text-sm">
            Community
          </p>
          <h2
            id="community-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.1] dark:text-elevn-ice"
          >
            Find your people · Encuentra tu comunidad
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/85 md:text-lg">
            Your niche has a room on Discord. Jump in, meet fellow creators, and be the first to hear about new opportunities, collabs, and everything happening inside ELEVN.{" "}
            Tu nicho tiene su propio espacio en Discord: conéctate, conoce a otros creadores y entérate primero de lo que pasa en ELEVN.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-slate-500 dark:text-elevn-ice/75 md:text-base">
            Each community has its own channel: exclusive briefs, peer support, and early announcements. Pick yours below and join in one click.{" "}
            Cada comunidad tiene su canal: oportunidades exclusivas, soporte entre pares y anuncios tempranos.
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
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-elevn-cyan via-elevn-violet to-elevn-magenta px-7 py-2.5 text-sm font-semibold text-elevn-ice shadow-lg shadow-elevn-primary/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-elevn-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-elevn-dark"
          >
            Join ELEVN on Discord · Únete a ELEVN en Discord
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
              {[...COMMUNITY_LINKS, ...COMMUNITY_LINKS].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={`${item.label}-${index}`}
                    className="relative flex h-[220px] min-w-[170px] max-w-[190px] flex-col overflow-hidden rounded-2xl bg-slate-950/90 text-slate-50 shadow-[0_14px_40px_rgba(15,23,42,0.6)] sm:h-[260px] sm:min-w-[200px] sm:max-w-[220px]"
                    aria-label={item.label}
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={item.image}
                        alt={item.label}
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
                          {item.label}
                        </span>
                        <p className="text-[11px] font-medium leading-snug text-slate-100">
                          {item.description}
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 8 }}
          transition={{ duration: 0.3, delay: 0.4, ease }}
          className="mt-8 text-center text-[11px] font-medium text-slate-500 dark:text-elevn-ice/70 sm:text-xs"
        >
          <p>
            Complete your onboarding and choose your community space inside ELEVN. / Completa tu onboarding y elige tu
            espacio dentro de la comunidad ELEVN.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
