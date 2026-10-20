import type { CaseStudy, Investment } from "@/lib/content";
import { personalInfo } from "@/lib/content";

/** Fundraising section for a case study that is raising. */
export default function InvestmentSection({ study: c, inv }: { study: CaseStudy; inv: Investment }) {
  const deck = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`${c.name} — investor deck`)}`;
  return (
    <section id="investment" className="stage relative overflow-hidden" aria-labelledby="investment-heading">
      <div aria-hidden="true" className="light-canvas grain absolute inset-0 opacity-60" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-20 sm:px-10 md:py-28">
        <p className="eyebrow">Investment</p>
        <h2 id="investment-heading" className="display mt-4 max-w-[20ch] text-[clamp(2.2rem,5vw,4rem)]">
          {c.name} is raising
        </h2>
        <p className="mt-5 inline-flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-void">{inv.stage}</span>
          {inv.amount && <span className="rounded-full border border-gold/50 px-4 py-1.5 text-sm">{inv.amount}</span>}
        </p>
        <p className="mt-8 max-w-[62ch] border-l-2 border-gold pl-5 font-serif text-[1.4rem] leading-snug italic">
          {inv.status}
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="rounded-2xl bg-charcoal-800/90 p-7 ring-1 ring-ivory/10 sm:p-9 lg:col-span-7">
            <h3 className="eyebrow">What the round funds: the 12-week plan</h3>
            <ol className="mt-6 space-y-6">
              {inv.plan.map((step, i) => (
                <li key={step.when} className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
                  <span className="font-serif text-xl font-semibold text-gold-bright">{step.when}</span>
                  <span className="text-ivory-dim">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.what}
                  </span>
                </li>
              ))}
            </ol>
            <h3 className="eyebrow mt-10">How success is measured</h3>
            <ul className="mt-4 space-y-2 text-[0.9375rem] text-ivory-dim">
              {inv.successMetrics.map((m) => (
                <li key={m} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-4 shrink-0 bg-gold" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-charcoal-800/90 p-7 ring-1 ring-ivory/10 sm:p-9 lg:col-span-5">
            <h3 className="eyebrow">Use of funds, in priority order</h3>
            <ol className="mt-6 space-y-5">
              {inv.useOfFunds.map((u, i) => (
                <li key={u} className="flex gap-4">
                  <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.9375rem] text-ivory-dim">{u}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {inv.market.map((m) => (
              <div key={m.label} className="rounded-2xl bg-charcoal-800/90 p-7 ring-1 ring-ivory/10">
                <p className="text-sm text-ivory-faint">{m.label}</p>
                <p className="mt-2 font-serif text-[1.75rem] leading-tight font-semibold">{m.value}</p>
                <a href={m.url} target="_blank" rel="noopener" className="mt-3 inline-block text-xs text-ivory-faint underline underline-offset-4 hover:text-ivory">
                  Source: {m.source}
                </a>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-charcoal-800/90 p-7 ring-1 ring-ivory/10 lg:col-span-5">
            <h3 className="eyebrow">First thousand users</h3>
            <p className="mt-3 text-[0.9375rem] text-ivory-dim">{inv.beachhead}</p>
            <h3 className="eyebrow mt-6">The ask</h3>
            <p className="mt-3 text-[0.9375rem] text-ivory-dim">{inv.ask}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href={deck} className="btn btn-gold">
            Request the investor deck
          </a>
          <a href={`mailto:${personalInfo.email}?subject=${encodeURIComponent(`${c.name} — intro call`)}`} className="btn btn-ghost">
            Book an intro call
          </a>
        </div>
      </div>
    </section>
  );
}
