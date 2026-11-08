import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { personalInfo, site } from "@/lib/content";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import "./globals.css";

// Fonts are bundled in app/fonts (Google Fonts' latin variable files, SIL OFL)
// so the build never depends on reaching Google's servers. Archivo carries a
// width axis (62–125%): headings run it wide and heavy.
const display = localFont({
  src: [{ path: "./fonts/archivo-latin.woff2", weight: "100 900", style: "normal" }],
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: [{ path: "./fonts/inter-latin.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-body",
  display: "swap",
});

const mono = localFont({
  src: [{ path: "./fonts/jetbrains-mono-latin.woff2", weight: "100 800", style: "normal" }],
  variable: "--font-mono-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  authors: [{ name: personalInfo.name, url: site.url }],
  creator: personalInfo.name,
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/llms.txt" },
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  openGraph: {
    type: "profile",
    siteName: personalInfo.name,
    locale: site.locale,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="js-off antialiased">
        <Motion />
        <SiteNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
