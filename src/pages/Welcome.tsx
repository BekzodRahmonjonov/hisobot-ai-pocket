import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Languages, Phone, ArrowLeft } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

const LANGUAGES = [
  { code: "uz", name: "O'zbek", flag: "🇺🇿" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

const Welcome = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [showAuth, setShowAuth] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    setShowAuth(true);
  };

  const handleSendOTP = () => {
    if (phoneNumber.length > 8) {
      // Simulate sending OTP
      console.log(`Sending OTP to ${phoneNumber}`);
      setShowOTP(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otpValue.length === 6) {
      // For demo purposes, we'll simulate authentication
      console.log(`Verifying OTP: ${otpValue}`);
      // Check if user is new (simulate first-time user)
      const isNewUser = Math.random() > 0.5; // 50% chance for demo
      
      if (isNewUser) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    }
  };

  const handleBack = () => {
    if (showOTP) {
      setShowOTP(false);
      setOtpValue("");
    } else {
      setShowAuth(false);
      setPhoneNumber("");
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

  if (showOTP) {
    return (
      <div className="min-h-screen bg-gradient-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Enter verification code</h2>
              <p className="text-muted-foreground">
                We sent a 6-digit code to {phoneNumber}
              </p>
            </div>
          </div>

          {/* OTP Input */}
          <Card className="p-6 shadow-medium">
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  value={otpValue}
                  onChange={setOtpValue}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button
                variant="hero"
                className="w-full"
                onClick={handleVerifyOTP}
                disabled={otpValue.length !== 6}
              >
                Verify Code
              </Button>
              
              <div className="text-center">
                <Button variant="ghost" size="sm" className="text-primary">
                  Resend code
                </Button>
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
        <div className="space-y-4">
          {showAuth && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              {showAuth ? "Enter your phone number" : "Welcome!"}
            </h2>
            <p className="text-muted-foreground">
              {showAuth ? "We'll send you a verification code" : "Sign in to continue"}
            </p>
          </div>
        </div>

        {/* Phone Input or Auth Button */}
        <Card className="p-6 shadow-medium">
          {showAuth ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="+998 XX XXX XX XX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="text-center"
                />
              </div>
              <Button
                variant="hero"
                className="w-full"
                onClick={handleSendOTP}
                disabled={phoneNumber.length < 9}
              >
                <Phone className="w-5 h-5" />
                Send verification code
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                variant="hero"
                className="w-full"
                onClick={() => setShowAuth(true)}
              >
                <Phone className="w-5 h-5" />
                Continue with Phone
              </Button>
            </div>
          )}
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