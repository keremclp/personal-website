"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Dictionary, Locale, LOCALE_COOKIE_NAME, getDictionary } from "@/lib/i18n";

interface LocaleContextValue {
  locale: Locale;
  dict: Dictionary;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      setLocaleState(next);
      document.cookie = `${LOCALE_COOKIE_NAME}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = next;
      router.refresh();
    },
    [locale, router]
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === "tr" ? "en" : "tr");
  }, [locale, setLocale]);

  const value: LocaleContextValue = {
    locale,
    dict: getDictionary(locale),
    setLocale,
    toggleLocale,
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
