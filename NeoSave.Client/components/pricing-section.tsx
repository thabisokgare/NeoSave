"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with basic financial tracking",
    features: [
      "Basic budget tracking",
      "Expense categorization",
      "Monthly reports",
      "Mobile app access",
      "Email support",
    ],
    buttonText: "Get Started Free",
    popular: false,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Advanced features for serious savers and investors",
    features: [
      "Everything in Free",
      "AI-powered insights",
      "Investment tracking",
      "Goal setting & monitoring",
      "Bank account sync",
      "Priority support",
      "Advanced analytics",
    ],
    buttonText: "Start Pro Trial",
    popular: true,
    gradient: "from-blue-600 to-indigo-600",
  },
  {
    name: "Elite",
    price: "$19.99",
    period: "per month",
    description: "Complete financial management for power users",
    features: [
      "Everything in Pro",
      "Personal financial advisor",
      "Tax optimization",
      "Portfolio rebalancing",
      "Multi-currency support",
      "API access",
      "White-label options",
      "24/7 phone support",
    ],
    buttonText: "Go Elite",
    popular: false,
    gradient: "from-purple-600 to-pink-600",
  },
]

export function PricingSection() {
  const handlePlanSelect = (planName: string) => {
    // Placeholder for future API integration
    console.log(`${planName} plan selected - integrate with C# backend`)
  }

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as your financial goals grow. All plans include our core features with no hidden
            fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative group hover:shadow-2xl transition-all duration-300 border-2 ${
                plan.popular
                  ? "border-blue-500 scale-105 bg-gradient-to-br from-blue-50 to-indigo-50"
                  : "border-gray-200 hover:border-gray-300 bg-white/70"
              } backdrop-blur-sm`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.gradient} hover:shadow-lg text-white`
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">All plans include a 30-day money-back guarantee. No questions asked.</p>
        </div>
      </div>
    </section>
  )
}
