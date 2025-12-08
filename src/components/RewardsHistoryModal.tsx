import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Gift } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useLanguage } from "../utils/LanguageContext";
import { getRedeemedRewards, getTotalRedeemedCoins } from "../utils/rewardsHistory";

interface RewardsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RewardsHistoryModal({ isOpen, onClose }: RewardsHistoryModalProps) {
  const { language } = useLanguage();
  const redeemedRewards = getRedeemedRewards();
  const totalRedeemed = getTotalRedeemedCoins();

  if (!isOpen) return null;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    if (language === "de") {
      return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <Card className="bg-white rounded-3xl overflow-hidden max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl">
                  {language === "de" ? "Einlöse-Historie" : "Redemption History"}
                </h2>
                <p className="text-sm text-emerald-100">
                  {language === "de" ? "Deine eingelösten Belohnungen" : "Your redeemed rewards"}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-emerald-100 mb-1">
                  {language === "de" ? "Gesamt eingelöst" : "Total Redeemed"}
                </p>
                <p className="text-2xl">{redeemedRewards.length}</p>
                <p className="text-xs text-emerald-100">
                  {language === "de" ? "Belohnungen" : "Rewards"}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                <p className="text-xs text-emerald-100 mb-1">
                  {language === "de" ? "Coins ausgegeben" : "Coins Spent"}
                </p>
                <p className="text-2xl">{totalRedeemed.toLocaleString()}</p>
                <p className="text-xs text-emerald-100">Eco Coins</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {redeemedRewards.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎁</div>
                <p className="text-gray-500">
                  {language === "de"
                    ? "Noch keine Belohnungen eingelöst"
                    : "No rewards redeemed yet"}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {language === "de"
                    ? "Sammle Coins und löse tolle Belohnungen ein!"
                    : "Collect coins and redeem great rewards!"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {redeemedRewards.map((reward, index) => (
                  <motion.div
                    key={reward.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{reward.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="text-gray-900 mb-1">
                                {language === "de" ? reward.rewardTitle : reward.rewardTitleEn}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(reward.timestamp)}</span>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs whitespace-nowrap bg-white"
                            >
                              {language === "de" ? reward.category : reward.categoryEn}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full">
                              <span className="text-red-700 text-sm">
                                -{reward.coins}
                              </span>
                              <span className="text-xs text-red-600">Coins</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
