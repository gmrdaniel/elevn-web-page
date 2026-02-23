import { useEffect, useRef } from "react";
import { animate } from "animejs";

type SectionTransitionProps = {
  inView: boolean;
  className?: string;
};

export function SectionTransition({ inView, className = "" }: SectionTransitionProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || !pathRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const path = pathRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    animate(path, {
      strokeDashoffset: [length, 0],
      duration: 550,
      ease: "outExpo",
    });
  }, [inView]);

  return (
    <div
      className={`pointer-events-none w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1200 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-full"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M0 6 Q300 0 600 6 T1200 6"
          stroke="url(#section-line-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id="section-line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="transparent" />
            <stop offset="15%" stopColor="#2563eb" stopOpacity="0.7" />
            <stop offset="35%" stopColor="#06b6d4" />
            <stop offset="65%" stopColor="#8b5cf6" />
            <stop offset="85%" stopColor="#d946ef" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
