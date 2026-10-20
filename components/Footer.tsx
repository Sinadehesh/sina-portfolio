import { personalInfo } from "@/lib/content";

const links = [
  { href: "/work", label: "All case studies" },
  { href: "/consumer-psychology", label: "Consumer psychology consulting" },
  { href: "/#faq", label: "FAQ" },
  { href: `mailto:${personalInfo.email}`, label: personalInfo.email },
  { href: personalInfo.github, label: "GitHub" },
  { href: personalInfo.linkedin, label: "LinkedIn" },
  { href: "/llms.txt", label: "llms.txt" },
].filter((l) => l.href);

export default function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-void text-ivory">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:px-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-serif text-2xl font-semibold">{personalInfo.name}</p>
          <p className="mt-2 text-sm text-ivory-faint">
            {personalInfo.headline} · {personalInfo.location}
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-6">
          <ul className="grid gap-x-8 gap-y-3 text-sm text-ivory-dim sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-ivory-faint md:col-span-12">
          © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
