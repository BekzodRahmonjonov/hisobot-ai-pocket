import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Settings2,
  User,
  Globe,
  DollarSign,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit2,
  Target
} from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const LANGUAGES = [
  { code: "uz", name: "O'zbek" },
  { code: "ru", name: "Русский" },
  { code: "en", name: "English" },
];

const CURRENCIES = [
  { code: "UZS", name: "Uzbek Som", symbol: "so'm" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
];

const Settings = () => {
  const [userProfile, setUserProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+998 90 123 45 67",
    joinedDate: "January 2024"
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "UZS",
    monthlyBudget: "3000000"
  });

  const [notifications, setNotifications] = useState({
    spendAlerts: true,
    budgetReminders: true,
    aiSuggestions: true,
    weeklyReports: false
  });

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);

  const formatCurrency = (amount: string) => {
    if (!amount) return "0";
    return new Intl.NumberFormat('uz-UZ').format(parseInt(amount));
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    action, 
    onClick 
  }: {
    icon: any,
    title: string,
    subtitle?: string,
    action?: React.ReactNode,
    onClick?: () => void
  }) => (
    <div 
      className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium text-sm">{title}</h4>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {action}
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-6 rounded-b-3xl shadow-large">
        <div className="flex items-center gap-3">
          <Settings2 className="w-6 h-6" />
          <div>
            <h1 className="text-xl font-semibold">Settings</h1>
            <p className="text-primary-light">Manage your account & preferences</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <Card className="p-6 shadow-medium">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Profile Information</h3>
            <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    />
                  </div>
                  <Button onClick={() => setIsEditProfileOpen(false)} className="w-full">
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">
                {userProfile.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{userProfile.name}</h4>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              <p className="text-sm text-muted-foreground">{userProfile.phone}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {userProfile.joinedDate}
              </p>
            </div>
          </div>
        </Card>

        {/* App Preferences */}
        <Card className="shadow-medium">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">App Preferences</h3>
          </div>
          
          <div className="divide-y divide-border">
            <SettingItem
              icon={Globe}
              title="Language"
              subtitle={LANGUAGES.find(l => l.code === preferences.language)?.name}
              action={
                <Select 
                  value={preferences.language} 
                  onValueChange={(value) => setPreferences({...preferences, language: value})}
                >
                  <SelectTrigger className="w-24 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              }
            />
            
            <SettingItem
              icon={DollarSign}
              title="Currency"
              subtitle={CURRENCIES.find(c => c.code === preferences.currency)?.name}
              action={
                <Select 
                  value={preferences.currency} 
                  onValueChange={(value) => setPreferences({...preferences, currency: value})}
                >
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              }
            />
            
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Monthly Budget Limit</h4>
                    <p className="text-xs text-muted-foreground">
                      Current: {formatCurrency(preferences.monthlyBudget)} UZS
                    </p>
                  </div>
                </div>
                <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Set Monthly Budget</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Monthly Budget (UZS)</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={preferences.monthlyBudget}
                          onChange={(e) => setPreferences({...preferences, monthlyBudget: e.target.value})}
                        />
                      </div>
                      <Button onClick={() => setIsBudgetDialogOpen(false)} className="w-full">
                        Save Budget
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-medium">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Notifications</h3>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Spending Alerts</h4>
                <p className="text-xs text-muted-foreground">Get notified when you exceed limits</p>
              </div>
              <Switch
                checked={notifications.spendAlerts}
                onCheckedChange={(checked) => setNotifications({...notifications, spendAlerts: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Budget Reminders</h4>
                <p className="text-xs text-muted-foreground">Reminders for planned expenses</p>
              </div>
              <Switch
                checked={notifications.budgetReminders}
                onCheckedChange={(checked) => setNotifications({...notifications, budgetReminders: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">AI Suggestions</h4>
                <p className="text-xs text-muted-foreground">Receive financial insights</p>
              </div>
              <Switch
                checked={notifications.aiSuggestions}
                onCheckedChange={(checked) => setNotifications({...notifications, aiSuggestions: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">Weekly Reports</h4>
                <p className="text-xs text-muted-foreground">Summary of your spending</p>
              </div>
              <Switch
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications({...notifications, weeklyReports: checked})}
              />
            </div>
          </div>
        </Card>

        {/* Support & Security */}
        <Card className="shadow-medium">
          <div className="divide-y divide-border">
            <SettingItem
              icon={Shield}
              title="Privacy & Security"
              subtitle="Manage your data and security settings"
            />
            
            <SettingItem
              icon={HelpCircle}
              title="Help & Support"
              subtitle="Get help or contact support"
            />
            
            <div className="p-4">
              <Button variant="destructive" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Settings;