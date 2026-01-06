import { motion, AnimatePresence } from "motion/react";
import { X, TrendingDown, Coffee, Bike, Recycle, Brain, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses } from "../utils/modalDarkModeClasses";

interface ImpactInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImpactInsightsModal({ isOpen, onClose }: ImpactInsightsModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const modalClasses = getModalClasses(isDarkMode);

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
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed inset-x-4 top-1/2 -translate-y-1/2 ${modalClasses.container} rounded-2xl shadow-2xl z-50 max-w-lg mx-auto max-h-[85vh] overflow-y-auto`}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-xl p-2">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl">
                      {language === "de" ? "Dein Beitrag" : "Your Impact"}
                    </h2>
                    <p className="text-sm text-purple-100">
                      {language === "de" ? "Gesamte Beiträge" : "Total Contributions"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* CO₂ eingespart */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`rounded-lg p-4 border shadow-sm ${
                  isDarkMode ? "bg-gray-800 border-emerald-700" : "bg-white border-emerald-100"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isDarkMode ? "bg-emerald-900/30" : "bg-emerald-100"
                    }`}>
                      <TrendingDown className={`w-6 h-6 ${
                        isDarkMode ? "text-emerald-400" : "text-emerald-600"
                      }`} />
                    </div>
                    <div>
                      <p className={`text-sm ${modalClasses.textSecondary}`}>
                        {language === "de" ? "CO₂ eingespart" : "CO₂ saved"}
                      </p>
                      <p className={`text-xs ${modalClasses.textMuted}`}>
                        {language === "de" ? "Gesamt" : "Total"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`}>23</p>
                    <p className={`text-xs ${modalClasses.textMuted}`}>kg</p>
                  </div>
                </div>
                <div className={`rounded-lg p-3 ${
                  isDarkMode ? "bg-emerald-900/20" : "bg-emerald-50"
                }`}>
                  <p className={`text-xs ${
                    isDarkMode ? "text-emerald-300" : "text-emerald-800"
                  }`}>
                    {language === "de"
                      ? "Das entspricht einer Autofahrt von 150 km oder dem Pflanzen von 2 Bäumen"
                      : "Equals a 150 km car ride or planting 2 trees"}
                  </p>
                </div>
              </motion.div>

              {/* Mehrweg genutzt */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-lg p-4 border border-amber-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Coffee className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === "de" ? "Mehrweg genutzt" : "Reusable used"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === "de" ? "Gesamt" : "Total"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl text-amber-600">12</p>
                    <p className="text-xs text-gray-500">{language === "de" ? "mal" : "times"}</p>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-lg p-3">
                  <p className="text-xs text-amber-800">
                    {language === "de"
                      ? "Du hast 12 Einweg-Becher vermieden und 360g Plastikmüll gespart"
                      : "You avoided 12 disposable cups and saved 360g of plastic waste"}
                  </p>
                </div>
              </motion.div>

              {/* Fahrrad-Kilometer */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-4 border border-purple-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bike className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === "de" ? "Fahrrad-Kilometer" : "Bike kilometers"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === "de" ? "Gesamt" : "Total"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl text-purple-600">45</p>
                    <p className="text-xs text-gray-500">km</p>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-xs text-purple-800">
                    {language === "de"
                      ? "Mit dem Fahrrad hast du 9 kg CO₂ eingespart und deine Fitness gesteigert"
                      : "By bike you saved 9 kg CO₂ and improved your fitness"}
                  </p>
                </div>
              </motion.div>

              {/* Recycling */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-lg p-4 border border-green-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Recycle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === "de" ? "Recycling-Aktionen" : "Recycling actions"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === "de" ? "Gesamt" : "Total"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl text-green-600">8</p>
                    <p className="text-xs text-gray-500">{language === "de" ? "mal" : "times"}</p>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-green-800">
                    {language === "de"
                      ? "Du hast 24 Flaschen recycelt und Ressourcen geschont"
                      : "You recycled 24 bottles and conserved resources"}
                  </p>
                </div>
              </motion.div>

              {/* Wissens-Quiz */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === "de" ? "Wissens-Quiz" : "Knowledge Quiz"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {language === "de" ? "Abgeschlossen" : "Completed"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl text-blue-600">5</p>
                    <p className="text-xs text-gray-500">{language === "de" ? "Quiz" : "Quizzes"}</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    {language === "de"
                      ? "Du hast dein Wissen erweitert und kannst andere inspirieren"
                      : "You expanded your knowledge and can inspire others"}
                  </p>
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-lg p-5 mt-6"
              >
                <div className="text-center">
                  <p className="text-3xl mb-2">🏆</p>
                  <p className="text-sm mb-1">
                    {language === "de"
                      ? "Du bist in den Top 10% am Campus!"
                      : "You're in the top 10% on campus!"}
                  </p>
                  <p className="text-xs text-emerald-100">
                    {language === "de"
                      ? "Weiter so! Du inspirierst andere."
                      : "Keep it up! You inspire others."}
                  </p>
                </div>
              </motion.div>

              {/* Close Button */}
              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
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