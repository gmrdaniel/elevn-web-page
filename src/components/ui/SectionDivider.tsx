"use client";

export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px w-full bg-gradient-to-r from-transparent via-slate-200/70 to-transparent dark:via-white/10 ${className}`}
      aria-hidden
    />
  );
}
