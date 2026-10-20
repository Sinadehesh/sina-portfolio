import type {
  BreadcrumbList,
  CreativeWork,
  FAQPage,
  Graph,
  Person,
  ProfilePage,
  SoftwareApplication,
  Thing,
  WebPage,
  WebSite,
} from "schema-dts";
import {
  certifications,
  education,
  knowsAbout,
  personalInfo,
  publishedCaseStudies,
  site,
  targetRoles,
  workExperience,
  type CaseStudy,
} from "./content";
import type { FaqItem } from "./faq";

export const absoluteUrl = (path: string) => new URL(path, site.url).href;

export const PERSON_ID = absoluteUrl("/#person");
export const WEBSITE_ID = absoluteUrl("/#website");
const STUDIO_ID = absoluteUrl("/#studio");

const personRef = { "@id": PERSON_ID } as const;

const university = {
  "@type": "CollegeOrUniversity",
  name: "University of Milano-Bicocca",
  url: "https://www.unimib.it",
  sameAs: "https://en.wikipedia.org/wiki/University_of_Milano-Bicocca",
} as const;

export const caseStudyPath = (slug: string) => `/work/${slug}`;
const caseStudyId = (slug: string) => absoluteUrl(`${caseStudyPath(slug)}#work`);

export function personNode(): Person {
  const studio = workExperience[0];
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: personalInfo.name,
    url: site.url,
    image: absoluteUrl(site.ogImage),
    email: `mailto:${personalInfo.email}`,
    jobTitle: personalInfo.jobTitles,
    description: personalInfo.summary,
    address: {
      "@type": "PostalAddress",
      addressLocality: personalInfo.locality,
      addressRegion: personalInfo.region,
      addressCountry: personalInfo.countryCode,
    },
    alumniOf: university,
    worksFor: {
      "@type": "Organization",
      "@id": STUDIO_ID,
      name: studio.company,
      founder: personRef,
    },
    hasOccupation: personalInfo.jobTitles.map((name) => ({
      "@type": "Occupation",
      name,
      occupationLocation: [
        { "@type": "City", name: "Milan" },
        { "@type": "City", name: "Turin" },
        { "@type": "Country", name: "Italy" },
      ],
      skills: knowsAbout.slice(0, 12).map((k) => k.name).join(", "),
    })),
    hasCredential: [
      ...education.map((e) => ({
        "@type": "EducationalOccupationalCredential" as const,
        credentialCategory: "degree",
        name: e.degree,
        recognizedBy: university,
      })),
      ...certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential" as const,
        credentialCategory: "certificate",
        name: c.name,
        recognizedBy: { "@type": "Organization" as const, name: c.issuer },
      })),
    ],
    knowsAbout: knowsAbout.map(
      (k): Thing =>
        k.sameAs ? { "@type": "Thing", name: k.name, sameAs: k.sameAs } : k.name,
    ),
    knowsLanguage: personalInfo.languages.map((l) => ({
      "@type": "Language",
      name: l.name,
      alternateName: l.code,
    })),
    makesOffer: targetRoles.map((role) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: role.title,
        description: role.pitch,
        provider: personRef,
      },
      areaServed: personalInfo.serviceArea,
    })),
    sameAs: [personalInfo.github, personalInfo.linkedin].filter(Boolean),
  };
}

export function websiteNode(): WebSite {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: personalInfo.name,
    description: site.description,
    inLanguage: "en",
    publisher: personRef,
  };
}

export function profilePageNode(): ProfilePage {
  return {
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profilepage"),
    url: site.url,
    name: site.title,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: personRef,
    about: personRef,
  };
}

export function caseStudyNode(c: CaseStudy): SoftwareApplication | CreativeWork {
  const common = {
    "@id": caseStudyId(c.slug),
    name: c.name,
    alternateName: c.tagline,
    description: c.summary,
    url: c.url ?? absoluteUrl(caseStudyPath(c.slug)),
    mainEntityOfPage: absoluteUrl(caseStudyPath(c.slug)),
    image: absoluteUrl(c.image ?? site.ogImage),
    keywords: c.keywords.join(", "),
    creator: personRef,
    author: personRef,
    creativeWorkStatus: c.status,
  };

  if (c.schemaType === "CreativeWork") {
    return {
      "@type": "CreativeWork",
      ...common,
      genre: c.category,
      about: c.keywords.map((name) => ({ "@type": "Thing", name })),
    };
  }

  return {
    "@type": c.schemaType,
    ...common,
    applicationCategory: c.applicationCategory,
    operatingSystem: c.operatingSystem ?? "Web",
    featureList: c.featureList,
  } as SoftwareApplication;
}

export function caseStudyPageNode(c: CaseStudy): WebPage {
  return {
    "@type": "WebPage",
    "@id": absoluteUrl(caseStudyPath(c.slug)),
    url: absoluteUrl(caseStudyPath(c.slug)),
    name: `${c.name} case study — ${c.tagline}`,
    description: c.summary,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": caseStudyId(c.slug) },
    author: personRef,
  };
}

export function faqPageNode(items: FaqItem[], path: string): FAQPage {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl(`${path}#faq`),
    url: absoluteUrl(path),
    isPartOf: { "@id": WEBSITE_ID },
    author: personRef,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer, author: personRef },
    })),
  };
}

export function breadcrumbNode(crumbs: { name: string; path: string }[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

/** Nodes present on every page: the Person and WebSite entities. */
export const baseNodes = () => [personNode(), websiteNode()];

/** Every published product, each linked back to the Person via `creator`. */
export const allCaseStudyNodes = () => publishedCaseStudies.map(caseStudyNode);

export function graph(nodes: Graph["@graph"]): Graph {
  return { "@context": "https://schema.org", "@graph": nodes };
}
