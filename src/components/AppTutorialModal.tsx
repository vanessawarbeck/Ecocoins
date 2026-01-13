import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Home, Trophy, Coins, Users, Gift, Bike, Recycle, Coffee, BookOpen, Brain } from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses } from "../utils/modalDarkModeClasses";

interface AppTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TutorialStep {
  icon: any;
  titleDe: string;
  titleEn: string;
  descDe: string;
  descEn: string;
  gradient: string;
  tips?: { de: string; en: string }[];
}

const tutorialSteps: TutorialStep[] = [
  {
    icon: Home,
    titleDe: "Willkommen bei Eco Coins! 🌱",
    titleEn: "Welcome to Eco Coins! 🌱",
    descDe: "Sammle Punkte durch nachhaltige Aktionen und trage aktiv zum Umweltschutz auf dem Campus bei. Lass uns gemeinsam die wichtigsten Features entdecken!",
    descEn: "Collect points through sustainable actions and actively contribute to environmental protection on campus. Let's discover the most important features together!",
    gradient: "from-emerald-500 to-green-600",
    tips: [
      {
        de: "Jeden Tag einloggen = Streak aufbauen",
        en: "Login daily = Build your streak"
      },
      {
        de: "Je mehr Aktivitäten, desto mehr Coins",
        en: "More activities = More coins"
      }
    ]
  },
  {
    icon: Bike,
    titleDe: "Quick Actions - Schnell Punkte sammeln",
    titleEn: "Quick Actions - Earn Points Fast",
    descDe: "Nutze die Quick Actions auf der Startseite für schnelle Nachhaltigkeitsaktionen:",
    descEn: "Use Quick Actions on the home page for fast sustainability activities:",
    gradient: "from-blue-500 to-blue-600",
    tips: [
      {
        de: "🚴 Fahrrad-Tracking (10-30 Coins)",
        en: "🚴 Bike Tracking (10-30 Coins)"
      },
      {
        de: "♻️ Recycling Scanner (+15 Coins)",
        en: "♻️ Recycling Scanner (+15 Coins)"
      },
      {
        de: "🥤 Mehrwegbecher (+5 Coins)",
        en: "🥤 Reusable Cup (+5 Coins)"
      },
      {
        de: "📚 Büchertausch (+50 Coins)",
        en: "📚 Book Exchange (+50 Coins)"
      },
      {
        de: "🧠 Nachhaltigkeits-Quiz (+20 Coins)",
        en: "🧠 Sustainability Quiz (+20 Coins)"
      }
    ]
  },
  {
    icon: Trophy,
    titleDe: "Challenges - Langfristige Ziele",
    titleEn: "Challenges - Long-term Goals",
    descDe: "Starte wöchentliche Challenges und verdiene große Belohnungen:",
    descEn: "Start weekly challenges and earn big rewards:",
    gradient: "from-amber-500 to-orange-600",
    tips: [
      {
        de: "💡 Wähle Challenges passend zu deinem Alltag",
        en: "💡 Choose challenges that fit your routine"
      },
      {
        de: "📊 Verfolge deinen Fortschritt live",
        en: "📊 Track your progress live"
      },
      {
        de: "🏆 Erhalte 50-300 Coins bei Abschluss",
        en: "🏆 Receive 50-300 coins upon completion"
      },
      {
        de: "⏰ Achte auf die Deadline!",
        en: "⏰ Watch the deadline!"
      }
    ]
  },
  {
    icon: Coins,
    titleDe: "Dashboard - Deine Impact-Statistiken",
    titleEn: "Dashboard - Your Impact Stats",
    descDe: "Sieh deinen persönlichen Beitrag zum Umweltschutz:",
    descEn: "See your personal contribution to environmental protection:",
    gradient: "from-purple-500 to-purple-600",
    tips: [
      {
        de: "🌍 CO₂-Ersparnis im Überblick",
        en: "🌍 CO₂ savings overview"
      },
      {
        de: "📈 Wöchentliche Fortschritts-Analyse",
        en: "📈 Weekly progress analysis"
      },
      {
        de: "🎖️ Badges & Achievements freischalten",
        en: "🎖️ Unlock badges & achievements"
      },
      {
        de: "🔥 Halte deinen Streak aufrecht!",
        en: "🔥 Maintain your streak!"
      }
    ]
  },
  {
    icon: Users,
    titleDe: "Community - Gemeinsam stärker",
    titleEn: "Community - Stronger Together",
    descDe: "Vergleiche dich mit anderen und motiviert euch gegenseitig:",
    descEn: "Compare yourself with others and motivate each other:",
    gradient: "from-pink-500 to-rose-600",
    tips: [
      {
        de: "🏅 Gesamtrangliste - Top 100 Studierende",
        en: "🏅 Overall leaderboard - Top 100 students"
      },
      {
        de: "🎓 Fakultäts-Rangliste - Welche ist die Beste?",
        en: "🎓 Faculty leaderboard - Which is the best?"
      },
      {
        de: "👥 Freunde hinzufügen & herausfordern",
        en: "👥 Add friends & challenge them"
      },
      {
        de: "🤝 Freunde-Challenges erstellen",
        en: "🤝 Create friend challenges"
      }
    ]
  },
  {
    icon: Gift,
    titleDe: "Rewards - Coins einlösen",
    titleEn: "Rewards - Redeem Your Coins",
    descDe: "Tausche deine gesammelten Coins gegen tolle Belohnungen ein:",
    descEn: "Exchange your collected coins for great rewards:",
    gradient: "from-indigo-500 to-indigo-600",
    tips: [
      {
        de: "🎫 Rabatte & Gutscheine für Campus-Angebote",
        en: "🎫 Discounts & vouchers for campus offers"
      },
      {
        de: "🎉 Kostenloser Event-Zugang",
        en: "🎉 Free event access"
      },
      {
        de: "🌱 Nachhaltige Produkte & Merchandise",
        en: "🌱 Sustainable products & merchandise"
      },
      {
        de: "💰 Spare für größere Belohnungen!",
        en: "💰 Save for bigger rewards!"
      }
    ]
  },
  {
    icon: BookOpen,
    titleDe: "Los geht's! 🚀",
    titleEn: "Let's Get Started! 🚀",
    descDe: "Du bist jetzt bereit, Eco Coins zu sammeln! Hier sind deine ersten Schritte:",
    descEn: "You're now ready to collect Eco Coins! Here are your first steps:",
    gradient: "from-green-500 to-emerald-600",
    tips: [
      {
        de: "1️⃣ Starte eine Quick Action (z.B. Fahrrad-Tracking)",
        en: "1️⃣ Start a Quick Action (e.g., Bike Tracking)"
      },
      {
        de: "2️⃣ Wähle deine erste Challenge aus",
        en: "2️⃣ Choose your first challenge"
      },
      {
        de: "3️⃣ Füge Freunde hinzu für mehr Motivation",
        en: "3️⃣ Add friends for more motivation"
      },
      {
        de: "4️⃣ Sammle Coins und löse Belohnungen ein",
        en: "4️⃣ Collect coins and redeem rewards"
      },
      {
        de: "5️⃣ Schaue täglich vorbei für Eco-Tipps!",
        en: "5️⃣ Check in daily for eco tips!"
      }
    ]
  }
];

