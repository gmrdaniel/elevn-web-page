"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { HiUserCircle, HiDocumentText, HiClipboardDocumentCheck, HiRocketLaunch } from "react-icons/hi2";

const STAIR_STEPS = [
  {
    number: "01",
    title: "Create your profile",
    body: "Detail your niche, platforms, audience metrics, and the types of content you create. This profile isn't just a resume—it's your introduction to brands seeking talent exactly like yours.",
    icon: HiDocumentText,
    gradient: "from-elevn-primary to-elevn-cyan",
  },
  {
    number: "02",
    title: "Get reviewed",
    body: "Our team reviews your application to ensure you meet our standards. The process typically takes 24 to 48 hours, and we provide constructive feedback regardless of the outcome. Once accepted, you get immediate access to opportunities, training, and our creator community.",
    icon: HiClipboardDocumentCheck,
    gradient: "from-elevn-cyan to-elevn-violet",
  },
  {
    number: "03",
    title: "Explore & apply",
    body: "Explore opportunities that align with your profile, apply to those that interest you, and manage the entire collaboration from your dashboard. Each opportunity comes with a clear brief, transparent compensation, and a defined timeline.",
    icon: HiRocketLaunch,
    gradient: "from-elevn-violet to-elevn-magenta",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS_OFFSET_BREAKPOINT = 560;

export function HowElevnWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const [allowOffsetX, setAllowOffsetX] = useState(false);

  useEffect(() => {
    const check = () => setAllowOffsetX(window.innerWidth >= STEPS_OFFSET_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-elevn-dark"
      aria-labelledby="how-it-works-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionTransition inView={sectionInView} className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 max-[400px]:px-3 max-[400px]:py-12 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 24,
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-elevn-cyan max-[400px]:tracking-[0.15em] sm:text-sm">
            How Elevn works
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-2xl font-bold tracking-tight text-slate-950 max-[400px]:mt-2 max-[400px]:text-xl sm:mt-4 sm:text-3xl md:text-4xl lg:text-5xl dark:text-elevn-ice"
          >
            A process designed for efficiency and clarity
          </h2>
        </motion.div>

        <div className="mt-10 max-[400px]:mt-8 lg:mt-20">
          <motion.div
            className="mb-8 flex items-center gap-3 max-[400px]:mb-6 max-[400px]:gap-2 max-[650px]:mb-10 sm:mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : 16,
            }}
            transition={{ duration: 0.28, delay: 0.02, ease }}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-elevn-primary to-elevn-cyan text-white max-[400px]:h-9 max-[400px]:w-9 max-[400px]:rounded-lg dark:text-elevn-ice">
              <HiUserCircle className="text-xl max-[400px]:text-base" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-elevn-cyan max-[400px]:text-[10px] max-[400px]:tracking-[0.2em]">
                For creators
              </p>
              <h3 className="text-lg font-bold text-slate-950 max-[400px]:text-base md:text-xl dark:text-elevn-ice">
                Your path to professional opportunities
              </h3>
            </div>
          </motion.div>

          {/* Camera 2.5D + global tilt */}
          <div
            className="relative mx-auto w-full max-w-4xl pb-16 pt-2 max-[400px]:pb-12 max-[400px]:pt-1 max-[650px]:pb-20 md:max-w-5xl md:pb-32 md:pt-4 lg:max-w-6xl xl:max-w-[1400px]"
            style={{ perspective: "1400px" }}
          >
            {/* Background to reinforce depth */}
            <div
              className="pointer-events-none absolute inset-0 blur-3xl"
              style={{
                background:
                  "linear-gradient(to bottom right, transparent, rgba(37, 99, 235, 0.06), transparent)",
              }}
              aria-hidden
            />
            {/* Inclined staircase in 3D — animation of tilt on enter */}
            <motion.div
              className="relative mx-auto w-full max-w-4xl space-y-5 max-[400px]:space-y-4 max-[650px]:space-y-7 md:max-w-5xl md:space-y-14 lg:max-w-6xl xl:max-w-[1400px]"
              initial={{ rotateX: 0, rotateZ: 0, opacity: 0.85 }}
              animate={{
                rotateX: sectionInView ? 12 : 0,
                rotateZ: sectionInView ? -2 : 0,
                opacity: 1,
              }}
              transition={{ duration: 0.45, ease }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {STAIR_STEPS.map((step, i) => {
                const Icon = step.icon;
                const stepDelay = 0.2 + i * 0.14;
                const depth = i * -80;
                const offsetX = allowOffsetX ? i * 40 : 0;
                const offsetY = i * -10;
                const scale = 1 - i * 0.04;
                return (
                  <motion.div
                    key={step.number}
                    initial={{
                      opacity: 0,
                      x: offsetX,
                      y: offsetY + 56,
                      z: -260,
                      scale: scale * 0.9,
                    }}
                    animate={{
                      opacity: sectionInView ? 1 : 0,
                      x: offsetX,
                      y: offsetY,
                      z: sectionInView ? depth : -260,
                      scale: sectionInView ? scale : scale * 0.9,
                    }}
                    transition={{ duration: 0.4, delay: stepDelay * 0.4, ease }}
                    className="flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow-md max-[400px]:rounded-md dark:border-white/10 dark:bg-elevn-surface/60 dark:shadow-none md:rounded-xl dark:backdrop-blur-sm"
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      boxShadow: `0 ${12 + i * 6}px ${30 + i * 14}px -10px rgba(0,0,0,0.45)`,
                    }}
                  >
                    {/* Riser (riser) of the step */}
                    <div
                      className={`flex w-20 shrink-0 flex-col items-center justify-center gap-0.5 bg-gradient-to-b ${step.gradient} py-4 max-[400px]:w-16 max-[400px]:py-3 max-[650px]:py-5 md:w-28 md:gap-1 md:py-9`}
                    >
                      <span className="text-2xl font-bold tabular-nums text-white/95 drop-shadow-sm max-[400px]:text-xl max-[650px]:text-3xl md:text-4xl">
                        {step.number}
                      </span>
                      <span className="text-white/95 dark:text-elevn-ice/90">
                        <Icon className="text-xl max-[400px]:text-lg max-[650px]:text-2xl md:text-3xl" aria-hidden />
                      </span>
                    </div>
                    {/* Tread (tread): content of the step */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-4 max-[400px]:px-3 max-[400px]:py-3 max-[650px]:px-5 max-[650px]:py-5 md:px-8 md:py-7">
                      <h4 className="text-base font-bold tracking-tight text-slate-950 max-[400px]:text-sm max-[650px]:text-lg md:text-xl dark:text-elevn-ice">
                        {step.title}
                      </h4>
                      <p className="mt-1.5 min-w-0 max-w-full text-xs font-medium leading-[1.65] text-slate-950 max-[400px]:mt-1 max-[400px]:leading-[1.6] max-[650px]:mt-2 max-[650px]:text-sm max-[650px]:leading-[1.7] md:text-base md:leading-[1.75] dark:text-elevn-ice/90">
                        {step.body}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Decorative line suggesting the base of the staircase */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: sectionInView ? 1 : 0 }}
            transition={{ duration: 0.35, delay: 0.15, ease }}
            className="mx-auto mt-5 h-1 w-full max-w-4xl origin-left rounded-full bg-gradient-to-r from-elevn-primary via-elevn-violet to-elevn-magenta opacity-60 max-[400px]:mt-4 max-[650px]:mt-6 md:mt-8 md:max-w-5xl lg:max-w-6xl xl:max-w-[1400px]"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
