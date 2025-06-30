import { Skeleton } from "@/components/ui/skeleton"
import { Wallet } from "lucide-react"

export default function NavbarSkeleton() {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl px-6 py-3">
        <div className="flex items-center justify-between min-w-[320px] max-w-4xl">
          {/* Logo Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center">
              <Wallet className="h-3.5 w-3.5 text-white" />
            </div>
            <Skeleton className="w-16 h-5 bg-gray-300 dark:bg-gray-600" />
          </div>

          {/* Desktop Navigation Skeleton */}
          <div className="hidden md:flex items-center space-x-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-12 h-4 bg-gray-300 dark:bg-gray-600 rounded-lg" />
            ))}
          </div>

          {/* Desktop Actions Skeleton */}
          <div className="hidden md:flex items-center space-x-3">
            <Skeleton className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
            <Skeleton className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-lg" />
            <Skeleton className="w-20 h-8 rounded-lg bg-gray-300 dark:bg-gray-600" />
          </div>

          {/* Mobile Actions Skeleton */}
          <div className="md:hidden flex items-center space-x-2">
            <Skeleton className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
            <Skeleton className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  )
}
