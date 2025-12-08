import { motion, AnimatePresence } from "motion/react";
import { Home, Target, Leaf, Gift, User, BarChart3, Users, Newspaper, X, Menu, Coins } from "lucide-react";
import { useLanguage } from "../utils/LanguageContext";
import type { Page } from "../App";

interface MobileSidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileSidebar({ currentPage, onPageChange, isOpen, onToggle }: MobileSidebarProps) {
  const { t } = useLanguage();
  
  const navItems: { id: Page; icon: any; label: string; description: string }[] = [
    { id: "home", icon: Home, label: t.nav.home, description: t.language === "de" ? "Übersicht & Quick Actions" : "Overview & Quick Actions" },
    { id: "newsfeed", icon: Newspaper, label: t.nav.newsfeed, description: "Campus News & Updates" },
    { id: "challenges", icon: Target, label: t.nav.challenges, description: t.language === "de" ? "Wöchentliche Herausforderungen" : "Weekly Challenges" },
    { id: "dashboard", icon: BarChart3, label: t.nav.dashboard, description: t.language === "de" ? "Statistiken & Impact" : "Statistics & Impact" },
    { id: "community", icon: Users, label: t.nav.community, description: t.language === "de" ? "Rankings & Freunde" : "Rankings & Friends" },
    { id: "rewards", icon: Gift, label: t.nav.rewards, description: t.language === "de" ? "Punkte einlösen" : "Redeem Points" },
    { id: "profile", icon: User, label: t.nav.profile, description: t.language === "de" ? "Einstellungen & Badges" : "Settings & Badges" },
  ];

  const handleNavClick = (page: Page) => {
    onPageChange(page);
    onToggle(); // Close sidebar after navigation
  };

  return (
    <>
      {/* Header with Hamburger Menu */}
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-4 py-3 flex items-center justify-between z-40 shadow-lg">
        <button
          onClick={onToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-2">
          <Coins className="w-6 h-6 text-yellow-300" />
          <span className="text-lg">Eco Coins</span>
        </div>
        
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 z-40"
            style={{ top: '56px' }} // Below header
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 bg-white shadow-2xl z-50 w-80 max-w-[85vw] overflow-y-auto"
            style={{ top: '56px', bottom: 0 }} // Below header, full height
          >
            {/* Sidebar Header */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 border-b border-emerald-100">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl text-gray-900">Navigation</h2>
                <button
                  onClick={onToggle}
                  className="p-1 hover:bg-emerald-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Wähle einen Bereich
              </p>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  return (
                    <motion.button
                      key={item.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className={`flex-shrink-0 ${isActive ? "text-white" : "text-emerald-600"}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`${isActive ? "" : "text-gray-900"}`}>
                          {item.label}
                        </div>
                        <div className={`text-xs mt-0.5 ${
                          isActive ? "text-emerald-50" : "text-gray-500"
                        }`}>
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeSidebar"
                          className="w-1 h-8 bg-white rounded-full self-center"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-gray-100 bg-gradient-to-br from-blue-50 to-cyan-50 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Gemeinsam für die Umwelt! 🌍
                </p>
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <Leaf className="w-4 h-4" />
                  <span className="text-xs">Eco Coins App v1.0</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}