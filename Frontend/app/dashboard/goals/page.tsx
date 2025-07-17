"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Target, TrendingUp, Clock } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { cn } from "@/lib/utils"
import { useApiData } from "@/hooks/useApiData"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088/api"

export default function GoalsPage() {
  const { data: goals, loading, error } = useApiData<any[]>(`${API_BASE_URL}/goal`)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [form, setForm] = useState({ title: "", description: "", targetAmount: "", dueDate: "" })
  const [editGoal, setEditGoal] = useState<any | null>(null)
  const [refresh, setRefresh] = useState(0)
  const [actionError, setActionError] = useState<string | null>(null)

  // Re-fetch on refresh
  const { data: freshGoals, loading: freshLoading, error: freshError } = useApiData<any[]>(`${API_BASE_URL}/goal?refresh=${refresh}`)

  // Handlers
  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddGoal = async () => {
    setActionError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/goal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          targetAmount: parseFloat(form.targetAmount),
          dueDate: form.dueDate,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to add goal")
      setIsAddDialogOpen(false)
      setForm({ title: "", description: "", targetAmount: "", dueDate: "" })
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const handleEditGoal = (goal: any) => {
    setEditGoal(goal)
    setForm({
      title: goal.title,
      description: goal.description,
      targetAmount: goal.targetAmount,
      dueDate: goal.dueDate?.slice(0, 10) || "",
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateGoal = async () => {
    setActionError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/goal/${editGoal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          targetAmount: parseFloat(form.targetAmount),
          dueDate: form.dueDate,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to update goal")
      setIsEditDialogOpen(false)
      setEditGoal(null)
      setForm({ title: "", description: "", targetAmount: "", dueDate: "" })
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const handleDeleteGoal = async (id: string) => {
    setActionError(null)
    if (!window.confirm("Are you sure you want to delete this goal?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/goal/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to delete goal")
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getDaysRemaining = (deadline: string) => {
    return differenceInDays(new Date(deadline), new Date())
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive-500"
      case "medium":
        return "bg-secondary-500"
      case "low":
        return "bg-accent-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityBadge = (priority: string) => {
    const variant = priority === "high" ? "destructive" : priority === "medium" ? "default" : "secondary"
    return <Badge variant={variant}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</Badge>
  }

  const getStatusBadge = (current: number, target: number, deadline: string) => {
    const progress = getProgressPercentage(current, target)
    const daysRemaining = getDaysRemaining(deadline)

    if (progress >= 100) {
      return <Badge className="bg-accent-500">Completed</Badge>
    } else if (daysRemaining < 0) {
      return <Badge variant="destructive">Overdue</Badge>
    } else if (daysRemaining < 30) {
      return <Badge className="bg-secondary-500">Due Soon</Badge>
    } else {
      return <Badge variant="outline">In Progress</Badge>
    }
  }

  const displayedGoals = freshGoals || goals
  const isLoading = freshLoading || loading
  const displayError = freshError || error

  if (isLoading) return <div>Loading goals...</div>
  if (displayError) return <div className="text-destructive-500">Error: {displayError}</div>
  if (!displayedGoals || !displayedGoals.length) return <div>No goals found. Start by adding a new goal!</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Savings Goals</h1>
          <p className="text-muted-foreground">Track your progress towards financial goals</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>Set a new savings goal to track your progress.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" placeholder="Goal title" className="col-span-3" name="title" value={form.title} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input id="description" placeholder="Goal description" className="col-span-3" name="description" value={form.description} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target" className="text-right">
                  Target Amount
                </Label>
                <Input id="target" type="number" placeholder="0.00" className="col-span-3" name="targetAmount" value={form.targetAmount} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Deadline
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddGoal}>
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{displayedGoals.length}</div>
            <p className="text-xs text-muted-foreground">
              {displayedGoals.filter((goal) => getProgressPercentage(goal.currentAmount, goal.targetAmount) >= 100).length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R{displayedGoals.reduce((sum, goal) => sum + (goal.currentAmount || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Amount</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R{displayedGoals.reduce((sum, goal) => sum + (goal.targetAmount || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total target across all goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayedGoals.map((goal) => {
          const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount)
          const daysRemaining = getDaysRemaining(goal.dueDate)
          const remaining = goal.targetAmount - goal.currentAmount

          return (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {/* Priority badge if available */}
                    {getStatusBadge(goal.currentAmount, goal.targetAmount, goal.dueDate)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>R{goal.currentAmount.toLocaleString()} saved</span>
                    <span>R{goal.targetAmount.toLocaleString()} target</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Remaining</p>
                    <p className="font-semibold">R{remaining.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Days left</p>
                    <p className={`font-semibold ${daysRemaining < 30 ? "text-destructive-500" : "text-foreground"}`}>
                      {daysRemaining > 0 ? `${daysRemaining} days` : "Overdue"}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-muted">
                    Add Money
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-muted" onClick={() => handleEditGoal(goal)}>
                    Edit Goal
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-muted" onClick={() => handleDeleteGoal(goal.id)}>
                    Delete Goal
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
