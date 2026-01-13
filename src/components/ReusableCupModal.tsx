import { motion, AnimatePresence } from "motion/react";
import { X, Coffee, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses } from "../utils/modalDarkModeClasses";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { QRScannerModal } from "./QRScannerModal";
import { PointsAnimation } from "./PointsAnimation";
import { addPointsTransaction } from "./PointsHistoryModal";
import { updateChallengeProgress } from "../utils/challengeData";
import { useActivities } from "../utils/ActivityContext";

interface ReusableCupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReusableCupModal({ isOpen, onClose }: ReusableCupModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const { addActivity } = useActivities();
  const modalClasses = getModalClasses(isDarkMode);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);

  const COINS_PER_USE = 10;

  const texts = {
    de: {
      title: "Mehrwegbecher",
      subtitle: "Nutze Mehrwegbecher und spare Müll",
      scanQR: "QR-Code vom Mitarbeiter scannen",
      instructions: "Bitte den Mitarbeiter um den Mehrwegbecher-QR-Code",
      validated: "Nutzung bestätigt!",
      coinsEarned: "Coins verdient",
      anotherUse: "Weitere Nutzung erfassen",
      close: "Schließen",
      impact: "Dein Beitrag",
      cupsSaved: "Einwegbecher gespart",
      co2Saved: "CO₂ eingespart",
    },
    en: {
      title: "Reusable Cup",
      subtitle: "Use reusable cups and save waste",
      scanQR: "Scan QR code from staff",
      instructions: "Ask staff member for the reusable cup QR code",
      validated: "Usage confirmed!",
      coinsEarned: "Coins Earned",
      anotherUse: "Record Another Use",
      close: "Close",
      impact: "Your Impact",
      cupsSaved: "Disposable cups saved",
      co2Saved: "CO₂ saved",
    },
  };

  const t = texts[language];

  const handleQRScan = (data: string) => {
    setShowQRScanner(false);

    // Validate staff QR code
    if (data === "REUSABLE_CUP_2024") {
      setValidated(true);

      // Award coins
      const totalCoins = parseInt(localStorage.getItem("totalCoins") || "0");
      localStorage.setItem("totalCoins", (totalCoins + COINS_PER_USE).toString());

      // Add to history
      addPointsTransaction({
        type: "earn",
        amount: COINS_PER_USE,
        source: language === "de" ? "Mehrwegbecher" : "Reusable Cup",
        timestamp: new Date(),
        category: language === "de" ? "Nachhaltigkeit" : "Sustainability",
      });

      // Update challenge progress
      updateChallengeProgress(3, 1); // Reusable cup challenge

      // Add to activity history
      addActivity({
        action: `Mehrwegbecher genutzt`,
        actionEn: `Used reusable cup`,
        coins: COINS_PER_USE,
        date: language === "de" ? "Heute" : "Today",
        type: "reusable",
      });

      // Show animation
      setShowPointsAnimation(true);
      setTimeout(() => setShowPointsAnimation(false), 2000);

      toast.success(t.validated);
    } else {
      toast.error(language === "de" ? "Ungültiger Code" : "Invalid code");
    }
  };

  const handleAnotherUse = () => {
    setValidated(false);
    setShowQRScanner(true);
  };

  const handleClose = () => {
    setValidated(false);
    onClose();
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50"
            style={{ top: "56px" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed inset-x-0 bottom-0 z-50 ${modalClasses.containerRounded} shadow-2xl max-h-[90vh] overflow-y-auto`}
            style={{ top: "56px" }}
          >
            {/* Points Animation */}
            {showPointsAnimation && (
              <PointsAnimation 
                points={COINS_PER_USE} 
                onComplete={() => setShowPointsAnimation(false)} 
              />
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    ☕
                  </div>
                  <div>
                    <h2 className="text-2xl">{t.title}</h2>
                    <p className="text-amber-100 text-sm">{t.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {!validated ? (
                <>
                  {/* Instructions */}
                  <Card className={`p-6 border ${
                    isDarkMode 
                      ? "bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700" 
                      : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
                  }`}>
                    <div className="text-center">
                      <Coffee className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-amber-400" : "text-amber-600"}`} />
                      <h3 className={`mb-2 ${modalClasses.textPrimary}`}>{t.instructions}</h3>
                      <p className={`text-sm mb-4 ${modalClasses.textSecondary}`}>
                        {language === "de" 
                          ? "Nach dem Kauf mit Mehrwegbecher den QR-Code scannen"
                          : "Scan the QR code after purchasing with a reusable cup"}
                      </p>
                      <Button
                        onClick={() => setShowQRScanner(true)}
                        className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-6 rounded-xl"
                      >
                        {t.scanQR}
                      </Button>
                    </div>
                  </Card>
                </>
              ) : (
                <>
                  {/* Success */}
                  <Card className={`p-6 border ${
                    isDarkMode 
                      ? "bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-700" 
                      : "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200"
                  }`}>
                    <div className="text-center mb-4">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                      <h3 className={`text-xl mb-2 ${modalClasses.textPrimary}`}>{t.validated}</h3>
                    </div>

                    {/* Coins Earned */}
                    <Card className={`p-4 border mb-4 ${
                      isDarkMode 
                        ? "bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-700" 
                        : "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={modalClasses.textPrimary}>{t.coinsEarned}</span>
                        <span className={`text-2xl ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                          +{COINS_PER_USE} Eco Coins
                        </span>
                      </div>
                    </Card>

                    {/* Impact Stats */}
                    <Card className={`p-4 border mb-4 ${modalClasses.card}`}>
                      <h4 className={`text-sm mb-3 ${modalClasses.textSecondary}`}>{t.impact}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`text-center p-3 rounded-lg ${
                          isDarkMode ? "bg-blue-900/30" : "bg-blue-50"
                        }`}>
                          <p className={`text-2xl mb-1 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>1</p>
                          <p className={`text-xs ${modalClasses.textSecondary}`}>{t.cupsSaved}</p>
                        </div>
                        <div className={`text-center p-3 rounded-lg ${
                          isDarkMode ? "bg-green-900/30" : "bg-green-50"
                        }`}>
                          <p className={`text-2xl mb-1 ${isDarkMode ? "text-green-400" : "text-green-600"}`}>50g</p>
                          <p className={`text-xs ${modalClasses.textSecondary}`}>{t.co2Saved}</p>
                        </div>
                      </div>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button
                        onClick={handleAnotherUse}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-xl"
                      >
                        {t.anotherUse}
                      </Button>
                      <Button
                        onClick={handleClose}
                        variant="outline"
                        className="w-full py-4 rounded-xl"
                      >
                        {t.close}
                      </Button>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </motion.div>

          {/* QR Scanner */}
          <QRScannerModal
            isOpen={showQRScanner}
            onClose={() => setShowQRScanner(false)}
            onScan={handleQRScan}
            title={t.scanQR}
            expectedCode="REUSABLE_CUP_2024"
          />
        </>
      )}
    </AnimatePresence>
  );
}