import { useEffect, useRef, useCallback } from "react";
import { animate, stagger } from "animejs";
import type { AnimationParams } from "animejs";

type AnimateInViewOptions = {
  /** Selector for child elements to stagger (e.g. ".proof-card"). If not set, animates the root. */
  targets?: string;
  /** Stagger delay in ms between each target */
  staggerMs?: number;
  /** Root margin for IntersectionObserver (e.g. "-80px" or "0px 0px -100px 0px") */
  rootMargin?: string;
  /** Run only once when first visible */
  once?: boolean;
  /** Initial opacity */
  opacityFrom?: number;
  /** Initial Y offset (px) */
  yFrom?: number;
  /** Initial X offset (px) */
  xFrom?: number;
  /** Scale from (e.g. 0.9) */
  scaleFrom?: number;
  /** Duration in ms */
  duration?: number;
  /** Easing (e.g. "easeOutExpo") */
  easing?: string;
};

const DEFAULT_OPTIONS: AnimateInViewOptions = {
  staggerMs: 80,
  rootMargin: "-60px 0px -80px 0px",
  once: true,
  opacityFrom: 0,
  yFrom: 40,
  duration: 700,
  easing: "easeOutExpo",
};

export function useAnimeInView(options: AnimateInViewOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const hasAnimated = useRef(false);

  const runAnimation = useCallback(() => {
    const el = ref.current;
    if (!el || (opts.once && hasAnimated.current)) return;

    const targets = opts.targets ? el.querySelectorAll(opts.targets) : [el];
    if (!targets.length) return;

    hasAnimated.current = true;

    const params: AnimationParams = {
      opacity: [opts.opacityFrom ?? 0, 1],
      duration: opts.duration ?? 700,
      ease: opts.easing ?? "outCubic",
    };

    if (opts.yFrom !== undefined) params.translateY = [opts.yFrom, 0];
    if (opts.xFrom !== undefined) params.translateX = [opts.xFrom, 0];
    if (opts.scaleFrom !== undefined) params.scale = [opts.scaleFrom, 1];
    if (targets.length > 1 && opts.staggerMs) params.delay = stagger(opts.staggerMs, { start: 0 });

    animate(Array.from(targets), params);
  }, [opts.once, opts.targets, opts.staggerMs, opts.opacityFrom, opts.yFrom, opts.xFrom, opts.scaleFrom, opts.duration, opts.easing]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) runAnimation();
      },
      { rootMargin: opts.rootMargin ?? DEFAULT_OPTIONS.rootMargin, threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [runAnimation, opts.rootMargin]);

  return ref;
}
