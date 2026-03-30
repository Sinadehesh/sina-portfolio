import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  delay: number;
  tag?: string;
}

const ProjectCard = ({ title, description, imageUrl, link, delay, tag }: ProjectCardProps) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    className="group relative block w-full overflow-hidden rounded-2xl border transition-all duration-500"
    style={{
      background: "rgba(15,12,8,0.7)",
      borderColor: "rgba(180,140,60,0.15)",
      backdropFilter: "blur(12px)",
    }}
  >
    <div className="aspect-[16/10] overflow-hidden relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
      {tag && (
        <div
          className="absolute top-4 left-4 text-xs tracking-widest uppercase px-3 py-1 rounded-full font-medium"
          style={{ background: "rgba(180,140,60,0.2)", color: "rgba(220,180,100,0.9)", border: "1px solid rgba(180,140,60,0.3)" }}
        >
          {tag}
        </div>
      )}
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors duration-300">
          {title}
        </h3>
        <ExternalLink className="w-4 h-4 text-stone-500 group-hover:text-amber-400 transition-colors flex-shrink-0 mt-1" />
      </div>
      <p className="text-stone-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.a>
);

const RecentLaunches = () => {
  return (
    <section
      className="container mx-auto px-4 py-24 relative z-10"
      style={{ background: "transparent" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-amber-500/60 tracking-[0.3em] uppercase text-xs mb-3">Works & Launches</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-100">
          Recent Publications
        </h2>
        <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
          Digital products and media at the intersection of psychology, art, and technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <ProjectCard
          title="OopsCupid"
          description="A relationship psychology platform — quiz-driven self-discovery through the lens of attachment theory, personality science, and love languages. Understand yourself before you love someone else."
          imageUrl="/images/oopscupid_preview.png"
          link="https://oopscupid.com"
          delay={0.1}
          tag="Psychology · Live"
        />
        <ProjectCard
          title="Daily Sublime"
          description="A luxury daily newsletter exploring fine art through a psychological lens. Each edition is a meditation on beauty, perception, and what it means to truly see."
          imageUrl="/images/daily_sublime_preview.png"
          link="http://daily.sinadehesh.com/"
          delay={0.25}
          tag="Art · Newsletter"
        />
        <ProjectCard
          title="Daily Hustle"
          description="An educational platform guiding creators from idea to income. Structured workflows, course catalogs, and daily systems for builders who want to ship."
          imageUrl="/images/daily_hustle_preview.png"
          link="https://hustle.sinadehesh.com/"
          delay={0.4}
          tag="Education"
        />
      </div>
    </section>
  );
};

export default RecentLaunches;
