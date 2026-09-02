"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { staggerContainer, fadeUp, CARD_CLASS } from "@/lib/motion";

const BULLET_KEYS = [
  "audienceBusiness.bullet1",
  "audienceBusiness.bullet2",
  "audienceBusiness.bullet3",
  "audienceBusiness.bullet4",
] as const;

const FIELDS = [
  { name: "name", labelKey: "audienceBusiness.fieldName", phKey: "audienceBusiness.fieldNamePh", type: "text" },
  { name: "phone", labelKey: "audienceBusiness.fieldPhone", phKey: "audienceBusiness.fieldPhonePh", type: "tel" },
  { name: "handle", labelKey: "audienceBusiness.fieldHandle", phKey: "audienceBusiness.fieldHandlePh", type: "text" },
  { name: "followers", labelKey: "audienceBusiness.fieldFollowers", phKey: "audienceBusiness.fieldFollowersPh", type: "text" },
  { name: "email", labelKey: "audienceBusiness.fieldEmail", phKey: "audienceBusiness.fieldEmailPh", type: "email" },
] as const;

export function AudienceBusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="audience-business"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28 scroll-mt-24"
      aria-labelledby="audience-business-heading"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16"
        >
          {/* Left: copy */}
          <div className="flex flex-col">
            <motion.p
              variants={fadeUp}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-elevn-primary dark:text-elevn-cyan sm:text-sm"
            >
              {t("audienceBusiness.eyebrow")}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              id="audience-business-heading"
              className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 dark:text-elevn-ice sm:text-5xl"
            >
              <span className="block">{t("audienceBusiness.headingPart1")}</span>
              <span className="mt-2 block bg-gradient-to-r from-elevn-violet to-elevn-magenta bg-clip-text text-transparent">
                {t("audienceBusiness.headingPart2")}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-sm leading-relaxed text-slate-700 dark:text-elevn-ice/85 sm:text-base"
            >
              {t("audienceBusiness.lead")}
            </motion.p>
            <motion.ul variants={staggerContainer} className="mt-7 flex flex-col gap-3">
              {BULLET_KEYS.map((key) => (
                <motion.li
                  key={key}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-800 dark:text-elevn-ice/90"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-elevn-primary to-elevn-violet text-white shadow-md">
                    <HiCheckCircle className="text-base" aria-hidden />
                  </span>
                  <span>{t(key)}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Right: form card */}
          <motion.div
            variants={fadeUp}
            className={`relative w-full overflow-hidden p-6 sm:p-7 md:p-8 ${CARD_CLASS}`}
          >
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-elevn-primary to-elevn-violet text-white shadow-lg">
                  <HiCheckCircle className="text-3xl" aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 dark:text-elevn-ice">
                  {t("audienceBusiness.successTitle")}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-700 dark:text-elevn-ice/85">
                  {t("audienceBusiness.successBody")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-elevn-ice sm:text-2xl">
                    {t("audienceBusiness.formTitle")}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-elevn-ice/80">
                    {t("audienceBusiness.formSub")}
                  </p>
                </div>

                {FIELDS.map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={`ab-${field.name}`}
                      className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-elevn-ice/70"
                    >
                      {t(field.labelKey)}
                    </label>
                    <input
                      id={`ab-${field.name}`}
                      name={field.name}
                      type={field.type}
                      placeholder={t(field.phKey)}
                      required
                      className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-4 py-3 text-sm font-medium text-slate-950 placeholder:text-slate-400 transition-colors focus:border-elevn-primary focus:outline-none focus:ring-2 focus:ring-elevn-primary/30 dark:border-white/15 dark:bg-white/[0.04] dark:text-elevn-ice dark:placeholder:text-elevn-ice/50 dark:focus:border-elevn-cyan dark:focus:ring-elevn-cyan/20"
                    />
                  </div>
                ))}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 w-full bg-gradient-to-br from-elevn-primary to-elevn-cyan py-5 text-sm font-bold text-white shadow-lg transition hover:opacity-95 hover:shadow-xl sm:text-base"
                >
                  {t("audienceBusiness.formCta")}
                  <HiArrowRight className="ml-1" aria-hidden />
                </Button>
                <p className="text-center text-xs font-medium text-slate-500 dark:text-elevn-ice/65">
                  {t("audienceBusiness.formDisclaimer")}
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
