import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Square, XCircle, Clock, Award, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { updateChallengeProgress, type Challenge } from "../utils/challengeManager";
import { addPointsTransaction } from "./PointsHistoryModal";
import { useLanguage } from "../utils/LanguageContext";

export interface Action {
  id: number;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  icon: any;
  color: string;
  coins: string;
  coinsPer5Min?: number;
  category?: string;
  details: string;
  detailsEn?: string;
  instructions: string[];
  instructionsEn?: string[];
}

interface ActionHistory {
  date: string;
  duration?: string;
  coins: number;
  status: "completed" | "cancelled";
}

interface ActiveAction {
  id: number;
  startTime: number;
}

interface ActionDetailModalProps {
  action: Action | null;
  isOpen: boolean;
  onClose: () => void;
  activeAction: ActiveAction | null;
  currentDuration?: string;
  onStart: () => void;
  onStop: () => void;
  onCancel: () => void;
}

export function ActionDetailModal({
  action,
  isOpen,
  onClose,
  activeAction,
  currentDuration,
  onStart,
  onStop,
  onCancel,
}: ActionDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"details" | "history">("details");
  const { language } = useLanguage();

  if (!action || !isOpen) return null;

  // Mock history data - in real app this would come from state/database
  const history: ActionHistory[] = [
    {
      date: "24.11.2024 - 14:30",
      duration: "25 Min",
      coins: 30,
      status: "completed",
    },
    {
      date: "23.11.2024 - 09:15",
      duration: "18 Min",
      coins: 22,
      status: "completed",
    },
    {
      date: "22.11.2024 - 16:45",
      duration: "5 Min",
      coins: 0,
      status: "cancelled",
    },
    {
      date: "21.11.2024 - 11:20",
      duration: "32 Min",
      coins: 35,
      status: "completed",
    },
  ];

  const totalCoins = history
    .filter((h) => h.status === "completed")
    .reduce((sum, h) => sum + h.coins, 0);
  const completedActions = history.filter((h) => h.status === "completed").length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md relative max-h-[90vh] overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <Card className="bg-white rounded-3xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-br ${action.color} text-white p-6`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                <div className="text-3xl">{action.icon}</div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl mb-1">
                  {language === "de" ? action.title : (action.titleEn || action.title)}
                </h2>
                <p className="text-sm text-white/90">
                  {language === "de" ? action.description : (action.descriptionEn || action.description)}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            {activeAction && activeAction.id === action.id && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 inline-flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <span className="text-sm">
                  {language === "de" ? "Läuft" : "Running"}: {currentDuration || "0:00"}
                </span>
              </motion.div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("details")}
              className={`flex-1 py-3 text-sm transition-colors ${
                activeTab === "details"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500"
              }`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-3 text-sm transition-colors ${
                activeTab === "history"
                  ? "text-emerald-600 border-b-2 border-emerald-600"
                  : "text-gray-500"
              }`}
            >
              {language === "de" ? "Historie" : "History"}
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[50vh] overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  {/* Details */}
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      {language === "de" ? "Über diese Aktion" : "About this Action"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {language === "de" ? action.details : (action.detailsEn || action.details)}
                    </p>
                  </div>

                  {/* Instructions */}
                  <div>
                    <h3 className="text-gray-900 mb-2">
                      {language === "de" ? "So funktioniert's" : "How it Works"}
                    </h3>
                    <ol className="space-y-2">
                      {(language === "de" ? action.instructions : (action.instructionsEn || action.instructions)).map((instruction, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="flex-shrink-0 w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs">
                            {index + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Rewards */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      <h3 className="text-gray-900">
                        {language === "de" ? "Belohnung" : "Reward"}
                      </h3>
                    </div>
                    <p className="text-2xl text-emerald-600">{action.coins}</p>
                  </div>
                </motion.div>
              )}

              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <Card className="p-3 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                      <p className="text-xs text-gray-600 mb-1">
                        {language === "de" ? "Gesamt verdient" : "Total Earned"}
                      </p>
                      <p className="text-xl text-emerald-600">{totalCoins}</p>
                      <p className="text-xs text-gray-500">Eco Coins</p>
                    </Card>
                    <Card className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">
                        {language === "de" ? "Abgeschlossen" : "Completed"}
                      </p>
                      <p className="text-xl text-blue-600">{completedActions}</p>
                      <p className="text-xs text-gray-500">
                        {language === "de" ? "Aktionen" : "Actions"}
                      </p>
                    </Card>
                  </div>

                  {/* History List */}
                  <div>
                    <h3 className="text-gray-900 mb-3">
                      {language === "de" ? "Verlauf" : "History"}
                    </h3>
                    <div className="space-y-2">
                      {history.map((item, index) => (
                        <Card
                          key={index}
                          className={`p-3 ${
                            item.status === "completed"
                              ? "bg-white border-gray-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-xs text-gray-600">
                                {item.date}
                              </span>
                            </div>
                            <Badge
                              variant={
                                item.status === "completed" ? "default" : "secondary"
                              }
                              className={
                                item.status === "completed"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : "bg-gray-100 text-gray-600 border-gray-200"
                              }
                            >
                              {item.status === "completed"
                                ? (language === "de" ? "Abgeschlossen" : "Completed")
                                : (language === "de" ? "Abgebrochen" : "Cancelled")}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">
                              {language === "de" ? "Dauer" : "Duration"}: {item.duration}
                            </span>
                            {item.status === "completed" && (
                              <span className="text-emerald-600 text-sm">
                                +{item.coins} Coins
                              </span>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            {!activeAction || activeAction.id !== action.id ? (
              <Button
                onClick={onStart}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full py-6"
              >
                <Play className="w-5 h-5 mr-2" />
                {language === "de" ? "Aktion starten" : "Start Action"}
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  onClick={onStop}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full py-6"
                >
                  <Square className="w-5 h-5 mr-2" />
                  {language === "de" ? "Beenden" : "Complete"}
                </Button>
                <Button
                  onClick={onCancel}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50 rounded-full py-6"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  {language === "de" ? "Abbrechen" : "Cancel"}
                </Button>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}