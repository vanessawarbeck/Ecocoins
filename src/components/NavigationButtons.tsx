import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationButtonsProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
}

export function NavigationButtons({ canGoBack, canGoForward, onBack, onForward }: NavigationButtonsProps) {
  return (
    <div className="fixed bottom-6 right-20 z-40 flex gap-2">
      <motion.button
        initial={{ scale: 0, x: -20 }}
        animate={{ scale: 1, x: 0 }}
        whileTap={canGoBack ? { scale: 0.9 } : {}}
        onClick={canGoBack ? onBack : undefined}
        disabled={!canGoBack}
        className={`w-12 h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 transition-all ${
          canGoBack
            ? "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            : "text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50"
        }`}
        aria-label="Zurück"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        initial={{ scale: 0, x: -20 }}
        animate={{ scale: 1, x: 0 }}
        transition={{ delay: 0.05 }}
        whileTap={canGoForward ? { scale: 0.9 } : {}}
        onClick={canGoForward ? onForward : undefined}
        disabled={!canGoForward}
        className={`w-12 h-12 bg-white dark:bg-gray-800 shadow-lg rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700 transition-all ${
          canGoForward
            ? "text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            : "text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50"
        }`}
        aria-label="Vorwärts"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>
    </div>
  );
}