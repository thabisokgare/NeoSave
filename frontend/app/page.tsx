"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import PageLoader from "@/components/loading/page-loader"
import PageTransition from "@/components/page-transition"
import NavbarSkeleton from "@/components/loading/navbar-skeleton"
import HeroSkeleton from "@/components/loading/hero-skeleton"
import FeaturesSkeleton from "@/components/loading/features-skeleton"
import PricingSkeleton from "@/components/loading/pricing-skeleton"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Pricing from "@/components/pricing"
import TrustSecurity from "@/components/trust-security"
import Footer from "@/components/footer"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showSkeletons, setShowSkeletons] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)

      // Show skeletons briefly before showing actual content
      setTimeout(() => {
        setShowSkeletons(false)
      }, 800)
    }, 2000)

    return () => clearTimeout(loadingTimer)
  }, [])

  useEffect(() => {
    if (!isLoading && !showSkeletons) {
      // Initialize GSAP animations after content loads
      gsap.fromTo(
        ".animate-fade-in",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        },
      )

      // Scroll-triggered animations
      gsap.utils.toArray(".animate-on-scroll").forEach((element: any) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })

      // Page reveal animation
      gsap.fromTo(
        ".page-reveal",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power4.inOut",
        },
      )
    }
  }, [isLoading, showSkeletons])

  return (
    <>
      <PageLoader isLoading={isLoading} onComplete={() => setIsLoading(false)} />

      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Floating navbar - only show skeleton during loading */}
        {showSkeletons && <NavbarSkeleton />}

        {/* Always render the actual navbar (it handles its own visibility) */}
        {!showSkeletons && <Navbar />}

        <div className="page-reveal">
          {showSkeletons ? (
            // Skeleton Loading State
            <>
              <HeroSkeleton />
              <FeaturesSkeleton />
              <PricingSkeleton />
            </>
          ) : (
            // Actual Content with Transitions
            <PageTransition>
              <div className="section-animate">
                <Hero />
              </div>
              <div id="features" className="section-animate">
                <Features />
              </div>
              <div id="pricing" className="section-animate">
                <Pricing />
              </div>
              <div id="security" className="section-animate">
                <TrustSecurity />
              </div>
              <div className="section-animate">
                <Footer />
              </div>
            </PageTransition>
          )}
        </div>
      </main>
    </>
  )
}
