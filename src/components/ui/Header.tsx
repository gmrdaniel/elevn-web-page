"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HiBars3, HiXMark } from "react-icons/hi2";

const LOGO_URL =
  "https://la-neta-videos-ubicacion.s3.us-east-1.amazonaws.com/elevn.png";

const NAV_ITEMS = [
  { label: "About", href: "#about", id: "about" },
  { label: "For Creators", href: "#creators", id: "creators" },
  { label: "Benefits", href: "#benefits", id: "benefits" },
  { label: "How it works", href: "#how-it-works", id: "how-it-works" },
  { label: "Opportunities", href: "#opportunities", id: "opportunities" },
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
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-elevn-dark ${
              isActive
                ? scrolled
                  ? "bg-elevn-primary/10 text-elevn-primary dark:bg-elevn-primary/20 dark:text-elevn-cyan"
                  : "bg-white/25 text-slate-900 dark:bg-white/20 dark:text-elevn-ice"
                : scrolled
                  ? "text-slate-900 hover:bg-slate-200/70 dark:text-elevn-dark/85 dark:hover:bg-elevn-dark/10 dark:hover:text-elevn-dark"
                  : "text-slate-900 hover:bg-white/20 hover:text-slate-900 dark:text-elevn-ice/90 dark:hover:bg-white/10 dark:hover:text-elevn-ice"
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
        className={`fixed left-0 right-0 top-0 z-40 transition-[background-color,box-shadow,color] duration-300 ${
          scrolled
            ? "bg-white/95 shadow-md shadow-slate-200/80 backdrop-blur-sm dark:bg-gradient-to-r dark:from-white dark:via-elevn-ice/95 dark:to-white dark:shadow-black/10"
            : "bg-white/10 backdrop-blur-md dark:bg-transparent"
        }`}
        aria-label="Site header"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
          <a
            href="#hero"
            className={`flex items-center rounded-lg border px-2.5 py-1.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 ${
              scrolled
                ? "border-slate-200 bg-white focus-visible:ring-offset-white dark:border-elevn-dark/10 dark:bg-elevn-ice dark:focus-visible:ring-offset-white"
                : "border-slate-200/80 bg-white/95 focus-visible:ring-offset-slate-50 dark:border-white/15 dark:bg-elevn-ice dark:focus-visible:ring-offset-elevn-dark"
            }`}
            aria-label="Elevn – Home"
          >
            <img
              src={LOGO_URL}
              alt="Elevn"
              className="h-8 w-auto object-contain md:h-9"
              width={100}
              height={36}
            />
          </a>

          <div className="hidden items-center gap-2 md:flex">
            <NavLinks scrolled={scrolled} activeId={activeId} />
            {onOpenJoinForm ? (
              <Button
                size="sm"
                type="button"
                onClick={onOpenJoinForm}
                className={`ml-2 font-semibold hover:opacity-95 ${
                  scrolled
                    ? "bg-elevn-primary text-white hover:bg-elevn-primary/90 dark:bg-elevn-primary dark:text-white"
                    : "bg-elevn-primary text-white hover:bg-elevn-primary/90 dark:bg-elevn-gradient dark:text-elevn-ice"
                }`}
              >
                Join
              </Button>
            ) : (
              <Button
                size="sm"
                className={`ml-2 font-semibold hover:opacity-95 ${
                  scrolled
                    ? "bg-elevn-primary text-white hover:bg-elevn-primary/90 dark:bg-elevn-primary dark:text-white"
                    : "bg-elevn-primary text-white hover:bg-elevn-primary/90 dark:bg-elevn-gradient dark:text-elevn-ice"
                }`}
                asChild
              >
                <a href="https://laneta-portal.netlify.app/" target="_blank" rel="noopener noreferrer">
                  Join
                </a>
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className={`flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan md:hidden ${
              scrolled
                ? "text-slate-900 hover:bg-slate-200/70 dark:text-elevn-dark dark:hover:bg-elevn-dark/10"
                : "text-slate-900 hover:bg-white/20 dark:text-elevn-ice dark:hover:bg-white/10"
            }`}
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
              className="fixed inset-0 top-16 z-30 bg-slate-900/20 backdrop-blur-sm md:hidden dark:bg-elevn-dark/95 dark:backdrop-blur-md"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-16 z-30 border-b border-slate-200 bg-white px-4 py-6 shadow-lg md:hidden dark:border-white/10 dark:bg-elevn-dark dark:shadow-none"
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
                    className="mt-4 block w-full rounded-lg bg-elevn-primary py-3 text-center font-semibold text-white hover:bg-elevn-primary/90 dark:bg-elevn-gradient dark:text-elevn-ice"
                  >
                    Join
                  </button>
                ) : (
                  <a
                    href="https://laneta-portal.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobile}
                    className="mt-4 block w-full rounded-lg bg-elevn-primary py-3 text-center font-semibold text-white hover:bg-elevn-primary/90 dark:bg-elevn-gradient dark:text-elevn-ice"
                  >
                    Join
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
