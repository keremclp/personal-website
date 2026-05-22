import React from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Briefcase, Mail, CheckCircle2, TrendingUp, DollarSign, Eye, Terminal } from "lucide-react";
import { db } from "@/lib/db";
import AdminNav from "@/components/AdminNav";

// Force dynamic server rendering to reflect additions instantly
export const revalidate = 0;

export default async function AdminDashboard() {
  // Query DB contents server-side (handles JSON fallback automatically!)
  const projects = await db.projects.findMany();
  const leads = await db.leads.findMany();

  // Run analytic aggregates
  const totalInquiries = leads.length;
  const newInquiries = leads.filter((l) => l.status === "NEW").length;
  const totalProjects = projects.length;

  // Calculate estimated total revenue pipeline from budgets (simulated mock tally)
  const pipeLineBudget = leads.reduce((acc, lead) => {
    if (lead.budget.includes("$10k")) return acc + 10000;
    if (lead.budget.includes("$5k")) return acc + 7500;
    if (lead.budget.includes("$3k")) return acc + 4000;
    return acc + 2000;
  }, 0);

  const recentLeads = leads.slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Console Subheader Navigation */}
      <AdminNav />

      {/* Main Console Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-10">
        
        {/* Header Hook */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">System Executive Overview</h1>
            <p className="text-sm text-zinc-500 font-sans mt-1">
              Live telemetry and commercial client pipeline metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Terminal: Online</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Leads */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Total Leads</span>
              <Mail size={16} className="text-brand-cyan" />
            </div>
            <div>
              <span className="text-3xl font-bold text-foreground dark:text-white">{totalInquiries}</span>
              <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
                <span className="text-brand-cyan font-bold">{newInquiries}</span> new inquiries unreviewed
              </p>
            </div>
          </div>

          {/* Card 2: Pipe */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Revenue Pipe</span>
              <DollarSign size={16} className="text-emerald-400" />
            </div>
            <div>
              <span className="text-3xl font-bold text-foreground dark:text-white">
                ${pipeLineBudget.toLocaleString("en-US")}
              </span>
              <p className="text-[10px] text-zinc-400 mt-1">
                Accumulated budget estimates
              </p>
            </div>
          </div>

          {/* Card 3: Projects */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Live Projects</span>
              <Briefcase size={16} className="text-brand-purple" />
            </div>
            <div>
              <span className="text-3xl font-bold text-foreground dark:text-white">{totalProjects}</span>
              <p className="text-[10px] text-zinc-400 mt-1">
                Listed in active portfolio
              </p>
            </div>
          </div>

          {/* Card 4: Funnel Rate */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase">Inquiry Funnel</span>
              <TrendingUp size={16} className="text-brand-pink" />
            </div>
            <div>
              <span className="text-3xl font-bold text-foreground dark:text-white">4.8%</span>
              <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1">
                <span className="text-brand-pink font-bold">+1.2%</span> from last week's traffic
              </p>
            </div>
          </div>

        </section>

        {/* Funnel Graph & Recent Leads Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Conversion Analytics Mock Chart (Beautiful visual panel) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-bold text-white">Client Acquisition Performance</h3>
              <p className="text-xs text-zinc-500 font-sans mt-0.5">
                Conversion percentages mapped across core project categories.
              </p>
            </div>

            {/* Simulated bar chart via premium custom CSS/Tailwind */}
            <div className="flex flex-col gap-5 mt-4">
              
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>SaaS Dashboards</span>
                  <span className="text-brand-purple font-bold">58% (High Demand)</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-purple rounded-full" style={{ width: "58%" }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>E-Commerce Storefronts</span>
                  <span className="text-brand-cyan font-bold">24%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-cyan rounded-full" style={{ width: "24%" }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Marketing Landings</span>
                  <span className="text-brand-pink font-bold">18%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-pink rounded-full" style={{ width: "18%" }} />
                </div>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-brand-border text-xs text-zinc-400 font-sans flex items-center gap-2 mt-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Priority: Target B2B SaaS Dashboard engineering. It holds the highest conversion yield.</span>
            </div>
          </div>

          {/* Column 2: Recent Inbox Activity Checklist */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Recent Inquiries</h3>
                <p className="text-xs text-zinc-500 font-sans mt-0.5">
                  Latest client proposals registered.
                </p>
              </div>
              <Link
                href="/admin/leads"
                className="text-xs font-mono font-bold text-brand-cyan hover:underline flex items-center gap-1"
              >
                Inbox
                <ArrowRight size={10} />
              </Link>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {recentLeads.length === 0 ? (
                <p className="text-xs font-mono text-zinc-600 text-center py-6">
                  No inquiries logged in the database yet.
                </p>
              ) : (
                recentLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl bg-white/5 border border-brand-border hover:border-brand-border-hover transition-colors flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground dark:text-white">{lead.name}</span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          lead.status === "NEW"
                            ? "bg-brand-purple/10 text-brand-purple border border-brand-purple/20"
                            : "bg-white/10 text-zinc-400"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-brand-cyan">{lead.category}</span>
                    <p className="text-[11px] text-zinc-400 font-sans line-clamp-2 leading-relaxed mt-1">
                      "{lead.message}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
