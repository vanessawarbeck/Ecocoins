import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Globe, Check, ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { Language } from "../../utils/translations";
import logoHM from "figma:asset/7a5625eb34dcf1c2699e0574b36f2e03c14671c8.png";

interface LanguageSelectionScreenProps {
  onContinue: (language: Language) => void;
  onBack?: () => void;
}

export function LanguageSelectionScreen({ onContinue, onBack }: LanguageSelectionScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const languages = [
    {
      code: "de" as Language,
      name: "Deutsch",
      flag: "🇩🇪",
      description: "Deutsche Sprache"
    },
    {
      code: "en" as Language,
      name: "English",
      flag: "🇬🇧",
      description: "English Language"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* HM Logo at top */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 text-center"
        >
          <img 
            src={logoHM} 
            alt="Hochschule München" 
            className="h-10 mx-auto object-contain brightness-0 invert opacity-90"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
          >
            <Globe className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl text-white mb-2">
            Sprache wählen
          </h2>
          <p className="text-white/80">
            Choose your language
          </p>
        </motion.div>

        <div className="space-y-3 mb-6">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => setSelectedLanguage(lang.code)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-5 cursor-pointer transition-all ${
                  selectedLanguage === lang.code
                    ? "bg-white border-2 border-white shadow-2xl"
                    : "bg-white/90 border-2 border-transparent hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{lang.flag}</div>
                  <div className="flex-1">
                    <h3 className="text-xl text-gray-900 mb-1">
                      {lang.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {lang.description}
                    </p>
                  </div>
                  {selectedLanguage === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      <div className="bg-blue-600 rounded-full p-2">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            onClick={() => selectedLanguage && onContinue(selectedLanguage)}
            disabled={!selectedLanguage}
            className="w-full bg-white text-blue-600 hover:bg-white/90 disabled:bg-white/50 disabled:text-gray-400 rounded-full py-6 text-lg shadow-xl"
          >
            {selectedLanguage === "de" ? "Weiter" : "Continue"}
          </Button>
        </motion.div>

        {/* Back Button */}
        {onBack && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={onBack}
              className="w-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-full py-6 text-lg mt-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {selectedLanguage === "de" ? "Zurück" : "Back"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}