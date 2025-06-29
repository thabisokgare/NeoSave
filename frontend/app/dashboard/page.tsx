"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  Target,
  Brain,
  PiggyBank,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  Settings,
  Bell,
  User,
  Home,
  BookOpen,
  MoreHorizontal,
  Bot,
} from "lucide-react"
import Link from "next/link"

const budgetData = {
  income: 5000,
  totalExpenses: 3200,
  savings: 1800,
  categories: [
    { name: "Housing", budgeted: 1500, spent: 1500, color: "bg-brand-primary" },
    { name: "Food", budgeted: 600, spent: 520, color: "bg-brand-accent" },
    { name: "Transportation", budgeted: 400, spent: 380, color: "bg-brand-highlight" },
    { name: "Entertainment", budgeted: 300, spent: 280, color: "bg-orange-500" },
  ],
}

const savingsGoals = [
  { name: "Emergency Fund", target: 10000, current: 6500, color: "bg-brand-highlight" },
  { name: "Vacation", target: 3000, current: 1200, color: "bg-brand-accent" },
  { name: "House Down Payment", target: 50000, current: 12000, color: "bg-brand-primary" },
]

const insights = [
  {
    type: "success",
    title: "Great job on food spending!",
    description: "You saved $80 on groceries this month by cooking at home more often.",
    icon: TrendingUp,
    color: "text-brand-highlight bg-green-50",
  },
  {
    type: "suggestion",
    title: "NeoSave suggests cutting dining out by 8%",
    description: "This could save you an extra $150/month toward your emergency fund goal.",
    icon: Lightbulb,
    color: "text-brand-primary bg-indigo-50",
  },
  {
    type: "alert",
    title: "Transportation spending up 15%",
    description: "Consider carpooling or public transit to stay within budget.",
    icon: ArrowUpRight,
    color: "text-orange-600 bg-orange-50",
  },
]

const recentTransactions = [
  { name: "Grocery Store", amount: -85.32, category: "Food", date: "Today" },
  { name: "Salary Deposit", amount: 2500.0, category: "Income", date: "Yesterday" },
  { name: "Netflix", amount: -15.99, category: "Entertainment", date: "2 days ago" },
  { name: "Gas Station", amount: -45.2, category: "Transportation", date: "3 days ago" },
]

