"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { Button } from "@/components/ui/button";
import { HiBolt, HiChevronDown } from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;
const GRADIENT_TITLE =
  "linear-gradient(135deg, #22d3ee 0%, #06b6d4 30%, #8b5cf6 65%, #d946ef 100%)";

const FAQ_ITEMS = [
  {
    question: "What exactly is ELEVN?",
    answer:
      "ELEVN will be the ultimate marketplace connecting creators with top global brands. Coming soon, it will be your main hub to get direct access to paid campaigns, AI optimization tools, and exclusive monetization programs to scale your business.",
  },
  {
    question: "How many followers do I need to join ELEVN?",
    answer:
      "You need at least 1,000 followers on one of your accounts (Instagram, TikTok, YouTube, etc.). Beyond that, we care about your talent and the quality of your content—any creator who meets that baseline can join, scale, and unlock real opportunities.",
  },
  {
    question: "Is it free to join ELEVN?",
    answer: "Yes. Creating your profile and accessing opportunities is 100% free.",
  },
  {
    question: "What kind of brands will I work with?",
    answer:
      "You’ll get access to a premium portfolio. This includes global tech partners as well as massive consumer brands.",
  },
  {
    question: "How does ELEVN match me with campaigns?",
    answer:
      "Campaigns are matched based on your niche, content style, target audience, and brand fit—not just your follower count. The goal is to pair you with briefs where you can genuinely perform and build long-term relationships.",
  },
  {
    question: "Do I keep ownership of my content?",
    answer:
      "Yes. Unless a specific brief states otherwise, you keep ownership of your content and grant brands usage rights only for the agreed period and channels. ELEVN is built to protect creators and make terms crystal clear.",
  },
  {
    question: "Which platforms does ELEVN focus on?",
    answer:
      "ELEVN is optimized for short-form and social video first: TikTok, Instagram Reels, YouTube Shorts, and UGC-style content for paid media. Over time, we’ll expand into more formats and platforms where creators can monetize.",
  },
] as const;

export function FinalCTASection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="join"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-100 dark:bg-elevn-dark scroll-mt-24"
      aria-labelledby="final-cta-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-25" aria-hidden />
        {/* CTA block */}
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 pb-20 max-[400px]:px-3 max-[400px]:py-12 max-[400px]:pb-16 sm:px-6 sm:py-20 sm:pb-24 md:px-10 md:py-24 md:pb-28 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20 space-y-14 sm:space-y-16 lg:space-y-20">

        <motion.div
          id="faq"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 20 }}
          transition={{ duration: 0.35, delay: 0.08, ease }}
          className="mx-auto max-w-3xl scroll-mt-24"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-elevn-cyan sm:text-sm">
              Frequently Asked Questions
            </p>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl md:text-3xl dark:text-elevn-ice">
              Answers before you join
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80 md:text-base">
              If you&apos;re wondering how ELEVN works, start here. Short answers now, full product very soon.
            </p>
          </div>

          <div className="mt-8 space-y-3 sm:mt-10">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 12 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.04, ease }}
                  className={`overflow-hidden rounded-2xl border bg-white/95 shadow-sm transition-colors duration-200 dark:bg-elevn-surface/90 ${
                    isOpen
                      ? "border-elevn-cyan/70 shadow-[0_0_32px_rgba(34,211,238,0.2)] dark:border-elevn-cyan/80"
                      : "border-slate-200/80 dark:border-white/10"
                  }`}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-4.5"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-elevn-cyan/10 text-[11px] font-bold text-elevn-cyan ring-1 ring-elevn-cyan/40">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold text-slate-900 sm:text-base dark:text-elevn-ice">
                        {item.question}
                      </span>
                    </div>
                    <HiChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${
                        isOpen ? "rotate-180 text-elevn-cyan" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24, ease }}
                      >
                        <div className="px-4 pb-4 text-sm font-medium leading-relaxed text-slate-600 sm:px-5 sm:pb-5 dark:text-elevn-ice/85">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 28,
          }}
          transition={{ duration: 0.4, ease }}
          className="relative mx-auto max-w-3xl"
        >
          <div className="relative overflow-hidden rounded-3xl border-2 border-elevn-cyan/30 bg-white/95 px-6 py-10 shadow-xl dark:border-elevn-cyan/40 dark:bg-elevn-surface/90 dark:shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] sm:px-10 sm:py-12 md:px-14 md:py-16">
            <div
              className="absolute inset-0 bg-gradient-to-br from-elevn-primary/[0.04] via-transparent to-elevn-cyan/[0.06] dark:from-elevn-cyan/10 dark:to-elevn-violet/10"
              aria-hidden
            />
            <div className="relative text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-elevn-cyan">
                Secure your spot
              </p>
              <h2
                id="final-cta-heading"
                className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl lg:text-5xl dark:text-elevn-ice"
              >
                ELEVN is almost here.{" "}
                <span
                  className="bg-clip-text font-extrabold"
                  style={{
                    background: GRADIENT_TITLE,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Secure your spot.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg font-semibold leading-relaxed text-slate-700 dark:text-elevn-ice/90 md:text-xl">
                First in, first pick. Early members get priority access to the first brand campaigns of 2026.
              </p>
              <p className="mt-3 text-base font-bold text-slate-800 dark:text-elevn-ice/95">
                Real deals, real people, real growth. One place to build what&apos;s next.
              </p>
              <Button
                type="button"
                size="lg"
                className="mt-10 w-full bg-elevn-gradient px-10 py-7 text-lg font-bold text-white shadow-xl shadow-elevn-primary/25 transition hover:opacity-95 hover:shadow-2xl hover:shadow-elevn-cyan/20 dark:text-elevn-ice dark:shadow-elevn-cyan/20"
                onClick={onOpenJoinForm ?? (() => window.open("https://laneta-portal.netlify.app/", "_blank", "noopener,noreferrer"))}
              >
                <HiBolt className="mr-2 text-2xl" aria-hidden />
                Get early access
              </Button>
              <p className="mt-6 text-sm font-semibold text-slate-600 dark:text-elevn-ice/75">
                Free to join. Access subject to profile validation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
