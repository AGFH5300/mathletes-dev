import Link from "next/link"
import Image from "next/image"
import { Mail, Calendar, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-primary/5 to-secondary/5 border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" width="32" height="32" alt="Mathletes Logo" className="object-contain drop-shadow-4xl"/>
              <span className="text-xl font-bold text-foreground">DIAMathletes</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {"Building confidence, teamwork, and a passion for mathematics through problem-solving and competitions."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/competitions" className="text-muted-foreground hover:text-primary transition-colors">
                  Competitions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:diamathletes@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  diamathletes@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground pt-2">
                <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{"Weekly meetings & practice sessions"}</span>
              </li>
            </ul>
          </div>

          {/* Social & Info */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a href="https://www.instagram.com/mathletesdia" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{"Dubai International Academy"}</p>
            <p className="text-sm text-muted-foreground">{"Student Mathematics Club"}</p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} DIAMathletes. All rights reserved.</p>
          <p className="text-xs sm:text-sm">
            Made by <a href="https://anshgupta.site" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ansh Gupta</a>
          </p>
          <p className="mt-2 text-xs">{"Empowering students through mathematical excellence"}</p>
        </div>
      </div>
    </footer>
  )
}
