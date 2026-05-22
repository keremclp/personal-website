import React from "react";
import { db } from "@/lib/db";
import LeadsManager from "./LeadsManager";
import AdminNav from "@/components/AdminNav";

// Force dynamic server rendering to reflect submissions instantly
export const revalidate = 0;

export default async function AdminLeads() {
  // Query all inquiries (handles offline fallback JSON engine automatically!)
  const leads = await db.leads.findMany();

  return (
    <div className="w-full flex flex-col gap-8 pb-16">
      {/* Console Subheader Navigation */}
      <AdminNav />

      {/* Main CRM Inbox Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-10">
        
        {/* Section Header */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">CRM Lead Inbox</h1>
            <p className="text-sm text-zinc-500 font-sans mt-1">
              Review and manage quote requests registered by potential clients.
            </p>
          </div>
        </section>

        {/* Load dynamic client Leads component */}
        <LeadsManager initialLeads={JSON.parse(JSON.stringify(leads))} />

      </div>
    </div>
  );
}
