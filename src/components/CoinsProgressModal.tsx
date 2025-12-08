import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, Calendar, Coins } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useActivities } from "../utils/ActivityContext";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CoinsProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCoins: number;
}

type PeriodTab = "daily" | "weekly" | "monthly";

export function CoinsProgressModal({
  isOpen,
  onClose,
  totalCoins,
}: CoinsProgressModalProps) {
  const { language } = useLanguage();
  const { activities } = useActivities();
  const [activePeriod, setActivePeriod] = useState<PeriodTab>("daily");

  // Hilfsfunktion: Datum gruppieren
  const getDayLabel = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dayNames = language === "de"
      ? ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()];
  };

  // Tägliche Daten (letzte 7 Tage) - aus echten Aktivitäten berechnen
  const getDailyData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const startOfDay = new Date();
      startOfDay.setDate(startOfDay.getDate() - i);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date();
      endOfDay.setDate(endOfDay.getDate() - i);
      endOfDay.setHours(23, 59, 59, 999);

      const dayActivities = activities.filter(
        (act) => act.timestamp >= startOfDay.getTime() && act.timestamp <= endOfDay.getTime()
      );
      
      const coins = dayActivities.reduce((sum, act) => sum + act.coins, 0);
      
      data.push({
        label: getDayLabel(i),
        coins,
      });
    }
    return data;
  };

  // Wöchentliche Daten (letzte 8 Wochen) - aus echten Aktivitäten berechnen
  const getWeeklyData = () => {
    const data = [];
    for (let i = 7; i >= 0; i--) {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - (i * 7 + 7));
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate() - (i * 7));
      endOfWeek.setHours(23, 59, 59, 999);

      const weekActivities = activities.filter(
        (act) => act.timestamp >= startOfWeek.getTime() && act.timestamp <= endOfWeek.getTime()
      );
      
      const coins = weekActivities.reduce((sum, act) => sum + act.coins, 0);
      
      // Kalenderwoche berechnen
      const weekDate = new Date(endOfWeek);
      const startOfYear = new Date(weekDate.getFullYear(), 0, 1);
      const days = Math.floor((weekDate.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
      const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
      
      data.push({
        label: `KW ${weekNumber}`,
        coins,
      });
    }
    return data;
  };

  // Monatliche Daten (letzte 6 Monate) - aus echten Aktivitäten berechnen
  const getMonthlyData = () => {
    const data = [];
    const monthNames = language === "de"
      ? ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    for (let i = 5; i >= 0; i--) {
      const startOfMonth = new Date();
      startOfMonth.setMonth(startOfMonth.getMonth() - i);
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);
      
      const endOfMonth = new Date();
      endOfMonth.setMonth(endOfMonth.getMonth() - i + 1);
      endOfMonth.setDate(0);
      endOfMonth.setHours(23, 59, 59, 999);

      const monthActivities = activities.filter(
        (act) => act.timestamp >= startOfMonth.getTime() && act.timestamp <= endOfMonth.getTime()
      );
      
      const coins = monthActivities.reduce((sum, act) => sum + act.coins, 0);
      
      data.push({
        label: monthNames[startOfMonth.getMonth()],
        coins,
      });
    }
    return data;
  };

  const getCurrentData = () => {
    switch (activePeriod) {
      case "daily":
        return getDailyData();
      case "weekly":
        return getWeeklyData();
      case "monthly":
        return getMonthlyData();
    }
  };

  const getStats = () => {
    const data = getCurrentData();
    const periodTotal = data.reduce((sum, item) => sum + item.coins, 0);
    const max = Math.max(...data.map((item) => item.coins));
    const current = data.length > 0 ? data[data.length - 1].coins : 0; // Letzter Wert = aktueller Tag/Woche/Monat

    return { periodTotal, max, current };
  };

  const stats = getStats();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-20 bottom-20 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl">
                    {language === "de" ? "Coins-Verlauf" : "Coins Progress"}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Total Coins */}
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <p className="text-emerald-100 text-sm mb-1">
                  {language === "de" ? "Gesamt-Kontostand" : "Total Balance"}
                </p>
                <div className="flex items-center gap-2">
                  <Coins className="w-8 h-8 text-white" />
                  <p className="text-4xl">{totalCoins.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Period Tabs */}
            <div className="flex items-center gap-2 p-4 bg-gray-50 border-b flex-shrink-0">
              <Button
                size="sm"
                className={`flex-1 ${
                  activePeriod === "daily"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActivePeriod("daily")}
              >
                {language === "de" ? "Täglich" : "Daily"}
              </Button>
              <Button
                size="sm"
                className={`flex-1 ${
                  activePeriod === "weekly"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActivePeriod("weekly")}
              >
                {language === "de" ? "Wöchentlich" : "Weekly"}
              </Button>
              <Button
                size="sm"
                className={`flex-1 ${
                  activePeriod === "monthly"
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActivePeriod("monthly")}
              >
                {language === "de" ? "Monatlich" : "Monthly"}
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Statistics Cards */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                  <p className="text-xs text-gray-600 mb-1">
                    {language === "de" ? "Gesamt" : "Total"}
                  </p>
                  <p className="text-xl text-emerald-600">
                    {stats.periodTotal.toLocaleString()}
                  </p>
                </Card>
                <Card className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                  <p className="text-xs text-gray-600 mb-1">
                    {language === "de" ? "Max" : "Max"}
                  </p>
                  <p className="text-xl text-amber-600">
                    {stats.max.toLocaleString()}
                  </p>
                </Card>
              </div>

              {/* Chart */}
              <Card className="p-4">
                <div className="mb-3">
                  <h3 className="text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    {activePeriod === "daily" &&
                      (language === "de"
                        ? "Letzte 7 Tage"
                        : "Last 7 Days")}
                    {activePeriod === "weekly" &&
                      (language === "de"
                        ? "Letzte 8 Wochen"
                        : "Last 8 Weeks")}
                    {activePeriod === "monthly" &&
                      (language === "de"
                        ? "Letzte 6 Monate"
                        : "Last 6 Months")}
                  </h3>
                </div>

                <ResponsiveContainer width="100%" height={250}>
                  {activePeriod === "daily" ? (
                    <BarChart data={getCurrentData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="label"
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                        }}
                        labelStyle={{ color: "#374151" }}
                      />
                      <Bar
                        dataKey="coins"
                        fill="#10b981"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  ) : (
                    <LineChart data={getCurrentData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="label"
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                      />
                      <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                        }}
                        labelStyle={{ color: "#374151" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="coins"
                        stroke="#10b981"
                        strokeWidth={3}
                        dot={{ fill: "#10b981", r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </Card>

              {/* Period Summary */}
              <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  {language === "de" ? "Zusammenfassung" : "Summary"}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {activePeriod === "daily" &&
                        (language === "de"
                          ? "Heute"
                          : "Today")}
                      {activePeriod === "weekly" &&
                        (language === "de"
                          ? "Diese Woche"
                          : "This week")}
                      {activePeriod === "monthly" &&
                        (language === "de"
                          ? "Dieser Monat"
                          : "This month")}
                    </span>
                    <span className="text-emerald-600">
                      {stats.current.toLocaleString()} Coins
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      {language === "de" ? "Gesamt seit Start" : "Total since start"}
                    </span>
                    <span className="text-emerald-600">
                      {totalCoins.toLocaleString()} Coins
                    </span>
                  </div>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <h3 className="text-gray-900 mb-2">
                  💡{" "}
                  {language === "de"
                    ? "Tipp zur Steigerung"
                    : "Tip to increase"}
                </h3>
                <p className="text-sm text-gray-600">
                  {activePeriod === "daily" &&
                    (language === "de"
                      ? "Versuche jeden Tag mindestens eine Challenge abzuschließen, um kontinuierlich Coins zu sammeln!"
                      : "Try to complete at least one challenge every day to continuously collect coins!")}
                  {activePeriod === "weekly" &&
                    (language === "de"
                      ? "Setze dir wöchentliche Ziele und verfolge deinen Fortschritt, um motiviert zu bleiben!"
                      : "Set weekly goals and track your progress to stay motivated!")}
                  {activePeriod === "monthly" &&
                    (language === "de"
                      ? "Plane deine Challenges im Voraus und nutze Events für Bonus-Punkte!"
                      : "Plan your challenges in advance and use events for bonus points!")}
                </p>
              </Card>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t flex-shrink-0">
              <Button
                onClick={onClose}
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {language === "de" ? "Schließen" : "Close"}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}