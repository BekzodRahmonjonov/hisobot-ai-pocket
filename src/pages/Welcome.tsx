import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Languages, Phone, Mail, Chrome } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import heroImage from "@/assets/hero-finance.jpg";

const Welcome = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const { t, changeLanguage, languages, currentLanguage } = useLanguage();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
      setShowAuth(true);
    }
  }, [changeLanguage]);

  const handleLanguageSelect = (langCode: string) => {
    changeLanguage(langCode);
    setTimeout(() => setShowAuth(true), 300);
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
        <motion.div 
          className="w-full max-w-md space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <motion.div 
            className="text-center space-y-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <motion.div 
              className="w-32 h-32 mx-auto rounded-2xl overflow-hidden shadow-large"
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <img src={heroImage} alt="Hisobot AI" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-foreground mb-2">{t('welcome')}</h1>
              <p className="text-muted-foreground">{t('subtitle')}</p>
            </motion.div>
          </motion.div>

          {/* Language Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-6 shadow-medium border border-primary/10 bg-card/80 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-foreground">
                  <Languages className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{t('selectLanguage')}</h3>
                </div>
                <div className="space-y-3">
                  {languages.map((lang, index) => (
                    <motion.div
                      key={lang.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={currentLanguage === lang.code ? "default" : "outline"}
                        className="w-full justify-start transition-all duration-300 hover:shadow-soft"
                        onClick={() => handleLanguageSelect(lang.code)}
                      >
                        <span className="text-lg mr-3">{lang.flag}</span>
                        {lang.name}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-background flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-md space-y-8"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-foreground">{t('welcome')}</h2>
          <p className="text-muted-foreground">{t('subtitle')}</p>
        </motion.div>

        {/* Auth Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 shadow-medium border border-primary/10 bg-card/90 backdrop-blur-sm">
            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full bg-gradient-telegram hover:opacity-90 transition-all duration-300 shadow-soft"
                  onClick={() => handleAuth("phone")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {t('loginWithPhone')}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full transition-all duration-300 hover:shadow-soft"
                  onClick={() => handleAuth("email")}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {t('loginWithEmail')}
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="w-full transition-all duration-300 hover:shadow-soft"
                  onClick={() => handleAuth("google")}
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  {t('loginWithGoogle')}
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;