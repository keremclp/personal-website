import React from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Mail, CheckCircle2, Inbox, Clock } from "lucide-react";
import { db } from "@/lib/db";
import AdminNav from "@/components/AdminNav";

export const revalidate = 0;

export default async function AdminDashboard() {
  const [projects, leads] = await Promise.all([db.projects.findMany(), db.leads.findMany()]);

  const totalInquiries = leads.length;
  const newInquiries = leads.filter((l) => l.status === "NEW").length;
  const reviewedInquiries = leads.filter((l) => l.status === "REVIEWED").length;
  const totalProjects = projects.length;

  // Real category distribution computed from actual DB leads
  const categoryCounts = new Map<string, number>();
  leads.forEach((lead) => {
    const key = (lead.category || "Genel").trim();
    categoryCounts.set(key, (categoryCounts.get(key) || 0) + 1);
  });

  const categoryBreakdown = Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      percent: totalInquiries > 0 ? Math.round((count / totalInquiries) * 100) : 0,
    }));

  const recentLeads = leads.slice(0, 4);

  return (
    <div className="w-full flex flex-col gap-8 pb-16 min-h-screen bg-background">
      <AdminNav isSupabase={db.isSupabase} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col gap-10">
        {/* Header */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-ink">Genel Bakış</h1>
            <p className="text-sm text-ink-secondary mt-1">
              Canlı portfolyo ve gelen müşteri tekliflerinin özet durumu.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated border border-line text-xs font-mono text-ink-secondary w-fit">
            <span className="w-2 h-2 rounded-full bg-status-ok" />
            Sistem Aktif
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="studio-card p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                Toplam Talep
              </span>
              <Mail size={16} className="text-accent" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-ink">{totalInquiries}</span>
              <p className="text-xs text-ink-muted mt-1">Kayıtlı tüm teklif talepleri</p>
            </div>
          </div>

          <div className="studio-card p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                Yeni Talepler
              </span>
              <Clock size={16} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-ink">{newInquiries}</span>
              <p className="text-xs text-ink-muted mt-1">İnceleme bekleyen kayıt</p>
            </div>
          </div>

          <div className="studio-card p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                İncelenenler
              </span>
              <CheckCircle2 size={16} className="text-status-ok" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-ink">{reviewedInquiries}</span>
              <p className="text-xs text-ink-muted mt-1">Geri dönüş sürecindeki talepler</p>
            </div>
          </div>

          <div className="studio-card p-6 rounded-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                Yayındaki Projeler
              </span>
              <Briefcase size={16} className="text-accent" />
            </div>
            <div>
              <span className="text-3xl font-extrabold text-ink">{totalProjects}</span>
              <p className="text-xs text-ink-muted mt-1">Portfolyoda sergilenen işler</p>
            </div>
          </div>
        </section>

        {/* Category Distribution (Real Data) & Recent Inquiries */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          <div className="lg:col-span-6 studio-card p-7 rounded-3xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink">Talep Kategori Dağılımı</h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  Veritabanındaki gerçek teklif taleplerine göre hesaplanır.
                </p>
              </div>
              <Link
                href="/admin/projects"
                className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
              >
                Projeleri Yönet
                <ArrowRight size={12} />
              </Link>
            </div>

            {categoryBreakdown.length === 0 ? (
              <div className="py-10 text-center text-sm text-ink-muted">
                Henüz analiz edilecek teklif kaydı yok.
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {categoryBreakdown.map((item) => (
                  <div key={item.name} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-ink">{item.name}</span>
                      <span className="font-mono text-ink-secondary">
                        {item.count} ({item.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-line">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 studio-card p-7 rounded-3xl flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink">Son Gelen Talepler</h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  İletişim formundan gelen en güncel başvurular.
                </p>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
              >
                Tümünü Gör
                <ArrowRight size={12} />
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <div className="py-10 flex flex-col items-center gap-2 text-ink-muted">
                <Inbox size={20} />
                <p className="text-xs">Henüz teklif talebi alınmadı.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href="/admin/leads"
                    className="p-4 rounded-xl bg-surface border border-line hover:border-line-strong transition-colors flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold text-ink">{lead.name}</span>
                      <span
                        className={`text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full uppercase ${
                          lead.status === "NEW"
                            ? "bg-accent-soft text-accent"
                            : lead.status === "REVIEWED"
                            ? "bg-status-ok/12 text-status-ok"
                            : "bg-surface-elevated text-ink-muted border border-line"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
                      <span className="text-accent">{lead.category}</span>
                      <span>{lead.budget}</span>
                    </div>
                    <p className="text-xs text-ink-secondary line-clamp-2 leading-relaxed mt-1">
                      {lead.message}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
