import { tr } from "./tr";
import { en } from "./en";
import { Dictionary, Locale } from "./types";

export const LOCALE_COOKIE_NAME = "site_locale";
export const DEFAULT_LOCALE: Locale = "tr";

export function normalizeLocale(value?: string | null): Locale {
  if (value === "en") return "en";
  return "tr";
}

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : tr;
}

export type { Dictionary, Locale };
