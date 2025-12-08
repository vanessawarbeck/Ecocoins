import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  Bike,
  Recycle,
  Coffee,
  Brain,
  Calendar,
  Cookie,
  Coins,
  TrendingUp,
  Sparkles,
  Award,
  BarChart3,
  ChevronRight,
  Users,
  Target,
  Clock,
  Zap,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { useLanguage } from "../utils/LanguageContext";
import { useActivities } from "../utils/ActivityContext";
import { EcoCookieModal } from "./EcoCookieModal";
import { FortuneCookieModal } from "./FortuneCookieModal";
import { PointsHistoryModal } from "./PointsHistoryModal";
import { CoinsProgressModal } from "./CoinsProgressModal";
import { ActionDetailModal, type Action } from "./ActionDetailModal";
import { QuizModal } from "./QuizModal";
import { getChallenges, getTimeRemaining, updateChallengeProgress, type Challenge } from "../utils/challengeManager";
import { addPointsTransaction } from "./PointsHistoryModal";
import { ALL_ACTIONS } from "../utils/actions";
import type { Page } from "../App";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

interface ActiveAction {
  id: number;
  startTime: number;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t, language } = useLanguage();
  const { activities, getTotalCoins, getActivitiesByDate } = useActivities();

  const [userName, setUserName] = useState("Max");
  const [userFaculty, setUserFaculty] = useState("Informatik");
  const [showEcoCookie, setShowEcoCookie] = useState(false);
  const [showFortuneCookie, setShowFortuneCookie] = useState(false);
  const [showPointsHistory, setShowPointsHistory] = useState(false);
  const [showCoinsProgress, setShowCoinsProgress] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction | null>(null);
  const [currentDuration, setCurrentDuration] = useState<string>("0:00");
  const [showQuizModal, setShowQuizModal] = useState(false);

  const totalCoins = getTotalCoins();
  const thisWeekActivities = getActivitiesByDate(7);
  const thisWeekCoins = thisWeekActivities.reduce((sum, act) => sum + act.coins, 0);

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedProgram = localStorage.getItem("userStudyProgram");
    
    if (savedName) {
      const firstName = savedName.split(" ")[0];
      setUserName(firstName);
    }
    if (savedProgram) setUserFaculty(savedProgram);

    // Load challenges
    setChallenges(getChallenges());
  }, []);

  // Timer effect for active action
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeAction) {
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

  const handleActionStart = () => {
    if (selectedAction) {
      setActiveAction({
        id: selectedAction.id,
        startTime: Date.now(),
      });
    }
  };

  const handleActionComplete = () => {
    if (!activeAction || !selectedAction) return;

    const durationSeconds = Math.floor((Date.now() - activeAction.startTime) / 1000);
    
    // Special handling for book-exchange: fixed 50 coins
    let coinsEarned;
    if (selectedAction.id === 6) {
      coinsEarned = 50;
    } else {
      coinsEarned = Math.max(
        1,
        Math.floor((durationSeconds / 300) * selectedAction.coinsPer5Min)
      );
    }

    // Map action category to challenge actionType
    const categoryToActionType: Record<string, Challenge["actionType"]> = {
      cycling: "cycling",
      recycling: "recycling",
      "reusable-cup": "reusable-cup",
      "book-exchange": "book-exchange",
      quiz: "quiz",
      event: "event",
    };

    const challengeActionType = categoryToActionType[selectedAction.category];

    // Add to points history
    const actionTitle = language === "de" ? selectedAction.title : selectedAction.titleEn;
    const descriptionText = selectedAction.id === 6 
      ? (language === "de" ? "Buch getauscht/abgegeben" : "Book exchanged/donated")
      : `${language === "de" ? "Aktion abgeschlossen nach" : "Action completed after"} ${Math.floor(durationSeconds / 60)}:${(durationSeconds % 60).toString().padStart(2, "0")} ${language === "de" ? "Min." : "min."}`;
    
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
  };

  const handleActionCancel = () => {
    setActiveAction(null);
    setCurrentDuration("0:00");
  };

  const handleOpenQuickAction = (actionId: number) => {
    const action = ALL_ACTIONS.find((a) => a.id === actionId);
    if (action) {
      setSelectedAction(action);
    }
  };

  const handleQuizComplete = (score: number, coinsEarned: number) => {
    // Quiz completion is handled in QuizModal
    setShowQuizModal(false);
    // Reload challenges to show updated progress
    setChallenges(getChallenges());
  };

  const activeChallenges = challenges.filter((c) => c.status === "active");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-b-3xl shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">{t.home.welcome}, {userName}! 👋</h1>
            <p className="text-emerald-100 text-sm">{userFaculty}</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-emerald-200" />
          </motion.div>
        </div>

        {/* Eco Coins Display */}
        <motion.button
          onClick={() => setShowCoinsProgress(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30 cursor-pointer hover:bg-white/25 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/30 rounded-full p-3">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-emerald-100 text-sm">{t.home.yourBalance}</p>
                <p className="text-3xl">{totalCoins}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-sm">{t.dashboard.thisWeek}</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-200" />
                <span className="text-lg">+{thisWeekCoins}</span>
              </div>
            </div>
          </div>
        </motion.button>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Daily Eco Cookie */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-full p-3"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-emerald-900 mb-1">{t.language === "de" ? "Täglicher Eco-Tipp" : "Daily Eco Tip"}</h3>
                  <p className="text-sm text-emerald-600">
                    {t.language === "de" ? "Hole dir deinen Nachhaltigkeits-Tipp!" : "Get your sustainability tip!"}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowEcoCookie(true)}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full"
              >
                {t.challenges.open}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Fortune Cookie */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-amber-200 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-3"
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-amber-900 mb-1">Fortune Cookie</h3>
                  <p className="text-sm text-amber-600">
                    {t.language === "de" ? "Deine tägliche Inspiration und Glückszahlen" : "Your daily inspiration and lucky numbers"}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowFortuneCookie(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full"
              >
                {t.challenges.open}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Active Challenges */}
        {activeChallenges.length > 0 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-gray-800 px-1">
                {language === "de" ? "Aktive Challenges" : "Active Challenges"}
              </h3>
              <Button
                onClick={() => onNavigate("challenges")}
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 text-sm"
              >
                {t.home.viewAll}
              </Button>
            </div>
            <div className="space-y-3">
              {activeChallenges.slice(0, 2).map((challenge) => (
                <Card
                  key={challenge.id}
                  className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onNavigate("challenges")}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900">
                          {language === "de" ? challenge.title : challenge.titleEn}
                        </h4>
                        <Award className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {challenge.currentCount}/{challenge.targetCount}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getTimeRemaining(challenge.deadline, language)}
                          </span>
                        </div>
                        <Progress
                          value={(challenge.currentCount / challenge.targetCount) * 100}
                          className="h-2 bg-emerald-100"
                        />
                        <p className="text-xs text-emerald-600">
                          +{challenge.reward} {language === "de" ? "Coins bei Abschluss" : "Coins on completion"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div>
          <h3 className="text-gray-800 mb-3 px-1">{t.home.quickActions}</h3>
          <div className="grid grid-cols-3 gap-3">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(1)}
            >
              <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">🚴</div>
                <p className="text-sm">{t.home.bikeTracking}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(2)}
            >
              <Card className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">♻️</div>
                <p className="text-sm">{t.home.recycleNow}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(3)}
            >
              <Card className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">🥤</div>
                <p className="text-sm">{t.home.reusableCup}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.45 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(6)}
            >
              <Card className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">📚</div>
                <p className="text-sm">{language === "de" ? "Büchertausch" : "Book Exchange"}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenQuickAction(7)}
            >
              <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">🎯</div>
                <p className="text-sm">{t.home.events}</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.55 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate("newsfeed")}
            >
              <Card className="p-4 bg-gradient-to-br from-cyan-500 to-blue-500 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">📰</div>
                <p className="text-sm">{language === "de" ? "News & Events" : "News & Events"}</p>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Quick Quiz - Separate */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-gray-800 mb-3 px-1">{t.home.quickQuiz}</h3>
          <Card 
            className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowQuizModal(true)}
          >
            <div className="flex items-center gap-3">
              <div className="text-4xl">🧠</div>
              <div className="flex-1">
                <h4 className="mb-1">{language === "de" ? "Nachhaltigkeits-Quiz" : "Sustainability Quiz"}</h4>
                <p className="text-sm text-purple-100">
                  {language === "de" ? "Teste dein Wissen und sammle Punkte!" : "Test your knowledge and earn points!"}
                </p>
              </div>
              <ChevronRight className="w-6 h-6" />
            </div>
          </Card>
        </motion.div>

        {/* Impact Overview */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card 
            className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate("dashboard")}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-gray-900">{t.dashboard.impact}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl text-emerald-600 mb-1">23kg</p>
                <p className="text-xs text-gray-500">{t.profile.co2Saved}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-blue-600 mb-1">45L</p>
                <p className="text-xs text-gray-500">{t.profile.waterSaved}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-amber-600 mb-1">12x</p>
                <p className="text-xs text-gray-500">{t.profile.reusableUsed}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Community Teaser */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <Card 
            className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate("community")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-full p-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-purple-900 mb-1">{t.language === "de" ? "Deine Position" : "Your Position"}</h3>
                  <p className="text-sm text-purple-600">
                    {t.language === "de" ? "#4 in der Rangliste" : "#4 on leaderboard"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Eco Cookie Modal */}
      <EcoCookieModal isOpen={showEcoCookie} onClose={() => setShowEcoCookie(false)} />
      
      {/* Fortune Cookie Modal */}
      <FortuneCookieModal isOpen={showFortuneCookie} onClose={() => setShowFortuneCookie(false)} />
      
      {/* Points History Modal */}
      <PointsHistoryModal isOpen={showPointsHistory} onClose={() => setShowPointsHistory(false)} />
      
      {/* Coins Progress Modal */}
      <CoinsProgressModal isOpen={showCoinsProgress} onClose={() => setShowCoinsProgress(false)} totalCoins={totalCoins} />
      
      {/* Action Detail Modal */}
      <ActionDetailModal
        action={selectedAction}
        isOpen={selectedAction !== null}
        onClose={() => {
          setSelectedAction(null);
          setActiveAction(null);
          setCurrentDuration("0:00");
        }}
        activeAction={activeAction}
        currentDuration={currentDuration}
        onStart={handleActionStart}
        onComplete={handleActionComplete}
        onCancel={handleActionCancel}
      />
      
      {/* Quiz Modal */}
      <QuizModal 
        isOpen={showQuizModal} 
        onClose={() => setShowQuizModal(false)} 
        onComplete={handleQuizComplete} 
      />
    </div>
  );
}