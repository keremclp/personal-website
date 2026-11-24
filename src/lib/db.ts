import { PrismaClient } from "@prisma/client";
import { localDb, Project, Lead } from "./localDb";

// Avoid hot-reloading recreating client instances in dev mode
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const hasDbConfig = !!process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error"] : [],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const STUDIO_SHOWCASE_IMAGES = [
  "/projects/showcase-web.jpg",
  "/projects/showcase-ecommerce.jpg",
  "/projects/showcase-portal.jpg",
  "/projects/showcase-mobile.jpg",
] as const;

// Legacy placeholder paths from earlier iterations that may still exist in live Supabase rows
const LEGACY_PLACEHOLDER_PATHS = new Set<string>([
  "/projects/ai-saas.png",
  "/projects/web-app.jpg",
  "/projects/luxury-ecommerce.png",
  "/projects/mobile-app.jpg",
  "/projects/creative-agency.png",
  "/projects/ai-app.jpg",
  "/projects/saas-platform.jpg",
  "/projects/commerce-editorial.jpg",
  "/projects/mobile-experience.jpg",
  "/projects/corporate-web.jpg",
  "/next.svg",
]);

function resolveProjectImage(
  path: string | undefined | null,
  fallbackIndex = 0,
  category = ""
): string {
  const trimmed = (path || "").trim();

  // Respect any custom URL or newly chosen showcase image directly from DB
  if (trimmed && !LEGACY_PLACEHOLDER_PATHS.has(trimmed)) {
    return trimmed;
  }

  // If the DB record still points to an old placeholder, assign a distinct new showcase image
  // so multiple legacy rows never display the exact same photo side-by-side
  const lowerCat = category.toLowerCase();
  if (fallbackIndex === -1) {
    if (lowerCat.includes("mobil") || lowerCat.includes("mobile") || lowerCat.includes("ai")) {
      return "/projects/showcase-mobile.jpg";
    }
    if (lowerCat.includes("ticaret") || lowerCat.includes("commerce")) {
      return "/projects/showcase-ecommerce.jpg";
    }
    if (lowerCat.includes("saas") || lowerCat.includes("yazılım") || lowerCat.includes("panel")) {
      return "/projects/showcase-portal.jpg";
    }
    return "/projects/showcase-web.jpg";
  }

  return STUDIO_SHOWCASE_IMAGES[fallbackIndex % STUDIO_SHOWCASE_IMAGES.length];
}

export const db = {
  isSupabase: hasDbConfig,
  projects: {
    findMany: async (): Promise<Project[]> => {
      let projects: Project[];
      if (hasDbConfig) {
        try {
          projects = (await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
          })) as unknown as Project[];
        } catch (err) {
          console.error("Prisma error in findMany, falling back to localDb", err);
          projects = await localDb.projects.findMany();
        }
      } else {
        projects = await localDb.projects.findMany();
      }
      return projects.map((p, index) => ({
        ...p,
        imageUrl: resolveProjectImage(p.imageUrl, index, p.category),
      }));
    },
    findUnique: async (id: string): Promise<Project | null> => {
      let project: Project | null;
      if (hasDbConfig) {
        try {
          project = (await prisma.project.findUnique({
            where: { id },
          })) as unknown as Project | null;
        } catch (err) {
          console.error("Prisma error in findUnique, falling back to localDb", err);
          project = await localDb.projects.findUnique(id);
        }
      } else {
        project = await localDb.projects.findUnique(id);
      }
      if (project) {
        return {
          ...project,
          imageUrl: resolveProjectImage(project.imageUrl, -1, project.category),
        };
      }
      return null;
    },
    create: async (data: {
      title: string;
      description: string;
      imageUrl: string;
      techStack: string;
      liveLink?: string | null;
      githubLink?: string | null;
      category: string;
    }): Promise<Project> => {
      let created: Project;
      if (hasDbConfig) {
        try {
          created = (await prisma.project.create({
            data: {
              title: data.title,
              description: data.description,
              imageUrl: data.imageUrl,
              techStack: data.techStack,
              liveLink: data.liveLink || null,
              githubLink: data.githubLink || null,
              category: data.category,
            },
          })) as unknown as Project;
        } catch (err) {
          console.error("Prisma error in create, falling back to localDb", err);
          created = await localDb.projects.create({
            ...data,
            liveLink: data.liveLink ?? null,
            githubLink: data.githubLink ?? null,
          });
        }
      } else {
        created = await localDb.projects.create({
          ...data,
          liveLink: data.liveLink ?? null,
          githubLink: data.githubLink ?? null,
        });
      }
      return {
        ...created,
        imageUrl: resolveProjectImage(created.imageUrl, -1, created.category),
      };
    },
    update: async (
      id: string,
      data: {
        title?: string;
        description?: string;
        imageUrl?: string;
        techStack?: string;
        liveLink?: string | null;
        githubLink?: string | null;
        category?: string;
      }
    ): Promise<Project> => {
      let updated: Project;
      if (hasDbConfig) {
        try {
          updated = (await prisma.project.update({
            where: { id },
            data: {
              ...data,
              liveLink: data.liveLink === undefined ? undefined : data.liveLink || null,
              githubLink: data.githubLink === undefined ? undefined : data.githubLink || null,
            },
          })) as unknown as Project;
        } catch (err) {
          console.error("Prisma error in update, falling back to localDb", err);
          updated = await localDb.projects.update(id, data);
        }
      } else {
        updated = await localDb.projects.update(id, data);
      }
      return {
        ...updated,
        imageUrl: resolveProjectImage(updated.imageUrl, -1, updated.category),
      };
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      if (hasDbConfig) {
        try {
          await prisma.project.delete({
            where: { id },
          });
          return { success: true };
        } catch (err) {
          console.error("Prisma error in delete, falling back to localDb", err);
          return localDb.projects.delete(id);
        }
      }
      return localDb.projects.delete(id);
    },
  },
  leads: {
    findMany: async (): Promise<Lead[]> => {
      if (hasDbConfig) {
        try {
          return (await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
          })) as unknown as Lead[];
        } catch (err) {
          console.error("Prisma error in leads.findMany, falling back to localDb", err);
          return localDb.leads.findMany();
        }
      }
      return localDb.leads.findMany();
    },
    create: async (data: {
      name: string;
      email: string;
      category: string;
      budget: string;
      message: string;
    }): Promise<Lead> => {
      if (hasDbConfig) {
        try {
          return (await prisma.lead.create({
            data,
          })) as unknown as Lead;
        } catch (err) {
          console.error("Prisma error in leads.create, falling back to localDb", err);
          return localDb.leads.create(data);
        }
      }
      return localDb.leads.create(data);
    },
    updateStatus: async (id: string, status: string): Promise<Lead> => {
      if (hasDbConfig) {
        try {
          return (await prisma.lead.update({
            where: { id },
            data: { status },
          })) as unknown as Lead;
        } catch (err) {
          console.error("Prisma error in leads.updateStatus, falling back to localDb", err);
          return localDb.leads.updateStatus(id, status);
        }
      }
      return localDb.leads.updateStatus(id, status);
    },
    delete: async (id: string): Promise<{ success: boolean }> => {
      if (hasDbConfig) {
        try {
          await prisma.lead.delete({
            where: { id },
          });
          return { success: true };
        } catch (err) {
          console.error("Prisma error in leads.delete, falling back to localDb", err);
          return localDb.leads.delete(id);
        }
      }
      return localDb.leads.delete(id);
    },
  },
};
