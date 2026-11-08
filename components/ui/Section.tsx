import type { ReactNode } from "react";

/**
 * Sections alternate between two grounds: "stage" (graphite) and "paper"
 * (bone, for anything people need to read closely). One heading rhythm — an
 * index rule, a heavy Archivo title, an optional lede — keeps the page reading
 * as one document.
 */
export function Section({
  id,
  tone = "stage",
  children,
  className = "",
  innerClassName = "",
}: {
  id?: string;
  tone?: "stage" | "paper" | "paper-deep";
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  // Paper grounds carry a faint grain, so ivory reads as paper, not flat colour.
  const ground = tone === "stage" ? "stage" : tone === "paper" ? "paper grain" : "paper grain bg-paper-deep";
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className={`${ground} relative ${className}`}>
      <div className={`mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-10 md:py-36 ${innerClassName}`}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  numeral,
  title,
  lede,
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  eyebrow: string;
  /** Section index shown on the rule, e.g. "01". */
  numeral?: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <header className={`mb-14 md:mb-20 ${className}`}>
      <p className="reveal flex items-center gap-4 border-t border-current/15 pt-4 font-mono text-[0.75rem] tracking-[0.2em] uppercase">
        {numeral && <span className="section-index">({numeral})</span>}
        <span className="opacity-70">{eyebrow}</span>
        <span aria-hidden="true" className="ml-auto hidden opacity-40 sm:inline">
          Sina Dehesh
        </span>
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <Tag
          id={id ? `${id}-heading` : undefined}
          data-split
          className={`display text-[clamp(2.4rem,5.7vw,5.5rem)] ${lede ? "lg:col-span-8" : "lg:col-span-12"}`}
        >
          {title}
        </Tag>
        {lede ? <p className="reveal lede max-w-[46ch] opacity-75 lg:col-span-4 lg:pb-2">{lede}</p> : null}
      </div>
    </header>
  );
}

export function FactList({
  facts,
  className = "",
}: {
  facts: readonly { readonly k: string; readonly v: string }[];
  className?: string;
}) {
  return (
    <dl className={className}>
      {facts.map((f) => (
        <div key={f.k} className="flex items-baseline justify-between gap-6 border-t py-3 first:border-t-0">
          <dt className="text-sm opacity-65">{f.k}</dt>
          <dd className="text-right text-sm font-medium">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}
