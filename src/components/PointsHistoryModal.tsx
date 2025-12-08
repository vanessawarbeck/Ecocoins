"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Coins, TrendingUp, TrendingDown, Calendar, Clock, Sparkles, Award, Leaf, Cookie, MapPin, Recycle, Coffee, Trophy, Users } from "lucide-react";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";

export interface PointsTransaction {
  id: string;
  type: "earned" | "spent";
  amount: number;
  action: string;
  category: "fortune-cookie" | "eco-tip" | "cycling" | "recycling" | "reusable-cup" | "quiz" | "event" | "reward" | "challenge" | "other";
  timestamp: number;
  description?: string;
}

interface PointsHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons = {
  "fortune-cookie": Cookie,
  "eco-tip": Leaf,
  "cycling": MapPin,
  "recycling": Recycle,
  "reusable-cup": Coffee,
  "quiz": Award,
  "event": Users,
  "reward": Trophy,
  "challenge": TrendingUp,
  "other": Coins,
};

const categoryColors = {
  "fortune-cookie": "from-amber-400 to-orange-500",
  "eco-tip": "from-emerald-400 to-green-500",
  "cycling": "from-blue-400 to-cyan-500",
  "recycling": "from-purple-400 to-pink-500",
  "reusable-cup": "from-teal-400 to-emerald-500",
  "quiz": "from-indigo-400 to-blue-500",
  "event": "from-rose-400 to-pink-500",
  "reward": "from-yellow-400 to-amber-500",
  "challenge": "from-green-400 to-emerald-500",
  "other": "from-gray-400 to-gray-500",
};

export function PointsHistoryModal({ isOpen, onClose }: PointsHistoryModalProps) {
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Load transactions from localStorage
      const history = localStorage.getItem("pointsHistory");
      if (history) {
        const parsed: PointsTransaction[] = JSON.parse(history);
        // Sort by timestamp (newest first)
        const sorted = parsed.sort((a, b) => b.timestamp - a.timestamp);
        setTransactions(sorted);

        // Calculate totals
        const earned = sorted
          .filter((t) => t.type === "earned")
          .reduce((sum, t) => sum + t.amount, 0);
        const spent = sorted
          .filter((t) => t.type === "spent")
          .reduce((sum, t) => sum + t.amount, 0);
        
        setTotalEarned(earned);
        setTotalSpent(spent);
      }
    }
  }, [isOpen]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Heute";
    } else if (diffDays === 1) {
      return "Gestern";
    } else if (diffDays < 7) {
      return `Vor ${diffDays} Tagen`;
    } else {
      return date.toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="w-full max-w-lg relative max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <Card className="p-6 bg-gradient-to-br from-emerald-600 to-green-600 text-white border-0 shadow-xl rounded-t-3xl">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="bg-white/20 rounded-full p-3"
            >
              <Coins className="w-6 h-6" />
            </motion.div>
            <div>
              <h2 className="text-2xl">Punkte-Verlauf</h2>
              <p className="text-emerald-100 text-sm">
                Deine Eco Coins Historie
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-200" />
                <p className="text-xs text-emerald-100">Verdient</p>
              </div>
              <p className="text-2xl">+{totalEarned}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-red-200" />
                <p className="text-xs text-emerald-100">Ausgegeben</p>
              </div>
              <p className="text-2xl">-{totalSpent}</p>
            </div>
          </motion.div>
        </Card>

        {/* Transactions List */}
        <div className="bg-white rounded-b-3xl shadow-xl overflow-y-auto max-h-[500px]">
          {transactions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-12 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block mb-4"
              >
                <Coins className="w-16 h-16 text-gray-300" />
              </motion.div>
              <p className="text-gray-500 mb-2">Noch keine Transaktionen</p>
              <p className="text-sm text-gray-400">
                Sammle Punkte durch Aktionen und sie werden hier angezeigt!
              </p>
            </motion.div>
          ) : (
            <div className="p-4 space-y-2">
              <AnimatePresence>
                {transactions.map((transaction, index) => {
                  const Icon = categoryIcons[transaction.category];
                  const colorClass = categoryColors[transaction.category];

                  return (
                    <motion.div
                      key={transaction.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow border border-gray-100">
                        <div className="flex items-center gap-3">
                          {/* Icon */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className={`bg-gradient-to-br ${colorClass} rounded-full p-2.5 shadow-md flex-shrink-0`}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </motion.div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-gray-900 truncate">
                                  {transaction.action}
                                </h4>
                                {transaction.description && (
                                  <p className="text-xs text-gray-500 truncate">
                                    {transaction.description}
                                  </p>
                                )}
                              </div>
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.1 }}
                                className={`text-lg whitespace-nowrap ${
                                  transaction.type === "earned"
                                    ? "text-emerald-600"
                                    : "text-red-600"
                                }`}
                              >
                                {transaction.type === "earned" ? "+" : "-"}
                                {transaction.amount}
                              </motion.div>
                            </div>

                            {/* Date & Time */}
                            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>{formatDate(transaction.timestamp)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatTime(transaction.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// Helper function to add a transaction (to be called from other components)
export function addPointsTransaction(transaction: Omit<PointsTransaction, "id" | "timestamp">) {
  const history = localStorage.getItem("pointsHistory");
  const transactions: PointsTransaction[] = history ? JSON.parse(history) : [];
  
  const newTransaction: PointsTransaction = {
    ...transaction,
    id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };
  
  transactions.push(newTransaction);
  localStorage.setItem("pointsHistory", JSON.stringify(transactions));
}
