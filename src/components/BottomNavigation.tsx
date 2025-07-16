import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart3, Plus, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navigation = [
    { name: t('home'), href: "/dashboard", icon: Home },
    { name: t('analytics'), href: "/analytics", icon: BarChart3 },
    { name: t('add'), href: "/add", icon: Plus },
    { name: t('planned'), href: "/planned", icon: Calendar },
    { name: t('settings'), href: "/settings", icon: Settings },
  ];

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-primary/10 shadow-large"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="grid grid-cols-5 h-16">
        {navigation.map((item, index) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          const isAddButton = item.href === "/add";
          
          return (
            <motion.button
              key={item.name}
              onClick={() => navigate(item.href)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div 
                className={cn(
                  "p-1.5 rounded-xl transition-all duration-300",
                  isActive && !isAddButton && "bg-primary/10 scale-110",
                  isAddButton && "bg-gradient-telegram text-primary-foreground shadow-glow scale-110"
                )}
                animate={isActive && !isAddButton ? { y: -2 } : { y: 0 }}
                whileHover={isAddButton ? { rotate: 90 } : {}}
              >
                <Icon className={cn(
                  "w-5 h-5 transition-colors duration-300",
                  isAddButton && "text-primary-foreground"
                )} />
              </motion.div>
              <span className={cn(
                "text-xs font-medium transition-all duration-300",
                isActive && "scale-105"
              )}>
                {item.name}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default BottomNavigation;