import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import { SITE_CONFIG } from "@/lib/siteConfig";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: dict.meta.title,
      template: `%s | ${SITE_CONFIG.domain}`,
    },
    description: dict.meta.description,
    keywords:
      locale === "tr"
        ? [
            "Web Tasarım Stüdyosu",
            "Kurumsal Web Sitesi",
            "Özel Yazılım Geliştirme",
            "SaaS Geliştirme",
            "Next.js Ajansı",
            "Mobil Uygulama Geliştirme",
            "Kerem Can Çelepkolu",
          ]
        : [
            "Digital Design Studio",
            "Web Development Agency",
            "Custom SaaS Development",
            "Next.js Engineering",
            "Corporate Website Design",
            "Mobile App Development",
            "Kerem Can Çelepkolu",
          ],
    authors: [{ name: SITE_CONFIG.founderName, url: SITE_CONFIG.url }],
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: SITE_CONFIG.url,
      siteName: dict.meta.siteName,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/og-cover.jpg",
          width: 1200,
          height: 630,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/images/og-cover.jpg"],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [headersList, locale] = await Promise.all([headers(), getServerLocale()]);
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang={locale}
      className={`${plusJakarta.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('studio_theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent/15 selection:text-foreground"
        suppressHydrationWarning
      >
        <LocaleProvider initialLocale={locale}>
          <Navbar />

          <main className={`flex-grow relative flex flex-col ${isAdmin ? "pt-0" : "pt-20 md:pt-24"}`}>
            {children}
          </main>

          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
