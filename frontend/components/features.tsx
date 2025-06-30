"use client"

import { TrendingUp, CreditCard, Brain, Building2, BarChart3, Lightbulb } from "lucide-react"

const features = [
  {
    icon: TrendingUp,
    title: "AI-Powered Budgeting Assistant",
    description: "Smart algorithms analyze your spending patterns and create personalized budgets that actually work.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: CreditCard,
    title: "Bank Transaction Tracking",
    description: "Automatically categorize and track all your transactions across multiple bank accounts in real-time.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Brain,
    title: "Personalized Financial Education",
    description: "Gamified learning modules tailored to your financial goals and knowledge level.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Building2,
    title: "Open Investment Account In-App",
    description: "Compare and open investment accounts directly within the app with guided account selection.",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    description: "Beautiful, intuitive dashboard showing your saving and spending patterns with actionable insights.",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: Lightbulb,
    title: "Investment Suggestions",
    description: "AI-driven investment recommendations based on your risk profile, goals, and market conditions.",
    color: "from-yellow-500 to-orange-600",
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Everything you need to master your finances
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From AI-powered budgeting to investment management, NeoSave provides all the tools you need for financial
            success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-on-scroll group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
