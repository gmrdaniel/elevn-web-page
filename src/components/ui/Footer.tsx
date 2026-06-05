"use client";

import { useTranslation } from "react-i18next";
import { ElevnBrand } from "@/components/ui/ElevnBrand";

const LOGO_URL = "/assets/images/logo%20eleven%20negro.png";

const FOOTER_LINK_KEYS = [
  { key: "nav.elevn", href: "#elevn-is-your-space" },
  { key: "nav.benefits", href: "#benefits" },
  { key: "nav.community", href: "#community" },
  { key: "nav.opportunities", href: "#opportunities" },
  { key: "nav.elevnStudio", href: "#elevn-studio" },
  { key: "nav.events", href: "#events-calendar" },
] as const;

export function Footer({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const { t } = useTranslation();

  return (
    <footer
      className="relative border-t border-white/10 bg-elevn-surface/60"
      aria-label="Site footer"
    >
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-elevn-cyan/50 to-transparent" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-14 lg:max-w-[1600px] lg:px-12 xl:max-w-[1800px] xl:px-16 2xl:max-w-[1920px] 2xl:px-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-4">
            <a
              href="#hero"
              className="inline-flex w-fit items-center rounded-lg border border-white/15 bg-elevn-ice px-2.5 py-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-elevn-surface"
              aria-label="ELEVN – Home"
            >
              <img
                src={LOGO_URL}
                alt="ELEVN"
                className="h-8 w-auto object-contain md:h-9"
                width={100}
                height={36}
              />
            </a>
            <p className="max-w-xs text-sm text-elevn-ice/70">
              {t("footer.description")}
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 md:gap-x-8" aria-label="Footer">
            {FOOTER_LINK_KEYS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-elevn-ice/85 transition-colors hover:text-elevn-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-elevn-surface rounded-sm"
              >
                <ElevnBrand>{t(item.key)}</ElevnBrand>
              </a>
            ))}
            {onOpenJoinForm ? (
              <button
                type="button"
                onClick={onOpenJoinForm}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#397aa7] to-[#84a3c4] px-5 py-2 text-xs font-semibold text-elevn-ice shadow-md shadow-elevn-primary/30 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-elevn-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-elevn-surface"
              >
                {t("nav.secureYourSpot")}
              </button>
            ) : (
              <a
                href="#join"
                className="text-sm font-semibold text-[#397aa7] transition-colors hover:text-[#397aa7]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-elevn-surface rounded-sm"
              >
                {t("nav.secureYourSpot")}
              </a>
            )}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between md:gap-0">
          <p className="text-xs text-elevn-ice/50">
            <ElevnBrand>{t("footer.copyright", { year: new Date().getFullYear() })}</ElevnBrand>
          </p>
          <p className="text-xs text-elevn-ice/40">
            {t("footer.disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
