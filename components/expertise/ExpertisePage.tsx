import Contact from "@/components/home/Contact";
import Faq from "@/components/home/Faq";
import ArticleCard from "@/components/insights/ArticleCard";
import JsonLd from "@/components/seo/JsonLd";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WorkTile } from "@/components/work/WorkTile";
import { getArticle, type Article } from "@/lib/articles";
import { education, getCaseStudy, personalInfo } from "@/lib/content";
import { consumerPsychologyLink, expertise, type Expertise } from "@/lib/expertise";
import { absoluteUrl, breadcrumbNode, caseStudyPath, faqPageNode, PERSON_ID } from "@/lib/schema";

/** The other expertise pages (and the consumer psychology pillar), as a strip of links. */
export function ExpertiseLinks({ current, tone = "paper" }: { current?: string; tone?: "paper" | "paper-deep" }) {
  const links = [consumerPsychologyLink, ...expertise].filter((e) => e.path !== current);
  return (
    <Section id="expertise" tone={tone}>
      <SectionHeading
        id="expertise"
        eyebrow="Related expertise"
        title="The same work goes by several names"
        lede="Behavioral science, consumer psychology, consumer behavior, UX research and market insights overlap. Each page shows the part people usually search for."
      />
      <ul className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((l) => (
          <li key={l.path} className="bg-paper">
            <a href={l.path} className="group flex h-full flex-col p-7 transition-colors hover:bg-white/60">
              <span className="font-serif text-[1.45rem] leading-tight font-semibold">{l.name}</span>
              <span className="mt-3 flex-1 text-[0.9375rem] text-ink-dim">{l.blurb}</span>
              <span className="link-arrow mt-6 text-ember-ink">
                Read more <span aria-hidden="true">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const proofLinks = (slugs: string[]) =>
  slugs
    .map((slug) => getCaseStudy(slug))
    .filter((c) => c !== undefined)
    .map((c, i) => (
      <span key={c.slug}>
        {i > 0 && ", "}
        <a href={caseStudyPath(c.slug)} className="font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
          {c.name}
        </a>
      </span>
    ));

export default function ExpertisePage({ page: e }: { page: Expertise }) {
  const proof = e.proof.map((slug) => getCaseStudy(slug)).filter((c) => c !== undefined);
  const articles = e.articles.map((slug) => getArticle(slug)).filter((a): a is Article => Boolean(a));
  const mail = `mailto:${personalInfo.email}?subject=${encodeURIComponent(e.serviceName)}`;
  const roleMail = `mailto:${personalInfo.email}?subject=${encodeURIComponent(`Role: ${e.hiring.role}`)}`;
  const degree = education[0];
  const unknown = e.training.courses.filter((c) => !degree.coursework.includes(c));
  if (unknown.length) throw new Error(`lib/expertise.ts (${e.slug}): unknown course ${unknown.join(", ")}`);

  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "WebPage",
            "@id": absoluteUrl(e.path),
            url: absoluteUrl(e.path),
            name: e.metaTitle,
            description: e.description,
            about: { "@id": absoluteUrl(`${e.path}#service`) },
            author: { "@id": PERSON_ID },
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`${e.path}#service`),
            name: e.serviceName,
            serviceType: e.serviceName,
            description: e.summary,
            provider: { "@id": PERSON_ID },
            areaServed: personalInfo.serviceArea.map((name) => ({ "@type": "Place", name })),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: `${e.serviceName} services`,
              itemListElement: e.services.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.name, description: s.description },
              })),
            },
            subjectOf: proof.map((c) => ({ "@id": absoluteUrl(`${caseStudyPath(c.slug)}#work`) })),
          },
          faqPageNode(e.faqs, e.path),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: e.name, path: e.path },
          ]),
        ]}
      />

      <header className="stage relative overflow-hidden">
        <MediaSlot hue={e.hue} priority className="vignette absolute inset-0" />
        <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[2]" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-36 pb-20 sm:px-10 md:pt-48 md:pb-28">
          <p className="eyebrow">{e.eyebrow}</p>
          <h1 className="display mt-5 max-w-[16ch] text-[clamp(2.7rem,6.8vw,5.75rem)]">{e.h1}</h1>
          <p className="lede mt-8 max-w-[60ch] text-ivory-dim">{e.summary}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={mail} className="btn btn-ember">
              Book a consultation
            </a>
            <a href="#proof" className="btn btn-ghost">
              See the proof
            </a>
          </div>
          <p className="mt-7 max-w-[60ch] text-[0.9375rem] text-ivory-dim">
            {e.hiring.text}{" "}
            <a href={roleMail} className="font-semibold text-ivory underline decoration-ember underline-offset-4 hover:text-ember-bright">
              Email me about a role
            </a>{" "}
            or see my{" "}
            <a href={personalInfo.linkedin} className="font-semibold text-ivory underline decoration-ivory/30 underline-offset-4 hover:decoration-ember">
              LinkedIn
            </a>
            .
          </p>
        </div>
      </header>

      <Section id="services" tone="paper">
        <SectionHeading id="services" eyebrow="Services" title={e.servicesTitle} lede={e.servicesLede} />
        <dl
          className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10 md:grid-cols-2 lg:grid-cols-3"
          data-stagger
        >
          {e.services.map((s, i) => (
            <div key={s.name} className="reveal bg-paper p-8">
              <span className="font-mono text-xs text-ember-ink">{String(i + 1).padStart(2, "0")}</span>
              <dt className="mt-4 font-serif text-[1.6rem] leading-tight font-semibold">{s.name}</dt>
              <dd className="mt-3 text-[0.9375rem] text-ink-dim">{s.description}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 rounded-2xl bg-white/40 p-7 ring-1 ring-ink/10 md:p-8">
          <h3 className="font-mono text-[0.75rem] tracking-[0.16em] text-ember-ink uppercase">What I studied for this</h3>
          <p className="mt-3 text-[0.9375rem] text-ink-dim">
            {degree.degree}, {degree.institution}. {degree.format}.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {e.training.courses.map((c) => (
              <li key={c} className="rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-sm text-ink">
                {c}
              </li>
            ))}
          </ul>
          {e.training.note && <p className="mt-4 max-w-[70ch] text-[0.9375rem] text-ink-dim">{e.training.note}</p>}
        </div>
      </Section>

      <Section id="methods" tone="paper-deep">
        <SectionHeading id="methods" eyebrow="Methods" title={e.methodsTitle} />
        <div className="overflow-x-auto rounded-2xl ring-1 ring-ink/10">
          <table className="w-full min-w-[36rem] bg-white/40 text-left">
            <thead className="bg-ink/[0.05]">
              <tr>
                <th scope="col" className="p-4 text-sm font-semibold">Method</th>
                <th scope="col" className="p-4 text-sm font-semibold">The question it answers</th>
                <th scope="col" className="p-4 text-sm font-semibold">Where I used it</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {e.methods.map((m) => (
                <tr key={m.name}>
                  <th scope="row" className="p-4 align-top font-serif text-xl font-semibold">{m.name}</th>
                  <td className="p-4 align-top text-ink-dim">{m.question}</td>
                  <td className="p-4 align-top">{proofLinks(m.proof)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="compare-heading" className="display mt-24 text-[clamp(2rem,4vw,3.25rem)]">{e.compare.title}</h2>
        {e.compare.lede && <p className="mt-5 max-w-[60ch] text-ink-dim">{e.compare.lede}</p>}
        <div className="mt-10 overflow-x-auto rounded-2xl ring-1 ring-ink/10">
          <table className="w-full min-w-[36rem] bg-paper text-left">
            <thead className="bg-ink/[0.05]">
              <tr>
                {e.compare.columns.map((c, i) => (
                  <th key={c || i} scope="col" className="p-4 text-sm font-semibold">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {e.compare.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="p-4 align-top font-serif text-lg font-semibold">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="p-4 align-top text-ink-dim">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {e.compare.note && <p className="mt-6 max-w-[70ch] text-[0.9375rem] text-ink-dim">{e.compare.note}</p>}
      </Section>

      <Section id="proof" tone="stage">
        <SectionHeading id="proof" eyebrow="Proof" title={e.proofTitle} />
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2" data-stagger>
          {proof.map((c) => (
            <WorkTile key={c.slug} study={c} />
          ))}
        </div>
      </Section>

      {articles.length > 0 && (
        <Section id="writing" tone="paper-deep">
          <SectionHeading id="writing" eyebrow="Writing" title={e.writingTitle} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <a href="/insights" className="link-arrow mt-10 text-ink">
            All articles <span aria-hidden="true">→</span>
          </a>
        </Section>
      )}

      <ExpertiseLinks current={e.path} />
      <Faq items={e.faqs} title={e.faqTitle} tone="paper-deep" />
      <Contact />
    </>
  );
}
