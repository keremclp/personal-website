import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySession } from "@/lib/auth";

// POST /api/leads - Public inquiry submission (from contact form)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, category, budget, message } = data;

    if (!name || !email || !category || !budget || !message) {
      return NextResponse.json(
        { error: "Required fields are missing: Name, Email, Category, Budget, Message." },
        { status: 400 }
      );
    }

    const newLead = await db.leads.create({
      name,
      email,
      category,
      budget,
      message,
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("Failed to create lead API:", error);
    return NextResponse.json({ error: "Failed to submit quote request." }, { status: 500 });
  }
}

// GET /api/leads - Secure fetch of all inquiries (for admin)
export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("admin_session")?.value;
    if (!sessionToken || !(await verifySession(sessionToken))) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const leads = await db.leads.findMany();
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Failed to fetch leads API:", error);
    return NextResponse.json({ error: "Failed to fetch leads inbox." }, { status: 500 });
  }
}

// PUT /api/leads - Secure status updates (NEW -> REVIEWED -> ARCHIVED)
export async function PUT(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("admin_session")?.value;
    if (!sessionToken || !(await verifySession(sessionToken))) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing required parameters: id, status." }, { status: 400 });
    }

    const updatedLead = await db.leads.updateStatus(id, status);
    return NextResponse.json(updatedLead);
  } catch (error: any) {
    console.error("Failed to update lead status API:", error);
    return NextResponse.json({ error: error.message || "Failed to update lead." }, { status: 500 });
  }
}

// DELETE /api/leads - Secure deletion of a lead record
export async function DELETE(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get("admin_session")?.value;
    if (!sessionToken || !(await verifySession(sessionToken))) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing inquiry ID parameter." }, { status: 400 });
    }

    await db.leads.delete(id);
    return NextResponse.json({ success: true, message: "Inquiry record deleted successfully." });
  } catch (error: any) {
    console.error("Failed to delete lead API:", error);
    return NextResponse.json({ error: error.message || "Failed to delete lead." }, { status: 500 });
  }
}
