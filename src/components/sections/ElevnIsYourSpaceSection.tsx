"use client";

import { useTranslation } from "react-i18next";

/**
 * Hero + Trust Bar — faithful port of ELEVN_Landing_v3.html.
 * Keeps the existing JoinForm modal hook (`onOpenJoinForm`) so the
 * "Join for free" CTAs still open the registration drawer.
 */

const TRUST_LOGOS = [
  { glyph: "⚡", label: "Meta" },
  { glyph: "▶", label: "YouTube" },
  { glyph: "◈", label: "Pinterest" },
  { glyph: "▸", label: "Tubi" },
  { glyph: "♾", label: "TikTok" },
  { glyph: "◎", label: "Dove" },
  { glyph: "◉", label: "L'Oréal" },
  { glyph: "◈", label: "P&G" },
] as const;

export function ElevnIsYourSpaceSection({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();
  const handleJoin = onOpenJoinForm ?? (() => window.location.assign("#join"));

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section
        id="elevn-is-your-space"
        className="relative grid min-h-screen items-center gap-10 overflow-hidden bg-white px-6 pb-14 pt-20 font-poppins text-[#1a1a2e] sm:px-10 md:px-16 lg:grid-cols-2 lg:gap-12 lg:px-20 lg:pb-16 lg:pt-24 scroll-mt-24"
        aria-labelledby="hero-heading"
      >
        {/* decorative blobs */}
        <div
          className="proto-blob animate-proto-blob"
          style={{
            width: 420,
            height: 420,
            top: -80,
            right: "30%",
            opacity: 0.12,
            background: "linear-gradient(135deg, #9183ff, #493fe2)",
          }}
          aria-hidden
        />
        <div
          className="proto-blob animate-proto-blob-slow"
          style={{
            width: 300,
            height: 300,
            bottom: -60,
            left: -60,
            opacity: 0.15,
            background: "linear-gradient(135deg, #5895c0, #4684ea)",
          }}
          aria-hidden
        />
        <div
          className="proto-blob animate-proto-blob"
          style={{
            width: 180,
            height: 180,
            top: "20%",
            right: "5%",
            opacity: 0.2,
            background: "#9183ff",
            borderRadius: "50%",
            animationDelay: "2s",
          }}
          aria-hidden
        />

        {/* Left — copy */}
        <div className="relative z-10 lg:pr-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#493fe2]/20 bg-[#493fe2]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-[#493fe2]">
            <span className="inline-block h-[7px] w-[7px] animate-proto-pulse rounded-full bg-[#5895c0]" />
            {t("hero.pill")}
          </div>

          <h1
            id="hero-heading"
            className="mb-5 text-[clamp(38px,5.5vw,72px)] font-black leading-[1] tracking-[-2px] text-[#1a1a2e]"
          >
            {t("hero.titleLine1")}<br />
            {t("hero.titleLine2A")}{" "}
            <span className="proto-gradient-text proto-accent-word">
              {t("hero.titleAccent")}
            </span>
            <br />
            {t("hero.titleLine3")}
          </h1>

          <p className="mb-9 max-w-[480px] text-[17px] leading-[1.65] text-[#6b7280]">
            {t("hero.subtitle")}
          </p>

          <div className="mb-11 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleJoin}
              className="inline-flex items-center gap-2 rounded-full border-0 bg-gradient-to-br from-[#493fe2] to-[#4684ea] px-9 py-4 text-[15px] font-bold text-white shadow-[0_8px_32px_rgba(73,63,226,0.35)] transition-transform duration-200 hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(73,63,226,0.45)]"
            >
              {t("hero.ctaPrimary")} <span aria-hidden>✦</span>
            </button>
            <a
              href="#opportunities"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#3c3e9e] transition-[gap] duration-200 hover:gap-3"
            >
              {t("hero.ctaSecondary")} <span aria-hidden>→</span>
            </a>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex">
              {["J", "S", "M", "A", "+"].map((ch, i) => (
                <div
                  key={i}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-white bg-gradient-to-br from-[#493fe2] to-[#5895c0] text-[13px] font-bold text-white ${i === 0 ? "ml-0" : "-ml-2.5"}`}
                >
                  {ch}
                </div>
              ))}
            </div>
            <p className="text-[13px] font-medium text-[#6b7280]">
              <strong className="text-[#1a1a2e]">{t("hero.proofStrong")}</strong>{" "}
              {t("hero.proofRest")}
            </p>
          </div>
        </div>

        {/* Right — visual cards */}
        <div className="relative z-10 flex flex-col gap-3.5">
          {/* Live opportunity */}
          <div className="relative overflow-hidden rounded-[20px] border border-[#493fe2]/10 bg-white p-5 shadow-[0_8px_40px_rgba(73,63,226,0.1),_0_1px_4px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 sm:px-6">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#493fe2]/10 px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[0.08em] text-[#493fe2]">
              <span className="inline-block h-[5px] w-[5px] animate-proto-pulse rounded-full bg-[#22c55e]" />
              {t("hero.cardLiveTag")}
            </div>
            <p className="mb-1 text-[15px] font-bold text-[#1a1a2e]">
              {t("hero.cardLiveTitle")}
            </p>
            <p className="mb-3.5 text-xs text-[#6b7280]">
              {t("hero.cardLiveMeta")}
            </p>
            <div className="h-1 overflow-hidden rounded-[10px] bg-[#493fe2]/10">
              <div
                className="h-full rounded-[10px] animate-proto-bar"
                style={{
                  width: "68%",
                  background: "linear-gradient(90deg, #493fe2, #5895c0)",
                }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-[#6b7280]">
              <span>{t("hero.cardLiveBarLeft")}</span>
              <span>{t("hero.cardLiveBarRight")}</span>
            </div>
            <button
              type="button"
              onClick={handleJoin}
              className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#493fe2] to-[#4684ea] px-5 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_32px_rgba(73,63,226,0.35)] transition-transform duration-200 hover:-translate-y-[2px]"
            >
              {t("hero.cardLiveCta")} <span aria-hidden>→</span>
            </button>
          </div>

          {/* Community */}
          <div className="relative overflow-hidden rounded-[20px] border border-[#493fe2]/10 p-5 text-white shadow-[0_8px_40px_rgba(73,63,226,0.1),_0_1px_4px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1 sm:px-6"
               style={{ background: "linear-gradient(135deg, #493fe2 0%, #3c3e9e 100%)" }}>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-[0.08em] text-white/90">
              <span className="inline-block h-[5px] w-[5px] animate-proto-pulse rounded-full bg-[#22c55e]" />
              {t("hero.cardCommTag")}
            </div>
            <p className="mb-3 text-[15px] font-bold">
              {t("hero.cardCommTitle")}
            </p>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/40 bg-white/25 text-base">
                💬
              </div>
              <p className="text-[13px] text-white/80">
                <strong className="text-white">{t("hero.cardCommStrong")}</strong>{" "}
                {t("hero.cardCommRest")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────── */}
      <div className="relative flex items-center gap-12 overflow-hidden bg-[#f7f7fc] px-6 py-7 font-poppins sm:px-10 md:px-16 lg:px-20">
        <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.08em] text-[#6b7280]">
          {t("hero.trustLabel")}
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-proto-marquee items-center gap-10 whitespace-nowrap">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, idx) => (
              <span
                key={`${logo.label}-${idx}`}
                className="whitespace-nowrap text-sm font-extrabold tracking-[-0.3px] text-[#6b7280] opacity-60 transition-opacity duration-200 hover:opacity-100"
              >
                <span aria-hidden className="mr-1">{logo.glyph}</span>
                {logo.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
