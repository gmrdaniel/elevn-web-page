"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { Button } from "@/components/ui/button";
import { HiBolt } from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;
const GRADIENT_TITLE =
  "linear-gradient(135deg, #22d3ee 0%, #06b6d4 30%, #8b5cf6 65%, #d946ef 100%)";

export function FinalCTASection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.02 });

  return (
    <section
      id="join"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-elevn-dark"
      aria-labelledby="final-cta-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-25" aria-hidden />
        {/* CTA block */}
      <SectionTransition inView={sectionInView} className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 pb-20 max-[400px]:px-3 max-[400px]:py-12 max-[400px]:pb-16 sm:px-6 sm:py-20 sm:pb-24 md:px-10 md:py-24 md:pb-28 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 28,
          }}
          transition={{ duration: 0.4, ease }}
          className="relative mx-auto max-w-3xl"
        >
          {/* Card container — gancho visual */}
          <div className="relative overflow-hidden rounded-3xl border-2 border-elevn-cyan/30 bg-white/95 px-6 py-10 shadow-xl dark:border-elevn-cyan/40 dark:bg-elevn-surface/90 dark:shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] sm:px-10 sm:py-12 md:px-14 md:py-16">
            <div
              className="absolute inset-0 bg-gradient-to-br from-elevn-primary/[0.04] via-transparent to-elevn-cyan/[0.06] dark:from-elevn-cyan/10 dark:to-elevn-violet/10"
              aria-hidden
            />
            <div className="relative text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-elevn-cyan">
                One click away
              </p>
              <h2
                id="final-cta-heading"
                className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl lg:text-5xl dark:text-elevn-ice"
              >
                Ready for the{" "}
                <span
                  className="bg-clip-text font-extrabold"
                  style={{
                    background: GRADIENT_TITLE,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  next level?
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg font-semibold leading-relaxed text-slate-700 dark:text-elevn-ice/90 md:text-xl">
                Brands are looking for you. The most active creator community in the region is waiting. Join free—get early access.
              </p>
              <p className="mt-3 text-base font-bold text-slate-800 dark:text-elevn-ice/95">
                Don&apos;t let the wave pass. Your moment is now.
              </p>
              <Button
                type="button"
                size="lg"
                className="mt-10 w-full bg-elevn-gradient px-10 py-7 text-lg font-bold text-white shadow-xl shadow-elevn-primary/25 transition hover:opacity-95 hover:shadow-2xl hover:shadow-elevn-cyan/20 dark:text-elevn-ice dark:shadow-elevn-cyan/20"
                onClick={onOpenJoinForm ?? (() => window.open("https://laneta-portal.netlify.app/", "_blank", "noopener,noreferrer"))}
              >
                <HiBolt className="mr-2 text-2xl" aria-hidden />
                Join Our Creator Community
              </Button>
              <p className="mt-6 text-sm font-semibold text-slate-600 dark:text-elevn-ice/75">
                Free registration. No commitment. Access subject to profile validation.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
