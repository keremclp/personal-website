"use strict";

"use client";

import React, { useState, useEffect } from "react";
import { Send, MessageSquare, ShieldCheck, Mail, Sparkles, Check, ArrowRight } from "lucide-react";

const CATEGORIES = ["SaaS Dashboard", "Marketing Landing Page", "E-commerce Storefront", "Full-Stack Development", "Consulting / Audit"];
const BUDGETS = ["$1k - $3k", "$3k - $5k", "$5k - $10k", "$10k+"];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "SaaS Dashboard",
    budget: "$3k - $5k",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Lock body scroll when success modal is open for a premium micro-UX experience
  useEffect(() => {
    if (success) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [success]);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Compile prefilled WhatsApp text for high conversions!
  const getWhatsAppLink = () => {
    const text = `Hello Kerem Can! My name is ${encodeURIComponent(
      formData.name
    )}. I just submitted a project inquiry for a "${encodeURIComponent(
      formData.category
    )}" project (Budget: ${encodeURIComponent(formData.budget)}).
Brief: ${encodeURIComponent(formData.message)}

Let's discuss my project!`;

    // WhatsApp API endpoint
    return `https://wa.me/905000000000?text=${text}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full flex flex-col gap-12 md:gap-16">
      {/* Page Header */}
      <section className="relative pt-8 md:pt-16 max-w-3xl">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase">
          Get in Touch
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground dark:text-white mt-4 leading-tight">
          Let's Engineer Your <br />
          <span className="text-gradient-neon">Next Digital Asset</span>
        </h1>
        <p className="mt-6 text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
          Submit your project requirements below to estimate your quote. Your inquiry will be logged securely in our admin dashboard, and you can chat with me instantly on WhatsApp to align on the next steps!
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Info Column */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Quick Stats Card */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-sm font-bold text-foreground dark:text-white uppercase tracking-wider font-mono">
              Inquiry Policy
            </h3>
            <ul className="flex flex-col gap-3 text-xs text-zinc-400 font-sans">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand-cyan" /> Secure Lead Registration
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand-cyan" /> Free 30-Minute Discovery Call
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-brand-cyan" /> Direct WhatsApp Priority Link
              </li>
            </ul>
          </div>

          {/* Social direct cards */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-5">
            <h4 className="text-sm font-bold text-foreground dark:text-white uppercase tracking-wider font-mono">
              Direct Channels
            </h4>
            
            <a
              href="mailto:hello@keremcan.dev"
              className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-brand-purple/5 border border-white/5 hover:border-brand-purple/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:scale-105 transition-transform">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500">Email Directly</span>
                <p className="text-sm font-bold text-foreground dark:text-white group-hover:text-brand-purple transition-colors">
                  hello@keremcan.dev
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/905000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-emerald-500/5 border border-white/5 hover:border-emerald-500/20 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <MessageSquare size={18} />
              </div>
              <div>
                <span className="text-xs font-mono text-zinc-500">WhatsApp Chat</span>
                <p className="text-sm font-bold text-foreground dark:text-white group-hover:text-emerald-400 transition-colors">
                  +90 500 000 00 00
                </p>
              </div>
            </a>
          </div>

        </div>

        {/* Form Column */}
        <div className="lg:col-span-8">
          <div className="glass-panel p-8 md:p-10 rounded-3xl relative overflow-hidden border-glow">
            <h3 className="text-xl font-bold text-foreground dark:text-white mb-6">Quote Request Estimator</h3>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 text-xs text-red-400 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Row: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-border text-white text-sm font-sans focus:outline-none focus:border-brand-purple transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-border text-white text-sm font-sans focus:outline-none focus:border-brand-purple transition-colors"
                  />
                </div>
              </div>

              {/* Row: Project Category & Budget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="category" className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Project Type
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-border text-white text-sm font-sans focus:outline-none focus:border-brand-purple transition-colors appearance-none"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                    Estimated Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-border text-white text-sm font-sans focus:outline-none focus:border-brand-purple transition-colors appearance-none"
                  >
                    {BUDGETS.map((bud) => (
                      <option key={bud} value={bud}>
                        {bud}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Block */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Project Brief & Objectives
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your goals, targets, and special requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-brand-dark border border-brand-border text-white text-sm font-sans focus:outline-none focus:border-brand-purple transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-xl font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Registering Lead..." : "Submit Quote Request"}
                <Send size={14} />
              </button>

            </form>
          </div>
        </div>
      </div>

      {/* Conversion Booster Success Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/85 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-brand-deep border border-brand-border rounded-3xl p-8 md:p-10 flex flex-col items-center text-center gap-6 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={32} />
            </div>
            
            <div>
              <span className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-widest">
                Lead Logged Successfully
              </span>
              <h2 className="text-2xl font-bold text-foreground dark:text-white mt-2">
                Awesome, {formData.name}!
              </h2>
            </div>
            
            <p className="text-sm text-zinc-400 font-sans leading-relaxed">
              Your inquiry for a <strong>{formData.category}</strong> (Budget: {formData.budget}) has been securely saved in our database.
              <br /><br />
              To get a priority response and discuss your proposal instantly, click the button below to **message me directly on WhatsApp**!
            </p>

            <div className="flex flex-col gap-3 w-full mt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl font-bold text-xs tracking-wider uppercase bg-gradient-to-r from-emerald-500 to-emerald-400 text-white hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                Chat instantly on WhatsApp
                <ArrowRight size={14} />
              </a>
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    name: "",
                    email: "",
                    category: "SaaS Dashboard",
                    budget: "$3k - $5k",
                    message: "",
                  });
                }}
                className="w-full py-3 rounded-xl bg-white/5 border border-brand-border text-xs font-semibold text-zinc-400 hover:text-foreground dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
              >
                Back to Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
