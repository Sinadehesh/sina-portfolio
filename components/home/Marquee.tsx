import type { CSSProperties } from "react";

const disciplines = [
  "Consumer psychology",
  "Conversion strategy",
  "Lead generation",
  "Market fit & go-to-market",
  "Behavioral AI products",
  "Quantitative UX research",
  "Full-stack builds",
];

function Star() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mx-[0.45em] h-[0.62em] w-[0.62em] shrink-0">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="currentColor" />
    </svg>
  );
}

function Row({ items, speed, reverse = false }: { items: string[]; speed: string; reverse?: boolean }) {
  return (
    <div
      className="marquee"
      style={{ "--marquee-speed": speed, animationDirection: reverse ? "reverse" : undefined } as CSSProperties}
    >
      {[0, 1].map((copy) => (
        <span key={copy} className="flex shrink-0 items-center">
          {items.map((item) => (
            <span key={item} className="flex items-center whitespace-nowrap">
              {item}
              <Star />
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

/**
 * Two crossing tapes of what I do, between the hero and the work. The ember
 * tape carries the words; the outlined one behind it runs the other way.
 */
export default function Marquee() {
  return (
    <section aria-label="What I do" className="stage relative overflow-hidden pt-14 pb-10 md:pt-20 md:pb-12">
      <p className="sr-only">{disciplines.join(", ")}.</p>
      <div aria-hidden="true" className="tape tape-back marquee-wrap">
        <Row items={[...disciplines].reverse()} speed="70s" reverse />
      </div>
      <div aria-hidden="true" className="tape tape-front marquee-wrap">
        <Row items={disciplines} speed="48s" />
      </div>
    </section>
  );
}
