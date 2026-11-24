"use client";

import React, { useState } from "react";
import { Compass, Palette, ShieldCheck, Rocket, CheckCircle2, Clock } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const STEP_ICONS = [Compass, Palette, ShieldCheck, Rocket];

export default function ProcessShowcase() {
  const { locale, dict } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const isTr = locale === "tr";

  const steps = dict.home.processSteps;
  const current = steps[activeIndex] || steps[0];

  const stepMeta = isTr
    ? [
        {
          duration: "1–2 Gün",
          output: "Net Kapsam, Takvim & Teklif",
          items: [
            "Hedef kitle ve rakip analizi",
            "Sayfa haritası ve özellik kapsamı",
            "Sürprizsiz sabit teslim takvimi",
          ],
        },
        {
          duration: "4–7 Gün",
          output: "Onaylı Ekran Tasarımları",
          items: [
            "Markanıza özel modern görsel dil",
            "Masaüstü ve mobil tasarım önizlemesi",
            "Geliştirmeye geçmeden birebir revizyon",
          ],
        },
        {
          duration: "1–3 Hafta",
          output: "Canlı Test Linki & Kalite Kontrol",
          items: [
            "Hızlı, güvenli ve akıcı kodlama",
            "Telefon, tablet ve masaüstü testleri",
            "Google (SEO) ve hız optimizasyonu",
          ],
        },
        {
          duration: "Sürekli",
          output: "Sorunsuz Yayın & Teknik Destek",
          items: [
            "Alan adı, SSL ve canlı sunucu kurulumu",
            "Yönetim paneli kısa kullanım eğitimi",
            "Yayın sonrası doğrudan teknik destek",
          ],
        },
      ]
    : [
        {
          duration: "1–2 Days",
          output: "Clear Scope, Schedule & Proposal",
          items: [
            "Audience & positioning alignment",
            "Page map and functional scope",
            "Predictable milestone schedule",
          ],
        },
        {
          duration: "4–7 Days",
          output: "Approved Visual Screens",
          items: [
            "Bespoke brand-aligned visual direction",
            "Desktop and mobile layout previews",
            "Collaborative revisions before build",
          ],
        },
        {
          duration: "1–3 Weeks",
          output: "Live Staging Link & QA",
          items: [
            "Fast, reliable, secure implementation",
            "Cross-device phone, tablet & desktop QA",
            "Speed & search readiness checks",
          ],
        },
        {
          duration: "Ongoing",
          output: "Smooth Launch & Direct Care",
          items: [
            "Domain, SSL & production launch setup",
            "Short walkthrough for easy content updates",
            "Direct post-launch support as you grow",
          ],
        },
      ];

  const meta = stepMeta[activeIndex] || stepMeta[0];

  return (
    <section className="w-full py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
              {dict.home.processEyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-[-0.025em] text-ink mt-2.5 leading-tight">
              {dict.home.processTitle}
            </h2>
          </div>
          <p className="text-sm md:text-base text-ink-secondary max-w-md leading-relaxed">
            {dict.home.processSubtitle}
          </p>
        </div>

        {/* Interactive Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
          {/* Left: Interactive 4-Step Track */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            {steps.map((step, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length];
              const isActive = idx === activeIndex;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left rounded-2xl p-5 border transition-all cursor-pointer flex items-start gap-4 ${
                    isActive
                      ? "bg-[#0B1F1A] text-[#F6F7F2] border-[#0B1F1A] shadow-lg"
                      : "bg-surface-elevated border-line hover:border-line-strong text-ink"
                  }`}
                >
                  <span
                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-[#C6F135] text-[#0B1F1A]"
                        : "bg-surface border border-line text-accent"
                    }`}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-mono font-semibold tracking-wider ${
                          isActive ? "text-[#C6F135]" : "text-ink-muted"
                        }`}
                      >
                        {isTr ? `ADIM ${step.step}` : `STEP ${step.step}`}
                      </span>
                      <span
                        className={`text-[11px] font-mono ${
                          isActive ? "text-white/70" : "text-ink-muted"
                        }`}
                      >
                        {stepMeta[idx].duration}
                      </span>
                    </div>
                    <h3
                      className={`text-base font-bold mt-0.5 ${
                        isActive ? "text-white" : "text-ink"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed mt-1 ${
                        isActive ? "text-[#B6C6C0]" : "text-ink-secondary"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Live Visual Deliverable Preview Panel */}
          <div className="lg:col-span-6 studio-card rounded-3xl p-7 md:p-9 flex flex-col justify-between gap-8 bg-surface-elevated relative overflow-hidden">
            {/* Step Progress Dots */}
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-soft text-accent text-xs font-mono font-semibold">
                <Clock size={13} />
                <span>{meta.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {steps.map((s, idx) => (
                  <span
                    key={s.step}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? "w-8 bg-accent" : "w-2 bg-line-strong"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Visual Stage Content */}
            <div key={activeIndex} className="flex flex-col gap-6 animate-fade-up my-auto">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-ink-muted">
                  {isTr ? "Bu Aşamada Ne Teslim Alırsınız?" : "Deliverable at This Stage"}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-2">
                  {meta.output}
                </h3>
              </div>

              {/* Clean Visual Checklist Cards */}
              <div className="flex flex-col gap-3">
                {meta.items.map((item, i) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-surface border border-line px-4 py-3.5 flex items-center gap-3.5"
                  >
                    <span className="w-7 h-7 rounded-full bg-surface-elevated border border-line flex items-center justify-center text-accent shrink-0">
                      <CheckCircle2 size={15} />
                    </span>
                    <span className="text-sm font-medium text-ink">{item}</span>
                    <span className="ml-auto text-[11px] font-mono text-ink-muted">0{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Progress Bar */}
            <div className="pt-5 border-t border-line flex items-center justify-between text-xs text-ink-muted">
              <span>
                {isTr
                  ? `${current.step} / 04 · Onayınızla bir sonraki adıma geçilir`
                  : `${current.step} / 04 · Moves forward only with your approval`}
              </span>
              <span className="font-mono font-semibold text-accent">
                {(activeIndex + 1) * 25}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
