"use client";

const LOGO_URL =
  "https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/elevn.png";

const FOOTER_LINKS = [
  { label: "About", href: "#elevn-is-your-space" },
  { label: "For Creators", href: "#creators" },
  { label: "Benefits", href: "#benefits" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "ELEVN Studio", href: "#elevn-studio" },
  { label: "Events", href: "#events-calendar" },
] as const;

export function Footer() {
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
              The professional ecosystem for creators. Opportunities, community, and growth in one place.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 md:gap-x-8" aria-label="Footer">
            {FOOTER_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-elevn-ice/85 transition-colors hover:text-elevn-ice focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-elevn-surface rounded-sm"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#join"
              className="text-sm font-semibold text-elevn-cyan transition-colors hover:text-elevn-cyan/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-elevn-surface rounded-sm"
            >
              Join
            </a>
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between md:gap-0">
          <p className="text-xs text-elevn-ice/50">
            © {new Date().getFullYear()} ELEVN. Part of the La Neta ecosystem.
          </p>
          <p className="text-xs text-elevn-ice/40">
            Free registration. Access is subject to profile validation.
          </p>
        </div>
      </div>
    </footer>
  );
}
