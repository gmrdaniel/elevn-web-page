"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { useTranslation } from "react-i18next";
import { ElevnBrand } from "@/components/ui/ElevnBrand";

export function ElevnStudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);
  const { t } = useTranslation();

  return (
    <section
      id="elevn-studio"
      className="relative overflow-hidden bg-white px-6 py-24 font-poppins text-[#1a1a2e] sm:px-10 md:px-16 lg:px-20 lg:py-28 scroll-mt-24"
      aria-labelledby="studio-heading"
    >
      <div className="absolute inset-0 bg-elevn-mesh-light opacity-30 dark:bg-elevn-mesh dark:opacity-20" aria-hidden />
      <SectionDivider className="mb-0" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 sm:py-16 max-[400px]:px-5 max-[400px]:py-12 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:max-w-[1600px] lg:px-12 lg:py-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="text-center"
        >
          <h2
            id="elevn-studio-heading"
            className="text-5xl font-bold tracking-tight text-slate-950 md:text-6xl lg:text-7xl dark:text-elevn-ice"
          >
            <ElevnBrand>{t("studio.heading")}</ElevnBrand>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
