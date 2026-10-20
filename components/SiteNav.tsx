import { personalInfo } from "@/lib/content";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/consumer-psychology", label: "Consumer psychology" },
  { href: "/#research", label: "Research" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent("Working together")}`;

/** Always-visible bar on a solid ground, so it never sits on top of content. */
export default function SiteNav() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5">
        <span data-progress-bar className="block h-0.5 w-full origin-left scale-x-0 bg-gold" />
      </div>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ivory/10 bg-charcoal-900/85 text-ivory backdrop-blur-md">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-10"
        >
          <a href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-[1.35rem] font-semibold tracking-tight">
              {personalInfo.name}
            </span>
            <span className="hidden text-[0.6875rem] tracking-wide text-ivory-faint sm:block">
              Consumer psychology · Behavioral products
            </span>
          </a>

          <ul className="hidden items-center gap-7 text-[0.9375rem] lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-ivory-dim transition-colors hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={mailto} className="btn btn-gold hidden !px-5 !py-2.5 text-sm sm:inline-flex">
              Work with me
            </a>
            <details className="relative lg:hidden">
              <summary
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </summary>
              <ul className="absolute right-0 mt-3 w-64 rounded-2xl border border-ivory/10 bg-charcoal-800 p-3 text-base shadow-2xl">
                {links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="block rounded-lg px-4 py-3 hover:bg-ivory/5">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2">
                  <a href={mailto} className="btn btn-gold w-full">
                    Work with me
                  </a>
                </li>
              </ul>
            </details>
          </div>
        </nav>
      </header>
    </>
  );
}
