import type { Graph } from "schema-dts";
import { baseNodes, graph } from "@/lib/schema";

/** Page JSON-LD: the Person and WebSite nodes plus this page's own nodes. */
export default function JsonLd({ nodes = [] }: { nodes?: Graph["@graph"] }) {
  // Escape "<" so content can never close the script tag early.
  const json = JSON.stringify(graph([...baseNodes(), ...nodes])).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
