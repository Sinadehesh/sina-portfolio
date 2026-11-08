import LocalTime from "@/components/LocalTime";
import { personalInfo } from "@/lib/content";

const columns = [
  {
    title: "Work",
    links: [
      { href: "/work", label: "All case studies" },
      { href: "/consumer-psychology", label: "Consumer psychology consulting" },
      { href: "/#games", label: "Games" },
      { href: "/#books", label: "Books" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: `mailto:${personalInfo.email}`, label: personalInfo.email },
      { href: personalInfo.github, label: "GitHub" },
      { href: personalInfo.linkedin, label: "LinkedIn" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "For machines",
    links: [
      { href: "/llms.txt", label: "llms.txt" },
      { href: "/llms-full.txt", label: "llms-full.txt" },
      { href: "/sitemap.xml", label: "Sitemap" },
    ],
  },
].map((c) => ({ ...c, links: c.links.filter((l) => l.href) }));

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-void text-ivory">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pt-20 pb-10 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-[1.6rem] leading-tight font-bold tracking-[-0.03em]">{personalInfo.name}</p>
          <p className="mt-3 max-w-[38ch] text-[0.9375rem] text-ivory-faint">
            {personalInfo.headline} · {personalInfo.location}
          </p>
          <p className="mt-6 flex items-center gap-3 font-mono text-[0.75rem] tracking-[0.16em] text-ivory-dim uppercase">
            <span aria-hidden="true" className="live-dot" />
            Milan <LocalTime />
          </p>
        </div>
        <nav aria-label="Footer" className="grid gap-10 sm:grid-cols-3 md:col-span-7">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[0.75rem] tracking-[0.2em] text-ember uppercase">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem] text-ivory-dim">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="break-words transition-colors hover:text-ivory">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <p aria-hidden="true" className="footer-wordmark select-none">
        Sina Dehesh
      </p>

      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-ivory/10 px-5 py-6 font-mono text-[0.75rem] tracking-[0.14em] text-ivory-faint uppercase sm:px-10">
        <p>
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
        <a href="#top" className="transition-colors hover:text-ember">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
