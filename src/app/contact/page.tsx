import React from "react";
import type { Metadata } from "next";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  return {
    title: dict.nav.contact,
    description: dict.contact.subtitle,
  };
}

type ContactPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const initialCategory = typeof params.category === "string" ? params.category : "";

  return <ContactClient initialCategory={initialCategory} />;
}
