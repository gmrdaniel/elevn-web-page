"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiBars3, HiXMark } from "react-icons/hi2";

const LOGO_URL =
  "https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/elevn.png";

const NAV_ITEMS = [
  { label: "ELEVN", href: "#elevn-is-your-space", id: "elevn-is-your-space" },
  { label: "Benefits", href: "#benefits", id: "benefits" },
  { label: "Community", href: "#community", id: "community" },
  { label: "Opportunities", href: "#opportunities", id: "opportunities" },
  { label: "ELEVN Studio", href: "#elevn-studio", id: "elevn-studio" },
  { label: "ELEVN Studio", href: "#elevn-studio", id: "elevn-studio" },
  { label: "Events", href: "#events-calendar", id: "events-calendar" },
  { label: "FAQs", href: "#faq", id: "faq" },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const ACTIVATION_OFFSET = 120; // px from top of viewport

/** Detects which section id is currently in view (active) based on scroll position. */
function useActiveSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const sections = SECTION_IDS.map((id) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        const top = el.getBoundingClientRect().top;
        return { id, top };
      });
      const passed = sections.filter((s) => s.top <= ACTIVATION_OFFSET);
      const next =
        passed.length > 0
          ? passed.reduce((a, b) => (a.top >= b.top ? a : b)).id
          : sections[0]?.id ?? null;
      setActiveId((prev) => (prev !== next ? next : prev));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return activeId;
}

function NavLinks({
  onNavigate,
  scrolled,
  activeId,
}: {
  onNavigate?: () => void;
  scrolled?: boolean;
  activeId?: string | null;
}) {
  return (
    <nav className="flex items-center gap-1" aria-label="Main">
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-white ${
              isActive
                ? scrolled
                  ? "bg-elevn-primary/10 text-elevn-primary dark:bg-elevn-primary/15 dark:text-elevn-primary"
                  : "bg-slate-900/5 text-slate-900 hover:bg-slate-900/8 dark:bg-elevn-primary/15 dark:text-elevn-primary dark:hover:bg-elevn-primary/20"
                : scrolled
                  ? "text-slate-900 hover:bg-slate-200/70 dark:text-slate-900 dark:hover:bg-slate-200/70 dark:hover:text-slate-900"
                  : "text-slate-800 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-900 dark:hover:bg-slate-200/70 dark:hover:text-slate-900"
            }`}
            aria-current={isActive ? "location" : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export function Header({ onOpenJoinForm }: { onOpenJoinForm?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-40 bg-white/95 shadow-md shadow-slate-200/80 backdrop-blur-sm transition-[box-shadow] duration-300 dark:bg-gradient-to-r dark:from-white dark:via-elevn-ice/95 dark:to-white dark:shadow-black/10"
        aria-label="Site header"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          <a
            href="#hero"
            className="flex items-center rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-200/80 dark:bg-white/95 dark:focus-visible:ring-offset-white"
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

          <div className="hidden items-center gap-2 min-[1140px]:flex">
            <NavLinks scrolled={scrolled} activeId={activeId} />
            {onOpenJoinForm ? (
              <Button
                size="sm"
                type="button"
                onClick={onOpenJoinForm}
                className="ml-2 font-semibold bg-elevn-primary text-white hover:opacity-95 hover:bg-elevn-primary/90 dark:bg-elevn-primary dark:text-white"
              >
                Secure your spot
              </Button>
            ) : (
              <Button
                size="sm"
                className="ml-2 font-semibold bg-elevn-primary text-white hover:opacity-95 hover:bg-elevn-primary/90 dark:bg-elevn-primary dark:text-white"
                asChild
              >
                <a href="https://laneta-portal.netlify.app/" target="_blank" rel="noopener noreferrer">
                Secure your spot
                </a>
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-slate-900 hover:bg-slate-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan min-[1140px]:hidden dark:text-slate-900 dark:hover:bg-slate-200/70"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <HiXMark className="text-2xl" aria-hidden />
            ) : (
              <HiBars3 className="text-2xl" aria-hidden />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-16 z-30 bg-slate-900/20 backdrop-blur-sm min-[1140px]:hidden dark:bg-elevn-dark/95 dark:backdrop-blur-md"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-16 z-30 border-b border-slate-200 bg-white px-4 py-6 shadow-lg min-[1140px]:hidden dark:border-white/10 dark:bg-elevn-dark dark:shadow-none"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-1" aria-label="Main">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className={`rounded-lg px-4 py-3 text-base font-medium ${
                        isActive
                          ? "bg-elevn-primary/15 text-elevn-primary dark:bg-elevn-primary/25 dark:text-elevn-cyan"
                          : "text-slate-900 hover:bg-slate-100 dark:text-elevn-ice dark:hover:bg-white/10"
                      }`}
                      aria-current={isActive ? "location" : undefined}
                    >
                      {item.label}
                    </a>
                  );
                })}
                {onOpenJoinForm ? (
                  <button
                    type="button"
                    onClick={() => { onOpenJoinForm(); closeMobile(); }}
                    className="mt-4 block w-full rounded-lg bg-elevn-primary py-3 text-center font-semibold text-white hover:bg-elevn-primary/90 dark:bg-elevn-primary dark:text-white"
                  >
                    Secure your spot
                  </button>
                ) : (
                  <a
                    href="https://laneta-portal.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    className="mt-4 block w-full rounded-lg bg-elevn-primary py-3 text-center font-semibold text-white hover:bg-elevn-primary/90 dark:bg-elevn-primary dark:text-white"
                  >
                    Secure your spot
                  </a>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
