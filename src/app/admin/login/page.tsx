"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldAlert, KeyRound, ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/siteConfig";
import BrandMark from "@/components/BrandMark";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kimlik doğrulama başarısız.");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Giriş sırasında beklenmedik bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 min-h-screen bg-background">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Branding */}
        <div className="flex flex-col items-center gap-3 text-center">
          <BrandMark size={48} className="shadow-sm" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-ink">Yönetim Paneli Girişi</h1>
            <p className="text-xs font-mono text-ink-muted mt-1 uppercase tracking-wider">
              {SITE_CONFIG.domain}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="studio-card p-8 rounded-3xl">
          {error && (
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 mb-6">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="username"
                className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
              >
                Kullanıcı Adı
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted">
                  <User size={15} />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent focus:bg-surface-elevated transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs font-mono font-medium text-ink-secondary uppercase tracking-wider"
              >
                Şifre
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted">
                  <Lock size={15} />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface border border-line text-ink text-sm focus:outline-none focus:border-accent focus:bg-surface-elevated transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 rounded-full font-semibold text-sm bg-ink text-background hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? "Doğrulanıyor..." : "Giriş Yap"}
              <KeyRound size={15} />
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-secondary hover:text-ink transition-colors"
          >
            <ArrowLeft size={13} />
            Web sitesine dön
          </Link>
          <p className="text-[11px] text-ink-muted font-mono">
            Oturum güvenliği aktif · 24 saat sonra otomatik kapanır.
          </p>
        </div>
      </div>
    </div>
  );
}
