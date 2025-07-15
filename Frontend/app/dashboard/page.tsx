"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, DollarSign, TrendingUp, Target, CreditCard } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const monthlyData = [
  { month: "Jan", income: 5000, expenses: 3200 },
  { month: "Feb", income: 5200, expenses: 3400 },
  { month: "Mar", income: 4800, expenses: 3100 },
  { month: "Apr", income: 5500, expenses: 3600 },
  { month: "May", income: 5300, expenses: 3300 },
  { month: "Jun", income: 5600, expenses: 3500 },
]

const categoryData = [
  { name: "Food", value: 800, color: "hsl(var(--primary))" },
  { name: "Transport", value: 400, color: "hsl(var(--accent))" },
  { name: "Entertainment", value: 300, color: "hsl(var(--secondary))" },
  { name: "Utilities", value: 500, color: "hsl(var(--destructive))" },
  { name: "Shopping", value: 600, color: "hsl(var(--primary-foreground))" },
]

const recentTransactions = [
  { id: 1, title: "Grocery Store", amount: -85.5, category: "Food", date: "2024-01-15", type: "expense" },
  { id: 2, title: "Salary Deposit", amount: 5000, category: "Income", date: "2024-01-15", type: "income" },
  { id: 3, title: "Gas Station", amount: -45.2, category: "Transport", date: "2024-01-14", type: "expense" },
  { id: 4, title: "Netflix", amount: -15.99, category: "Entertainment", date: "2024-01-14", type: "expense" },
  { id: 5, title: "Freelance Work", amount: 800, category: "Income", date: "2024-01-13", type: "income" },
]

const savingsGoals = [
  { id: 1, title: "Emergency Fund", current: 3500, target: 10000, progress: 35 },
  { id: 2, title: "Vacation", current: 1200, target: 3000, progress: 40 },
  { id: 3, title: "New Car", current: 8500, target: 25000, progress: 34 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R12,450.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent-500 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                +2.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R5,600.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent-500 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                +5.7%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R3,500.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-destructive-500 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                +3.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37.5%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-accent-500 flex items-center">
                <ArrowUpIcon className="h-3 w-3 mr-1" />
                +1.2%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Monthly comparison for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Bar dataKey="income" fill="hsl(var(--accent))" name="Income" />
                <Bar dataKey="expenses" fill="hsl(var(--destructive))" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown of your spending this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-sm">
                    {category.name}: R{category.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                  <div
                    className={`font-semibold ${transaction.type === "income" ? "text-accent-500" : "text-destructive-500"}`}
                  >
                    {transaction.type === "income" ? "+" : ""}R{Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-muted">
              View All Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Savings Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
            <CardDescription>Track your progress towards financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {savingsGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-sm text-gray-500">
                      R{goal.current.toLocaleString()} / R{goal.target.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{goal.progress}% complete</span>
                    <Badge variant="outline">R{(goal.target - goal.current).toLocaleString()} to go</Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-muted">
              Manage Goals
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
