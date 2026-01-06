"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sparkles, RefreshCw, X, Lock } from "lucide-react";
import { PointsAnimation } from "./PointsAnimation";
import { addPointsTransaction } from "./PointsHistoryModal";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses } from "../utils/modalDarkModeClasses";
import { getFortunes, getCookieTranslations, type Fortune } from "../utils/cookieData";

type CookieState = "unopened" | "cracking" | "opened";

interface FortuneCookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FortuneCookieModal({
  isOpen,
  onClose,
}: FortuneCookieModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const modalClasses = getModalClasses(isDarkMode);
  const [state, setState] = useState<CookieState>("unopened");
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);
  const [alreadyOpened, setAlreadyOpened] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);

  const fortunes = getFortunes(language);
  const texts = getCookieTranslations(language);

  // Check if cookie was already opened today and load saved fortune
  useEffect(() => {
    if (isOpen) {
      const lastOpened = localStorage.getItem("fortuneCookieLastOpened");
      const savedFortune = localStorage.getItem("fortuneCookieToday");
      const today = new Date().toDateString();
      
      if (lastOpened === today && savedFortune) {
        setAlreadyOpened(true);
        setCurrentFortune(JSON.parse(savedFortune));
        setState("opened");
      } else {
        setAlreadyOpened(false);
        setState("unopened");
      }
    }
  }, [isOpen]);

  const crackCookie = () => {
    if (state !== "unopened" || alreadyOpened) return;

    setState("cracking");
    const randomFortune =
      fortunes[Math.floor(Math.random() * fortunes.length)];
    setCurrentFortune(randomFortune);

    // Generate random points between 1-2
    const points = Math.floor(Math.random() * 2) + 1;
    setEarnedPoints(points);

    // Save points to localStorage
    const currentCoins = parseInt(localStorage.getItem("ecoCoins") || "0");
    localStorage.setItem("ecoCoins", (currentCoins + points).toString());

    // Add points transaction
    addPointsTransaction({
      type: "earned",
      amount: points,
      action: texts.fortuneCookieOpened,
      category: "fortune-cookie",
      description: texts.dailyFortuneCookie,
    });

    // Mark as opened today and save fortune
    const today = new Date().toDateString();
    localStorage.setItem("fortuneCookieLastOpened", today);
    localStorage.setItem("fortuneCookieToday", JSON.stringify(randomFortune));

    setTimeout(() => {
      setState("opened");
      // Show points animation after fortune is revealed
      setTimeout(() => {
        setShowPointsAnimation(true);
      }, 500);
    }, 2000);
  };

  const resetCookie = () => {
    setState("unopened");
    setCurrentFortune(null);
  };

  const handleClose = () => {
    resetCookie();
    setShowPointsAnimation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <PointsAnimation 
        show={showPointsAnimation} 
        points={earnedPoints}
        onComplete={() => setShowPointsAnimation(false)}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md relative"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute -top-2 -right-2 z-10 rounded-full p-2 shadow-lg transition-colors ${
              isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200" 
                : "bg-white hover:bg-gray-100 text-gray-600"
            }`}
          >
            <X className="w-5 h-5" />
          </button>

          <div className={`rounded-3xl p-6 min-h-[400px] flex items-center justify-center ${
            isDarkMode 
              ? "bg-gradient-to-br from-orange-900/90 to-amber-900/90" 
              : "bg-gradient-to-br from-orange-50 to-amber-100"
          }`}>
            <AnimatePresence mode="wait">
              {state === "unopened" && !alreadyOpened ? (
                <motion.div
                  key="unopened"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    onClick={crackCookie}
                    className="cursor-pointer mb-8"
                  >
                    <div className="relative">
                      <div className="absolute top-2 left-2 w-32 h-20 bg-black/20 rounded-full blur-md" />

                      <div className="relative w-32 h-20 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full transform rotate-12 shadow-lg border-2 border-amber-400">
                        <div className="absolute inset-2 border border-amber-500/30 rounded-full" />
                        <div className="absolute inset-4 border border-amber-500/20 rounded-full" />

                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute -top-2 -right-2"
                        >
                          <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
                        </motion.div>
                        <motion.div
                          animate={{ rotate: -360 }}
                          transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute -bottom-1 -left-2"
                        >
                          <Sparkles className="w-4 h-4 text-orange-400 drop-shadow-lg" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <h2 className={`text-2xl mb-2 ${
                      isDarkMode ? "text-amber-200" : "text-amber-800"
                    }`}>
                      {texts.fortuneCookieTitle}
                    </h2>
                    <p className={`mb-4 ${
                      isDarkMode ? "text-amber-300" : "text-amber-600"
                    }`}>
                      {texts.tapToOpen}
                    </p>

                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border ${
                        isDarkMode 
                          ? "bg-amber-800/40 border-amber-700" 
                          : "bg-amber-100/80 border-amber-200"
                      }`}
                    >
                      <Sparkles className={`w-4 h-4 ${
                        isDarkMode ? "text-amber-400" : "text-amber-600"
                      }`} />
                      <span className={`text-sm ${
                        isDarkMode ? "text-amber-200" : "text-amber-700"
                      }`}>
                        {texts.inspirationWaits}
                      </span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : state === "cracking" ? (
                <motion.div
                  key="cracking"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 0.8, 1.1] }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 10, -10, 0],
                      scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
                    }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="relative mb-8"
                  >
                    <div className="relative w-32 h-20">
                      <motion.div
                        animate={{ x: [-16, -24], rotate: [0, -15] }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute left-0 w-16 h-20 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-l-full border-2 border-amber-400"
                      >
                        <div className="absolute inset-1 border border-amber-500/30 rounded-l-full" />
                      </motion.div>

                      <motion.div
                        animate={{ x: [16, 24], rotate: [0, 15] }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute right-0 w-16 h-20 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-r-full border-2 border-amber-400"
                      >
                        <div className="absolute inset-1 border border-amber-500/30 rounded-r-full" />
                      </motion.div>

                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: [0, (Math.random() - 0.5) * 100],
                            y: [0, (Math.random() - 0.5) * 100],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.1,
                            ease: "easeOut",
                          }}
                          className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-300 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.7, 1] }}
                    transition={{ duration: 2 }}
                    className={`text-center ${
                      isDarkMode ? "text-amber-300" : "text-amber-700"
                    }`}
                  >
                    {texts.openingCookie}
                  </motion.p>
                </motion.div>
              ) : state === "opened" && currentFortune ? (
                <motion.div
                  key="opened"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2,
                  }}
                  className="w-full"
                >
                  <Card className={`p-6 backdrop-blur-sm border shadow-xl ${
                    isDarkMode 
                      ? "bg-gray-800/95 border-amber-700" 
                      : "bg-white/95 border-amber-200"
                  }`}>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-center mb-6"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{
                          scale: [0, 1.2, 1],
                          rotate: 360,
                        }}
                        transition={{
                          scale: {
                            delay: 0.5,
                            duration: 0.8,
                            ease: "backOut",
                          },
                          rotate: {
                            delay: 0.7,
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                        className="inline-block mb-4"
                      >
                        <Sparkles className="w-10 h-10 text-amber-500 drop-shadow-lg" />
                      </motion.div>

                      <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className={`text-xl mb-2 ${
                          isDarkMode ? "text-amber-200" : "text-amber-800"
                        }`}
                      >
                        {texts.yourWisdom}
                      </motion.h2>
                    </motion.div>

                    <motion.blockquote
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className={`text-center mb-6 italic leading-relaxed px-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center text-gray-700 mb-6 italic leading-relaxed px-2"
                    >
                      "{currentFortune.quote}"
                    </motion.blockquote>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center mb-6"
                    >
                      <h3 className="text-sm text-amber-700 mb-3">
                        {texts.yourLuckyNumbers}
                      </h3>
                      <div className="flex justify-center gap-2 flex-wrap">
                        {currentFortune.numbers.map((number, index) => (
                          <motion.div
                            key={number}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 1 + index * 0.1,
                              type: "spring",
                              stiffness: 500,
                              damping: 25,
                            }}
                            className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md"
                          >
                            <span className="text-white text-sm">
                              {number}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}