"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
//import { useScroll, useTransform } from "framer-motion";
import {
  HiBriefcase,
  HiAcademicCap,
  HiChatBubbleLeftRight,
  HiHeart,
  HiBolt,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";

const CREATOR_BEATS = [
  {
    id: "opportunities",
    number: "01",
    title: "Verified opportunities",
    line: "Direct access to brand campaigns. Clear briefs. Transparent budgets.",
    detail: "No more chasing DMs or guessing if an opportunity is real. Every campaign is verified and fairly compensated.",
    extra: "Your time goes into creating, not into filtering sketchy offers.",
    icon: HiBriefcase,
    gradient: "from-elevn-primary to-elevn-cyan",
    image: "/assets/images/influencer_famel.jpg",
  },
  {
    id: "development",
    number: "02",
    title: "Professional development",
    line: "Courses and masterclasses that work today.",
    detail: "Monetization, contract negotiation, personal branding—learning designed for today's digital ecosystem, not outdated theory.",
    extra: "Stay ahead of algorithm changes and platform shifts with training that actually applies.",
    icon: HiAcademicCap,
    gradient: "from-elevn-cyan to-elevn-violet",
    image: "/assets/images/edition.jpg",
  },
  {
    id: "support",
    number: "03",
    title: "Strategic support",
    line: "Mentors who get your niche. Guidance that's not generic—and not automated.",
    detail: "Connect with professionals who understand your goals and the unique challenges of your career stage.",
    extra: "From contract negotiations to reputation moments, you have someone in your corner.",
    icon: HiChatBubbleLeftRight,
    gradient: "from-elevn-violet to-elevn-magenta",
    image: "/assets/images/bloguer.jpg",
  },
  {
    id: "community",
    number: "04",
    title: "A community that gets it",
    line: "Share, celebrate, and grow.",
    detail: "A space to exchange learnings, celebrate wins, and build lasting relationships with people on the same path. You're not alone.",
    extra: "Collaborate instead of compete—with creators who take the craft as seriously as you do.",
    icon: HiHeart,
    gradient: "from-elevn-magenta to-elevn-primary",
    image: "/assets/images/lifestyle.jpg",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ForCreatorsSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
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
          A clear path to a
          </p>
          <h2
            id="for-creators-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl md:text-4xl lg:text-[2.5rem] lg:leading-[1.1] dark:text-elevn-ice"
          >
            <span className="ml-2 bg-elevn-gradient bg-clip-text text-transparent">
              real creator career.
            </span>
          </h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700 sm:text-base dark:text-elevn-ice/85">
            No endless scrolling. No noise. Just the core pieces you need to grow: work, skills, support, and a
            community that takes this as seriously as you do.
          </p>
        </motion.div>

        {/* Benefit cards: 4x1 → 3x1 → 2x2 → 1x1 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:gap-8 xl:grid-cols-3 2xl:grid-cols-4"
        >
          {CREATOR_BEATS.map((beat, index) => {
            const Icon = beat.icon;
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
                {/* Image strip (decorative, slightly larger) */}
                <div className="relative h-32 w-full overflow-hidden sm:h-36 md:h-32 lg:h-40">
                  <img
                    src={beat.image}
                    alt={beat.title}
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
                    <span className="truncate">{beat.title}</span>
                  </div>
                </div>

                {/* Text content */}
                <div className="relative flex flex-1 flex-col gap-3 p-5">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${beat.gradient} text-white shadow-elevn-neon ring-1 ring-white/40 dark:text-elevn-ice dark:ring-elevn-dark/60`}
                  >
                    <Icon className="text-sm" aria-hidden />
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-slate-950 sm:text-lg dark:text-elevn-ice">
                    {beat.title}
                  </h3>
                  <p className="text-xs font-medium leading-relaxed text-slate-700 sm:text-sm dark:text-elevn-ice/85">
                    {beat.line}
                  </p>
                  <p className="text-[11px] font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/75">
                    {beat.detail}
                  </p>
                  {beat.extra && (
                    <p className="mt-1 text-[11px] font-semibold leading-relaxed text-elevn-cyan dark:text-elevn-cyan/90">
                      {beat.extra}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:mt-14">
          <p className="mx-auto max-w-xl text-base font-semibold text-slate-700 dark:text-elevn-ice/90">
            Ready to level up? Join the platform built for professional creators.
          </p>
          <Button
            type="button"
            size="lg"
            onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
            className="bg-elevn-gradient px-8 py-6 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice"
          >
            <HiBolt className="mr-2 text-xl" aria-hidden />
            Join Our Creator Community
          </Button>
        </div>
      </div>
    </section>
  );
}
