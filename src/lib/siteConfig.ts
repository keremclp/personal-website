export const SITE_CONFIG = {
  brandName: "keremcancelepkolu",
  brandMonogram: "KC",
  domain: "keremcancelepkolu.com",
  url: "https://keremcancelepkolu.com",
  founderName: "Kerem Can Çelepkolu",
  email: "keremcanclp@gmail.com",
  phoneDisplay: "+90 531 730 56 14",
  whatsappNumber: "905317305614",
  githubUrl: "https://github.com/keremclp",
  linkedinUrl: "https://www.linkedin.com/in/kerem-can-celepkolu/",
  locationTr: "Türkiye · Uzaktan & Global",
  locationEn: "Türkiye · Remote & Global",
} as const;

export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
