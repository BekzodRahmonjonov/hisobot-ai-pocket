import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  AlertCircle
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { cn } from "@/lib/utils";

const mockData = {
  periods: {
    daily: { income: 116667, expenses: 75000, savings: 41667 },
    weekly: { income: 816667, expenses: 525000, savings: 291667 },
    monthly: { income: 3500000, expenses: 2250000, savings: 1250000 },
    quarterly: { income: 10500000, expenses: 6750000, savings: 3750000 },
    yearly: { income: 42000000, expenses: 27000000, savings: 15000000 }
  },
  topCategories: [
    { name: "Food & Drinks", amount: 850000, percentage: 38, trend: "up" },
    { name: "Transport", amount: 420000, percentage: 19, trend: "up" },
    { name: "Shopping", amount: 380000, percentage: 17, trend: "down" },
    { name: "Entertainment", amount: 300000, percentage: 13, trend: "stable" },
    { name: "Bills", amount: 300000, percentage: 13, trend: "stable" }
  ],
  insights: [
    {
      type: "optimization",
      title: "Budget Optimization",
      message: "If you cut food spending by 15%, you can save 127,500 UZS this month",
      impact: "positive",
      action: "View suggestions"
    },
    {
      type: "alert",
      title: "Overspending Alert",
      message: "You've exceeded your transport budget by 25% this month",
      impact: "negative",
      action: "Set limit"
    },
    {
      type: "achievement",
      title: "Savings Goal",
      message: "Great! You're 80% closer to your monthly savings target",
      impact: "positive",
      action: "View progress"
    },
    {
      type: "reminder",
      title: "Budget Review",
      message: "Consider reviewing your monthly budget allocation",
      impact: "neutral",
      action: "Review now"
    }
  ]
};

const Analytics = () => {
  const [activePeriod, setActivePeriod] = useState("monthly");
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  const currentData = mockData.periods[activePeriod as keyof typeof mockData.periods];

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl shadow-large">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6" />
          <div>
            <h1 className="text-xl font-semibold">Analytics</h1>
            <p className="text-primary-light">Your financial insights</p>
          </div>
        </div>

        {/* Period Selector */}
        <Tabs value={activePeriod} onValueChange={setActivePeriod} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-primary-light/20">
            <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
            <TabsTrigger value="quarterly" className="text-xs">Quarterly</TabsTrigger>
            <TabsTrigger value="yearly" className="text-xs">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 shadow-soft">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-income mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-medium">Income</span>
              </div>
              <div className="font-bold text-sm">
                {formatCurrency(currentData.income)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">UZS</div>
            </div>
          </Card>

          <Card className="p-4 shadow-soft">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-expense mb-2">
                <TrendingDown className="w-4 h-4" />
                <span className="text-xs font-medium">Expenses</span>
              </div>
              <div className="font-bold text-sm">
                {formatCurrency(currentData.expenses)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">UZS</div>
            </div>
          </Card>

          <Card className="p-4 shadow-soft">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-2">
                <Target className="w-4 h-4" />
                <span className="text-xs font-medium">Savings</span>
              </div>
              <div className="font-bold text-sm">
                {formatCurrency(currentData.savings)}
              </div>
              <div className="text-xs text-muted-foreground mt-1">UZS</div>
            </div>
          </Card>
        </div>

        {/* Spending vs Income Chart */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Spending vs Income</h3>
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
          </div>
          
          {/* Simple visual representation */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Income</span>
                <span className="text-sm font-medium">{formatCurrency(currentData.income)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-income h-3 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Expenses</span>
                <span className="text-sm font-medium">{formatCurrency(currentData.expenses)}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-gradient-expense h-3 rounded-full" 
                  style={{ width: `${(currentData.expenses / currentData.income) * 100}%` }} 
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Net Savings</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-income">
                    +{formatCurrency(currentData.savings)}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-income" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Top 5 Categories */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top 5 Categories This Month</h3>
            <PieChart className="w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-3">
            {mockData.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{category.name}</h4>
                    <p className="text-xs text-muted-foreground">{category.percentage}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">
                    {formatCurrency(category.amount)}
                  </div>
                  <div className="flex items-center gap-1">
                    {category.trend === "up" && <ArrowUpRight className="w-3 h-3 text-expense" />}
                    {category.trend === "down" && <ArrowDownRight className="w-3 h-3 text-income" />}
                    <span className={cn(
                      "text-xs",
                      category.trend === "up" && "text-expense",
                      category.trend === "down" && "text-income",
                      category.trend === "stable" && "text-muted-foreground"
                    )}>
                      {category.trend === "stable" ? "stable" : "15%"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">AI Insights</h3>
          </div>
          
          <div className="space-y-4">
            {mockData.insights.map((insight, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-xl border-l-4",
                  insight.impact === "positive" && "bg-income-light/10 border-income",
                  insight.impact === "negative" && "bg-expense-light/10 border-expense",
                  insight.impact === "neutral" && "bg-primary-light/10 border-primary"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          insight.type === "optimization" && "border-income text-income",
                          insight.type === "alert" && "border-expense text-expense",
                          insight.type === "achievement" && "border-primary text-primary",
                          insight.type === "reminder" && "border-muted-foreground text-muted-foreground"
                        )}
                      >
                        {insight.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{insight.message}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs shrink-0">
                    {insight.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Analytics;