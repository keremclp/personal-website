import React from "react";
import { db } from "@/lib/db";
import ProjectsCrud from "./ProjectsCrud";
import AdminNav from "@/components/AdminNav";

export const revalidate = 0;

export default async function AdminProjects() {
  const projects = await db.projects.findMany();

  return (
    <div className="w-full flex flex-col gap-8 pb-16 min-h-screen bg-background">
      <AdminNav isSupabase={db.isSupabase} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col gap-8">
        <section>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Proje Yönetimi</h1>
          <p className="text-sm text-ink-secondary mt-1">
            Portfolyo vitrinindeki projeleri ekleyin, güncelleyin veya görsellerini değiştirin.
          </p>
        </section>

        <ProjectsCrud initialProjects={JSON.parse(JSON.stringify(projects))} />
      </div>
    </div>
  );
}
