import type { Metadata } from "next";
import Contact from "@/components/home/Contact";
import Faq from "@/components/home/Faq";
import JsonLd from "@/components/seo/JsonLd";
import { MediaSlot } from "@/components/ui/MediaSlot";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WorkTile } from "@/components/work/WorkTile";
import { consumerPsychology, getCaseStudy, personalInfo } from "@/lib/content";
import { faqs } from "@/lib/faq";
import { absoluteUrl, breadcrumbNode, caseStudyPath, faqPageNode, PERSON_ID } from "@/lib/schema";

const path = consumerPsychology.path.replace(/\/$/, "");
const title = `Consumer psychology consultant in Milan, Italy — ${personalInfo.name}`;
const description =
  "Sina Dehesh is a Milan-based consumer psychology consultant: conversion and funnel psychology audits, B2B lead generation, consumer research, pricing psychology and behavioral product design — researched, built and measured by one person.";
const summary =
  "Sina Dehesh is a Milan-based consumer psychology consultant who turns research on how people decide and buy into websites, funnels and products that convert. Trained in experimental psychology at the University of Milano-Bicocca, Sina diagnoses the psychological barrier, redesigns the offer around it, and builds and measures the fix personally.";

const topicFaqs = faqs.filter((f) => f.topic === "consumer-psychology");
const proof = ["optimolds", "oopscupid", "costly", "daily-sublime"]
  .map((slug) => getCaseStudy(slug))
  .filter((c) => c !== undefined);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { title, description, url: path },
};

export default function ConsumerPsychologyPage() {
  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "WebPage",
            "@id": absoluteUrl(path),
            url: absoluteUrl(path),
            name: title,
            description,
            about: { "@id": absoluteUrl(`${path}#service`) },
            author: { "@id": PERSON_ID },
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`${path}#service`),
            name: "Consumer psychology consulting",
            serviceType: "Consumer psychology consulting",
            description: summary,
            provider: { "@id": PERSON_ID },
            areaServed: personalInfo.serviceArea.map((name) => ({ "@type": "Place", name })),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Consumer psychology services",
              itemListElement: consumerPsychology.services.map((s) => ({
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: s.name, description: s.description },
              })),
            },
            subjectOf: proof.map((c) => ({ "@id": absoluteUrl(`${caseStudyPath(c.slug)}#work`) })),
          },
          faqPageNode(topicFaqs, path),
          breadcrumbNode([
            { name: "Home", path: "/" },
            { name: "Consumer psychology consulting", path },
          ]),
        ]}
      />

      <header className="stage relative overflow-hidden">
        <MediaSlot video="/videos/pillar-consumer-psychology.mp4" hue="#c8a45c" priority className="vignette absolute inset-0" />
        <div aria-hidden="true" className="hero-scrim absolute inset-0 z-[2]" />
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 pt-36 pb-20 sm:px-10 md:pt-48 md:pb-28">
          <p className="eyebrow">Consumer psychology consulting</p>
          <h1 className="display mt-5 max-w-[16ch] text-[clamp(2.7rem,6.8vw,5.75rem)]">
            Consumer psychology consultant in Milan, Italy
          </h1>
          <p className="lede mt-8 max-w-[58ch] text-ivory-dim">{summary}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={`mailto:${personalInfo.email}?subject=${encodeURIComponent("Consumer psychology consulting")}`}
              className="btn btn-gold"
            >
              Book a consultation
            </a>
            <a href="#proof" className="btn btn-ghost">
              See the proof
            </a>
          </div>
        </div>
      </header>

      <Section id="services" tone="paper">
        <SectionHeading
          id="services"
          eyebrow="Services"
          title="What can a consumer psychology consultant do for you?"
          lede="Six engagements, from a one-off funnel audit to designing and building the product change."
        />
        <dl className="grid gap-px overflow-hidden rounded-2xl bg-ink/10 ring-1 ring-ink/10 md:grid-cols-2 lg:grid-cols-3" data-stagger>
          {consumerPsychology.services.map((s, i) => (
            <div key={s.name} className="reveal bg-paper p-8">
              <span className="font-mono text-xs text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
              <dt className="mt-4 font-serif text-[1.6rem] leading-tight font-semibold">{s.name}</dt>
              <dd className="mt-3 text-[0.9375rem] text-ink-dim">{s.description}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="principles" tone="paper-deep">
        <SectionHeading
          id="principles"
          eyebrow="Principles"
          title="Which consumer psychology principles do I apply — and where?"
        />
        <div className="overflow-x-auto rounded-2xl ring-1 ring-ink/10">
          <table className="w-full min-w-[36rem] bg-white/40 text-left">
            <thead className="bg-ink/[0.05]">
              <tr>
                <th scope="col" className="p-4 text-sm font-semibold">Principle</th>
                <th scope="col" className="p-4 text-sm font-semibold">What it changes</th>
                <th scope="col" className="p-4 text-sm font-semibold">Shipped in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {consumerPsychology.principles.map((p) => (
                <tr key={p.name}>
                  <th scope="row" className="p-4 align-top font-serif text-xl font-semibold">{p.name}</th>
                  <td className="p-4 align-top text-ink-dim">{p.effect}</td>
                  <td className="p-4 align-top">
                    {p.proof
                      .map((slug) => getCaseStudy(slug))
                      .filter((c) => c !== undefined)
                      .map((c, i) => (
                        <span key={c.slug}>
                          {i > 0 && ", "}
                          <a href={caseStudyPath(c.slug)} className="font-semibold underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                            {c.name}
                          </a>
                        </span>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="display mt-24 text-[clamp(2rem,4vw,3.25rem)]">How does an engagement work?</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {consumerPsychology.process.map((p, i) => (
            <li key={p.step} className="rounded-2xl bg-paper p-6 ring-1 ring-ink/10">
              <span className="font-mono text-xs text-gold-ink">Step {i + 1}</span>
              <p className="mt-3 font-serif text-2xl font-semibold">{p.step}</p>
              <p className="mt-2 text-[0.9375rem] text-ink-dim">{p.detail}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="proof" tone="stage">
        <SectionHeading id="proof" eyebrow="Proof" title="Consumer psychology in practice" />
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2" data-stagger>
          {proof.map((c) => (
            <WorkTile key={c.slug} study={c} />
          ))}
        </div>
      </Section>

      <Faq items={topicFaqs} title="Consumer psychology consulting: questions" tone="paper" />
      <Contact />
    </>
  );
}