export default function DashboardPage() {
  const remainingBudget = budgetData.income - budgetData.totalExpenses
  const savingsRate = (budgetData.savings / budgetData.income) * 100

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Header */}
      <div className="border-b border-gray-200/50 bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand-text">Good morning, Alex!</h1>
              <p className="text-brand-text-muted">You're on track to save R1,800 this month 🎯</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                <Bell className="h-5 w-5 text-brand-text-muted" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                <Settings className="h-5 w-5 text-brand-text-muted" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                <User className="h-5 w-5 text-brand-text-muted" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-soft rounded-2xl hover:shadow-medium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-text-muted">Monthly Income</p>
                  <p className="text-2xl font-bold text-brand-text">R{budgetData.income.toLocaleString()}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-brand-highlight to-green-600">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-soft rounded-2xl hover:shadow-medium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-text-muted">Total Expenses</p>
                  <p className="text-2xl font-bold text-brand-text">R{budgetData.totalExpenses.toLocaleString()}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-soft rounded-2xl hover:shadow-medium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-text-muted">Available</p>
                  <p className="text-2xl font-bold text-brand-text">R{remainingBudget.toLocaleString()}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-accent">
                  <PiggyBank className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-soft rounded-2xl hover:shadow-medium transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-text-muted">Savings Rate</p>
                  <p className="text-2xl font-bold text-brand-text">{savingsRate.toFixed(1)}%</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-brand-highlight to-green-600">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Budget Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-0 shadow-soft rounded-2xl hover:shadow-medium transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2 text-brand-text">
                      <Brain className="h-5 w-5 text-brand-primary" />
                      <span>Monthly Budget Breakdown</span>
                    </CardTitle>
                    <CardDescription className="text-brand-text-muted">AI-optimized spending plan</CardDescription>
                  </div>
                  <Badge className="bg-indigo-100 text-brand-primary border-indigo-200">AI Suggested</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {budgetData.categories.map((category, index) => {
                  const percentage = (category.spent / category.budgeted) * 100
                  const isOverBudget = category.spent > category.budgeted

                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${category.color}`} />
                          <span className="font-medium text-brand-text">{category.name}</span>
                        </div>
                        <div className="text-right">
                          <span className={`font-semibold ${isOverBudget ? "text-red-600" : "text-brand-text"}`}>
                            ${category.spent}
                          </span>
                          <span className="text-brand-text-muted"> / R{category.budgeted}</span>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${category.color} transition-all duration-500 ease-out`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        {isOverBudget && (
                          <div
                            className="absolute top-0 left-0 h-2 bg-red-500 rounded-full"
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        )}
                      </div>
                      <div className="flex justify-between text-xs text-brand-text-muted">
                        <span>{percentage.toFixed(1)}% used</span>
                        <span>${Math.max(category.budgeted - category.spent, 0)} remaining</span>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="bg-white border-0 shadow-soft rounded-2xl hover:shadow-medium transition-all">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-brand-text">
                  <Bot className="h-5 w-5 text-brand-accent" />
                  <span>AI Insights & Recommendations</span>
                </CardTitle>
                <CardDescription className="text-brand-text-muted">
                  Personalized suggestions to optimize your finances
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50/50">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${insight.color}`}>
                      <insight.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-brand-text mb-1">{insight.title}</h4>
                      <p className="text-sm text-brand-text-muted leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Savings Goals */}
            <Card className="bg-white border-0 shadow-soft rounded-2xl hover:shadow-medium transition-all">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-brand-text">
                  <Target className="h-5 w-5 text-brand-highlight" />
                  <span>Savings Goals</span>
                </CardTitle>
                <CardDescription className="text-brand-text-muted">Track your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {savingsGoals.map((goal, index) => {
                  const percentage = (goal.current / goal.target) * 100

                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${goal.color}`} />
                          <span className="font-medium text-brand-text">{goal.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-gray-100 rounded-lg">
                          <MoreHorizontal className="h-4 w-4 text-brand-text-muted" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${goal.color} transition-all duration-500 ease-out`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-brand-text font-medium">${goal.current.toLocaleString()}</span>
                          <span className="text-brand-text-muted">${goal.target.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-brand-text-muted">{percentage.toFixed(1)}% complete</div>
                      </div>
                    </div>
                  )
                })}
                <Button className="w-full bg-gradient-to-r from-brand-highlight to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-soft hover:shadow-medium transition-all">
                  Add New Goal
                </Button>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="bg-white border-0 shadow-soft rounded-2xl hover:shadow-medium transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-brand-text">Recent Activity</CardTitle>
                  <Button variant="ghost" className="text-brand-primary hover:text-indigo-700 text-sm font-medium">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          transaction.amount > 0 ? "bg-green-100" : "bg-gray-100"
                        }`}
                      >
                        {transaction.amount > 0 ? (
                          <ArrowDownRight className="h-4 w-4 text-brand-highlight" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-brand-text-muted" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-brand-text text-sm">{transaction.name}</p>
                        <p className="text-xs text-brand-text-muted">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold text-sm ${
                          transaction.amount > 0 ? "text-brand-highlight" : "text-brand-text"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}R{Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <p className="text-xs text-brand-text-muted">{transaction.category}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Navigation - Mobile */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 md:hidden">
          <div className="flex items-center justify-around py-2">
            <Link href="/dashboard" className="flex flex-col items-center p-3 text-brand-primary">
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Dashboard</span>
            </Link>
            <Link
              href="/survey"
              className="flex flex-col items-center p-3 text-brand-text-muted hover:text-brand-primary transition-colors"
            >
              <Target className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Goals</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center p-3 text-brand-text-muted hover:text-brand-primary transition-colors"
            >
              <BookOpen className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Learn</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center p-3 text-brand-text-muted hover:text-brand-primary transition-colors"
            >
              <Settings className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
