"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Wallet, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/auth", label: "Login" },
    { href: "/dashboard", label: "Dashboard" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-brand-text">NeoSave</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-brand-primary ${
                  pathname === item.href ? "text-brand-primary" : "text-brand-text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button className="gradient-primary text-white rounded-xl px-6 shadow-soft hover:shadow-medium transition-all">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-white/95 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 text-sm font-medium transition-colors hover:text-brand-primary ${
                  pathname === item.href ? "text-brand-primary bg-indigo-50 rounded-lg" : "text-brand-text-muted"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button className="w-full gradient-primary text-white rounded-xl shadow-soft">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
