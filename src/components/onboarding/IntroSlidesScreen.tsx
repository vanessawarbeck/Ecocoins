import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Bike, Target, Gift, Users, TrendingUp, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../utils/LanguageContext";
import logoHM from "figma:asset/7a5625eb34dcf1c2699e0574b36f2e03c14671c8.png";

interface IntroSlidesScreenProps {
  onComplete: () => void;
  onBack?: () => void;
}

export function IntroSlidesScreen({ onComplete, onBack }: IntroSlidesScreenProps) {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Bike,
      color: "from-[#FF8B8B] to-[#FF5757]",
      titleDe: "Nachhaltige Aktionen",
      titleEn: "Sustainable Actions",
      descDe: "Fahre Rad, recycel, nutze Mehrwegbecher und sammle Eco Coins für jede nachhaltige Aktion!",
      descEn: "Ride your bike, recycle, use reusable cups and collect Eco Coins for every sustainable action!",
      emoji: "🚴"
    },
    {
      icon: Target,
      color: "from-[#FFA07A] to-[#FF8B8B]",
      titleDe: "Challenges meistern",
      titleEn: "Master Challenges",
      descDe: "Nimm an wöchentlichen Challenges teil, erreiche deine Ziele und verdiene Bonus-Punkte!",
      descEn: "Participate in weekly challenges, reach your goals and earn bonus points!",
      emoji: "🎯"
    },
    {
      icon: Gift,
      color: "from-[#FF8080] to-[#E64545]",
      titleDe: "Belohnungen einlösen",
      titleEn: "Redeem Rewards",
      descDe: "Tausche deine gesammelten Coins gegen tolle Belohnungen wie Mensagutscheine und mehr ein!",
      descEn: "Exchange your collected coins for great rewards like cafeteria vouchers and more!",
      emoji: "🎁"
    },
    {
      icon: Users,
      color: "from-[#FFB4B4] to-[#FFA07A]",
      titleDe: "Community & Rankings",
      titleEn: "Community & Rankings",
      descDe: "Vergleiche dich mit anderen Studierenden, steige im Ranking auf und werde zum Sustainability Champion!",
      descEn: "Compare yourself with other students, climb the rankings and become a Sustainability Champion!",
      emoji: "👥"
    },
    {
      icon: TrendingUp,
      color: "from-[#FF5757] to-[#D65F5F]",
      titleDe: "Deinen Impact verfolgen",
      titleEn: "Track Your Impact",
      descDe: "Sehe deinen positiven Einfluss auf die Umwelt mit detaillierten Statistiken und Achievements!",
      descEn: "See your positive impact on the environment with detailed statistics and achievements!",
      emoji: "📊"
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  const texts = {
    de: {
      skip: "Überspringen",
      next: "Weiter",
      start: "Los geht's!",
      of: "von"
    },
    en: {
      skip: "Skip",
      next: "Next",
      start: "Get Started!",
      of: "of"
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-700 flex flex-col items-center justify-between p-6">
      {/* Skip Button */}
      <div className="w-full max-w-md">
        <button
          onClick={onComplete}
          className="text-white/80 hover:text-white text-sm py-2"
        >
          {t.skip}
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className={`bg-gradient-to-br ${currentSlideData.color} rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center shadow-2xl`}
            >
              <div className="text-6xl">{currentSlideData.emoji}</div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl text-white mb-4"
            >
              {language === "de" ? currentSlideData.titleDe : currentSlideData.titleEn}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/90 leading-relaxed px-4"
            >
              {language === "de" ? currentSlideData.descDe : currentSlideData.descEn}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="w-full max-w-md space-y-6">
        {/* Dots Indicator */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="text-center">
          <p className="text-white/60 text-sm">
            {currentSlide + 1} {t.of} {slides.length}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3">
          {currentSlide > 0 && (
            <Button
              onClick={handlePrev}
              variant="outline"
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full py-6"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              {language === "de" ? "Zurück" : "Back"}
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            className={`${currentSlide === 0 ? "w-full" : "flex-1"} bg-white text-purple-600 hover:bg-white/90 rounded-full py-6`}
          >
            {currentSlide === slides.length - 1 ? t.start : t.next}
            {currentSlide < slides.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}