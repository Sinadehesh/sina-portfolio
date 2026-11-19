import type { Metadata } from "next";
import ExpertisePage from "@/components/expertise/ExpertisePage";
import { getExpertise } from "@/lib/expertise";

const page = getExpertise("consumer-behavior")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: page.path },
  openGraph: { title: page.metaTitle, description: page.description, url: page.path },
};

export default function Page() {
  return <ExpertisePage page={page} />;
}
