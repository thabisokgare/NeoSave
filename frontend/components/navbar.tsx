"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Wallet } from "lucide-react"
import { useTheme } from "next-themes"
import { gsap } from "gsap"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)

    // Scroll effect for floating navbar
    const handleScroll = () => {
      const scrollY = window.scrollY
      const shouldShow = scrollY > 100

      if (shouldShow && !isVisible) {
        setIsVisible(true)
        // Animate navbar entrance
        gsap.fromTo(
          ".floating-navbar",
          {
            y: -100,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
        )
      } else if (!shouldShow && isVisible) {
        setIsVisible(false)
        // Animate navbar exit
        gsap.to(".floating-navbar", {
          y: -100,
          opacity: 0,
          scale: 0.95,
          duration: 0.4,
          ease: "power2.in",
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isVisible])

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Security", href: "#security" },
    { name: "About", href: "#about" },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Floating Navbar */}
      <nav
        className={`floating-navbar fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
          isVisible ? "pointer-events-auto" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl px-6 py-3">
          <div className="flex items-center justify-between min-w-[320px] max-w-4xl">
            {/* Logo */}
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Wallet className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                NeoSave
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-item text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 relative group px-3 py-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-600 group-hover:w-4 transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 p-0 hover:scale-110 transition-transform duration-300 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: "3s" }} />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-105 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 transition-all duration-300 px-4 py-2 text-sm rounded-lg shadow-lg hover:shadow-xl"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Mobile Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 p-0 hover:scale-110 transition-transform duration-300 rounded-full"
              >
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="w-8 h-8 p-0 hover:scale-110 transition-transform duration-300 rounded-full"
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isOpen ? "max-h-80 mt-4 pt-4" : "max-h-0"
            } border-t border-gray-200/50 dark:border-gray-700/50`}
          >
            <div className="flex flex-col space-y-3">
              {navigation.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:translate-x-2 px-3 py-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: `translateY(${isOpen ? 0 : -10}px)`,
                    transitionDelay: `${index * 0.1}s`,
                  }}
                >
                  {item.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-sm text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:translate-x-2 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="justify-start bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105 transition-all duration-300 px-3 py-2 text-sm rounded-lg shadow-lg"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
