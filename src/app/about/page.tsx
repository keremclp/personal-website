import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check, MessageSquare, Globe, Briefcase, Smartphone, Calendar } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.nav.about,
    description: dict.about.subtitle,
  };
}

const STACK_ICONS = [Globe, Briefcase, Smartphone];

export default async function About() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Studio Manifesto Hero */}
      <section className="w-full border-b border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-16 md:pt-16 md:pb-24">
          <div className="max-w-3xl flex flex-col gap-6 animate-fade-up">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.about.eyebrow}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[-0.035em] leading-[1.06] text-ink">
              {dict.about.title}
            </h1>
            <p className="text-base md:text-lg text-ink-secondary leading-relaxed">
              {dict.about.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-background hover:bg-accent-lime hover:text-[#0B1F1A] text-sm font-semibold transition-colors group"
              >
                {dict.about.primaryCta}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-line-strong bg-surface-elevated hover:bg-surface text-ink text-sm font-semibold transition-colors"
              >
                {dict.about.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Studio Principles */}
      <section className="w-full bg-surface border-b border-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-12">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.about.principlesEyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5">
              {dict.about.principlesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {dict.about.principles.map((item) => (
              <div key={item.number} className="studio-card rounded-2xl p-8 flex flex-col gap-4">
                <span className="text-xs font-mono font-semibold text-accent">{item.number}</span>
                <h3 className="text-xl font-bold text-ink tracking-tight">{item.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Founder Leadership & Engineering Foundation */}
      <section className="w-full py-20 md:py-28 border-b border-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Card (cleanly framed to crop out bottom-right corner mark while keeping authentic portrait) */}
          <div className="lg:col-span-5">
            <div className="studio-card rounded-3xl p-3 bg-surface-elevated max-w-md mx-auto lg:mx-0">
              <div className="w-full aspect-[4/4.6] rounded-2xl overflow-hidden bg-surface border border-line relative">
                <img
                  src="/images/founder.jpg"
                  alt={SITE_CONFIG.founderName}
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="px-3 pt-3.5 pb-1.5 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-ink">{SITE_CONFIG.founderName}</p>
                  <p className="text-xs text-ink-muted">{dict.about.founderRole}</p>
                </div>
                <span className="text-[11px] font-mono text-ink-muted">
                  {locale === "tr" ? "Kurucu" : "Founder"}
                </span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                {dict.about.leadershipEyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5 leading-tight">
                {dict.about.leadershipTitle}
              </h2>
            </div>

            <p className="text-base text-ink-secondary leading-relaxed">
              {dict.about.founderBio}
            </p>

            <ul className="flex flex-col gap-3 pt-2">
              {dict.about.founderHighlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 text-sm text-ink">
                  <span className="w-5 h-5 rounded-full bg-accent-soft text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Technology Stack */}
      <section className="w-full bg-surface border-b border-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-12">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.about.stackEyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5">
              {dict.about.stackTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {dict.about.stackCategories.map((category, idx) => {
              const Icon = STACK_ICONS[idx % STACK_ICONS.length];
              return (
                <div key={category.title} className="studio-card rounded-2xl p-7 flex flex-col gap-5">
                  <div className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-lg font-bold text-ink">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-medium text-ink-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Academic & Industry Background */}
      <section className="w-full py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-12">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.about.timelineEyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5">
              {dict.about.timelineTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dict.about.timeline.map((item) => (
              <div
                key={`${item.year}-${item.company}`}
                className="studio-card rounded-2xl p-7 flex flex-col gap-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-accent">
                    <Calendar size={12} />
                    {item.year}
                  </span>
                  <span className="text-xs font-mono text-ink-muted">{item.company}</span>
                </div>
                <h3 className="text-lg font-bold text-ink tracking-tight">{item.role}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-20 md:pb-28 w-full">
        <div className="rounded-3xl bg-[#0B1F1A] dark:bg-surface-elevated text-white border border-line px-8 py-12 md:px-14 md:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {dict.about.ctaTitle}
            </h2>
            <p className="text-sm sm:text-base text-[#B6C6C0] mt-2.5 leading-relaxed">
              {dict.about.ctaSubtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C6F135] text-[#0B1F1A] hover:bg-white text-sm font-bold transition-colors"
            >
              {dict.about.ctaPrimary}
              <ArrowRight size={15} />
            </Link>
            <a
              href={getWhatsAppUrl(dict.home.ctaWhatsAppPrefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
            >
              <MessageSquare size={15} />
              {dict.about.ctaWhatsApp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
