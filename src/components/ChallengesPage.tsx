import { motion } from "motion/react";
import { Target, Clock, TrendingUp, Award, Bike, Recycle, Coffee, Brain, MapPin, History as HistoryIcon } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";
import { ChallengeDetailModal } from "./ChallengeDetailModal";
import { ActionDetailModal, type Action } from "./ActionDetailModal";
import { CoinsProgressModal } from "./CoinsProgressModal";
import { ActivityHistoryModal } from "./ActivityHistoryModal";
import { BikeTrackingModal } from "./BikeTrackingModal";
import { RecycleScanModal } from "./RecycleScanModal";
import { ReusableCupModal } from "./ReusableCupModal";
import { BookExchangeModal } from "./BookExchangeModal";
import { QuizModal } from "./QuizModal";
import { useLanguage } from "../utils/LanguageContext";
import { useActivities } from "../utils/ActivityContext";
import { ALL_ACTIONS } from "../utils/actions";
import {
  getChallenges,
  startChallenge,
  cancelChallenge,
  getTimeRemaining,
  updateChallengeProgress,
  type Challenge,
} from "../utils/challengeManager";
import { addPointsTransaction } from "./PointsHistoryModal";
import { PointsAnimation } from "./PointsAnimation";
import type { Page } from "../App";
import headerImage from "figma:asset/0697ae6ef0068f49798491ab725989d0c6f4182f.png";

interface ChallengesPageProps {
  onNavigate: (page: Page) => void;
}

interface ActiveAction {
  id: number;
  startTime: number;
}

