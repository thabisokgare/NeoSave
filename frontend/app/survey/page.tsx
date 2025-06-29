"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Home,
  Car,
  ShoppingCart,
  Target,
  Plane,
  GraduationCap,
  Heart,
  ArrowRight,
  ArrowLeft,
  Bot,
  Sparkles,
} from "lucide-react"
import { useRouter } from "next/navigation"

const steps = [
  {
    id: 1,
    title: "Monthly Income",
    description: "What's your monthly income?",
    icon: DollarSign,
  },
  {
    id: 2,
    title: "Typical Expenses",
    description: "What are your typical expenses?",
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: "Savings Goal",
    description: "What's your main savings goal?",
    icon: Target,
  },
  {
    id: 4,
    title: "Budgeting Style",
    description: "Pick your budgeting style",
    icon: Heart,
  },
]

const expenseCategories = [
  { id: "housing", label: "Housing & Rent", icon: Home, amount: "$1,200" },
  { id: "transportation", label: "Transportation", icon: Car, amount: "$400" },
  { id: "food", label: "Food & Dining", icon: ShoppingCart, amount: "$600" },
  { id: "entertainment", label: "Entertainment", icon: Plane, amount: "$300" },
]

const savingsGoals = [
  { id: "emergency", label: "Emergency Fund", icon: Heart, target: "$10,000" },
  { id: "vacation", label: "Dream Vacation", icon: Plane, target: "$5,000" },
  { id: "house", label: "House Down Payment", icon: Home, target: "$50,000" },
  { id: "education", label: "Education", icon: GraduationCap, target: "$15,000" },
]

const budgetStyles = [
  {
    id: "strict",
    title: "Strict Budgeter",
    description: "I like detailed categories and precise tracking",
    emoji: "📊",
  },
  {
    id: "flexible",
    title: "Flexible Spender",
    description: "I prefer general guidelines with room for spontaneity",
    emoji: "🌊",
  },
  {
    id: "ai-guided",
    title: "AI-Guided",
    description: "Let AI make smart recommendations and adjustments",
    emoji: "🤖",
  },
]

const aiMessages = [
  "We're analyzing your financial profile...",
  "Setting up your personalized budget...",
  "Configuring smart savings recommendations...",
  "Almost ready! Finalizing your dashboard...",
]

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    income: "",
    expenses: {} as Record<string, string>,
    savingsGoal: "",
    budgetStyle: "",
  })
  const [aiMessage] = useState(0)
  const router = useRouter()

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.income !== ""
      case 2:
        return Object.keys(formData.expenses).length > 0
      case 3:
        return formData.savingsGoal !== ""
      case 4:
        return formData.budgetStyle !== ""
      default:
        return false
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text mb-2">What's your monthly income?</h2>
              <p className="text-brand-text-muted">This helps us create a personalized budget for you</p>
            </div>

            <div className="space-y-4">
              <Label htmlFor="income" className="text-lg font-medium text-brand-text">
                Monthly Income (after taxes)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-4 h-5 w-5 text-brand-text-muted" />
                <Input
                  id="income"
                  type="number"
                  placeholder="5,000"
                  className="pl-12 text-lg py-6 rounded-2xl border-2 border-gray-200 focus:border-brand-primary text-brand-text"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                />
              </div>
              <p className="text-sm text-brand-text-muted">Don't worry, this information is private and secure</p>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 gradient-accent rounded-2xl mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text mb-2">What are your typical expenses?</h2>
              <p className="text-brand-text-muted">Enter your monthly spending for each category</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expenseCategories.map((category) => (
                <Card
                  key={category.id}
                  className="bg-white border-2 border-gray-200 hover:border-brand-primary/50 transition-all rounded-2xl shadow-soft"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                        <category.icon className="h-5 w-5 text-brand-text-muted" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-text">{category.label}</h3>
                        <p className="text-sm text-brand-text-muted">Monthly average</p>
                      </div>
                    </div>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-brand-text-muted" />
                      <Input
                        type="number"
                        placeholder="0"
                        className="pl-10 rounded-xl border-gray-200 focus:border-brand-primary"
                        value={formData.expenses[category.id] || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expenses: { ...formData.expenses, [category.id]: e.target.value },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-brand-highlight to-green-600 rounded-2xl mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text mb-2">What's your main savings goal?</h2>
              <p className="text-brand-text-muted">Choose your primary financial objective</p>
            </div>

            <RadioGroup
              value={formData.savingsGoal}
              onValueChange={(value) => setFormData({ ...formData, savingsGoal: value })}
              className="space-y-4"
            >
              {savingsGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-200 border-2 rounded-2xl ${
                    formData.savingsGoal === goal.id
                      ? "border-brand-highlight bg-green-50 shadow-medium"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                  onClick={() => setFormData({ ...formData, savingsGoal: goal.id })}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={goal.id} className="mt-1" />
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                          <goal.icon className="h-5 w-5 text-brand-text-muted" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-brand-text">{goal.label}</h3>
                          <p className="text-sm text-brand-text-muted">Target: {goal.target}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mx-auto mb-4">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text mb-2">Pick your budgeting style</h2>
              <p className="text-brand-text-muted">How do you prefer to manage your money?</p>
            </div>

            <RadioGroup
              value={formData.budgetStyle}
              onValueChange={(value) => setFormData({ ...formData, budgetStyle: value })}
              className="space-y-4"
            >
              {budgetStyles.map((style) => (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all duration-200 border-2 rounded-2xl ${
                    formData.budgetStyle === style.id
                      ? "border-brand-primary bg-indigo-50 shadow-medium"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                  onClick={() => setFormData({ ...formData, budgetStyle: style.id })}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <RadioGroupItem value={style.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{style.emoji}</span>
                          <h3 className="font-semibold text-brand-text">{style.title}</h3>
                        </div>
                        <p className="text-brand-text-muted">{style.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </RadioGroup>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-brand-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-indigo-100 text-brand-primary border-indigo-200">
            <Sparkles className="h-4 w-4 mr-1" />
            AI Setup in Progress
          </Badge>
          <h1 className="text-3xl font-bold text-brand-text mb-2">Let's personalize your experience</h1>
          <p className="text-brand-text-muted">
            This will only take a few minutes and helps us create the perfect budget for you
          </p>
        </div>

        {/* AI Assistant Message */}
        <Card className="mb-8 bg-gradient-to-r from-brand-accent/10 to-cyan-50 border-brand-accent/20 rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-brand-text">NeoSave AI</p>
                <p className="text-sm text-brand-text-muted">{aiMessages[aiMessage]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-brand-text-muted">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm font-medium text-brand-text-muted">{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-brand-primary to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white border-0 shadow-medium rounded-2xl mb-8">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded-xl px-6 border-2 border-gray-200 bg-white hover:bg-gray-50 transition-all"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gradient-primary text-white rounded-xl px-6 shadow-soft hover:shadow-medium transition-all"
          >
            {currentStep === steps.length ? "Complete Setup" : "Continue"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                step.id <= currentStep ? "bg-gradient-to-r from-brand-primary to-indigo-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
