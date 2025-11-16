import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAdminAuthenticated } from "@/lib/auth"
import { promises as fs } from "fs"
import path from "path"
import { randomUUID } from "crypto"

export const runtime = "nodejs"

interface PastCompetitionPayload {
  title: string
  eventDate: string
  location: string
  attendees: string
  summary: string
  description: string
  isFeatured: boolean
}

function normalizeText(value: FormDataEntryValue | null): string {
  if (typeof value !== "string") return ""
  return value.trim()
}

async function persistImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const extension = path.extname(file.name || "").toLowerCase() || ".jpg"
  const fileName = `${Date.now()}-${randomUUID()}${extension}`
  const uploadDir = path.join(process.cwd(), "public", "uploads")

  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, fileName), buffer)

  return `/uploads/${fileName}`
}

export async function GET() {
  try {
    const entries = await sql`
      SELECT * FROM past_competitions
      ORDER BY event_date DESC NULLS LAST, created_at DESC
    `

    return NextResponse.json(entries)
  } catch (error) {
    console.error("Failed to fetch past competitions:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch past competitions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await isAdminAuthenticated()
    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const payload: PastCompetitionPayload = {
      title: normalizeText(formData.get("title")),
      eventDate: normalizeText(formData.get("eventDate")),
      location: normalizeText(formData.get("location")),
      attendees: normalizeText(formData.get("attendees")),
      summary: normalizeText(formData.get("summary")),
      description: normalizeText(formData.get("description")),
      isFeatured: normalizeText(formData.get("isFeatured")) === "true",
    }

    if (!payload.title || !payload.eventDate) {
      return NextResponse.json({ success: false, message: "Title and event date are required" }, { status: 400 })
    }

    const file = formData.get("image") as File | null
    const imagePath = await persistImage(file)

    const result = await sql`
      INSERT INTO past_competitions (title, event_date, location, attendees, summary, description, image_path, is_featured)
      VALUES (${payload.title}, ${payload.eventDate}, ${payload.location}, ${payload.attendees}, ${payload.summary}, ${payload.description}, ${imagePath}, ${payload.isFeatured})
      RETURNING *
    `

    return NextResponse.json({ success: true, entry: result[0] })
  } catch (error) {
    console.error("Failed to add past competition:", error)
    return NextResponse.json({ success: false, message: "Failed to add past competition" }, { status: 500 })
  }
}
