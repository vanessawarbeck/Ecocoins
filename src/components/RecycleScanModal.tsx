import { motion, AnimatePresence } from "motion/react";
import { X, Camera, CheckCircle, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses } from "../utils/modalDarkModeClasses";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { PointsAnimation } from "./PointsAnimation";
import { addPointsTransaction } from "./PointsHistoryModal";
import { updateChallengeProgress } from "../utils/challengeData";

interface RecycleScanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecycleScanModal({ isOpen, onClose }: RecycleScanModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const modalClasses = getModalClasses(isDarkMode);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    bottles: number;
    cans: number;
    total: number;
  } | null>(null);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);

  const texts = {
    de: {
      title: "Pfandbon scannen",
      subtitle: "Recycliere und verdiene Coins",
      scanReceipt: "Pfandbon scannen",
      scanning: "Scanne Bon...",
      ocrReading: "OCR liest Daten...",
      validation: "Validierung...",
      success: "Erfolgreich validiert!",
      bottles: "Flaschen",
      cans: "Dosen",
      totalValue: "Gesamtwert",
      coinsEarned: "Coins verdient",
      scanAnother: "Weiteren Bon scannen",
      close: "Schließen",
      instructions: "Halte den Pfandbon flach vor die Kamera",
      startScan: "Scan starten",
    },
    en: {
      title: "Scan Deposit Receipt",
      subtitle: "Recycle and earn coins",
      scanReceipt: "Scan Receipt",
      scanning: "Scanning receipt...",
      ocrReading: "OCR reading data...",
      validation: "Validating...",
      success: "Successfully validated!",
      bottles: "Bottles",
      cans: "Cans",
      totalValue: "Total Value",
      coinsEarned: "Coins Earned",
      scanAnother: "Scan Another",
      close: "Close",
      instructions: "Hold the deposit receipt flat in front of the camera",
      startScan: "Start Scan",
    },
  };

  const t = texts[language];

  const handleScan = () => {
    setScanning(true);

    // Simulate OCR scanning process
    setTimeout(() => {
      // Simulate random receipt data
      const bottles = Math.floor(Math.random() * 10) + 3;
      const cans = Math.floor(Math.random() * 8) + 2;
      const total = bottles * 0.25 + cans * 0.25;

      setReceiptData({ bottles, cans, total });
      setScanned(true);
      setScanning(false);

      // Calculate coins (20 coins per euro)
      const coinsEarned = Math.floor(total * 20);

      // Award coins
      const totalCoins = parseInt(localStorage.getItem("totalCoins") || "0");
      localStorage.setItem("totalCoins", (totalCoins + coinsEarned).toString());

      // Add to history
      addPointsTransaction({
        type: "earn",
        amount: coinsEarned,
        source: language === "de" ? "Recycling" : "Recycling",
        timestamp: new Date(),
        category: language === "de" ? "Umwelt" : "Environment",
      });

      // Update challenge progress
      updateChallengeProgress(2, 1); // Recycling challenge

      // Show animation
      setShowPointsAnimation(true);
      setTimeout(() => setShowPointsAnimation(false), 2000);

      toast.success(t.success);
    }, 3000);
  };

  const handleScanAnother = () => {
    setScanned(false);
    setReceiptData(null);
  };

  const handleClose = () => {
    setScanned(false);
    setReceiptData(null);
    setScanning(false);
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
            {showPointsAnimation && receiptData && (
              <PointsAnimation 
                points={Math.floor(receiptData.total * 20)} 
                onComplete={() => setShowPointsAnimation(false)} 
              />
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    ♻️
                  </div>
                  <div>
                    <h2 className="text-2xl">{t.title}</h2>
                    <p className="text-green-100 text-sm">{t.subtitle}</p>
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
              {!scanned && !scanning && (
                <>
                  {/* Scanner Area */}
                  <Card className={`p-8 border ${
                    isDarkMode 
                      ? "bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700" 
                      : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                  }`}>
                    <div className="text-center">
                      <div className={`w-40 h-40 mx-auto mb-4 border-4 border-dashed rounded-lg flex items-center justify-center ${
                        isDarkMode ? "border-green-700" : "border-green-300"
                      }`}>
                        <Camera className={`w-20 h-20 ${isDarkMode ? "text-green-500" : "text-green-400"}`} />
                      </div>
                      <p className={`text-sm mb-4 ${modalClasses.textSecondary}`}>{t.instructions}</p>
                      <Button
                        onClick={handleScan}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 rounded-xl"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        {t.startScan}
                      </Button>
                    </div>
                  </Card>
                </>
              )}

              {scanning && (
                <>
                  {/* Scanning Animation */}
                  <Card className={`p-8 border ${
                    isDarkMode 
                      ? "bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-700" 
                      : "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
                  }`}>
                    <div className="text-center">
                      <div className={`w-40 h-40 mx-auto mb-4 border-4 rounded-lg flex items-center justify-center animate-pulse ${
                        isDarkMode ? "border-green-500" : "border-green-500"
                      }`}>
                        <Sparkles className={`w-20 h-20 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                      </div>
                      <div className="space-y-2">
                        <p className={isDarkMode ? "text-green-400" : "text-green-600"}>{t.scanning}</p>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              )}

              {scanned && receiptData && (
                <>
                  {/* Results */}
                  <Card className={`p-6 border ${
                    isDarkMode 
                      ? "bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-700" 
                      : "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200"
                  }`}>
                    <div className="text-center mb-4">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                      <h3 className={`text-xl mb-2 ${modalClasses.textPrimary}`}>{t.success}</h3>
                    </div>

                    {/* Receipt Data */}
                    <div className="space-y-3 mb-4">
                      <div className={`flex items-center justify-between p-3 rounded-lg ${modalClasses.statsCard}`}>
                        <span className={modalClasses.textSecondary}>{t.bottles}</span>
                        <span className={modalClasses.textPrimary}>{receiptData.bottles}x</span>
                      </div>
                      <div className={`flex items-center justify-between p-3 rounded-lg ${modalClasses.statsCard}`}>
                        <span className={modalClasses.textSecondary}>{t.cans}</span>
                        <span className={modalClasses.textPrimary}>{receiptData.cans}x</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                        <span className="text-gray-900">{t.totalValue}</span>
                        <span className="text-gray-900">€{receiptData.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Coins Earned */}
                    <Card className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{t.coinsEarned}</span>
                        <span className="text-2xl text-amber-600">
                          +{Math.floor(receiptData.total * 20)} Eco Coins
                        </span>
                      </div>
                    </Card>

                    {/* Actions */}
                    <div className="space-y-2">
                      <Button
                        onClick={handleScanAnother}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 rounded-xl"
                      >
                        {t.scanAnother}
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
        </>
      )}
    </AnimatePresence>
  );
}
