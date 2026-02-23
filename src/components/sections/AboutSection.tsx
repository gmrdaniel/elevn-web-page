import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { SectionTransition } from "@/components/ui/SectionTransition";
import { HiGlobeAlt, HiDocumentText, HiShieldCheck, HiChartBar } from "react-icons/hi2";

const CREATOR_IMAGES = [
  "/assets/images/recording.jpg",
  "/assets/images/streaming.jpg",
  "/assets/images/geek_famel.jpg",
  "/assets/images/fashion.jpg",
  "/assets/images/makeup.jpg",
  "/assets/images/travel.jpg",
  "/assets/images/cooking.jpg",
  "/assets/images/dancer.jpg",
];

const DISCOVER_IMAGE = "/assets/images/edition.jpg";

const ROTATING_BEATS = [
  { slogan: "A curated space", line: "Quality and brand fit come first. For everyone.", sloganClass: "text-elevn-cyan" },
  { slogan: "The new standard", line: "A complete ecosystem for the digital content industry.", sloganClass: "text-elevn-primary" },
  { slogan: "Professionalize the industry", line: "Creators first—authenticity, impact, measurable results.", sloganClass: "text-elevn-violet" },
  { slogan: "Everything in one place", line: "Verified opportunities, training, and a community that gets it.", sloganClass: "text-elevn-magenta" },
  { slogan: "Built for creators", line: "UGC, influencers, content creators. One hub, one standard.", sloganClass: "text-elevn-cyan" },
];

const ROTATE_INTERVAL_MS = 4500;

const WHY_ELEVN_ITEMS = [
  "Connection with top creators worldwide: Access a global network of vetted talent across 15+ countries.",
  "Weekly campaign management: Run recurring campaigns with clear briefs, deadlines, and deliverables.",
  "On-time payments and clear terms: Transparent contracts and reliable payouts for creators and brands.",
  "Full traceability and reporting: Track every asset, approval, and performance metric in one place.",
  "Campaign performance insights: Dashboards and reports that show what works and what to scale.",
  "Curated creators by niche and fit: Talent selected for quality and brand alignment—long-term fit, not just availability.",
];

