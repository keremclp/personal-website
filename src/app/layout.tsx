import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { headers } from "next/headers";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Kerem Can Çelepkolu | Premium Web Development & Agency Partner",
  description:
    "I craft modern, premium, high-converting digital products, B2B SaaS dashboards, and bespoke luxury e-commerce storefronts. Partner with me to design a powerful commercial presence.",
  keywords: [
    "Web Developer",
    "SaaS Designer",
    "Next.js Developer",
    "Tailwind CSS v4",
    "Freelance Developer",
    "Agency Website",
    "React Specialist",
    "Commercial Landing Pages",
  ],
  authors: [{ name: "Kerem Can Çelepkolu", url: "https://keremcan.dev" }],
  openGraph: {
    title: "Kerem Can Çelepkolu | Premium Web Development Partner",
    description:
      "Crafting modern, premium, high-converting digital products, B2B SaaS dashboards, and bespoke luxury e-commerce storefronts.",
    url: "https://keremcan.dev",
    siteName: "Kerem Can Çelepkolu Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-brand-dark text-foreground selection:bg-brand-purple/30 selection:text-white"
        suppressHydrationWarning
      >
        {/* Background Ambient Glowing Blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-10]">
          <div className="glow-blob glow-blob-purple" />
          <div className="glow-blob glow-blob-cyan" />
          <div className="glow-blob glow-blob-pink" />
        </div>

        {/* Global Floating Header */}
        <Navbar />
        
        {/* Premium Neon Custom Cursor */}
        <CustomCursor />

        {/* Core Layout Wrap */}
        <main className={`flex-grow relative flex flex-col ${isAdmin ? "pt-0" : "pt-24 md:pt-32"}`}>
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
