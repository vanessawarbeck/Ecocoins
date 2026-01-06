import { motion, AnimatePresence } from "motion/react";
import { X, QrCode, CheckCircle, Camera } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses } from "../utils/modalDarkModeClasses";
import { useState } from "react";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
  title?: string;
  expectedCode?: string;
}

export function QRScannerModal({ isOpen, onClose, onScan, title, expectedCode }: QRScannerModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const modalClasses = getModalClasses(isDarkMode);
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState("");

  const texts = {
    de: {
      title: title || "QR-Code scannen",
      scanning: "Scanne...",
      manualEntry: "Code manuell eingeben",
      enterCode: "Code eingeben",
      submit: "Bestätigen",
      cancel: "Abbrechen",
      demoCode: "Demo-Code",
      startScan: "Scan starten",
      instructions: "Halte den QR-Code vor die Kamera",
    },
    en: {
      title: title || "Scan QR Code",
      scanning: "Scanning...",
      manualEntry: "Enter code manually",
      enterCode: "Enter code",
      submit: "Submit",
      cancel: "Cancel",
      demoCode: "Demo code",
      startScan: "Start Scan",
      instructions: "Hold the QR code in front of the camera",
    },
  };

  const t = texts[language];

  const handleScan = () => {
    setScanning(true);
    
    // Simulate QR scan after 2 seconds
    setTimeout(() => {
      setScanning(false);
      if (expectedCode) {
        onScan(expectedCode);
      }
    }, 2000);
  };

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      onScan(manualCode);
      setManualCode("");
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
            className="fixed inset-0 bg-black/70 z-[60]"
            style={{ top: "56px" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed inset-x-4 top-1/2 -translate-y-1/2 z-[60] ${modalClasses.container} rounded-2xl shadow-2xl max-w-md mx-auto`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <QrCode className="w-6 h-6" />
                  <h2 className="text-xl">{t.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* QR Scanner Area */}
              <Card className={`p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                <div className="text-center">
                  {!scanning ? (
                    <>
                      <div className={`w-32 h-32 mx-auto mb-4 border-4 border-dashed rounded-lg flex items-center justify-center ${
                        isDarkMode ? "border-gray-600" : "border-gray-300"
                      }`}>
                        <Camera className={`w-16 h-16 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`} />
                      </div>
                      <p className={`text-sm mb-4 ${modalClasses.textSecondary}`}>{t.instructions}</p>
                      <Button
                        onClick={handleScan}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {t.startScan}
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className={`w-32 h-32 mx-auto mb-4 border-4 rounded-lg flex items-center justify-center animate-pulse ${
                        isDarkMode ? "border-emerald-400" : "border-emerald-500"
                      }`}>
                        <QrCode className={`w-16 h-16 ${
                          isDarkMode ? "text-emerald-400" : "text-emerald-600"
                        }`} />
                      </div>
                      <p className={isDarkMode ? "text-emerald-400" : "text-emerald-600"}>{t.scanning}</p>
                    </>
                  )}
                </div>
              </Card>

              {/* Manual Entry */}
              <div>
                <p className={`text-sm mb-2 ${modalClasses.textSecondary}`}>{t.manualEntry}</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleManualSubmit()}
                    placeholder={t.enterCode}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      modalClasses.input
                    }`}
                  />
                  <Button
                    onClick={handleManualSubmit}
                    disabled={!manualCode.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    {t.submit}
                  </Button>
                </div>
                {expectedCode && (
                  <p className={`text-xs mt-2 ${modalClasses.textMuted}`}>
                    {t.demoCode}: {expectedCode}
                  </p>
                )}
              </div>

              {/* Cancel Button */}
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                {t.cancel}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}