const WHY_ELEVN_ICONS = [HiGlobeAlt, HiDocumentText, HiShieldCheck, HiChartBar];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionInView, setSectionInView] = useState(false);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const visionRef = useRef<HTMLDivElement>(null);
  const visionInView = useInView(visionRef, { once: true, amount: 0.05 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setSectionInView(e?.isIntersecting ?? false),
      { threshold: 0.04, rootMargin: "0px 0px 0px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setRotatingIndex((i) => (i + 1) % ROTATING_BEATS.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-100 dark:bg-elevn-dark"
      aria-labelledby="about-hero-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-40 dark:bg-elevn-mesh dark:opacity-30" aria-hidden />

      <SectionTransition inView={sectionInView} className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.h2
          id="about-section-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 16,
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="text-3xl font-bold tracking-tight text-slate-950 dark:text-elevn-ice md:text-4xl lg:text-5xl">
            About{" "}
          </span>
          <span
            className="bg-elevn-gradient bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl"
          >
            Elevn
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: sectionInView ? 1 : 0,
            y: sectionInView ? 0 : 10,
          }}
          transition={{ duration: 0.32, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-center text-lg font-semibold leading-relaxed text-slate-950 md:mt-5 md:text-xl dark:text-elevn-ice/90"
        >
          Your next step as a professional creator.
        </motion.p>
      </div>

      {/* Discover block */}
      <div className="relative grid min-h-[55vh] w-full grid-cols-1 lg:grid-cols-12">
        <div className="relative min-h-[40vh] lg:col-span-7 lg:min-h-[55vh]">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: sectionInView ? 1 : 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={DISCOVER_IMAGE}
              alt="Discover: where creators and brands meet"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent dark:from-elevn-dark/80 dark:via-elevn-dark/50 dark:to-transparent"
            aria-hidden
          />
          <div className="absolute inset-0 flex flex-col justify-center px-6 py-12 md:px-10 lg:px-12">
            <motion.h2
              id="about-hero-heading"
              initial={{ opacity: 0, y: 36 }}
              animate={{
                opacity: sectionInView ? 1 : 0,
                y: sectionInView ? 0 : 36,
              }}
              transition={{ duration: 0.35, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 max-w-md text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
            >
              <span>Discover </span>
              <span className="bg-gradient-to-r from-elevn-cyan via-elevn-violet to-elevn-magenta bg-clip-text text-transparent">
                the new standard
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -22 }}
              animate={{
                opacity: sectionInView ? 1 : 0,
                y: sectionInView ? 0 : -22,
              }}
              transition={{ duration: 0.35, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 max-w-sm text-base font-semibold leading-relaxed text-white/95 dark:text-elevn-ice/90"
            >
              A curated space where creators and brands meet. Quality first—for everyone.
            </motion.p>
          </div>
        </div>
        <motion.div
          className="flex flex-col justify-center border-l-0 border-t border-slate-200 bg-white/90 px-6 py-10 backdrop-blur-sm dark:border-white/10 dark:bg-elevn-surface/80 md:px-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:py-14"
          initial={{ x: 320 }}
          animate={{ x: sectionInView ? 0 : 320 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0, y: -24 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : -24,
            }}
            transition={{ duration: 0.32, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-base font-semibold uppercase tracking-widest text-elevn-cyan"
          >
            The full picture
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : 28,
            }}
            transition={{ duration: 0.32, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-2xl font-semibold leading-snug text-slate-950 dark:text-elevn-ice md:text-3xl"
          >
            Not another influencer platform.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: sectionInView ? 1 : 0,
              y: sectionInView ? 0 : -20,
            }}
            transition={{ duration: 0.32, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-lg font-semibold leading-relaxed text-slate-950 dark:text-elevn-ice/80"
          >
            A complete ecosystem to professionalize the creative content industry—verified opportunities, training, and a community that understands.
          </motion.p>

          <div className="relative mt-8 min-h-[7rem] overflow-hidden border-t border-slate-200 pt-6 dark:border-white/10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={rotatingIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-6"
              >
                <p className={`text-base font-semibold uppercase tracking-wider ${ROTATING_BEATS[rotatingIndex].sloganClass}`}>
                  {ROTATING_BEATS[rotatingIndex].slogan}
                </p>
                <p className="mt-1.5 text-lg font-semibold leading-relaxed text-slate-950 dark:text-elevn-ice/75">
                  {ROTATING_BEATS[rotatingIndex].line}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Creator grid */}
      <div className="relative border-t border-slate-200 bg-slate-50 px-4 py-12 dark:border-white/10 dark:bg-elevn-surface/60 md:px-8 md:py-16 lg:px-12">
        <p className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-slate-950 md:mb-10 md:text-base dark:text-elevn-ice/90">
          Creators like you
        </p>
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-4 sm:grid-cols-4 sm:gap-6 md:grid-cols-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
          {CREATOR_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: sectionInView ? 1 : 0,
                scale: sectionInView ? 1 : 0.9,
              }}
              transition={{ duration: 0.3, delay: 0.03 * i, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-square overflow-hidden rounded-xl border border-slate-200 shadow-md transition hover:border-elevn-cyan/40 hover:shadow-lg dark:border-white/10 dark:shadow-elevn-card dark:hover:border-elevn-cyan/30 dark:hover:shadow-elevn-neon md:rounded-2xl"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Our Vision */}
      <div ref={visionRef} className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-elevn-dark">
        <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: visionInView ? 1 : 0, y: visionInView ? 0 : 24 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 text-center md:mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-elevn-cyan">
              Our Vision
            </p>
            <h3 className="mt-4 text-3xl font-bold leading-tight text-slate-950 dark:text-elevn-ice md:text-4xl lg:text-5xl">
              Creative content is a serious industry.
            </h3>
            <p className="mt-4 text-lg font-semibold text-slate-950 md:text-xl dark:text-elevn-ice/90">
              Real potential. Real careers. Real standards.
            </p>
          </motion.div>

          {/* Why Elevn */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {WHY_ELEVN_ITEMS.map((text, i) => {
              const [title, ...rest] = text.split(": ");
              const desc = rest.join(": ");
              const Icon = WHY_ELEVN_ICONS[i % WHY_ELEVN_ICONS.length];
              return (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: visionInView ? 1 : 0,
                    y: visionInView ? 0 : 20,
                  }}
                  transition={{
                    duration: 0.32,
                    delay: 0.04 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-5 backdrop-blur-sm transition hover:border-elevn-cyan/30 dark:border-white/10 dark:bg-elevn-surface/80 dark:hover:border-elevn-cyan/25 md:p-6"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-elevn-primary/10 via-transparent to-elevn-violet/5 opacity-0 transition group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="relative flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-elevn-cyan/25 to-elevn-violet/25 text-elevn-cyan">
                      <Icon className="text-xl" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-950 dark:text-elevn-ice">{title}</p>
                      <p className="mt-1.5 text-sm font-medium leading-relaxed text-slate-950 dark:text-elevn-ice/90">
                        {desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: visionInView ? 1 : 0,
              y: visionInView ? 0 : 20,
            }}
            transition={{ duration: 0.38, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 md:mt-20"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-elevn-surface/80 md:p-8 lg:p-10">
              <div
                className="absolute right-0 top-0 h-40 w-40 bg-gradient-to-bl from-elevn-cyan/15 to-transparent"
                aria-hidden
              />
              <p className="relative text-lg font-semibold leading-snug text-slate-950 md:text-xl dark:text-elevn-ice">
                Creators are not side projects. They are media businesses.
              </p>
              <p className="relative mt-3 text-base font-medium leading-relaxed text-slate-950 dark:text-elevn-ice/90">
                Creative content is a serious industry—with real economic potential.
              </p>
              <blockquote className="relative mt-6 border-l-2 border-elevn-cyan/60 pl-5 text-base font-medium italic leading-relaxed text-slate-950 md:text-lg dark:text-elevn-ice/90">
                Today&apos;s creators aren&apos;t just popular users. They&apos;re digital entrepreneurs, content producers, and brand storytellers—with the same right to tools, resources, and opportunities as any professional.
              </blockquote>
              <ul className="relative mt-6 space-y-3 text-base font-medium leading-relaxed text-slate-950 md:text-lg dark:text-elevn-ice/90">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-elevn-cyan" aria-hidden />
                  <span>We remove the barriers between creative talent and career opportunities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-elevn-cyan" aria-hidden />
                  <span>Direct connections between creators and brands—transparent, with context, training, and support so every collaboration reaches its full potential.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
