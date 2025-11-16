"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean | null>(null)

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/competitions", label: "Competitions" },
    { href: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    let isMounted = true

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", { credentials: "include" })
        if (!isMounted) return
        setIsAdminAuthenticated(response.ok)
      } catch {
        if (!isMounted) return
        setIsAdminAuthenticated(false)
      }
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  }, [pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 group-hover:scale-110 transition-transform">
              <Image src="/logo.png" alt="Mathletes Logo" width={40} height={40} className="object-contain" />
            </div>
            <span className="text-xl font-bold text-foreground">MATHLETES</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-primary ${
                  pathname === link.href ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdminAuthenticated !== null && (
              <Button asChild variant="outline" size="sm" className="gap-2 bg-transparent">
                <Link href={isAdminAuthenticated ? "/admin/dashboard" : "/admin/login"}>
                  {isAdminAuthenticated ? (
                    <LayoutDashboard className="h-4 w-4" />
                  ) : (
                    <LogIn className="h-4 w-4" />
                  )}
                  {isAdminAuthenticated ? "Dashboard" : "Admin"}
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  pathname === link.href ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAdminAuthenticated !== null && (
              <Link
                href={isAdminAuthenticated ? "/admin/dashboard" : "/admin/login"}
                className="block px-4 py-2 rounded-lg font-medium text-foreground hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                {isAdminAuthenticated ? "Admin Dashboard" : "Admin Login"}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
