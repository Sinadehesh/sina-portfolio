/** A single line, set large between sections, like an epigraph. */
export default function Quote() {
  return (
    <section aria-label="Principle" className="stage relative overflow-hidden">
      <div aria-hidden="true" className="light-canvas drift grain absolute inset-0 opacity-80" />
      <figure className="reveal relative z-10 mx-auto max-w-[1100px] px-5 py-28 text-center sm:px-10 md:py-40">
        <span aria-hidden="true" className="numeral block text-5xl text-gold">“</span>
        <blockquote className="display mt-2 text-[clamp(2rem,4.4vw,3.6rem)] italic">
          Behavior is not noise around the system. It is the system&rsquo;s operating condition.
        </blockquote>
        <figcaption className="eyebrow mt-10 flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
          Sina Dehesh
          <span aria-hidden="true" className="h-px w-10 bg-current opacity-50" />
        </figcaption>
      </figure>
    </section>
  );
}
