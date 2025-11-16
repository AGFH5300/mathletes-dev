"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MathBackground } from "@/components/math-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, LogOut, Calendar, Clock, DollarSign, MapPin, Users } from "lucide-react"
import Link from "next/link"

interface Competition {
  id: number
  name: string
  date: string
  deadline: string
  location: string
  eligibility: string
  category: string
  difficulty: string
  cost?: string
  description: string
  website: string
  details: string
  resources: string
  created_at: string
}

export default function AdminDashboardPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
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
        fetchCompetitions()
      } catch (error) {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const fetchCompetitions = async () => {
    try {
      const response = await fetch("/api/competitions")
      if (response.ok) {
        const data = await response.json()
        setCompetitions(data)
      }
    } catch (error) {
      console.error("Failed to fetch competitions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this competition?")) return

    try {
      const response = await fetch(`/api/competitions/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCompetitions(competitions.filter((c) => c.id !== id))
      }
    } catch (error) {
      console.error("Failed to delete competition:", error)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="min-h-screen relative pt-24 pb-16">
      <MathBackground />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage mathematics competitions</p>
          </div>
          <div className="flex gap-3">
            <Button asChild className="gap-2">
              <Link href="/admin/dashboard/add">
                <Plus className="h-4 w-4" />
                Add Competition
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Competitions List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading competitions...</p>
          </div>
        ) : competitions.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No competitions added yet.</p>
              <Button asChild>
                <Link href="/admin/dashboard/add">Add Your First Competition</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {competitions.map((competition) => (
              <Card key={competition.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{competition.name}</CardTitle>
                      <div className="flex gap-2 flex-wrap text-sm text-muted-foreground">
                        <span className="bg-primary/10 px-2 py-1 rounded">{competition.category}</span>
                        <span className="bg-secondary/10 px-2 py-1 rounded">{competition.difficulty}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" /> {competition.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> Deadline: {competition.deadline}
                        </span>
                        {competition.cost && (
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" /> {competition.cost}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/admin/dashboard/edit/${competition.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(competition.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">{competition.description}</p>
                  <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {competition.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {competition.eligibility}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
