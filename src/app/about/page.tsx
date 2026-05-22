"use strict";

import React from "react";
import Link from "next/link";
import { Award, Briefcase, Calendar, Code, Cpu, GraduationCap, Layout, Sparkles } from "lucide-react";

const TIMELINE = [
  {
    year: "2025 - Present",
    role: "M.S. in Computer Engineering",
    company: "Karabuk University",
    description:
      "Deepening academic specialization in advanced systems engineering, hardware architectures, system analysis, and advanced database integration.",
    icon: GraduationCap,
  },
  {
    year: "2024 - 2025",
    role: "Backend Developer",
    company: "Tatar Kaya Teknoloji",
    description:
      "Developed robust back-end applications using Node.js and MongoDB. Scaled message queuing architectures with RabbitMQ and managed secure storage integrations via Amazon Web Services (AWS S3).",
    icon: Cpu,
  },
  {
    year: "2023",
    role: "Full-Stack Web Developer (Internship)",
    company: "Truefeedback",
    description:
      "Utilized TypeScript and Next.js to architect highly responsive web experiences. Engineered 'PromptPulse' (an AI prompt sharing ecosystem utilizing Google Auth and MongoDB) and a dynamic server-rendered 'Car Catalog' platform.",
    icon: Sparkles,
  },
  {
    year: "2022 - Present",
    role: "Remote Software Engineering Intern",
    company: "University of Florida (Computer Science Dept.)",
    description:
      "Designing and implementing scalable RESTful APIs with Python Flask. Mapped HTTP endpoints for database query performance, implemented custom caching strategies, and optimized response pagination.",
    icon: Code,
  },
  {
    year: "2022 - 2023",
    role: "Jr. Full-Stack Web Developer",
    company: "BUSIWAPP",
    description:
      "Designed microservices communication pipelines via Python, React.js, and RabbitMQ. Developed complex relational/non-relational database schemas and optimized end-to-end data transaction flows.",
    icon: Briefcase,
  },
  {
    year: "2021 - 2025",
    role: "B.S. in Computer Engineering",
    company: "Karabuk University",
    description:
      "Graduated with a comprehensive foundation in computer engineering concepts. Actively contributed to technology and professional networks, including BTK Karabuk University and IEEE Karabuk University.",
    icon: GraduationCap,
  },
];

const SKILL_CATEGORIES = [
  {
    title: "Web & Front-End",
    icon: Code,
    skills: ["Next.js", "React.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "HTML/CSS"],
  },
  {
    title: "Back-End & Databases",
    icon: Cpu,
    skills: ["Node.js / Express", "Python (Flask / Django)", "RabbitMQ / Microservices", "AWS (S3)", "MongoDB", "MySQL", "SQLite"],
  },
  {
    title: "Mobile, Languages & Tools",
    icon: Award,
    skills: ["React Native", "Nativewind", "C# WFA (GUI)", "Java / C / C++", "Blender (3D)", "Oracle Database SQL", "English (Advanced)"],
  },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full flex flex-col gap-24 md:gap-36">
      {/* 1. Header Intro Hero */}
      <section className="relative pt-8 md:pt-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full">
        {/* Left Column - Copy */}
        <div className="flex flex-col gap-6 lg:max-w-[60%] w-full">
          {/* Status Badge */}
          

          {/* Greeting & Title */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-mono text-zinc-500">Hello, I'm —</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none">
              Kerem Can <span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">Çelepkolu</span>
            </h1>
          </div>

          {/* Terminal / Typing Status */}
          <div className="flex items-center gap-2 font-mono text-sm text-brand-cyan">
            <span>$</span>
            <span className="text-zinc-300 font-semibold">whoami</span>
            <span className="w-1.5 h-4 bg-brand-cyan animate-pulse shrink-0" />
          </div>

          {/* Brief Description */}
          <p className="text-base md:text-lg text-zinc-400 font-sans leading-relaxed max-w-xl">
            I am a Computer Engineering graduate (currently pursuing my M.S.) with a passion for software innovation, system analysis, and full-stack engineering. Grounded in a strong academic foundation, I possess expertise in designing high-scale RESTful APIs, microservices with RabbitMQ, React Native mobile apps, and robust database architectures.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all flex items-center gap-2 group shadow-lg shadow-brand-purple/20"
            >
              Get in touch
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase bg-white/5 border border-brand-border text-zinc-300 hover:text-brand-purple hover:border-brand-purple hover:bg-brand-purple/5 transition-all"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Right Column - Premium Portrait */}
        <div className="flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 relative flex items-center justify-center">
          {/* Gradient Glow backdrop */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-purple via-brand-cyan to-brand-pink opacity-20 blur-3xl animate-pulse" />
          
          {/* Outer glowing border ring */}
          <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-brand-purple to-brand-cyan shadow-xl shadow-brand-purple/10">
            {/* Dark inner wrapper */}
            <div className="w-full h-full rounded-full overflow-hidden border border-brand-dark/40 bg-brand-deep">
              <img
                src="/Kerem Can.png"
                alt="Kerem Can Çelepkolu"
                decoding="async"
                className="w-full h-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Technical Expertise Grid */}
      <section className="w-full">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase">
          Technical Stack
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-12">
          Skills Configured for Growth
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="glass-panel p-8 rounded-3xl flex flex-col gap-6"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center text-white">
                  <Icon size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-brand-border text-xs font-sans text-zinc-300 hover:border-brand-cyan transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Professional Journey Timeline */}
      <section className="w-full relative">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase">
          Chronology
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-16">
          The Journey So Far
        </h2>

        {/* Timeline container */}
        <div className="relative border-l border-brand-border ml-4 md:ml-8 flex flex-col gap-12 max-w-4xl">
          {TIMELINE.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.year} className="relative pl-8 md:pl-12 group">
                {/* Timeline node */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-dark border-2 border-brand-border flex items-center justify-center text-zinc-500 group-hover:border-brand-purple group-hover:text-brand-purple transition-all duration-300">
                  <Icon size={14} />
                </div>

                {/* Event Card */}
                <div className="glass-panel glass-panel-hover p-6 md:p-8 rounded-2xl flex flex-col gap-3 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={12} />
                      {item.year}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{item.company}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-purple transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-xs md:text-sm text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Let's Build CTA */}
      <section className="w-full text-center">
        <div className="glass-panel p-10 md:p-16 rounded-3xl flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Have a Technical Project in Mind?
          </h2>
          <p className="text-zinc-400 font-sans max-w-lg text-sm leading-relaxed">
            Whether you want to launch a SaaS project, redesign a corporate platform, or establish an e-commerce funnel, I am here to engineer it.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all flex items-center gap-1.5"
            >
              Consultation Form
            </Link>
            <a
              href="https://wa.me/905317305614"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-bold text-xs tracking-wider uppercase bg-white/5 border border-brand-border text-foreground hover:border-emerald-500 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5"
            >
              Direct Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