export function AppTutorialModal({ isOpen, onClose }: AppTutorialModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    localStorage.setItem("tutorialCompleted", "true");
    setCurrentStep(0);
    onClose();
  };

  const currentTutorial = tutorialSteps[currentStep];
  const Icon = currentTutorial.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={getModalClasses(isDarkMode).modalOverlay}
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`${getModalClasses(isDarkMode).modalContainer} pointer-events-auto max-w-lg w-full max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className={getModalClasses(isDarkMode).modalCloseButton}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress Indicator */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={getModalClasses(isDarkMode).modalText}>
                    {language === "de" ? "Schritt" : "Step"} {currentStep + 1} / {tutorialSteps.length}
                  </span>
                  <button
                    onClick={handleClose}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {language === "de" ? "Überspringen" : "Skip"}
                  </button>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
                  />
                </div>
              </div>

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon Header */}
                  <div className={`mb-6 p-6 rounded-2xl bg-gradient-to-br ${currentTutorial.gradient} text-white text-center`}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="inline-block"
                    >
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-10 h-10" />
                      </div>
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">
                      {language === "de" ? currentTutorial.titleDe : currentTutorial.titleEn}
                    </h2>
                    <p className="text-white/90">
                      {language === "de" ? currentTutorial.descDe : currentTutorial.descEn}
                    </p>
                  </div>

                  {/* Tips/Steps */}
                  {currentTutorial.tips && currentTutorial.tips.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {currentTutorial.tips.map((tip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * (index + 1) }}
                          className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                            {index + 1}
                          </div>
                          <p className={`flex-1 ${getModalClasses(isDarkMode).modalText}`}>
                            {language === "de" ? tip.de : tip.en}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Special Call-to-Action for last step */}
                  {currentStep === tutorialSteps.length - 1 && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center"
                    >
                      <p className="text-emerald-900 dark:text-emerald-300 font-medium">
                        {language === "de" 
                          ? "🎉 Viel Erfolg beim Sammeln von Eco Coins!"
                          : "🎉 Good luck collecting Eco Coins!"
                        }
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  variant="outline"
                  className={`${
                    currentStep === 0 
                      ? "opacity-50 cursor-not-allowed" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  } border-gray-300 dark:border-gray-600 dark:text-gray-200`}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  {language === "de" ? "Zurück" : "Back"}
                </Button>

                <div className="flex gap-1">
                  {tutorialSteps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? "bg-emerald-500 w-6"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                      aria-label={`Go to step ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                >
                  {currentStep === tutorialSteps.length - 1
                    ? (language === "de" ? "Los geht's!" : "Let's Go!")
                    : (language === "de" ? "Weiter" : "Next")
                  }
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              {/* Hint Text */}
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                {language === "de"
                  ? "Du kannst dieses Tutorial jederzeit in den Einstellungen erneut öffnen."
                  : "You can reopen this tutorial anytime in settings."
                }
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}