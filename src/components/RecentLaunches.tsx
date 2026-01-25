import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    delay: number;
}

const ProjectCard = ({
    title,
    description,
    imageUrl,
    link,
    delay,
}: ProjectCardProps) => (
    <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="group relative block w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
    >
        <div className="aspect-[16/10] overflow-hidden">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
        </div>
        <div className="p-6">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold font-heading text-white group-hover:text-blue-400 transition-colors">
                    {title}
                </h3>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
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
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Building digital experiences that combine aesthetics with functionality.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <ProjectCard
                    title="Daily Sublime"
                    description="A luxury daily newsletter focused on the art of observation. Features a minimalist aesthetic and curated content for the discerning mind."
                    imageUrl="/images/daily_sublime_preview.png"
                    link="http://daily.sinadehesh.com/"
                    delay={0.2}
                />
                <ProjectCard
                    title="Daily Hustle"
                    description="An educational platform guiding creators from idea to income. Features course catalogs, dashboards, and structured daily workflows."
                    imageUrl="/images/daily_hustle_preview.png"
                    link="https://hustle.sinadehesh.com/"
                    delay={0.4}
                />
            </div>
        </section>
    );
};

export default RecentLaunches;
