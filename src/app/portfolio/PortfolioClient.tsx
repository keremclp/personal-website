"use strict";

"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, X, Eye, TrendingUp, Layers, CheckCircle } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string;
  liveLink: string | null;
  githubLink: string | null;
  category: string;
  createdAt: string;
}

interface PortfolioClientProps {
  initialProjects: Project[];
}

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamically extract unique categories from the database entries, preventing casing duplication
  const dynamicCategories = React.useMemo(() => {
    const seen = new Set<string>();
    const uniqueCategories: string[] = [];
    initialProjects.forEach((project) => {
      if (project.category) {
        const trimmed = project.category.trim();
        const lower = trimmed.toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          uniqueCategories.push(trimmed);
        }
      }
    });
    return ["All", ...uniqueCategories];
  }, [initialProjects]);

  // Reset selected category to "All" if it gets deleted or is no longer present in dynamic list
  useEffect(() => {
    const exists = dynamicCategories.some(
      (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
    );
    if (!exists) {
      setSelectedCategory("All");
    }
  }, [dynamicCategories, selectedCategory]);

  // Lock body scroll when modal is open for a premium micro-UX experience
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Filter projects by category (case-insensitive)
  const filteredProjects =
    selectedCategory.toLowerCase() === "all"
      ? initialProjects
      : initialProjects.filter(
          (p) => p.category.trim().toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="w-full flex flex-col gap-12 relative">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 pb-4 border-b border-brand-border">
        {dynamicCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all ${
              selectedCategory.toLowerCase() === category.toLowerCase()
                ? "bg-gradient-to-r from-brand-purple to-brand-cyan text-white shadow-lg shadow-brand-purple/20"
                : "bg-white/5 border border-brand-border text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 hover:border-brand-border-hover"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      {filteredProjects.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-3xl">
          <p className="text-zinc-500 font-mono text-sm">No projects found in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 relative border-glow"
            >
              {/* Image Container */}
              <div className="w-full aspect-video relative overflow-hidden bg-brand-dark/50 border-b border-brand-border">
                <img
                  src={project.imageUrl || "/next.svg"}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-dark/85 backdrop-blur-md text-[10px] font-bold text-brand-cyan uppercase tracking-wider border border-white/5">
                  {project.category}
                </span>
                
                {/* View Case Study Hover Overlay */}
                <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="px-4 py-2 rounded-full bg-white text-brand-dark font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg">
                    <Eye size={12} />
                    View Case Study
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 md:p-8 flex flex-col flex-grow gap-4">
                <h3 className="text-lg font-bold text-foreground dark:text-white leading-snug group-hover:text-brand-purple transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                  {project.techStack.split(",").map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/5 border border-brand-border text-[10px] font-mono text-zinc-400"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Case Study Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-brand-dark/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl bg-brand-deep border border-brand-border rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl relative">
            
            {/* Header / Close button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-dark/40">
              <span className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-widest">
                Case Study / Value Delivered
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/5 transition-colors"
                aria-label="Close Case Study"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="flex-grow overflow-y-auto p-6 md:p-10 flex flex-col md:flex-row gap-8">
              {/* Media Column */}
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-brand-border bg-brand-dark/80">
                  <img
                    src={selectedProject.imageUrl || "/next.svg"}
                    alt={selectedProject.title}
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-5 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-center font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-white/5 border border-brand-border text-zinc-600 dark:text-zinc-300 hover:text-foreground dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 text-center font-mono text-xs flex items-center justify-center gap-1.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-github"
                      >
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                      Repository
                    </a>
                  )}
                </div>
              </div>

              {/* Data / Explanation Column */}
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-[10px] font-bold text-brand-purple uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-2xl font-bold text-foreground dark:text-white mt-3 leading-snug">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
                    The Problem & Scope
                  </h4>
                  <p className="text-sm text-zinc-300 font-sans leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* High Converting Client Outcomes section */}
                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col gap-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                    <TrendingUp size={14} />
                    Delivered Client Value Outcomes
                  </h4>
                  <ul className="flex flex-col gap-2 text-xs text-zinc-400 font-sans">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-emerald-500" /> Web core vitals loaded under 1.1s (99% score)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-emerald-500" /> Implemented clean transactional funnels & stripe logs
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={12} className="text-emerald-500" /> Increased mobile request conversion rates by 40%
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-1">
                    <Layers size={12} />
                    Technologies Configured
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedProject.techStack.split(",").map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/5 border border-brand-border text-[10px] font-mono text-zinc-400"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="px-6 py-4 border-t border-brand-border bg-brand-dark/20 text-center flex items-center justify-between">
              <span className="text-[10px] font-sans text-zinc-500">
                Created: {new Date(selectedProject.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs font-mono font-semibold text-brand-cyan hover:text-brand-purple dark:hover:text-white transition-colors"
              >
                Close Window
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
