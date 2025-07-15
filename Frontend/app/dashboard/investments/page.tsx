import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Lock } from "lucide-react"

const investmentTypes = [
  {
    id: 1,
    title: "Stocks",
    description: "Invest in individual company shares",
    icon: TrendingUp,
    status: "coming_soon",
    features: ["Real-time quotes", "Portfolio tracking", "Research tools"],
  },
  {
    id: 2,
    title: "Cryptocurrency",
    description: "Digital currency investments",
    icon: BarChart3,
    status: "coming_soon",
    features: ["Major cryptocurrencies", "Price alerts", "Market analysis"],
  },
  {
    id: 3,
    title: "Bonds",
    description: "Government and corporate bonds",
    icon: DollarSign,
    status: "coming_soon",
    features: ["Fixed income", "Low risk", "Steady returns"],
  },
  {
    id: 4,
    title: "ETFs",
    description: "Exchange-traded funds",
    icon: TrendingDown,
    status: "coming_soon",
    features: ["Diversified portfolios", "Low fees", "Professional management"],
  },
]

export default function InvestmentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Investments</h1>
        <p className="text-muted-foreground">Grow your wealth with smart investment options</p>
      </div>

      {/* Coming Soon Banner */}
      <Card className="border-primary-200 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-800">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-800 rounded-lg">
              <Lock className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
                Investment Features Coming Soon
              </h3>
              <p className="text-primary-700 dark:text-primary-300">
                We're working hard to bring you comprehensive investment tools. Stay tuned for updates!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {investmentTypes.map((investment) => (
          <Card key={investment.id} className="relative overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <investment.icon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{investment.title}</CardTitle>
                    <CardDescription>{investment.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary">Coming Soon</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {investment.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button disabled className="w-full">
                  Get Notified
                </Button>
              </div>
            </CardContent>

            {/* Overlay for disabled state */}
            <div className="absolute inset-0 bg-background/50 dark:bg-foreground/50 backdrop-blur-[1px]"></div>
          </Card>
        ))}
      </div>

      {/* Educational Content */}
      <Card>
        <CardHeader>
          <CardTitle>Investment Education</CardTitle>
          <CardDescription>Learn the basics while you wait for our investment features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold">Risk vs. Return</h4>
              <p className="text-sm text-muted-foreground">
                Understanding the relationship between investment risk and potential returns is crucial for building a
                balanced portfolio.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Diversification</h4>
              <p className="text-sm text-muted-foreground">
                Spreading investments across different asset classes helps reduce risk and improve long-term returns.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Dollar-Cost Averaging</h4>
              <p className="text-sm text-muted-foreground">
                Investing a fixed amount regularly can help reduce the impact of market volatility on your investments.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
