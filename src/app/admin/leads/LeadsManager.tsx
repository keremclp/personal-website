"use strict";

"use client";

import React, { useState } from "react";
import { Mail, Check, Trash2, Reply, Calendar, BadgeDollarSign, MessageSquare, AlertCircle, Eye } from "lucide-react";

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

export default function LeadsManager({ initialLeads }: LeadsManagerProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(
    initialLeads.length > 0 ? initialLeads[0].id : null
  );
  
  const [filterStatus, setFilterStatus] = useState("All"); // "All" | "NEW" | "REVIEWED" | "ARCHIVED"

  const activeLead = leads.find((l) => l.id === activeLeadId) || null;

  // Filter leads list
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
        throw new Error(data.error || "Failed to update lead status.");
      }

      const updatedLead = await response.json();
      setLeads(leads.map((l) => (l.id === id ? updatedLead : l)));
    } catch (err: any) {
      alert(err.message || "An unexpected error occurred.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this lead record?")) return;

    try {
      const response = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete lead.");
      }

      const newLeads = leads.filter((l) => l.id !== id);
      setLeads(newLeads);

      // Select next lead if possible
      if (activeLeadId === id) {
        setActiveLeadId(newLeads.length > 0 ? newLeads[0].id : null);
      }
    } catch (err: any) {
      alert(err.message || "An unexpected error occurred.");
    }
  };

  // Compile mailto reply pre-fill
  const getMailtoLink = (lead: Lead) => {
    const subject = encodeURIComponent(`Re: ${lead.category} Inquiry - Kerem Can Çelepkolu Dev`);
    const body = encodeURIComponent(
      `Hello ${lead.name},\n\nThank you for reaching out regarding your ${lead.category} project! I reviewed your details and brief:\n\n"${lead.message}"\n\nI'd love to jump on a quick 15-minute call to align on your objectives and share a definitive proposal. What is your availability this week?\n\nBest regards,\nKerem Can Çelepkolu`
    );
    return `mailto:${lead.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Tab Filter bar */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-brand-border">
        {["All", "NEW", "REVIEWED", "ARCHIVED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
              filterStatus === status
                ? "bg-white/5 border border-brand-cyan/30 text-foreground dark:text-white"
                : "text-zinc-400 hover:text-foreground dark:hover:text-white"
            }`}
          >
            {status} ({status === "All" ? leads.length : leads.filter((l) => l.status === status).length})
          </button>
        ))}
      </div>

      {leads.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-3xl">
          <p className="text-zinc-500 font-mono text-sm">No client inquiries found in database yet.</p>
        </div>
      ) : (
        /* CRM Split Pane Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[500px]">
          
          {/* Left Panel: Leads List */}
          <div className="lg:col-span-5 flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-2">
            {filteredLeads.length === 0 ? (
              <p className="text-xs font-mono text-zinc-600 text-center py-10">
                No inquiries matching this status filter.
              </p>
            ) : (
              filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  onClick={() => setActiveLeadId(lead.id)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                    activeLeadId === lead.id
                      ? "bg-brand-purple/10 border-brand-purple/40 shadow-lg shadow-brand-purple/5"
                      : "bg-brand-card border-brand-border hover:border-brand-border-hover"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-foreground dark:text-white">{lead.name}</span>
                    <span
                      className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        lead.status === "NEW"
                          ? "bg-brand-purple/10 text-brand-purple border border-brand-purple/20"
                          : lead.status === "REVIEWED"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-white/5 text-zinc-500 border border-brand-border"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <span className="text-[10px] font-mono text-brand-cyan">{lead.category}</span>
                    <span className="text-[9px] font-mono text-zinc-500">
                      {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  
                  <p className="text-xs text-zinc-400 font-sans line-clamp-1 leading-relaxed mt-2 italic">
                    "{lead.message}"
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Right Panel: Detail Viewer */}
          <div className="lg:col-span-7">
            {activeLead ? (
              <div className="glass-panel p-8 rounded-3xl flex flex-col gap-6 border-glow relative">
                
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-brand-border pb-4 gap-4">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-brand-purple/10 border border-brand-purple/20 text-[9px] font-bold text-brand-purple uppercase tracking-wider">
                      {activeLead.category}
                    </span>
                    <h2 className="text-xl font-bold text-foreground dark:text-white mt-2 leading-tight">
                      {activeLead.name}
                    </h2>
                    <a
                      href={`mailto:${activeLead.email}`}
                      className="text-xs text-brand-cyan hover:underline font-mono mt-1 block w-fit"
                    >
                      {activeLead.email}
                    </a>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0 text-right">
                    <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(activeLead.createdAt).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 justify-end">
                      <BadgeDollarSign size={12} />
                      Budget: {activeLead.budget}
                    </span>
                  </div>
                </div>

                {/* Message body */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1">
                    <MessageSquare size={12} />
                    Proposal Brief
                  </span>
                  <div className="p-5 rounded-2xl bg-white/5 border border-brand-border text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-line italic">
                    "{activeLead.message}"
                  </div>
                </div>

                {/* CRM Controls */}
                <div className="flex flex-wrap gap-3 mt-4 pt-5 border-t border-brand-border items-center">
                  
                  {/* Quick draft reply via mail */}
                  <a
                    href={getMailtoLink(activeLead)}
                    className="flex-grow md:flex-none px-5 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-center font-bold text-xs tracking-wider uppercase hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Reply size={14} />
                    Draft Email Reply
                  </a>

                  {/* Status update selectors */}
                  <div className="flex items-center gap-2">
                    {activeLead.status === "NEW" && (
                      <button
                        onClick={() => handleUpdateStatus(activeLead.id, "REVIEWED")}
                        className="px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:text-white hover:bg-emerald-500 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Mark Reviewed
                      </button>
                    )}
                    {activeLead.status !== "ARCHIVED" && (
                      <button
                        onClick={() => handleUpdateStatus(activeLead.id, "ARCHIVED")}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-brand-border text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Archive
                      </button>
                    )}
                    {activeLead.status === "ARCHIVED" && (
                      <button
                        onClick={() => handleUpdateStatus(activeLead.id, "NEW")}
                        className="px-4 py-3 rounded-xl bg-white/5 border border-brand-border text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Move back to Inbox
                      </button>
                    )}
                  </div>

                  {/* Delete trigger */}
                  <button
                    onClick={() => handleDeleteLead(activeLead.id)}
                    className="md:ml-auto p-3 rounded-xl bg-red-500/5 border border-red-500/10 text-red-600 dark:text-red-400 hover:text-white hover:bg-red-500 transition-all cursor-pointer"
                    aria-label="Delete Lead permanently"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>
            ) : (
              <div className="glass-panel p-16 rounded-3xl text-center flex flex-col items-center justify-center gap-3">
                <AlertCircle size={24} className="text-zinc-600" />
                <p className="text-zinc-500 font-mono text-xs">Select an inquiry from the left list to review details.</p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
