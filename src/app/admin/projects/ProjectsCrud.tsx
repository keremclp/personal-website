"use strict";

"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Check, Save, Link2, FolderOpen, Image } from "lucide-react";

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

interface ProjectsCrudProps {
  initialProjects: Project[];
}

const DEFAULT_IMAGES = [
  { label: "AI SaaS Mockup", path: "/projects/ai-saas.png" },
  { label: "Luxury E-Commerce Mockup", path: "/projects/luxury-ecommerce.png" },
  { label: "Creative Agency Mockup", path: "/projects/creative-agency.png" },
];

export default function ProjectsCrud({ initialProjects }: ProjectsCrudProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Lock body scroll when modal is open for a premium micro-UX experience
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "/projects/ai-saas.png",
    techStack: "",
    liveLink: "",
    githubLink: "",
    category: "SaaS",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      imageUrl: "/projects/ai-saas.png",
      techStack: "",
      liveLink: "",
      githubLink: "",
      category: "SaaS",
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      techStack: project.techStack,
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      category: project.category,
    });
    setError("");
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          liveLink: formData.liveLink || null,
          githubLink: formData.githubLink || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save project.");
      }

      if (editingProject) {
        // Update local state
        setProjects(projects.map((p) => (p.id === editingProject.id ? data : p)));
      } else {
        // Add to local state list
        setProjects([data, ...projects]);
      }

      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this project?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete project.");
      }

      // Remove from state list
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Dynamic Actions Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-brand-border">
        <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
          Portfolio Items ({projects.length})
        </span>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all shadow-md shadow-brand-purple/10 cursor-pointer"
        >
          <Plus size={14} />
          Add Project
        </button>
      </div>

      {/* Grid of editable items */}
      {projects.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-3xl">
          <p className="text-zinc-500 font-mono text-sm">No projects listed. Click "Add Project" above to create one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col group relative border border-white/5"
            >
              {/* Media box */}
              <div className="w-full aspect-video relative overflow-hidden bg-brand-dark/50 border-b border-brand-border">
                <img
                  src={project.imageUrl || "/next.svg"}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-brand-dark/85 backdrop-blur text-[9px] font-bold text-brand-cyan uppercase tracking-wider border border-white/5">
                  {project.category}
                </span>
              </div>

              {/* Data details */}
              <div className="p-5 flex flex-col flex-grow gap-3">
                <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-white/5">
                  {project.techStack.split(",").map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 rounded bg-white/5 border border-brand-border text-[9px] font-mono text-zinc-400"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions row */}
              <div className="flex items-center gap-1.5 px-5 py-3 border-t border-brand-border bg-brand-dark/20">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded bg-white/5 border border-brand-border text-[10px] font-mono text-zinc-500 dark:text-zinc-300 hover:text-brand-purple hover:bg-brand-purple/5 hover:border-brand-purple/20 transition-all cursor-pointer"
                >
                  <Edit2 size={10} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 rounded bg-red-500/5 border border-red-500/10 text-red-600 dark:text-red-400 hover:text-white hover:bg-red-500 transition-all cursor-pointer animate-fade-in"
                  aria-label="Delete Project"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD Add/Edit Glassmorphic Drawer Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-brand-deep border border-brand-border rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-dark/40">
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                {editingProject ? "Update Portfolio Item" : "Create Portfolio Item"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/5 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Contents */}
            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 md:p-8 flex flex-col gap-5">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Title & Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="title" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Project Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. NeuroFlow - AI SaaS Tool"
                    className="px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-sans focus:outline-none focus:border-brand-purple transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="category" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Display Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-sans focus:outline-none focus:border-brand-purple transition-colors appearance-none"
                  >
                    <option value="SaaS">SaaS Dashboard</option>
                    <option value="E-commerce">E-Commerce Storefront</option>
                    <option value="Creative">Creative / Marketing</option>
                  </select>
                </div>
              </div>

              {/* Description box */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="description" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Case Study / Value Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the scope, objectives, and commercial results delivered..."
                  className="px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-sans focus:outline-none focus:border-brand-purple transition-colors resize-none"
                />
              </div>

              {/* Quick Image Picker or URL Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="imageUrl" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  required
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="e.g. /projects/ai-saas.png"
                  className="px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-sans focus:outline-none focus:border-brand-purple transition-colors"
                />
                
                {/* Pre-seeded mockup shortcuts */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                    Quick-Select Pre-Generated Mockups:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {DEFAULT_IMAGES.map((img) => (
                      <button
                        key={img.path}
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: img.path })}
                        className={`p-2 rounded-xl bg-brand-dark border text-[9px] text-zinc-400 font-sans text-center transition-all ${
                          formData.imageUrl === img.path
                            ? "border-brand-cyan text-brand-cyan bg-brand-cyan/5"
                            : "border-brand-border hover:border-brand-border-hover"
                        }`}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tech Stack string */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="techStack" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Technologies Configured (Comma separated list)
                </label>
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  required
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="e.g. Next.js, Tailwind v4, Prisma, PostgreSQL"
                  className="px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-sans focus:outline-none focus:border-brand-purple transition-colors"
                />
              </div>

              {/* External Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="liveLink" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Live Demo URI (Optional)
                  </label>
                  <input
                    type="url"
                    id="liveLink"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    placeholder="https://client-demo.com"
                    className="px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-sans focus:outline-none focus:border-brand-purple transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="githubLink" className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Repository URI (Optional)
                  </label>
                  <input
                    type="url"
                    id="githubLink"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/repo"
                    className="px-4 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-xs font-sans focus:outline-none focus:border-brand-purple transition-colors"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-brand-border">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-grow py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                >
                  <Save size={12} />
                  {loading ? "Saving Record..." : "Commit Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-xl bg-white/5 border border-brand-border text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider hover:text-foreground dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
