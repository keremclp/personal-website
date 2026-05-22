import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth";

// GET /api/projects - Publicly fetch all projects
export async function GET() {
  try {
    const projects = await db.projects.findMany();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects API:", error);
    return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 });
  }
}

// POST /api/projects - Authenticated creation of projects
export async function POST(request: NextRequest) {
  try {
    // 1. Verify administrative session
    const sessionToken = request.cookies.get("admin_session")?.value;
    if (!sessionToken || !(await verifySession(sessionToken))) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    // 2. Extract and validate input data
    const data = await request.json();
    const { title, description, imageUrl, techStack, liveLink, githubLink, category } = data;

    if (!title || !description || !imageUrl || !techStack || !category) {
      return NextResponse.json(
        { error: "Required fields are missing: Title, Description, Image URL, Tech Stack, Category." },
        { status: 400 }
      );
    }

    // 3. Create project
    const newProject = await db.projects.create({
      title,
      description,
      imageUrl,
      techStack,
      liveLink: liveLink || null,
      githubLink: githubLink || null,
      category,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Failed to create project API:", error);
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }
}
