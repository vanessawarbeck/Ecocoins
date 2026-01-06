import { motion } from "motion/react";
import { BarChart3, Droplets, Zap, Trash2, TrendingDown, Award, TrendingUp, Bike, Recycle, Coffee, Brain } from "lucide-react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { useLanguage } from "../utils/LanguageContext";
import { useActivities } from "../utils/ActivityContext";
import dashboardImg from "figma:asset/e40860529268e8be3dff41515ee7bfa1782f96bf.png";

export function DashboardPage() {
  const { t, language } = useLanguage();
  const { activities } = useActivities();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-cyan-600 text-white p-6 rounded-b-3xl shadow-lg mb-4 overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardImg})` }}
        />
        
        {/* Gradient Overlay - 70% HM-Rot links für Textlesbarkeit, transparent rechts für Bildsichtbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5757]/70 via-[#FF8B8B]/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8" />
            <h1 className="text-2xl">{t.dashboard.title}</h1>
          </div>
          <p className="text-white/90 text-sm">
            {t.dashboard.subtitle}
          </p>
        </div>
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
                <p className="text-sm text-white/90">{t.profile.co2Saved}</p>
              </div>
              <div>
                <p className="text-3xl mb-1">87%</p>
                <p className="text-sm text-white/90">{t.dashboard.aboveAverage}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Dein Beitrag - Overview */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-3">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100">
                  {language === "de" ? "Dein Beitrag" : "Your Impact"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "de" ? "Gesamte Beiträge" : "Total Contributions"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* CO₂ eingespart */}
              <div className="bg-white dark:bg-gray-900/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {language === "de" ? "CO₂ eingespart" : "CO₂ saved"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {language === "de" ? "Gesamt" : "Total"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-emerald-600">23</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">kg</p>
                  </div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    {language === "de"
                      ? "Das entspricht einer Autofahrt von 150 km oder dem Pflanzen von 2 Bäumen"
                      : "Equals a 150 km car ride or planting 2 trees"}
                  </p>
                </div>
              </div>

              {/* Mehrweg genutzt */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                      <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {language === "de" ? "Mehrweg genutzt" : "Reusable used"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {language === "de" ? "Gesamt" : "Total"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-amber-600 dark:text-amber-400">12</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{language === "de" ? "mal" : "times"}</p>
                  </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
                  <p className="text-xs text-amber-800 dark:text-amber-300">
                    {language === "de"
                      ? "Du hast 12 Einweg-Becher vermieden und 360g Plastikmüll gespart"
                      : "You avoided 12 disposable cups and saved 360g of plastic waste"}
                  </p>
                </div>
              </div>

              {/* Fahrrad-Kilometer */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <Bike className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {language === "de" ? "Fahrrad-Kilometer" : "Bike kilometers"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {language === "de" ? "Gesamt" : "Total"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-purple-600 dark:text-purple-400">45</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">km</p>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                  <p className="text-xs text-purple-800 dark:text-purple-300">
                    {language === "de"
                      ? "Mit dem Fahrrad hast du 9 kg CO₂ eingespart und deine Fitness gesteigert"
                      : "By bike you saved 9 kg CO₂ and improved your fitness"}
                  </p>
                </div>
              </div>

              {/* Recycling */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Recycle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {language === "de" ? "Recycling-Aktionen" : "Recycling actions"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {language === "de" ? "Gesamt" : "Total"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-green-600 dark:text-green-400">8</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{language === "de" ? "mal" : "times"}</p>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    {language === "de"
                      ? "Du hast 24 Flaschen recycelt und Ressourcen geschont"
                      : "You recycled 24 bottles and conserved resources"}
                  </p>
                </div>
              </div>

              {/* Wissens-Quiz */}
              <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {language === "de" ? "Wissens-Quiz" : "Knowledge Quiz"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {language === "de" ? "Abgeschlossen" : "Completed"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl text-blue-600 dark:text-blue-400">5</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{language === "de" ? "Quiz" : "Quizzes"}</p>
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    {language === "de"
                      ? "Du hast dein Wissen erweitert und kannst andere inspirieren"
                      : "You expanded your knowledge and can inspire others"}
                  </p>
                </div>
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
          <Card className="p-5 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-xl p-3">
                <TrendingDown className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100">
                  {language === "de" ? "CO₂-Einsparung" : "CO₂ Savings"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "de" ? "Diese Woche" : "This Week"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl text-emerald-600">23 kg</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "de" ? "Ziel: 30 kg" : "Goal: 30 kg"}
                </span>
              </div>
              <Progress value={76} className="h-3 bg-emerald-100 dark:bg-emerald-900/30" />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === "de"
                  ? "🚴 Fahrradfahren: 15 kg | ♻️ Recycling: 5 kg | 🥤 Mehrweg: 3 kg"
                  : "🚴 Cycling: 15 kg | ♻️ Recycling: 5 kg | 🥤 Reusable: 3 kg"}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
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
          <Card className="p-5 bg-white dark:bg-gray-800 border-blue-100 dark:border-gray-700 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100">
                  {language === "de" ? "Energie am Campus" : "Campus Energy"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "de" ? "Gesamter Campus heute" : "Entire campus today"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl text-blue-600">2.341 kWh</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "de" ? "-12% vs. gestern" : "-12% vs. yesterday"}
                </span>
              </div>
              <Progress value={65} className="h-3 bg-blue-100 dark:bg-blue-900/30" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {language === "de" ? "Dein Beitrag" : "Your contribution"}
                </p>
                <p className="text-lg text-blue-600">34 kWh</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "de" ? "Eingespart" : "Saved"}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                  {language === "de" ? "Erneuerbar" : "Renewable"}
                </p>
                <p className="text-lg text-green-600">78%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
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
          <Card className="p-5 bg-white dark:bg-gray-800 border-cyan-100 dark:border-gray-700 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded-xl p-3">
                <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100">
                  {language === "de" ? "Wasserverbrauch" : "Water Consumption"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "de" ? "Diese Woche" : "This Week"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl text-cyan-600">
                  {language === "de" ? "45 Liter" : "45 Liters"}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {language === "de" ? "Eingespart" : "Saved"}
                </span>
              </div>
              <Progress value={82} className="h-3 bg-cyan-100 dark:bg-cyan-900/30" />
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === "de"
                  ? "Das entspricht 30 Wasserflaschen oder 15 Minuten Duschen"
                  : "Equals 30 water bottles or 15 minutes of showering"}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg text-cyan-600">12L</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === "de" ? "Montag" : "Monday"}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-cyan-600">8L</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {language === "de" ? "Dienstag" : "Tuesday"}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-cyan-600">15L</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
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
          <Card className="p-5 bg-white dark:bg-gray-800 border-amber-100 dark:border-gray-700 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 rounded-xl p-3">
                <Trash2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100">
                  {language === "de" ? "Müllvermeidung" : "Waste Reduction"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {language === "de" ? "Mehrwegbecher" : "Reusable Cup"}
                    </span>
                  </div>
                  <span className="text-emerald-600">12x</span>
                </div>
                <Progress value={80} className="h-2 bg-emerald-100 dark:bg-emerald-900/30" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {language === "de"
                    ? "= 360g Plastikmüll vermieden"
                    : "= 360g plastic waste avoided"}
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
          <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 border-amber-200 dark:border-amber-800">
            <div className="text-center">
              <p className="text-3xl mb-2">🏆</p>
              <p className="text-sm text-amber-900 dark:text-amber-300 mb-1">
                {language === "de"
                  ? "Du bist in den Top 10% am Campus!"
                  : "You're in the top 10% on campus!"}
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400">
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