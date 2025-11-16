"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { MathBackground } from "@/components/math-background"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, ArrowLeft } from "lucide-react"

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

function formatDate(value: string | null) {
  if (!value) return "Date coming soon"
  try {
    return format(new Date(value), "MMMM d, yyyy")
  } catch {
    return value
  }
}

export default function CompetitionHighlightsPage() {
  const [entries, setEntries] = useState<PastCompetition[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEntries = async () => {
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

    loadEntries()
  }, [])

  return (
    <div className="min-h-screen relative pt-24 pb-16">
      <MathBackground />

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <Link href="/competitions" className="underline">
              Back to competitions
            </Link>
          </p>
          <h1 className="text-5xl font-bold text-foreground mb-4">Competition Highlights</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Browse our archive of competitions to see how DIA Mathletes performed, the students who attended, and what we
            learned from each event.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading highlights...</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12 bg-card border rounded-xl">
            <p className="text-muted-foreground">Past competition recaps will appear here soon.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {entries.map((entry) => (
              <article key={entry.id} className="rounded-2xl border shadow-sm bg-card overflow-hidden">
                {entry.image_path && (
                  <div className="relative h-52">
                    <Image
                      src={entry.image_path}
                      alt={entry.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-card-foreground">{entry.title}</h2>
                      <p className="text-sm text-muted-foreground">{formatDate(entry.event_date)}</p>
                    </div>
                    {entry.is_featured && <Badge>Featured</Badge>}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                  {entry.summary && <p className="text-base text-card-foreground">{entry.summary}</p>}
                  {entry.description && (
                    <p className="text-sm text-muted-foreground whitespace-pre-line border-t pt-4">{entry.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
