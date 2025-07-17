"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Search } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useApiData } from "@/hooks/useApiData"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088/api"

export default function TransactionsPage() {
  const { data: transactions, loading, error } = useApiData<any[]>(`${API_BASE_URL}/transaction`)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [form, setForm] = useState({ title: "", amount: "", category: "", date: "", type: "expense", description: "" })
  const [editTransaction, setEditTransaction] = useState<any | null>(null)
  const [refresh, setRefresh] = useState(0)
  const [actionError, setActionError] = useState<string | null>(null)

  const { data: freshTransactions, loading: freshLoading, error: freshError } = useApiData<any[]>(`${API_BASE_URL}/transaction?refresh=${refresh}`)

  const handleInputChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddTransaction = async () => {
    setActionError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(form.amount),
          category: form.category,
          date: form.date,
          type: form.type,
          description: form.description,
          title: form.title,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to add transaction")
      setIsAddDialogOpen(false)
      setForm({ title: "", amount: "", category: "", date: "", type: "expense", description: "" })
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const handleEditTransaction = (transaction: any) => {
    setEditTransaction(transaction)
    setForm({
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
      date: transaction.date?.slice(0, 10) || "",
      type: transaction.type,
      description: transaction.description,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdateTransaction = async () => {
    setActionError(null)
    try {
      const res = await fetch(`${API_BASE_URL}/transaction/${editTransaction.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(form.amount),
          category: form.category,
          date: form.date,
          type: form.type,
          description: form.description,
          title: form.title,
        }),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to update transaction")
      setIsEditDialogOpen(false)
      setEditTransaction(null)
      setForm({ title: "", amount: "", category: "", date: "", type: "expense", description: "" })
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const handleDeleteTransaction = async (id: string) => {
    setActionError(null)
    if (!window.confirm("Are you sure you want to delete this transaction?")) return
    try {
      const res = await fetch(`${API_BASE_URL}/transaction/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to delete transaction")
      setRefresh((r) => r + 1)
    } catch (err: any) {
      setActionError(err.message)
    }
  }

  const displayedTransactions = freshTransactions || transactions
  const isLoading = freshLoading || loading
  const displayError = freshError || error

  const categories = ["All", ...(displayedTransactions ? Array.from(new Set(displayedTransactions.map((t) => t.category))) : [])]

  const filteredTransactions = (displayedTransactions || []).filter((transaction) => {
    const matchesSearch =
      transaction.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (isLoading) return <div>Loading transactions...</div>
  if (displayError) return <div className="text-destructive-500">Error: {displayError}</div>
  if (!displayedTransactions || !displayedTransactions.length) return <div>No transactions found. Start by adding a new transaction!</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground">Track and manage your financial transactions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>Add a new transaction to track your expenses or income.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input id="title" name="title" value={form.title} onChange={handleInputChange} placeholder="Transaction title" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input id="amount" name="amount" type="number" value={form.amount} onChange={handleInputChange} placeholder="0.00" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "col-span-3 justify-start text-left font-normal",
                        !form.date && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.date ? format(new Date(form.date), "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={form.date ? new Date(form.date) : undefined} onSelect={(date) => setForm({ ...form, date: date ? date.toISOString().slice(0, 10) : "" })} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input id="description" name="description" value={form.description} onChange={handleInputChange} placeholder="Transaction description" className="col-span-3" />
              </div>
            </div>
            {actionError && <p className="text-red-500 text-sm">{actionError}</p>}
            <DialogFooter>
              <Button type="submit" onClick={handleAddTransaction}>
                Add Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter transactions by search, category, and date range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFrom ? format(dateFrom, "PPP") : <span>From date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateTo ? format(dateTo, "PPP") : <span>To date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <Card key={transaction.id}>
            <CardContent>
              <div className="flex items-center justify-between">
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
              <div className="flex items-center justify-end mt-2">
                <Button variant="outline" size="sm" onClick={() => handleEditTransaction(transaction)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDeleteTransaction(transaction.id)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
            <DialogDescription>Edit the details of your transaction.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input id="title" name="title" value={form.title} onChange={handleInputChange} placeholder="Transaction title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input id="amount" name="amount" type="number" value={form.amount} onChange={handleInputChange} placeholder="0.00" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={form.category} onValueChange={(value) => setForm({ ...form, category: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "col-span-3 justify-start text-left font-normal",
                      !form.date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.date ? format(new Date(form.date), "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={form.date ? new Date(form.date) : undefined} onSelect={(date) => setForm({ ...form, date: date ? date.toISOString().slice(0, 10) : "" })} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" name="description" value={form.description} onChange={handleInputChange} placeholder="Transaction description" className="col-span-3" />
            </div>
          </div>
          {actionError && <p className="text-red-500 text-sm">{actionError}</p>}
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateTransaction}>
              Update Transaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
