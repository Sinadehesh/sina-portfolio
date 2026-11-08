import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Method from "@/components/home/Method";
import Consulting from "@/components/home/Consulting";
import Experience from "@/components/home/Experience";
import Quote from "@/components/home/Quote";
import WorkGrid from "@/components/home/WorkGrid";
import Games from "@/components/home/Games";
import Books from "@/components/home/Books";
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
      <Marquee />
      <Method />
      <Consulting />
      <Experience />
      <Quote />
      <WorkGrid />
      <Games />
      <Books />
      <About />
      <Faq items={homeFaqs} numeral="08" />
      <Contact />
    </>
  );
}
