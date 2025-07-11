import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  Calendar,
  Mic,
  Filter,
  Search,
  MoreVertical,
  Edit2,
  Trash2
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { cn } from "@/lib/utils";

const categories = {
  expense: [
    "Food & Drinks", "Transport", "Shopping", "Entertainment", 
    "Bills", "Healthcare", "Education", "Travel", "Other"
  ],
  income: [
    "Salary", "Business", "Freelance", "Investment", 
    "Gift", "Bonus", "Refund", "Other"
  ]
};

const mockTransactions = [
  {
    id: 1,
    type: "expense",
    amount: 25000,
    category: "Food & Drinks",
    date: "2024-01-15",
    notes: "Lunch at restaurant",
    status: "completed"
  },
  {
    id: 2,
    type: "income",
    amount: 3500000,
    category: "Salary",
    date: "2024-01-01",
    notes: "Monthly salary",
    status: "completed"
  },
  {
    id: 3,
    type: "debt",
    amount: 100000,
    category: "I borrowed",
    person: "John Smith",
    date: "2024-01-10",
    dueDate: "2024-02-10",
    status: "unpaid"
  },
  {
    id: 4,
    type: "expense",
    amount: 15000,
    category: "Transport",
    date: "2024-01-14",
    notes: "Taxi fare",
    status: "completed"
  }
];

const AddTransaction = () => {
  const [activeTab, setActiveTab] = useState("expense");
  const [historyFilter, setHistoryFilter] = useState("all");
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    notes: "",
    person: "",
    dueDate: "",
    debtType: "borrowed",
    reminder: false
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  const handleSubmit = () => {
    console.log("Submitting transaction:", { ...formData, type: activeTab });
    // Reset form
    setFormData({
      amount: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      notes: "",
      person: "",
      dueDate: "",
      debtType: "borrowed",
      reminder: false
    });
  };

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (historyFilter === "all") return true;
    return transaction.type === historyFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl shadow-large">
        <h1 className="text-xl font-semibold mb-2">Add Transaction</h1>
        <p className="text-primary-light">Log your financial activities</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Add Transaction Form */}
        <Card className="p-6 shadow-medium">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="expense" className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Expense
              </TabsTrigger>
              <TabsTrigger value="income" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Income
              </TabsTrigger>
              <TabsTrigger value="debt" className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Debt
              </TabsTrigger>
            </TabsList>

            <TabsContent value="expense" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="text-lg font-semibold pr-20"
                  />
                  <span className="absolute right-3 top-3 text-muted-foreground">UZS</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.expense.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <div className="relative">
                  <Textarea
                    id="notes"
                    placeholder="Add a note (optional)"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-muted-foreground"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button variant="expense" className="w-full" onClick={handleSubmit}>
                Add Expense
              </Button>
            </TabsContent>

            <TabsContent value="income" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income-amount">Amount</Label>
                <div className="relative">
                  <Input
                    id="income-amount"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="text-lg font-semibold pr-20"
                  />
                  <span className="absolute right-3 top-3 text-muted-foreground">UZS</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Source</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.income.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income-date">Date</Label>
                <Input
                  id="income-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="income-notes">Notes</Label>
                <div className="relative">
                  <Textarea
                    id="income-notes"
                    placeholder="Add a note (optional)"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 text-muted-foreground"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button variant="income" className="w-full" onClick={handleSubmit}>
                Add Income
              </Button>
            </TabsContent>

            <TabsContent value="debt" className="space-y-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Tabs 
                  value={formData.debtType} 
                  onValueChange={(value) => setFormData({...formData, debtType: value})}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="borrowed">I borrowed</TabsTrigger>
                    <TabsTrigger value="gave">I gave</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label htmlFor="debt-amount">Amount</Label>
                <div className="relative">
                  <Input
                    id="debt-amount"
                    type="number"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="text-lg font-semibold pr-20"
                  />
                  <span className="absolute right-3 top-3 text-muted-foreground">UZS</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="person">Person's Name</Label>
                <Input
                  id="person"
                  placeholder="Enter name"
                  value={formData.person}
                  onChange={(e) => setFormData({...formData, person: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>

              <Button variant="debt" className="w-full" onClick={handleSubmit}>
                Add Debt
              </Button>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Transaction History */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Transaction History</h3>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Tabs value={historyFilter} onValueChange={setHistoryFilter} className="w-full mb-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="expense">Expenses</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="debt">Debts</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/50 transition-colors"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  transaction.type === "expense" && "bg-expense/10",
                  transaction.type === "income" && "bg-income/10",
                  transaction.type === "debt" && "bg-debt/10"
                )}>
                  {transaction.type === "expense" && <TrendingDown className="w-5 h-5 text-expense" />}
                  {transaction.type === "income" && <TrendingUp className="w-5 h-5 text-income" />}
                  {transaction.type === "debt" && <Wallet className="w-5 h-5 text-debt" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">
                      {transaction.type === "debt" ? transaction.person : transaction.category}
                    </h4>
                    <span className={cn(
                      "font-semibold",
                      transaction.type === "expense" && "text-expense",
                      transaction.type === "income" && "text-income",
                      transaction.type === "debt" && "text-debt"
                    )}>
                      {transaction.type === "expense" && "-"}
                      {transaction.type === "income" && "+"}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">
                      {transaction.notes || transaction.category}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                      {transaction.type === "debt" && (
                        <Badge 
                          variant={transaction.status === "paid" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AddTransaction;