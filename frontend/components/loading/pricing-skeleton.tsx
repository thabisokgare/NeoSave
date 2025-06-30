import { Skeleton } from "@/components/ui/skeleton"

export default function PricingSkeleton() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-10 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>

        {/* Pricing Cards Skeleton */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
              {/* Popular Badge Skeleton */}
              {index === 2 && (
                <div className="flex justify-center mb-4">
                  <Skeleton className="h-8 w-32 rounded-full" />
                </div>
              )}

              {/* Plan Header Skeleton */}
              <div className="text-center mb-8">
                <Skeleton className="h-8 w-20 mx-auto mb-2" />
                <div className="flex items-baseline justify-center mb-4">
                  <Skeleton className="h-12 w-24" />
                  <Skeleton className="h-4 w-16 ml-2" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>

              {/* Features List Skeleton */}
              <div className="space-y-4 mb-8">
                {[...Array(index === 2 ? 7 : index === 1 ? 6 : 5)].map((_, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <Skeleton className="w-5 h-5 rounded mr-3 mt-0.5 flex-shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>

              {/* CTA Button Skeleton */}
              <Skeleton className="h-12 w-full rounded" />
            </div>
          ))}
        </div>

        {/* Footer Text Skeleton */}
        <div className="text-center mt-12">
          <Skeleton className="h-4 w-80 mx-auto mb-4" />
          <Skeleton className="h-3 w-96 mx-auto" />
        </div>
      </div>
    </section>
  )
}
