"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ThreeDCoin } from "@/components/three-d-coin"

export function HeroSection() {
  const handleGetStarted = () => {
    // Placeholder for future API integration
    console.log("Get Started clicked - integrate with C# backend")
  }

  const handleLearnMore = () => {
    // Placeholder for future navigation
    console.log("Learn More clicked")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100" />}>
          <ThreeDCoin />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NeoSave
            </span>
            <br />
            <span className="text-gray-800">Your AI-Driven</span>
            <br />
            <span className="text-gray-800">Financial Ally</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your financial future with intelligent budgeting, AI-powered savings plans, and personalized
            investment insights—all in one beautiful, intuitive platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Your Journey
            </Button>
            <Button
              onClick={handleLearnMore}
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 px-8 py-4 text-lg transition-all duration-300 bg-white/80"
            >
              Learn More
            </Button>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            <p>Trusted by 10,000+ users worldwide</p>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10 pointer-events-none" />
    </section>
  )
}
