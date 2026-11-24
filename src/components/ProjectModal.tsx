"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowUpRight, Calendar, CheckCircle2 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export interface SerializedProject {
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

interface ProjectModalProps {
  project: SerializedProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { locale, dict } = useLocale();

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    locale === "tr" ? "tr-TR" : "en-US",
    { year: "numeric", month: "long" }
  );

  const highlights =
    locale === "tr"
      ? [
          "Markaya özel modern arayüz tasarımı",
          "Telefon, tablet ve masaüstü tam uyumluluk",
          "Yüksek açılış hızı ve güvenilir yayın altyapısı",
        ]
      : [
          "Bespoke brand-aligned interface design",
          "Responsive across phone, tablet, and desktop",
          "Fast loading and reliable production setup",
        ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/55 dark:bg-black/75 backdrop-blur-sm animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-surface-elevated border border-line rounded-3xl overflow-hidden flex flex-col max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-surface/60">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.portfolio.modalEyebrow}
            </span>
            <span className="text-line-strong">·</span>
            <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-line bg-surface-elevated text-ink-secondary hover:text-ink hover:border-line-strong flex items-center justify-center transition-colors cursor-pointer"
            aria-label={dict.portfolio.modalClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Clean Visual & Actions */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-line bg-surface">
              <img
                src={project.imageUrl || "/projects/showcase-web.jpg"}
                alt={project.title}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-background hover:bg-accent hover:text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  {dict.portfolio.modalLiveDemo}
                  <ArrowUpRight size={14} />
                </a>
              )}
              <Link
                href={`/contact?category=${encodeURIComponent(project.category)}`}
                onClick={onClose}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                  project.liveLink
                    ? "border border-line bg-surface hover:border-line-strong text-ink"
                    : "bg-ink text-background hover:bg-accent hover:text-white"
                }`}
              >
                {dict.portfolio.modalRequestSimilar}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: Business-Friendly Scope (No Tech Jargon) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-accent-soft text-accent text-[11px] font-mono font-medium uppercase tracking-wider">
                {project.category}
              </span>
              <h2
                id="project-modal-title"
                className="text-2xl font-bold text-ink tracking-tight mt-3 leading-snug"
              >
                {project.title}
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
                {dict.portfolio.modalOverviewTitle}
              </h4>
              <p className="text-sm text-ink-secondary leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-line">
              <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-ink-muted">
                {dict.portfolio.modalTechTitle}
              </h4>
              <ul className="flex flex-col gap-2 text-xs text-ink-secondary">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-4 border-t border-line flex items-center justify-between text-xs text-ink-muted">
              <span className="inline-flex items-center gap-1.5 font-mono">
                <Calendar size={12} />
                {dict.portfolio.modalDateLabel}: {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
