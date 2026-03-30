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
    transition={{ duration: 0.7, delay: index * 0.15 }}
    viewport={{ once: true, margin: "-60px" }}
    whileHover={{ scale: 1.02 }}
    className="relative p-8 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm hover:border-purple-500/40 transition-colors duration-300"
  >
    <div className="text-purple-400/40 text-5xl font-serif mb-4 leading-none select-none">&ldquo;</div>
    <p className="text-foreground/80 text-base md:text-lg leading-relaxed font-light mb-6 italic">
      {text}
    </p>
    <p className="text-muted-foreground text-xs tracking-widest uppercase">{chapter}</p>
  </motion.div>
);

export default function TaoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-background to-muted/20 overflow-hidden"
    >
      {/* Subtle parallax orb */}
      <motion.div
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        aria-hidden
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-3xl" />
      </motion.div>

      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-muted-foreground tracking-[0.3em] uppercase text-xs mb-3">Currently Writing</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">TAO</span>
          </h2>
          <p className="text-muted-foreground text-lg font-light tracking-wide mb-6">
            The Art of Observation
          </p>
          <div className="max-w-2xl mx-auto p-5 rounded-xl border border-purple-500/20 bg-purple-500/5 text-muted-foreground text-sm leading-relaxed">
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <p className="text-muted-foreground text-sm">Expected publication · 2026</p>
        </motion.div>
      </div>
    </section>
  );
}
