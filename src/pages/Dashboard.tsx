import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  ShoppingCart,
  Plus,
  AlertTriangle,
  Lightbulb,
  Eye,
  EyeOff
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { cn } from "@/lib/utils";

// Mock data
const mockData = {
  balance: 1250000,
  income: 3500000,
  expenses: 2250000,
  topCategory: "Food & Drinks",
  categoryAmount: 850000,
  currency: "UZS",
  currencySymbol: "so'm"
};

const expenseCategories = [
  { name: "Food & Drinks", amount: 850000, color: "bg-expense", percentage: 38 },
  { name: "Transport", amount: 420000, color: "bg-debt", percentage: 19 },
  { name: "Shopping", amount: 380000, color: "bg-primary", percentage: 17 },
  { name: "Entertainment", amount: 300000, color: "bg-income", percentage: 13 },
  { name: "Bills", amount: 300000, color: "bg-muted-foreground", percentage: 13 },
];

const aiRecommendations = [
  {
    type: "warning",
    title: "High transport spending",
    message: "You've spent 40% more on transport this month",
    action: "View details"
  },
  {
    type: "info",
    title: "Daily spending limit",
    message: "Your balance is 1,250,000 UZS — consider spending max 15,000 per day",
    action: "Set reminder"
  },
  {
    type: "reminder",
    title: "Rent reminder",
    message: "Rent is due tomorrow (1,200,000 UZS)",
    action: "Mark as paid"
  }
];

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState("daily");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl shadow-large">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Good morning!</h1>
            <p className="text-primary-light">Here's your financial overview</p>
          </div>
          <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
            <span className="font-bold text-primary">A</span>
          </div>
        </div>

        {/* Balance Card */}
        <Card className="bg-card/10 backdrop-blur-sm border-primary-light/20 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-primary-light text-sm">Total Balance</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBalance(!showBalance)}
              className="text-primary-light hover:bg-primary-light/20"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </Button>
          </div>
          <div className="text-3xl font-bold mb-4">
            {showBalance ? `${formatCurrency(mockData.balance)} ${mockData.currencySymbol}` : "••••••"}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-income-light mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Income</span>
              </div>
              <div className="font-semibold">
                {showBalance ? `${formatCurrency(mockData.income)}` : "••••••"}
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-expense-light mb-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">Expenses</span>
              </div>
              <div className="font-semibold">
                {showBalance ? `${formatCurrency(mockData.expenses)}` : "••••••"}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Spending Category</p>
                <p className="font-semibold text-lg">{mockData.topCategory}</p>
                <p className="text-sm text-expense">
                  {formatCurrency(mockData.categoryAmount)} {mockData.currencySymbol}
                </p>
              </div>
              <div className="w-12 h-12 bg-expense/10 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-expense" />
              </div>
            </div>
          </Card>
        </div>

        {/* Expense Chart */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Expenses by Category</h3>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
                <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="space-y-3">
            {expenseCategories.map((category, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={cn("w-3 h-3 rounded-full", category.color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium truncate">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(category.amount)}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={cn("h-2 rounded-full", category.color)}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {category.percentage}%
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">AI Insights & Recommendations</h3>
          </div>
          
          <div className="space-y-3">
            {aiRecommendations.map((rec, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-xl border-l-4",
                  rec.type === "warning" && "bg-expense-light/10 border-expense",
                  rec.type === "info" && "bg-primary-light/10 border-primary",
                  rec.type === "reminder" && "bg-debt-light/10 border-debt"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{rec.message}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    {rec.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 shadow-soft">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            <Button variant="income" className="flex-col h-auto py-4">
              <Plus className="w-5 h-5 mb-2" />
              <span className="text-xs">Add Income</span>
            </Button>
            <Button variant="expense" className="flex-col h-auto py-4">
              <TrendingDown className="w-5 h-5 mb-2" />
              <span className="text-xs">Add Expense</span>
            </Button>
            <Button variant="debt" className="flex-col h-auto py-4">
              <Wallet className="w-5 h-5 mb-2" />
              <span className="text-xs">Add Debt</span>
            </Button>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;