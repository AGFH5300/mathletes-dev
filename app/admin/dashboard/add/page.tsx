"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MathBackground } from "@/components/math-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddCompetitionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
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
  })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/competitions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/dashboard")
      } else {
        alert("Failed to add competition")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
            <CardTitle className="text-3xl">Add New Competition</CardTitle>
            <CardDescription>Fill in the competition details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="name">Competition Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g., British Mathematical Olympiad"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Brief description of the competition"
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
                      onChange={(e) => handleChange("date", e.target.value)}
                      placeholder="e.g., November 2025"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Registration Deadline *</Label>
                    <Input
                      id="deadline"
                      value={formData.deadline}
                      onChange={(e) => handleChange("deadline", e.target.value)}
                      placeholder="e.g., October 15, 2025"
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
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="e.g., Online or School Campus"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost (Optional)</Label>
                    <Input
                      id="cost"
                      value={formData.cost}
                      onChange={(e) => handleChange("cost", e.target.value)}
                      placeholder="e.g., Free or $50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eligibility">Eligibility *</Label>
                  <Input
                    id="eligibility"
                    value={formData.eligibility}
                    onChange={(e) => handleChange("eligibility", e.target.value)}
                    placeholder="e.g., Students aged 16-18 or Grades 9-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Official Website *</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleChange("website", e.target.value)}
                    placeholder="https://..."
                    required
                  />
                </div>
              </div>

              {/* Classification */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Classification</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Competition">Competition</SelectItem>
                        <SelectItem value="Olympiad">Olympiad</SelectItem>
                        <SelectItem value="Challenge">Challenge</SelectItem>
                        <SelectItem value="Contest">Contest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select value={formData.difficulty} onValueChange={(value) => handleChange("difficulty", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Beginner to Intermediate">Beginner to Intermediate</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="details">Competition Details</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => handleChange("details", e.target.value)}
                    placeholder="Enter details separated by semicolons, e.g., 75 minutes duration; Multiple choice format; 25 questions"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">Separate each point with a semicolon</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resources">Preparation Resources</Label>
                  <Textarea
                    id="resources"
                    value={formData.resources}
                    onChange={(e) => handleChange("resources", e.target.value)}
                    placeholder="Enter resources separated by semicolons, e.g., Practice papers available online; Weekly study sessions; Past papers in library"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">Separate each resource with a semicolon</p>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? "Adding..." : "Add Competition"}
                </Button>
                <Button type="button" variant="outline" asChild className="flex-1 bg-transparent">
                  <Link href="/admin/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
