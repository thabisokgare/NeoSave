"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowRight, BarChart3, Target, TrendingUp, Shield, Wallet, Menu, X, Star, CheckCircle } from "lucide-react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"

// Navbar Component
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-foreground">NeoSave</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {["Features", "Testimonials", "Pricing"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <Link href="/Survey">
              <motion.a
                className="text-muted-foreground hover:text-foreground transition-colors relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                Financial Survey
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground rounded-full"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Login
                </Button>
              </motion.div>
            </Link>
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl">Get Started</Button>
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 glass-effect rounded-2xl p-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {["Features", "Testimonials", "Pricing"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <Link href="/Survey">
                  <a
                    className="text-muted-foreground hover:text-foreground transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Financial Survey
                  </a>
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-primary text-white">Get Started</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full opacity-10"
            style={{
              background: `linear-gradient(45deg, hsl(var(--primary)), transparent)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        style={{ y }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Badge className="mb-4 bg-primary text-white px-6 py-2 text-sm font-medium">
            ✨ AI-Powered Financial Intelligence
          </Badge>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-foreground">Master Your</span>
          <br />
          <span className="text-foreground">Financial Future</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Transform your relationship with money through intelligent budgeting, goal tracking, and AI-powered insights
          that adapt to your lifestyle.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="/register">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl group-hover:shadow-primary-500/25"
              >
                Start Your Journey
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          </Link>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-2 hover:bg-muted/50 bg-transparent"
            >
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { number: "50K+", label: "Active Users" },
            { number: "$2M+", label: "Money Saved" },
            { number: "4.9★", label: "User Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-foreground">{stat.number}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Smart Budgeting",
      description: "AI-powered budget recommendations that adapt to your spending patterns and financial goals.",
      color: "from-primary-500 to-primary-600",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      description: "Visual progress tracking with milestone celebrations and personalized saving strategies.",
      color: "from-secondary-500 to-secondary-600",
    },
    {
      icon: TrendingUp,
      title: "Investment Insights",
      description: "Real-time portfolio analysis with risk assessment and growth opportunities.",
      color: "from-accent-500 to-accent-600",
    },
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Enterprise-grade encryption with biometric authentication and fraud protection.",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section id="features" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-primary text-white">Features</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything you need to
            <span className="text-foreground"> succeed financially</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you make informed decisions, track progress, and achieve your
            financial dreams.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full glass-effect hover:shadow-2xl transition-all duration-300 border-0">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Designer",
      content:
        "NeoSave transformed how I think about money. I've saved $12,000 in just 8 months using their AI recommendations!",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Software Engineer",
      content:
        "The goal tracking feature is incredible. I finally bought my dream car thanks to NeoSave's structured approach.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Marketing Manager",
      content: "Best financial app I've ever used. The insights are spot-on and the interface is beautifully designed.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-primary text-white">Testimonials</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by
            <span className="text-foreground"> thousands</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our community of successful savers and investors who have transformed their financial lives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass-effect hover:shadow-2xl transition-all duration-300 border-0">
                <CardContent className="pt-8">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Pricing Section
function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started with basic budgeting",
      features: [
        "Basic budget tracking",
        "3 savings goals",
        "Transaction categorization",
        "Mobile app access",
        "Email support",
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      name: "Professional",
      price: "R90",
      period: "/month",
      description: "Advanced features for serious financial planning",
      features: [
        "Everything in Starter",
        "Unlimited savings goals",
        "AI-powered insights",
        "Investment tracking",
        "Priority support",
        "Advanced analytics",
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      price: "R190",
      period: "/month",
      description: "Complete solution for financial professionals",
      features: [
        "Everything in Professional",
        "Multi-account management",
        "Custom reporting",
        "API access",
        "Dedicated support",
        "White-label options",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ]

  return (
    <section id="pricing" className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-primary text-white">Pricing</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple,
            <span className="text-foreground"> transparent pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your financial goals. All plans include our core features with no hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: plan.popular ? 1.05 : 1.02 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Badge className="bg-primary text-white px-6 py-2 font-semibold">Most Popular</Badge>
                </motion.div>
              )}

              <Card
                className={`h-full glass-effect hover:shadow-2xl transition-all duration-300 border-0 ${
                  plan.popular ? "ring-2 ring-primary/50 scale-105" : ""
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground mb-6">{plan.description}</CardDescription>
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground text-lg">{plan.period}</span>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      className={`w-full py-3 font-semibold ${
                        plan.popular
                          ? "bg-primary text-primary-foreground shadow-lg hover:shadow-xl"
                          : "bg-muted hover:bg-muted/80 text-foreground"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-24 px-4 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to transform your
            <br />
            financial future?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join over 50,000 users who have already started their journey to financial freedom with NeoSave.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary px-8 py-4 text-lg font-semibold shadow-2xl"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg font-semibold bg-transparent"
              >
                Schedule Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security", "API", "Integrations"],
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Press", "Partners"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Community", "Guides", "Webinars", "Status"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Compliance", "Cookies"],
    },
  ]

  return (
    <footer className="bg-primary text-primary-foreground py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          <div className="md:col-span-1">
            <motion.div className="flex items-center space-x-3 mb-6" whileHover={{ scale: 1.02 }}>
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Wallet className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold">NeoSave</span>
            </motion.div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Empowering your financial future with intelligent money management tools and AI-powered insights.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {["twitter", "linkedin", "github"].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary-foreground transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-5 h-5 bg-muted-foreground rounded" />
                </motion.a>
              ))}
            </div>
          </div>

          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="text-muted-foreground hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground mb-4 md:mb-0">© 2024 NeoSave. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

// Main Landing Page Component
export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <motion.p
            className="mt-6 text-muted-foreground text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Loading your financial future...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  )
}
