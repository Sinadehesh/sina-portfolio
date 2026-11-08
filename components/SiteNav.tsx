import { personalInfo } from "@/lib/content";

/** `wide` links only show in the desktop bar from 1280px; all show in the phone menu. */
const links = [
  { href: "/#method", label: "Method" },
  { href: "/#consulting", label: "Consulting" },
  { href: "/#experience", label: "Experience", wide: true },
  { href: "/#work", label: "Apps" },
  { href: "/#games", label: "Games", wide: true },
  { href: "/#books", label: "Books", wide: true },
  { href: "/insights", label: "Insights" },
  { href: "/#about", label: "About" },
];

const mailto = `mailto:${personalInfo.email}?subject=${encodeURIComponent("Working together")}`;

/**
 * Fixed bar. Solid by default; the motion layer makes it transparent while
 * the page sits at the very top, over the hero.
 */
export default function SiteNav() {
  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px]">
        <span data-progress-bar className="block h-[2px] w-full origin-left scale-x-0 bg-ember" />
      </div>
      <header data-nav className="site-nav fixed inset-x-0 top-0 z-40 text-ivory">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-10"
        >
          <a href="/" className="group flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-ember font-serif text-[0.95rem] font-black tracking-[-0.04em] text-void transition-transform duration-500 group-hover:rotate-90"
            >
              SD
            </span>
            <span className="font-serif text-[1.15rem] font-bold tracking-[-0.03em]">{personalInfo.name}</span>
          </a>

          <ul className="hidden items-center gap-7 font-mono text-[0.75rem] tracking-[0.16em] uppercase lg:flex xl:gap-8">
            {links.map((l) => (
              <li key={l.href} className={l.wide ? "hidden xl:block" : undefined}>
                <a href={l.href} className="nav-link text-ivory-dim transition-colors hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href={mailto} data-magnetic="0.3" className="btn btn-ember hidden !px-5 !py-2.5 text-sm sm:inline-flex">
              Work with me
            </a>
            <details className="relative lg:hidden">
              <summary
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ivory/25 bg-charcoal-900/60 backdrop-blur-sm"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </summary>
              <ul className="absolute right-0 mt-3 w-64 rounded-[8px] border border-ivory/10 bg-charcoal-800 p-3 text-base shadow-2xl">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="block rounded-[4px] px-4 py-3 font-serif font-semibold hover:bg-ivory/5"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2">
                  <a href={mailto} className="btn btn-ember w-full">
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
