import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { personalInfo, site } from "@/lib/content";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import "./globals.css";

// Fonts are bundled in app/fonts (Google Fonts' latin variable files, SIL OFL)
// so the build never depends on reaching Google's servers.
const display = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/cormorant-garamond-italic-latin.woff2", weight: "300 700", style: "italic" },
  ],
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
  themeColor: "#0a0a0c",
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
        <ScrollFX />
        <SiteNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
