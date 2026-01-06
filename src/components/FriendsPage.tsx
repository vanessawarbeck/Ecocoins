import { motion } from "motion/react";
import { useState } from "react";
import { Users, Search, UserPlus, Share2, Copy, Check, ChevronLeft } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  coins: number;
  status: "friend" | "pending";
}

// Mock-Daten für Freunde
const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Anna Schmidt",
    avatar: "🌸",
    level: 12,
    coins: 2450,
    status: "friend",
  },
  {
    id: "2",
    name: "Tom Müller",
    avatar: "🚴",
    level: 15,
    coins: 3200,
    status: "friend",
  },
  {
    id: "3",
    name: "Lisa Weber",
    avatar: "🌿",
    level: 10,
    coins: 1890,
    status: "friend",
  },
];

// Mock-Daten für Suchvorschläge
const mockSearchResults: Friend[] = [
  {
    id: "4",
    name: "Max Wagner",
    avatar: "🎯",
    level: 8,
    coins: 1450,
    status: "pending",
  },
  {
    id: "5",
    name: "Sarah Fischer",
    avatar: "🌟",
    level: 14,
    coins: 2890,
    status: "pending",
  },
];

interface FriendsPageProps {
  onBack: () => void;
}

export function FriendsPage({ onBack }: FriendsPageProps) {
  const { t } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState("");
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Generiere Referral-Link basierend auf User
  const userName = localStorage.getItem("userName") || "User";
  const referralCode = btoa(userName).substring(0, 8).toUpperCase();
  const referralLink = `https://ecocoins.hm.edu/invite/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Eco Coins",
        text: t.friends.inviteDesc,
        url: referralLink,
      });
    } else {
      handleCopyLink();
    }
  };

  const filteredResults = searchQuery
    ? mockSearchResults.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-pink-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-8 h-8" />
          <h1 className="text-2xl">{t.friends.title}</h1>
        </div>
        <p className="text-white/90 text-sm pl-12">
          {t.friends.subtitle}
        </p>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Referral Section */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <Card className={`p-4 border shadow-md ${
            isDarkMode 
              ? "bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-700" 
              : "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={isDarkMode ? "text-gray-100" : "text-gray-900"}>{t.friends.inviteFriends}</h3>
                <p className={`text-xs ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>{t.friends.inviteReward}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{t.friends.referralLink}</label>
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className={`text-sm ${isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200" : "bg-white"}`}
                />
                <Button
                  onClick={handleCopyLink}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 whitespace-nowrap"
                >
                  {linkCopied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      {t.friends.linkCopied}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      {t.friends.copyLink}
                    </>
                  )}
                </Button>
              </div>
              <Button
                onClick={handleShareLink}
                variant="outline"
                className={`w-full ${
                  isDarkMode
                    ? "border-emerald-600 text-emerald-400 hover:bg-emerald-900/30"
                    : "border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                <Share2 className="w-4 h-4 mr-2" />
                {t.friends.shareLink}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Search Friends */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className={`p-4 border shadow-md ${
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-emerald-100"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h3 className={isDarkMode ? "text-gray-100" : "text-gray-900"}>{t.friends.searchFriends}</h3>
            </div>

            <Input
              placeholder={t.friends.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`mb-3 ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400" : ""
              }`}
            />

            {/* Search Results */}
            {searchQuery && (
              <div className="space-y-2">
                {filteredResults.length > 0 ? (
                  filteredResults.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-50"
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-lg">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <p className={isDarkMode ? "text-gray-100" : "text-gray-900"}>{user.name}</p>
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {t.friends.level} {user.level} • {user.coins} Coins
                        </p>
                      </div>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <UserPlus className="w-4 h-4 mr-1" />
                        {t.friends.addFriend}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className={`text-sm text-center py-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {t.language === "de"
                      ? "Keine Benutzer gefunden"
                      : "No users found"}
                  </p>
                )}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Friends List */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className={`p-4 border shadow-md ${
            isDarkMode 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-emerald-100"
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className={isDarkMode ? "text-gray-100" : "text-gray-900"}>{t.friends.myFriends}</h3>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {friends.length}{" "}
                  {friends.length === 1
                    ? t.language === "de"
                      ? "Freund"
                      : "Friend"
                    : t.friends.friends}
                </p>
              </div>
            </div>

            {friends.length > 0 ? (
              <div className="space-y-2">
                {friends.map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      isDarkMode 
                        ? "bg-gradient-to-r from-emerald-900/30 to-green-900/30 hover:from-emerald-900/50 hover:to-green-900/50" 
                        : "bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100"
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-xl">
                      {friend.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={isDarkMode ? "text-gray-100" : "text-gray-900"}>{friend.name}</p>
                      <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {t.friends.level} {friend.level} • {friend.coins} Coins
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className={`w-16 h-16 mx-auto mb-3 ${
                  isDarkMode ? "text-gray-600" : "text-gray-300"
                }`} />
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>{t.friends.noFriends}</p>
                <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {t.friends.noFriendsDesc}
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}