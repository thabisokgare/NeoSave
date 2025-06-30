"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

interface PageTransitionProps {
  children: React.ReactNode
  isLoading?: boolean
}

export default function PageTransition({ children, isLoading = false }: PageTransitionProps) {
  const [isVisible, setIsVisible] = useState(!isLoading)

  useEffect(() => {
    if (!isLoading) {
      // Entrance animation
      const tl = gsap.timeline({
        onStart: () => setIsVisible(true),
      })

      tl.fromTo(
        ".page-content",
        {
          opacity: 0,
          y: 20,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
      )

      // Stagger animation for sections
      tl.fromTo(
        ".section-animate",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      )
    }
  }, [isLoading])

  if (!isVisible) return null

  return <div className="page-content">{children}</div>
}
