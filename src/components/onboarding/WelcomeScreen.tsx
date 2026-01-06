import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Leaf, Sparkles } from "lucide-react";
import logoHM from "figma:asset/7a5625eb34dcf1c2699e0574b36f2e03c14671c8.png";

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="text-center"
        >
          {/* HM Logo at top */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <img 
              src={logoHM} 
              alt="Hochschule München" 
              className="h-12 mx-auto object-contain opacity-90"
            />
          </motion.div>

          {/* Logo Animation */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-white/20 rounded-full blur-2xl"
            />
            
            <div className="relative bg-white rounded-full w-32 h-32 mx-auto flex items-center justify-center shadow-2xl">
              <Leaf className="w-20 h-20 text-emerald-600" />
            </div>

            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos((i * Math.PI * 2) / 6) * 80,
                  y: Math.sin((i * Math.PI * 2) / 6) * 80,
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="absolute top-1/2 left-1/2"
              >
                <Sparkles className="w-6 h-6 text-yellow-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h1 className="text-5xl text-white mb-2">
              Eco Coins
            </h1>
            <p className="text-emerald-100 text-lg mb-8">
              Deine Nachhaltigkeits-App
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-white/90 text-lg leading-relaxed">
              Sammle Punkte für nachhaltige Aktionen,<br />
              tausche sie gegen Belohnungen ein<br />
              und mache die Welt ein Stückchen grüner! 🌱
            </p>
          </motion.div>

          {/* Continue Button with HM color accent */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Button
              onClick={onContinue}
              className="w-full bg-white text-emerald-600 hover:bg-emerald-50 rounded-full py-6 text-lg shadow-xl border-2 border-transparent hover:border-[#FF5757] transition-all"
            >
              Los geht's! 🚀
            </Button>
          </motion.div>

          {/* Footer with HM branding */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-8"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#FF5757]"></div>
              <p className="text-white/80 text-sm">
                Hochschule München
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}