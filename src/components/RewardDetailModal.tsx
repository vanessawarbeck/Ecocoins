import { motion, AnimatePresence } from "motion/react";
import { X, Coins, Users, Calendar, CheckCircle, Info, Store } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../utils/LanguageContext";
import type { Reward } from "../utils/rewardsData";

interface RewardDetailModalProps {
  reward: Reward | null;
  isOpen: boolean;
  onClose: () => void;
  onRedeem: (reward: Reward) => void;
  hasEnoughCoins: boolean;
}

export function RewardDetailModal({ reward, isOpen, onClose, onRedeem, hasEnoughCoins }: RewardDetailModalProps) {
  const { language } = useLanguage();

  if (!reward) return null;

  const title = language === "de" ? reward.titleDe : reward.titleEn;
  const description = language === "de" ? reward.descriptionDe : reward.descriptionEn;
  const category = language === "de" ? reward.categoryDe : reward.categoryEn;
  const terms = language === "de" ? reward.termsDE : reward.termsEN;

  const texts = {
    de: {
      details: "Details",
      category: "Kategorie",
      coins: "Kosten",
      available: "Verfügbar",
      redeemed: "Bereits eingelöst",
      partner: "Partner",
      validUntil: "Gültig bis",
      terms: "Bedingungen",
      redeem: "Einlösen",
      notEnough: "Nicht genug Coins",
      close: "Schließen",
      popular: "Beliebt bei Studenten",
      items: "Stück",
    },
    en: {
      details: "Details",
      category: "Category",
      coins: "Cost",
      available: "Available",
      redeemed: "Already redeemed",
      partner: "Partner",
      validUntil: "Valid until",
      terms: "Terms & Conditions",
      redeem: "Redeem",
      notEnough: "Not enough coins",
      close: "Close",
      popular: "Popular with students",
      items: "items",
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
            className="fixed inset-0 bg-black/50 z-50"
            style={{ top: "56px" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ top: "56px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                    {reward.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl">{title}</h2>
                    <p className="text-amber-100 text-sm">{description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {reward.popular && (
                <Badge className="bg-yellow-400 text-yellow-900 border-0">
                  ⭐ {t.popular}
                </Badge>
              )}
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Cost */}
              <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Coins className="w-6 h-6 text-amber-600" />
                    <span className="text-gray-700">{t.coins}</span>
                  </div>
                  <span className="text-2xl text-amber-600">{reward.coins} Eco Coins</span>
                </div>
              </Card>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Category */}
                <Card className="p-3 bg-white border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">{t.category}</p>
                  <p className="text-sm text-gray-900">{category}</p>
                </Card>

                {/* Available */}
                <Card className="p-3 bg-white border-gray-200">
                  <p className="text-xs text-gray-600 mb-1">{t.available}</p>
                  <p className="text-sm text-gray-900">{reward.available} {t.items}</p>
                </Card>
              </div>

              {/* Stats */}
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-700">{t.redeemed}</p>
                    <p className="text-lg text-blue-600">{reward.redeemedCount}x</p>
                  </div>
                </div>
              </Card>

              {/* Partner */}
              {reward.partner && (
                <Card className="p-4 bg-purple-50 border-purple-200">
                  <div className="flex items-center gap-3">
                    <Store className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-xs text-gray-600 mb-1">{t.partner}</p>
                      <p className="text-sm text-purple-900">{reward.partner}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Terms */}
              {terms && (
                <Card className="p-4 bg-gray-50 border-gray-200">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t.terms}</p>
                      <p className="text-sm text-gray-700">{terms}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {hasEnoughCoins ? (
                  <Button
                    onClick={() => onRedeem(reward)}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-6 rounded-xl"
                  >
                    <Coins className="w-5 h-5 mr-2" />
                    {t.redeem} ({reward.coins} Coins)
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="w-full bg-gray-300 text-gray-600 py-6 rounded-xl cursor-not-allowed"
                  >
                    {t.notEnough}
                  </Button>
                )}

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full py-4 rounded-xl"
                >
                  {t.close}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
