import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Copy, Calendar, QrCode } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import type { RedemptionHistory } from "../utils/rewardsData";

interface RedeemSuccessModalProps {
  redemption: RedemptionHistory | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RedeemSuccessModal({ redemption, isOpen, onClose }: RedeemSuccessModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [copied, setCopied] = useState(false);

  if (!redemption) return null;

  const title = language === "de" ? redemption.rewardTitleDe : redemption.rewardTitleEn;

  const texts = {
    de: {
      success: "Erfolgreich eingelöst!",
      congrats: "Glückwunsch! Deine Belohnung wurde eingelöst.",
      code: "Einlöse-Code",
      copyCode: "Code kopieren",
      copied: "Kopiert!",
      validUntil: "Gültig bis",
      instructions: "So löst du ein",
      instruction1: "Zeige diesen Code beim Partner vor",
      instruction2: "Oder scanne den QR-Code",
      instruction3: "Code ist 30 Tage gültig",
      viewHistory: "Einlösehistorie ansehen",
      done: "Fertig",
      saveCode: "Speichere diesen Code!",
    },
    en: {
      success: "Successfully Redeemed!",
      congrats: "Congratulations! Your reward has been redeemed.",
      code: "Redemption Code",
      copyCode: "Copy Code",
      copied: "Copied!",
      validUntil: "Valid Until",
      instructions: "How to redeem",
      instruction1: "Show this code to the partner",
      instruction2: "Or scan the QR code",
      instruction3: "Code is valid for 30 days",
      viewHistory: "View Redemption History",
      done: "Done",
      saveCode: "Save this code!",
    },
  };

  const t = texts[language];

  const handleCopyCode = () => {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(redemption.code)
        .then(() => {
          setCopied(true);
          toast.success(t.copied);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          // Fallback if clipboard API fails
          fallbackCopyCode();
        });
    } else {
      // Use fallback for older browsers or restricted contexts
      fallbackCopyCode();
    }
  };

  const fallbackCopyCode = () => {
    try {
      // Create a temporary textarea
      const textarea = document.createElement('textarea');
      textarea.value = redemption.code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      
      // Execute copy command
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        setCopied(true);
        toast.success(t.copied);
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.info(language === "de" ? "Bitte Code manuell kopieren" : "Please copy code manually");
      }
    } catch (err) {
      toast.info(language === "de" ? "Bitte Code manuell kopieren" : "Please copy code manually");
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
            className="fixed inset-0 bg-black/70 z-[70]"
            style={{ top: "56px" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed inset-x-4 top-1/2 -translate-y-1/2 z-[70] rounded-2xl shadow-2xl max-w-md mx-auto max-h-[85vh] overflow-y-auto ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {/* Success Animation Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-2xl relative overflow-hidden">
              {/* Confetti Background */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0 }}
                    animate={{ 
                      y: 300,
                      opacity: [0, 1, 0],
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      delay: Math.random() * 0.5,
                      repeat: Infinity,
                    }}
                    className="absolute text-2xl"
                  >
                    {["🎉", "✨", "🎊", "⭐"][Math.floor(Math.random() * 4)]}
                  </motion.div>
                ))}
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-12 h-12" />
                  </motion.div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-2xl mb-2">{t.success}</h2>
                <p className="text-emerald-100">{t.congrats}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Reward Info */}
              <Card className={`p-4 border ${
                isDarkMode 
                  ? "bg-gradient-to-br from-amber-900/40 to-orange-900/40 border-amber-700" 
                  : "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200"
              }`}>
                <div className="text-center">
                  <h3 className={`text-xl mb-2 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {title}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                    -{redemption.coins} Eco Coins
                  </p>
                </div>
              </Card>

              {/* Redemption Code */}
              <Card className={`p-4 border ${
                isDarkMode 
                  ? "bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-700" 
                  : "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200"
              }`}>
                <div className="text-center">
                  <p className={`text-sm mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {t.code}
                  </p>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className={`rounded-lg p-4 mb-3 border-2 ${
                      isDarkMode 
                        ? "bg-gray-700 border-emerald-600" 
                        : "bg-white border-emerald-300"
                    }`}
                  >
                    <p className={`text-2xl tracking-wider select-all ${
                      isDarkMode ? "text-emerald-400" : "text-emerald-600"
                    }`}>
                      {redemption.code}
                    </p>
                  </motion.div>
                  <Button
                    onClick={handleCopyCode}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copied ? t.copied : t.copyCode}
                  </Button>
                </div>
              </Card>

              {/* QR Code Placeholder */}
              <Card className={`p-6 border ${
                isDarkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"
              }`}>
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto rounded-lg border-2 flex items-center justify-center mb-3 ${
                    isDarkMode 
                      ? "bg-gray-600 border-gray-500" 
                      : "bg-white border-gray-300"
                  }`}>
                    <QrCode className={`w-16 h-16 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} />
                  </div>
                  <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {language === "de" ? "QR-Code für Einlösung" : "QR Code for redemption"}
                  </p>
                </div>
              </Card>

              {/* Valid Until */}
              <Card className={`p-3 border ${
                isDarkMode 
                  ? "bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-700" 
                  : "bg-blue-50 border-blue-200"
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                    <span className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                      {t.validUntil}
                    </span>
                  </div>
                  <span className={`text-sm ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                    {formatDate(redemption.expiresAt)}
                  </span>
                </div>
              </Card>

              {/* Instructions */}
              <Card className={`p-4 border ${
                isDarkMode 
                  ? "bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-700" 
                  : "bg-yellow-50 border-yellow-200"
              }`}>
                <h4 className={`text-sm mb-3 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                  {t.instructions}
                </h4>
                <div className="space-y-2">
                  {[t.instruction1, t.instruction2, t.instruction3].map((instruction, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${
                        isDarkMode 
                          ? "bg-yellow-600 text-yellow-100" 
                          : "bg-yellow-400 text-yellow-900"
                      }`}>
                        {i + 1}
                      </div>
                      <p className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>
                        {instruction}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Warning */}
              <Card className={`p-3 border ${
                isDarkMode 
                  ? "bg-red-900/30 border-red-700" 
                  : "bg-red-50 border-red-200"
              }`}>
                <div className="flex items-start gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ⚠️
                  </motion.div>
                  <p className={`text-xs ${isDarkMode ? "text-red-300" : "text-red-800"}`}>
                    {t.saveCode}
                  </p>
                </div>
              </Card>

              {/* Buttons */}
              <div className="space-y-2">
                <Button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 rounded-xl"
                >
                  {t.done}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}