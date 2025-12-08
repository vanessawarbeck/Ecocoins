import { motion, AnimatePresence } from "motion/react";
import { X, Check, Globe } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import type { Language } from "../utils/translations";

interface LanguageSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageSettingsModal({ isOpen, onClose }: LanguageSettingsModalProps) {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
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
            className="fixed inset-0 bg-black/50 z-50"
            style={{ top: '56px' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-y-auto"
            style={{ top: '56px' }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-3xl shadow-lg z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl">{t.settings.language}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-blue-100 text-sm ml-13">
                {t.settings.languageDesc}
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Current Language Info */}
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {t.language === "de" ? "Aktuelle Sprache" : "Current Language"}
                    </p>
                    <p className="text-lg text-gray-900">
                      {language === "de" ? "Deutsch" : "English"}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Language Selection */}
              <div>
                <h3 className="text-gray-800 mb-3 px-1">
                  {t.language === "de" ? "Sprache wählen" : "Choose Language"}
                </h3>
                <div className="space-y-3">
                  {/* German */}
                  <motion.button
                    onClick={() => handleLanguageChange("de")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      language === "de"
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-2xl">🇩🇪</span>
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900 font-medium">Deutsch</p>
                        <p className="text-sm text-gray-500">German</p>
                      </div>
                    </div>
                    {language === "de" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* English */}
                  <motion.button
                    onClick={() => handleLanguageChange("en")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      language === "en"
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-2xl">🇬🇧</span>
                      </div>
                      <div className="text-left">
                        <p className="text-gray-900 font-medium">English</p>
                        <p className="text-sm text-gray-500">Englisch</p>
                      </div>
                    </div>
                    {language === "en" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Info Card */}
              <Card className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
                <div className="flex gap-3">
                  <div className="text-2xl">ℹ️</div>
                  <div>
                    <p className="text-sm text-gray-700 mb-1">
                      {t.language === "de" 
                        ? "Die Sprache wird sofort für die gesamte App geändert." 
                        : "The language will be changed immediately for the entire app."}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.language === "de"
                        ? "Deine Einstellung wird gespeichert."
                        : "Your setting will be saved."}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Close Button */}
              <Button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 rounded-xl"
              >
                {t.common.close}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
