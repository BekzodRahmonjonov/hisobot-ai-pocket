import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Languages, Phone, Mail, Chrome } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

const LANGUAGES = [
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

const Welcome = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setShowAuth(true);
  };

  const handleAuth = (method: string) => {
    // For demo purposes, we'll simulate authentication
    console.log(`Authenticating with ${method}`);
    // Check if user is new (simulate first-time user)
    const isNewUser = Math.random() > 0.5; // 50% chance for demo
    
    if (isNewUser) {
      navigate("/onboarding");
    } else {
      navigate("/dashboard");
    }
  };

  if (!showAuth) {
    return (
      <div className="min-h-screen bg-gradient-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-large">
              <img src={heroImage} alt="Hisobot AI" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Hisobot AI</h1>
              <p className="text-muted-foreground">Your Personal Finance Assistant</p>
            </div>
          </div>

          {/* Language Selection */}
          <Card className="p-6 shadow-medium">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <Languages className="w-5 h-5" />
                <h3 className="font-semibold">Choose your language</h3>
              </div>
              <div className="space-y-3">
                {LANGUAGES.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={selectedLanguage === lang.code ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => handleLanguageSelect(lang.code)}
                  >
                    <span className="text-lg mr-3">{lang.flag}</span>
                    {lang.name}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
          <p className="text-muted-foreground">Sign in to continue</p>
        </div>

        {/* Auth Methods */}
        <Card className="p-6 shadow-medium">
          <div className="space-y-4">
            <Button
              variant="hero"
              className="w-full"
              onClick={() => handleAuth("phone")}
            >
              <Phone className="w-5 h-5" />
              Continue with Phone
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAuth("email")}
            >
              <Mail className="w-5 h-5" />
              Continue with Email
            </Button>
            
            <Button
              variant="soft"
              className="w-full"
              onClick={() => handleAuth("google")}
            >
              <Chrome className="w-5 h-5" />
              Continue with Google
            </Button>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;