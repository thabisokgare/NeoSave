"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Wallet, Mail, Lock, Eye, EyeOff, TrendingUp, PiggyBank, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    if (isSignUp) {
      router.push("/survey")
    } else {
      router.push("/dashboard")
    }
  }

  const handleGoogleAuth = () => {
    // Simulate Google authentication
    if (isSignUp) {
      router.push("/survey")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-brand-primary to-indigo-700 p-12">
          <div className="max-w-md text-center text-white">
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <PiggyBank className="h-8 w-8 text-white" />
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Smart Financial Management</h2>
            <p className="text-indigo-100 leading-relaxed">
              Join thousands who've transformed their financial lives with AI-powered budgeting, smart savings goals,
              and personalized investment guidance.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">100K+</div>
                <div className="text-indigo-200">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$5M+</div>
                <div className="text-indigo-200">Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-indigo-200">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-brand-text">NeoSave</span>
              </div>
              <h1 className="text-2xl font-bold text-brand-text mb-2">
                {isSignUp ? "Create your account" : "Welcome back"}
              </h1>
              <p className="text-brand-text-muted">
                {isSignUp ? "Start your journey to financial freedom" : "Sign in to continue to your dashboard"}
              </p>
            </div>

            <Card className="bg-white border-0 shadow-medium rounded-2xl">
              <CardHeader className="space-y-1 pb-6">
                <CardTitle className="text-xl text-center text-brand-text">
                  {isSignUp ? "Sign up" : "Sign in"}
                </CardTitle>
                <CardDescription className="text-center text-brand-text-muted">
                  {isSignUp
                    ? "Enter your details to create your account"
                    : "Enter your credentials to access your account"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Google Sign In */}
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-2 border-gray-200 hover:bg-gray-50 py-6 bg-white"
                  onClick={handleGoogleAuth}
                >
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-brand-text-muted">Or continue with email</span>
                  </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-brand-text font-medium">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-brand-text-muted" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 rounded-xl border-2 border-gray-200 focus:border-brand-primary py-6 text-brand-text"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-brand-text font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-brand-text-muted" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 rounded-xl border-2 border-gray-200 focus:border-brand-primary py-6 text-brand-text"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-brand-text font-medium">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-brand-text-muted" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10 rounded-xl border-2 border-gray-200 focus:border-brand-primary py-6 text-brand-text"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full gradient-primary text-white rounded-xl py-6 text-lg font-semibold shadow-soft hover:shadow-medium transition-all"
                  >
                    {isSignUp ? "Create Account" : "Sign In"}
                  </Button>
                </form>

                {!isSignUp && (
                  <div className="text-center">
                    <Link href="#" className="text-sm text-brand-primary hover:text-indigo-700 font-medium">
                      Forgot your password?
                    </Link>
                  </div>
                )}

                <div className="text-center text-sm text-brand-text-muted">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-brand-primary hover:text-indigo-700 font-medium"
                  >
                    {isSignUp ? "Sign in" : "Sign up"}
                  </button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center text-xs text-brand-text-muted">
              By continuing, you agree to our{" "}
              <Link href="#" className="text-brand-primary hover:text-indigo-700">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-brand-primary hover:text-indigo-700">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
