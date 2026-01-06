import { motion, AnimatePresence } from "motion/react";
import { X, Book, CheckCircle } from "lucide-react";
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

interface BookExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookExchangeModal({ isOpen, onClose }: BookExchangeModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const modalClasses = getModalClasses(isDarkMode);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);

  const COINS_PER_EXCHANGE = 40;

  const texts = {
    de: {
      title: "Büchertausch",
      subtitle: "Tausche Bücher und verdiene Coins",
      scanQR: "Bibliotheks-QR scannen",
      instructions: "Bücher-Abgabe",
      instructionsDesc: "Gib dein Buch in der Bibliothek ab und lasse den Tausch durch Scannen des QR-Codes bestätigen",
      validated: "Tausch bestätigt!",
      coinsEarned: "Coins verdient",
      anotherExchange: "Weiteres Buch tauschen",
      close: "Schließen",
      impact: "Dein Beitrag",
      booksExchanged: "Bücher getauscht",
      resourcesSaved: "Ressourcen gespart",
      howItWorks: "So funktioniert's",
      step1: "Buch zur Bibliothek bringen",
      step2: "Abgabe bestätigen lassen",
      step3: "QR-Code scannen",
      step4: "Coins erhalten",
    },
    en: {
      title: "Book Exchange",
      subtitle: "Exchange books and earn coins",
      scanQR: "Scan Library QR",
      instructions: "Book Submission",
      instructionsDesc: "Submit your book at the library and confirm the exchange by scanning the QR code",
      validated: "Exchange confirmed!",
      coinsEarned: "Coins Earned",
      anotherExchange: "Exchange Another Book",
      close: "Close",
      impact: "Your Impact",
      booksExchanged: "Books exchanged",
      resourcesSaved: "Resources saved",
      howItWorks: "How it works",
      step1: "Bring book to library",
      step2: "Confirm submission",
      step3: "Scan QR code",
      step4: "Receive coins",
    },
  };

  const t = texts[language];

  const handleQRScan = (data: string) => {
    setShowQRScanner(false);

    // Validate library QR code
    if (data === "LIBRARY_EXCHANGE_2024") {
      setValidated(true);

      // Award coins
      const totalCoins = parseInt(localStorage.getItem("totalCoins") || "0");
      localStorage.setItem("totalCoins", (totalCoins + COINS_PER_EXCHANGE).toString());

      // Add to history
      addPointsTransaction({
        type: "earn",
        amount: COINS_PER_EXCHANGE,
        source: language === "de" ? "Büchertausch" : "Book Exchange",
        timestamp: new Date(),
        category: language === "de" ? "Nachhaltigkeit" : "Sustainability",
      });

      // Update challenge progress
      updateChallengeProgress(4, 1); // Book exchange challenge

      // Show animation
      setShowPointsAnimation(true);
      setTimeout(() => setShowPointsAnimation(false), 2000);

      toast.success(t.validated);
    } else {
      toast.error(language === "de" ? "Ungültiger Code" : "Invalid code");
    }
  };

  const handleAnotherExchange = () => {
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
                points={COINS_PER_EXCHANGE} 
                onComplete={() => setShowPointsAnimation(false)} 
              />
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    📚
                  </div>
                  <div>
                    <h2 className="text-2xl">{t.title}</h2>
                    <p className="text-purple-100 text-sm">{t.subtitle}</p>
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
                  {/* How it works */}
                  <Card className={`p-4 border ${
                    isDarkMode 
                      ? "bg-purple-900/30 border-purple-700" 
                      : "bg-purple-50 border-purple-200"
                  }`}>
                    <h4 className={`text-sm mb-3 ${isDarkMode ? "text-purple-300" : "text-purple-900"}`}>{t.howItWorks}</h4>
                    <div className="space-y-2">
                      {[t.step1, t.step2, t.step3, t.step4].map((step, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className={`w-6 h-6 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                            isDarkMode ? "bg-purple-500" : "bg-purple-600"
                          }`}>
                            {index + 1}
                          </div>
                          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{step}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Instructions */}
                  <Card className={`p-6 border ${
                    isDarkMode 
                      ? "bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-700" 
                      : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
                  }`}>
                    <div className="text-center">
                      <Book className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                      <h3 className={`mb-2 ${modalClasses.textPrimary}`}>{t.instructions}</h3>
                      <p className={`text-sm mb-4 ${modalClasses.textSecondary}`}>
                        {t.instructionsDesc}
                      </p>
                      <Button
                        onClick={() => setShowQRScanner(true)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 rounded-xl"
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
                          +{COINS_PER_EXCHANGE} Eco Coins
                        </span>
                      </div>
                    </Card>

                    {/* Impact Stats */}
                    <Card className={`p-4 border mb-4 ${modalClasses.card}`}>
                      <h4 className={`text-sm mb-3 ${modalClasses.textSecondary}`}>{t.impact}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`text-center p-3 rounded-lg ${
                          isDarkMode ? "bg-purple-900/30" : "bg-purple-50"
                        }`}>
                          <p className={`text-2xl mb-1 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>1</p>
                          <p className={`text-xs ${modalClasses.textSecondary}`}>{t.booksExchanged}</p>
                        </div>
                        <div className={`text-center p-3 rounded-lg ${
                          isDarkMode ? "bg-green-900/30" : "bg-green-50"
                        }`}>
                          <p className={`text-2xl mb-1 ${isDarkMode ? "text-green-400" : "text-green-600"}`}>✓</p>
                          <p className={`text-xs ${modalClasses.textSecondary}`}>{t.resourcesSaved}</p>
                        </div>
                      </div>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button
                        onClick={handleAnotherExchange}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl"
                      >
                        {t.anotherExchange}
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
            expectedCode="LIBRARY_EXCHANGE_2024"
          />
        </>
      )}
    </AnimatePresence>
  );
}