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

// High-fidelity pre-seeded projects to wow the user immediately!
const SEED_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "NeuroFlow AI - Predictive Analytics Platform",
    description: "Designed and built a custom B2B SaaS dashboard and data pipeline for an AI forecasting tool. Optimized query latency by 40% and delivered a modern glassmorphic dashboard interface that contributed to their $1.2M seed round.",
    imageUrl: "/projects/ai-saas.png",
    techStack: "Next.js 15, Tailwind v4, TypeScript, Supabase, Chart.js",
    liveLink: "https://neuroflow.ai-demo.dev",
    githubLink: null,
    category: "SaaS",
    createdAt: new Date("2026-02-15T09:00:00Z"),
  },
  {
    id: "proj-2",
    title: "Aurelius - Luxury Horology Storefront",
    description: "Developed a premium, highly responsive e-commerce experience for an independent luxury watchmaker. Featuring dynamic animations, seamless cart integration, custom stripe checkouts, and clean minimalist editorial grids.",
    imageUrl: "/projects/luxury-ecommerce.png",
    techStack: "Next.js 15, React 19, Tailwind v4, Stripe, Framer Motion",
    liveLink: "https://aurelius-watches.demo",
    githubLink: null,
    category: "E-commerce",
    createdAt: new Date("2026-03-22T14:30:00Z"),
  },
  {
    id: "proj-3",
    title: "Verdant - Web3 Creative Brand Agency",
    description: "Crafted a visually stunning, high-converting design agency portfolio with interactive 3D web features, dark tech design trends, and flawless mobile performance. Ranked in CSS Design Awards and boosted inquiry rates by 180%.",
    imageUrl: "/projects/creative-agency.png",
    techStack: "Next.js 15, Three.js, Tailwind v4, Web Crypto API",
    liveLink: "https://verdant-studios.demo",
    githubLink: null,
    category: "Creative",
    createdAt: new Date("2026-04-10T11:15:00Z"),
  },
];

const SEED_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Alex Rivera",
    email: "alex@riveratech.io",
    category: "SaaS Development",
    budget: "$5k - $10k",
    message: "Hey Kerem Can! We saw your NeuroFlow project and loved the dark mode design. We want to build a similar analytics interface for our cloud cost intelligence tool. Let's jump on a call this week!",
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
    // Parse ISO dates back to Date objects
    data.projects = data.projects.map((p: any) => ({ ...p, createdAt: new Date(p.createdAt) }));
    data.leads = data.leads.map((l: any) => ({ ...l, createdAt: new Date(l.createdAt) }));
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
  // Project operations
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
        id: "proj-" + Math.random().toString(36).substr(2, 9),
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

  // Lead operations
  leads: {
    findMany: async () => {
      const db = initDb();
      return db.leads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },
    create: async (data: Omit<Lead, "id" | "status" | "createdAt">) => {
      const db = initDb();
      const newLead: Lead = {
        ...data,
        id: "lead-" + Math.random().toString(36).substr(2, 9),
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
