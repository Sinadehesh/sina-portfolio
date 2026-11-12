import { ImageResponse } from "next/og";
import { getArticle, getArticles, getTopic } from "@/lib/articles";
import { personalInfo } from "@/lib/content";
import { ogFonts } from "@/lib/og-fonts";

// One share card per article, rendered at build time with the static export.
export const dynamic = "force-static";
export const alt = "Article by Sina Dehesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  const title = a?.title ?? "Insights";
  const topic = a ? getTopic(a.topic)?.title : "";
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        color: "#f3f0ea",
        fontFamily: "Archivo",
        fontWeight: 500,
        background: "radial-gradient(ellipse 60% 70% at 88% 18%, rgba(255,91,31,0.28) 0%, rgba(8,9,11,0) 60%), #08090b",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 22,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            background: "#ff5b1f",
            color: "#040506",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          SD
        </div>
        <span style={{ color: "#ff5b1f" }}>{topic}</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 52 ? 64 : 76,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: -2.5,
          maxWidth: 1040,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 26 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 800 }}>{personalInfo.name}</span>
          <span style={{ color: "#b9b5ad", fontSize: 22, marginTop: 6 }}>Applied psychologist & consumer psychology consultant · Milan</span>
        </div>
        <span style={{ color: "#7d7a74", fontSize: 22, letterSpacing: 3 }}>SINADEHESH.COM/INSIGHTS</span>
      </div>
    </div>,
    { ...size, fonts: ogFonts() },
  );
}
