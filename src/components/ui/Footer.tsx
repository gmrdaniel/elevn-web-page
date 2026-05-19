"use client";

import { useTranslation } from "react-i18next";

const LOGO_URL =
  "https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/elevn.png";

const FOOTER_LINK_KEYS = [
  { key: "nav.opportunities", href: "#opportunities" },
  { key: "nav.community", href: "#community" },
  { key: "nav.elevnStudio", href: "#elevn-studio" },
  { key: "nav.faqs", href: "#faq" },
] as const;

export function Footer({
  onOpenJoinForm,
}: {
  onOpenJoinForm?: () => void;
}) {
  const { t } = useTranslation();

  return (
    <footer className="flex flex-col items-center justify-between gap-5 bg-[#0d0d1a] px-6 py-10 font-poppins text-center sm:px-10 md:flex-row md:px-16 md:text-left lg:px-20">
      <a href="#elevn-is-your-space" className="inline-flex items-center gap-2" aria-label="ELEVN — Home">
        <img src={LOGO_URL} alt="ELEVN" className="h-7 w-auto object-contain" />
        <span className="proto-gradient-text text-lg font-black">ELEVN</span>
      </a>

      <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label="Footer">
        {FOOTER_LINK_KEYS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white/80"
          >
            {t(item.key)}
          </a>
        ))}
        {onOpenJoinForm ? (
          <button
            type="button"
            onClick={onOpenJoinForm}
            className="text-[13px] font-semibold text-white/70 transition-colors duration-200 hover:text-white"
          >
            {t("nav.secureYourSpot")}
          </button>
        ) : null}
      </nav>

      <p className="text-xs text-white/30">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
