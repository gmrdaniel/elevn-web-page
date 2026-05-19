"use client";

import { useTranslation } from "react-i18next";

const STATS = [
  { numKey: "community.stat1Num", labelKey: "community.stat1Label" },
  { numKey: "community.stat2Num", labelKey: "community.stat2Label" },
  { numKey: "community.stat3Num", labelKey: "community.stat3Label" },
  { numKey: "community.stat4Num", labelKey: "community.stat4Label" },
] as const;

export function CommunitySection() {
  const { t } = useTranslation();

  return (
    <section
      id="community"
      className="relative overflow-hidden bg-[#f7f7fc] px-6 py-24 font-poppins text-[#1a1a2e] sm:px-10 md:px-16 lg:px-20 lg:py-28 scroll-mt-24"
      aria-labelledby="community-heading"
    >
      <div
        className="proto-blob animate-proto-blob"
        style={{
          width: 500,
          height: 500,
          top: -100,
          right: -100,
          opacity: 0.07,
          background: "linear-gradient(135deg, #493fe2, #5895c0)",
        }}
        aria-hidden
      />

      <div className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Mosaic of placeholder photos */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="row-span-2 overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.03]"
            style={{
              aspectRatio: "3 / 4",
              background: "linear-gradient(145deg, #493fe2, #124a96)",
            }}
            aria-hidden
          />
          <div
            className="overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.03]"
            style={{
              aspectRatio: "1",
              background: "linear-gradient(145deg, #5895c0, #493fe2)",
            }}
            aria-hidden
          />
          <div
            className="overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.03]"
            style={{
              aspectRatio: "1",
              background: "linear-gradient(145deg, #9183ff, #3c3e9e)",
            }}
            aria-hidden
          />
          <div
            className="col-span-2 overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.03]"
            style={{
              aspectRatio: "16 / 6",
              background: "linear-gradient(145deg, #4684ea, #5895c0)",
            }}
            aria-hidden
          />
        </div>

        <div className="max-w-[480px]">
          <div className="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#493fe2]">
            <span className="inline-block h-0.5 w-6 rounded bg-[#493fe2]" />
            {t("community.eyebrow")}
          </div>
          <h2
            id="community-heading"
            className="mb-4 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.15] tracking-[-1px] text-[#1a1a2e]"
          >
            {t("community.titleLine1")}
            <br />
            {t("community.titleLine2")}
          </h2>
          <p className="text-[17px] leading-[1.7] text-[#6b7280]">
            {t("community.body")}
          </p>

          <div className="mt-11 grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.labelKey}
                className="rounded-2xl border border-[#493fe2]/10 bg-white px-5 py-5 shadow-[0_2px_12px_rgba(73,63,226,0.08)]"
              >
                <div
                  className="text-[32px] font-black leading-none tracking-[-1.5px] proto-gradient-text"
                >
                  {t(stat.numKey)}
                </div>
                <div className="mt-1 text-[13px] font-medium text-[#6b7280]">
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
