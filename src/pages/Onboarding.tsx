import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { User, Globe, DollarSign, Target, CheckCircle } from "lucide-react";

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

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    language: "",
    currency: "",
    monthlyBudget: "",
  });
  const navigate = useNavigate();

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <User className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">What's your name?</h2>
              <p className="text-muted-foreground">Help us personalize your experience</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Globe className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Choose your language</h2>
              <p className="text-muted-foreground">Select your preferred language</p>
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select value={formData.language} onValueChange={(value) => updateFormData("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <DollarSign className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Default currency</h2>
              <p className="text-muted-foreground">Choose your main currency</p>
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={formData.currency} onValueChange={(value) => updateFormData("currency", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Target className="w-12 h-12 text-primary mx-auto" />
              <h2 className="text-2xl font-bold">Monthly budget</h2>
              <p className="text-muted-foreground">Set a monthly spending limit (optional)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget</Label>
              <Input
                id="budget"
                type="number"
                placeholder="Enter amount"
                value={formData.monthlyBudget}
                onChange={(e) => updateFormData("monthlyBudget", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">You can change this later in settings</p>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-income mx-auto" />
              <h2 className="text-2xl font-bold">You're all set!</h2>
              <p className="text-muted-foreground">Let's start managing your money</p>
            </div>
            <div className="bg-card-soft rounded-xl p-4 space-y-3">
              <h3 className="font-semibold">Your Profile</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name:</span>
                  <span>{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span>{LANGUAGES.find(l => l.code === formData.language)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Currency:</span>
                  <span>{CURRENCIES.find(c => c.code === formData.currency)?.name}</span>
                </div>
                {formData.monthlyBudget && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Budget:</span>
                    <span>{formData.monthlyBudget} {CURRENCIES.find(c => c.code === formData.currency)?.symbol}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background flex flex-col">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold">Setup your account</h1>
          <span className="text-sm text-muted-foreground">{step} of {totalSteps}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Content */}
      <div className="flex-1 px-6">
        <Card className="p-6 shadow-medium">
          {renderStep()}
        </Card>
      </div>

      {/* Footer */}
      <div className="p-6 pt-4">
        <div className="flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              Back
            </Button>
          )}
          <Button
            variant={step === totalSteps ? "hero" : "default"}
            onClick={handleNext}
            className="flex-1"
            disabled={
              (step === 1 && !formData.fullName) ||
              (step === 2 && !formData.language) ||
              (step === 3 && !formData.currency)
            }
          >
            {step === totalSteps ? "Get Started" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;