"use client"

import { useEffect, useState } from "react"
import { MathBackground } from "@/components/math-background"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Trophy, ExternalLink, Clock, Users, FileText, DollarSign } from "lucide-react"

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
}

function CompetitionCard({ competition }: { competition: Competition }) {
  const difficultyColors = {
    Beginner: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    "Beginner to Intermediate": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    Intermediate: "bg-accent/20 text-accent-foreground border-accent/30",
    Advanced: "bg-primary/20 text-primary border-primary/30",
    Expert: "bg-destructive/20 text-destructive dark:text-destructive border-destructive/30",
  }

  // Parse details and resources (assuming they're semicolon-separated)
  const detailsList = competition.details
    ? competition.details
        .split(";")
        .map((d) => d.trim())
        .filter(Boolean)
    : []
  const resourcesList = competition.resources
    ? competition.resources
        .split(";")
        .map((r) => r.trim())
        .filter(Boolean)
    : []

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border-2 border-primary/10">
      <CardHeader className="bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-2xl text-card-foreground flex-1">{competition.name}</CardTitle>
          <Trophy className="h-6 w-6 text-primary flex-shrink-0" />
        </div>
        <CardDescription className="text-base">{competition.description}</CardDescription>
        <div className="flex gap-2 flex-wrap mt-3">
          <Badge className={difficultyColors[competition.difficulty as keyof typeof difficultyColors] || ""}>
            {competition.difficulty}
          </Badge>
          <Badge variant="outline" className="border-primary/30">
            {competition.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6 flex-1 flex flex-col">
        {/* Key Information */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Date:</span>
            <span className="text-muted-foreground">{competition.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">Deadline:</span>
            <span className="text-muted-foreground">{competition.deadline}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="font-medium">Location:</span>
            <span className="text-muted-foreground">{competition.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-medium">Eligibility:</span>
            <span className="text-muted-foreground">{competition.eligibility}</span>
          </div>
          {competition.cost && (
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="font-medium">Cost:</span>
              <span className="text-muted-foreground">{competition.cost}</span>
            </div>
          )}
        </div>

        {/* Competition Details */}
        {detailsList.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-card-foreground mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Competition Details
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {detailsList.map((detail, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resources */}
        {resourcesList.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-card-foreground mb-2">Preparation Resources</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {resourcesList.map((resource, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-secondary mt-1">✓</span>
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto">
          <Button asChild className="w-full gap-2">
            <a href={competition.website} target="_blank" rel="noopener noreferrer">
              Visit Official Website
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CompetitionsPage() {
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCompetitions()
  }, [])

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

  return (
    <div className="min-h-screen relative pt-24 pb-16">
      <MathBackground />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            {"Mathematics "}
            <span className="text-primary">Competitions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {
              "Explore upcoming mathematics competitions and find all the information you need to participate. Challenge yourself and showcase your mathematical skills!"
            }
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-bold text-foreground mb-2">{"How to Register"}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {
              "Interested in participating? Visit the official website of each competition for registration details. For school-based registrations, please contact the Mathletes committee or speak with your math teacher. We offer preparation sessions for all major competitions!"
            }
          </p>
        </div>

        {/* Competitions Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading competitions...</p>
          </div>
        ) : competitions.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border">
            <p className="text-muted-foreground">No competitions available at the moment. Check back soon!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {competitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        )}

        {/* Additional Resources Section */}
        <div className="mt-16 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">{"Need Help Preparing?"}</h2>
          <p className="text-lg text-muted-foreground text-center mb-6 max-w-2xl mx-auto">
            {
              "Join our weekly practice sessions, access past papers, and get guidance from experienced mentors. We are here to help you succeed!"
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="mailto:dia190393@diaestudents.com">Contact Us</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/about">Meet Our Team</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
