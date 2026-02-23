"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { Button } from "@/components/ui/button";
import { HiBolt } from "react-icons/hi2";

const ease = [0.22, 1, 0.36, 1] as const;

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
      <SectionTransition inView={sectionInView} className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 pb-20 max-[400px]:px-3 max-[400px]:py-12 max-[400px]:pb-16 sm:px-6 sm:py-20 sm:pb-24 md:px-10 md:py-24 md:pb-28 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        {/* Close section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 20,
          }}
          transition={{ duration: 0.32, ease }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-elevn-cyan">
            Where creators meet their next level
          </p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl dark:text-elevn-ice">
            Elevn is your space
          </h3>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-semibold leading-relaxed text-slate-950 md:text-2xl md:leading-relaxed dark:text-elevn-ice">
            This is where opportunities, community, and professional growth come together. Built on years of experience in the industry—our roots are in La Neta—so what you get here is real: real briefs, real collaborations, real standards.
          </p>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
            <li className="group rounded-xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm transition-colors hover:border-elevn-cyan/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm dark:hover:border-elevn-cyan/30 dark:hover:bg-white/[0.08]">
              <span className="block text-sm font-semibold uppercase tracking-wider text-elevn-cyan">On Elevn</span>
              <span className="mt-2 block text-base font-medium leading-snug text-slate-950 dark:text-elevn-ice/90">
                You find verified opportunities and a community of creators who take the craft seriously.
              </span>
            </li>
            <li className="group rounded-xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm transition-colors hover:border-elevn-violet/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm dark:hover:border-elevn-violet/30 dark:hover:bg-white/[0.08]">
              <span className="block text-sm font-semibold uppercase tracking-wider text-elevn-violet">The standard</span>
              <span className="mt-2 block text-base font-medium leading-snug text-slate-950 dark:text-elevn-ice/90">
                Tools, transparency, and professionalism—the same you&apos;d expect in any established industry.
              </span>
            </li>
            <li className="group rounded-xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm transition-colors hover:border-elevn-magenta/40 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm dark:hover:border-elevn-magenta/30 dark:hover:bg-white/[0.08]">
              <span className="block text-sm font-semibold uppercase tracking-wider text-elevn-magenta">Our promise</span>
              <span className="mt-2 block text-base font-medium leading-snug text-slate-950 dark:text-elevn-ice/90">
                Creativity and creators deserve a real ecosystem. Elevn is here to make it happen.
              </span>
            </li>
          </ul>
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 24,
          }}
          transition={{ duration: 0.32, delay: 0.06, ease }}
          className="mx-auto mt-16 min-w-0 max-w-2xl text-center lg:mt-20"
        >
          <h2
            id="final-cta-heading"
            className="text-3xl font-bold tracking-tight text-slate-950 md:text-4xl lg:text-5xl dark:text-elevn-ice"
          >
            Ready for the next level?
          </h2>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-slate-950 md:text-xl dark:text-elevn-ice/90">
            Brands are looking for talent right now. Monetization opportunities are available. The most active creator community in the region is waiting to welcome you.
          </p>
          <p className="mt-4 text-lg font-semibold text-slate-950 md:text-xl dark:text-elevn-ice/90">
            Don&apos;t let the wave pass you by. The time to professionalize your career as a creator is now.
          </p>
          <Button
            type="button"
            size="lg"
            className="mt-10 w-full sm:w-auto bg-elevn-gradient px-8 py-6 text-lg font-semibold text-white shadow-lg transition-opacity hover:opacity-95 dark:text-elevn-ice"
            onClick={onOpenJoinForm ?? (() => window.open("https://laneta-portal.netlify.app/", "_blank", "noopener,noreferrer"))}
          >
            <HiBolt className="text-xl" aria-hidden />
            Be one of the first to join
          </Button>
          <p className="mt-6 text-sm font-semibold text-slate-950 dark:text-elevn-ice/80">
            Free registration. Access is subject to profile validation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
