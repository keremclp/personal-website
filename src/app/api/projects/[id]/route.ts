import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth";

type Props = {
  params: Promise<{ id: string }>;
};

// PUT /api/projects/[id] - Securely update a portfolio item
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    // 1. Verify session
    const sessionToken = request.cookies.get("admin_session")?.value;
    if (!sessionToken || !(await verifySession(sessionToken))) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    // 2. Parse data
    const data = await request.json();

    // 3. Update entry
    const updatedProject = await db.projects.update(id, data);
    return NextResponse.json(updatedProject);
  } catch (error: any) {
    console.error("Failed to update project API:", error);
    return NextResponse.json({ error: error.message || "Failed to update project." }, { status: 500 });
  }
}

// DELETE /api/projects/[id] - Securely remove a portfolio item
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    // 1. Verify session
    const sessionToken = request.cookies.get("admin_session")?.value;
    if (!sessionToken || !(await verifySession(sessionToken))) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    // 2. Delete entry
    await db.projects.delete(id);
    return NextResponse.json({ success: true, message: "Project deleted successfully." });
  } catch (error: any) {
    console.error("Failed to delete project API:", error);
    return NextResponse.json({ error: error.message || "Failed to delete project." }, { status: 500 });
  }
}
