"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MathBackground } from "@/components/math-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowLeft, Plus, Trash2 } from "lucide-react"

interface PastCompetition {
  id: number
  title: string
  event_date: string
  location: string | null
  attendees: string | null
  summary: string | null
  description: string | null
  image_path: string | null
  is_featured: boolean
}

export default function PastCompetitionsDashboardPage() {
  const [entries, setEntries] = useState<PastCompetition[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (!response.ok) {
          router.push("/admin/login")
          return
        }
        fetchEntries()
      } catch {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/past-competitions")
      if (response.ok) {
        const data = await response.json()
        setEntries(data)
      }
    } catch (error) {
      console.error("Failed to load past competitions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this recap?")) return

    try {
      const response = await fetch(`/api/past-competitions/${id}`, { method: "DELETE" })
      if (response.ok) {
        setEntries((prev) => prev.filter((entry) => entry.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete entry:", error)
    }
  }

  return (
    <div className="min-h-screen relative pt-24 pb-16">
      <MathBackground />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <Link href="/admin/dashboard" className="underline">
                Back to competitions
              </Link>
            </p>
            <h1 className="text-4xl font-bold mt-4">Past Competition Highlights</h1>
            <p className="text-muted-foreground">Upload images, mark featured events, and celebrate recent wins.</p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/admin/dashboard/past-competitions/add">
              <Plus className="h-4 w-4" />
              Add Highlight
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading past competitions...</p>
          </div>
        ) : entries.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center space-y-4">
              <p className="text-muted-foreground">No recaps have been added yet.</p>
              <Button asChild>
                <Link href="/admin/dashboard/past-competitions/add">Create your first highlight</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {entries.map((entry) => (
              <Card key={entry.id} className="overflow-hidden">
                {entry.image_path && (
                  <div className="relative h-48">
                    <Image
                      src={entry.image_path}
                      alt={entry.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">{entry.title}</CardTitle>
                      {entry.is_featured && <Badge className="mt-2">Featured</Badge>}
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(entry.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mt-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {entry.event_date ? new Date(entry.event_date).toLocaleDateString() : "Date TBD"}
                    </span>
                    {entry.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {entry.location}
                      </span>
                    )}
                    {entry.attendees && (
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {entry.attendees}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {entry.summary && <p className="text-muted-foreground mb-4">{entry.summary}</p>}
                  {entry.description && (
                    <p className="text-sm text-muted-foreground whitespace-pre-line border-t pt-4">{entry.description}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
