import fs from "fs";
import path from "path";

// Define TypeScript interfaces matching the Prisma schema
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string;
  liveLink: string | null;
  githubLink: string | null;
  category: string;
  createdAt: Date;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  category: string;
  budget: string;
  message: string;
  status: string; // "NEW" | "REVIEWED" | "ARCHIVED"
  createdAt: Date;
}

interface LocalSchema {
  projects: Project[];
  leads: Lead[];
}

const DB_FILE_PATH = path.join(process.cwd(), ".data", "db.json");

// Clean fallback projects used only when DATABASE_URL is not configured locally
const SEED_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Operasyon & Analitik Yönetim Platformu",
    description:
      "Kurumsal ekiplerin gelir, proje akışı ve müşteri süreçlerini tek merkezden yönetmesi için tasarlanan modern yönetim paneli. Hızlı filtreleme, rol bazlı erişim ve sade veri sunumuyla karar alma sürecini hızlandırmak üzere geliştirildi.",
    imageUrl: "/projects/saas-platform.jpg",
    techStack: "Web Platform, Yönetim Paneli",
    liveLink: null,
    githubLink: null,
    category: "Özel Yazılım",
    createdAt: new Date("2026-04-15T09:00:00Z"),
  },
  {
    id: "proj-2",
    title: "Atelier — Tasarım & E-Ticaret Vitrini",
    description:
      "Seçkin bir tasarım markası için yüksek görsel kaliteye sahip, hızlı açılan ve mobil öncelikli vitrin ile sipariş deneyimi. Güçlü ürün sunumu ve sade alışveriş akışıyla ziyaretçi güvenini ve satış dönüşümünü artırmak üzere kurgulandı.",
    imageUrl: "/projects/commerce-editorial.jpg",
    techStack: "E-Ticaret, Marka Vitrini",
    liveLink: null,
    githubLink: null,
    category: "E-Ticaret",
    createdAt: new Date("2026-03-22T14:30:00Z"),
  },
  {
    id: "proj-3",
    title: "Rezervasyon & Yaşam Tarzı Mobil Uygulaması",
    description:
      "Kullanıcıların mekan keşfi, anlık rezervasyon ve kişisel takvim yönetimini tek uygulamada yapabildiği iOS & Android mobil deneyimi. Akıcı gezinme ve sade tasarım diliyle yüksek kullanıcı memnuniyeti hedeflenerek teslim edildi.",
    imageUrl: "/projects/mobile-experience.jpg",
    techStack: "Mobil Uygulama, iOS & Android",
    liveLink: null,
    githubLink: null,
    category: "Mobil",
    createdAt: new Date("2026-02-10T11:15:00Z"),
  },
  {
    id: "proj-4",
    title: "Kurumsal Mimarlık & Marka Web Platformu",
    description:
      "Proje portfolyosunu uluslararası standartlarda sergilemek isteyen bir mimarlık ofisi için editoryal tasarım dili, çoklu dil yapısı ve yüksek Google görünürlüğüyle hazırlanan kurumsal web sitesi.",
    imageUrl: "/projects/corporate-web.jpg",
    techStack: "Kurumsal Web, Çoklu Dil",
    liveLink: null,
    githubLink: null,
    category: "Kurumsal Web",
    createdAt: new Date("2026-01-18T10:00:00Z"),
  },
];

const SEED_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Mert Kaya",
    email: "mert@ornekfirma.com",
    category: "Kurumsal Web Sitesi",
    budget: "50.000 ₺ – 120.000 ₺",
    message:
      "Merhaba, şirketimizin mevcut web sitesini daha modern ve kurumsal bir tasarımla yenilemek, ayrıca Türkçe/İngilizce dil desteği eklemek istiyoruz. Uygun bir zamanda görüşebilir miyiz?",
    status: "NEW",
    createdAt: new Date("2026-05-20T10:00:00Z"),
  },
];

function initDb(): LocalSchema {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE_PATH)) {
    const defaultData: LocalSchema = {
      projects: SEED_PROJECTS,
      leads: SEED_LEADS,
    };
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }

  try {
    const content = fs.readFileSync(DB_FILE_PATH, "utf-8");
    const data = JSON.parse(content);
    data.projects = data.projects.map((p: Project) => ({ ...p, createdAt: new Date(p.createdAt) }));
    data.leads = data.leads.map((l: Lead) => ({ ...l, createdAt: new Date(l.createdAt) }));
    return data;
  } catch (error) {
    console.error("Failed to read JSON DB, resetting to defaults", error);
    const defaultData: LocalSchema = {
      projects: SEED_PROJECTS,
      leads: SEED_LEADS,
    };
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(defaultData, null, 2), "utf-8");
    return defaultData;
  }
}

function writeDb(data: LocalSchema) {
  const dir = path.dirname(DB_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export const localDb = {
  projects: {
    findMany: async () => {
      const db = initDb();
      return db.projects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },
    findUnique: async (id: string) => {
      const db = initDb();
      return db.projects.find((p) => p.id === id) || null;
    },
    create: async (data: Omit<Project, "id" | "createdAt">) => {
      const db = initDb();
      const newProject: Project = {
        ...data,
        id: "proj-" + Math.random().toString(36).substring(2, 11),
        createdAt: new Date(),
      };
      db.projects.push(newProject);
      writeDb(db);
      return newProject;
    },
    update: async (id: string, data: Partial<Omit<Project, "id" | "createdAt">>) => {
      const db = initDb();
      const idx = db.projects.findIndex((p) => p.id === id);
      if (idx === -1) throw new Error("Project not found");
      db.projects[idx] = {
        ...db.projects[idx],
        ...data,
      };
      writeDb(db);
      return db.projects[idx];
    },
    delete: async (id: string) => {
      const db = initDb();
      const initialLength = db.projects.length;
      db.projects = db.projects.filter((p) => p.id !== id);
      if (db.projects.length === initialLength) throw new Error("Project not found");
      writeDb(db);
      return { success: true };
    },
  },

  leads: {
    findMany: async () => {
      const db = initDb();
      return db.leads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },
    create: async (data: Omit<Lead, "id" | "status" | "createdAt">) => {
      const db = initDb();
      const newLead: Lead = {
        ...data,
        id: "lead-" + Math.random().toString(36).substring(2, 11),
        status: "NEW",
        createdAt: new Date(),
      };
      db.leads.push(newLead);
      writeDb(db);
      return newLead;
    },
    updateStatus: async (id: string, status: string) => {
      const db = initDb();
      const idx = db.leads.findIndex((l) => l.id === id);
      if (idx === -1) throw new Error("Lead not found");
      db.leads[idx].status = status;
      writeDb(db);
      return db.leads[idx];
    },
    delete: async (id: string) => {
      const db = initDb();
      const initialLength = db.leads.length;
      db.leads = db.leads.filter((l) => l.id !== id);
      if (db.leads.length === initialLength) throw new Error("Lead not found");
      writeDb(db);
      return { success: true };
    },
  },
};
