"use client"

import { Shield, Lock, Eye, Award } from "lucide-react"

const trustFeatures = [
  {
    icon: Shield,
    title: "Bank-Grade Encryption",
    description:
      "256-bit SSL encryption protects all your financial data with the same security standards used by major banks.",
  },
  {
    icon: Lock,
    title: "GDPR Compliant",
    description:
      "Fully compliant with GDPR and other international privacy regulations to protect your personal information.",
  },
  {
    icon: Eye,
    title: "We Never Sell Your Data",
    description:
      "Your financial information is never shared, sold, or used for advertising. Your privacy is our priority.",
  },
  {
    icon: Award,
    title: "Trusted by 100K+ Users",
    description: "Join thousands of users who trust NeoSave with their financial journey and data security.",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Graduate Student",
    content: "NeoSave helped me save $3,000 in my first year. The AI suggestions are spot-on!",
    rating: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Software Engineer",
    content: "Finally, an app that makes investing accessible. Opened my first investment account through NeoSave.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    role: "Retired Teacher",
    content: "The financial education modules are fantastic. Learning about money management at 65!",
    rating: 5,
  },
]

export default function TrustSecurity() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Trust & Security */}
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your security is our priority</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We use industry-leading security measures to protect your financial data and ensure your privacy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="animate-on-scroll text-center group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="animate-on-scroll">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">What our users say</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400 fill-current">
                      ⭐
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
