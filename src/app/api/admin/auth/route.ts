import { NextRequest, NextResponse } from "next/server";
import { signSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const envUsername = process.env.ADMIN_USERNAME || "admin";
    const envPassword = process.env.ADMIN_PASSWORD || "admin_secure_password_2026";

    // Validate admin credentials securely
    if (username !== envUsername || password !== envPassword) {
      return NextResponse.json(
        { error: "Invalid username or password credentials." },
        { status: 401 }
      );
    }

    // Generate secure session token
    const token = await signSession(username);

    const response = NextResponse.json({ success: true, message: "Logged in successfully." });

    // Set secure signed cookie
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json({ error: "An unexpected authentication error occurred." }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully." });
  
  // Clear the cookie immediately
  response.cookies.delete("admin_session");
  
  return response;
}
