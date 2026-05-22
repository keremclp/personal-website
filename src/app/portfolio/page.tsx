import React from "react";
import { db } from "@/lib/db";
import PortfolioClient from "./PortfolioClient";

// Force dynamic rendering to ensure DB updates are immediate
export const revalidate = 0;

export default async function Portfolio() {
  // Server-side database query
  const projects = await db.projects.findMany();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 w-full flex flex-col gap-12 md:gap-16">
      {/* Page Header */}
      <section className="relative pt-8 md:pt-16 max-w-3xl">
        <span className="text-xs font-mono font-bold tracking-widest text-brand-cyan uppercase">
          Showcase
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-4 leading-tight">
          Websites We Have <br />
          <span className="text-gradient-neon">Designed, Built & Delivered</span>
        </h1>
        <p className="mt-6 text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
          Explore our portfolio of premium client sites, digital dashboards, and full-stack systems. Click on any card to view the case study and understand the concrete commercial value delivered to the client.
        </p>
      </section>

      {/* Render the Client Side Grid with Database pre-fetched elements */}
      <PortfolioClient initialProjects={JSON.parse(JSON.stringify(projects))} />
    </div>
  );
}
