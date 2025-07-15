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

const savingsGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    description: "Build a 6-month emergency fund",
    current: 3500,
    target: 10000,
    deadline: "2024-12-31",
    priority: "high",
    category: "Safety",
  },
  {
    id: 2,
    title: "Vacation to Japan",
    description: "Save for a 2-week trip to Japan",
    current: 1200,
    target: 3000,
    deadline: "2024-08-15",
    priority: "medium",
    category: "Travel",
  },
  {
    id: 3,
    title: "New Car Down Payment",
    description: "Save for a down payment on a new car",
    current: 8500,
    target: 25000,
    deadline: "2025-06-30",
    priority: "high",
    category: "Transportation",
  },
  {
    id: 4,
    title: "Home Renovation",
    description: "Kitchen and bathroom renovation",
    current: 2800,
    target: 15000,
    deadline: "2024-10-01",
    priority: "medium",
    category: "Home",
  },
  {
    id: 5,
    title: "Investment Portfolio",
    description: "Build initial investment portfolio",
    current: 5000,
    target: 20000,
    deadline: "2025-12-31",
    priority: "low",
    category: "Investment",
  },
]

export default function GoalsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

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
                <Input id="title" placeholder="Goal title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="target" className="text-right">
                  Target Amount
                </Label>
                <Input id="target" type="number" placeholder="0.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current" className="text-right">
                  Current Amount
                </Label>
                <Input id="current" type="number" placeholder="0.00" className="col-span-3" />
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
              <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
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
            <div className="text-2xl font-bold">{savingsGoals.length}</div>
            <p className="text-xs text-muted-foreground">
              {savingsGoals.filter((goal) => getProgressPercentage(goal.current, goal.target) >= 100).length} completed
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
              R{savingsGoals.reduce((sum, goal) => sum + goal.current, 0).toLocaleString()}
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
              R{savingsGoals.reduce((sum, goal) => sum + goal.target, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total target across all goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savingsGoals.map((goal) => {
          const progress = getProgressPercentage(goal.current, goal.target)
          const daysRemaining = getDaysRemaining(goal.deadline)
          const remaining = goal.target - goal.current

          return (
            <Card key={goal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <CardDescription>{goal.description}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getPriorityBadge(goal.priority)}
                    {getStatusBadge(goal.current, goal.target, goal.deadline)}
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
                    <span>R{goal.current.toLocaleString()} saved</span>
                    <span>R{goal.target.toLocaleString()} target</span>
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
                  <Button variant="outline" size="sm" className="flex-1 bg-muted">
                    Edit Goal
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
