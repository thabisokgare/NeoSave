"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Edit, Plus, AlertTriangle } from "lucide-react"

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
  const [editingCategory, setEditingCategory] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")

  const totalPlanned = budgetCategories.reduce((sum, cat) => sum + cat.planned, 0)
  const totalActual = budgetCategories.reduce((sum, cat) => sum + cat.actual, 0)
  const budgetVariance = totalActual - totalPlanned

  const handleEdit = (categoryId: number, currentValue: number) => {
    setEditingCategory(categoryId)
    setEditValue(currentValue.toString())
  }

  const handleSave = (categoryId: number) => {
    // In a real app, this would update the backend
    console.log(`Updating category ${categoryId} to ${editValue}`)
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Budget Management</h1>
          <p className="text-muted-foreground">Plan and track your monthly spending</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Planned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R{totalPlanned.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">R{totalActual.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Variance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${budgetVariance > 0 ? "text-destructive-500" : "text-accent-500"}`}>
              {budgetVariance > 0 ? "+" : ""}R{budgetVariance}
            </div>
            {budgetVariance > 0 && (
              <div className="flex items-center mt-2 text-sm text-red-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                Over budget
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
            <CardDescription>Manage your spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {budgetCategories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      {getVarianceBadge(category.actual, category.planned)}
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(category.id, category.planned)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Spent: R{category.actual}</span>
                    <span>
                      Budget:
                      {editingCategory === category.id ? (
                        <div className="inline-flex items-center ml-1">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-20 h-6 text-xs"
                            type="number"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSave(category.id)}
                            className="ml-1 h-6 px-2"
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        ` R${category.planned}`
                      )}
                    </span>
                  </div>

                  <Progress value={(category.actual / category.planned) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Distribution</CardTitle>
            <CardDescription>Visual breakdown of your planned budget</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="planned"
                >
                  {budgetCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {budgetCategories.map((category) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm">
                    {category.name}: R{category.planned}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Budget Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Trend</CardTitle>
          <CardDescription>Compare planned vs actual spending over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyBudgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Bar dataKey="planned" fill="hsl(var(--primary))" name="Planned" />
              <Bar dataKey="actual" fill="hsl(var(--destructive))" name="Actual" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
