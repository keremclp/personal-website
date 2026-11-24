"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import BrandMark from "@/components/BrandMark";
import { useLocale } from "@/components/LocaleProvider";
import { SITE_CONFIG } from "@/lib/siteConfig";

export default function Navbar() {
  const pathname = usePathname();
  const { locale, dict, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Do not render public navigation on admin portal pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { name: dict.nav.home, path: "/" },
    { name: dict.nav.portfolio, path: "/portfolio" },
    { name: dict.nav.about, path: "/about" },
    { name: dict.nav.contact, path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "studio-header border-b border-line py-3.5"
          : "bg-background/70 backdrop-blur-sm border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
        {/* Studio Brand Mark */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <BrandMark
            size={36}
            className="transition-transform duration-200 group-hover:scale-[1.04] shrink-0"
          />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[15px] tracking-tight text-ink">
              {SITE_CONFIG.brandName}
              <span className="text-ink-muted font-medium">.com</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "text-ink bg-surface"
                    : "text-ink-secondary hover:text-ink hover:bg-surface/60"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Single-click TR | EN Switcher */}
          <div
            className="inline-flex items-center rounded-full border border-line bg-surface-elevated p-0.5 text-xs font-mono font-medium"
            role="group"
            aria-label={dict.nav.switchLangLabel}
          >
            <button
              type="button"
              onClick={() => setLocale("tr")}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                locale === "tr"
                  ? "bg-ink text-background"
                  : "text-ink-secondary hover:text-ink"
              }`}
              aria-pressed={locale === "tr"}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                locale === "en"
                  ? "bg-ink text-background"
                  : "text-ink-secondary hover:text-ink"
              }`}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>

          <ThemeToggle />

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide bg-ink text-background hover:bg-accent-lime hover:text-[#0B1F1A] transition-all duration-200 active:scale-[0.98] group ml-1"
          >
            {dict.nav.cta}
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setLocale(locale === "tr" ? "en" : "tr")}
            className="h-9 px-3 rounded-full border border-line bg-surface-elevated text-xs font-mono font-semibold text-ink hover:border-line-strong transition-colors cursor-pointer"
            aria-label={dict.nav.switchLangLabel}
          >
            {locale === "tr" ? "EN" : "TR"}
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-9 h-9 rounded-full border border-line bg-surface-elevated text-ink flex items-center justify-center hover:border-line-strong transition-colors cursor-pointer"
            aria-label={dict.nav.openMenu}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-0 top-[69px] bottom-0 z-40 bg-background/98 backdrop-blur-md border-t border-line lg:hidden transition-all duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 gap-2 h-full max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-semibold py-4 border-b border-line flex items-center justify-between transition-colors ${
                  isActive ? "text-accent" : "text-ink hover:text-accent"
                }`}
              >
                <span>{item.name}</span>
                <ArrowUpRight size={18} className="text-ink-muted" />
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-6 flex items-center justify-center gap-2 px-6 py-4 rounded-full font-semibold text-sm bg-ink text-background hover:bg-accent-lime hover:text-[#0B1F1A] transition-colors"
          >
            {dict.nav.cta}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
