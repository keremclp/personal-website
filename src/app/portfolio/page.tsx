import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import PortfolioClient from "./PortfolioClient";

export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.nav.portfolio,
    description: dict.portfolio.subtitle,
  };
}

export default async function Portfolio() {
  const [projects, locale] = await Promise.all([db.projects.findMany(), getServerLocale()]);
  const dict = getDictionary(locale);

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <section className="w-full border-b border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-14 md:pt-16 md:pb-20">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.portfolio.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-ink mt-3 leading-[1.08]">
              {dict.portfolio.title}
            </h1>
            <p className="mt-5 text-base md:text-lg text-ink-secondary leading-relaxed">
              {dict.portfolio.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Showcase */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-14 md:py-20 w-full">
        <PortfolioClient initialProjects={JSON.parse(JSON.stringify(projects))} />
      </section>

      {/* Closing CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full">
        <div className="studio-card rounded-3xl p-8 md:p-12 bg-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-ink">
              {dict.portfolio.ctaTitle}
            </h2>
            <p className="text-sm md:text-base text-ink-secondary mt-2 leading-relaxed">
              {dict.portfolio.ctaSubtitle}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-background hover:bg-accent-lime hover:text-[#0B1F1A] text-sm font-semibold transition-colors shrink-0 group"
          >
            {dict.portfolio.ctaButton}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
