import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Mock admin credentials - replace with database check
const ADMIN_CREDENTIALS = {
  email: "admin@mathletes.com",
  password: "mathletes2025",
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("Login attempt for:", email) // Added debug logging

    // Validate credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      console.log("Credentials valid, setting cookie") // Debug cookie setting
      // Set authentication cookie
      const cookieStore = await cookies()
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/", // Added explicit path to ensure cookie works everywhere
      })

      console.log("Cookie set successfully") // Confirm cookie
      return NextResponse.json({ success: true })
    }

    console.log("Invalid credentials") // Debug failed login
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error) // Debug errors
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
