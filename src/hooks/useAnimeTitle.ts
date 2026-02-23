import { useEffect, useRef } from "react";
import { animate, stagger, splitText } from "animejs";
import type { AnimationParams } from "animejs";

type UseAnimeTitleOptions = {
  /** Run when element enters viewport (IntersectionObserver). If false, runs on mount. */
  inView?: boolean;
  /** Root margin for inView observer */
  rootMargin?: string;
  /** Stagger delay in ms between chars */
  staggerMs?: number;
  /** One-time entrance only (no loop). Default true. */
  once?: boolean;
  /** Number of last words to style with .title-gradient (0 = none). Default 2 (e.g. "professional creators"). */
  gradientLastWords?: number;
};

const DEFAULT_OPTIONS: UseAnimeTitleOptions = {
  inView: true,
  rootMargin: "-60px 0px -80px 0px",
  staggerMs: 45,
  once: true,
};

export function useAnimeTitle(options: UseAnimeTitleOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const hasAnimated = useRef(false);
  const splitterRef = useRef<ReturnType<typeof splitText> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (opts.once && hasAnimated.current) return;
      hasAnimated.current = true;

      const splitter = splitText(el, { words: true, chars: true });
      splitterRef.current = splitter;
      const { chars, words } = splitter;

      if (!chars.length) return;

      const gradientCount = opts.gradientLastWords ?? 2;
      if (gradientCount > 0) {
        const wordEls = Array.from(words) as HTMLElement[];
        const start = Math.max(0, wordEls.length - gradientCount);
        for (let i = start; i < wordEls.length; i++) {
          wordEls[i].classList.add("title-gradient");
        }
      }

      const animationParams: AnimationParams = {
        y: [
          { to: "-1.5rem", ease: "outExpo", duration: 500 },
          { to: 0, ease: "outBounce", duration: 650, delay: 80 },
        ],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(opts.staggerMs ?? 45, { start: 0 }),
        ease: "outCubic",
      };

      animate(Array.from(chars), animationParams);
    };

    if (!opts.inView) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) run();
      },
      { rootMargin: opts.rootMargin ?? DEFAULT_OPTIONS.rootMargin, threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      splitterRef.current?.revert();
    };
  }, [opts.inView, opts.once, opts.staggerMs, opts.rootMargin, opts.gradientLastWords]);

  return ref;
}
