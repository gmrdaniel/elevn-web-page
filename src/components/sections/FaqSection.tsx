"use client";

import { useTranslation } from "react-i18next";

const FAQ_KEYS = [
  { qKey: "faq.q1", aKey: "faq.a1" },
  { qKey: "faq.q2", aKey: "faq.a2" },
  { qKey: "faq.q3", aKey: "faq.a3" },
  { qKey: "faq.q4", aKey: "faq.a4" },
  { qKey: "faq.q5", aKey: "faq.a5" },
  { qKey: "faq.q6", aKey: "faq.a6" },
  { qKey: "faq.q7", aKey: "faq.a7" },
] as const;

export function FaqSection() {
  const { t } = useTranslation();

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#f7f7fc] px-6 py-24 font-poppins text-[#1a1a2e] sm:px-10 md:px-16 lg:px-20 lg:py-28 scroll-mt-24"
      aria-labelledby="faq-heading"
    >
      <div className="relative z-10 grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-24">
          <div className="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#493fe2]">
            <span className="inline-block h-0.5 w-6 rounded bg-[#493fe2]" />
            {t("faq.eyebrow")}
          </div>
          <h2
            id="faq-heading"
            className="mb-4 text-[36px] font-extrabold leading-[1.15] tracking-[-1px] text-[#1a1a2e]"
          >
            {t("faq.titleLine1")}
            <br />
            {t("faq.titleLine2")}
          </h2>
          <p className="text-[15px] leading-[1.7] text-[#6b7280]">
            {t("faq.body")}
          </p>
        </div>

        <div className="proto-faq">
          {FAQ_KEYS.map((item, i) => (
            <details
              key={item.qKey}
              className="mb-3 overflow-hidden rounded-2xl border border-[#493fe2]/10 bg-white transition-shadow duration-200 hover:shadow-[0_4px_20px_rgba(73,63,226,0.1)]"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="flex items-center justify-between gap-4 px-5 py-4 text-[15px] font-bold text-[#1a1a2e]">
                {t(item.qKey)}
              </summary>
              <div className="px-5 pb-5 text-sm leading-[1.7] text-[#6b7280]">
                {t(item.aKey)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
