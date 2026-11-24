"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Save } from "lucide-react";

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
  { label: "Kurumsal Web", path: "/projects/showcase-web.jpg" },
  { label: "E-Ticaret Vitrini", path: "/projects/showcase-ecommerce.jpg" },
  { label: "Yönetim Portalı", path: "/projects/showcase-portal.jpg" },
  { label: "Mobil Uygulama", path: "/projects/showcase-mobile.jpg" },
];

export default function ProjectsCrud({ initialProjects }: ProjectsCrudProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

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
    imageUrl: "/projects/showcase-web.jpg",
    techStack: "",
    liveLink: "",
    githubLink: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      imageUrl: "/projects/showcase-web.jpg",
      techStack: "",
      liveLink: "",
      githubLink: "",
      category: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        throw new Error(data.error || "Proje kaydedilemedi.");
      }

      if (editingProject) {
        setProjects(projects.map((p) => (p.id === editingProject.id ? data : p)));
      } else {
        setProjects([data, ...projects]);
      }

      setIsModalOpen(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Beklenmedik bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu projeyi kalıcı olarak silmek istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Proje silinemedi.");
      }

      setProjects(projects.filter((p) => p.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Beklenmedik bir hata oluştu.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Actions Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-line">
        <span className="text-xs font-mono font-semibold text-ink-muted uppercase tracking-wider">
          Portfolyo Kayıtları ({projects.length})
        </span>
        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-ink text-background hover:bg-accent hover:text-white transition-colors cursor-pointer"
        >
          <Plus size={14} />
          Yeni Proje Ekle
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="studio-card p-16 text-center rounded-3xl">
          <p className="text-ink-muted text-sm">
            Henüz proje eklenmemiş. Yukarıdaki &quot;Yeni Proje Ekle&quot; butonunu kullanabilirsiniz.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="studio-card rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="w-full aspect-[16/10] relative overflow-hidden bg-surface border-b border-line">
                <img
                  src={project.imageUrl || "/projects/showcase-web.jpg"}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-surface-elevated/92 border border-line text-[10px] font-mono font-medium text-ink">
                  {project.category}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-grow gap-2.5">
                <h3 className="text-base font-bold text-ink leading-snug line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-line">
                  {project.techStack
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-surface border border-line text-[10px] font-mono text-ink-muted"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex items-center gap-2 px-5 py-3 border-t border-line bg-surface/60">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(project)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-elevated border border-line text-xs font-medium text-ink hover:border-line-strong transition-colors cursor-pointer"
                >
                  <Edit2 size={12} />
                  Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  className="p-2 rounded-lg border border-red-500/20 bg-red-500/8 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Projeyi Sil"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/55 dark:bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-surface-elevated border border-line rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface/60">
              <h3 className="text-sm font-bold text-ink">
                {editingProject ? "Projeyi Güncelle" : "Yeni Proje Oluştur"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full border border-line bg-surface-elevated text-ink-secondary hover:text-ink flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-grow overflow-y-auto p-6 md:p-8 flex flex-col gap-5"
            >
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="title"
                    className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                  >
                    Proje Başlığı
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Örn: Kurumsal Web Platformu"
                    className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="category"
                    className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                  >
                    Kategori
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Örn: Kurumsal Web, SaaS, E-Ticaret, Mobil"
                    className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="description"
                  className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                >
                  Proje Açıklaması
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Projenin kapsamını ve sağladığı değeri özetleyin..."
                  className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="imageUrl"
                  className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                >
                  Görsel Yolu veya URL (Veritabanına Doğrudan Kaydedilir)
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  required
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Örn: https://... veya /projects/showcase-web.jpg"
                  className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent"
                />

                {/* Visual Thumbnail Picker */}
                <div className="flex flex-col gap-2 mt-1">
                  <span className="text-[11px] font-mono text-ink-muted">
                    Hazır Stüdyo Görseli Seç (Tek Tıkla DB&apos;ye Kaydet):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {DEFAULT_IMAGES.map((img) => {
                      const active = formData.imageUrl === img.path;
                      return (
                        <button
                          key={img.path}
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: img.path })}
                          className={`rounded-xl overflow-hidden border text-left transition-all cursor-pointer bg-surface ${
                            active
                              ? "border-accent ring-2 ring-accent/30"
                              : "border-line hover:border-line-strong"
                          }`}
                        >
                          <div className="w-full aspect-[16/10] bg-surface-subtle overflow-hidden">
                            <img
                              src={img.path}
                              alt={img.label}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div
                            className={`px-2 py-1.5 text-[10px] font-semibold truncate ${
                              active ? "text-accent" : "text-ink-secondary"
                            }`}
                          >
                            {img.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="techStack"
                  className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                >
                  Teknolojiler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  id="techStack"
                  name="techStack"
                  required
                  value={formData.techStack}
                  onChange={handleChange}
                  placeholder="Next.js, TypeScript, Tailwind CSS, PostgreSQL"
                  className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="liveLink"
                    className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                  >
                    Canlı Site Linki (Opsiyonel)
                  </label>
                  <input
                    type="url"
                    id="liveLink"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleChange}
                    placeholder="https://ornekproje.com"
                    className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="githubLink"
                    className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                  >
                    GitHub Linki (Opsiyonel)
                  </label>
                  <input
                    type="url"
                    id="githubLink"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    placeholder="https://github.com/keremclp/..."
                    className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3 pt-4 border-t border-line">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-grow py-3 rounded-full bg-ink text-background hover:bg-accent hover:text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer transition-colors"
                >
                  <Save size={13} />
                  {loading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded-full border border-line bg-surface text-xs font-semibold text-ink-secondary hover:text-ink transition-colors cursor-pointer"
                >
                  Vazgeç
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
