import { certifications, education } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { Award } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { motion } from "framer-motion";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-12 bg-gradient-to-b from-muted/10 to-background"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
            What academic training and credentials back the work?
          </h2>
        </MotionWrapper>

        <div className="mb-8">
          {education.map((edu, index) => (
            <TimelineItem
              key={edu.institution}
              title={edu.degree}
              subtitle={edu.institution}
              date={edu.period}
              isLast={index === education.length - 1}
              index={index}
            >
              <p className="text-sm text-muted-foreground mb-3">
                {edu.location}
              </p>

              {edu.achievements && edu.achievements.length > 0 && (
                <motion.div
                  className="mt-3 p-4 bg-background/80 backdrop-blur-sm backdrop-filter rounded-lg border border-purple-500/20 dark:bg-card/10 dark:border-purple-500/10 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-3">
                    <div className="h-6 w-6 flex items-center justify-center rounded-full bg-purple-500/10 mr-2">
                      <Award className="h-4 w-4 text-purple-500" />
                    </div>
                    <h4 className="text-sm font-medium">
                      Research focus & thesis
                    </h4>
                  </div>
                  <ul className="list-none ml-4 space-y-2 text-sm">
                    {edu.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="text-muted-foreground relative pl-6"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        viewport={{ once: true }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </TimelineItem>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-3">Professional certifications</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert) => (
            <li
              key={cert.name}
              className="rounded-lg border border-purple-500/20 bg-background/80 p-3 text-sm"
            >
              <span className="font-medium">{cert.name}</span>
              <span className="text-muted-foreground"> — {cert.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
