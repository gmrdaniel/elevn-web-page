import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { animate, stagger } from "animejs";
import { Button } from "@/components/ui/button";
//import { InsightsCarousel } from "./InsightsCarousel";
import { useAnimeTitle } from "@/hooks/useAnimeTitle";

const HERO_VIDEO_SRC = "/assets/videos/domain_the_feed.mp4";
const HERO_VIDEO_MIN_WIDTH = 500;
const LOGO_URL = "https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/elevn.png";

const GRADIENT_TITLE =
  "linear-gradient(135deg, #22d3ee 0%, #06b6d4 30%, #8b5cf6 65%, #d946ef 100%)";

export function HeroSection({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const [showVideo, setShowVideo] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= HERO_VIDEO_MIN_WIDTH : true
  );
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useAnimeTitle({
    inView: false,
    once: true,
    staggerMs: 50,
    gradientLastWords: 0,
  });
  const heroTitleInView = useInView(heroTitleRef, { once: true, amount: 0.12 });

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${HERO_VIDEO_MIN_WIDTH}px)`);
    const update = () => setShowVideo(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = heroContentRef.current;
    if (!el) return;
    const targets = el.querySelectorAll(".hero-anime-el");
    if (!targets.length) return;
    animate(Array.from(targets), {
      opacity: [0, 1],
      translateY: [28, 0],
      duration: 420,
      delay: stagger(50, { start: 0 }),
      ease: "outExpo",
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative grid min-h-screen w-full overflow-hidden bg-elevn-dark lg:grid-cols-12"
      aria-label="Hero"
    >
      {/* Background video */}
      {showVideo && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
            aria-hidden
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      )}
      {/* Mesh: siempre oscuro para evitar fondo gris/claro */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-elevn-mesh"
        style={{ opacity: showVideo ? 0.4 : 0.9 }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-[1] w-px bg-gradient-to-b from-transparent via-elevn-cyan/60 to-elevn-magenta/40"
        aria-hidden
      />

      {/* Left: content panel — overlay azul oscuro Elevn para legibilidad */}
      <div className="relative z-20 flex flex-col justify-between px-6 pt-24 pb-10 lg:col-span-5 lg:min-h-screen lg:px-12 lg:pt-36 lg:pb-14 xl:px-16 xl:pt-40">
        {/* Overlay: azul oscuro Elevn (#0a0e1a) para legibilidad, sin gris/claro */}
        <div
          className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0e1a]/95 to-[#0a0e1a]/90 backdrop-blur-sm"
          aria-hidden
        />
        {/* Gradiente suave hacia el video */}
        <div
          className="absolute inset-0 z-0 bg-gradient-to-r from-[#0a0e1a]/70 via-[#0a0e1a]/20 to-transparent pointer-events-none"
          aria-hidden
        />

        <motion.div
          ref={heroContentRef}
          className="relative z-10 flex flex-col gap-8 lg:gap-10"
        >
          <div className="hero-anime-el inline-flex opacity-0">
            <span className="rounded-lg border border-slate-200/80 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur-md">
              <img
                src={LOGO_URL}
                alt="Elevn"
                className="h-11 w-auto object-contain object-center md:h-12"
                width={130}
                height={48}
              />
            </span>
          </div>

          <div className="space-y-5 lg:space-y-6">
            <h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight text-elevn-ice md:text-5xl lg:text-6xl xl:text-7xl">
              <span ref={heroTitleRef} className="anime-title block leading-tight">
              Designed and built for{" "}
              </span>
              <motion.span
                className="block -mt-0.5 bg-clip-text font-bold leading-tight"
                style={{
                  background: GRADIENT_TITLE,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
                initial={{ opacity: 0, x: -36 }}
                animate={heroTitleInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -36 }}
                transition={{
                  delay: 0.18,
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                professional creators
              </motion.span>
            </h1>
            <p className="hero-anime-el max-w-md text-base font-semibold leading-relaxed text-elevn-ice/95 opacity-0 md:text-lg">
            Elevn is your direct access to premium campaigns, elite training, and the most powerful creator community in the region. If you take your content seriously, you belong here.
            </p>
            <p className="hero-anime-el max-w-lg opacity-0">
              <span className="block text-lg font-bold leading-snug tracking-tight text-elevn-ice md:text-xl">
                This isn&apos;t just another marketplace.
              </span>
              <span
                className="mt-1 block text-lg font-extrabold leading-snug tracking-tight md:text-xl lg:text-2xl"
                style={{
                  background: GRADIENT_TITLE,
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                It&apos;s your next step as a professional creator.
              </span>
            </p>
          </div>

          <div className="hero-anime-el flex flex-wrap items-center gap-3 opacity-0">
            <span className="inline-flex items-center gap-3 rounded-full border border-elevn-cyan/40 bg-elevn-surface/80 px-5 py-2.5 text-sm font-semibold backdrop-blur-md shadow-[0_0_20px_-5px_rgba(6,182,212,0.25)] dark:border-elevn-cyan/50 dark:bg-elevn-surface/70 dark:shadow-[0_0_24px_-4px_rgba(6,182,212,0.35)]">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elevn-cyan opacity-80" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-elevn-cyan shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              </span>
              <span className="flex items-baseline gap-2">
                <span className="text-elevn-ice/90 uppercase tracking-wider">Launch</span>
                <span
                  className="font-bold tracking-tight"
                  style={{
                    background: GRADIENT_TITLE,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Coming Soon
                </span>
              </span>
            </span>
          </div>

          <div className="hero-anime-el flex flex-col gap-3 pt-2 opacity-0">
            {onOpenJoinForm ? (
              <Button
                type="button"
                size="lg"
                onClick={onOpenJoinForm}
                className="group relative w-full max-w-sm overflow-hidden rounded-xl border border-elevn-primary/30 bg-elevn-primary py-6 text-base font-semibold text-white shadow-lg transition hover:bg-elevn-primary/90 hover:shadow-elevn-glow lg:w-auto lg:px-10 dark:border-elevn-cyan/50 dark:bg-elevn-surface/80 dark:text-elevn-ice dark:shadow-elevn-neon dark:hover:border-elevn-cyan dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition group-hover:opacity-100 dark:from-elevn-primary/20 dark:via-elevn-cyan/20 dark:to-elevn-violet/20" />
                <span className="relative">Join Our Creator Community</span>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="group relative w-full max-w-sm overflow-hidden rounded-xl border border-elevn-primary/30 bg-elevn-primary py-6 text-base font-semibold text-white shadow-lg transition hover:bg-elevn-primary/90 hover:shadow-elevn-glow lg:w-auto lg:px-10 dark:border-elevn-cyan/50 dark:bg-elevn-surface/80 dark:text-elevn-ice dark:shadow-elevn-neon dark:hover:border-elevn-cyan dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <a href="#join">
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition group-hover:opacity-100 dark:from-elevn-primary/20 dark:via-elevn-cyan/20 dark:to-elevn-violet/20" />
                  <span className="relative">Join Our Creator Community</span>
                </a>
              </Button>
            )}
            <p className="text-xs font-semibold text-elevn-ice/85">Free to join. Pre-register and get early access.</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-white/20 pt-4 text-xs font-semibold text-elevn-ice/80">
              <span>Verified opportunities</span>
              <span className="font-bold text-elevn-ice/50">·</span>
              <span>Clear briefs</span>
              <span className="font-bold text-elevn-ice/50">·</span>
              <span>On-time payments</span>
            </div>
          </div>
        </motion.div>

        <div className="hero-anime-el relative z-10 mt-8 hidden border-l-2 border-white/30 pl-4 opacity-0 lg:block dark:border-elevn-cyan/50">
          <p className="text-xs font-medium uppercase tracking-widest text-elevn-ice/60">
            For you: creators & UGC who take it seriously
          </p>
        </div>
      </div>

      {/* Right */}
      {/*<div className="relative z-10 flex min-h-[50vh] flex-col lg:col-span-7 lg:min-h-screen">
        <div className="absolute inset-0 clip-hero-video" aria-hidden>
          <div
            className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-transparent dark:from-elevn-dark/70 dark:via-elevn-dark/20 dark:to-transparent"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent dark:from-elevn-dark/50 dark:via-transparent dark:to-transparent"
            aria-hidden
          />
        </div>
        <div className="relative z-20 mt-auto flex w-full flex-col justify-end p-4 md:p-5 lg:p-6">
          <div className="mx-auto w-full max-w-[57rem] lg:max-w-[67rem]">
            <InsightsCarousel />
          </div>
        </div>
      </div>*/}

      {/* Diagonal seam */}
      <div
        className="absolute left-[calc(41.666%-1px)] top-0 z-30 hidden h-full w-px bg-gradient-to-b from-transparent via-slate-200 to-slate-300 lg:block dark:via-elevn-cyan/50 dark:to-elevn-violet/30"
        aria-hidden
      />
    </section>
  );
}
