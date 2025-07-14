import { Card, CardContent } from "@/components/ui/card"
import { Brain, PiggyBank, TrendingUp, Building2 } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Smart Budgeting",
    description: "AI-powered budget recommendations that adapt to your spending patterns and financial goals.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: PiggyBank,
    title: "AI Savings Planner",
    description: "Intelligent savings strategies that automatically optimize your money for maximum growth.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: TrendingUp,
    title: "Investment Insights",
    description: "Get personalized investment recommendations based on your risk profile and market analysis.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Building2,
    title: "Bank Comparison",
    description: "Compare rates, fees, and benefits across multiple banks to find the best deals for you.",
    gradient: "from-orange-500 to-red-500",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}
              Smart Finance
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how NeoSave's cutting-edge AI technology can transform your financial management experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm"
            >
              <CardContent className="p-8 text-center">
                <div
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
