/** The principle behind the work, set large. Words light up as it scrolls through. */
export default function Quote() {
  return (
    <section aria-label="Principle" className="stage relative overflow-hidden">
      <div aria-hidden="true" className="manifesto-glow pointer-events-none absolute inset-0" />
      <figure className="relative mx-auto max-w-[1440px] px-5 py-32 sm:px-10 md:py-48">
        <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ember uppercase">(Principle)</p>
        <blockquote data-scrub-words className="display mt-8 max-w-[19ch] text-[clamp(2.4rem,6.6vw,6.75rem)]">
          Behavior is not noise around the system. It is the system&rsquo;s{" "}
          <span className="text-ember">operating condition.</span>
        </blockquote>
        <figcaption className="mt-14 flex items-center gap-4 font-mono text-[0.75rem] tracking-[0.2em] text-ivory-faint uppercase">
          <span aria-hidden="true" className="h-px w-12 bg-ember" />
          Sina Dehesh
        </figcaption>
      </figure>
    </section>
  );
}
