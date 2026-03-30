import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const quotes = [
  {
    text: "You do not see the world as it is. You see it as you are. Every act of perception is also an act of creation.",
    chapter: "Chapter I — The Eye That Makes",
  },
  {
    text: "Silence is not the absence of sound. It is the presence of everything you have been too distracted to notice.",
    chapter: "Chapter III — The Practice of Stillness",
  },
  {
    text: "The mind that rushes past a thing has not seen it. To observe is to give time the shape of respect.",
    chapter: "Chapter V — On Looking Slowly",
  },
  {
    text: "Most people live in their interpretation of the world. The observer learns to visit the world itself.",
    chapter: "Chapter VII — Beyond the Story",
  },
];

const QuoteCard = ({ text, chapter, index }: { text: string; chapter: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    viewport={{ once: true, margin: "-60px" }}
    className="relative p-8 rounded-2xl border overflow-hidden group"
    style={{
      background: "rgba(12,10,7,0.6)",
      borderColor: "rgba(180,140,60,0.12)",
      backdropFilter: "blur(10px)",
    }}
  >
    {/* Subtle corner glow */}
    <div
      className="absolute top-0 left-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(180,140,60,0.08) 0%, transparent 70%)", transform: "translate(-30%, -30%)" }}
    />
    <div className="text-amber-600/30 text-5xl font-serif mb-4 leading-none select-none">&ldquo;</div>
    <p className="text-stone-200/85 text-base md:text-lg leading-relaxed font-light mb-6 italic">
      {text}
    </p>
    <p className="text-amber-500/50 text-xs tracking-widest uppercase">{chapter}</p>
  </motion.div>
);

export default function TaoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "rgba(8,6,4,0.95)" }}
    >
      {/* Parallax ambient orb */}
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(140,100,40,0.06) 0%, transparent 65%)" }}
        />
      </motion.div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-amber-500/50 tracking-[0.35em] uppercase text-xs mb-4">Currently Writing</p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-100 mb-4 tracking-tight">
            TAO
          </h2>
          <p className="text-amber-300/60 text-lg font-light tracking-wide mb-6">
            The Art of Observation
          </p>
          <div
            className="max-w-2xl mx-auto p-6 rounded-xl border text-stone-300/70 text-sm leading-relaxed"
            style={{ borderColor: "rgba(180,140,60,0.1)", background: "rgba(20,15,8,0.4)" }}
          >
            A philosophical manuscript on the nature of perception — how we look, what we miss,
            and why learning to observe is the beginning of all wisdom. Drawing from Taoism,
            phenomenology, Stoic philosophy, and the psychology of attention.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <QuoteCard key={i} text={q.text} chapter={q.chapter} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-stone-500 text-sm">
            Expected publication · 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
}
