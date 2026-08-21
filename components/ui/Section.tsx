import type { ReactNode } from "react";

/**
 * Every content section shares one rhythm: an eyebrow, a serif display
 * heading, an optional lede, then the body. Keeping it here means the
 * page reads as one document rather than a stack of unrelated cards.
 */
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-[1400px] px-6 py-28 sm:px-10 md:py-40 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  index,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  index?: string;
}) {
  return (
    <header className="reveal mb-16 md:mb-24">
      <div className="flex items-baseline gap-4">
        {index ? (
          <span className="font-mono text-[0.6875rem] tracking-[0.34em] text-ivory-faint">
            {index}
          </span>
        ) : null}
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="rule-gold mt-4 h-px w-full opacity-50" />
      <h2 className="display mt-8 max-w-[22ch] text-[clamp(2.5rem,6vw,5.25rem)] text-gradient-ivory">
        {title}
      </h2>
      {lede ? (
        <p className="mt-8 max-w-[62ch] text-[1.0625rem] leading-relaxed text-ivory-dim">
          {lede}
        </p>
      ) : null}
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
    <dl className={`grid gap-px overflow-hidden rounded-sm ${className}`}>
      {facts.map((f) => (
        <div
          key={f.k}
          className="flex items-baseline justify-between gap-6 border-t border-ivory/10 py-3 first:border-t-0"
        >
          <dt className="font-mono text-[0.6875rem] tracking-[0.22em] text-ivory-faint uppercase">
            {f.k}
          </dt>
          <dd className="text-right text-sm text-ivory-dim">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}
