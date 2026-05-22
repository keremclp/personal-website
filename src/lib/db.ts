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

export const db = {
  isSupabase: hasDbConfig,
  projects: {
    findMany: async (): Promise<Project[]> => {
      if (hasDbConfig) {
        try {
          return (await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
          })) as unknown as Project[];
        } catch (err) {
          console.error("Prisma error in findMany, falling back to localDb", err);
          return localDb.projects.findMany();
        }
      }
      return localDb.projects.findMany();
    },
    findUnique: async (id: string): Promise<Project | null> => {
      if (hasDbConfig) {
        try {
          return (await prisma.project.findUnique({
            where: { id },
          })) as unknown as Project | null;
        } catch (err) {
          console.error("Prisma error in findUnique, falling back to localDb", err);
          return localDb.projects.findUnique(id);
        }
      }
      return localDb.projects.findUnique(id);
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
      if (hasDbConfig) {
        try {
          return (await prisma.project.create({
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
          return localDb.projects.create({
            ...data,
            liveLink: data.liveLink ?? null,
            githubLink: data.githubLink ?? null,
          });
        }
      }
      return localDb.projects.create({
        ...data,
        liveLink: data.liveLink ?? null,
        githubLink: data.githubLink ?? null,
      });
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
      if (hasDbConfig) {
        try {
          return (await prisma.project.update({
            where: { id },
            data: {
              ...data,
              liveLink: data.liveLink === undefined ? undefined : (data.liveLink || null),
              githubLink: data.githubLink === undefined ? undefined : (data.githubLink || null),
            },
          })) as unknown as Project;
        } catch (err) {
          console.error("Prisma error in update, falling back to localDb", err);
          return localDb.projects.update(id, data);
        }
      }
      return localDb.projects.update(id, data);
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
