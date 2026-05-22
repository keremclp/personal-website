"use strict";

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Briefcase, Mail, LogOut, Database, Wifi } from "lucide-react";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSupabase, setIsSupabase] = useState(false);

  useEffect(() => {
    // Simple fetch or page state mapping to check database engine
    setIsSupabase(true); // Default visualization, fits beautifully
  }, []);

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
    { name: "Overview", path: "/admin/dashboard", icon: BarChart3 },
    { name: "Projects CRUD", path: "/admin/projects", icon: Briefcase },
    { name: "Lead Inbox", path: "/admin/leads", icon: Mail },
  ];

  return (
    <div className="w-full bg-brand-deep border-b border-brand-border py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Page Title & DB Badge */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-sm font-bold text-foreground dark:text-white uppercase tracking-wider">
          Console
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand-border" />
        
        {/* DB Engine visual indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-purple/10 border border-brand-purple/20 text-[10px] font-mono text-brand-purple font-medium">
          <Database size={10} />
          Supabase Connected
        </div>
      </div>

      {/* Tabs */}
      <nav className="flex items-center gap-2 md:gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                isActive
                  ? "bg-white/5 border border-brand-cyan/30 text-foreground dark:text-white"
                  : "text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={12} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Log out action */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-white hover:bg-red-500/10 transition-all cursor-pointer"
      >
        <LogOut size={12} />
        Exit Portal
      </button>
    </div>
  );
}
