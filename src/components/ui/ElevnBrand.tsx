import { Fragment, type ReactNode } from "react";

function highlightString(text: string): ReactNode[] {
  return text.split(/(ELEVN)/g).map((part, i) =>
    part === "ELEVN" ? (
      <span key={i} className="font-eleven">
        ELEVN
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export function ElevnBrand({ children }: { children: ReactNode }) {
  if (typeof children === "string") {
    return <>{highlightString(children)}</>;
  }
  return <>{children}</>;
}
