"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, PiggyBank, TrendingUp, Shield, Smartphone, Users, Wallet } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "AI Budgeting Assistant",
    description:
      "Smart algorithms analyze your spending patterns and create personalized budgets that adapt to your lifestyle.",
    gradient: "from-brand-primary to-indigo-600",
  },
  {
    icon: PiggyBank,
    title: "Smart Savings Goals",
    description: "Set meaningful targets and let AI find micro-opportunities to boost your savings automatically.",
    gradient: "from-brand-accent to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Investment Tips",
    description: "Get personalized investment recommendations based on your risk profile and financial goals.",
    gradient: "from-brand-highlight to-green-600",
  },
]

const stats = [
  { value: "100K+", label: "Active Users" },
  { value: "$5M+", label: "Money Saved" },
  { value: "4.9★", label: "App Rating" },
  { value: "98%", label: "User Satisfaction" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 opacity-60" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-brand-primary">
              <Brain className="mr-2 h-4 w-4" />
              AI-Powered Financial Intelligence
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-brand-text">
              Take Control of Your <span className="text-gradient">Money with AI</span>
            </h1>
            <p className="mb-8 text-lg text-brand-text-muted sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
              Transform your financial future with intelligent budgeting, automated savings, and personalized investment
              guidance. Join thousands who've already taken control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="gradient-primary text-white rounded-xl px-8 py-4 text-lg font-semibold shadow-medium hover:shadow-large transition-all transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 py-4 text-lg border-2 border-gray-300 hover:bg-gray-50 transition-all bg-transparent"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-brand-primary mb-2">{stat.value}</div>
                <div className="text-brand-text-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-text mb-4">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-lg text-brand-text-muted max-w-2xl mx-auto leading-relaxed">
              Our AI-powered platform combines cutting-edge technology with proven financial principles to help you
              build lasting wealth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white border-0 shadow-soft hover:shadow-medium transition-all duration-300 group rounded-2xl"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-soft`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-brand-text group-hover:text-brand-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-brand-text-muted leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-text mb-4">Trusted by Thousands</h2>
            <p className="text-lg text-brand-text-muted max-w-2xl mx-auto">
              Your financial data is protected with bank-level security and encryption.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-highlight/10 mx-auto mb-4">
                <Shield className="h-6 w-6 text-brand-highlight" />
              </div>
              <h3 className="font-semibold text-brand-text mb-2">Bank-Level Security</h3>
              <p className="text-sm text-brand-text-muted">256-bit encryption protects your data</p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 mx-auto mb-4">
                <Smartphone className="h-6 w-6 text-brand-accent" />
              </div>
              <h3 className="font-semibold text-brand-text mb-2">Mobile-First Design</h3>
              <p className="text-sm text-brand-text-muted">Optimized for all devices</p>
            </div>
            <div className="text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 mx-auto mb-4">
                <Users className="h-6 w-6 text-brand-primary" />
              </div>
              <h3 className="font-semibold text-brand-text mb-2">24/7 Support</h3>
              <p className="text-sm text-brand-text-muted">Always here when you need us</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-brand-primary to-indigo-700 border-0 p-12 text-center max-w-4xl mx-auto rounded-2xl shadow-large">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Finances?</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who've already taken control of their financial future. Start your journey today
              with our free account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-white text-brand-primary hover:bg-gray-50 rounded-xl px-8 py-4 text-lg font-semibold shadow-soft hover:shadow-medium transition-all"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">NeoSave</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Empowering individuals to take control of their financial future through AI-powered insights and
                personalized guidance.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/auth" className="hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NeoSave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
