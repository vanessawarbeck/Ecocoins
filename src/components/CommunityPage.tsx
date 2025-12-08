import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { useLanguage } from "../utils/LanguageContext";
import { FACULTIES, getFacultyName } from "../utils/faculties";

type Tab = "users" | "faculties" | "friends";

export function CommunityPage() {
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const { t, language } = useLanguage();
  const [userName, setUserName] = useState("Max Mustermann");
  const [userFaculty, setUserFaculty] = useState("computer-science");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    const savedFaculty = localStorage.getItem("userFaculty");
    
    if (savedName) setUserName(savedName);
    if (savedFaculty) setUserFaculty(savedFaculty);
  }, []);

  const userRankings = [
    { rank: 1, name: "Anna Schmidt", facultyId: "computer-science", coins: 2847, avatar: "🎓" },
    { rank: 2, name: "Lukas Müller", facultyId: "business-school", coins: 2654, avatar: "💼" },
    { rank: 3, name: "Sophie Weber", facultyId: "applied-sciences", coins: 2431, avatar: "🔬" },
    { rank: 4, name: userName, facultyId: userFaculty, coins: 1247, avatar: "💻", isYou: true },
    { rank: 5, name: "Lisa Hoffmann", facultyId: "design", coins: 1198, avatar: "🎨" },
    { rank: 6, name: "Tom Fischer", facultyId: "mechanical-engineering", coins: 1087, avatar: "⚙️" },
    { rank: 7, name: "Emma Wagner", facultyId: "muc-health", coins: 976, avatar: "🏥" },
    { rank: 8, name: "Leon Bauer", facultyId: "applied-sciences", coins: 845, avatar: "🔭" },
  ];

  const facultyRankings = [
    { rank: 1, facultyId: "computer-science", members: 234, avgCoins: 1856, totalCoins: 434304, icon: "💻" },
    { rank: 2, facultyId: "business-school", members: 312, avgCoins: 1645, totalCoins: 513240, icon: "💼" },
    { rank: 3, facultyId: "applied-sciences", members: 187, avgCoins: 1534, totalCoins: 286858, icon: "🔬" },
    { rank: 4, facultyId: "design", members: 156, avgCoins: 1423, totalCoins: 221988, icon: "🎨" },
    { rank: 5, facultyId: "mechanical-engineering", members: 198, avgCoins: 1312, totalCoins: 259776, icon: "⚙️" },
  ];

  const friendsRankings = [
    { rank: 1, name: "Anna Schmidt", facultyId: "computer-science", coins: 2847, avatar: "🎓", isFriend: true },
    { rank: 2, name: userName, facultyId: userFaculty, coins: 1247, avatar: "💻", isYou: true },
    { rank: 3, name: "Lisa Hoffmann", facultyId: "design", coins: 1198, avatar: "🎨", isFriend: true },
    { rank: 4, name: "Tom Fischer", facultyId: "mechanical-engineering", coins: 1087, avatar: "⚙️", isFriend: true },
    { rank: 5, name: "Sarah Klein", facultyId: "business-school", coins: 756, avatar: "📊", isFriend: true },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-gray-500 text-sm">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8" />
          <h1 className="text-2xl">Community</h1>
        </div>
        <p className="text-purple-100 text-sm">
          {language === "de"
            ? "Vergleiche dich mit anderen Studierenden"
            : "Compare yourself with other students"}
        </p>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Your Position Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-5 bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-purple-100 text-sm mb-1">
                  {language === "de" ? "Deine Position" : "Your Rank"}
                </p>
                <p className="text-3xl">#4</p>
              </div>
              <div className="text-right">
                <p className="text-purple-100 text-sm mb-1">
                  {language === "de" ? "Deine Coins" : "Your Coins"}
                </p>
                <p className="text-3xl">1.247</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">
                {language === "de" ? "+3 Plätze diese Woche" : "+3 places this week"}
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-full p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 py-2 px-4 rounded-full text-sm transition-all ${
              activeTab === "users"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            {language === "de" ? "Top User" : "Top Users"}
          </button>
          <button
            onClick={() => setActiveTab("faculties")}
            className={`flex-1 py-2 px-4 rounded-full text-sm transition-all ${
              activeTab === "faculties"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            {language === "de" ? "Fakultäten" : "Faculties"}
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`flex-1 py-2 px-4 rounded-full text-sm transition-all ${
              activeTab === "friends"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            {language === "de" ? "Freunde" : "Friends"}
          </button>
        </div>

        {/* Rankings List */}
        <div className="space-y-2">
          {activeTab === "users" &&
            userRankings.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card
                  className={`p-4 ${
                    user.isYou
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-md"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-8 flex items-center justify-center">
                      {getRankIcon(user.rank)}
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl">
                      {user.avatar}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900">{user.name}</p>
                        {user.isYou && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                            {language === "de" ? "Du" : "You"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{getFacultyName(user.facultyId, language)}</p>
                    </div>

                    {/* Coins */}
                    <div className="text-right">
                      <p className="text-lg text-emerald-600">{user.coins.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Coins</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

          {activeTab === "faculties" &&
            facultyRankings.map((faculty, index) => (
              <motion.div
                key={faculty.rank}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card className="p-4 bg-white border-gray-200">
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-8 flex items-center justify-center">
                      {getRankIcon(faculty.rank)}
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl">
                      {faculty.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="text-gray-900 mb-1">{getFacultyName(faculty.facultyId, language)}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{faculty.members} {language === "de" ? "Mitglieder" : "Members"}</span>
                        <span>•</span>
                        <span>Ø {faculty.avgCoins} Coins</span>
                      </div>
                    </div>

                    {/* Total Coins */}
                    <div className="text-right">
                      <p className="text-lg text-emerald-600">
                        {(faculty.totalCoins / 1000).toFixed(0)}k
                      </p>
                      <p className="text-xs text-gray-500">{language === "de" ? "Gesamt" : "Total"}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

          {activeTab === "friends" &&
            friendsRankings.map((friend, index) => (
              <motion.div
                key={friend.rank}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Card
                  className={`p-4 ${
                    friend.isYou
                      ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 shadow-md"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-8 flex items-center justify-center">
                      {getRankIcon(friend.rank)}
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-2xl">
                      {friend.avatar}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900">{friend.name}</p>
                        {friend.isYou && (
                          <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
                            {language === "de" ? "Du" : "You"}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{getFacultyName(friend.facultyId, language)}</p>
                    </div>

                    {/* Coins */}
                    <div className="text-right">
                      <p className="text-lg text-emerald-600">{friend.coins.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Coins</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-900 mb-1">
                {language === "de"
                  ? "Rangliste wird täglich aktualisiert"
                  : "Rankings updated daily"}
              </p>
              <p className="text-xs text-purple-700">
                {language === "de"
                  ? "Sammle Coins um aufzusteigen!"
                  : "Collect coins to climb up!"}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}