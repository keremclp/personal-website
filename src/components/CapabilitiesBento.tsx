import React from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Globe, Layers, Smartphone } from "lucide-react";
import { Dictionary, Locale } from "@/lib/i18n";

interface CapabilitiesBentoProps {
  dict: Dictionary;
  locale: Locale;
}

export default function CapabilitiesBento({ dict, locale }: CapabilitiesBentoProps) {
  const isTr = locale === "tr";
  const [webService, softwareService, mobileService] = dict.home.services;

  return (
    <section className="w-full bg-surface border-y border-line py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-12">
        {/* Section Header */}
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

        {/* Visual Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Featured Wide Card: Corporate Web (7 cols, Deep Pine signature card) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0B1F1A] text-[#F6F7F2] border border-white/10 p-7 md:p-9 flex flex-col justify-between gap-8 relative overflow-hidden group">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C6F135]/15 blur-3xl pointer-events-none"
            />

            <div className="flex items-center justify-between gap-4 relative z-10">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-[#C6F135] text-[#0B1F1A] flex items-center justify-center">
                  <Globe size={19} strokeWidth={2} />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#C6F135] font-semibold">
                  {webService.tag}
                </span>
              </div>
              <Link
                href={`/contact?category=${encodeURIComponent(webService.title)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[#C6F135] hover:text-[#0B1F1A] text-xs font-semibold text-white transition-colors"
              >
                {dict.nav.cta}
                <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Visual Mini Browser Wireframe Stage */}
            <div className="relative z-10 rounded-2xl bg-[#112B24] border border-white/10 p-4 sm:p-5 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12 sm:col-span-7 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white/25" />
                  <span className="w-2 h-2 rounded-full bg-white/25" />
                  <span className="w-2 h-2 rounded-full bg-white/25" />
                  <span className="ml-2 text-[10px] font-mono text-white/45">markaniz.com</span>
                </div>
                <div className="h-3 w-3/4 rounded-full bg-white/90 mt-1" />
                <div className="h-2.5 w-1/2 rounded-full bg-[#C6F135]/90" />
                <div className="h-2 w-5/6 rounded-full bg-white/20 mt-1" />
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 rounded-full bg-[#C6F135] text-[#0B1F1A] text-[10px] font-bold">
                    {isTr ? "Teklif Al" : "Get Quote"}
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/20 text-[10px] text-white/75">
                    {isTr ? "Projeler" : "Work"}
                  </span>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-white/8 border border-white/10 p-3">
                  <span className="text-[10px] font-mono text-white/55 block">
                    {isTr ? "Açılış" : "Speed"}
                  </span>
                  <span className="text-lg font-extrabold text-[#C6F135]">0.8 sn</span>
                </div>
                <div className="rounded-xl bg-white/8 border border-white/10 p-3">
                  <span className="text-[10px] font-mono text-white/55 block">SEO</span>
                  <span className="text-lg font-extrabold text-white">99/100</span>
                </div>
                <div className="col-span-2 rounded-xl bg-white/6 border border-white/10 px-3 py-2 flex items-center justify-between text-[10px] text-white/80">
                  <span>{isTr ? "Mobil + Masaüstü" : "Mobile + Desktop"}</span>
                  <span className="text-[#C6F135] font-mono font-semibold">100%</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col gap-4">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">
                  {webService.title}
                </h3>
                <p className="text-sm text-[#B6C6C0] leading-relaxed mt-2 max-w-xl">
                  {webService.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {webService.deliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/12 text-xs text-white/90"
                  >
                    <Check size={12} className="text-[#C6F135]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Right Card: Custom Software & Portals (5 cols) */}
          <div className="lg:col-span-5 studio-card studio-card-interactive rounded-3xl p-7 md:p-8 flex flex-col justify-between gap-6">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
                  <Layers size={19} strokeWidth={2} />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-ink-muted font-semibold">
                  {softwareService.tag}
                </span>
              </div>
              <Link
                href={`/contact?category=${encodeURIComponent(softwareService.title)}`}
                className="w-9 h-9 rounded-full border border-line hover:border-line-strong flex items-center justify-center text-ink-secondary hover:text-ink transition-colors"
                aria-label={dict.nav.cta}
              >
                <ArrowUpRight size={15} />
              </Link>
            </div>

            {/* Visual Mini Dashboard Chart */}
            <div className="rounded-2xl bg-surface border border-line p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-ink">
                  {isTr ? "Canlı Operasyon Akışı" : "Live Operations"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-accent-soft text-accent font-mono text-[10px] font-semibold">
                  +38%
                </span>
              </div>
              <svg viewBox="0 0 260 64" className="w-full h-16 overflow-visible">
                <defs>
                  <linearGradient id="capChart" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15803D" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 54 C35 50, 58 34, 92 38 C126 42, 152 18, 190 20 C220 22, 240 8, 260 4 L260 64 L0 64 Z"
                  fill="url(#capChart)"
                />
                <path
                  d="M0 54 C35 50, 58 34, 92 38 C126 42, 152 18, 190 20 C220 22, 240 8, 260 4"
                  fill="none"
                  stroke="#15803D"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
                <circle cx="260" cy="4" r="4" fill="#15803D" />
              </svg>
              <div className="grid grid-cols-3 gap-2 text-[10px]">
                <div className="rounded-lg bg-surface-elevated border border-line px-2.5 py-1.5 text-center font-medium text-ink">
                  {isTr ? "CRM" : "CRM"}
                </div>
                <div className="rounded-lg bg-surface-elevated border border-line px-2.5 py-1.5 text-center font-medium text-ink">
                  {isTr ? "Yetkiler" : "Roles"}
                </div>
                <div className="rounded-lg bg-surface-elevated border border-line px-2.5 py-1.5 text-center font-medium text-ink">
                  {isTr ? "Raporlar" : "Reports"}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-bold text-ink tracking-tight">
                {softwareService.title}
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {softwareService.description}
              </p>
              <ul className="flex flex-col gap-2 pt-3 border-t border-line text-xs text-ink-secondary">
                {softwareService.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check size={13} className="text-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Full-Width Visual Strip Card: Mobile Apps (12 cols split) */}
          <div className="lg:col-span-12 studio-card studio-card-interactive rounded-3xl p-7 md:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center">
                  <Smartphone size={19} strokeWidth={2} />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-ink-muted font-semibold">
                  {mobileService.tag}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-ink tracking-tight">
                {mobileService.title}
              </h3>
              <p className="text-sm md:text-base text-ink-secondary leading-relaxed">
                {mobileService.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {mobileService.deliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-line text-xs text-ink-secondary"
                  >
                    <Check size={12} className="text-accent" />
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href={`/contact?category=${encodeURIComponent(mobileService.title)}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-accent transition-colors pt-2 w-fit group"
              >
                {dict.nav.cta}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {/* Visual Dual Mobile Preview Stage */}
            <div className="lg:col-span-6 rounded-2xl bg-surface border border-line p-5 sm:p-6 grid grid-cols-2 gap-4 items-center">
              <div className="rounded-2xl bg-[#0B1F1A] text-white p-4 shadow-md flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] text-white/60 font-mono">
                  <span>iOS · App Store</span>
                  <span className="w-2 h-2 rounded-full bg-[#C6F135]" />
                </div>
                <div className="text-sm font-bold leading-snug">
                  {isTr ? "Anlık Bildirim & Hızlı Erişim" : "Push Alerts & Instant Access"}
                </div>
                <div className="rounded-xl bg-white/10 px-3 py-2 text-[11px] text-[#C6F135] font-medium">
                  {isTr ? "✓ Yeni randevu onaylandı" : "✓ Booking confirmed"}
                </div>
              </div>
              <div className="rounded-2xl bg-surface-elevated border border-line p-4 shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] text-ink-muted font-mono">
                  <span>Android · Google Play</span>
                  <span className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <div className="text-sm font-bold text-ink leading-snug">
                  {isTr ? "Web ile Canlı Senkronizasyon" : "Real-Time Web Sync"}
                </div>
                <div className="flex items-center justify-between rounded-xl bg-surface px-3 py-2 text-[11px] text-ink-secondary">
                  <span>{isTr ? "Tek Yönetim Paneli" : "Single Admin"}</span>
                  <span className="font-mono font-bold text-accent">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
