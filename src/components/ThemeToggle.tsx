"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  if (!mounted) {
    return (
      <div
        className="w-9 h-9 rounded-full bg-white/5 border border-brand-border flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <span className="w-3.5 h-3.5 rounded-full bg-zinc-700 animate-pulse" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full bg-white/5 border border-brand-border hover:border-brand-purple hover:bg-brand-purple/5 text-zinc-400 hover:text-brand-purple dark:hover:text-white transition-all flex items-center justify-center group shrink-0 active:scale-95 duration-200 cursor-pointer"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun size={15} className="text-amber-400 transition-transform group-hover:rotate-45 group-hover:scale-110 duration-300" />
      ) : (
        <Moon size={15} className="text-indigo-400 transition-transform group-hover:-rotate-12 group-hover:scale-110 duration-300" />
      )}
    </button>
  );
}
