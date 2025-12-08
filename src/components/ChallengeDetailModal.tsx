"use client";

import { motion } from "motion/react";
import { X, Clock, Award, Calendar, CheckCircle, TrendingUp, Play, Eye, XCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { useLanguage } from "../utils/LanguageContext";
import type { Challenge, CompletedActionDetail } from "../utils/challengeManager";
import { getTimeRemaining } from "../utils/challengeManager";

interface ChallengeDetailModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onStart: (challengeId: string) => void;
  onCancel: (challengeId: string) => void;
  onOpenAction: (actionType: Challenge["actionType"]) => void;
}

export function ChallengeDetailModal({
  challenge,
  isOpen,
  onClose,
  onStart,
  onCancel,
  onOpenAction,
}: ChallengeDetailModalProps) {
  const { language } = useLanguage();
  
  if (!isOpen || !challenge) return null;

  const progressPercentage = (challenge.currentCount / challenge.targetCount) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Leicht":
      case "Easy":
        return "bg-green-100 text-green-700 border-green-200";
      case "Mittel":
      case "Medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Schwer":
      case "Hard":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getActionName = (actionType: Challenge["actionType"]) => {
    const names = {
      cycling: language === "de" ? "Fahrrad-Tracking" : "Bike Tracking",
      recycling: language === "de" ? "Recycling Scanner" : "Recycling Scanner",
      "reusable-cup": language === "de" ? "Mehrweg-Becher" : "Reusable Cup",
      quiz: language === "de" ? "Nachhaltigkeits-Quiz" : "Sustainability Quiz",
      event: language === "de" ? "Campus Events" : "Campus Events",
      "book-exchange": language === "de" ? "Büchertausch" : "Book Exchange",
    };
    return names[actionType] || actionType;
  };

  const formatActionDetail = (action: CompletedActionDetail) => {
    const date = new Date(action.timestamp);
    const dateStr = date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
    });
    const timeStr = date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });

    let details = `${dateStr} um ${timeStr}`;
    
    if (action.duration) {
      const minutes = Math.floor(action.duration / 60);
      details += ` • ${minutes} Min.`;
    }
    if (action.distance) {
      details += ` • ${action.distance.toFixed(1)} km`;
    }
    if (action.amount) {
      details += ` • ${action.amount} Flaschen`;
    }
    if (action.score !== undefined) {
      details += ` • ${action.score}% erreicht`;
    }
    if (action.location) {
      details += ` • ${action.location}`;
    }

    return details;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-br from-emerald-600 to-green-600 text-white p-6 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl"
            >
              {challenge.icon}
            </motion.div>
            <div className="flex-1">
              <Badge className={`${getDifficultyColor(language === "de" ? challenge.difficulty : challenge.difficultyEn)} border mb-2`}>
                {language === "de" ? challenge.difficulty : challenge.difficultyEn}
              </Badge>
              <h2 className="text-2xl mb-2">{language === "de" ? challenge.title : challenge.titleEn}</h2>
              <p className="text-emerald-100 text-sm">{language === "de" ? challenge.description : challenge.descriptionEn}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{language === "de" ? "Fortschritt" : "Progress"}</span>
              <span className="font-bold">
                {challenge.currentCount}/{challenge.targetCount}
              </span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-3 bg-white/20 [&>div]:bg-white"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 bg-emerald-50 border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <p className="text-xs text-emerald-700">
                  {language === "de" ? "Verbleibende Zeit" : "Time Remaining"}
                </p>
              </div>
              <p className="text-lg text-emerald-900">
                {getTimeRemaining(challenge.deadline, language)}
              </p>
            </Card>

            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-amber-600" />
                <p className="text-xs text-amber-700">
                  {language === "de" ? "Belohnung" : "Reward"}
                </p>
              </div>
              <p className="text-lg text-amber-900">+{challenge.reward} Coins</p>
            </Card>
          </div>

          {/* Status Card */}
          {challenge.status === "inactive" && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm text-blue-900 mb-1">
                    {language === "de"
                      ? "Challenge noch nicht gestartet"
                      : "Challenge not started yet"}
                  </p>
                  <p className="text-xs text-blue-700">
                    {language === "de"
                      ? "Starte die Challenge, um mit dem Sammeln zu beginnen!"
                      : "Start the challenge to begin collecting!"}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {challenge.status === "completed" && (
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm text-green-900 mb-1">
                    {language === "de"
                      ? "Challenge abgeschlossen! 🎉"
                      : "Challenge completed! 🎉"}
                  </p>
                  <p className="text-xs text-green-700">
                    {language === "de"
                      ? `Du hast ${challenge.reward} Eco Coins verdient!`
                      : `You earned ${challenge.reward} Eco Coins!`}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Action Button */}
          {challenge.status === "inactive" ? (
            <Button
              onClick={() => onStart(challenge.id)}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6"
            >
              <Play className="w-5 h-5 mr-2" />
              {language === "de" ? "Challenge starten" : "Start Challenge"}
            </Button>
          ) : challenge.status === "active" ? (
            <div className="space-y-3">
              <Button
                onClick={() => onOpenAction(challenge.actionType)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                {language === "de"
                  ? `${getActionName(challenge.actionType)} öffnen`
                  : `Open ${getActionName(challenge.actionType)}`}
              </Button>
              <Button
                onClick={() => {
                  onCancel(challenge.id);
                  onClose();
                }}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50 py-6"
              >
                <XCircle className="w-5 h-5 mr-2" />
                {language === "de" ? "Challenge abbrechen" : "Cancel Challenge"}
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => onOpenAction(challenge.actionType)}
              className="w-full bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white py-6"
            >
              <Eye className="w-5 h-5 mr-2" />
              {language === "de" ? "Aktion ansehen" : "View Action"}
            </Button>
          )}

          {/* Completed Actions List */}
          {challenge.completedActions.length > 0 && (
            <div>
              <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                {language === "de"
                  ? `Abgeschlossene Aktionen (${challenge.completedActions.length})`
                  : `Completed Actions (${challenge.completedActions.length})`}
              </h3>
              <div className="space-y-2">
                {challenge.completedActions.map((action, index) => (
                  <motion.div
                    key={action.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-3 bg-emerald-50 border-emerald-200">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">
                            {formatActionDetail(action)}
                          </p>
                        </div>
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {challenge.status === "active" && challenge.completedActions.length === 0 && (
            <Card className="p-6 text-center bg-gray-50 border-gray-200">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-3"
              >
                <TrendingUp className="w-12 h-12 text-gray-400" />
              </motion.div>
              <p className="text-gray-600 mb-1">
                {language === "de"
                  ? "Noch keine Aktionen abgeschlossen"
                  : "No actions completed yet"}
              </p>
              <p className="text-sm text-gray-500">
                {language === "de"
                  ? `Öffne ${getActionName(challenge.actionType)}, um zu beginnen!`
                  : `Open ${getActionName(challenge.actionType)} to get started!`}
              </p>
            </Card>
          )}

          {/* Tips */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <h4 className="text-sm text-blue-900 mb-2">
              💡 {language === "de" ? "Tipp" : "Tip"}
            </h4>
            <p className="text-xs text-blue-700">
              {language === "de"
                ? "Jede abgeschlossene Aktion bringt dich der Challenge näher. Fortschritt wird automatisch getrackt!"
                : "Each completed action brings you closer to the challenge. Progress is tracked automatically!"}
            </p>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}