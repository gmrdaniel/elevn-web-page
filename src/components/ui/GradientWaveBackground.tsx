/**
 * Fluid gradient aurora — soft blurred blobs in ELEVN brand colors that
 * slowly drift and pulse on an infinite loop, replacing the page backdrop.
 */
export function GradientWaveBackground({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      style={{ background: "var(--wave-bg)" }}
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
    </div>
  );
}
