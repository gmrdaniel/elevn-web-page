"use client";

import { useTranslation } from "react-i18next";

type Status = "open" | "closing" | "invite";

const STATUS_STYLES: Record<Status, string> = {
  open: "bg-[#22c55e]/15 text-[#15803d]",
  closing: "bg-[#f59e0b]/15 text-[#92400e]",
  invite: "bg-[#493fe2]/15 text-[#493fe2]",
};

const OPPORTUNITIES = [
  {
    platformKey: "opportunities.metaPlatform",
    titleKey: "opportunities.metaTitle",
    descKey: "opportunities.metaDesc",
    status: "closing" as Status,
    glyph: "⚡",
    thumb: "linear-gradient(135deg, #1877F2, #1a1acc)",
    showCta: true,
  },
  {
    platformKey: "opportunities.gyrePlatform",
    titleKey: "opportunities.gyreTitle",
    descKey: "opportunities.gyreDesc",
    status: "open" as Status,
    glyph: "▶",
    thumb: "linear-gradient(135deg, #FF0000, #cc0000)",
    showCta: true,
  },
  {
    platformKey: "opportunities.tubiPlatform",
    titleKey: "opportunities.tubiTitle",
    descKey: "opportunities.tubiDesc",
    status: "invite" as Status,
    glyph: "🎬",
    thumb: "linear-gradient(135deg, #7C3AED, #3c3e9e)",
    showCta: true,
  },
  {
    platformKey: "opportunities.airPlatform",
    titleKey: "opportunities.airTitle",
    descKey: "opportunities.airDesc",
    status: "open" as Status,
    glyph: "🌍",
    thumb: "linear-gradient(135deg, #00b4d8, #0077b6)",
    showCta: true,
  },
  {
    platformKey: "opportunities.bdnPlatform",
    titleKey: "opportunities.bdnTitle",
    descKey: "opportunities.bdnDesc",
    status: "open" as Status,
    glyph: "✦",
    thumb: "linear-gradient(135deg, #f59e0b, #d97706)",
    showCta: true,
  },
] as const;

export function ActiveOpportunitiesSection({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();
  const handleJoin = onOpenJoinForm ?? (() => window.location.assign("#join"));

  return (
    <section
      id="opportunities"
      className="relative overflow-hidden bg-white pb-24 pt-2 font-poppins text-[#1a1a2e] scroll-mt-24"
      aria-labelledby="opportunities-heading"
    >
      <div className="flex flex-col items-start justify-between gap-4 px-6 pb-10 pt-20 sm:px-10 md:flex-row md:items-end md:px-16 lg:px-20 lg:pt-24">
        <div>
          <div className="mb-3 flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#493fe2]">
            <span className="inline-block h-0.5 w-6 rounded bg-[#493fe2]" />
            {t("opportunities.eyebrow")}
          </div>
          <h2
            id="opportunities-heading"
            className="m-0 text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.15] tracking-[-1px] text-[#1a1a2e]"
          >
            {t("opportunities.titleLine1")}
            <br />
            {t("opportunities.titleLine2")}
          </h2>
        </div>
        <button
          type="button"
          onClick={handleJoin}
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#3c3e9e] transition-[gap] duration-200 hover:gap-3"
        >
          {t("opportunities.seeAll")} <span aria-hidden>→</span>
        </button>
      </div>

      <div className="proto-no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:px-10 md:px-16 lg:px-20">
        {OPPORTUNITIES.map((opp) => (
          <article
            key={opp.titleKey}
            className="flex w-[300px] min-w-[300px] flex-shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-[#493fe2]/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(73,63,226,0.14)]"
          >
            <div
              className="relative flex h-[140px] items-center justify-center overflow-hidden"
              style={{ background: opp.thumb }}
            >
              <span
                aria-hidden
                className="text-[40px] text-white/60"
                style={{ filter: "brightness(0) invert(1)" }}
              >
                {opp.glyph}
              </span>
              <span
                className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] ${STATUS_STYLES[opp.status]}`}
              >
                {t(`opportunities.status.${opp.status}`)}
              </span>
            </div>
            <div className="flex flex-1 flex-col px-5 py-6">
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#6b7280]">
                {t(opp.platformKey)}
              </p>
              <h3 className="mb-1.5 text-base font-extrabold text-[#1a1a2e]">
                {t(opp.titleKey)}
              </h3>
              <p className="mb-4 flex-1 text-[13px] leading-[1.5] text-[#6b7280]">
                {t(opp.descKey)}
              </p>
              <button
                type="button"
                onClick={handleJoin}
                className="inline-flex items-center gap-1.5 self-start text-[13px] font-bold text-[#493fe2] transition-[gap] duration-200 hover:gap-2.5"
              >
                {t("opportunities.applyNow")} <span aria-hidden>→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
