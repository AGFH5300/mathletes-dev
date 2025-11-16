"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { MathBackground } from "@/components/math-background"
import { ArrowRight, Trophy, Users, BookOpen, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show logo first, then content
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen relative">
      <MathBackground />

      {/* Hero Section with Logo Animation */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="logo-animate mb-8 relative z-10">
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full blur-3xl" />
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Mathletes Logo"
                width={256}
                height={256}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div
          className={`text-center max-w-4xl transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            MATHLETES <span className="text-primary">@ DIA</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {
              "A student-led club that helps students go beyond their grade level in mathematics. We focus on solving complex problems, preparing for international math competitions, and strengthening logical thinking."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-accent/20"
            >
              <Link href="/competitions">
                Explore Competitions <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 bg-transparent border-2">
              <Link href="/about">Meet Our Team</Link>
            </Button>
          </div>
        </div>

        {/* Floating Math Symbols */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 text-6xl text-accent/50 float-animation font-bold">∑</div>
          <div className="absolute top-40 right-20 text-5xl text-secondary/50 float-animation animate-delay-200 font-bold">
            ∫
          </div>
          <div className="absolute bottom-32 left-20 text-7xl text-primary/40 float-animation animate-delay-300 font-bold">
            √
          </div>
          <div className="absolute bottom-20 right-32 text-5xl text-accent/50 float-animation animate-delay-100 font-bold">
            ∞
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">{"What We Offer"}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Trophy,
                title: "Competition Prep",
                description: "Prepare for international mathematics olympiads and competitions",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
              {
                icon: Users,
                title: "Collaborative Learning",
                description: "Work with peers to solve challenging problems together",
                color: "text-secondary",
                bgColor: "bg-secondary/10",
              },
              {
                icon: BookOpen,
                title: "Advanced Topics",
                description: "Explore mathematics beyond your grade level curriculum",
                color: "text-accent",
                bgColor: "bg-accent/10",
              },
              {
                icon: Target,
                title: "Build Confidence",
                description: "Develop confidence, teamwork, and a passion for mathematics",
                color: "text-primary",
                bgColor: "bg-primary/10",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 shadow-lg border-2 border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-lg ${item.bgColor} mb-4`}>
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-card-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground text-balance">
            {"Ready to Challenge Yourself?"}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {"Join Mathletes and discover your mathematical potential. Check out our upcoming competitions and events."}
          </p>
          <Button asChild size="lg" className="text-lg px-8 shadow-lg shadow-accent/30">
            <Link href="/competitions">
              View Competitions <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
