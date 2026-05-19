"use client";

import { useTranslation } from "react-i18next";

export function FinalCTASection({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();
  const handleJoin = onOpenJoinForm ?? (() => window.location.assign("#join"));

  return (
    <section
      id="join"
      className="relative overflow-hidden px-6 py-24 text-center font-poppins sm:px-10 md:px-16 lg:px-20 lg:py-28 scroll-mt-24"
      style={{
        background:
          "linear-gradient(150deg, #493fe2 0%, #3c3e9e 40%, #124a96 100%)",
      }}
      aria-labelledby="final-cta-heading"
    >
      <div
        className="proto-blob animate-proto-blob"
        style={{
          width: 400,
          height: 400,
          top: -100,
          left: -80,
          opacity: 0.12,
          background: "#5895c0",
        }}
        aria-hidden
      />
      <div
        className="proto-blob animate-proto-blob-slow"
        style={{
          width: 300,
          height: 300,
          bottom: -80,
          right: -60,
          opacity: 0.15,
          background: "#9183ff",
          borderRadius: "50%",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[680px]">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-white/90">
          ✦ {t("finalCta.pill")}
        </div>
        <h2
          id="final-cta-heading"
          className="mb-4 text-[clamp(32px,5vw,58px)] font-black leading-[1.1] tracking-[-1.5px] text-white"
        >
          {t("finalCta.titleLine1")}
          <br />
          <em
            className="not-italic"
            style={{
              background: "linear-gradient(135deg, #7dd3fc, #a5f3fc)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {t("finalCta.titleHighlight")}
          </em>
        </h2>
        <p className="mb-10 text-[17px] leading-[1.65] text-white/75">
          {t("finalCta.body")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleJoin}
            className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-base font-extrabold text-[#493fe2] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(0,0,0,0.3)]"
          >
            {t("finalCta.ctaPrimary")} <span aria-hidden>✦</span>
          </button>
          <a
            href="#opportunities"
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/30 px-7 py-[14px] text-[15px] font-semibold text-white/90 transition-colors duration-200 hover:border-white/50 hover:bg-white/10"
          >
            {t("finalCta.ctaSecondary")} <span aria-hidden>→</span>
          </a>
        </div>
        <p className="mt-5 text-xs text-white/50">
          {t("finalCta.note")}
        </p>
      </div>
    </section>
  );
}
