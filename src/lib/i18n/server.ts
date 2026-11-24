import { cookies } from "next/headers";
import { LOCALE_COOKIE_NAME, Locale, normalizeLocale } from "./index";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  return normalizeLocale(value);
}
