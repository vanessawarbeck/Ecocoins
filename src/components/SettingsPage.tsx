import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Settings, Globe, Bell, Shield, Info, Check, User, Edit2, Save, X, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";
import { LanguageSettingsModal } from "./LanguageSettingsModal";
import type { Language } from "../utils/translations";

export function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const [editingPersonalData, setEditingPersonalData] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    push: true,
    email: true,
    challengeReminders: true,
  });

  // Personal data
  const [personalData, setPersonalData] = useState({
    name: "",
    studyProgram: "",
    semester: "",
  });

  const [editData, setEditData] = useState({ ...personalData });

  useEffect(() => {
    const name = localStorage.getItem("userName") || "Max Studierender";
    const studyProgram = localStorage.getItem("userStudyProgram") || "Informatik";
    const semester = localStorage.getItem("userSemester") || "3";
    
    setPersonalData({ name, studyProgram, semester });
    setEditData({ name, studyProgram, semester });
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleSavePersonalData = () => {
    localStorage.setItem("userName", editData.name);
    localStorage.setItem("userStudyProgram", editData.studyProgram);
    localStorage.setItem("userSemester", editData.semester);
    setPersonalData(editData);
    setEditingPersonalData(false);
  };

  const handleCancelEdit = () => {
    setEditData(personalData);
    setEditingPersonalData(false);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-8 h-8" />
          <h1 className="text-2xl">{t.settings.title}</h1>
        </div>
        <p className="text-emerald-100 text-sm">
          {t.language === "de" ? "Personalisiere deine App" : "Personalize your app"}
        </p>
      </motion.div>

      <div className="p-4 space-y-3">
        {/* Personal Data */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="p-4 bg-white border-emerald-100 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">{t.settings.personalData}</h3>
                <p className="text-xs text-gray-500">{t.settings.personalDataDesc}</p>
              </div>
              {!editingPersonalData && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingPersonalData(true)}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            {!editingPersonalData ? (
              <div className="space-y-2 pl-13">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{t.profile.name}</span>
                  <span className="text-gray-900">{personalData.name}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{t.onboarding.studyProgram}</span>
                  <span className="text-gray-900">{personalData.studyProgram}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">{t.onboarding.semester}</span>
                  <span className="text-gray-900">{personalData.semester}. {t.onboarding.semester}</span>
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
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-program" className="text-gray-700 text-sm">
                    {t.onboarding.studyProgram}
                  </Label>
                  <Input
                    id="edit-program"
                    value={editData.studyProgram}
                    onChange={(e) => setEditData({ ...editData, studyProgram: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-semester" className="text-gray-700 text-sm">
                    {t.onboarding.semester}
                  </Label>
                  <Input
                    id="edit-semester"
                    value={editData.semester}
                    onChange={(e) => setEditData({ ...editData, semester: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={handleSavePersonalData}
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

        {/* Language Settings */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card 
            className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => setShowLanguageModal(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">{t.settings.language}</h3>
                <p className="text-xs text-gray-500">
                  {language === "de" ? "Deutsch" : "English"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 bg-white border-emerald-100 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">{t.settings.notifications}</h3>
                <p className="text-xs text-gray-500">{t.settings.notificationsDesc}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{t.settings.pushNotifications}</span>
                <button
                  onClick={() => setNotificationSettings({ ...notificationSettings, push: !notificationSettings.push })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.push ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notificationSettings.push ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{t.settings.emailNotifications}</span>
                <button
                  onClick={() => setNotificationSettings({ ...notificationSettings, email: !notificationSettings.email })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.email ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notificationSettings.email ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">{t.settings.challengeReminders}</span>
                <button
                  onClick={() => setNotificationSettings({ ...notificationSettings, challengeReminders: !notificationSettings.challengeReminders })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings.challengeReminders ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      notificationSettings.challengeReminders ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:bg-emerald-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">{t.settings.privacy}</h3>
                <p className="text-xs text-gray-500">{t.settings.privacyDesc}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:bg-emerald-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">{t.settings.about}</h3>
                <p className="text-xs text-gray-500">{t.settings.aboutDesc}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Eco Coins App</p>
              <p className="text-xs text-gray-500">Version 1.0.0</p>
              <p className="text-xs text-gray-500 mt-2">
                {t.settings.environment}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Language Settings Modal */}
      <LanguageSettingsModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </div>
  );
}