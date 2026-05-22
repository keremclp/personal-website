import React from "react";
import { db } from "@/lib/db";
import ProjectsCrud from "./ProjectsCrud";
import AdminNav from "@/components/AdminNav";

// Force dynamic server rendering to reflect changes immediately
export const revalidate = 0;

export default async function AdminProjects() {
  // Query all projects server-side (supporting offline fallback engine automatically!)
  const projects = await db.projects.findMany();

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Console Subheader Navigation */}
      <AdminNav />

      {/* Main CRUD Portal Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-10">
        
        {/* Section Header */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Project CRUD Manager</h1>
            <p className="text-sm text-zinc-500 font-sans mt-1">
              Add, update, or remove portfolio items from the public directory.
            </p>
          </div>
        </section>

        {/* Load dynamic client CRUD component */}
        <ProjectsCrud initialProjects={JSON.parse(JSON.stringify(projects))} />

      </div>
    </div>
  );
}
