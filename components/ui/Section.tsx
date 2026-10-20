import type { ReactNode } from "react";

/**
 * Sections alternate between two grounds: "stage" (charcoal, cinematic media)
 * and "paper" (ivory, anything people need to read). One heading rhythm —
 * eyebrow, serif title, optional lede — keeps the page reading as one document.
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
  const ground =
    tone === "stage" ? "stage" : tone === "paper" ? "paper" : "paper bg-paper-deep";
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={`${ground} relative ${className}`}
    >
      <div
        className={`mx-auto w-full max-w-[1280px] px-5 py-24 sm:px-10 md:py-32 ${innerClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <header className={`reveal mb-14 max-w-[60rem] md:mb-20 ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <Tag
        id={id ? `${id}-heading` : undefined}
        className="display mt-5 text-[clamp(2.4rem,5.4vw,4.5rem)]"
      >
        {title}
      </Tag>
      {lede ? <p className="lede mt-6 max-w-[58ch] opacity-80">{lede}</p> : null}
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
        <div
          key={f.k}
          className="flex items-baseline justify-between gap-6 border-t py-3 first:border-t-0"
        >
          <dt className="text-sm opacity-65">{f.k}</dt>
          <dd className="text-right text-sm font-medium">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}
