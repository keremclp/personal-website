"use strict";

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scrolling to add stronger background to Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render public navigation on admin portal pages
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-dark/80 backdrop-blur-md border-b border-brand-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-cyan flex items-center justify-center text-white shadow-lg shadow-brand-purple/20 group-hover:scale-105 transition-transform">
            <Terminal size={18} className="stroke-[2.5]" />
          </div>
          <span className="font-sans font-bold text-xl tracking-tight text-foreground transition-colors group-hover:text-brand-purple">
            Kerem Can<span className="text-brand-cyan">.Çelepkolu</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-sans text-sm font-medium tracking-wide transition-colors duration-200 py-1 ${
                  isActive ? "text-brand-cyan" : "text-zinc-400 hover:text-foreground"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Admin link shortcut, hidden professionally in menu or accessible here */}
          {process.env.NODE_ENV === "development" && (
            <Link
              href="/admin/login"
              className="text-xs text-zinc-500 hover:text-foreground transition-colors mr-2"
            >
              Portal
            </Link>
          )}
          
          <ThemeToggle />

          <Link
            href="/contact"
            className="relative inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-foreground text-background hover:bg-gradient-to-r hover:from-brand-purple hover:to-brand-cyan hover:text-white transition-all duration-300 shadow-md hover:shadow-brand-purple/20 overflow-hidden"
          >
            Get a Quote
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Mobile menu button & Theme Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[73px] z-40 w-full bg-brand-dark/95 backdrop-blur-lg border-t border-brand-border lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-8 gap-6 h-full">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                onClick={() => setIsOpen(false)}
                href={item.path}
                className={`text-xl font-semibold tracking-wide border-b border-brand-border pb-3 ${
                  isActive ? "text-brand-cyan" : "text-zinc-400 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            onClick={() => setIsOpen(false)}
            href="/contact"
            className="flex items-center justify-center gap-2 mt-4 px-6 py-4 rounded-xl font-bold bg-gradient-to-r from-brand-purple to-brand-cyan text-white text-center hover:opacity-90 transition-opacity"
          >
            Get a Quote
            <ArrowUpRight size={18} />
          </Link>
          {process.env.NODE_ENV === "development" && (
            <Link
              onClick={() => setIsOpen(false)}
              href="/admin/login"
              className="text-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors mt-auto"
            >
              Admin Portal Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
