"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
//import { useScroll, useTransform } from "framer-motion";
//import { SectionTransition } from "@/components/ui/SectionTransition";
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
    image: "/assets/images/geek_male.jpg",
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

function BeatStripWrapper({
  beat,
  index,
}: {
  beat: (typeof CREATOR_BEATS)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.06 });
  return (
    <article ref={ref}>
      <BeatStrip beat={beat} index={index} inView={inView} />
    </article>
  );
}

const SLIDE_OFFSET = 72;

function BeatStrip({
  beat,
  index,
  inView,
}: {
  beat: (typeof CREATOR_BEATS)[number];
  index: number;
  inView: boolean;
}) {
  const Icon = beat.icon;
  const isImageRight = index % 2 === 0;
  const contentFromX = isImageRight ? -SLIDE_OFFSET : SLIDE_OFFSET;
  const imageFromX = isImageRight ? SLIDE_OFFSET : -SLIDE_OFFSET;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 32 }}
      transition={{ duration: 0.32, ease }}
      className={`relative flex flex-col overflow-hidden border-t border-slate-200 dark:border-white/5 ${
        index % 2 === 0 ? "bg-slate-50 dark:bg-elevn-surface/40" : "bg-white dark:bg-elevn-dark"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${beat.gradient} opacity-[0.04]`}
        aria-hidden
      />
      <div
        className={`relative mx-auto flex w-full max-w-7xl flex-col gap-0 lg:min-h-[420px] lg:flex-row lg:items-center lg:gap-0 ${
          isImageRight ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
      >
        {/* Content half */}
        <motion.div
          initial={{ opacity: 0, x: contentFromX }}
          animate={{
            opacity: inView ? 1 : 0,
            x: inView ? 0 : contentFromX,
          }}
          transition={{ duration: 0.4, delay: 0.03, ease }}
          className="flex flex-1 flex-col justify-center px-6 py-14 lg:min-w-0 lg:py-20 lg:px-14 xl:px-20"
        >
          <span
            className={`inline-block text-5xl font-bold tabular-nums sm:text-6xl lg:text-7xl bg-gradient-to-r ${beat.gradient} bg-clip-text text-transparent`}
          >
            {beat.number}
          </span>
          <div className="mt-5 flex items-center gap-4">
            <span
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${beat.gradient} text-white shadow-elevn-neon dark:text-elevn-ice`}
            >
              <Icon className="text-2xl" aria-hidden />
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-elevn-ice sm:text-3xl lg:text-4xl">
              {beat.title}
            </h3>
          </div>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-slate-950 sm:text-xl dark:text-elevn-ice/95">
            {beat.line}
          </p>
          <p className="mt-4 text-base font-medium leading-relaxed text-slate-950 sm:text-lg dark:text-elevn-ice/90">
            {beat.detail}
          </p>
          <p className="mt-4 text-base font-semibold leading-relaxed text-cyan-800 sm:text-lg dark:text-elevn-cyan/90">
            {beat.extra}
          </p>
        </motion.div>

        {/* Image half */}
        <motion.div
          initial={{ opacity: 0, x: imageFromX }}
          animate={{
            opacity: inView ? 1 : 0,
            x: inView ? 0 : imageFromX,
          }}
          transition={{ duration: 0.4, delay: 0.06, ease }}
          className="relative w-full flex-shrink-0 lg:w-[48%]"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-[420px] lg:w-full">
            <img
              src={beat.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent lg:from-slate-900/20 dark:from-elevn-dark/50 dark:via-transparent dark:to-transparent dark:lg:from-elevn-dark/40"
              aria-hidden
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ForCreatorsSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  //const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });

  //const { scrollYProgress } = useScroll({
  //  target: sectionRef,
  //  offset: ["start end", "end start"],
  //});
  //const headerY = useTransform(scrollYProgress, [0, 0.25], [32, 0]);
  //const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      id="creators"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-elevn-dark"
      aria-labelledby="for-creators-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      {/*<SectionTransition inView={sectionInView} className="mb-0" />
      
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative border-b border-slate-200 bg-white/95 px-6 py-20 backdrop-blur-sm dark:border-white/10 dark:bg-elevn-surface/60 md:px-10 md:py-28 lg:px-12 xl:px-16 2xl:px-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-elevn-mesh-light opacity-20 dark:bg-elevn-mesh dark:opacity-40" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center lg:max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-elevn-cyan">
            For Creators & UGC
          </p>
          <h2
            id="for-creators-heading"
            className="mt-4 bg-gradient-to-r from-slate-950 via-elevn-cyan to-slate-950 bg-clip-text text-4xl font-bold leading-[1.1] tracking-tight text-transparent dark:from-elevn-ice dark:via-elevn-cyan dark:to-elevn-ice md:text-5xl lg:text-6xl"
          >
            Your creator career, taken to the next level
          </h2>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-slate-950 md:text-xl dark:text-elevn-ice/90">
            You deserve a platform that turns your effort into a sustainable career. Built for you—ready to go pro.
          </p>
        </div>
      </motion.div>
      */}
      <div className="relative">
        {CREATOR_BEATS.map((beat, index) => (
          <BeatStripWrapper key={beat.id} beat={beat} index={index} />
        ))}
      </div>

      <div className="relative border-t border-slate-200 bg-white/80 px-6 py-12 text-center dark:border-white/10 dark:bg-elevn-surface/60 md:py-16">
        <p className="mx-auto max-w-xl text-base font-semibold text-slate-700 dark:text-elevn-ice/90">
          Ready to level up? Join the platform built for professional creators.
        </p>
        <Button
          type="button"
          size="lg"
          onClick={onOpenJoinForm ?? (() => window.location.assign("#join"))}
          className="mt-6 bg-elevn-gradient px-8 py-6 text-base font-semibold text-white shadow-lg transition hover:opacity-95 dark:text-elevn-ice"
        >
          <HiBolt className="mr-2 text-xl" aria-hidden />
          Join Our Creator Community
        </Button>
      </div>
    </section>
  );
}
