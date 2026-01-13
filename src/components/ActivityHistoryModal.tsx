import { motion, AnimatePresence } from "motion/react";
import { X, History, Bike, Recycle, Coffee, Brain, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { useActivities } from "../utils/ActivityContext";
import { getModalClasses } from "../utils/modalDarkModeClasses";

interface ActivityHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ActivityHistoryModal({
  isOpen,
  onClose,
}: ActivityHistoryModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const darkClasses = getModalClasses(isDarkMode);
  const { activities } = useActivities();

  // Group activities by date
  const groupedActivities = activities.reduce((acc, activity) => {
    const dateKey = activity.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(activity);
    return acc;
  }, {} as Record<string, typeof activities>);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "bike":
        return <Bike className="w-5 h-5 text-emerald-600" />;
      case "recycle":
        return <Recycle className="w-5 h-5 text-blue-600" />;
      case "reusable":
        return <Coffee className="w-5 h-5 text-amber-600" />;
      case "quiz":
        return <Brain className="w-5 h-5 text-purple-600" />;
      case "event":
        return <Calendar className="w-5 h-5 text-pink-600" />;
      default:
        return <History className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    if (isDarkMode) {
      switch (type) {
        case "bike":
          return "bg-emerald-900/40 border-emerald-700";
        case "recycle":
          return "bg-blue-900/40 border-blue-700";
        case "reusable":
          return "bg-amber-900/40 border-amber-700";
        case "quiz":
          return "bg-purple-900/40 border-purple-700";
        case "event":
          return "bg-pink-900/40 border-pink-700";
        default:
          return "bg-gray-800 border-gray-700";
      }
    } else {
      switch (type) {
        case "bike":
          return "bg-emerald-50 border-emerald-200";
        case "recycle":
          return "bg-blue-50 border-blue-200";
        case "reusable":
          return "bg-amber-50 border-amber-200";
        case "quiz":
          return "bg-purple-50 border-purple-200";
        case "event":
          return "bg-pink-50 border-pink-200";
        default:
          return "bg-gray-50 border-gray-200";
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed inset-x-4 top-20 bottom-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col ${darkClasses.container}`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <History className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl">
                      {language === "de" ? "Aktivitäts-Historie" : "Activity History"}
                    </h2>
                    <p className="text-emerald-100 text-sm">
                      {language === "de" 
                        ? `${activities.length} Aktivitäten insgesamt`
                        : `${activities.length} activities total`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? "bg-gray-800" : ""}`}>
              {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <History className={`w-16 h-16 mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-300"}`} />
                  <p className={darkClasses.textMuted}>
                    {language === "de"
                      ? "Noch keine Aktivitäten vorhanden"
                      : "No activities yet"}
                  </p>
                  <p className={`text-sm mt-2 ${darkClasses.textMuted}`}>
                    {language === "de"
                      ? "Schließe Challenges ab, um deine Historie zu sehen"
                      : "Complete challenges to see your history"}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(groupedActivities).map(([date, dateActivities]) => (
                    <div key={date}>
                      <div className="flex items-center gap-2 mb-2 px-1">
                        <Calendar className={`w-4 h-4 ${darkClasses.textMuted}`} />
                        <h3 className={darkClasses.textPrimary}>{date}</h3>
                        <div className={`flex-1 h-px ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                        <span className={`text-sm ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                          +{dateActivities.reduce((sum, act) => sum + act.coins, 0)} Coins
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {dateActivities.map((activity) => (
                          <Card
                            key={activity.id}
                            className={`p-3 ${getActivityColor(activity.type)} border`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-shrink-0">
                                {getActivityIcon(activity.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`truncate ${darkClasses.textPrimary}`}>
                                  {language === "de" ? activity.action : activity.actionEn}
                                </p>
                              </div>
                              <div className="flex-shrink-0 text-right">
                                <p className={isDarkMode ? "text-emerald-400" : "text-emerald-600"}>
                                  +{activity.coins}
                                </p>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t flex-shrink-0 ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50"
            }`}>
              <Button
                onClick={onClose}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {language === "de" ? "Schließen" : "Close"}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}