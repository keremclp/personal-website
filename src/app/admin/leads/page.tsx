import React from "react";
import { db } from "@/lib/db";
import LeadsManager from "./LeadsManager";
import AdminNav from "@/components/AdminNav";

export const revalidate = 0;

export default async function AdminLeads() {
  const leads = await db.leads.findMany();

  return (
    <div className="w-full flex flex-col gap-8 pb-16 min-h-screen bg-background">
      <AdminNav isSupabase={db.isSupabase} />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex flex-col gap-8">
        <section>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Gelen Teklifler</h1>
          <p className="text-sm text-ink-secondary mt-1">
            İletişim formundan gelen müşteri taleplerini inceleyin, yanıtlayın ve durumlarını güncelleyin.
          </p>
        </section>

        <LeadsManager initialLeads={JSON.parse(JSON.stringify(leads))} />
      </div>
    </div>
  );
}
