"use client";

import { useTranslation } from "react-i18next";

const STUDIO_CARDS = [
  {
    tagKey: "studio.c1Tag",
    titleKey: "studio.c1Title",
    descKey: "studio.c1Desc",
    linkKey: "studio.c1Link",
    tagColor: "text-[#493fe2]",
    top: "linear-gradient(135deg, rgba(73,63,226,.12), rgba(145,131,255,.15))",
  },
  {
    tagKey: "studio.c2Tag",
    titleKey: "studio.c2Title",
    descKey: "studio.c2Desc",
    linkKey: "studio.c2Link",
    tagColor: "text-[#5895c0]",
    top: "linear-gradient(135deg, rgba(88,149,192,.12), rgba(70,132,234,.15))",
  },
  {
    tagKey: "studio.c3Tag",
    titleKey: "studio.c3Title",
    descKey: "studio.c3Desc",
    linkKey: "studio.c3Link",
    tagColor: "text-[#3c3e9e]",
    top: "linear-gradient(135deg, rgba(60,62,158,.1), rgba(73,63,226,.12))",
  },
] as const;

export function ElevnStudioSection() {
  const { t } = useTranslation();

  return (
    <section
      id="elevn-studio"
      className="relative overflow-hidden bg-white px-6 py-24 font-poppins text-[#1a1a2e] sm:px-10 md:px-16 lg:px-20 lg:py-28 scroll-mt-24"
      aria-labelledby="studio-heading"
    >
      <div
        className="proto-blob animate-proto-blob"
        style={{
          width: 400,
          height: 400,
          bottom: -80,
          left: -80,
          opacity: 0.08,
          background: "linear-gradient(135deg, #9183ff, #493fe2)",
        }}
        aria-hidden
      />

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#493fe2]">
          <span className="inline-block h-0.5 w-6 rounded bg-[#493fe2]" />
          {t("studio.eyebrow")}
        </div>
        <h2
          id="studio-heading"
          className="mb-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.15] tracking-[-1px] text-[#1a1a2e]"
        >
          {t("studio.titleLine1")}
          <br />
          {t("studio.titleLine2")}
        </h2>
        <p className="max-w-[520px] text-[17px] leading-[1.7] text-[#6b7280]">
          {t("studio.body")}
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STUDIO_CARDS.map((card) => (
            <div
              key={card.titleKey}
              className="overflow-hidden rounded-[20px] border border-[#493fe2]/10 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(73,63,226,0.14)]"
            >
              <div
                className="h-[120px]"
                style={{ background: card.top }}
                aria-hidden
              />
              <div className="bg-white px-6 py-6">
                <div className={`mb-2 text-[10px] font-extrabold uppercase tracking-[0.1em] ${card.tagColor}`}>
                  {t(card.tagKey)}
                </div>
                <h3 className="mb-2 text-[17px] font-extrabold tracking-[-0.3px] text-[#1a1a2e]">
                  {t(card.titleKey)}
                </h3>
                <p className="mb-4 text-[13px] leading-[1.6] text-[#6b7280]">
                  {t(card.descKey)}
                </p>
                <a
                  href="#join"
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#493fe2] transition-[gap] duration-200 hover:gap-2.5"
                >
                  {t(card.linkKey)} <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
