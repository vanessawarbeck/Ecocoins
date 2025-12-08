import { Home, Target, Leaf, Gift, User, BarChart3, Users, Newspaper } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface BottomNavProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  const navItems: { id: Page; icon: any; label: string }[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "newsfeed", icon: Newspaper, label: "News" },
    { id: "challenges", icon: Target, label: "Challenges" },
    { id: "actions", icon: Leaf, label: "Aktionen" },
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "community", icon: Users, label: "Community" },
    { id: "rewards", icon: Gift, label: "Rewards" },
    { id: "profile", icon: User, label: "Profil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-emerald-100 shadow-lg z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-emerald-50"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex flex-col items-center">
                <Icon
                  className={`w-5 h-5 mb-1 transition-colors ${
                    isActive ? "text-emerald-600" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-xs transition-colors ${
                    isActive ? "text-emerald-600" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}