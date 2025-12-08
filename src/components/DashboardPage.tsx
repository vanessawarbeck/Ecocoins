import { motion } from "motion/react";
import { BarChart3, Droplets, Zap, Trash2, TrendingDown, Award } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useLanguage } from "../utils/LanguageContext";

export function DashboardPage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8" />
          <h1 className="text-2xl">{t.dashboard.title}</h1>
        </div>
        <p className="text-emerald-100 text-sm">
          {t.dashboard.subtitle}
        </p>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5 bg-gradient-to-br from-emerald-500 to-green-600 text-white border-0 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6" />
              <h2 className="text-lg">{t.dashboard.totalContribution}</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl mb-1">23 kg</p>
                <p className="text-sm text-emerald-100">{t.profile.co2Saved}</p>
              </div>
              <div>
                <p className="text-3xl mb-1">87%</p>
                <p className="text-sm text-emerald-100">{t.dashboard.aboveAverage}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CO₂-Einsparung */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-5 bg-white border-emerald-100 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 rounded-xl p-3">
                <TrendingDown className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">
                  {language === "de" ? "CO₂-Einsparung" : "CO₂ Savings"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === "de" ? "Diese Woche" : "This Week"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl text-emerald-600">23 kg</span>
                <span className="text-sm text-gray-500">
                  {language === "de" ? "Ziel: 30 kg" : "Goal: 30 kg"}
                </span>
              </div>
              <Progress value={76} className="h-3 bg-emerald-100" />
              <p className="text-xs text-gray-600">
                {language === "de"
                  ? "🚴 Fahrradfahren: 15 kg | ♻️ Recycling: 5 kg | 🥤 Mehrweg: 3 kg"
                  : "🚴 Cycling: 15 kg | ♻️ Recycling: 5 kg | 🥤 Reusable: 3 kg"}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {language === "de" ? "Vergleich Campus-Durchschnitt" : "vs. Campus Average"}
                </span>
                <span className="text-emerald-600">+45%</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Energie am Campus */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-5 bg-white border-blue-100 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 rounded-xl p-3">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">
                  {language === "de" ? "Energie am Campus" : "Campus Energy"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === "de" ? "Gesamter Campus heute" : "Entire campus today"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl text-blue-600">2.341 kWh</span>
                <span className="text-sm text-gray-500">
                  {language === "de" ? "-12% vs. gestern" : "-12% vs. yesterday"}
                </span>
              </div>
              <Progress value={65} className="h-3 bg-blue-100" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">
                  {language === "de" ? "Dein Beitrag" : "Your contribution"}
                </p>
                <p className="text-lg text-blue-600">34 kWh</p>
                <p className="text-xs text-gray-500">
                  {language === "de" ? "Eingespart" : "Saved"}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-600 mb-1">
                  {language === "de" ? "Erneuerbar" : "Renewable"}
                </p>
                <p className="text-lg text-green-600">78%</p>
                <p className="text-xs text-gray-500">
                  {language === "de" ? "Solar & Wind" : "Solar & Wind"}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Wasserverbrauch */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-5 bg-white border-cyan-100 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-100 rounded-xl p-3">
                <Droplets className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">
                  {language === "de" ? "Wasserverbrauch" : "Water Consumption"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === "de" ? "Diese Woche" : "This Week"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl text-cyan-600">
                  {language === "de" ? "45 Liter" : "45 Liters"}
                </span>
                <span className="text-sm text-gray-500">
                  {language === "de" ? "Eingespart" : "Saved"}
                </span>
              </div>
              <Progress value={82} className="h-3 bg-cyan-100" />
              <p className="text-xs text-gray-600">
                {language === "de"
                  ? "Das entspricht 30 Wasserflaschen oder 15 Minuten Duschen"
                  : "Equals 30 water bottles or 15 minutes of showering"}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg text-cyan-600">12L</p>
                  <p className="text-xs text-gray-500">
                    {language === "de" ? "Montag" : "Monday"}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-cyan-600">8L</p>
                  <p className="text-xs text-gray-500">
                    {language === "de" ? "Dienstag" : "Tuesday"}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-cyan-600">15L</p>
                  <p className="text-xs text-gray-500">
                    {language === "de" ? "Mittwoch" : "Wednesday"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Müllvermeidung */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-5 bg-white border-amber-100 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 rounded-xl p-3">
                <Trash2 className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">
                  {language === "de" ? "Müllvermeidung" : "Waste Reduction"}
                </h3>
                <p className="text-sm text-gray-500">
                  {language === "de" ? "Diese Woche" : "This Week"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Mehrwegbecher */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🥤</span>
                    <span className="text-sm text-gray-700">
                      {language === "de" ? "Mehrwegbecher" : "Reusable Cup"}
                    </span>
                  </div>
                  <span className="text-emerald-600">12x</span>
                </div>
                <Progress value={80} className="h-2 bg-emerald-100" />
                <p className="text-xs text-gray-500 mt-1">
                  {language === "de"
                    ? "= 360g Plastikmüll vermieden"
                    : "= 360g plastic waste avoided"}
                </p>
              </div>

              {/* Recycling */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">♻️</span>
                    <span className="text-sm text-gray-700">Recycling</span>
                  </div>
                  <span className="text-emerald-600">8x</span>
                </div>
                <Progress value={65} className="h-2 bg-emerald-100" />
                <p className="text-xs text-gray-500 mt-1">
                  {language === "de"
                    ? "= 24 Flaschen recycelt"
                    : "= 24 bottles recycled"}
                </p>
              </div>

              {/* Papierlos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">📄</span>
                    <span className="text-sm text-gray-700">
                      {language === "de" ? "Digital statt Papier" : "Digital instead of Paper"}
                    </span>
                  </div>
                  <span className="text-emerald-600">
                    {language === "de" ? "45 Seiten" : "45 Pages"}
                  </span>
                </div>
                <Progress value={90} className="h-2 bg-emerald-100" />
                <p className="text-xs text-gray-500 mt-1">
                  {language === "de"
                    ? "= 0.5 kg Papier gespart"
                    : "= 0.5 kg paper saved"}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Achievement */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-amber-200">
            <div className="text-center">
              <p className="text-3xl mb-2">🏆</p>
              <p className="text-sm text-amber-900 mb-1">
                {language === "de"
                  ? "Du bist in den Top 10% am Campus!"
                  : "You're in the top 10% on campus!"}
              </p>
              <p className="text-xs text-amber-700">
                {language === "de"
                  ? "Weiter so! Du inspirierst andere."
                  : "Keep it up! You inspire others."}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}