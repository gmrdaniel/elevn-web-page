"use client";

import { useTranslation } from "react-i18next";

const PILLARS = [
  {
    titleKey: "pillars.p1Title",
    bodyKey: "pillars.p1Body",
    linkKey: "pillars.p1Link",
    icon: "✦",
    iconBg: "rgba(73,63,226,.1)",
    top: "linear-gradient(90deg, #493fe2, #9183ff)",
  },
  {
    titleKey: "pillars.p2Title",
    bodyKey: "pillars.p2Body",
    linkKey: "pillars.p2Link",
    icon: "★",
    iconBg: "rgba(88,149,192,.12)",
    top: "linear-gradient(90deg, #5895c0, #4684ea)",
  },
  {
    titleKey: "pillars.p3Title",
    bodyKey: "pillars.p3Body",
    linkKey: "pillars.p3Link",
    icon: "◎",
    iconBg: "rgba(145,131,255,.12)",
    top: "linear-gradient(90deg, #9183ff, #3c3e9e)",
  },
] as const;

export function BenefitsSectionV2({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();
  const handleJoin = onOpenJoinForm ?? (() => window.location.assign("#join"));

  return (
    <section
      id="benefits"
      className="relative bg-white px-6 py-24 font-poppins text-[#1a1a2e] sm:px-10 md:px-16 lg:px-20 lg:py-28 scroll-mt-24"
      aria-labelledby="pillars-heading"
    >
      <div className="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#493fe2]">
        <span className="inline-block h-0.5 w-6 rounded bg-[#493fe2]" />
        {t("pillars.eyebrow")}
      </div>
      <h2
        id="pillars-heading"
        className="mb-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.15] tracking-[-1px] text-[#1a1a2e]"
      >
        {t("pillars.titleLine1")}
        <br />
        {t("pillars.titleLine2")}
      </h2>
      <p className="mb-14 max-w-[520px] text-[17px] leading-[1.7] text-[#6b7280]">
        {t("pillars.subtitle")}
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.titleKey}
            className="group relative overflow-hidden rounded-3xl border border-[#493fe2]/10 bg-white p-9 shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#493fe2]/20 hover:shadow-[0_16px_40px_rgba(73,63,226,0.12)]"
          >
            <span
              className="absolute left-0 right-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: pillar.top }}
              aria-hidden
            />
            <div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
              style={{ background: pillar.iconBg }}
              aria-hidden
            >
              {pillar.icon}
            </div>
            <h3 className="mb-2.5 text-xl font-extrabold tracking-[-0.3px] text-[#1a1a2e]">
              {t(pillar.titleKey)}
            </h3>
            <p className="mb-5 text-sm leading-[1.7] text-[#6b7280]">
              {t(pillar.bodyKey)}
            </p>
            <button
              type="button"
              onClick={handleJoin}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#493fe2] transition-[gap] duration-200 hover:gap-2.5"
            >
              {t(pillar.linkKey)} <span aria-hidden>→</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
