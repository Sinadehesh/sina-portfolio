import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import { personal } from "@/lib/data";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sinadehesh.com"),
  title: personal.headline,
  description: personal.intro,
  authors: [{ name: personal.name }],
  keywords: [
    "Sina Dehesh",
    "experimental psychology",
    "behavioral engineering",
    "systems",
    "consulting",
    "n8n automation",
    "OopsCupid",
    "Passway",
    "Costly",
    "Musicity",
  ],
  openGraph: {
    title: personal.headline,
    description: personal.intro,
    type: "profile",
  },
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
      <body className="js-off antialiased">{children}</body>
    </html>
  );
}
