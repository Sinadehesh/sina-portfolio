import { personalInfo } from "@/lib/data";
import { Mail, Github, MapPin, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { useEffect, useRef } from "react";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 160, 120, ${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const roles = ["Psychologist", "Writer", "Digital Creator", "Builder"];

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/20 -z-10" />
      <ParticleCanvas />

      {/* Soft radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(180,140,80,0.08) 0%, transparent 70%)" }}
      />

      <div className="container max-w-4xl mx-auto px-6 md:px-4 relative z-10">
        <motion.div
          className="flex flex-col md:flex-row md:items-center justify-between mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center md:text-left">
            <motion.p
              className="text-amber-400/70 text-sm tracking-[0.3em] uppercase mb-3 font-light"
              variants={childVariants}
            >
              sinadehesh.com
            </motion.p>

            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-3 text-stone-100 tracking-tight"
              variants={childVariants}
            >
              {personalInfo.name}
            </motion.h1>

            <motion.div variants={childVariants} className="mb-6">
              <p className="text-lg text-amber-300/80 font-light tracking-wide">
                Psychologist · Writer · Digital Creator
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 items-center md:items-start"
              variants={containerVariants}
            >
              <motion.div
                className="flex items-center text-sm text-stone-400"
                variants={childVariants}
                whileHover={{ scale: 1.03, color: "#d4b896" }}
              >
                <MapPin className="h-4 w-4 mr-2 text-amber-500/50" />
                {personalInfo.location}
              </motion.div>

              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center text-sm text-stone-400 hover:text-amber-300 transition-colors"
                variants={childVariants}
                whileHover={{ scale: 1.03 }}
              >
                <Mail className="h-4 w-4 mr-2 text-amber-500/50" />
                {personalInfo.email}
              </motion.a>

              <motion.a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-stone-400 hover:text-amber-300 transition-colors"
                variants={childVariants}
                whileHover={{ scale: 1.03 }}
              >
                <Github className="h-4 w-4 mr-2 text-amber-500/50" />
                GitHub
              </motion.a>

              <motion.a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-stone-400 hover:text-amber-300 transition-colors"
                variants={childVariants}
                whileHover={{ scale: 1.03 }}
              >
                <Linkedin className="h-4 w-4 mr-2 text-amber-500/50" />
                LinkedIn
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 md:mt-0 flex justify-center"
            variants={childVariants}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-full blur-xl opacity-30"
                style={{ background: "radial-gradient(circle, rgba(200,160,80,0.6) 0%, transparent 70%)" }}
              />
              <img
                src={personalInfo.profilePicture}
                alt="Sina Dehesh"
                className="w-44 md:w-56 rounded-full relative border border-amber-700/30"
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </motion.div>

        <MotionWrapper>
          <div
            className="p-6 rounded-2xl border border-amber-800/20 relative overflow-hidden"
            style={{ background: "rgba(20,15,10,0.5)", backdropFilter: "blur(12px)" }}
          >
            <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-amber-600/60 to-transparent rounded-full" />
            <p className="text-stone-300/80 pl-5 leading-relaxed text-base">
              {personalInfo.heroDescription}
            </p>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
