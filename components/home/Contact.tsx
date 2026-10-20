import { MediaSlot } from "@/components/ui/MediaSlot";
import { personalInfo } from "@/lib/content";

export default function Contact({
  title = "Customers doing something you can't explain? Let's find out why.",
}: {
  title?: string;
}) {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="stage relative overflow-hidden">
      <MediaSlot video="/videos/contact.mp4" hue="#c8a45c" className="vignette absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-28 sm:px-10 md:py-40">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-heading" className="display mt-5 max-w-[18ch] text-[clamp(2.5rem,6vw,5rem)]">
          {title}
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a href={`mailto:${personalInfo.email}?subject=${encodeURIComponent("Working together")}`} className="btn btn-gold">
            {personalInfo.email}
          </a>
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} className="btn btn-ghost" target="_blank" rel="noopener">
              LinkedIn
            </a>
          )}
        </div>
        <p className="mt-8 text-ivory-dim">
          Based in {personalInfo.location} · Available in Milan, Turin, across Europe and remotely · English, Italian,
          Persian, German
        </p>
      </div>
    </section>
  );
}
