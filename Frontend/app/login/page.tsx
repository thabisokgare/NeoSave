"use client"

import { useState } from "react"
import { storage } from "@/utils/local-storage"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link";
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Wallet, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import axios from 'axios';

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
 const router = useRouter()
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088"
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true)

    try {
      // Prefer using the auth hook if it implements the login call
      if (typeof login === "function") {
        const hookResult = await login(data.email, data.password)
        // hook may return true, a token string, or an object { token }
        if (hookResult === true) {
          toast.success("Welcome back!")
          router.push("/dashboard")
          return
        }

        const maybeToken = typeof hookResult === "string" ? hookResult : hookResult?.token
        if (maybeToken) {
          try {
            if (typeof storage.set === "function") storage.set("JWT", maybeToken)
            else localStorage.setItem("JWT", maybeToken)
          } catch {
            localStorage.setItem("JWT", maybeToken)
          }
          toast.success("Welcome back!")
          router.push("/dashboard")
          return
        }
        // if hook didn't return a token, fallthrough to direct axios call
      }

      // Direct axios fallback
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }, { timeout: 10000 })

      const token = response.data?.token ?? response.data
      if (token) {
        try {
          if (typeof storage.set === "function") storage.set("JWT", token)
          else localStorage.setItem("JWT", token)
        } catch {
          localStorage.setItem("JWT", token)
        }
        toast.success("Welcome back!")
        router.push("/dashboard")
      } else {
        toast.error(response.data?.message ?? "Login failed. Please try again.")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data?.message ?? err.response.statusText)
      } else {
        toast.error("An unexpected error occurred. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full opacity-5"
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
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back to Home */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/">
            <Button variant="ghost" className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        <Card className="glass-effect border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
            </motion.div>
            <CardTitle className="text-3xl font-bold text-foreground">Welcome back</CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Sign in to continue your financial journey
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={`h-12 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {errors.email && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className={`h-12 pr-12 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <motion.p
                    className="text-sm text-red-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" {...register("rememberMe")} />
                  <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                    Remember me
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-primary hover:text-primary-foreground">
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Button
                  type="submit"
                  className="w-full h-12 bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  
                  {isLoading ? (
                    <div className="flex items-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Signing in...
                      <Link href="/dashboard" className="text-primary hover:text-primary-foreground">
                    
                      </Link>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:text-primary-foreground font-medium">
                  Sign up
                </Link>
              </p>
            </motion.div>
           
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

