"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Briefcase, Mail, LogOut, Database, ExternalLink } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import BrandMark from "@/components/BrandMark";

interface AdminNavProps {
  isSupabase?: boolean;
}

export default function AdminNav({ isSupabase = true }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/auth", {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { name: "Genel Bakış", path: "/admin/dashboard", icon: BarChart3 },
    { name: "Projeler", path: "/admin/projects", icon: Briefcase },
    { name: "Teklifler", path: "/admin/leads", icon: Mail },
  ];

  return (
    <header className="w-full bg-surface-elevated border-b border-line py-3.5 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & DB Indicator */}
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <BrandMark size={32} className="shrink-0" />
            <span className="font-bold text-sm text-ink tracking-tight">Yönetim Paneli</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-line text-[11px] font-mono text-ink-secondary">
            <Database size={11} className="text-accent" />
            {isSupabase ? "Supabase" : "Local JSON"}
          </span>
        </div>

        {/* Tabs */}
        <nav className="flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-ink text-background"
                    : "text-ink-secondary hover:text-ink hover:bg-surface"
                }`}
              >
                <Icon size={13} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-line bg-surface text-xs font-medium text-ink-secondary hover:text-ink hover:border-line-strong transition-colors"
          >
            Siteyi Gör
            <ExternalLink size={12} />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-red-500/20 bg-red-500/8 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut size={12} />
            Çıkış
          </button>
        </div>
      </div>
    </header>
  );
}
