"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Wallet } from "lucide-react"

export default function Hero() {
  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(".hero-headline", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      .fromTo(".hero-subtext", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
      .fromTo(".hero-buttons", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
      .fromTo(
        ".hero-dashboard",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
        "-=0.5",
      )

    // Floating animation for dashboard
    gsap.to(".hero-dashboard", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 1.5,
    })
  }, [])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 dark:from-indigo-800 dark:via-indigo-900 dark:to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <h1 className="hero-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              AI-Driven Budgeting. <span className="text-cyan-300">Smarter Saving.</span>{" "}
              <span className="text-green-300">Invest with Confidence.</span>
            </h1>

            <p className="hero-subtext text-xl text-indigo-100 mb-8 max-w-2xl mx-auto lg:mx-0">
              NeoSave helps you take control of your money, build a custom budget, and start investing — all in one app.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg group transition-all duration-300 hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-indigo-600 font-semibold px-8 py-4 text-lg group transition-all duration-300 bg-transparent"
              >
                <Play className="mr-2 h-5 w-5" />
                Explore Pricing
              </Button>
            </div>
          </div>

          {/* Right Column - Dashboard Mockup */}
          <div className="hero-dashboard relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Welcome back!</h3>
                    <p className="text-sm text-gray-500">Your financial overview</p>
                  </div>
                </div>
              </div>

              {/* Balance Card */}
              <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl p-4 mb-6 text-white">
                <p className="text-sm opacity-90">Total Balance</p>
                <p className="text-2xl font-bold">$12,847.32</p>
                <p className="text-sm opacity-90">+$247 this month</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-600 font-medium">SAVED</p>
                  <p className="text-lg font-bold text-green-700">$2,340</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-600 font-medium">INVESTED</p>
                  <p className="text-lg font-bold text-blue-700">$5,200</p>
                </div>
              </div>

              {/* AI Suggestion */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Smart Suggestion</p>
                    <p className="text-xs text-gray-600 mt-1">
                      You can save $120 more this month by reducing dining out expenses.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-cyan-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-green-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
