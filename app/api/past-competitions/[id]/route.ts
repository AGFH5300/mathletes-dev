import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAdminAuthenticated } from "@/lib/auth"
import { promises as fs } from "fs"
import path from "path"

export const runtime = "nodejs"

type ParamsPromise = { params: Promise<{ id: string }> }

export async function DELETE(request: NextRequest, ctx: ParamsPromise) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { id } = await ctx.params
    const existing = await sql`SELECT image_path FROM past_competitions WHERE id = ${id}`

    if (existing.length === 0) {
      return NextResponse.json({ success: false, message: "Entry not found" }, { status: 404 })
    }

    await sql`DELETE FROM past_competitions WHERE id = ${id}`

    const imagePath = existing[0].image_path as string | null
    if (imagePath) {
      const normalized = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath
      const fullPath = path.join(process.cwd(), "public", normalized)
      try {
        await fs.unlink(fullPath)
      } catch (error) {
        console.warn(`Failed to delete image ${fullPath}:`, error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete past competition:", error)
    return NextResponse.json({ success: false, message: "Failed to delete past competition" }, { status: 500 })
  }
}
