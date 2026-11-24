"use client";

import React, { useState } from "react";
import { Trash2, Reply, Calendar, Wallet, MessageSquare, AlertCircle } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  category: string;
  budget: string;
  message: string;
  status: string; // "NEW" | "REVIEWED" | "ARCHIVED"
  createdAt: string;
}

interface LeadsManagerProps {
  initialLeads: Lead[];
}

const STATUS_LABELS: Record<string, string> = {
  All: "Tümü",
  NEW: "Yeni",
  REVIEWED: "İncelendi",
  ARCHIVED: "Arşiv",
};

export default function LeadsManager({ initialLeads }: LeadsManagerProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(
    initialLeads.length > 0 ? initialLeads[0].id : null
  );
  const [filterStatus, setFilterStatus] = useState("All");

  const activeLead = leads.find((l) => l.id === activeLeadId) || null;

  const filteredLeads = leads.filter((lead) => {
    if (filterStatus === "All") return true;
    return lead.status === filterStatus;
  });

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/leads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Durum güncellenemedi.");
      }

      const updatedLead = await response.json();
      setLeads(leads.map((l) => (l.id === id ? updatedLead : l)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Beklenmedik bir hata oluştu.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Bu teklif kaydını kalıcı olarak silmek istediğinize emin misiniz?")) return;

    try {
      const response = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Kayıt silinemedi.");
      }

      const newLeads = leads.filter((l) => l.id !== id);
      setLeads(newLeads);

      if (activeLeadId === id) {
        setActiveLeadId(newLeads.length > 0 ? newLeads[0].id : null);
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Beklenmedik bir hata oluştu.");
    }
  };

  const getMailtoLink = (lead: Lead) => {
    const subject = encodeURIComponent(`Yanıt: ${lead.category} Talebiniz — keremcancelepkolu.com`);
    const body = encodeURIComponent(
      `Merhaba ${lead.name},\n\n${lead.category} projeniz için bizimle iletişime geçtiğiniz teşekkür ederiz. Paylaştığınız özeti inceledik:\n\n"${lead.message}"\n\nKapsam ve takvimi netleştirmek için kısa bir ön görüşme planlayabiliriz. Bu hafta hangi gün ve saatler sizin için uygundur?\n\nSaygılarımızla,\nKerem Can Çelepkolu\nkeremcancelepkolu.com`
    );
    return `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-line">
        {["All", "NEW", "REVIEWED", "ARCHIVED"].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              filterStatus === status
                ? "bg-ink text-background"
                : "bg-surface-elevated border border-line text-ink-secondary hover:text-ink hover:border-line-strong"
            }`}
          >
            {STATUS_LABELS[status]} (
            {status === "All" ? leads.length : leads.filter((l) => l.status === status).length})
          </button>
        ))}
      </div>

      {leads.length === 0 ? (
        <div className="studio-card p-16 text-center rounded-3xl">
          <p className="text-ink-muted text-sm">Henüz kayıtlı teklif talebi bulunmuyor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start min-h-[480px]">
          {/* List */}
          <div className="lg:col-span-5 flex flex-col gap-3 max-h-[620px] overflow-y-auto pr-1">
            {filteredLeads.length === 0 ? (
              <p className="text-xs text-ink-muted text-center py-10">
                Bu filtreye uygun kayıt bulunamadı.
              </p>
            ) : (
              filteredLeads.map((lead) => (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => setActiveLeadId(lead.id)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    activeLeadId === lead.id
                      ? "bg-accent-soft border-accent/40"
                      : "bg-surface-elevated border-line hover:border-line-strong"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-ink">{lead.name}</span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase ${
                        lead.status === "NEW"
                          ? "bg-accent-soft text-accent"
                          : lead.status === "REVIEWED"
                          ? "bg-status-ok/12 text-status-ok"
                          : "bg-surface text-ink-muted border border-line"
                      }`}
                    >
                      {STATUS_LABELS[lead.status] || lead.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-1.5 text-[11px] font-mono">
                    <span className="text-accent">{lead.category}</span>
                    <span className="text-ink-muted">
                      {new Date(lead.createdAt).toLocaleDateString("tr-TR", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-ink-secondary line-clamp-1 mt-2">{lead.message}</p>
                </button>
              ))
            )}
          </div>

          {/* Detail Viewer */}
          <div className="lg:col-span-7">
            {activeLead ? (
              <div className="studio-card p-7 md:p-8 rounded-3xl flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between border-b border-line pb-5 gap-4">
                  <div>
                    <span className="inline-flex px-2.5 py-0.5 rounded-full bg-accent-soft text-[11px] font-mono font-medium text-accent">
                      {activeLead.category}
                    </span>
                    <h2 className="text-xl font-bold text-ink mt-2">{activeLead.name}</h2>
                    <a
                      href={`mailto:${activeLead.email}`}
                      className="text-xs font-mono text-accent hover:underline mt-1 inline-block"
                    >
                      {activeLead.email}
                    </a>
                  </div>

                  <div className="flex flex-col md:items-end gap-1.5 text-xs font-mono text-ink-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(activeLead.createdAt).toLocaleString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-status-ok font-medium">
                      <Wallet size={12} />
                      Bütçe: {activeLead.budget}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-mono font-semibold text-ink-muted uppercase tracking-wider inline-flex items-center gap-1.5">
                    <MessageSquare size={12} />
                    Proje Özeti
                  </span>
                  <div className="p-5 rounded-2xl bg-surface border border-line text-sm text-ink-secondary leading-relaxed whitespace-pre-line">
                    {activeLead.message}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-line items-center">
                  <a
                    href={getMailtoLink(activeLead)}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-ink text-background hover:bg-accent hover:text-white text-xs font-semibold transition-colors"
                  >
                    <Reply size={14} />
                    E-posta Yanıtı Hazırla
                  </a>

                  {activeLead.status === "NEW" && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(activeLead.id, "REVIEWED")}
                      className="px-4 py-2.5 rounded-full bg-status-ok/12 text-status-ok hover:bg-status-ok hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      İncelendi İşaretle
                    </button>
                  )}

                  {activeLead.status !== "ARCHIVED" && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(activeLead.id, "ARCHIVED")}
                      className="px-4 py-2.5 rounded-full border border-line bg-surface text-ink-secondary hover:text-ink hover:border-line-strong text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Arşivle
                    </button>
                  )}

                  {activeLead.status === "ARCHIVED" && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(activeLead.id, "NEW")}
                      className="px-4 py-2.5 rounded-full border border-line bg-surface text-ink-secondary hover:text-ink hover:border-line-strong text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Gelen Kutusuna Al
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteLead(activeLead.id)}
                    className="md:ml-auto p-2.5 rounded-full border border-red-500/20 bg-red-500/8 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Talebi Sil"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="studio-card p-16 rounded-3xl text-center flex flex-col items-center justify-center gap-3">
                <AlertCircle size={22} className="text-ink-muted" />
                <p className="text-ink-muted text-xs">
                  Detaylarını görmek için soldaki listeden bir talep seçin.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
