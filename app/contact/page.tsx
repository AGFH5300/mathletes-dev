// app/contact/page.tsx
"use client"

import type React from "react"
import { useState } from "react"
import { MathBackground } from "@/components/math-background"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ContactPage() {
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await res.json()

      if (result?.success) {
        setIsSuccess(true)
        setFormData({ name: "", email: "", subject: "", message: "" })

        toast({
          title: "Message sent",
          description: "Thanks! We’ll get back to you shortly.",
          duration: 3500,
        })
      } else {
        const msg = result?.message || "Failed to send message. Please try again."
        setError(msg)
        toast({
          title: "Couldn’t send message",
          description: msg,
          variant: "destructive",
          duration: 4500,
        })
      }
    } catch {
      const msg = "An error occurred. Please try again later."
      setError(msg)
      toast({
        title: "Something went wrong",
        description: msg,
        variant: "destructive",
        duration: 4500,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen relative pt-24 pb-16 px-4">
      {/* Fallback Toaster (you can remove if already in your root layout) */}
      <Toaster />

      <MathBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {"Have questions about Mathletes or upcoming competitions? We'd love to hear from you!"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-2 border-accent/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-accent" />
                  Contact Information
                </CardTitle>
                <CardDescription>Reach out to our Mathletes leadership team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="font-semibold text-foreground mb-1">Email Us</p>
                  <a href="mailto:diamathletes@gmail.com" className="text-primary hover:underline text-lg">
                    diamathletes@gmail.com
                  </a>
                </div>
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                  <p className="font-semibold text-foreground mb-2">Location</p>
                  <p className="text-muted-foreground">Dubai International Academy</p>
                  <p className="text-muted-foreground text-sm mt-1">Emirates Hills, Dubai, UAE</p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="font-semibold text-foreground mb-2">Follow Us</p>
                  <p className="text-muted-foreground text-sm">
                    {
                      "Stay updated with the latest math competitions, events, and club activities through our social media channels."
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>{"Fill out the form below and we'll get back to you soon"}</CardDescription>
            </CardHeader>

            <CardContent className="relative">
              {/* Subtle dim overlay while submitting */}
              {isSubmitting && (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-[1px]"
                  aria-hidden="true"
                >
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}

              {isSuccess ? (
                <div
                  className="relative rounded-xl border border-green-200 bg-green-50 p-6 text-green-900"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-green-100 p-1.5">
                      <CheckCircle className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Message sent successfully</h3>
                      <p className="text-sm/6 text-green-800">
                        Thanks for contacting us, we’ll get back to you soon.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Button
                      onClick={() => {
                        setIsSuccess(false)
                        setError("")
                      }}
                      variant="outline"
                      className="border-green-300"
                    >
                      Send another message
                    </Button>
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a href="mailto:diamathletes@gmail.com">Email us directly</a>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} action={undefined} className="space-y-4" aria-busy={isSubmitting}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {error && (
                    <div
                      className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800"
                      role="alert"
                      aria-live="assertive"
                    >
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full shadow-lg shadow-accent/20" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending…
                      </span>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
