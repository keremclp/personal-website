"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectModal, { SerializedProject } from "@/components/ProjectModal";
import { useLocale } from "@/components/LocaleProvider";

interface FeaturedProjectsGridProps {
  projects: SerializedProject[];
}

export default function FeaturedProjectsGrid({ projects }: FeaturedProjectsGridProps) {
  const { dict } = useLocale();
  const [selectedProject, setSelectedProject] = useState<SerializedProject | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setSelectedProject(project)}
            className="studio-card studio-card-interactive rounded-2xl overflow-hidden flex flex-col text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {/* Visual Preview */}
            <div className="w-full aspect-[16/10] relative overflow-hidden bg-surface border-b border-line">
              <img
                src={project.imageUrl || "/projects/showcase-web.jpg"}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-surface-elevated/92 backdrop-blur-md border border-line text-[11px] font-mono font-medium text-ink">
                {project.category}
              </span>
              <span className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-full bg-ink text-background text-[11px] font-semibold inline-flex items-center gap-1 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-md">
                {dict.home.projectInspect}
                <ArrowUpRight size={12} />
              </span>
            </div>

            {/* Clean Business-Focused Copy (No Developer Jargon) */}
            <div className="p-6 flex flex-col flex-grow gap-2.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <ArrowUpRight
                  size={16}
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

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
