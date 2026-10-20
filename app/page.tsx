import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import WorkGrid from "@/components/home/WorkGrid";
import Principles from "@/components/home/Principles";
import Research from "@/components/home/Research";
import About from "@/components/home/About";
import Faq from "@/components/home/Faq";
import Contact from "@/components/home/Contact";
import JsonLd from "@/components/seo/JsonLd";
import { faqs } from "@/lib/faq";
import { allCaseStudyNodes, faqPageNode, profilePageNode } from "@/lib/schema";

const homeFaqs = faqs.filter((f) => f.topic !== "consumer-psychology");

export default function Page() {
  return (
    <>
      <JsonLd nodes={[profilePageNode(), faqPageNode(homeFaqs, "/"), ...allCaseStudyNodes()]} />
      <Hero />
      <Pillars />
      <WorkGrid />
      <Principles />
      <Research />
      <About />
      <Faq items={homeFaqs} />
      <Contact />
    </>
  );
}
