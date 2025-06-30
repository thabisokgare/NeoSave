import { Skeleton } from "@/components/ui/skeleton"

export default function HeroSkeleton() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="relative container mx-auto px-4 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Content Skeleton */}
          <div className="text-center lg:text-left">
            <div className="space-y-4 mb-6">
              <Skeleton className="h-12 w-full max-w-2xl mx-auto lg:mx-0" />
              <Skeleton className="h-12 w-4/5 max-w-xl mx-auto lg:mx-0" />
              <Skeleton className="h-12 w-3/5 max-w-lg mx-auto lg:mx-0" />
            </div>

            <Skeleton className="h-6 w-full max-w-2xl mx-auto lg:mx-0 mb-8" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Skeleton className="h-14 w-48" />
              <Skeleton className="h-14 w-40" />
            </div>
          </div>

          {/* Right Column - Dashboard Skeleton */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
              {/* Header Skeleton */}
              <div className="flex items-center space-x-3 mb-6">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>

              {/* Balance Card Skeleton */}
              <Skeleton className="h-20 w-full rounded-xl mb-6" />

              {/* Stats Skeleton */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Skeleton className="h-16 rounded-lg" />
                <Skeleton className="h-16 rounded-lg" />
              </div>

              {/* AI Suggestion Skeleton */}
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
