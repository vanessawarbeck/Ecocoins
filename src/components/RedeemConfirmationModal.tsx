import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, X, Coins } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import type { Reward } from "../utils/rewardsData";

interface RedeemConfirmationModalProps {
  reward: Reward | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentBalance: number;
}

export function RedeemConfirmationModal({ 
  reward, 
  isOpen, 
  onClose, 
  onConfirm,
  currentBalance 
}: RedeemConfirmationModalProps) {
  const { language } = useLanguage();

  if (!reward) return null;

  const title = language === "de" ? reward.titleDe : reward.titleEn;
  const newBalance = currentBalance - reward.coins;

  const texts = {
    de: {
      confirmRedeem: "Einlösung bestätigen",
      confirmQuestion: "Möchtest du diese Belohnung wirklich einlösen?",
      currentBalance: "Aktuelles Guthaben",
      cost: "Kosten",
      newBalance: "Neues Guthaben",
      warning: "Diese Aktion kann nicht rückgängig gemacht werden.",
      confirm: "Ja, einlösen",
      cancel: "Abbrechen",
    },
    en: {
      confirmRedeem: "Confirm Redemption",
      confirmQuestion: "Do you really want to redeem this reward?",
      currentBalance: "Current Balance",
      cost: "Cost",
      newBalance: "New Balance",
      warning: "This action cannot be undone.",
      confirm: "Yes, redeem",
      cancel: "Cancel",
    },
  };

  const t = texts[language];

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
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[60] bg-white rounded-2xl shadow-2xl max-w-md mx-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6" />
                  <h2 className="text-xl">{t.confirmRedeem}</h2>
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
              {/* Reward Preview */}
              <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{reward.icon}</div>
                  <div>
                    <h3 className="text-gray-900">{title}</h3>
                    <p className="text-sm text-amber-600">{reward.coins} Eco Coins</p>
                  </div>
                </div>
              </Card>

              {/* Balance Overview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{t.currentBalance}</span>
                  <span className="text-gray-900">{currentBalance} Coins</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-gray-600">{t.cost}</span>
                  <span className="text-red-600">-{reward.coins} Coins</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                  <span className="text-sm text-emerald-700">{t.newBalance}</span>
                  <span className="text-lg text-emerald-600">{newBalance} Coins</span>
                </div>
              </div>

              {/* Warning */}
              <Card className="p-3 bg-yellow-50 border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-800">{t.warning}</p>
                </div>
              </Card>

              {/* Question */}
              <p className="text-center text-gray-700">{t.confirmQuestion}</p>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="py-3 rounded-xl"
                >
                  {t.cancel}
                </Button>
                <Button
                  onClick={onConfirm}
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-xl"
                >
                  {t.confirm}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
