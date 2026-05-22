"use strict";

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldAlert, KeyRound, Terminal } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
        throw new Error(data.error || "Authentication failed.");
      }

      // Successful login redirect to Admin Dashboard
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative min-h-[70vh]">
      {/* Background decoration blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-purple/10 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col gap-8 z-10">
        
        {/* Branding header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center text-white shadow-xl shadow-brand-purple/20">
            <Terminal size={22} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Administration Portal</h1>
            <p className="text-xs text-zinc-500 font-mono mt-1 uppercase tracking-widest">
              Secure Session Entry
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border-glow">
          
          {error && (
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-xs text-red-400 mb-6 animate-shake">
              <ShieldAlert size={16} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Username block */}
            <div className="flex flex-col gap-2">
              <label htmlFor="username" className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                User Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="admin"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-dark border border-brand-border text-white text-sm font-sans focus:outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            </div>

            {/* Password block */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-brand-dark border border-brand-border text-white text-sm font-sans focus:outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            </div>

            {/* Submit btn */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 shadow-lg shadow-brand-purple/10"
            >
              {loading ? "Authenticating Session..." : "Verify Identity"}
              <KeyRound size={14} />
            </button>

          </form>
        </div>

        {/* Small security assurance footer */}
        <p className="text-[10px] text-center text-zinc-600 font-mono">
          Security policy enforced. Session will expire automatically in 24 hours.
        </p>

      </div>
    </div>
  );
}
