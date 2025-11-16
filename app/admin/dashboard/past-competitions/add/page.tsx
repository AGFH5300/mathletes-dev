"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { MathBackground } from "@/components/math-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload } from "lucide-react"

export default function AddPastCompetitionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    eventDate: "",
    location: "",
    attendees: "",
    summary: "",
    description: "",
    isFeatured: false,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (!response.ok) {
          router.push("/admin/login")
        }
      } catch (error) {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setImageFile(null)
      setImagePreview(null)
      return
    }
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = new FormData()
      payload.append("title", formData.title)
      payload.append("eventDate", formData.eventDate)
      payload.append("location", formData.location)
      payload.append("attendees", formData.attendees)
      payload.append("summary", formData.summary)
      payload.append("description", formData.description)
      payload.append("isFeatured", formData.isFeatured ? "true" : "false")

      if (imageFile) {
        payload.append("image", imageFile)
      }

      const response = await fetch("/api/past-competitions", {
        method: "POST",
        body: payload,
      })

      if (response.ok) {
        router.push("/admin/dashboard/past-competitions")
      } else {
        alert("Failed to save highlight")
      }
    } catch (error) {
      console.error("Failed to save highlight:", error)
      alert("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative pt-24 pb-16">
      <MathBackground />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/admin/dashboard/past-competitions">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Highlights
          </Link>
        </Button>

        <Card className="shadow-xl border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl">Add Past Competition Highlight</CardTitle>
            <CardDescription>Upload a recap with optional imagery and mark if it should be featured.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    placeholder="E.g., World Math Team Championship"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange("eventDate", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Dubai International Academy"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendees">Attendees / Team</Label>
                  <Input
                    id="attendees"
                    value={formData.attendees}
                    onChange={(e) => handleInputChange("attendees", e.target.value)}
                    placeholder="Team Alpha, Team Beta"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Short Summary</Label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange("summary", e.target.value)}
                  placeholder="Summarize the final ranking, special awards, or stand-out performances."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Add more details about preparation, highlights, and what the team learned."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Event Photo</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <div className="mt-3 relative h-48 rounded-xl overflow-hidden border">
                    <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                )}
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Upload className="h-4 w-4" /> JPG or PNG up to 5MB.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange("isFeatured", checked === true)}
                />
                <Label htmlFor="isFeatured" className="text-sm text-muted-foreground">
                  Show this highlight in the featured section on the public competitions page.
                </Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Saving..." : "Save Highlight"}
                </Button>
                <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/admin/dashboard/past-competitions">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
