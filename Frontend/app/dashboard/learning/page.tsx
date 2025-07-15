import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, Clock, Star, Lock, CheckCircle } from "lucide-react"

const learningModules = [
  {
    id: 1,
    title: "Budgeting Basics",
    description: "Learn the fundamentals of creating and maintaining a budget",
    duration: "15 min",
    difficulty: "Beginner",
    progress: 100,
    status: "completed",
    badge: "Budget Master",
    lessons: 5,
  },
  {
    id: 2,
    title: "Emergency Fund Planning",
    description: "Build a safety net for unexpected expenses",
    duration: "20 min",
    difficulty: "Beginner",
    progress: 60,
    status: "in_progress",
    badge: null,
    lessons: 4,
  },
  {
    id: 3,
    title: "Investment Fundamentals",
    description: "Understanding stocks, bonds, and portfolio diversification",
    duration: "30 min",
    difficulty: "Intermediate",
    progress: 0,
    status: "locked",
    badge: "Investor",
    lessons: 8,
  },
  {
    id: 4,
    title: "Tax Optimization",
    description: "Strategies to minimize your tax burden legally",
    duration: "25 min",
    difficulty: "Advanced",
    progress: 0,
    status: "locked",
    badge: "Tax Saver",
    lessons: 6,
  },
  {
    id: 5,
    title: "Retirement Planning",
    description: "Plan for a comfortable retirement with smart strategies",
    duration: "35 min",
    difficulty: "Intermediate",
    progress: 0,
    status: "locked",
    badge: "Future Planner",
    lessons: 7,
  },
  {
    id: 6,
    title: "Credit Score Mastery",
    description: "Improve and maintain an excellent credit score",
    duration: "18 min",
    difficulty: "Beginner",
    progress: 25,
    status: "available",
    badge: "Credit Expert",
    lessons: 4,
  },
]

const achievements = [
  { id: 1, title: "First Budget Created", description: "Created your first monthly budget", earned: true },
  { id: 2, title: "Goal Setter", description: "Set your first savings goal", earned: true },
  { id: 3, title: "Transaction Tracker", description: "Logged 50 transactions", earned: true },
  { id: 4, title: "Budget Master", description: "Completed budgeting basics course", earned: true },
  { id: 5, title: "Savings Streak", description: "Saved money for 30 consecutive days", earned: false },
  { id: 6, title: "Investment Ready", description: "Completed investment fundamentals", earned: false },
]

export default function LearningPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-accent-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-primary-500" />
      case "locked":
        return <Lock className="h-5 w-5 text-muted-foreground" />
      default:
        return <BookOpen className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200"
      case "Intermediate":
        return "bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200"
      case "Advanced":
        return "bg-destructive-100 text-destructive-800 dark:bg-destructive-900 dark:text-destructive-200"
      default:
        return "bg-muted text-foreground dark:bg-muted-foreground dark:text-background"
    }
  }

  const completedModules = learningModules.filter((module) => module.status === "completed").length
  const totalProgress = learningModules.reduce((sum, module) => sum + module.progress, 0) / learningModules.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Financial Learning</h1>
        <p className="text-muted-foreground">Expand your financial knowledge with interactive lessons</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedModules}</div>
            <p className="text-xs text-muted-foreground">of {learningModules.length} modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProgress.toFixed(0)}%</div>
            <Progress value={totalProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.filter((achievement) => achievement.earned).length}</div>
            <p className="text-xs text-muted-foreground">of {achievements.length} available</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Modules */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Learning Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningModules.map((module) => (
            <Card key={module.id} className={`relative ${module.status === "locked" ? "opacity-60" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(module.status)}
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{module.lessons} lessons</span>
                  <span>{module.duration}</span>
                </div>

                {module.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} />
                  </div>
                )}

                <Button
                  className="w-full"
                  disabled={module.status === "locked"}
                  variant={module.status === "completed" ? "outline" : "default"}
                >
                  {module.status === "completed"
                    ? "Review"
                    : module.status === "in_progress"
                      ? "Continue"
                      : module.status === "locked"
                        ? "Locked"
                        : "Start Learning"}
                </Button>

                {module.badge && module.status === "completed" && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-accent-500">
                    <Award className="h-4 w-4" />
                    <span>Badge earned: {module.badge}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <Card
              key={achievement.id}
              className={`${achievement.earned ? "border-accent-200 bg-accent-50 dark:bg-accent-900/20" : "opacity-60"}`}
            >
              <CardContent className="pt-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${achievement.earned ? "bg-accent-100 dark:bg-accent-800" : "bg-muted"}`}
                  >
                    <Award
                      className={`h-5 w-5 ${achievement.earned ? "text-accent-600 dark:text-accent-400" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
