"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { MathBackground } from "@/components/math-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface CompetitionFormData {
  name: string
  description: string
  date: string
  deadline: string
  location: string
  eligibility: string
  category: string
  difficulty: string
  cost: string
  website: string
  details: string
  resources: string
}

const DEFAULT_FORM: CompetitionFormData = {
  name: "",
  description: "",
  date: "",
  deadline: "",
  location: "",
  eligibility: "",
  category: "Competition",
  difficulty: "Intermediate",
  cost: "",
  website: "",
  details: "",
  resources: "",
}

export default function EditCompetitionPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const competitionId = Array.isArray(params?.id) ? params?.id[0] : params?.id

  const [formData, setFormData] = useState<CompetitionFormData>(DEFAULT_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initialize = async () => {
      try {
        const authResponse = await fetch("/api/auth/check")
        if (!authResponse.ok) {
          router.push("/admin/login")
          return
        }

        if (!competitionId) {
          setError("Competition ID is missing.")
          setIsLoading(false)
          return
        }

        const response = await fetch(`/api/competitions/${competitionId}`)
        if (!response.ok) {
          if (response.status === 404) {
            setError("Competition not found.")
          } else {
            setError("Failed to load competition details.")
          }
          setIsLoading(false)
          return
        }

        const data = await response.json()
        setFormData({
          name: data.name ?? "",
          description: data.description ?? "",
          date: data.date ?? "",
          deadline: data.deadline ?? "",
          location: data.location ?? "",
          eligibility: data.eligibility ?? "",
          category: data.category ?? "Competition",
          difficulty: data.difficulty ?? "Intermediate",
          cost: data.cost ?? "",
          website: data.website ?? "",
          details: data.details ?? "",
          resources: data.resources ?? "",
        })
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to load competition:", err)
        setError("Failed to load competition details.")
        setIsLoading(false)
      }
    }

    initialize()
  }, [router, competitionId])

  const handleChange = (field: keyof CompetitionFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!competitionId) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/competitions/${competitionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/dashboard")
      } else {
        setError("Failed to update competition. Please try again.")
      }
    } catch (err) {
      console.error("Failed to update competition:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative pt-24 pb-16">
      <MathBackground />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/admin/dashboard">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <Card className="shadow-xl border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl">Edit Competition</CardTitle>
            <CardDescription>Update the competition details below</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading competition details...</p>
            ) : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="name">Competition Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(event) => handleChange("name", event.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(event) => handleChange("description", event.target.value)}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Competition Date *</Label>
                      <Input
                        id="date"
                        value={formData.date}
                        onChange={(event) => handleChange("date", event.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline">Registration Deadline *</Label>
                      <Input
                        id="deadline"
                        value={formData.deadline}
                        onChange={(event) => handleChange("deadline", event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(event) => handleChange("location", event.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cost">Cost (Optional)</Label>
                      <Input
                        id="cost"
                        value={formData.cost}
                        onChange={(event) => handleChange("cost", event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="eligibility">Eligibility *</Label>
                    <Input
                      id="eligibility"
                      value={formData.eligibility}
                      onChange={(event) => handleChange("eligibility", event.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Official Website *</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(event) => handleChange("website", event.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Classification</h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Competition">Competition</SelectItem>
                          <SelectItem value="Workshop">Workshop</SelectItem>
                          <SelectItem value="Seminar">Seminar</SelectItem>
                          <SelectItem value="Training">Training</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Difficulty</Label>
                      <Select value={formData.difficulty} onValueChange={(value) => handleChange("difficulty", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Additional Details</h3>

                  <div className="space-y-2">
                    <Label htmlFor="details">Additional Information</Label>
                    <Textarea
                      id="details"
                      value={formData.details}
                      onChange={(event) => handleChange("details", event.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resources">Resources</Label>
                    <Textarea
                      id="resources"
                      value={formData.resources}
                      onChange={(event) => handleChange("resources", event.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => router.push("/admin/dashboard")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
