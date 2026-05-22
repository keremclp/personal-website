import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles, Layers, ShieldCheck, Zap, MessageSquare, Smartphone } from "lucide-react";
import { db } from "@/lib/db";

// Force dynamic rendering to ensure DB changes are visible instantly in dashboard
export const revalidate = 0;

export default async function Home() {
  // Fetch projects from db (falls back to pre-seeded local JSON DB if Supabase isn't connected yet)
  const projects = await db.projects.findMany();
  const featuredProjects = projects.slice(0, 3); // Take first 3 projects for the homepage showcase

  return (
    <div className="w-full flex flex-col gap-24 md:gap-36 pb-20">
      {/* 1. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 md:pt-16 flex flex-col items-center text-center">
        {/* Subtle Pill Accent */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-semibold text-brand-purple tracking-wide mb-8 animate-fade-in">
          <Sparkles size={12} className="text-brand-cyan animate-pulse" />
          Web Design & Engineering Partner
        </div>

        {/* Catchy Value Prop H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-none">
          We Build Web Products That <br />
          <span className="text-gradient-neon">Convert Visitors Into Clients</span>
        </h1>

        <p className="mt-8 text-base sm:text-lg md:text-xl text-zinc-400 font-sans max-w-3xl leading-relaxed">
          Bespoke digital engineering for high-growth startups and businesses. We combine premium dark aesthetics, blazing-fast Next.js architecture, and seamless conversion engineering to scale your operations.
        </p>

        {/* Hero Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all shadow-lg shadow-brand-purple/20 flex items-center justify-center gap-2"
          >
            Start Your Project
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/portfolio"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-white/5 border border-brand-border text-foreground hover:border-brand-cyan hover:bg-brand-cyan/5 transition-all flex items-center justify-center gap-2"
          >
            View Showcase
          </Link>
        </div>

        {/* Built-in social proof / tech trust logos
        <div className="mt-16 pt-8 border-t border-brand-border/40 w-full max-w-4xl">
          <p className="text-xs uppercase font-mono tracking-widest text-zinc-500 text-center">
            Specializing in state-of-the-art tech
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-6 opacity-60">
            <span className="font-mono text-sm font-semibold tracking-wider text-zinc-400">NEXT.JS 15</span>
            <span className="font-mono text-sm font-semibold tracking-wider text-zinc-400">REACT 19</span>
            <span className="font-mono text-sm font-semibold tracking-wider text-zinc-400">TAILWIND V4</span>
            <span className="font-mono text-sm font-semibold tracking-wider text-zinc-400">SUPABASE</span>
            <span className="font-mono text-sm font-semibold tracking-wider text-zinc-400">PRISMA</span>
          </div>
        </div> */}
      </section>

      {/* 2. Services Grid */}
      <section className="w-full bg-brand-deep border-y border-brand-border py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase">
                What We Do
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white">
                Engineered for High-Stakes Performance
              </h2>
            </div>
            <p className="text-zinc-400 font-sans text-sm md:text-base max-w-md leading-relaxed">
              We craft high-performing websites and cross-platform mobile applications tailored to maximize conversion, engagement, and operational scale.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="glass-panel glass-panel-hover p-8 md:p-10 rounded-3xl flex flex-col gap-6 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
                <Zap size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">Premium Websites</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Stunning, high-converting marketing sites and modern web storefronts designed to capture attention and elevate your brand presence. Engineered for exceptional loading speeds, responsive layouts, and organic search engine dominance.
              </p>
              <ul className="flex flex-col gap-2 mt-auto text-xs text-zinc-400 font-sans border-t border-brand-border pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-brand-purple" /> High-Converting Visuals
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-brand-purple" /> Complete SEO Optimization
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="glass-panel glass-panel-hover p-8 md:p-10 rounded-3xl flex flex-col gap-6 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <Smartphone size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">Mobile Applications</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Premium, cross-platform mobile apps for iOS and Android built to engage users. Engineered with butter-smooth interface animations, offline-first support, and seamless integration with native device features.
              </p>
              <ul className="flex flex-col gap-2 mt-auto text-xs text-zinc-400 font-sans border-t border-brand-border pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-brand-cyan" /> iOS & Android Deployments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-brand-cyan" /> Fluid UI & Offline Support
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="glass-panel glass-panel-hover p-8 md:p-10 rounded-3xl flex flex-col gap-6 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink">
                <Layers size={22} />
              </div>
              <h3 className="text-xl font-bold text-white">Full-Stack SaaS Systems</h3>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                Robust administrative panels, custom workflow portals, and database-driven SaaS systems built to streamline your operations. Engineered to support high transactional volumes and scale alongside your business.
              </p>
              <ul className="flex flex-col gap-2 mt-auto text-xs text-zinc-400 font-sans border-t border-brand-border pt-4">
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-brand-pink" /> Workflow & CRM Automation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={12} className="text-brand-pink" /> High-Grade Security Protocols
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Portfolio Highlight */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-brand-purple uppercase">
              Proven Results
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white">
              Websites We Designed & Sold
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="text-brand-cyan hover:text-brand-purple dark:hover:text-white transition-colors flex items-center gap-1.5 font-sans font-medium mt-4 md:mt-0 text-sm md:text-base border-b border-brand-cyan/20 pb-1 w-fit"
          >
            Explore all digital assets
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col group transition-all duration-300"
            >
              {/* Image box */}
              <div className="w-full aspect-video relative overflow-hidden bg-brand-dark/50 border-b border-brand-border">
                <img
                  src={project.imageUrl || "/next.svg"}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-dark/85 backdrop-blur-md text-[10px] font-bold text-brand-cyan uppercase tracking-wider border border-white/5">
                  {project.category}
                </span>
              </div>

              {/* Contents */}
              <div className="p-6 md:p-8 flex flex-col flex-grow gap-4">
                <h3 className="text-lg font-bold text-white leading-snug group-hover:text-brand-purple transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.techStack.split(",").map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-white/5 border border-brand-border text-[10px] font-mono text-zinc-400"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Client Testimonials */}
      <section className="w-full bg-brand-deep border-y border-brand-border py-20 md:py-28 relative">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="w-12 h-12 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple mx-auto mb-6">
            <MessageSquare size={20} className="fill-brand-purple/10" />
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase">
            Client Success
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white mb-12">
            What Clients Say About Working With Us
          </h2>

          <div className="glass-panel p-8 md:p-12 rounded-3xl text-left relative overflow-hidden">
            {/* Quotation Glow */}
            <div className="absolute right-8 bottom-4 opacity-5 text-9xl font-serif text-white pointer-events-none">
              ”
            </div>
            
            <p className="text-base md:text-xl font-sans italic text-zinc-300 leading-relaxed">
              "Working with Kerem Can has completely transformed our conversion funnel. He rebuilt our entire marketing site and customer SaaS dashboard in Next.js in under 4 weeks. Our loading speeds dropped by 60%, and our signup rate rose by 34% within the first month. An absolute web engineering master!"
            </p>
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-brand-border">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-purple to-brand-pink flex items-center justify-center font-bold text-white">
                MD
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Marcus Sterling</h4>
                <p className="text-xs text-brand-cyan font-mono mt-0.5">Founder & CTO, NeuroFlow AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sticky Call-To-Action (CTA) */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 w-full text-center">
        <div className="glass-panel p-10 md:p-16 rounded-3xl flex flex-col items-center gap-8 relative overflow-hidden border-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-brand-cyan/5 pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to Build Your Premium <br />
            Commercial Platform?
          </h2>
          <p className="text-zinc-400 font-sans max-w-xl text-sm md:text-base leading-relaxed">
            Let's design and launch a responsive, high-converting digital portal that positions your business at the forefront of your industry.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center z-10">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Start Free Quote Estimator
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://wa.me/905000000000?text=Hello%20Kerem Can!%20I'm%20interested%20in%20web%20development%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm tracking-wider uppercase bg-white/5 border border-brand-border text-foreground hover:border-emerald-500 hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-2"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
