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
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -4 }}
    className="group relative block w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-300"
  >
    <div className="aspect-[16/10] overflow-hidden relative">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      {tag && (
        <div className="absolute top-3 left-3 text-xs tracking-widest uppercase px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 font-medium">
          {tag}
        </div>
      )}
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-foreground group-hover:text-purple-400 transition-colors">
          {title}
        </h3>
        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  </motion.a>
);

const RecentLaunches = () => {
  return (
    <section className="container mx-auto px-4 py-20 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Recent Launches
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Digital products at the intersection of psychology, art, and technology.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <ProjectCard
          title="OopsCupid"
          description="A relationship psychology platform — quiz-driven self-discovery through attachment theory, personality science, and love languages. Understand yourself before you love someone else."
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
