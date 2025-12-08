import { motion, AnimatePresence } from "motion/react";
import { Coins, Sparkles } from "lucide-react";

interface PointsAnimationProps {
  show: boolean;
  points: number;
  onComplete?: () => void;
}

export function PointsAnimation({ show, points, onComplete }: PointsAnimationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        >
          {/* Background glow effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 2, opacity: 0.3 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-64 h-64 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-full blur-3xl"
          />

          {/* Main points display */}
          <motion.div
            initial={{ scale: 0, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            onAnimationComplete={() => {
              setTimeout(() => {
                onComplete?.();
              }, 1500);
            }}
            className="relative"
          >
            {/* Orbiting sparkles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 12) * 120,
                  y: Math.sin((i * Math.PI * 2) / 12) * 120,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </motion.div>
            ))}

            {/* Coin rain effect */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`coin-${i}`}
                initial={{ y: -50, opacity: 0, rotate: 0 }}
                animate={{
                  y: [0, 100],
                  opacity: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.2 + i * 0.1,
                  ease: "easeIn",
                }}
                className="absolute"
                style={{
                  left: `${-40 + (i * 80) / 8}px`,
                  top: "-20px",
                }}
              >
                <Coins className="w-6 h-6 text-amber-500" />
              </motion.div>
            ))}

            {/* Main card */}
            <motion.div
              animate={{
                rotate: [0, -5, 5, -5, 0],
              }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: "easeInOut",
              }}
              className="bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-500 p-8 rounded-3xl shadow-2xl border-4 border-white"
            >
              {/* Shine effect */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-3xl"
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                {/* Coin icon with pulse */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    scale: {
                      duration: 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className="bg-white/20 p-3 rounded-full"
                >
                  <Coins className="w-12 h-12 text-white" />
                </motion.div>

                {/* Points text */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                    delay: 0.2,
                  }}
                  className="text-center"
                >
                  <div className="text-6xl text-white mb-1" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}>
                    +{points}
                  </div>
                  <div className="text-white/90 text-lg">Eco Coins</div>
                </motion.div>

                {/* Bottom sparkle */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>

            {/* Explosion particles */}
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 16) * 150,
                  y: Math.sin((i * Math.PI * 2) / 16) * 150,
                }}
                transition={{
                  duration: 1,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                style={{
                  background: `hsl(${45 + (i * 15)}, 100%, 60%)`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
