import { motion } from "motion/react";
import { useState } from "react";
import { Coins, Gift, TrendingUp, Clock, CheckCircle, X, Filter } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../utils/LanguageContext";
import { useActivities } from "../utils/ActivityContext";
import { RewardDetailModal } from "./RewardDetailModal";
import { RedeemConfirmationModal } from "./RedeemConfirmationModal";
import { RedeemSuccessModal } from "./RedeemSuccessModal";
import { RedeemAnimation } from "./RedeemAnimation";
import { getRewards, getPopularRewards, addRedemption, getRedemptionHistory } from "../utils/rewardsData";
import type { Reward, RedemptionHistory } from "../utils/rewardsData";
import { toast } from "sonner@2.0.3";
import headerImage from "figma:asset/f1a0d204a7011fa2fda1761629ac7187d1520e86.png";

type FilterType = "all" | "food" | "mobility" | "education" | "leisure";

export function RewardsPage() {
  const { language } = useLanguage();
  const { getTotalCoins } = useActivities();
  
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [confirmingReward, setConfirmingReward] = useState<Reward | null>(null);
  const [successRedemption, setSuccessRedemption] = useState<RedemptionHistory | null>(null);
  const [showRedeemAnimation, setShowRedeemAnimation] = useState(false);
  const [filter, setFilter] = useState<FilterType>("all");
  const [showHistory, setShowHistory] = useState(false);

  const totalCoins = getTotalCoins();
  const allRewards = getRewards();
  const popularRewards = getPopularRewards();
  const redemptionHistory = getRedemptionHistory();

  const texts = {
    de: {
      title: "Belohnungen",
      subtitle: "Löse deine Eco Coins ein",
      balance: "Guthaben",
      popular: "Beliebt bei Studenten",
      allRewards: "Alle Belohnungen",
      history: "Einlösehistorie",
      hideHistory: "Historie ausblenden",
      coins: "Coins",
      redeem: "Einlösen",
      viewDetails: "Details ansehen",
      available: "Verfügbar",
      filter: "Filter",
      all: "Alle",
      food: "Gastronomie",
      mobility: "Mobilität",
      education: "Bildung",
      leisure: "Freizeit",
      noRewards: "Keine Belohnungen gefunden",
      redeemed: "Eingelöst",
      validUntil: "Gültig bis",
      expired: "Abgelaufen",
      used: "Verwendet",
      unused: "Nicht verwendet",
      noHistory: "Noch keine Einlösungen",
      historyDesc: "Deine eingelösten Belohnungen erscheinen hier",
    },
    en: {
      title: "Rewards",
      subtitle: "Redeem your Eco Coins",
      balance: "Balance",
      popular: "Popular with Students",
      allRewards: "All Rewards",
      history: "Redemption History",
      hideHistory: "Hide History",
      coins: "Coins",
      redeem: "Redeem",
      viewDetails: "View Details",
      available: "Available",
      filter: "Filter",
      all: "All",
      food: "Food & Drink",
      mobility: "Mobility",
      education: "Education",
      leisure: "Leisure",
      noRewards: "No rewards found",
      redeemed: "Redeemed",
      validUntil: "Valid until",
      expired: "Expired",
      used: "Used",
      unused: "Unused",
      noHistory: "No redemptions yet",
      historyDesc: "Your redeemed rewards will appear here",
    },
  };

  const t = texts[language];

  const categoryMap: Record<string, FilterType> = {
    "Gastronomie": "food",
    "Food & Drink": "food",
    "Mobilität": "mobility",
    "Mobility": "mobility",
    "Bildung": "education",
    "Education": "education",
    "Freizeit": "leisure",
    "Leisure": "leisure",
  };

  const filteredRewards = allRewards.filter(reward => {
    if (filter === "all") return true;
    const category = language === "de" ? reward.categoryDe : reward.categoryEn;
    return categoryMap[category] === filter;
  });

  const handleRedeemClick = (reward: Reward) => {
    if (totalCoins >= reward.coins) {
      setConfirmingReward(reward);
    } else {
      toast.error(language === "de" ? "Nicht genug Coins!" : "Not enough coins!");
    }
  };

  const handleConfirmRedeem = () => {
    if (!confirmingReward) return;

    setConfirmingReward(null);
    setShowRedeemAnimation(true);

    setTimeout(() => {
      // Deduct coins
      const newTotal = totalCoins - confirmingReward.coins;
      localStorage.setItem("totalCoins", newTotal.toString());

      // Create redemption
      const redemption = addRedemption(confirmingReward);
      
      // Trigger activities update event
      window.dispatchEvent(new Event("activitiesUpdated"));
      
      setShowRedeemAnimation(false);
      setSuccessRedemption(redemption);
      
      toast.success(language === "de" ? "Erfolgreich eingelöst!" : "Successfully redeemed!");
    }, 2000);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = (date: Date) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Redeem Animation */}
      {showRedeemAnimation && confirmingReward && (
        <RedeemAnimation 
          coins={confirmingReward.coins} 
          onComplete={() => {}} 
        />
      )}

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-yellow-500 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5757]/40 via-[#FF8B8B]/40 to-yellow-500/40" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl mb-1">{t.title}</h1>
              <p className="text-white/90 text-sm">{t.subtitle}</p>
            </div>
            <Gift className="w-8 h-8 text-white/90" />
          </div>

          {/* Balance Display */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/30 rounded-full p-3">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">{t.balance}</p>
                  <p className="text-3xl">{totalCoins}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">{t.available}</p>
                <p className="text-xl">{allRewards.length}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* History Toggle */}
        <div className="flex items-center justify-between">
          <h2 className="text-gray-800">{showHistory ? t.history : t.popular}</h2>
          <Button
            onClick={() => setShowHistory(!showHistory)}
            variant="ghost"
            className="text-amber-600 hover:text-amber-700"
          >
            {showHistory ? t.hideHistory : t.history}
          </Button>
        </div>

        {/* Redemption History */}
        {showHistory ? (
          <div className="space-y-3">
            {redemptionHistory.length === 0 ? (
              <Card className="p-8 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <Gift className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-gray-900 dark:text-gray-100 mb-2">{t.noHistory}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t.historyDesc}</p>
                </div>
              </Card>
            ) : (
              redemptionHistory.map((redemption) => {
                const expired = isExpired(redemption.expiresAt);
                return (
                  <motion.div
                    key={redemption.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-gray-900 dark:text-gray-100 mb-1">
                            {language === "de" ? redemption.rewardTitleDe : redemption.rewardTitleEn}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {t.redeemed}: {formatDate(redemption.redeemedAt)}
                          </p>
                        </div>
                        <Badge className={redemption.used ? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" : expired ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"}>
                          {redemption.used ? t.used : expired ? t.expired : t.unused}
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 mb-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Code:</p>
                        <p className="text-sm font-mono text-gray-900 dark:text-gray-100">{redemption.code}</p>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">
                          {t.validUntil}: {formatDate(redemption.expiresAt)}
                        </span>
                        <span className="text-amber-600 dark:text-amber-400">-{redemption.coins} Coins</span>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
        ) : (
          <>
            {/* Popular Rewards */}
            <div className="space-y-3">
              {popularRewards.slice(0, 3).map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800 cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedReward(reward)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-4xl">{reward.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-gray-900 dark:text-gray-100">
                            {language === "de" ? reward.titleDe : reward.titleEn}
                          </h3>
                          <Badge className="bg-yellow-400 dark:bg-yellow-600 text-yellow-900 dark:text-yellow-100 text-xs">⭐</Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {language === "de" ? reward.descriptionDe : reward.descriptionEn}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span className="text-amber-600 dark:text-amber-400">{reward.coins} {t.coins}</span>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRedeemClick(reward);
                        }}
                        disabled={totalCoins < reward.coins}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white disabled:bg-gray-300 disabled:text-gray-600"
                      >
                        {t.redeem}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Filter */}
            <div>
              <h3 className="text-gray-800 mb-3">{t.allRewards}</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { key: "all" as FilterType, label: t.all, icon: "🎁" },
                  { key: "food" as FilterType, label: t.food, icon: "🍽️" },
                  { key: "mobility" as FilterType, label: t.mobility, icon: "🚇" },
                  { key: "education" as FilterType, label: t.education, icon: "📚" },
                  { key: "leisure" as FilterType, label: t.leisure, icon: "🏃" },
                ].map((item) => (
                  <Button
                    key={item.key}
                    onClick={() => setFilter(item.key)}
                    variant={filter === item.key ? "default" : "outline"}
                    className={`flex-shrink-0 ${
                      filter === item.key
                        ? "bg-amber-600 hover:bg-amber-700 text-white"
                        : "border-gray-300 text-gray-700 hover:border-amber-600"
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* All Rewards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className="p-3 bg-white border-gray-200 cursor-pointer hover:shadow-md transition-shadow h-full"
                    onClick={() => setSelectedReward(reward)}
                  >
                    <div className="text-center mb-2">
                      <div className="text-3xl mb-2">{reward.icon}</div>
                      <h4 className="text-sm text-gray-900 mb-1 line-clamp-2">
                        {language === "de" ? reward.titleDe : reward.titleEn}
                      </h4>
                      {reward.popular && (
                        <Badge className="bg-yellow-100 text-yellow-800 text-xs mb-2">⭐</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-1 text-amber-600">
                        <Coins className="w-3 h-3" />
                        <span className="text-sm">{reward.coins}</span>
                      </div>
                      
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRedeemClick(reward);
                        }}
                        disabled={totalCoins < reward.coins}
                        className="w-full text-xs py-2 bg-amber-600 hover:bg-amber-700 text-white disabled:bg-gray-300 disabled:text-gray-600"
                      >
                        {t.redeem}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredRewards.length === 0 && (
              <Card className="p-8 bg-gray-50 border-gray-200">
                <div className="text-center">
                  <Gift className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">{t.noRewards}</p>
                </div>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <RewardDetailModal
        reward={selectedReward}
        isOpen={selectedReward !== null}
        onClose={() => setSelectedReward(null)}
        onRedeem={handleRedeemClick}
        hasEnoughCoins={selectedReward ? totalCoins >= selectedReward.coins : false}
      />

      <RedeemConfirmationModal
        reward={confirmingReward}
        isOpen={confirmingReward !== null}
        onClose={() => setConfirmingReward(null)}
        onConfirm={handleConfirmRedeem}
        currentBalance={totalCoins}
      />

      <RedeemSuccessModal
        redemption={successRedemption}
        isOpen={successRedemption !== null}
        onClose={() => setSuccessRedemption(null)}
      />
    </div>
  );
}