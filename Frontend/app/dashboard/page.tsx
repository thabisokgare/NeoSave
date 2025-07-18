"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, DollarSign, TrendingUp, Target, CreditCard, LineChart } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useApiData } from "@/hooks/useApiData"
import { useEffect, useState } from "react"

// Default empty data structures
const emptyMonthlyData = [
  { month: "Jan", income: 0, expenses: 0 },
  { month: "Feb", income: 0, expenses: 0 },
  { month: "Mar", income: 0, expenses: 0 },
  { month: "Apr", income: 0, expenses: 0 },
  { month: "May", income: 0, expenses: 0 },
  { month: "Jun", income: 0, expenses: 0 },
]

const emptyCategoryData = [
  { name: "No Data", value: 1, color: "hsl(var(--muted))" },
]

const defaultColors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--secondary))",
  "hsl(var(--destructive))",
  "hsl(var(--primary-foreground))",
]

export default function DashboardPage() {
  // Fetch transactions data
  const { data: transactionsData, loading: transactionsLoading } = useApiData('/api/transaction');
  const { data: goalsData, loading: goalsLoading } = useApiData('/api/goal');
  
  // State for processed data
  const [monthlyData, setMonthlyData] = useState(emptyMonthlyData);
  const [categoryData, setCategoryData] = useState(emptyCategoryData);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<any[]>([]);
  const [summaryData, setSummaryData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    savingsRate: 0
  });

  // Process transactions data when it loads
  useEffect(() => {
    if (transactionsData && Array.isArray(transactionsData)) {
      // Recent transactions - take the 5 most recent
      const recent = [...transactionsData]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
      setRecentTransactions(recent);

      // Calculate summary data
      const income = transactionsData
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const expenses = transactionsData
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Math.abs(t.amount), 0);
      
      const balance = income - expenses;
      const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

      setSummaryData({
        balance,
        income,
        expenses,
        savingsRate
      });

      // Process category data
      const categories: Record<string, number> = {};
      transactionsData
        .filter(t => t.type === 'expense')
        .forEach(t => {
          if (!categories[t.category]) categories[t.category] = 0;
          categories[t.category] += Math.abs(t.amount);
        });

      const categoryDataArray = Object.entries(categories).map(([name, value], index) => ({
        name,
        value,
        color: defaultColors[index % defaultColors.length]
      }));

      setCategoryData(categoryDataArray.length > 0 ? categoryDataArray : emptyCategoryData);
    }
  }, [transactionsData]);

  // Process goals data when it loads
  useEffect(() => {
    if (goalsData && Array.isArray(goalsData)) {
      const processedGoals = goalsData.map(goal => ({
        ...goal,
        progress: goal.targetAmount > 0 
          ? Math.round((goal.currentAmount / goal.targetAmount) * 100) 
          : 0
      }));
      setSavingsGoals(processedGoals);
    }
  }, [goalsData]);

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
            <div className="text-2xl font-bold">
              {transactionsLoading ? (
                <span className="text-muted">Loading...</span>
              ) : (
                `R${summaryData.balance.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {!transactionsLoading && (
                <span className="text-accent-500 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  Updated
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transactionsLoading ? (
                <span className="text-muted">Loading...</span>
              ) : (
                `R${summaryData.income.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {!transactionsLoading && (
                <span className="text-accent-500 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  This month
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transactionsLoading ? (
                <span className="text-muted">Loading...</span>
              ) : (
                `R${summaryData.expenses.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {!transactionsLoading && (
                <span className="text-destructive-500 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  This month
                </span>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transactionsLoading ? (
                <span className="text-muted">Loading...</span>
              ) : (
                `${summaryData.savingsRate.toFixed(1)}%`
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {!transactionsLoading && (
                <span className="text-accent-500 flex items-center">
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                  This month
                </span>
              )}
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
            {transactionsLoading ? (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Loading chart data...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="income" fill="hsl(var(--accent))" name="Income" />
                  <Bar dataKey="expenses" fill="hsl(var(--destructive))" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown of your spending this month</CardDescription>
          </CardHeader>
          <CardContent>
            {transactionsLoading ? (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                Loading chart data...
              </div>
            ) : categoryData.length === 0 || (categoryData.length === 1 && categoryData[0].name === "No Data") ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
                <LineChart className="h-16 w-16 mb-4 opacity-50" />
                <p>No expense data available</p>
                <p className="text-sm">Add transactions to see your spending breakdown</p>
              </div>
            ) : (
              <>
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
                        {category.name}: R{category.value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
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
            {transactionsLoading ? (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                Loading transactions...
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                <CreditCard className="h-16 w-16 mb-4 opacity-50" />
                <p>No transactions found</p>
                <p className="text-sm">Add your first transaction to get started</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{transaction.description || transaction.title}</p>
                        <p className="text-sm text-gray-500">
                          {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
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
              </>
            )}
          </CardContent>
        </Card>

        {/* Savings Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
            <CardDescription>Track your progress towards financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            {goalsLoading ? (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                Loading goals...
              </div>
            ) : savingsGoals.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                <Target className="h-16 w-16 mb-4 opacity-50" />
                <p>No savings goals found</p>
                <p className="text-sm">Create your first goal to track your progress</p>
              </div>
            ) : (
              <>
                <div className="space-y-6">
                  {savingsGoals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{goal.title}</span>
                        <span className="text-sm text-gray-500">
                          R{goal.currentAmount.toLocaleString()} / R{goal.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{goal.progress}% complete</span>
                        <Badge variant="outline">R{(goal.targetAmount - goal.currentAmount).toLocaleString()} to go</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 bg-muted">
                  Manage Goals
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
