"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThreeDDashboard } from "@/components/three-d-dashboard"

export function DashboardPreview() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience the
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Future Dashboard
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get a glimpse of your personalized financial command center with real-time insights and beautiful
            visualizations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Dashboard Preview */}
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-blue-100 shadow-2xl">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
                  <div className="text-gray-600">Loading Dashboard Preview...</div>
                </div>
              }
            >
              <ThreeDDashboard />
            </Suspense>
          </div>

          {/* Dashboard Features */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Real-time Balance Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Monitor all your accounts in one place with live updates and intelligent categorization.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  Interactive Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Beautiful charts and graphs that help you understand your spending patterns and trends.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get personalized recommendations and alerts to optimize your financial health.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                  Goal Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track your progress toward financial goals with intuitive progress indicators.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
