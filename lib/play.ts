import { publishedCaseStudies, type CaseStudy } from "./content";

/** Playable games, in the order the arcade shows them. Each embeds its live web build. */
const order = ["pukytoon", "the-loop", "gem-jar", "zombie-bomber", "merge-farmstead"];

export const playPath = (slug: string) => `/play/${slug}`;

export function playableGames(): (CaseStudy & { play: NonNullable<CaseStudy["play"]> })[] {
  const rank = (slug: string) => order.indexOf(slug) + 1 || order.length + 1;
  return publishedCaseStudies
    .filter((c): c is CaseStudy & { play: NonNullable<CaseStudy["play"]> } => Boolean(c.play))
    .sort((a, b) => rank(a.slug) - rank(b.slug));
}

export const getPlayable = (slug: string) => playableGames().find((c) => c.slug === slug);
