"use client"

import { useRouter } from "next/navigation"
import SurveyForm from "./SurveyForm"

export default function SurveyPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <SurveyForm onSuccess={() => router.push("/dashboard")} />
    </div>
  )
} 