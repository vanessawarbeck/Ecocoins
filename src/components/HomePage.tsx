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
  Book,
  Star,
  Flame,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { useLanguage } from "../utils/LanguageContext";
import { useActivities } from "../utils/ActivityContext";
import { useUser } from "../utils/UserContext";
import { EcoCookieModal } from "./EcoCookieModal";
import { FortuneCookieModal } from "./FortuneCookieModal";
import { PointsHistoryModal } from "./PointsHistoryModal";
import { CoinsProgressModal } from "./CoinsProgressModal";
import { BikeTrackingModal } from "./BikeTrackingModal";
import { RecycleScanModal } from "./RecycleScanModal";
import { ReusableCupModal } from "./ReusableCupModal";
import { BookExchangeModal } from "./BookExchangeModal";
import { QuizModal } from "./QuizModal";
import { ChallengeDetailModal } from "./ChallengeDetailModal";
import { ImpactInsightsModal } from "./ImpactInsightsModal";
import { getActiveChallenges, getAvailableChallenges, getChallenges } from "../utils/challengeData";
import type { Challenge } from "../utils/challengeData";
import type { Page } from "../App";
import headerImage from "figma:asset/60cd381a5b425f36dc14699fb6f6013df056e436.png";

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
  const { userName, userFaculty } = useUser();

  const [showEcoCookie, setShowEcoCookie] = useState(false);
  const [showFortuneCookie, setShowFortuneCookie] = useState(false);
  const [showPointsHistory, setShowPointsHistory] = useState(false);
  const [showCoinsProgress, setShowCoinsProgress] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showBikeTracking, setShowBikeTracking] = useState(false);
  const [showRecycleScan, setShowRecycleScan] = useState(false);
  const [showReusableCup, setShowReusableCup] = useState(false);
  const [showBookExchange, setShowBookExchange] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
  const [showImpactInsights, setShowImpactInsights] = useState(false);

  const totalCoins = getTotalCoins();
  const thisWeekActivities = getActivitiesByDate(7);
  const thisWeekCoins = thisWeekActivities.reduce((sum, act) => sum + act.coins, 0);

  useEffect(() => {
    // Load challenges
    setChallenges(getChallenges());
  }, []);

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
      case 7:
        onNavigate("newsfeed");
        break;
    }
  };

  const handleQuizComplete = (score: number, coinsEarned: number) => {
    // Quiz completion is handled in QuizModal
    setShowQuizModal(false);
    // Reload challenges to show updated progress
    setChallenges(getChallenges());
  };

  const handleModalClose = () => {
    // Reload challenges after any action
    setChallenges(getChallenges());
  };

  const activeChallenges = getActiveChallenges();

  // Popular highlights data
  const popularHighlights = [
    {
      id: 1,
      icon: "🚴",
      titleDe: "Fahrrad-Challenge",
      titleEn: "Bike Challenge",
      descDe: "50km in einer Woche fahren",
      descEn: "Ride 50km in one week",
      coins: 200,
      participants: 342,
      gradient: "from-blue-500 to-blue-600",
      action: () => onNavigate("challenges"),
    },
    {
      id: 2,
      icon: "♻️",
      titleDe: "Recycling-Meister",
      titleEn: "Recycling Master",
      descDe: "10 Items diese Woche recyceln",
      descEn: "Recycle 10 items this week",
      coins: 150,
      participants: 287,
      gradient: "from-green-500 to-green-600",
      action: () => handleOpenQuickAction(2),
    },
    {
      id: 3,
      icon: "🥤",
      titleDe: "Mehrweg-Champion",
      titleEn: "Reusable Champion",
      descDe: "15x Mehrwegbecher nutzen",
      descEn: "Use reusable cup 15 times",
      coins: 180,
      participants: 421,
      gradient: "from-amber-500 to-amber-600",
      action: () => onNavigate("challenges"),
    },
    {
      id: 4,
      icon: "🧠",
      titleDe: "Quiz-Profi",
      titleEn: "Quiz Pro",
      descDe: "Alle Fragen richtig beantworten",
      descEn: "Answer all questions correctly",
      coins: 100,
      participants: 518,
      gradient: "from-purple-500 to-purple-600",
      action: () => setShowQuizModal(true),
    },
  ];

  // Auto-rotate highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlightIndex((prev) => (prev + 1) % popularHighlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#FF5757] to-red-500 text-white p-6 rounded-b-3xl shadow-lg"
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5757]/40 to-red-500/40" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl mb-1">{t.home.welcome}, {userName}! 👋</h1>
              <p className="text-red-100 text-sm">{userFaculty}</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-red-200" />
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
                  <p className="text-red-100 text-sm">{t.home.yourBalance}</p>
                  <p className="text-3xl">{totalCoins}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-red-100 text-sm">{t.dashboard.thisWeek}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-red-200" />
                  <span className="text-lg">+{thisWeekCoins}</span>
                </div>
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Daily Eco Cookie */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border-emerald-200 dark:border-emerald-800 shadow-md">
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
                  <h3 className="text-emerald-900 dark:text-emerald-300 mb-1">{t.language === "de" ? "Täglicher Eco-Tipp" : "Daily Eco Tip"}</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
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
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border-amber-200 dark:border-amber-800 shadow-md">
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
                  <h3 className="text-amber-900 dark:text-amber-300 mb-1">Fortune Cookie</h3>
                  <p className="text-sm text-amber-600 dark:text-amber-400">
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
              <h3 className="text-gray-800 dark:text-gray-200 px-1">
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
                  className="p-4 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onNavigate("challenges")}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-gray-900 dark:text-gray-100">
                          {language === "de" ? challenge.titleDe : challenge.titleEn}
                        </h4>
                        <Award className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            {challenge.progress.current}/{challenge.progress.target}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {language === "de" ? challenge.durationDe : challenge.durationEn}
                          </span>
                        </div>
                        <Progress
                          value={(challenge.progress.current / challenge.progress.target) * 100}
                          className="h-2 bg-emerald-100 dark:bg-gray-700"
                        />
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">
                          +{challenge.coins} {language === "de" ? "Coins bei Abschluss" : "Coins on completion"}
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
          <h3 className="text-gray-800 dark:text-gray-200 mb-3 px-1">{t.home.quickActions}</h3>
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
              onClick={() => setShowQuizModal(true)}
            >
              <Card className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-md cursor-pointer">
                <div className="text-3xl mb-2">🧠</div>
                <p className="text-sm">{t.home.quickQuiz}</p>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Impact Overview */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card 
            className="p-4 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setShowImpactInsights(true)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-gray-900 dark:text-gray-100">{t.dashboard.impact}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl text-emerald-600 mb-1">23kg</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.profile.co2Saved}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-purple-600 mb-1">45km</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{language === "de" ? "Fahrrad" : "Bike"}</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-amber-600 mb-1">12x</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.profile.reusableUsed}</p>
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
            className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate("community")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-purple-900 dark:text-purple-300 mb-1">{t.language === "de" ? "Deine Position" : "Your Position"}</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    {t.language === "de" ? "#4 in der Rangliste" : "#4 on leaderboard"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400 dark:text-purple-500" />
            </div>
          </Card>
        </motion.div>

        {/* Popular Highlights Carousel */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <h3 className="text-gray-800 dark:text-gray-200">{t.home.popularWithStudents}</h3>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <motion.div
              key={currentHighlightIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className={`p-5 bg-gradient-to-br ${popularHighlights[currentHighlightIndex].gradient} text-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow`}
                onClick={popularHighlights[currentHighlightIndex].action}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{popularHighlights[currentHighlightIndex].icon}</div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <h4 className="text-lg mb-1">
                        {language === "de" ? popularHighlights[currentHighlightIndex].titleDe : popularHighlights[currentHighlightIndex].titleEn}
                      </h4>
                      <p className="text-sm text-white/90">
                        {language === "de" ? popularHighlights[currentHighlightIndex].descDe : popularHighlights[currentHighlightIndex].descEn}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4" />
                        <span className="text-sm">+{popularHighlights[currentHighlightIndex].coins} Coins</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{popularHighlights[currentHighlightIndex].participants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
            {/* Dots Navigation */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {popularHighlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentHighlightIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentHighlightIndex 
                      ? "bg-emerald-500 w-6" 
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
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
      
      {/* Quiz Modal */}
      <QuizModal 
        isOpen={showQuizModal} 
        onClose={() => setShowQuizModal(false)} 
        onComplete={handleQuizComplete} 
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
      
      {/* Challenge Detail Modal */}
      <ChallengeDetailModal 
        challenge={selectedChallenge}
        isOpen={selectedChallenge !== null} 
        onClose={() => setSelectedChallenge(null)}
        onUpdate={handleModalClose}
      />
      
      {/* Impact Insights Modal */}
      <ImpactInsightsModal 
        isOpen={showImpactInsights} 
        onClose={() => setShowImpactInsights(false)}
      />
    </div>
  );
}