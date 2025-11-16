import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAdminAuthenticated } from "@/lib/auth"

// Next.js 15+ passes `params` as a Promise, so we must `await` it before use.
// This applies to all route handler functions (GET, PUT, DELETE, etc.)

type ParamsPromise = { params: Promise<{ id: string }> }

export async function DELETE(request: NextRequest, ctx: ParamsPromise) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await ctx.params
    await sql`DELETE FROM competitions WHERE id = ${id}`

    return NextResponse.json({
      success: true,
      message: "Competition deleted successfully",
    })
  } catch (error) {
    console.error("Failed to delete competition:", error)
    return NextResponse.json({ success: false, message: "Failed to delete competition" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, ctx: ParamsPromise) {
  try {
    const { id } = await ctx.params
    const competition = await sql`SELECT * FROM competitions WHERE id = ${id}`

    if (competition.length === 0) {
      return NextResponse.json({ success: false, message: "Competition not found" }, { status: 404 })
    }

    return NextResponse.json(competition[0])
  } catch (error) {
    console.error("Failed to fetch competition:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch competition" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, ctx: ParamsPromise) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await ctx.params
    const data = await request.json()

    await sql`
      UPDATE competitions SET 
        name = ${data.name},
        description = ${data.description},
        date = ${data.date},
        deadline = ${data.deadline},
        location = ${data.location},
        eligibility = ${data.eligibility},
        category = ${data.category},
        difficulty = ${data.difficulty},
        cost = ${data.cost || null},
        website = ${data.website},
        details = ${data.details || ""},
        resources = ${data.resources || ""}
      WHERE id = ${id}
    `

    return NextResponse.json({
      success: true,
      message: "Competition updated successfully",
    })
  } catch (error) {
    console.error("Failed to update competition:", error)
    return NextResponse.json({ success: false, message: "Failed to update competition" }, { status: 500 })
  }
}
