"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { Wallet } from "lucide-react"

interface PageLoaderProps {
  isLoading: boolean
  onComplete?: () => void
}

export default function PageLoader({ isLoading, onComplete }: PageLoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isLoading) {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            onComplete?.()
          }, 300)
        },
      })

      // Animate progress bar
      tl.to(
        {},
        {
          duration: 2,
          ease: "power2.out",
          onUpdate: function () {
            setProgress(Math.round(this.progress() * 100))
          },
        },
      )

      // Animate loader exit
      tl.to(".page-loader", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      })
    }
  }, [isLoading, onComplete])

  if (!isLoading) return null

  return (
    <div className="page-loader fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">NeoSave</h2>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading your financial future... {progress}%</p>
        </div>
      </div>
    </div>
  )
}
