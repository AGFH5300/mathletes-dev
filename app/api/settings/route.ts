import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAdminAuthenticated } from "@/lib/auth"

export async function GET() {
  try {
    const settings = await sql`SELECT * FROM site_settings WHERE id = 1`
    const signupFormUrl = settings.length > 0 ? settings[0].signup_form_url : ""

    return NextResponse.json({ signupFormUrl: signupFormUrl || "" })
  } catch (error) {
    console.error("Failed to load settings:", error)
    return NextResponse.json({ success: false, message: "Failed to load settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { signupFormUrl } = await request.json()

    if (!signupFormUrl || typeof signupFormUrl !== "string") {
      return NextResponse.json({ success: false, message: "A valid signupFormUrl is required" }, { status: 400 })
    }

    await sql`
      INSERT INTO site_settings (id, signup_form_url)
      VALUES (1, ${signupFormUrl})
      ON CONFLICT (id) DO UPDATE SET signup_form_url = EXCLUDED.signup_form_url
    `

    return NextResponse.json({ success: true, signupFormUrl })
  } catch (error) {
    console.error("Failed to update settings:", error)
    return NextResponse.json({ success: false, message: "Failed to update settings" }, { status: 500 })
  }
}
