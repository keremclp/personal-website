"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, MessageSquare, Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  // Do not render public footer on admin console pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="w-full bg-brand-deep border-t border-brand-border py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="flex flex-col gap-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center text-white">
              <Terminal size={14} className="stroke-[2.5]" />
            </div>
            <span className="font-sans font-bold text-lg tracking-tight text-foreground">
              Kerem Can<span className="text-brand-cyan">.Çelepkolu</span>
            </span>
          </Link>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans mt-2">
            Designing and developing high-converting, premium web experiences for ambitious startups and businesses. Let's build something exceptional.
          </p>
          {/* Status Indicator */}
          <div className="flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-emerald-400">
              Available for New Projects
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-foreground font-sans text-xs font-bold uppercase tracking-wider">Navigation</h4>
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/" className="text-sm text-zinc-400 hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-zinc-400 hover:text-foreground transition-colors">
                About / Background
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="text-sm text-zinc-400 hover:text-foreground transition-colors">
                Portfolio Showcase
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-zinc-400 hover:text-foreground transition-colors">
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="flex flex-col gap-4">
          <h4 className="text-foreground font-sans text-xs font-bold uppercase tracking-wider">Services Offered</h4>
          <ul className="flex flex-col gap-2">
            <li className="text-sm text-zinc-400 hover:text-brand-purple transition-colors cursor-default">
              B2B SaaS Dashboard Design
            </li>
            <li className="text-sm text-zinc-400 hover:text-brand-cyan transition-colors cursor-default">
              High-Converting Landing Pages
            </li>
            <li className="text-sm text-zinc-400 hover:text-brand-pink transition-colors cursor-default">
              Luxury E-commerce Storefronts
            </li>
            <li className="text-sm text-zinc-400 hover:text-foreground transition-colors cursor-default">
              API Integrations & Node Backends
            </li>
          </ul>
        </div>

        {/* Social / Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="text-foreground font-sans text-xs font-bold uppercase tracking-wider">Connect</h4>
          <p className="text-sm text-zinc-400 font-sans">
            Have a project idea? Email directly or hit me up on socials!
          </p>
          <a
            href="mailto:keremcancelepkolu@gmail.com"
            className="text-sm font-semibold text-brand-cyan hover:underline decoration-brand-cyan/30 mt-1"
          >
            keremcancelepkolu@gmail.com
          </a>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-brand-border text-zinc-400 hover:text-brand-purple dark:hover:text-white hover:border-brand-purple hover:bg-brand-purple/5 transition-all"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-brand-border text-zinc-400 hover:text-brand-cyan dark:hover:text-white hover:border-brand-cyan hover:bg-brand-cyan/5 transition-all"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://wa.me/905317305614"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-brand-border text-zinc-400 hover:text-emerald-500 dark:hover:text-white hover:border-emerald-500 hover:bg-emerald-500/5 transition-all"
              aria-label="WhatsApp"
            >
              <MessageSquare size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-500 font-sans text-center md:text-left">
          &copy; {currentYear} Kerem Can Çelepkolu. All rights reserved. Designed for elite startups.
        </p>
        <p className="text-xs text-zinc-600 font-sans flex items-center gap-1.5">
          Handcrafted with <Heart size={10} className="fill-brand-pink text-brand-pink animate-pulse" /> using Next.js & Tailwind v4
        </p>
      </div>
    </footer>
  );
}
