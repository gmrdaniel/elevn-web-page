"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiSun, HiMoon } from "react-icons/hi2";

const STORAGE_KEY = "elevn-theme";

function getInitialDark(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
}

export function ThemeSwitch() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = getInitialDark();
    setDark(initial);
    applyTheme(initial);
    setMounted(true);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const next = !prev;
      applyTheme(next);
      return next;
    });
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 sm:bottom-8 sm:right-8"
      aria-hidden
    >
      <motion.button
        type="button"
        onClick={toggle}
        aria-label={dark ? "Usar tema claro" : "Usar tema oscuro"}
        className="relative flex h-11 w-[4.25rem] shrink-0 items-center rounded-full border-2 border-slate-200 bg-slate-100 shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elevn-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-white/15 dark:bg-elevn-surface dark:focus-visible:ring-offset-elevn-dark"
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {/* Track icons */}
        <span className="pointer-events-none absolute left-2.5 flex h-6 w-6 items-center justify-center text-slate-500 dark:text-slate-400">
          <HiSun className="h-5 w-5" aria-hidden />
        </span>
        <span className="pointer-events-none absolute right-2.5 flex h-6 w-6 items-center justify-center text-slate-400 dark:text-slate-500">
          <HiMoon className="h-5 w-5" aria-hidden />
        </span>
        {/* Thumb */}
        <motion.span
          className="absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-amber-500 shadow-md dark:bg-elevn-ice dark:text-indigo-400"
          initial={false}
          animate={{
            x: dark ? 36 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          {dark ? (
            <HiMoon className="h-4 w-4" aria-hidden />
          ) : (
            <HiSun className="h-4 w-4" aria-hidden />
          )}
        </motion.span>
      </motion.button>
    </div>
  );
}
