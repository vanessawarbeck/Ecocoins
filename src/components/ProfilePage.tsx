import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import {
  User,
  Award,
  Settings,
  Camera,
  TrendingUp,
  Calendar,
  Gift,
  ChevronRight,
  Users,
  CheckCircle,
  Lock,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useLanguage } from "../utils/LanguageContext";
import { FACULTIES, getFacultyName } from "../utils/faculties";
import { useActivities } from "../utils/ActivityContext";
import { useUser } from "../utils/UserContext";
import { getRedeemedRewards, getTotalRedeemedCoins } from "../utils/rewardsHistory";
import { calculateBadges, getLevel, getLevelThresholds, getNextLevel } from "../utils/badgeSystem";
import { AvatarSelector } from "./AvatarSelector";
import type { Page } from "../App";
import headerImage from "figma:asset/dfe10b58aa6983d234db78787146bfed4f6a5617.png";

type Tab = "profile" | "badges" | "history" | "rewards";

interface ProfilePageProps {
  onNavigate?: (page: Page) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [isAvatarSelectorOpen, setIsAvatarSelectorOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState("");
  const [editStudyProgram, setEditStudyProgram] = useState("");
  const [editFaculty, setEditFaculty] = useState("");
  const [editSemester, setEditSemester] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguage();
  const { userProfile, setUserProfile, profileImage, setProfileImage } = useUser();

  // Get user data from UserContext
  const userName = userProfile?.name || "Max Studierender";
  const userStudyProgram = userProfile?.studiengang || "Informatik";
  const userFaculty = userProfile?.fakultaet || "";
  const userSemester = localStorage.getItem("userSemester") || "3";

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEditProfile = () => {
    setEditName(userName);
    setEditStudyProgram(userStudyProgram);
    setEditFaculty(userFaculty);
    setEditSemester(userSemester);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    // Update the user profile using UserContext
    setUserProfile({
      name: editName,
      studiengang: editStudyProgram,
      fakultaet: editFaculty
    });
    
    // Save semester to localStorage
    localStorage.setItem("userSemester", editSemester);

    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProfileImage(result);
        localStorage.setItem("userProfileImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectAvatar = (avatarUrl: string) => {
    setProfileImage(avatarUrl);
    localStorage.setItem("userProfileImage", avatarUrl);
  };

  const { activities, getTotalCoins } = useActivities();
  const totalCoins = getTotalCoins();

  const badges = calculateBadges(activities, totalCoins);
  const userLevel = getLevel(totalCoins);
  const levelThresholds = getLevelThresholds();
  const nextLevel = getNextLevel(totalCoins);

  const displayFacultyName = userFaculty
    ? getFacultyName(userFaculty, language)
    : (language === "de" ? "Keine Fakultät ausgewählt" : "No faculty selected");

  return (
    <div className="min-h-screen pb-20">
      {/* Header with Profile Info */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-emerald-500 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5757]/40 via-[#FF8B8B]/40 to-emerald-500/40" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-white/30">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={userName} />
                ) : (
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                  />
                )}
                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
              </Avatar>
              <button
                onClick={() => setIsAvatarSelectorOpen(true)}
                className="absolute -bottom-1 -right-1 bg-white text-emerald-600 rounded-full p-2 shadow-lg hover:bg-emerald-50 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl mb-1">{userName}</h1>
              <p className="text-white/90 text-sm mb-1">{userStudyProgram}</p>
              <p className="text-white/80 text-xs mb-2">{displayFacultyName}</p>
              <Badge className="bg-white/20 border-white/30 text-white">
                {t.profile.level} {userLevel.level} - {language === "de" ? userLevel.title : userLevel.titleEn}
              </Badge>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">{totalCoins.toLocaleString()}</p>
              <p className="text-xs text-white/80">Eco Coins</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">23</p>
              <p className="text-xs text-white/80">
                {language === "de" ? "Rang" : "Rank"}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <p className="text-2xl mb-1">{activities.length}</p>
              <p className="text-xs text-white/80">
                {language === "de" ? "Aktionen" : "Actions"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Tab Navigation */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className={`flex-1 ${
              activeTab === "profile"
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            {t.profile.yourProfile}
          </Button>
          <Button
            size="sm"
            className={`flex-1 ${
              activeTab === "badges"
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("badges")}
          >
            {t.profile.badges}
          </Button>
          <Button
            size="sm"
            className={`flex-1 ${
              activeTab === "history"
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("history")}
          >
            {language === "de" ? "Historie" : "History"}
          </Button>
          <Button
            size="sm"
            className={`flex-1 ${
              activeTab === "rewards"
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("rewards")}
          >
            {language === "de" ? "Belohnungen" : "Rewards"}
          </Button>
        </div>

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between mb-3 px-1"
            >
              <h2 className="text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-600" />
                {language === "de" ? "Dein Profil" : "Your Profile"}
              </h2>
            </motion.div>

            {/* Personal Data Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="p-4 bg-white dark:bg-gray-800 border-emerald-100 dark:border-gray-700 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 dark:text-gray-100">
                      {language === "de" ? "Persönliche Daten" : "Personal Data"}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {language === "de" ? "Profildaten bearbeiten" : "Edit profile data"}
                    </p>
                  </div>
                  {!isEditingProfile && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleEditProfile}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {!isEditingProfile ? (
                  <div className="space-y-2 pl-13">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">{t.profile.name}</span>
                      <span className="text-gray-900">{userName}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">{t.onboarding.studyProgram}</span>
                      <span className="text-gray-900">{userStudyProgram}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">{t.profile.faculty}</span>
                      <span className="text-gray-900">{displayFacultyName}</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">{t.onboarding.semester}</span>
                      <span className="text-gray-900">{userSemester}. {t.onboarding.semester}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="edit-name" className="text-gray-700 text-sm">
                        {t.profile.name}
                      </Label>
                      <Input
                        id="edit-name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-program" className="text-gray-700 text-sm">
                        {t.onboarding.studyProgram}
                      </Label>
                      <Input
                        id="edit-program"
                        value={editStudyProgram}
                        onChange={(e) => setEditStudyProgram(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-faculty" className="text-gray-700 text-sm">
                        {t.profile.faculty}
                      </Label>
                      <select
                        id="edit-faculty"
                        value={editFaculty}
                        onChange={(e) => setEditFaculty(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">{t.onboarding.selectFaculty}</option>
                        {FACULTIES.map((faculty) => (
                          <option key={faculty.id} value={faculty.id}>
                            {getFacultyName(faculty.id, language)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="edit-semester" className="text-gray-700 text-sm">
                        {t.onboarding.semester}
                      </Label>
                      <Input
                        id="edit-semester"
                        value={editSemester}
                        onChange={(e) => setEditSemester(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {t.common.save}
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        variant="outline"
                        className="flex-1"
                      >
                        <X className="w-4 h-4 mr-2" />
                        {t.common.cancel}
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        )}

        {/* Badges Section */}
        {activeTab === "badges" && (
          <div>
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between mb-3 px-1"
            >
              <h2 className="text-gray-800 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                {language === "de" ? "Deine Badges" : "Your Badges"}
              </h2>
              <span className="text-sm text-gray-500">
                {badges.filter((b) => b.earned).length}/{badges.length}
              </span>
            </motion.div>

            <div className="space-y-3">
              {badges.map((badge, index) => {
                const progressPercentage = Math.min(
                  (badge.progress / badge.total) * 100,
                  100
                );

                return (
                  <motion.div
                    key={badge.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                  >
                    <Card
                      className={`p-4 ${
                        badge.earned
                          ? "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border-emerald-200 dark:border-emerald-800"
                          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Badge Icon */}
                        <div
                          className={`text-5xl flex-shrink-0 ${
                            !badge.earned && "grayscale opacity-50"
                          }`}
                        >
                          {badge.icon}
                        </div>

                        {/* Badge Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3
                              className={`${
                                badge.earned ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400"
                              }`}
                            >
                              {language === "de" ? badge.name : badge.nameEn}
                            </h3>
                            {badge.earned ? (
                              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <Lock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </div>

                          <p
                            className={`text-xs mb-2 ${
                              badge.earned ? "text-gray-600" : "text-gray-500"
                            }`}
                          >
                            {language === "de"
                              ? badge.description
                              : badge.descriptionEn}
                          </p>

                          {/* Requirement */}
                          <div className="mb-2">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs text-gray-500">
                                {language === "de"
                                  ? badge.requirement
                                  : badge.requirementEn}
                              </p>
                              <span
                                className={`text-xs ${
                                  badge.earned
                                    ? "text-emerald-600"
                                    : "text-gray-600"
                                }`}
                              >
                                {badge.progress.toLocaleString()}/
                                {badge.total.toLocaleString()}
                              </span>
                            </div>
                            <Progress
                              value={progressPercentage}
                              className={`h-1.5 ${
                                badge.earned ? "bg-emerald-100" : "bg-gray-200"
                              }`}
                            />
                          </div>

                          {/* Status Badge */}
                          {badge.earned ? (
                            <Badge className="bg-emerald-500 text-white text-xs px-2 py-0.5">
                              {language === "de" ? "✓ Verdient" : "✓ Earned"}
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-gray-600 text-xs px-2 py-0.5"
                            >
                              {language === "de"
                                ? `Noch ${Math.max(0, badge.total - badge.progress)} ${
                                    badge.id === 6 ? "Coins" : 
                                    badge.id === 2 || badge.id === 7 ? "km" : 
                                    badge.id === 8 ? "Events" : ""
                                  }`
                                : `${Math.max(0, badge.total - badge.progress)} more ${
                                    badge.id === 6 ? "coins" : 
                                    badge.id === 2 || badge.id === 7 ? "km" : 
                                    badge.id === 8 ? "events" : ""
                                  }`}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* History Section */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {/* Level Progress Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200 dark:border-amber-800 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-gray-900 dark:text-gray-100">
                    {language === "de" ? "Dein Level" : "Your Level"}
                  </h3>
                </div>

                {/* Current Level Display */}
                <div className="bg-white dark:bg-gray-900/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        <span className="text-2xl">{userLevel.level}</span>
                      </div>
                      <div>
                        <h4 className="text-gray-900">
                          {language === "de" ? `Level ${userLevel.level}` : `Level ${userLevel.level}`}
                        </h4>
                        <p className="text-sm text-gray-600">{language === "de" ? userLevel.title : userLevel.titleEn}</p>
                      </div>
                    </div>
                    {nextLevel && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {language === "de" ? "Nächstes Level" : "Next Level"}
                        </p>
                        <p className="text-amber-600">Level {nextLevel.level}</p>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {nextLevel && (
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">
                          {language === "de" ? "Fortschritt" : "Progress"}
                        </span>
                        <span className="text-xs text-amber-600">
                          {totalCoins}/{nextLevel.coins} Coins
                        </span>
                      </div>
                      <Progress
                        value={(totalCoins / nextLevel.coins) * 100}
                        className="h-2 bg-amber-100"
                      />
                    </div>
                  )}
                  {nextLevel ? (
                    <p className="text-xs text-gray-500 text-center">
                      {language === "de"
                        ? `Noch ${Math.max(0, nextLevel.coins - totalCoins)} Coins bis Level ${nextLevel.level}`
                        : `${Math.max(0, nextLevel.coins - totalCoins)} more coins to Level ${nextLevel.level}`}
                    </p>
                  ) : (
                    <p className="text-xs text-amber-600 text-center">
                      {language === "de"
                        ? "🎉 Maximales Level erreicht!"
                        : "🎉 Maximum level reached!"}
                    </p>
                  )}
                </div>

                {/* Level History */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-600 mb-2">
                    {language === "de"
                      ? "Erreichte Level"
                      : "Achieved Levels"}
                  </p>

                  {levelThresholds.slice().reverse().map((levelItem) => {
                    const isUnlocked = totalCoins >= levelItem.coins;
                    return (
                      <div
                        key={levelItem.level}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          isUnlocked
                            ? "bg-white border border-amber-200"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isUnlocked
                                ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                                : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            <span className="text-sm">
                              {levelItem.level}
                            </span>
                          </div>
                          <div>
                            <p
                              className={`text-sm ${
                                isUnlocked
                                  ? "text-gray-900"
                                  : "text-gray-500"
                              }`}
                            >
                              {language === "de"
                                ? levelItem.title
                                : levelItem.titleEn}
                            </p>
                            <p className="text-xs text-gray-500">
                              {levelItem.coins > 0 ? `${levelItem.coins}+ Coins` : `${levelItem.coins} Coins`}
                            </p>
                          </div>
                        </div>
                        {isUnlocked && (
                          <CheckCircle className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 bg-white border-emerald-100 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-gray-900">
                    {language === "de" ? "Letzte Aktivitäten" : "Recent Activities"}
                  </h3>
                </div>
                <div className="space-y-3">
                  {activities.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      {language === "de" ? "Noch keine Aktivitäten" : "No activities yet"}
                    </p>
                  ) : (
                    activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className={`text-sm ${
                            activity.type === "reward" ? "text-red-700" : "text-gray-700"
                          }`}>
                            {language === "de" ? activity.action : activity.actionEn}
                          </p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                        <div className={`text-sm ${
                          activity.coins < 0 ? "text-red-600" : "text-emerald-600"
                        }`}>
                          {activity.coins > 0 ? "+" : ""}{activity.coins}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Rewards Section */}
        {activeTab === "rewards" && (
          <div className="space-y-4">
            {/* Stats Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950 dark:to-green-950 border-emerald-200 dark:border-emerald-800 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <Gift className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-gray-900 dark:text-gray-100">
                    {language === "de" ? "Eingelöste Belohnungen" : "Redeemed Rewards"}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">
                      {language === "de" ? "Gesamtanzahl" : "Total Count"}
                    </p>
                    <p className="text-2xl text-emerald-600">
                      {getRedeemedRewards().length}
                    </p>
                    <p className="text-xs text-gray-500">
                      {language === "de" ? "Belohnungen" : "Rewards"}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3">
                    <p className="text-xs text-gray-600 mb-1">
                      {language === "de" ? "Ausgegeben" : "Spent"}
                    </p>
                    <p className="text-2xl text-emerald-600">
                      {getTotalRedeemedCoins().toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Coins</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Redeemed Rewards List */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-gray-800 mb-3 px-1 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                {language === "de" ? "Einlöse-Historie" : "Redemption History"}
              </h3>

              {getRedeemedRewards().length === 0 ? (
                <Card className="p-8 text-center bg-white border-gray-200">
                  <div className="text-6xl mb-4">🎁</div>
                  <p className="text-gray-500">
                    {language === "de"
                      ? "Noch keine Belohnungen eingelöst"
                      : "No rewards redeemed yet"}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {language === "de"
                      ? "Gehe zu Belohnungen und löse deine ersten Coins ein!"
                      : "Go to Rewards and redeem your first coins!"}
                  </p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {getRedeemedRewards().map((reward, index) => (
                    <motion.div
                      key={reward.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.25 + index * 0.05 }}
                    >
                      <Card className="p-4 bg-white border-emerald-100">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{reward.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <h4 className="text-gray-900">
                                  {language === "de"
                                    ? reward.rewardTitle
                                    : reward.rewardTitleEn}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {new Date(reward.timestamp).toLocaleDateString(
                                    language === "de" ? "de-DE" : "en-US",
                                    {
                                      day: "2-digit",
                                      month: "2-digit",
                                      year: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {language === "de"
                                  ? reward.category
                                  : reward.categoryEn}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 bg-red-100 px-2 py-1 rounded-full inline-flex">
                              <span className="text-red-700 text-sm">
                                -{reward.coins}
                              </span>
                              <span className="text-xs text-red-600">Coins</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Menu Options */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <Card
            className="p-4 bg-white border-emerald-100 cursor-pointer hover:bg-emerald-50 transition-colors"
            onClick={() => onNavigate?.("settings")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-gray-900">{t.settings.title}</p>
                  <p className="text-xs text-gray-500">
                    {language === "de"
                      ? "Sprache, Benachrichtigungen, Datenschutz"
                      : "Language, Notifications, Privacy"}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>

          <Card
            className="p-4 bg-white border-pink-100 cursor-pointer hover:bg-pink-50 transition-colors"
            onClick={() => onNavigate?.("friends")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="text-gray-900">{t.friends.addFriends}</p>
                  <p className="text-xs text-gray-500">
                    {t.settings.friendsDesc}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Avatar Selector Modal */}
      <AvatarSelector
        isOpen={isAvatarSelectorOpen}
        onClose={() => setIsAvatarSelectorOpen(false)}
        currentAvatar={profileImage}
        onSelectAvatar={handleSelectAvatar}
        userName={userName}
      />
    </div>
  );
}