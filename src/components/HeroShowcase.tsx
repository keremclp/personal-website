"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Globe,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  TrendingUp,
  Calendar,
  Star,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

type ShowcaseTab = "web" | "panel" | "mobile";

export default function HeroShowcase() {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("web");

  const isTr = locale === "tr";

  const tabs: { id: ShowcaseTab; label: string; icon: React.ElementType }[] = [
    { id: "web", label: isTr ? "Kurumsal Web" : "Brand Web", icon: Globe },
    { id: "panel", label: isTr ? "Yönetim Paneli" : "Portal", icon: LayoutDashboard },
    { id: "mobile", label: isTr ? "Mobil Uygulama" : "Mobile App", icon: Smartphone },
  ];

  return (
    <div className="relative w-full">
      {/* Subtle architectural ambient glow (Kinetik Prizma) */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#C6F135]/20 via-transparent to-[#15803D]/15 blur-2xl pointer-events-none"
      />

      <div className="relative studio-card rounded-3xl overflow-hidden bg-surface-elevated border border-line-strong/80 shadow-xl">
        {/* Top Interactive Chrome Bar */}
        <div className="px-4 py-3 border-b border-line bg-surface/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] dark:bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] dark:bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] dark:bg-white/15" />
          </div>

          {/* Interactive Preview Switcher */}
          <div
            className="inline-flex items-center p-0.5 rounded-full bg-surface-elevated border border-line"
            role="tablist"
          >
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-ink text-background shadow-xs"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  <Icon size={12} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Rich Visual Stage */}
        <div className="relative aspect-[4/3.1] sm:aspect-[4/3] w-full overflow-hidden bg-[#0B1F1A]">
          {/* TAB 1: Corporate Brand Website Preview */}
          {activeTab === "web" && (
            <div className="w-full h-full relative flex flex-col justify-between p-5 sm:p-7 bg-gradient-to-br from-[#071612] via-[#0B1F1A] to-[#13332A] text-white animate-fade-up">
              {/* Subtle Architectural Lighting & Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.22) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C6F135]/20 blur-3xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none"
              />

              {/* Mini Website Top Bar */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#C6F135] text-[#0B1F1A] font-extrabold text-[10px] flex items-center justify-center">
                    M
                  </span>
                  <span className="text-xs font-bold tracking-wider uppercase text-white/95">
                    {isTr ? "MİMARİ & YAPI" : "ATELIER ARCH"}
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-[11px] text-white/70">
                  <span>{isTr ? "Projeler" : "Projects"}</span>
                  <span>{isTr ? "Hakkımızda" : "About"}</span>
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#0B1F1A] font-semibold">
                    {isTr ? "İletişim" : "Contact"}
                  </span>
                </div>
              </div>

              {/* Mini Website Hero + Floating Mobile Card */}
              <div className="relative z-10 grid grid-cols-12 gap-4 items-end my-auto py-2">
                <div className="col-span-12 sm:col-span-7 flex flex-col gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] font-medium text-[#C6F135] w-fit">
                    <Sparkles size={10} />
                    {isTr ? "Özel Kurumsal Web Tasarımı" : "Bespoke Corporate Experience"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-[1.12] text-white">
                    {isTr
                      ? "Zamansız mekanlar, güçlü dijital vitrin."
                      : "Timeless spaces, unforgettable presence."}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/75 leading-relaxed max-w-xs">
                    {isTr
                      ? "İlk saniyede prestij ve güven sunan, yüksek dönüşümlü marka deneyimi."
                      : "High-trust editorial storytelling engineered to convert visitors into leads."}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#C6F135] text-[#0B1F1A] text-[11px] font-bold shadow-lg shadow-black/25">
                      {isTr ? "Teklif İste" : "Get Proposal"}
                      <ArrowUpRight size={12} />
                    </span>
                    <span className="px-3 py-1.5 rounded-full border border-white/20 text-[11px] text-white/85">
                      {isTr ? "Portfolyo" : "Work"}
                    </span>
                  </div>
                </div>

                {/* Overlapping Crisp Result Card */}
                <div className="hidden sm:flex col-span-5 flex-col gap-2.5">
                  <div className="rounded-2xl bg-white text-[#0B1F1A] p-3.5 shadow-2xl border border-white/60">
                    <div className="flex items-center justify-between text-[10px] text-[#5F716B] font-medium">
                      <span>{isTr ? "Aylık Teklif Artışı" : "Monthly Inquiries"}</span>
                      <TrendingUp size={12} className="text-[#15803D]" />
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl font-extrabold tracking-tight">+142%</span>
                      <span className="text-[10px] font-semibold text-[#15803D] bg-[#ECFCCB] px-1.5 py-0.5 rounded-full">
                        {isTr ? "Canlıda" : "Live"}
                      </span>
                    </div>
                    {/* Mini Sparkline */}
                    <svg viewBox="0 0 120 32" className="w-full h-7 mt-2 overflow-visible">
                      <defs>
                        <linearGradient id="heroSpark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#15803D" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 26 C20 24, 32 18, 48 16 C64 14, 78 19, 94 9 C104 3, 112 4, 120 2 L120 32 L0 32 Z"
                        fill="url(#heroSpark)"
                      />
                      <path
                        d="M0 26 C20 24, 32 18, 48 16 C64 14, 78 19, 94 9 C104 3, 112 4, 120 2"
                        fill="none"
                        stroke="#15803D"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 px-3 py-2 flex items-center justify-between text-[10px] text-white/90">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-[#C6F135]" />
                      {isTr ? "Mobil & Google Uyumlu" : "Mobile & SEO Ready"}
                    </span>
                    <span className="font-mono font-semibold text-[#C6F135]">99/100</span>
                  </div>
                </div>
              </div>

              {/* Bottom Strip inside Web Preview */}
              <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-[10px]">
                <div className="rounded-lg bg-white/8 px-2.5 py-1.5">
                  <span className="text-white/55 block">{isTr ? "Açılış Hızı" : "Load Speed"}</span>
                  <span className="font-bold text-white">0.8 sn</span>
                </div>
                <div className="rounded-lg bg-white/8 px-2.5 py-1.5">
                  <span className="text-white/55 block">{isTr ? "Dil Desteği" : "Languages"}</span>
                  <span className="font-bold text-white">TR / EN</span>
                </div>
                <div className="rounded-lg bg-white/8 px-2.5 py-1.5">
                  <span className="text-white/55 block">{isTr ? "Yönetim" : "Control"}</span>
                  <span className="font-bold text-white">{isTr ? "Özel Panel" : "Easy CMS"}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Executive Management Panel Preview */}
          {activeTab === "panel" && (
            <div className="w-full h-full p-5 sm:p-6 bg-gradient-to-br from-[#F6F7F2] to-[#E8EDE2] text-[#0B1F1A] flex flex-col gap-4 animate-fade-up">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#15803D] font-semibold">
                    {isTr ? "Yönetim Özeti" : "Executive Overview"}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-[#0B1F1A]">
                    {isTr ? "Canlı İş & Müşteri Takibi" : "Live Operations & Clients"}
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#ECFCCB] text-[#166534] text-[10px] font-semibold inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  {isTr ? "Anlık Güncel" : "Live Sync"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div className="rounded-xl bg-white p-3 border border-black/8 shadow-xs">
                  <span className="text-[10px] text-[#5F716B] block">
                    {isTr ? "Aylık Ciro" : "Monthly Revenue"}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-[#0B1F1A] mt-0.5 block">
                    {isTr ? "₺485.000" : "$48,500"}
                  </span>
                  <span className="text-[10px] font-semibold text-[#15803D]">+18.4%</span>
                </div>
                <div className="rounded-xl bg-white p-3 border border-black/8 shadow-xs">
                  <span className="text-[10px] text-[#5F716B] block">
                    {isTr ? "Yeni Talepler" : "New Inquiries"}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-[#0B1F1A] mt-0.5 block">
                    64
                  </span>
                  <span className="text-[10px] font-semibold text-[#166534]">
                    {isTr ? "12 bekliyor" : "12 pending"}
                  </span>
                </div>
                <div className="rounded-xl bg-white p-3 border border-black/8 shadow-xs">
                  <span className="text-[10px] text-[#5F716B] block">
                    {isTr ? "Memnuniyet" : "Retention"}
                  </span>
                  <span className="text-base sm:text-lg font-extrabold text-[#0B1F1A] mt-0.5 block">
                    98%
                  </span>
                  <span className="text-[10px] font-semibold text-[#15803D]">
                    {isTr ? "Yüksek" : "Strong"}
                  </span>
                </div>
              </div>

              {/* Clean Chart Card */}
              <div className="flex-1 rounded-2xl bg-white p-4 border border-black/8 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#0B1F1A]">
                  <span>{isTr ? "Büyüme Performansı" : "Growth Performance"}</span>
                  <span className="text-[10px] font-mono text-[#5F716B]">Q1 – Q4</span>
                </div>
                <svg viewBox="0 0 320 82" className="w-full h-20 mt-1 overflow-visible">
                  <defs>
                    <linearGradient id="panelChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#15803D" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 68 C40 62, 65 48, 105 52 C145 56, 175 30, 215 28 C255 26, 285 12, 320 6 L320 82 L0 82 Z"
                    fill="url(#panelChartGrad)"
                  />
                  <path
                    d="M0 68 C40 62, 65 48, 105 52 C145 56, 175 30, 215 28 C255 26, 285 12, 320 6"
                    fill="none"
                    stroke="#15803D"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  <circle cx="320" cy="6" r="4.5" fill="#15803D" stroke="#FFFFFF" strokeWidth="2" />
                </svg>
                <div className="flex items-center justify-between text-[10px] text-[#5F716B] pt-1 border-t border-black/6">
                  <span>{isTr ? "Otomatik Raporlama" : "Automated Reports"}</span>
                  <span className="font-semibold text-[#0B1F1A]">
                    {isTr ? "Tek Panelden Tam Kontrol" : "Full Control in One Place"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Mobile App Showcase Preview */}
          {activeTab === "mobile" && (
            <div className="w-full h-full p-5 sm:p-6 bg-gradient-to-br from-[#EDF0E6] via-[#E3E9DA] to-[#D8E1CD] text-[#0B1F1A] flex items-center justify-center gap-4 sm:gap-6 animate-fade-up">
              {/* Phone 1 */}
              <div className="w-[46%] max-w-[195px] h-[92%] rounded-[1.75rem] bg-[#0B1F1A] p-2 shadow-2xl flex flex-col">
                <div className="w-full h-full rounded-[1.35rem] bg-white overflow-hidden flex flex-col">
                  <div className="h-[44%] relative bg-gradient-to-br from-[#0B1F1A] via-[#12332A] to-[#166534] p-3 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between text-[9px] text-white/80">
                      <span>9:41</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-[#C6F135] text-[#0B1F1A] font-bold">
                        VIP
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#C6F135] block">
                        {isTr ? "Özel Deneyim" : "Featured"}
                      </span>
                      <span className="text-xs font-bold leading-tight block mt-0.5">
                        {isTr ? "Hızlı Randevu & Takip" : "Instant Booking"}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#0B1F1A]">
                        {isTr ? "Bugünkü Program" : "Today's Plan"}
                      </span>
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600">
                        <Star size={10} className="fill-amber-500 text-amber-500" /> 4.9
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F3F5EE] text-[9px] flex items-center justify-between">
                      <span className="font-semibold text-[#0B1F1A]">
                        {isTr ? "Müşteri Görüşmesi" : "Client Session"}
                      </span>
                      <span className="text-[#15803D] font-mono font-semibold">14:30</span>
                    </div>
                    <div className="w-full py-1.5 rounded-full bg-[#0B1F1A] text-[#C6F135] text-center text-[10px] font-bold">
                      {isTr ? "Onayla" : "Confirm"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 */}
              <div className="w-[46%] max-w-[195px] h-[86%] rounded-[1.75rem] bg-[#0B1F1A] p-2 shadow-xl flex flex-col translate-y-2">
                <div className="w-full h-full rounded-[1.35rem] bg-[#F6F7F2] p-3.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0B1F1A]">
                      {isTr ? "Bildirimler" : "Updates"}
                    </span>
                    <Calendar size={12} className="text-[#15803D]" />
                  </div>
                  <div className="flex flex-col gap-2 my-auto">
                    <div className="p-2.5 rounded-xl bg-white border border-black/8 shadow-xs">
                      <span className="text-[9px] font-semibold text-[#15803D] block">
                        {isTr ? "Yeni Sipariş" : "New Order"}
                      </span>
                      <span className="text-[11px] font-bold text-[#0B1F1A]">
                        {isTr ? "Ödeme Onaylandı" : "Payment Confirmed"}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-black/8 shadow-xs">
                      <span className="text-[9px] font-semibold text-[#166534] block">
                        {isTr ? "Müşteri Mesajı" : "Client Inquiry"}
                      </span>
                      <span className="text-[11px] font-bold text-[#0B1F1A]">
                        {isTr ? "Teklif Talebi Geldi" : "Proposal Requested"}
                      </span>
                    </div>
                  </div>
                  <div className="text-[9px] text-center text-[#5F716B] font-medium">
                    iOS & Android
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Caption Bar (Clean, Zero Technical Jargon) */}
        <div className="px-5 py-3 bg-surface-elevated border-t border-line flex items-center justify-between gap-4 text-[11px] font-mono text-ink-muted">
          <span className="truncate">
            {isTr
              ? "Tıklayarak inceleyin · Web, Panel & Mobil Deneyimi"
              : "Click tabs to preview · Web, Portal & Mobile"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-ink font-medium shrink-0">
            <CheckCircle2 size={13} className="text-accent" />
            {isTr ? "Özel Tasarım · Hızlı" : "Bespoke · Fast"}
          </span>
        </div>
      </div>
    </div>
  );
}
