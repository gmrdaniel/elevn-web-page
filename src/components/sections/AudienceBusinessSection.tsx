"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiCheckCircle, HiArrowRight } from "react-icons/hi2";
import { useTranslation } from "react-i18next";

const ease = [0.22, 1, 0.36, 1] as const;

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
      className="relative overflow-hidden"
      aria-labelledby="audience-business-heading"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 max-[400px]:px-3 max-[400px]:pb-12 sm:px-6 sm:pb-20 md:px-10 md:pb-24 lg:max-w-[1600px] lg:px-12 lg:pb-28 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: sectionInView ? 1 : 0, y: sectionInView ? 0 : 24 }}
          transition={{ duration: 0.4, ease }}
          className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16"
        >
          {/* Left: copy */}
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#397aa7] sm:text-sm">
              {t("audienceBusiness.eyebrow")}
            </p>
            <h2
              id="audience-business-heading"
              className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 max-[400px]:text-3xl sm:text-5xl md:text-6xl dark:text-elevn-ice"
            >
              <span className="block">{t("audienceBusiness.headingPart1")}</span>
              <span className="mt-2 block bg-gradient-to-t from-[#397aa7] to-[#EBF2EE] bg-clip-text text-transparent">
                {t("audienceBusiness.headingPart2")}
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-700 dark:text-elevn-ice/85 md:text-lg">
              {t("audienceBusiness.lead")}
            </p>
            <ul className="mt-7 flex flex-col gap-3 md:gap-4">
              {BULLET_KEYS.map((key) => (
                <li
                  key={key}
                  className="flex items-start gap-3 text-sm font-medium leading-relaxed text-slate-800 dark:text-elevn-ice/90 md:text-base"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#83207f] to-[#799cbf] text-white shadow-md">
                    <HiCheckCircle className="text-base" aria-hidden />
                  </span>
                  <span>{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: form card */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 backdrop-blur-sm backdrop-saturate-150 shadow-[0_8px_32px_-4px_rgba(31,38,135,0.12),inset_0_1px_0_0_rgba(255,255,255,0.35)] dark:border-white/[0.06] dark:from-white/[0.02] dark:to-transparent dark:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.05)] sm:p-7 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#83207f] to-[#799cbf] text-white shadow-lg">
                  <HiCheckCircle className="text-3xl" aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 dark:text-elevn-ice">
                  {t("audienceBusiness.successTitle")}
                </h3>
                <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-slate-700 dark:text-elevn-ice/85">
                  {t("audienceBusiness.successBody")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl dark:text-elevn-ice">
                    {t("audienceBusiness.formTitle")}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600 dark:text-elevn-ice/80">
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
                      className="w-full rounded-xl border border-slate-300/80 bg-white/90 px-4 py-3 text-sm font-medium text-slate-950 placeholder:text-slate-400 transition-colors focus:border-[#397aa7] focus:outline-none focus:ring-2 focus:ring-[#397aa7]/30 dark:border-white/15 dark:bg-white/[0.04] dark:text-elevn-ice dark:placeholder:text-elevn-ice/50 dark:focus:border-[#397aa7]"
                    />
                  </div>
                ))}

                <Button
                  type="submit"
                  size="lg"
                  className="mt-2 w-full bg-gradient-to-br from-[#397aa7] to-[#84a3c4] py-5 text-base font-bold text-white shadow-lg transition hover:opacity-95 hover:shadow-xl dark:text-elevn-ice"
                >
                  {t("audienceBusiness.formCta")}
                  <HiArrowRight className="ml-1" aria-hidden />
                </Button>
                <p className="text-center text-xs font-medium text-slate-500 dark:text-elevn-ice/65">
                  {t("audienceBusiness.formDisclaimer")}
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
