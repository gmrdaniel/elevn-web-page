"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { staggerContainer, fadeUp } from "@/lib/motion";

const RAW_VIDEOS = [
  "01 DANIELA DG LAN_9_16.mp4",
  "01_VERONICA_DG_LAN_916_.mp4",
  "01_Yordanis_DG_LAN_9_16.mp4",
  "02 DANIELA DG LAN_9_16.mp4",
  "04_VERONICA_DG_WP_9_16.mp4",
  "SUBIDO - 01_MICHELLE_DG_WP_9_16.mp4",
  "SUBIDO 02_Yordanis_DG_LAN_9_16.mp4",
  "SUBIDO 03_Yordanis_DG_LAN_9-16.mp4",
  "SUBIDO 04_Yordanis_CKEMPIEZA_LAN.mp4",
] as const;

const CREATOR_VIDEOS = RAW_VIDEOS.map((file) => encodeURI(`/assets/videos/${file}`));

/** Plays/pauses a muted video as it scrolls in and out of the viewport,
 * so the marquee doesn't keep every clip decoding at once. */
function CreatorVideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-[280px] w-[160px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-elevn-dark shadow-elevn-card sm:h-[340px] sm:w-[195px]">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        className="h-full w-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-elevn-dark/40 via-transparent to-transparent"
        aria-hidden
      />
    </div>
  );
}

export function CreatorsVideoCarousel() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      id="creators-videos"
      className="relative overflow-hidden py-16 sm:py-20 scroll-mt-24"
      aria-labelledby="creators-videos-heading"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-elevn-primary dark:text-elevn-cyan sm:text-sm"
          >
            {t("creatorsVideos.label")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="creators-videos-heading"
            className="mt-4 text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.15] tracking-tight text-slate-950 dark:text-elevn-ice"
          >
            {t("creatorsVideos.titleLine1")}
            <br />
            <span className="bg-gradient-to-r from-elevn-primary via-elevn-cyan to-elevn-violet bg-clip-text text-transparent">
              {t("creatorsVideos.titleLine2")}
            </span>
          </motion.h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: sectionInView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mt-12 overflow-hidden sm:mt-14"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <motion.div
          className="flex gap-4 sm:gap-5"
          animate={sectionInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
          transition={
            sectionInView
              ? { duration: 44, ease: "linear", repeat: Infinity }
              : { duration: 0 }
          }
        >
          {[...CREATOR_VIDEOS, ...CREATOR_VIDEOS].map((src, index) => (
            <CreatorVideoCard key={`${src}-${index}`} src={src} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
