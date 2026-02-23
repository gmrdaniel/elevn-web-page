"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getScrollProgress(): number {
  if (typeof window === "undefined") return 0;
  const { scrollY } = window;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / docHeight));
}

export function ScrollNav() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => setProgress(getScrollProgress());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-elevn-surface"
        aria-hidden
      >
        <motion.div
          className="h-full min-h-[2px] bg-elevn-gradient"
          style={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>

      <div
        className="fixed right-0 top-0 z-40 hidden h-full w-0.5 bg-elevn-surface md:block"
        aria-hidden
      >
        <motion.div
          className="absolute left-0 top-0 min-w-[2px] w-full"
          style={{
            height: "0%",
            background: "linear-gradient(180deg, #2563eb, #06b6d4, #8b5cf6, #d946ef)",
          }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>
    </>
  );
}
