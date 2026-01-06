import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Home, Newspaper, Trophy, BarChart3, Users, Gift, User, Settings, Globe, Coins } from "lucide-react";
import { useLanguage } from "../utils/LanguageContext";
import { useUser } from "../utils/UserContext";
import logoHM from "figma:asset/7a5625eb34dcf1c2699e0574b36f2e03c14671c8.png";

interface MobileSidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileSidebar({ currentPage, onPageChange, isOpen, onToggle }: MobileSidebarProps) {
  const { t, language } = useLanguage();
  const { userProfile } = useUser();

  // Get gradient colors based on current page
  const getHeaderGradient = () => {
    switch (currentPage) {
      case "home":
        return "bg-gradient-to-r from-[#FF5757] to-red-500";
      case "newsfeed":
        return "bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-blue-600";
      case "challenges":
        return "bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-orange-500";
      case "dashboard":
        return "bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-cyan-600";
      case "community":
        return "bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-purple-600";
      case "rewards":
        return "bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-yellow-500";
      case "profile":
        return "bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-emerald-500";
      case "settings":
        return "bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-gray-600";
      case "friends":
        return "bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-pink-600";
      default:
        return "bg-gradient-to-r from-[#FF5757] to-red-500";
    }
  };
  
  const navItems: { id: Page; icon: any; label: string; description: string }[] = [
    { id: "home", icon: Home, label: t.nav.home, description: t.language === "de" ? "Übersicht & Quick Actions" : "Overview & Quick Actions" },
    { id: "newsfeed", icon: Newspaper, label: t.nav.newsfeed, description: "Campus News & Updates" },
    { id: "challenges", icon: Trophy, label: t.nav.challenges, description: t.language === "de" ? "Wöchentliche Herausforderungen" : "Weekly Challenges" },
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
      <div className={`fixed top-0 left-0 right-0 ${getHeaderGradient()} text-white px-4 py-3 flex items-center justify-between z-40 shadow-lg`}>
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
        
        {/* HM Logo in white */}
        <img 
          src={logoHM} 
          alt="Hochschule München" 
          className="h-8 object-contain brightness-0 invert"
        />
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
            className="fixed left-0 bg-white dark:bg-gray-800 shadow-2xl z-50 w-80 max-w-[85vw] overflow-y-auto"
            style={{ top: '56px', bottom: 0 }} // Below header, full height
          >
            {/* Sidebar Header */}
            <div className="bg-gradient-to-br from-[#FF5757] to-[#E64545] p-6 border-b border-red-200">
              <div className="flex items-center justify-between mb-4">
                {/* HM Logo in Sidebar */}
                <img 
                  src={logoHM} 
                  alt="Hochschule München" 
                  className="h-10 object-contain brightness-0 invert"
                />
                <button
                  onClick={onToggle}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <h2 className="text-xl text-white mb-1">Navigation</h2>
              <p className="text-sm text-white/80">
                {t.language === "de" ? "Wähle einen Bereich" : "Choose a section"}
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
                          ? "bg-gradient-to-r from-[#FF5757] to-[#E64545] text-white shadow-lg"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <div className={`flex-shrink-0 ${isActive ? "text-white" : "text-[#FF5757]"}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className={`${isActive ? "" : "text-gray-900 dark:text-gray-100"}`}>
                          {item.label}
                        </div>
                        <div className={`text-xs mt-0.5 ${
                          isActive ? "text-red-50" : "text-gray-500 dark:text-gray-400"
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
            <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 mt-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Gemeinsam für die Umwelt! 🌍
                </p>
                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Globe className="w-4 h-4" />
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