export function ChallengesPage({ onNavigate }: ChallengesPageProps) {
  const { t, language } = useLanguage();
  const { activities, getTotalCoins } = useActivities();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction | null>(null);
  const [currentDuration, setCurrentDuration] = useState<string>("0:00");
  const [showCoinsProgress, setShowCoinsProgress] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showBikeTracking, setShowBikeTracking] = useState(false);
  const [showRecycleScan, setShowRecycleScan] = useState(false);
  const [showReusableCup, setShowReusableCup] = useState(false);
  const [showBookExchange, setShowBookExchange] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  useEffect(() => {
    setChallenges(getChallenges());
  }, []);

  // Quick action handler - same as HomePage
  const handleOpenQuickAction = (actionId: number) => {
    switch (actionId) {
      case 1:
        setShowBikeTracking(true);
        break;
      case 2:
        setShowRecycleScan(true);
        break;
      case 3:
        setShowReusableCup(true);
        break;
      case 6:
        setShowBookExchange(true);
        break;
    }
  };

  const handleModalClose = () => {
    // Reload challenges after any action
    setChallenges(getChallenges());
  };

  // Timer effect for active action - only for cycling
  useEffect(() => {
    let interval: NodeJS.Timeout;

    // Only run timer for cycling action (id: 1)
    if (activeAction && activeAction.id === 1) {
      interval = setInterval(() => {
        const elapsed = Date.now() - activeAction.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        setCurrentDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeAction]);

  const handleStartChallenge = (challengeId: string) => {
    startChallenge(challengeId);
    setChallenges(getChallenges());
    setSelectedChallenge(null);
  };

  const handleCancelChallenge = (challengeId: string) => {
    cancelChallenge(challengeId);
    setChallenges(getChallenges());
  };

  const handleOpenAction = (actionType: Challenge["actionType"]) => {
    setSelectedChallenge(null);
    
    // Map action type to action ID
    const actionTypeMap: Record<Challenge["actionType"], number> = {
      cycling: 1,
      recycling: 2,
      "reusable-cup": 3,
      quiz: 4,
      event: 5,
      "book-exchange": 6,
    };

    const actionId = actionTypeMap[actionType];
    const action = ALL_ACTIONS.find((a) => a.id === actionId);
    
    if (action) {
      setSelectedAction(action);
    }
  };

  const handleActionStart = () => {
    if (selectedAction) {
      setActiveAction({
        id: selectedAction.id,
        startTime: Date.now(),
      });
    }
  };

  const handleActionStop = () => {
    if (!activeAction || !selectedAction) return;

    // Calculate duration in seconds
    const durationSeconds = Math.floor((Date.now() - activeAction.startTime) / 1000);
    
    // Map action ID to challenge action type
    const actionTypeMap: Record<number, Challenge["actionType"]> = {
      1: "cycling",
      2: "recycling",
      3: "reusable-cup",
      4: "quiz",
      5: "event",
      6: "book-exchange",
    };

    const challengeActionType = actionTypeMap[selectedAction.id];
    
    // Calculate coins
    let coinsEarned = 15;
    if (selectedAction.id === 1) {
      coinsEarned = Math.min(30, Math.max(10, Math.floor(durationSeconds / 60) * 2));
    } else if (selectedAction.id === 2) {
      coinsEarned = 15;
    } else if (selectedAction.id === 3) {
      coinsEarned = 5;
    } else if (selectedAction.id === 4) {
      coinsEarned = 20;
    } else if (selectedAction.id === 5) {
      coinsEarned = 50;
    } else if (selectedAction.id === 6) {
      coinsEarned = 50;
    }

    // Update eco coins
    const currentCoins = parseInt(localStorage.getItem("ecoCoins") || "0");
    localStorage.setItem("ecoCoins", (currentCoins + coinsEarned).toString());

    // Add to points history
    const actionTitle = language === "de" ? selectedAction.title : selectedAction.titleEn;
    
    // Create description based on action type
    let descriptionText = "";
    if (selectedAction.id === 1) {
      // Cycling - show time
      descriptionText = `${language === "de" ? "Aktion abgeschlossen nach" : "Action completed after"} ${Math.floor(durationSeconds / 60)}:${(durationSeconds % 60).toString().padStart(2, "0")} ${language === "de" ? "Min." : "min."}`;
    } else if (selectedAction.id === 6) {
      // Book exchange
      descriptionText = language === "de" ? "Buch getauscht/abgegeben" : "Book exchanged/donated";
    } else if (selectedAction.id === 2) {
      // Recycling
      descriptionText = language === "de" ? "Pfandflasche(n) recycelt" : "Deposit bottle(s) recycled";
    } else if (selectedAction.id === 3) {
      // Reusable cup
      descriptionText = language === "de" ? "Mehrwegbecher genutzt" : "Reusable cup used";
    } else if (selectedAction.id === 4) {
      // Quiz
      descriptionText = language === "de" ? "Quiz abgeschlossen" : "Quiz completed";
    } else if (selectedAction.id === 5) {
      // Event
      descriptionText = language === "de" ? "Event-Teilnahme bestätigt" : "Event participation confirmed";
    } else {
      descriptionText = language === "de" ? "Aktion abgeschlossen" : "Action completed";
    }
    
    addPointsTransaction({
      type: "earned",
      amount: coinsEarned,
      action: actionTitle,
      category: challengeActionType as any,
      description: descriptionText,
    });

    // Update challenge progress
    if (challengeActionType) {
      updateChallengeProgress(challengeActionType, {
        id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        duration: durationSeconds,
        distance: selectedAction.id === 1 ? (durationSeconds / 60) * 0.25 : undefined,
        amount: selectedAction.id === 2 ? Math.floor(Math.random() * 5) + 1 : undefined,
        score: selectedAction.id === 4 ? Math.floor(Math.random() * 30) + 70 : undefined,
        location: selectedAction.id === 5 ? "Campus Hauptgebäude" : undefined,
      });
    }

    // Reload challenges to show updated progress
    setChallenges(getChallenges());
    
    setActiveAction(null);
    setCurrentDuration("0:00");
    setSelectedAction(null);

    // Show points animation
    setEarnedPoints(coinsEarned);
    setShowPointsAnimation(true);
    setTimeout(() => setShowPointsAnimation(false), 3000);
  };

  const handleActionCancel = () => {
    setActiveAction(null);
    setCurrentDuration("0:00");
  };

  const activeChallenges = challenges.filter((c) => c.status === "active");
  const inactiveChallenges = challenges.filter((c) => c.status === "inactive");
  const completedChallenges = challenges.filter((c) => c.status === "completed");

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Leicht":
      case "Easy":
        return "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700";
      case "Mittel":
      case "Medium":
        return "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700";
      case "Schwer":
      case "Hard":
        return "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-red-300 dark:border-red-700";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600";
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-orange-500 text-white p-6 rounded-b-3xl shadow-lg mb-4"
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5757]/40 via-[#FF8B8B]/40 to-orange-500/40" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-8 h-8" />
            <h1 className="text-2xl">{t.challenges.title}</h1>
          </div>
          <p className="text-white/90 text-sm">
            {t.challenges.subtitle}
          </p>
        </div>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Quick Actions */}
        <div>
          <h2 className="text-gray-800 dark:text-gray-200 mb-3 px-1">{t.home?.quickActions || (language === "de" ? "Schnellaktionen" : "Quick Actions")}</h2>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(1)}
            >
              <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">🚴</div>
                <p className="text-sm">{t.home?.bikeTracking || (language === "de" ? "Fahrrad-Tracking" : "Bike Tracking")}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(2)}
            >
              <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">♻️</div>
                <p className="text-sm">{t.home?.recycleNow || (language === "de" ? "Recycling Scanner" : "Recycle Now")}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(3)}
            >
              <Card className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">🥤</div>
                <p className="text-sm">{t.home?.reusableCup || (language === "de" ? "Mehrweg-Becher" : "Reusable Cup")}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(6)}
            >
              <Card className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">📚</div>
                <p className="text-sm">{language === "de" ? "Büchertausch" : "Book Exchange"}</p>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 mb-3 px-1">{t.challenges.active}</h2>
            <div className="space-y-3">
              {activeChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <Card className="p-4 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900 mb-1">
                              {language === "de" ? challenge.title : challenge.titleEn}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {language === "de" ? challenge.description : challenge.descriptionEn}
                            </p>
                          </div>
                          <Badge
                            className={`${getDifficultyColor(
                              language === "de" ? challenge.difficulty : challenge.difficultyEn
                            )} border ml-2`}
                          >
                            {language === "de" ? challenge.difficulty : challenge.difficultyEn}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{t.challenges.progress || "Fortschritt"}</span>
                            <span className="text-emerald-600">
                              {challenge.currentCount}/{challenge.targetCount}
                            </span>
                          </div>
                          <Progress
                            value={
                              (challenge.currentCount / challenge.targetCount) *
                              100
                            }
                            className="h-2 bg-emerald-100"
                          />

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{getTimeRemaining(challenge.deadline, language)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Award className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-600">
                                  +{challenge.reward} Coins
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Available Challenges */}
        {inactiveChallenges.length > 0 && (
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 mb-3 px-1">{t.challenges.available}</h2>
            <div className="space-y-3">
              {inactiveChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl opacity-60">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-gray-900 dark:text-gray-100 mb-1">
                              {language === "de" ? challenge.title : challenge.titleEn}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {language === "de" ? challenge.description : challenge.descriptionEn}
                            </p>
                          </div>
                          <Badge
                            className={`${getDifficultyColor(
                              language === "de" ? challenge.difficulty : challenge.difficultyEn
                            )} border ml-2 shrink-0`}
                          >
                            {language === "de" ? challenge.difficulty : challenge.difficultyEn}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            <span>{challenge.targetCount}x</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400">
                              +{challenge.reward} Coins
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Challenges */}
        {completedChallenges.length > 0 && (
          <div>
            <h2 className="text-gray-800 dark:text-gray-200 mb-3 px-1">
              {t.challenges.completed}
            </h2>
            <div className="space-y-3">
              {completedChallenges.map((challenge, index) => (
                <motion.div
                  key={challenge.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                              {language === "de" ? challenge.title : challenge.titleEn}
                              <span className="text-lg">✓</span>
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {language === "de" ? challenge.description : challenge.descriptionEn}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-emerald-700 dark:text-emerald-300 mt-2">
                          <span>{language === "de" ? "Abgeschlossen!" : "Completed!"}</span>
                          <span>+{challenge.reward} {language === "de" ? "Coins erhalten" : "Coins received"}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6" />
              <h3>{t.challenges.yourStats}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-3xl mb-1">{completedChallenges.length}</p>
                <p className="text-sm text-white/90">{t.challenges.completedChallenges}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl mb-1">{activeChallenges.length}</p>
                <p className="text-sm text-white/90">{t.challenges.activeChallenges}</p>
              </div>
            </div>
            
            {/* Quick Access Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/20">
              <button
                onClick={() => setShowCoinsProgress(true)}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{language === "de" ? "Punkte-Verlauf" : "Points Progress"}</span>
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="flex items-center justify-center gap-2 py-2 px-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <HistoryIcon className="w-4 h-4" />
                <span className="text-sm">{language === "de" ? "Historie" : "History"}</span>
              </button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Challenge Detail Modal */}
      <ChallengeDetailModal
        challenge={selectedChallenge}
        isOpen={!!selectedChallenge}
        onClose={() => setSelectedChallenge(null)}
        onUpdate={() => setChallenges(getChallenges())}
      />

      {/* Action Detail Modal */}
      <ActionDetailModal
        action={selectedAction}
        isOpen={!!selectedAction}
        onClose={() => {
          setSelectedAction(null);
          setActiveAction(null);
          setCurrentDuration("0:00");
        }}
        activeAction={activeAction}
        currentDuration={currentDuration}
        onStart={handleActionStart}
        onComplete={handleActionStop}
        onCancel={handleActionCancel}
      />

      {/* Coins Progress Modal */}
      <CoinsProgressModal
        isOpen={showCoinsProgress}
        onClose={() => setShowCoinsProgress(false)}
        totalCoins={getTotalCoins()}
      />

      {/* Activity History Modal */}
      <ActivityHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />

      {/* Points Animation */}
      <PointsAnimation
        show={showPointsAnimation}
        points={earnedPoints}
        onComplete={() => setShowPointsAnimation(false)}
      />

      {/* Bike Tracking Modal */}
      <BikeTrackingModal
        isOpen={showBikeTracking}
        onClose={() => {
          setShowBikeTracking(false);
          handleModalClose();
        }}
      />

      {/* Recycle Scan Modal */}
      <RecycleScanModal
        isOpen={showRecycleScan}
        onClose={() => {
          setShowRecycleScan(false);
          handleModalClose();
        }}
      />

      {/* Reusable Cup Modal */}
      <ReusableCupModal
        isOpen={showReusableCup}
        onClose={() => {
          setShowReusableCup(false);
          handleModalClose();
        }}
      />

      {/* Book Exchange Modal */}
      <BookExchangeModal
        isOpen={showBookExchange}
        onClose={() => {
          setShowBookExchange(false);
          handleModalClose();
        }}
      />

      {/* Quiz Modal */}
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => {
          setShowQuizModal(false);
          handleModalClose();
        }}
      />
    </div>
  );
}