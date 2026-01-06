import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface RedeemAnimationProps {
  coins: number;
  onComplete: () => void;
}

export function RedeemAnimation({ coins, onComplete }: RedeemAnimationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          {/* Coin burst animation */}
          <div className="relative">
            {/* Center coin */}
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.5, 1],
                rotate: [0, 360, 720],
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-8xl"
            >
              💰
            </motion.div>

            {/* Burst coins */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const distance = 150;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{
                    x: x,
                    y: y,
                    scale: [0, 1, 0.8],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl"
                >
                  🪙
                </motion.div>
              );
            })}

            {/* Coins amount */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-8 text-center"
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg"
              >
                <span className="text-2xl">-{coins}</span>
                <span className="text-sm ml-2">Eco Coins</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Sparkles */}
          {Array.from({ length: 12 }).map((_, i) => {
            const randomX = (Math.random() - 0.5) * 400;
            const randomY = (Math.random() - 0.5) * 400;
            const randomDelay = Math.random() * 0.5;

            return (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  scale: 0, 
                  opacity: 0,
                  rotate: 0,
                }}
                animate={{
                  x: randomX,
                  y: randomY,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: randomDelay,
                }}
                className="absolute top-1/2 left-1/2 text-yellow-400"
              >
                ✨
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
