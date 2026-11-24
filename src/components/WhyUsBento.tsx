import React from "react";
import { Gauge, CalendarCheck2, ShieldCheck, Sparkles } from "lucide-react";
import { Dictionary, Locale } from "@/lib/i18n";

interface WhyUsBentoProps {
  dict: Dictionary;
  locale: Locale;
}

export default function WhyUsBento({ dict, locale }: WhyUsBentoProps) {
  const isTr = locale === "tr";
  const [item1, item2, item3] = dict.home.standardsItems;

  return (
    <section className="w-full bg-surface border-t border-line py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.home.standardsEyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5 leading-tight">
              {dict.home.standardsTitle}
            </h2>
          </div>
        </div>

        {/* Visual Asymmetric Bento Layout (Replaces 3 plain text boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Anchor Visual Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0B1F1A] text-white p-8 flex flex-col justify-between gap-8 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-[#C6F135]/15 blur-3xl pointer-events-none"
            />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/12 text-xs font-mono text-[#C6F135] w-fit">
              <Sparkles size={13} />
              <span>{isTr ? "Butik Stüdyo Standardı" : "Boutique Studio Standard"}</span>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                {item1.title}
              </h3>
              <p className="text-sm text-[#B6C6C0] leading-relaxed mt-3">
                {item1.description}
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-3 pt-4 border-t border-white/12">
              <div className="rounded-xl bg-white/8 p-3.5">
                <span className="text-2xl font-extrabold text-[#C6F135] block">0</span>
                <span className="text-[11px] text-white/75 mt-0.5 block">
                  {isTr ? "Hazır Şablon" : "Generic Templates"}
                </span>
              </div>
              <div className="rounded-xl bg-white/8 p-3.5">
                <span className="text-2xl font-extrabold text-white block">1-1</span>
                <span className="text-[11px] text-white/75 mt-0.5 block">
                  {isTr ? "Doğrudan İletişim" : "Direct Contact"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Stacked Visual Proof Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Speed & Clarity Visual Card */}
            <div className="studio-card rounded-3xl p-7 flex flex-col justify-between gap-6">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-2xl bg-accent-soft text-accent flex items-center justify-center">
                  <Gauge size={20} />
                </span>
                <span className="text-2xl font-extrabold font-mono text-ink">&lt; 1 sn</span>
              </div>

              {/* Clean Visual Speed Bars */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[11px] font-mono text-ink-muted">
                  <span>{isTr ? "Hız & Akıcılık" : "Speed & Clarity"}</span>
                  <span className="text-accent font-semibold">99/100</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-surface overflow-hidden">
                  <div className="h-full w-[96%] rounded-full bg-accent" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink leading-snug">{item2.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed mt-2">
                  {item2.description}
                </p>
              </div>
            </div>

            {/* Schedule Reliability Card */}
            <div className="studio-card rounded-3xl p-7 flex flex-col justify-between gap-6">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-2xl bg-accent-soft text-accent flex items-center justify-center">
                  <CalendarCheck2 size={20} />
                </span>
                <span className="text-2xl font-extrabold font-mono text-ink">24s</span>
              </div>

              {/* Visual Milestone Pills */}
              <div className="grid grid-cols-4 gap-1.5">
                {["01", "02", "03", "04"].map((step) => (
                  <div
                    key={step}
                    className="rounded-lg bg-surface border border-line py-2 text-center font-mono text-[11px] font-semibold text-accent"
                  >
                    {step} ✓
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink leading-snug">{item3.title}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed mt-2">
                  {item3.description}
                </p>
              </div>
            </div>

            {/* Bottom Full-Span Trust Banner */}
            <div className="sm:col-span-2 studio-card rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span className="w-10 h-10 rounded-xl bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">
                    {isTr
                      ? "Yayın sonrası da yalnız bırakmıyoruz."
                      : "We stay with you after launch day."}
                  </p>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    {isTr
                      ? "Güncelleme, hız takibi ve yeni özellik ihtiyaçlarınızda doğrudan destek."
                      : "Direct support for updates, speed monitoring, and future features."}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-line text-xs font-mono font-semibold text-ink shrink-0 w-fit">
                <span className="w-2 h-2 rounded-full bg-status-ok" />
                {isTr ? "Aktif Destek" : "Ongoing Care"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
