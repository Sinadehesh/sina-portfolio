import { personal } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-ivory/10 bg-void">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 py-16 sm:px-10 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="display text-[clamp(1.75rem,4.5vw,3.25rem)] text-gradient-ivory">
            {personal.tagline}
          </p>
          <a
            href={`mailto:${personal.email}`}
            className="group mt-8 inline-flex items-center gap-3 font-mono text-[0.75rem] tracking-[0.24em] text-ivory uppercase transition-colors hover:text-gold"
          >
            <span className="h-px w-10 bg-gold/50 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
            {personal.email}
          </a>
        </div>
        <div className="flex flex-col justify-end gap-3 md:col-span-5 md:items-end">
          <span className="font-mono text-[0.625rem] tracking-[0.26em] text-ivory-faint uppercase">
            {personal.name} · {personal.location}
          </span>
          <span className="font-mono text-[0.625rem] tracking-[0.26em] text-ivory-faint uppercase">
            © {new Date().getFullYear()} — all rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
