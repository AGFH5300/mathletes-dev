import { MathBackground } from "@/components/math-background"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const committeeMembers = {
  presidents: [
    {
      name: "Dowon Lee",
      role: "President",
      image: "/members/dowon-lee.png",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Keshav Anand",
      role: "President",
      image: "/members/keshav-anand.png",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Yuvraj Bharadia",
      role: "President",
      image: "/members/yuvraj-bharadia.png",
      linkedin: "https://www.linkedin.com/in/yuvraj-bharadia-6666b7255/",
    },
  ],
  vicePresidents: [
    {
      name: "Ajay Lahoti",
      role: "Vice President",
      image: "/members/ajay-lahoti.png",
      linkedin: "https://www.linkedin.com/in/ajay-lahoti-372798344/",
    },
    {
      name: "Gavin Joseph Galinato",
      role: "Vice President",
      image: "/members/gavin-galinato.png",
      linkedin: "https://linkedin.com/",
    },
    {
      name: "Jash Jain",
      role: "Vice President",
      image: "/members/jash-jain.png",
      linkedin: "https://www.linkedin.com/in/jashjain1/",
    },
  ],
  events: [
    {
      name: "Garvita Jain",
      role: "Head of Events",
      image: "/members/garvita-jain.png",
      linkedin: "https://www.linkedin.com/in/garvita-jain-497307317/",
    },
  ],
  media: [
    {
      name: "Zayan Khan",
      role: "Head of Media",
      image: "/members/zayan-khan.png",
      linkedin: "https://www.linkedin.com/in/zayan-khan-054770321/",
    },
    {
      name: "Ananya Iyer",
      role: "Deputy Head of Media",
      image: "/members/ananya-iyer.png",
      linkedin: "https://www.linkedin.com/in/ananya-iyer-7b5b5532b/",
    },
  ],
  technology: [
    {
      name: "Ansh Gupta",
      role: "Head of Technology",
      image: "/members/ansh-gupta.jpg",
      linkedin: "https://linkedin.com/in/anshvg",
    },
  ],
  outreach: [
    {
      name: "Esabella Sodhi",
      role: "Director of Outreach",
      image: "/members/esabella-sodhi.png",
      linkedin: "https://www.linkedin.com/in/esabella-sodhi-1a808331a/",
    },
  ],
}

function MemberCard({ member }: { member: (typeof committeeMembers.presidents)[0] }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card border-2 border-primary/10">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-lg" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30">
            <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-card-foreground mb-1">{member.name}</h3>
        <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
        {member.linkedin && (
          <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen relative pt-24 pb-16">
      <MathBackground />

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            {"Meet Our "}
            <span className="text-primary">Core Committee</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {
              "Our dedicated team of student leaders working together to build confidence, teamwork, and a passion for mathematics."
            }
          </p>
        </div>

        {/* Presidents */}
        <section className="mb-16">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8">
            <h2 className="text-2xl font-bold text-primary">Presidents</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {committeeMembers.presidents.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* Vice Presidents */}
        <section className="mb-16">
          <div className="inline-block bg-secondary/10 border border-secondary/30 rounded-full px-6 py-2 mb-8">
            <h2 className="text-2xl font-bold text-secondary">Vice Presidents</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {committeeMembers.vicePresidents.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* Events Team */}
        <section className="mb-16">
          <div className="inline-block bg-accent/10 border border-accent/30 rounded-full px-6 py-2 mb-8">
            <h2 className="text-2xl font-bold text-accent-foreground">Events</h2>
          </div>
          <div className="grid md:grid-cols-1 gap-8 max-w-2xl">
            {committeeMembers.events.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* Media Team */}
        <section className="mb-16">
          <div className="inline-block bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8">
            <h2 className="text-2xl font-bold text-primary">Media</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl">
            {committeeMembers.media.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* Technology (Ansh) */}
        <section className="mb-16">
          <div className="inline-block bg-secondary/10 border border-secondary/30 rounded-full px-6 py-2 mb-8">
            <h2 className="text-2xl font-bold text-secondary">Technology</h2>
          </div>
          <div className="grid md:grid-cols-1 gap-8 max-w-2xl">
            {committeeMembers.technology.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* Outreach (Esabella) */}
        <section className="mb-16">
          <div className="inline-block bg-accent/10 border border-accent/30 rounded-full px-6 py-2 mb-8">
            <h2 className="text-2xl font-bold text-accent-foreground">Outreach</h2>
          </div>
          <div className="grid md:grid-cols-1 gap-8 max-w-2xl">
            {committeeMembers.outreach.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-20 bg-primary/5 rounded-2xl p-12 border border-primary/10">
          <h2 className="text-3xl font-bold text-foreground mb-4">{"Interested in Joining?"}</h2>
          <p className="text-lg text-muted-foreground mb-6">
            {"Check out our upcoming competitions and events to get involved!"}
          </p>
          <Button asChild size="lg">
            <Link href="/competitions">View Competitions</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
