"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function ThemeToggle() {
  const { dict } = useLocale();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("studio_theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("studio_theme", "dark");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full border border-line bg-surface-elevated hover:border-line-strong text-ink-secondary hover:text-ink transition-all flex items-center justify-center shrink-0 active:scale-95 cursor-pointer"
      aria-label={`${dict.nav.switchThemeToDark} / ${dict.nav.switchThemeToLight}`}
      title={`${dict.nav.switchThemeToDark} / ${dict.nav.switchThemeToLight}`}
    >
      <Moon size={15} strokeWidth={1.8} className="block dark:hidden" />
      <Sun size={15} strokeWidth={1.8} className="hidden dark:block" />
    </button>
  );
}
