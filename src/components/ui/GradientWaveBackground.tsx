import { useId } from "react";

function WaveContent({ gradId }: { gradId: string }) {
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#712f89" stopOpacity="0" />
          <stop offset="35%" stopColor="#83207f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#4a154e" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      <g className="gradient-wave">
        <path
          d="M0,420 C240,220 480,220 720,420 C960,620 1200,620 1440,420 L1440,900 L0,900 Z"
          fill={`url(#${gradId})`}
        />
        <path
          d="M1440,420 C1680,220 1920,220 2160,420 C2400,620 2640,620 2880,420 L2880,900 L1440,900 Z"
          fill={`url(#${gradId})`}
        />
      </g>
    </>
  );
}

export function GradientWaveBackground({ className = "" }: { className?: string }) {
  const reactId = useId().replace(/:/g, "");
  const gradId = `gwave-${reactId}`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{
        background: "linear-gradient(180deg, #120618 0%, #07020b 100%)",
      }}
    >
      {/* Móvil: preserva la proporción para que la ola no se vea apretada */}
      <svg
        className="absolute inset-0 h-full w-full md:hidden"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <WaveContent gradId={`${gradId}-m`} />
      </svg>

      {/* Desktop/tablet: se estira a lo ancho como antes */}
      <svg
        className="absolute inset-0 hidden h-full w-full md:block"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        <WaveContent gradId={`${gradId}-d`} />
      </svg>
    </div>
  );
}
