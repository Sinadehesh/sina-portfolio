import { personalInfo } from "@/lib/content";

const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent("Working together")}`;

/** "About the author", at the end of every article. First person, like the articles. */
export default function AuthorBox() {
  return (
    <section
      aria-labelledby="about-the-author"
      className="mt-20 grid gap-6 rounded-[8px] bg-charcoal-900 p-7 text-ivory sm:grid-cols-[5.5rem_1fr] md:p-9"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized asset */}
      <img
        src="/images/portrait.jpg"
        alt="Sina Dehesh"
        width={88}
        height={88}
        loading="lazy"
        className="h-[5.5rem] w-[5.5rem] rounded-full object-cover object-[50%_24%] ring-2 ring-ember"
      />
      <div>
        <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ember uppercase">About the author</p>
        <h2 id="about-the-author" className="mt-2 font-serif text-[1.6rem] leading-tight font-bold tracking-[-0.03em]">
          {personalInfo.name}
        </h2>
        <p className="mt-3 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ivory-dim">
          I’m a consumer psychology consultant and behavioral AI product builder in Milan, Italy. I trained in applied
          experimental psychology at the University of Milano-Bicocca (M.Sc.), ran 200 research interviews and a
          controlled experiment with 96 participants, and I design and ship the products I write about — Costly,
          OopsCupid and an n8n CRM automation engine among them. I consult on conversion, lead generation and
          go-to-market strategy.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={mailto} className="btn btn-ember !px-5 !py-3 text-sm">
            Work with me
          </a>
          <a href="/#about" rel="author" className="btn btn-ghost !px-5 !py-3 text-sm">
            About me
          </a>
          <a href="/work" className="btn btn-ghost !px-5 !py-3 text-sm">
            Case studies
          </a>
        </div>
      </div>
    </section>
  );
}
