"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Edit, Plus, AlertTriangle } from "lucide-react"
import { useApiData } from "@/hooks/useApiData"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088/api"

const budgetCategories = [
  { id: 1, name: "Food & Dining", planned: 800, actual: 750, color: "hsl(var(--primary))" },
  { id: 2, name: "Transportation", planned: 400, actual: 450, color: "hsl(var(--accent))" },
  { id: 3, name: "Entertainment", planned: 300, actual: 280, color: "hsl(var(--secondary))" },
  { id: 4, name: "Utilities", planned: 500, actual: 520, color: "hsl(var(--destructive))" },
  { id: 5, name: "Shopping", planned: 600, actual: 680, color: "hsl(var(--primary-foreground))" },
  { id: 6, name: "Healthcare", planned: 200, actual: 150, color: "hsl(var(--destructive))" },
]

const monthlyBudgetData = [
  { month: "Jan", planned: 2800, actual: 2830 },
  { month: "Feb", planned: 2800, actual: 2650 },
  { month: "Mar", planned: 2800, actual: 2900 },
  { month: "Apr", planned: 2800, actual: 2750 },
  { month: "May", planned: 2800, actual: 2820 },
  { month: "Jun", planned: 2800, actual: 2830 },
]

export default function BudgetPage() {
  const { data: budgets, loading, error } = useApiData<any[]>(`${API_BASE_URL}/budget`)
  const [editingCategory, setEditingCategory] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [form, setForm] = useState({ name: "", plannedAmount: "", actualAmount: "", category: "", startDate: "", endDate: "" })
  const [editBudget, setEditBudget] = useState<any | null>(null)
  const [refresh, setRefresh] = useState(0)
  const [actionError, setActionError] = useState<string | null>(null)

  const { data: freshBudgets, loading: freshLoading, error: freshError } = useApiData<any[]>(`${API_BASE_URL}/budget?refresh=${refresh}`)

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddBudget = async () => {
    setActionError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/budget`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          plannedAmount: parseFloat(form.plannedAmount),
          actualAmount: parseFloat(form.actualAmount),
          category: form.category,
          startDate: form.startDate,
          endDate: form.endDate,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to add budget")
      setIsAddDialogOpen(false)
      setForm({ name: "", plannedAmount: "", actualAmount: "", category: "", startDate: "", endDate: "" })
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const handleEditBudget = (budget: any) => {
    setEditBudget(budget)
    setForm({
      name: budget.name,
      plannedAmount: budget.plannedAmount,
      actualAmount: budget.actualAmount,
      category: budget.category,
      startDate: budget.startDate?.slice(0, 10) || "",
      endDate: budget.endDate?.slice(0, 10) || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateBudget = async () => {
    setActionError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/budget/${editBudget.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          plannedAmount: parseFloat(form.plannedAmount),
          actualAmount: parseFloat(form.actualAmount),
          category: form.category,
          startDate: form.startDate,
          endDate: form.endDate,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to update budget")
      setIsEditDialogOpen(false)
      setEditBudget(null)
      setForm({ name: "", plannedAmount: "", actualAmount: "", category: "", startDate: "", endDate: "" })
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const handleDeleteBudget = async (id: string) => {
    setActionError(null)
    if (!window.confirm("Are you sure you want to delete this budget?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/budget/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to delete budget")
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const displayedBudgets = freshBudgets || budgets
  const isLoading = freshLoading || loading
  const displayError = freshError || error

  if (isLoading) return <div>Loading budgets...</div>
  if (displayError) return <div className="text-destructive-500">Error: {displayError}</div>
  if (!displayedBudgets || !displayedBudgets.length) return <div>No budgets found. Start by adding a new budget!</div>

  const totalPlanned = displayedBudgets.reduce((sum, cat) => sum + (cat.plannedAmount || 0), 0)
  const totalActual = displayedBudgets.reduce((sum, cat) => sum + (cat.actualAmount || 0), 0)
  const budgetVariance = totalActual - totalPlanned

  const handleEdit = (budgetId: number, currentValue: number) => {
    setEditingCategory(budgetId)
    setEditValue(currentValue.toString())
  }

  const handleSave = (budgetId: number) => {
    // In a real app, this would update the backend
    console.log(`Updating budget ${budgetId} to ${editValue}`)
    setEditingCategory(null)
    setEditValue("")
  }

  const getProgressColor = (actual: number, planned: number) => {
    const percentage = (actual / planned) * 100
    if (percentage > 100) return "bg-destructive-500"
    if (percentage > 80) return "bg-secondary-500"
    return "bg-accent-500"
  }

  const getVarianceBadge = (actual: number, planned: number) => {
    const variance = actual - planned
    const percentage = ((variance / planned) * 100).toFixed(1)

    if (variance > 0) {
      return (
        <Badge variant="destructive">
          +R{variance} ({percentage}%)
        </Badge>
      )
    } else if (variance < 0) {
      return (
        <Badge variant="default">
          -R{Math.abs(variance)} ({percentage}%)
        </Badge>
      )
    } else {
      return <Badge variant="secondary">On budget</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Budget</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedBudgets.map((budget) => {
          const progress = (budget.actualAmount / budget.plannedAmount) * 100
          return (
            <Card key={budget.id}>
              <CardHeader>
                <CardTitle>{budget.name}</CardTitle>
                <CardDescription>{budget.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span>Planned: R{budget.plannedAmount}</span>
                  <span>Actual: R{budget.actualAmount}</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between items-center mt-2">
                  {getVarianceBadge(budget.actualAmount, budget.plannedAmount)}
                  <Button size="sm" variant="outline" onClick={() => handleEdit(budget.id, budget.actualAmount)}>
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
