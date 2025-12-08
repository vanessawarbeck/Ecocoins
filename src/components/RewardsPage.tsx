import { motion } from "motion/react";
import { Gift, Coffee, ShoppingBag, Ticket, BookOpen, Utensils, History } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useState } from "react";
import { useActivities } from "../utils/ActivityContext";
import { addRedeemedReward } from "../utils/rewardsHistory";
import { RewardsHistoryModal } from "./RewardsHistoryModal";
import { toast } from "sonner@2.0.3";

export function RewardsPage() {
  const { t, language } = useLanguage();
  const { getTotalCoins } = useActivities();
  const [showHistory, setShowHistory] = useState(false);
  const [redeemingId, setRedeemingId] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0); // Force re-render after redeeming

  const rewards = [
    {
      id: 1,
      title: "Gratis Kaffee",
      titleEn: "Free Coffee",
      description: "Einen kostenlosen Kaffee in der Campus-Cafeteria",
      descriptionEn: "One free coffee at the campus cafeteria",
      icon: Coffee,
      coins: 50,
      color: "from-amber-500 to-amber-600",
      available: 12,
      category: "Essen & Trinken",
      categoryEn: "Food & Drinks",
      iconEmoji: "☕",
    },
    {
      id: 2,
      title: "Mensa-Gutschein",
      titleEn: "Cafeteria Voucher",
      description: "5€ Rabatt in der Mensa",
      descriptionEn: "€5 discount at the cafeteria",
      icon: Utensils,
      coins: 100,
      color: "from-orange-500 to-orange-600",
      available: 8,
      category: "Essen & Trinken",
      categoryEn: "Food & Drinks",
      iconEmoji: "🍽️",
    },
    {
      id: 3,
      title: "Campus Store 10%",
      titleEn: "Campus Store 10%",
      description: "10% Rabatt im Campus Store",
      descriptionEn: "10% discount at Campus Store",
      icon: ShoppingBag,
      coins: 150,
      color: "from-purple-500 to-purple-600",
      available: 5,
      category: "Shopping",
      categoryEn: "Shopping",
      iconEmoji: "🛍️",
    },
    {
      id: 4,
      title: "Event-Ticket",
      titleEn: "Event Ticket",
      description: "Freier Eintritt zu Campus-Events",
      descriptionEn: "Free entry to campus events",
      icon: Ticket,
      coins: 200,
      color: "from-pink-500 to-pink-600",
      available: 3,
      category: "Events",
      categoryEn: "Events",
      iconEmoji: "🎫",
    },
    {
      id: 5,
      title: "Bibliotheks-Pass",
      titleEn: "Library Pass",
      description: "Verlängerte Ausleihfrist für 1 Monat",
      descriptionEn: "Extended borrowing period for 1 month",
      icon: BookOpen,
      coins: 75,
      color: "from-blue-500 to-blue-600",
      available: 15,
      category: "Bildung",
      categoryEn: "Education",
      iconEmoji: "📚",
    },
    {
      id: 6,
      title: "Mehrweg-Set",
      titleEn: "Reusable Set",
      description: "Nachhaltiges Besteck-Set aus Bambus",
      descriptionEn: "Sustainable bamboo cutlery set",
      icon: Gift,
      coins: 250,
      color: "from-green-500 to-green-600",
      available: 4,
      category: "Nachhaltigkeit",
      categoryEn: "Sustainability",
      iconEmoji: "🎁",
    },
  ];

  const userCoins = getTotalCoins();

  const canAfford = (coins: number) => userCoins >= coins;

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (!canAfford(reward.coins)) return;

    setRedeemingId(reward.id);

    // Simulate redeeming process
    setTimeout(() => {
      addRedeemedReward({
        rewardId: reward.id,
        rewardTitle: reward.title,
        rewardTitleEn: reward.titleEn,
        coins: reward.coins,
        category: reward.category,
        categoryEn: reward.categoryEn,
        icon: reward.iconEmoji,
      });

      toast.success(
        language === "de"
          ? `${reward.title} erfolgreich eingelöst! 🎉`
          : `${reward.titleEn} redeemed successfully! 🎉`,
        {
          description:
            language === "de"
              ? `Du hast ${reward.coins} Coins ausgegeben.`
              : `You spent ${reward.coins} coins.`,
        }
      );

      setRedeemingId(null);
      setRefreshKey(prevKey => prevKey + 1); // Force re-render
    }, 800);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3 mb-3">
          <Gift className="w-8 h-8" />
          <h1 className="text-2xl">
            {language === "de" ? "Belohnungen" : "Rewards"}
          </h1>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
          <p className="text-emerald-100 text-sm mb-1">
            {language === "de" ? "Dein Guthaben" : "Your Balance"}
          </p>
          <p className="text-2xl">{userCoins.toLocaleString()} Eco Coins</p>
        </div>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Info */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
            <p className="text-sm text-emerald-800 text-center">
              {language === "de"
                ? "🎁 Löse deine Eco Coins gegen tolle Belohnungen ein!"
                : "🎁 Redeem your Eco Coins for great rewards!"}
            </p>
          </Card>
        </motion.div>

        {/* Rewards Grid */}
        <div className="space-y-3">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            const affordable = canAfford(reward.coins);

            return (
              <motion.div
                key={reward.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card
                  className={`p-4 bg-white border-emerald-100 shadow-md ${
                    !affordable ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`bg-gradient-to-br ${reward.color} text-white rounded-2xl p-4 flex-shrink-0`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="text-gray-900 mb-1">
                            {language === "de" ? reward.title : reward.titleEn}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {language === "de"
                              ? reward.description
                              : reward.descriptionEn}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="text-xs whitespace-nowrap"
                        >
                          {language === "de"
                            ? reward.category
                            : reward.categoryEn}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-full">
                            <span className="text-emerald-700">
                              {reward.coins}
                            </span>
                            <span className="text-xs text-emerald-600">
                              Coins
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {reward.available} {language === "de" ? "verfügbar" : "available"}
                          </span>
                        </div>

                        <Button
                          disabled={!affordable || redeemingId === reward.id}
                          className={`rounded-full ${
                            affordable
                              ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                          onClick={() => handleRedeem(reward)}
                        >
                          {redeemingId === reward.id
                            ? "..."
                            : affordable
                            ? language === "de"
                              ? "Einlösen"
                              : "Redeem"
                            : language === "de"
                            ? "Zu wenig Coins"
                            : "Not enough Coins"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Popular Rewards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-4 bg-white border-emerald-100">
            <h3 className="text-gray-900 mb-3">
              🌟 {language === "de" ? "Beliebt bei Studenten" : "Popular with Students"}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  1. {language === "de" ? "Gratis Kaffee" : "Free Coffee"} ☕
                </span>
                <span className="text-emerald-600">
                  156x {language === "de" ? "eingelöst" : "redeemed"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  2. {language === "de" ? "Mensa-Gutschein" : "Cafeteria Voucher"} 🍽️
                </span>
                <span className="text-emerald-600">
                  89x {language === "de" ? "eingelöst" : "redeemed"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  3. {language === "de" ? "Event-Ticket" : "Event Ticket"} 🎫
                </span>
                <span className="text-emerald-600">
                  67x {language === "de" ? "eingelöst" : "redeemed"}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* History Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6 rounded-2xl shadow-lg flex items-center justify-center gap-2"
            onClick={() => setShowHistory(true)}
          >
            <History className="w-5 h-5" />
            {language === "de" ? "Einlöse-Historie anzeigen" : "Show Redemption History"}
          </Button>
        </motion.div>
      </div>

      {/* Rewards History Modal */}
      <RewardsHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </div>
  );
}