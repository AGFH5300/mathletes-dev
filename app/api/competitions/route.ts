import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAdminAuthenticated } from "@/lib/auth"

export async function GET() {
  try {
    const competitions = await sql`
      SELECT * FROM competitions 
      ORDER BY created_at DESC
    `
    return NextResponse.json(competitions)
  } catch (error) {
    console.error("Failed to fetch competitions:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch competitions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const result = await sql`
      INSERT INTO competitions (
        name, description, date, deadline, location, eligibility, 
        category, difficulty, cost, website, details, resources
      ) VALUES (
        ${data.name}, ${data.description}, ${data.date}, ${data.deadline}, 
        ${data.location}, ${data.eligibility}, ${data.category}, ${data.difficulty}, 
        ${data.cost || null}, ${data.website}, ${data.details || ""}, ${data.resources || ""}
      ) RETURNING *
    `

    return NextResponse.json({
      success: true,
      message: "Competition added successfully",
      competition: result[0],
    })
  } catch (error) {
    console.error("Failed to add competition:", error)
    return NextResponse.json({ success: false, message: "Failed to add competition" }, { status: 500 })
  }
}
