"use client";

import React, { useState, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectModal, { SerializedProject } from "@/components/ProjectModal";
import { useLocale } from "@/components/LocaleProvider";

interface PortfolioClientProps {
  initialProjects: SerializedProject[];
}

const ALL_KEY = "__ALL__";

export default function PortfolioClient({ initialProjects }: PortfolioClientProps) {
  const { dict } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState(ALL_KEY);
  const [selectedProject, setSelectedProject] = useState<SerializedProject | null>(null);

  const dynamicCategories = useMemo(() => {
    const seen = new Set<string>();
    const unique: string[] = [];
    initialProjects.forEach((project) => {
      if (project.category) {
        const trimmed = project.category.trim();
        const lower = trimmed.toLowerCase();
        if (!seen.has(lower)) {
          seen.add(lower);
          unique.push(trimmed);
        }
      }
    });
    return unique;
  }, [initialProjects]);

  const activeCategory =
    selectedCategory === ALL_KEY ||
    dynamicCategories.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
      ? selectedCategory
      : ALL_KEY;

  const filteredProjects =
    activeCategory === ALL_KEY
      ? initialProjects
      : initialProjects.filter(
          (p) => p.category.trim().toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-line">
        <button
          type="button"
          onClick={() => setSelectedCategory(ALL_KEY)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            activeCategory === ALL_KEY
              ? "bg-ink text-background"
              : "bg-surface-elevated border border-line text-ink-secondary hover:text-ink hover:border-line-strong"
          }`}
        >
          {dict.portfolio.allCategory} ({initialProjects.length})
        </button>

        {dynamicCategories.map((category) => {
          const isSelected = activeCategory.toLowerCase() === category.toLowerCase();
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                isSelected
                  ? "bg-ink text-background"
                  : "bg-surface-elevated border border-line text-ink-secondary hover:text-ink hover:border-line-strong"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Showcase Grid */}
      {filteredProjects.length === 0 ? (
        <div className="studio-card rounded-3xl p-16 text-center">
          <p className="text-sm text-ink-muted">{dict.portfolio.emptyState}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedProject(project)}
              className="studio-card studio-card-interactive rounded-2xl overflow-hidden flex flex-col text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="w-full aspect-[16/10] relative overflow-hidden bg-surface border-b border-line">
                <img
                  src={project.imageUrl || "/projects/saas-platform.jpg"}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-elevated/92 backdrop-blur-md border border-line text-[11px] font-mono font-medium text-ink">
                  {project.category}
                </span>
                <span className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-ink text-background text-xs font-semibold inline-flex items-center gap-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-md">
                  {dict.portfolio.inspectLabel}
                  <ArrowUpRight size={13} />
                </span>
              </div>

              <div className="p-6 md:p-7 flex flex-col flex-grow gap-3">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-ink tracking-tight leading-snug group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    size={18}
                    className="shrink-0 text-ink-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1"
                  />
                </div>
                <p className="text-sm text-ink-secondary leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
