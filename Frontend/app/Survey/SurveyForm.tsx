"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088/api"

export default function SurveyForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    hasSavingsGoal: "",
    savingsTarget: "",
    specificGoal: "",
    tracksExpenses: "",
    challenges: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/survey/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to submit survey")
      setSuccess(true)
      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle>Financial Goals Survey</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Do you have a monthly savings goal?</label>
            <div className="flex gap-4">
              <label><input type="radio" name="hasSavingsGoal" value="yes" checked={form.hasSavingsGoal === "yes"} onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="hasSavingsGoal" value="no" checked={form.hasSavingsGoal === "no"} onChange={handleChange} /> No</label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">What is your target monthly savings amount?</label>
            <Input name="savingsTarget" type="text" value={form.savingsTarget} onChange={handleChange} placeholder="e.g. 1000" />
          </div>
          <div>
            <label className="block font-medium mb-1">Are you saving for a specific goal? (e.g., car, house)</label>
            <Input name="specificGoal" type="text" value={form.specificGoal} onChange={handleChange} placeholder="e.g. Car, House, Vacation" />
          </div>
          <div>
            <label className="block font-medium mb-1">Do you currently track your expenses?</label>
            <div className="flex gap-4">
              <label><input type="radio" name="tracksExpenses" value="yes" checked={form.tracksExpenses === "yes"} onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="tracksExpenses" value="no" checked={form.tracksExpenses === "no"} onChange={handleChange} /> No</label>
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Any financial challenges you're facing?</label>
            <Input name="challenges" type="text" value={form.challenges} onChange={handleChange} placeholder="e.g. debt, overspending" />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">Survey submitted! Redirecting...</div>}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Submitting..." : "Submit Survey"}</Button>
        </form>
      </CardContent>
    </Card>
  )
} 