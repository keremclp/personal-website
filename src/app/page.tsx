import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Globe,
  Layers,
  Smartphone,
  MessageSquare,
} from "lucide-react";
import { db } from "@/lib/db";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import { getWhatsAppUrl } from "@/lib/siteConfig";
import FeaturedProjectsGrid from "@/components/FeaturedProjectsGrid";
import HeroShowcase from "@/components/HeroShowcase";

export const revalidate = 0;

const SERVICE_ICONS = [Globe, Layers, Smartphone];

export default async function Home() {
  const [projects, locale] = await Promise.all([db.projects.findMany(), getServerLocale()]);
  const dict = getDictionary(locale);
  const featuredProjects = JSON.parse(JSON.stringify(projects.slice(0, 3)));

  return (
    <div className="w-full flex flex-col">
      {/* 1. Editorial Visual-First Hero */}
      <section className="relative w-full border-b border-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 flex flex-col items-start gap-6 animate-fade-up">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-elevated border border-line text-xs font-medium text-ink-secondary shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-ok opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-status-ok" />
                </span>
                <span>{dict.home.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl xl:text-[3.5rem] font-extrabold tracking-[-0.035em] leading-[1.06] text-ink">
                {dict.home.heroTitleLine1}
                <span className="text-accent">{dict.home.heroTitleHighlight}</span>
              </h1>

              <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-xl">
                {dict.home.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-ink text-background hover:bg-accent-lime hover:text-[#0B1F1A] text-sm font-semibold transition-all duration-200 active:scale-[0.98] group"
                >
                  {dict.home.primaryCta}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-line-strong bg-surface-elevated hover:bg-surface text-ink text-sm font-semibold transition-colors"
                >
                  {dict.home.secondaryCta}
                </Link>
              </div>

              {/* Compact Studio Proof Bar */}
              <div className="grid grid-cols-2 gap-6 pt-6 mt-2 border-t border-line w-full max-w-md">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                    {dict.home.heroMetric1Label}
                  </span>
                  <span className="text-sm font-semibold text-ink mt-1 block">
                    {dict.home.heroMetric1Value}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted block">
                    {dict.home.heroMetric2Label}
                  </span>
                  <span className="text-sm font-semibold text-ink mt-1 block">
                    {dict.home.heroMetric2Value}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Interactive Visual Showcase */}
            <div className="lg:col-span-6 animate-fade-up">
              <HeroShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Studio Trust Pillars */}
      <section className="w-full bg-surface border-b border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {dict.home.trustPillars.map((pillar, idx) => (
              <div key={pillar.title} className="flex flex-col gap-1.5">
                <span className="text-[11px] font-mono text-accent font-semibold">
                  0{idx + 1}
                </span>
                <h2 className="text-sm font-bold text-ink">{pillar.title}</h2>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  {pillar.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Selected Portfolio Showcase (Clickable Cards -> Clean Case Study Modal) */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                {dict.home.projectsEyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5 leading-tight">
                {dict.home.projectsTitle}
              </h2>
              <p className="text-sm md:text-base text-ink-secondary mt-3 leading-relaxed">
                {dict.home.projectsSubtitle}
              </p>
            </div>

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent transition-colors border-b border-line-strong hover:border-accent pb-1 w-fit shrink-0 group"
            >
              {dict.home.projectsViewAll}
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <FeaturedProjectsGrid projects={featuredProjects} />
        </div>
      </section>

      {/* 4. Capabilities / Services */}
      <section className="w-full bg-surface border-y border-line py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                {dict.home.servicesEyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5 leading-tight">
                {dict.home.servicesTitle}
              </h2>
            </div>
            <p className="text-sm md:text-base text-ink-secondary max-w-md leading-relaxed">
              {dict.home.servicesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {dict.home.services.map((service, index) => {
              const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
              return (
                <div
                  key={service.title}
                  className="studio-card studio-card-interactive rounded-2xl p-8 flex flex-col gap-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-ink-muted">
                      {service.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-ink tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-ink-secondary leading-relaxed mt-2.5">
                      {service.description}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-2.5 mt-auto pt-5 border-t border-line text-xs text-ink-secondary">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check size={14} className="text-accent shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/contact?category=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink hover:text-accent transition-colors pt-1 w-fit group"
                  >
                    {dict.nav.cta}
                    <ArrowRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. How We Work ("Nasıl Çalışıyoruz?") */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-14">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.home.processEyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5 leading-tight">
              {dict.home.processTitle}
            </h2>
            <p className="text-sm md:text-base text-ink-secondary mt-3 leading-relaxed">
              {dict.home.processSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dict.home.processSteps.map((item) => (
              <div
                key={item.step}
                className="studio-card rounded-2xl p-7 flex flex-col gap-4 relative"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-line font-mono text-xs font-semibold text-accent">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-ink tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Partner With Us */}
      <section className="w-full bg-surface border-t border-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.home.standardsEyebrow}
            </span>
            <h2 className="text-3xl font-extrabold tracking-[-0.025em] text-ink mt-2.5 leading-tight">
              {dict.home.standardsTitle}
            </h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {dict.home.standardsItems.map((item) => (
              <div
                key={item.title}
                className="bg-surface-elevated border border-line rounded-2xl p-6 flex flex-col gap-2.5"
              >
                <h3 className="text-base font-bold text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. High-Contrast Architectural CTA */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="rounded-3xl bg-[#0B1F1A] dark:bg-surface-elevated text-[#F6F7F2] border border-line px-8 py-14 md:px-16 md:py-20 flex flex-col items-center text-center gap-6 relative overflow-hidden">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#C6F135]">
              {dict.home.ctaEyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-tight max-w-2xl text-white">
              {dict.home.ctaTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#B6C6C0] max-w-xl leading-relaxed">
              {dict.home.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C6F135] text-[#0B1F1A] hover:bg-white text-sm font-bold transition-colors group"
              >
                {dict.home.ctaPrimary}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={getWhatsAppUrl(dict.home.ctaWhatsAppPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
              >
                <MessageSquare size={15} />
                {dict.home.ctaWhatsApp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
