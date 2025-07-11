import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Calendar,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Edit2,
  Trash2,
  Bell
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { cn } from "@/lib/utils";

const mockPlannedItems = [
  {
    id: 1,
    title: "Rent",
    amount: 1200000,
    category: "Bills",
    frequency: "monthly",
    nextDate: "2024-02-01",
    reminder: true,
    status: "upcoming",
    dayOfMonth: 1
  },
  {
    id: 2,
    title: "Salary",
    amount: 3500000,
    category: "Income",
    frequency: "monthly",
    nextDate: "2024-02-01",
    reminder: false,
    status: "upcoming",
    dayOfMonth: 1,
    type: "income"
  },
  {
    id: 3,
    title: "Gym Membership",
    amount: 150000,
    category: "Healthcare",
    frequency: "monthly",
    nextDate: "2024-02-15",
    reminder: true,
    status: "upcoming",
    dayOfMonth: 15
  },
  {
    id: 4,
    title: "Coffee with friends",
    amount: 50000,
    category: "Entertainment",
    frequency: "weekly",
    nextDate: "2024-01-20",
    reminder: false,
    status: "overdue",
    dayOfWeek: 6
  },
  {
    id: 5,
    title: "Groceries",
    amount: 300000,
    category: "Food & Drinks",
    frequency: "weekly",
    nextDate: "2024-01-22",
    reminder: true,
    status: "upcoming",
    dayOfWeek: 1
  }
];

const Planned = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    frequency: "monthly",
    dayOfMonth: "1",
    dayOfWeek: "1",
    reminder: true,
    type: "expense"
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ').format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "text-primary";
      case "overdue": return "text-expense";
      case "completed": return "text-income";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-primary/10";
      case "overdue": return "bg-expense/10";
      case "completed": return "bg-income/10";
      default: return "bg-muted";
    }
  };

  const handleSubmit = () => {
    console.log("Creating planned item:", formData);
    setIsDialogOpen(false);
    setFormData({
      title: "",
      amount: "",
      category: "",
      frequency: "monthly",
      dayOfMonth: "1",
      dayOfWeek: "1",
      reminder: true,
      type: "expense"
    });
  };

  const markAsPaid = (id: number) => {
    console.log("Marking as paid:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl shadow-large">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-semibold">Planned</h1>
              <p className="text-primary-light">Budget planning & reminders</p>
            </div>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="icon" className="bg-primary-light/20 hover:bg-primary-light/30">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Planned Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Rent, Salary, Groceries"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-3 text-muted-foreground text-sm">UZS</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bills">Bills</SelectItem>
                      <SelectItem value="Food & Drinks">Food & Drinks</SelectItem>
                      <SelectItem value="Transport">Transport</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(value) => setFormData({...formData, frequency: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.frequency === "monthly" && (
                  <div className="space-y-2">
                    <Label>Day of Month</Label>
                    <Select value={formData.dayOfMonth} onValueChange={(value) => setFormData({...formData, dayOfMonth: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({length: 31}, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Label htmlFor="reminder">Enable reminder</Label>
                  <Switch
                    id="reminder"
                    checked={formData.reminder}
                    onCheckedChange={(checked) => setFormData({...formData, reminder: checked})}
                  />
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={!formData.title || !formData.amount || !formData.category}
                >
                  Add Planned Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 shadow-soft">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-expense mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Upcoming</span>
              </div>
              <div className="font-bold text-lg">4</div>
              <div className="text-xs text-muted-foreground">This month</div>
            </div>
          </Card>

          <Card className="p-4 shadow-soft">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-primary mb-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-medium">Completed</span>
              </div>
              <div className="font-bold text-lg">12</div>
              <div className="text-xs text-muted-foreground">This month</div>
            </div>
          </Card>
        </div>

        {/* Planned Items List */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">All Planned Items</h3>
            <Badge variant="outline">{mockPlannedItems.length} items</Badge>
          </div>
          
          <div className="space-y-3">
            {mockPlannedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  getStatusBg(item.status)
                )}>
                  {item.status === "upcoming" && <Clock className={cn("w-5 h-5", getStatusColor(item.status))} />}
                  {item.status === "overdue" && <AlertCircle className={cn("w-5 h-5", getStatusColor(item.status))} />}
                  {item.status === "completed" && <CheckCircle className={cn("w-5 h-5", getStatusColor(item.status))} />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <span className={cn(
                      "font-semibold text-sm",
                      item.type === "income" ? "text-income" : "text-expense"
                    )}>
                      {item.type === "income" ? "+" : "-"}{formatCurrency(item.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.frequency}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.category}
                      </span>
                      {item.reminder && (
                        <Bell className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Next: {new Date(item.nextDate).toLocaleDateString()}
                      </span>
                      <Badge 
                        variant={item.status === "overdue" ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {item.status === "upcoming" && (
                    <Button
                      variant="soft"
                      size="sm"
                      onClick={() => markAsPaid(item.id)}
                      className="text-xs"
                    >
                      Mark Paid
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <MoreVertical className="w-4 h-4" />
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

export default Planned;