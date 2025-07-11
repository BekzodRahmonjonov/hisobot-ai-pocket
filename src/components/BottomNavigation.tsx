import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart3, Plus, Calendar, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Add", href: "/add", icon: Plus },
  { name: "Planned", href: "/planned", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-large">
      <div className="grid grid-cols-5 h-16">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all duration-200",
                isActive && "bg-primary/10",
                item.name === "Add" && "bg-primary text-primary-foreground shadow-medium"
              )}>
                <Icon className={cn(
                  "w-5 h-5",
                  item.name === "Add" && "text-primary-foreground"
                )} />
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;