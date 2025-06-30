"use client"

import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with budgeting",
    features: [
      "Basic budgeting tools",
      "1 savings goal",
      "Access to financial education",
      "Expense categorization",
      "Monthly spending reports",
    ],
    cta: "Get Started",
    popular: false,
    gradient: "from-gray-500 to-gray-600",
  },
  {
    name: "Plus",
    price: "$9.99",
    period: "per month",
    description: "Enhanced features for serious savers",
    features: [
      "Everything in Free",
      "AI-powered insights",
      "Connect up to 3 bank cards",
      "Basic investing dashboard",
      "Goal tracking & notifications",
      "Priority customer support",
    ],
    cta: "Choose Plan",
    popular: false,
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "per month",
    description: "Complete financial management solution",
    features: [
      "Everything in Plus",
      "Open & manage investment accounts",
      "Priority AI coaching",
      "Advanced financial reports",
      "Data export capabilities",
      "Unlimited bank connections",
      "Tax optimization suggestions",
    ],
    cta: "Choose Plan",
    popular: true,
    gradient: "from-green-500 to-emerald-600",
  },
]

export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Choose your financial journey</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Start free and upgrade as your financial goals grow. All plans include bank-grade security and 24/7 support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`animate-on-scroll relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                plan.popular ? "ring-2 ring-green-500 scale-105" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                      : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 animate-on-scroll">
          <p className="text-gray-600 dark:text-gray-300 mb-4">All plans include a 30-day money-back guarantee</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No hidden fees • Cancel anytime • Upgrade or downgrade as needed
          </p>
        </div>
      </div>
    </section>
  )
}
