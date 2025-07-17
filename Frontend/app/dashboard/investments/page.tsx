"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Lock } from "lucide-react"
import { useEffect, useState } from "react"
import { useApiData } from "@/hooks/useApiData"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088/api"

export default function InvestmentsPage() {
  const { data: investments, loading, error } = useApiData<any[]>(`${API_BASE_URL}/investment`)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [form, setForm] = useState({ name: "", type: "", amount: "", description: "" })
  const [editInvestment, setEditInvestment] = useState<any | null>(null)
  const [refresh, setRefresh] = useState(0)
  const [actionError, setActionError] = useState<string | null>(null)

  const { data: freshInvestments, loading: freshLoading, error: freshError } = useApiData<any[]>(`${API_BASE_URL}/investment?refresh=${refresh}`)

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddInvestment = async () => {
    setActionError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/investment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          amount: parseFloat(form.amount),
          description: form.description,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to add investment")
      setIsAddDialogOpen(false)
      setForm({ name: "", type: "", amount: "", description: "" })
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const handleEditInvestment = (investment: any) => {
    setEditInvestment(investment)
    setForm({
      name: investment.name,
      type: investment.type,
      amount: investment.amount,
      description: investment.description,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateInvestment = async () => {
    setActionError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/investment/${editInvestment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          amount: parseFloat(form.amount),
          description: form.description,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to update investment")
      setIsEditDialogOpen(false)
      setEditInvestment(null)
      setForm({ name: "", type: "", amount: "", description: "" })
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const handleDeleteInvestment = async (id: string) => {
    setActionError(null)
    if (!window.confirm("Are you sure you want to delete this investment?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/investment/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to delete investment")
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const displayedInvestments = freshInvestments || investments
  const isLoading = freshLoading || loading
  const displayError = freshError || error

  if (isLoading) return <div>Loading investments...</div>
  if (displayError) return <div className="text-destructive-500">Error: {displayError}</div>
  if (!displayedInvestments || !displayedInvestments.length) return <div>No investments found. Start by adding a new investment!</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Investments</h1>
        <p className="text-muted-foreground">Grow your wealth with smart investment options</p>
      </div>

      {/* Coming Soon Banner */}
      <Card className="border-primary-200 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-lg">
              <Lock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Investment Features Coming Soon
              </h3>
              <p className="text-primary-700 dark:text-primary-300">
                We're working hard to bring you comprehensive investment tools. Stay tuned for updates!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedInvestments.map((investment) => (
          <Card key={investment.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted rounded-lg">
                    {/* Optionally use an icon based on investment.type */}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{investment.name}</CardTitle>
                    <CardDescription>{investment.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">{investment.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Amount:</h4>
                  <div className="text-2xl font-bold">R{investment.amount.toLocaleString()}</div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Created At:</h4>
                  <div className="text-sm text-muted-foreground">{new Date(investment.createdAt).toLocaleDateString()}</div>
                </div>
                <Button disabled className="w-full">
                  Edit Investment
                </Button>
              </div>
            </CardContent>

            {/* Overlay for disabled state */}
            <div className="absolute inset-0 bg-background/50 dark:bg-foreground/50 backdrop-blur-[1px]"></div>
          </Card>
        ))}
      </div>

      {/* Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Education</CardTitle>
          <CardDescription>Learn the basics while you wait for our investment features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Risk vs. Return</h4>
              <p className="text-sm text-muted-foreground">
                Understanding the relationship between investment risk and potential returns is crucial for building a
                balanced portfolio.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Diversification</h4>
              <p className="text-sm text-muted-foreground">
                Spreading investments across different asset classes helps reduce risk and improve long-term returns.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Dollar-Cost Averaging</h4>
              <p className="text-sm text-muted-foreground">
                Investing a fixed amount regularly can help reduce the impact of market volatility on your investments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}