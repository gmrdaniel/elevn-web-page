import { Fragment, type ReactNode } from "react";

function highlightString(text: string): ReactNode[] {
  return text.split(/(ELEVEN)/g).map((part, i) =>
    part === "ELEVEN" ? (
      <span key={i} className="font-eleven">
        ELEVEN
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
