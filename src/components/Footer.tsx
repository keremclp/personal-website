"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { useLocale } from "@/components/LocaleProvider";
import { SITE_CONFIG, getWhatsAppUrl } from "@/lib/siteConfig";

export default function Footer() {
  const pathname = usePathname();
  const { dict } = useLocale();
  const currentYear = new Date().getFullYear();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="w-full bg-surface border-t border-line mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <BrandMark size={32} className="shrink-0" />
              <span className="font-bold text-[15px] tracking-tight text-ink">
                {SITE_CONFIG.brandName}
                <span className="text-ink-muted font-medium">.com</span>
              </span>
            </Link>

            <p className="text-sm text-ink-secondary leading-relaxed max-w-sm">
              {dict.footer.tagline}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated border border-line w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-ok opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-status-ok" />
              </span>
              <span className="text-xs font-medium text-ink-secondary">
                {dict.footer.availability}
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted">
              {dict.footer.navTitle}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link href="/" className="text-ink-secondary hover:text-ink transition-colors">
                  {dict.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-ink-secondary hover:text-ink transition-colors">
                  {dict.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink-secondary hover:text-ink transition-colors">
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-ink-secondary hover:text-ink transition-colors">
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted">
              {dict.footer.servicesTitle}
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              {dict.footer.servicesList.map((service) => (
                <li key={service}>
                  <Link
                    href={`/contact?category=${encodeURIComponent(service)}`}
                    className="text-ink-secondary hover:text-ink transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{service}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Socials */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-muted">
              {dict.footer.connectTitle}
            </h4>
            <p className="text-sm text-ink-secondary leading-relaxed">
              {dict.footer.connectText}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-sm font-semibold text-ink hover:text-accent transition-colors inline-flex items-center gap-2 w-fit"
              >
                <Mail size={14} className="text-accent" />
                {SITE_CONFIG.email}
              </a>
              <a
                href={getWhatsAppUrl(dict.home.ctaWhatsAppPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink-secondary hover:text-ink transition-colors inline-flex items-center gap-2 w-fit"
              >
                <MessageSquare size={14} className="text-status-ok" />
                {SITE_CONFIG.phoneDisplay}
              </a>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={SITE_CONFIG.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-line bg-surface-elevated text-ink-secondary hover:text-ink hover:border-line-strong transition-colors flex items-center justify-center"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href={SITE_CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-line bg-surface-elevated text-ink-secondary hover:text-ink hover:border-line-strong transition-colors flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href={getWhatsAppUrl(dict.home.ctaWhatsAppPrefill)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-line bg-surface-elevated text-ink-secondary hover:text-status-ok hover:border-line-strong transition-colors flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <MessageSquare size={15} strokeWidth={1.9} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>
            &copy; {currentYear} {dict.footer.copyright}
          </p>
          <p className="font-mono">{dict.footer.signature}</p>
        </div>
      </div>
    </footer>
  );
}
