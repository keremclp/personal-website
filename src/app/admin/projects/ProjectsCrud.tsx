"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Edit2, Trash2, X, Save, Upload, Image as ImageIcon, Link2 } from "lucide-react";

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

const MAX_UPLOAD_DIMENSION = 1400;
const MAX_DATA_URL_LENGTH = 900_000; // ~675 KB binary safety cap for fast page loads

function compressImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Görsel dosyası okunamadı."));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Geçersiz görsel formatı."));
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_UPLOAD_DIMENSION || height > MAX_UPLOAD_DIMENSION) {
          const ratio = Math.min(MAX_UPLOAD_DIMENSION / width, MAX_UPLOAD_DIMENSION / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Görsel işleme başlatılamadı."));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        // Try crisp WebP first, fall back to JPEG if needed
        let dataUrl = canvas.toDataURL("image/webp", 0.84);
        if (!dataUrl.startsWith("data:image/webp")) {
          dataUrl = canvas.toDataURL("image/jpeg", 0.84);
        }
        if (dataUrl.length > MAX_DATA_URL_LENGTH) {
          dataUrl = canvas.toDataURL("image/jpeg", 0.72);
        }
        resolve(dataUrl);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function ProjectsCrud({ initialProjects }: ProjectsCrudProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    imageUrl: "",
    techStack: "",
    liveLink: "",
    githubLink: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const processImageFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Lütfen yalnızca PNG, JPG veya WebP formatında bir görsel yükleyin.");
      return;
    }
    setError("");
    setUploadingImage(true);
    try {
      const compressedDataUrl = await compressImageToDataUrl(file);
      setFormData((prev) => ({ ...prev, imageUrl: compressedDataUrl }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Görsel yüklenirken bir hata oluştu.");
    } finally {
      setUploadingImage(false);
    }
  }, []);

  // Support Ctrl+V direct screenshot paste while modal is open
  useEffect(() => {
    if (!isModalOpen) return;

    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            e.preventDefault();
            await processImageFile(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [isModalOpen, processImageFile]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImageFile(file);
    }
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processImageFile(file);
    }
  };

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      techStack: "Özel Tasarım",
      liveLink: "",
      githubLink: "",
      category: "",
    });
    setShowUrlInput(false);
    setError("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl,
      techStack: project.techStack || "Özel Tasarım",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      category: project.category,
    });
    setShowUrlInput(false);
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
    setError("");

    if (!formData.imageUrl.trim()) {
      setError("Lütfen bir proje görseli yükleyin veya görsel bağlantısı girin.");
      return;
    }

    setLoading(true);
    try {
      const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
      const method = editingProject ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          techStack: formData.techStack.trim() || "Özel Tasarım",
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
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold bg-ink text-background hover:bg-accent-lime hover:text-[#0B1F1A] transition-colors cursor-pointer"
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

      {/* Add/Edit Modal with Direct Image Upload, Drag-Drop & Ctrl+V Paste */}
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

              {/* Direct Image Upload Dropzone + Live Preview */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider">
                    Proje Görseli (Yükle · Sürükle · Ctrl+V Yapıştır)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput((prev) => !prev)}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-accent hover:underline cursor-pointer"
                  >
                    <Link2 size={12} />
                    {showUrlInput ? "URL Alanını Gizle" : "URL ile Ekle"}
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                    isDragging
                      ? "border-accent bg-accent-soft"
                      : "border-line-strong bg-surface hover:border-accent/60"
                  }`}
                >
                  {formData.imageUrl ? (
                    <div className="relative w-full aspect-[16/9] bg-surface-subtle group">
                      <img
                        src={formData.imageUrl}
                        alt="Seçilen proje görseli"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-ink/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                        <Upload size={22} />
                        <span className="text-xs font-semibold">
                          Yeni Görsel Yüklemek İçin Tıklayın veya Sürükleyin
                        </span>
                        <span className="text-[11px] text-white/75">
                          (Ekran görüntüsünü doğrudan Ctrl + V ile yapıştırabilirsiniz)
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-10 px-6 flex flex-col items-center justify-center text-center gap-2.5">
                      <div className="w-12 h-12 rounded-2xl bg-surface-elevated border border-line flex items-center justify-center text-accent">
                        {uploadingImage ? <ImageIcon size={20} className="animate-pulse" /> : <Upload size={20} />}
                      </div>
                      <p className="text-sm font-semibold text-ink">
                        {uploadingImage
                          ? "Görsel optimize ediliyor..."
                          : "Bilgisayardan Fotoğraf Seçin veya Buraya Sürükleyin"}
                      </p>
                      <p className="text-xs text-ink-muted">
                        PNG, JPG, WebP desteklenir · Ekran görüntüsü alıp doğrudan{" "}
                        <strong className="text-ink">Ctrl + V</strong> ile yapıştırabilirsiniz
                      </p>
                    </div>
                  )}
                </div>

                {formData.imageUrl && (
                  <div className="flex items-center justify-between text-[11px] text-ink-muted">
                    <span>
                      {formData.imageUrl.startsWith("data:image/")
                        ? "✓ Görsel optimize edildi ve doğrudan veritabanına kaydedilmeye hazır."
                        : `Görsel kaynağı: ${formData.imageUrl}`}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="text-accent font-semibold hover:underline cursor-pointer"
                    >
                      Değiştir
                    </button>
                  </div>
                )}

                {showUrlInput && (
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl.startsWith("data:image/") ? "" : formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://ornek.com/ekran-goruntusu.png"
                    className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent"
                  />
                )}
              </div>

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
                    placeholder="Örn: Kurumsal Web, E-Ticaret, Mobil, Özel Yazılım"
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
                  placeholder="Projenin kapsamını ve müşteriye sağladığı değeri özetleyin..."
                  className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent resize-none"
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
                    htmlFor="techStack"
                    className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
                  >
                    Etiketler / Kapsam (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    id="techStack"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    placeholder="Kurumsal Web, Çoklu Dil, Yönetim Paneli"
                    className="px-4 py-2.5 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3 pt-4 border-t border-line">
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="flex-grow py-3 rounded-full bg-ink text-background hover:bg-accent-lime hover:text-[#0B1F1A] text-xs font-semibold inline-flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer transition-colors"
                >
                  <Save size={13} />
                  {loading ? "Kaydediliyor..." : "Veritabanına Kaydet"}
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
