"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Sparkles, RefreshCw, X, Coins, Lock } from "lucide-react";
import { PointsAnimation } from "./PointsAnimation";
import { addPointsTransaction } from "./PointsHistoryModal";
import { useLanguage } from "../utils/LanguageContext";
import { getEcoTips, getCookieTranslations, type EcoTip } from "../utils/cookieData";

type CookieState = "unopened" | "cracking" | "opened";

interface EcoCookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EcoCookieModal({ isOpen, onClose }: EcoCookieModalProps) {
  const { language } = useLanguage();
  const [state, setState] = useState<CookieState>("unopened");
  const [currentTip, setCurrentTip] = useState<EcoTip | null>(null);
  const [alreadyOpened, setAlreadyOpened] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);

  const ecoTips = getEcoTips(language);
  const texts = getCookieTranslations(language);

  // Check if Eco cookie was already opened today and load saved tip
  useEffect(() => {
    if (isOpen) {
      const lastOpened = localStorage.getItem("ecoCookieLastOpened");
      const savedTip = localStorage.getItem("ecoCookieToday");
      const today = new Date().toDateString();
      
      if (lastOpened === today && savedTip) {
        setAlreadyOpened(true);
        setCurrentTip(JSON.parse(savedTip));
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
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    setCurrentTip(randomTip);

    // Generate random points between 1-2
    const points = Math.floor(Math.random() * 2) + 1;
    setEarnedPoints(points);

    // Save points to localStorage
    const currentCoins = parseInt(localStorage.getItem("ecoCoins") || "0");
    localStorage.setItem("ecoCoins", (currentCoins + points).toString());

    // Mark as opened today and save tip
    const today = new Date().toDateString();
    localStorage.setItem("ecoCookieLastOpened", today);
    localStorage.setItem("ecoCookieToday", JSON.stringify(randomTip));

    // Add points transaction
    addPointsTransaction({
      type: "earned",
      amount: points,
      action: texts.ecoTipOpened,
      category: "eco-tip",
      description: texts.dailySustainabilityTip,
    });

    setTimeout(() => {
      setState("opened");
      // Show points animation after tip is revealed
      setTimeout(() => {
        setShowPointsAnimation(true);
      }, 500);
    }, 2000);
  };

  const resetCookie = () => {
    setState("unopened");
    setCurrentTip(null);
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
            className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-3xl p-6 min-h-[400px] flex items-center justify-center">
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

                      <div className="relative w-32 h-20 bg-gradient-to-br from-emerald-300 to-green-400 rounded-full transform rotate-12 shadow-lg border-2 border-emerald-500">
                        <div className="absolute inset-2 border border-emerald-600/30 rounded-full" />
                        <div className="absolute inset-4 border border-emerald-600/20 rounded-full" />

                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute -top-2 -right-2"
                        >
                          <Sparkles className="w-6 h-6 text-emerald-500 drop-shadow-lg" />
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
                          <Sparkles className="w-4 h-4 text-green-500 drop-shadow-lg" />
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
                    <h2 className="text-2xl text-emerald-800 mb-2">
                      {texts.ecoTipTitle}
                    </h2>
                    <p className="text-emerald-600 mb-4">
                      {texts.tapCookie}
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/80 backdrop-blur-sm border border-emerald-200"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-700">
                        {texts.sustainabilityTipWaits}
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
                        className="absolute left-0 w-16 h-20 bg-gradient-to-br from-emerald-300 to-green-400 rounded-l-full border-2 border-emerald-500"
                      >
                        <div className="absolute inset-1 border border-emerald-600/30 rounded-l-full" />
                      </motion.div>

                      <motion.div
                        animate={{ x: [16, 24], rotate: [0, 15] }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute right-0 w-16 h-20 bg-gradient-to-br from-emerald-300 to-green-400 rounded-r-full border-2 border-emerald-500"
                      >
                        <div className="absolute inset-1 border border-emerald-600/30 rounded-r-full" />
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
                          className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full"
                        />
                      ))}
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0.7, 1] }}
                    transition={{ duration: 2 }}
                    className="text-emerald-700 text-center"
                  >
                    {texts.loadingTip}
                  </motion.p>
                </motion.div>
              ) : state === "opened" && currentTip ? (
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
                  <Card className="p-6 bg-white/95 backdrop-blur-sm border-emerald-200 shadow-xl">
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
                        <Sparkles className="w-10 h-10 text-emerald-600 drop-shadow-lg" />
                      </motion.div>

                      <motion.h2
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-xl text-emerald-800 mb-2"
                      >
                        {texts.yourTip}
                      </motion.h2>
                    </motion.div>

                    <motion.blockquote
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-center text-gray-700 mb-6 italic leading-relaxed px-2"
                    >
                      "{currentTip.tip}"
                    </motion.blockquote>

                    {/* Removed Bonus Points Display and Refresh Button */}
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