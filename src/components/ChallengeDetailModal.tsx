import { motion, AnimatePresence } from "motion/react";
import { X, Award, Clock, Users, TrendingUp, Play, CheckCircle, BarChart } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useLanguage } from "../utils/LanguageContext";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import type { Challenge } from "../utils/challengeManager";
import { startChallenge, getChallenges } from "../utils/challengeManager";
import { PointsAnimation } from "./PointsAnimation";
import { addPointsTransaction } from "./PointsHistoryModal";

interface ChallengeDetailModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function ChallengeDetailModal({ challenge, isOpen, onClose, onUpdate }: ChallengeDetailModalProps) {
  const { language } = useLanguage();
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);

  if (!challenge) return null;

  const title = language === "de" ? challenge.titleDe : challenge.titleEn;
  const description = language === "de" ? challenge.descriptionDe : challenge.descriptionEn;
  const duration = language === "de" ? challenge.durationDe : challenge.durationEn;

  const texts = {
    de: {
      challengeDetails: "Challenge Details",
      status: "Status",
      progress: "Fortschritt",
      reward: "Belohnung",
      duration: "Dauer",
      participants: "Teilnehmer",
      completionRate: "Erfolgsrate",
      avgTime: "Ø Abschlusszeit",
      start: "Challenge starten",
      continue: "Fortsetzen",
      completed: "Abgeschlossen!",
      viewStats: "Statistik ansehen",
      statistics: "Statistik",
      available: "Verfügbar",
      active: "Aktiv",
      completedStatus: "Abgeschlossen",
      coinsAwarded: "Coins gutgeschrieben!",
      startedSuccess: "Challenge gestartet!",
      close: "Schließen",
    },
    en: {
      challengeDetails: "Challenge Details",
      status: "Status",
      progress: "Progress",
      reward: "Reward",
      duration: "Duration",
      participants: "Participants",
      completionRate: "Completion Rate",
      avgTime: "Avg Completion Time",
      start: "Start Challenge",
      continue: "Continue",
      completed: "Completed!",
      viewStats: "View Statistics",
      statistics: "Statistics",
      available: "Available",
      active: "Active",
      completedStatus: "Completed",
      coinsAwarded: "Coins awarded!",
      startedSuccess: "Challenge started!",
      close: "Close",
    },
  };

  const t = texts[language];

  const handleStart = () => {
    startChallenge(challenge.id);
    toast.success(t.startedSuccess);
    onUpdate();
    onClose();
  };

  const handleComplete = () => {
    // Award coins
    const totalCoins = parseInt(localStorage.getItem("totalCoins") || "0");
    localStorage.setItem("totalCoins", (totalCoins + challenge.coins).toString());

    // Add to history
    addPointsTransaction({
      type: "earn",
      amount: challenge.coins,
      source: title,
      timestamp: new Date(),
      category: language === "de" ? "Challenge abgeschlossen" : "Challenge Completed",
    });

    // Update challenge status directly in localStorage
    const challenges = getChallenges();
    const currentChallenge = challenges.find(c => c.id === challenge.id);
    if (currentChallenge) {
      currentChallenge.status = "completed";
      currentChallenge.completedAt = new Date();
      localStorage.setItem("challenges", JSON.stringify(challenges));
    }

    // Show animation
    setShowPointsAnimation(true);
    setTimeout(() => {
      setShowPointsAnimation(false);
      onUpdate();
      onClose();
    }, 2000);

    toast.success(t.coinsAwarded);
  };

  const getStatusBadge = () => {
    const statusConfig = {
      available: { color: "bg-blue-100 text-blue-800", text: t.available },
      active: { color: "bg-green-100 text-green-800", text: t.active },
      completed: { color: "bg-purple-100 text-purple-800", text: t.completedStatus },
    };

    const config = statusConfig[challenge.status];
    return (
      <Badge className={`${config.color} text-xs`}>
        {config.text}
      </Badge>
    );
  };

  const progressPercentage = challenge.progress 
    ? (challenge.progress.current / challenge.progress.target) * 100 
    : 0;
  const isCompleted = challenge.status === "completed" || progressPercentage >= 100;

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
            {/* Points Animation */}
            {showPointsAnimation && (
              <PointsAnimation points={challenge.coins} onComplete={() => setShowPointsAnimation(false)} />
            )}

            {/* Header */}
            <div className={`bg-gradient-to-r ${challenge.color} text-white p-6 rounded-t-3xl`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                    {challenge.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl">{title}</h2>
                    <p className="text-white/80 text-sm">{description}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{t.status}:</span>
                {getStatusBadge()}
              </div>

              {/* Progress */}
              {challenge.progress && (
                <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-700">{t.progress}</span>
                    <span className="text-sm text-gray-900">
                      {challenge.progress.current} / {challenge.progress.target} {challenge.progress.unit}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3 mb-2" />
                  <p className="text-xs text-gray-600 text-right">
                    {Math.round(progressPercentage)}%
                  </p>
                </Card>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Reward */}
                <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
                  <Award className="w-5 h-5 text-amber-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">{t.reward}</p>
                  <p className="text-lg text-amber-600">+{challenge.coins}</p>
                </Card>

                {/* Duration */}
                <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <Clock className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-xs text-gray-600 mb-1">{t.duration}</p>
                  <p className="text-sm text-blue-600">{duration}</p>
                </Card>
              </div>

              {/* Statistics */}
              {challenge.statistics && (
                <Card className="p-4 bg-white border-gray-200">
                  <h3 className="text-sm text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart className="w-4 h-4" />
                    {t.statistics}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">{t.participants}</p>
                      <p className="text-lg text-gray-900">{challenge.statistics.totalParticipants}</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">{t.completionRate}</p>
                      <p className="text-lg text-gray-900">{challenge.statistics.completionRate}%</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600 mb-1">{t.avgTime}</p>
                      <p className="text-sm text-gray-900">{challenge.statistics.averageTime}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {challenge.status === "available" && (
                  <Button
                    onClick={handleStart}
                    className={`w-full bg-gradient-to-r ${challenge.color} text-white py-6 rounded-xl`}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {t.start}
                  </Button>
                )}

                {challenge.status === "active" && !isCompleted && (
                  <Button
                    onClick={onClose}
                    className={`w-full bg-gradient-to-r ${challenge.color} text-white py-6 rounded-xl`}
                  >
                    {t.continue}
                  </Button>
                )}

                {challenge.status === "active" && isCompleted && (
                  <Button
                    onClick={handleComplete}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-6 rounded-xl"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    {t.completed}
                  </Button>
                )}

                {challenge.status === "completed" && (
                  <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <p className="text-green-600">{t.coinsAwarded}</p>
                  </div>
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