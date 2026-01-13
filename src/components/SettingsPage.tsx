import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Settings, Globe, Bell, Shield, Info, Check, User, Edit2, Save, X, ChevronRight, Scale, RotateCcw, Mail, Lock, Eye, EyeOff, BookOpen } from "lucide-react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { AlertDialog } from "./ui/AlertDialog";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { LegalPage } from "./LegalPage";



export function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [showLegalPage, setShowLegalPage] = useState(false);

  // Alert Dialog state
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type: "info" | "warning" | "success" | "confirm";
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    type: "info",
  });

  // Account settings
  const [userEmail, setUserEmail] = useState("");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editEmail, setEditEmail] = useState("");
  
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState({
    push: true,
    email: true,
    challengeReminders: true,
  });

  // Load email from localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setUserEmail(savedEmail);
      setEditEmail(savedEmail);
    }
  }, []);

  const handleSaveEmail = () => {
    if (editEmail && editEmail.includes("@")) {
      setUserEmail(editEmail);
      localStorage.setItem("userEmail", editEmail);
      setIsEditingEmail(false);
    } else {
      setAlertDialog({
        isOpen: true,
        title: language === "de" ? "Ungültige E-Mail" : "Invalid Email",
        description: language === "de" ? "Bitte gib eine gültige E-Mail-Adresse ein." : "Please enter a valid email address.",
        type: "warning",
        confirmText: "OK",
      });
    }
  };

  const handleCancelEmailEdit = () => {
    setEditEmail(userEmail);
    setIsEditingEmail(false);
  };

  const handleSavePassword = () => {
    const savedPassword = localStorage.getItem("userPassword");
    
    // Validate current password
    if (savedPassword && currentPassword !== savedPassword) {
      setAlertDialog({
        isOpen: true,
        title: language === "de" ? "Falsches Passwort" : "Incorrect Password",
        description: language === "de" ? "Das aktuelle Passwort ist falsch." : "Current password is incorrect.",
        type: "warning",
        confirmText: "OK",
      });
      return;
    }
    
    // Validate new password
    if (newPassword.length < 6) {
      setAlertDialog({
        isOpen: true,
        title: language === "de" ? "Passwort zu kurz" : "Password Too Short",
        description: language === "de" ? "Das neue Passwort muss mindestens 6 Zeichen lang sein." : "New password must be at least 6 characters long.",
        type: "warning",
        confirmText: "OK",
      });
      return;
    }
    
    // Validate password match
    if (newPassword !== confirmPassword) {
      setAlertDialog({
        isOpen: true,
        title: language === "de" ? "Passwörter stimmen nicht überein" : "Passwords Don't Match",
        description: language === "de" ? "Die Passwörter stimmen nicht überein." : "Passwords do not match.",
        type: "warning",
        confirmText: "OK",
      });
      return;
    }
    
    // Save new password
    localStorage.setItem("userPassword", newPassword);
    
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
    
    setAlertDialog({
      isOpen: true,
      title: language === "de" ? "Erfolgreich" : "Success",
      description: language === "de" ? "Passwort erfolgreich geändert!" : "Password changed successfully!",
      type: "success",
      confirmText: "OK",
    });
  };

  const handleCancelPasswordEdit = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsEditingPassword(false);
  };

  // Show Legal Page
  if (showLegalPage) {
    return <LegalPage onBack={() => setShowLegalPage(false)} />;
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-gray-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <Settings className="w-8 h-8" />
          <h1 className="text-2xl">{t.settings.title}</h1>
        </div>
        <p className="text-white/90 text-sm">
          {t.language === "de" ? "Personalisiere deine App" : "Personalize your app"}
        </p>
      </motion.div>

      <div className="p-4 space-y-3">
        {/* Email Settings */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.03 }}
        >
          <Card className="p-4 bg-white border-emerald-100 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">
                  {language === "de" ? "E-Mail-Adresse" : "Email Address"}
                </h3>
                <p className="text-xs text-gray-500">
                  {language === "de" ? "Deine Kontakt-E-Mail" : "Your contact email"}
                </p>
              </div>
              {!isEditingEmail && (
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>

            {isEditingEmail ? (
              <div className="space-y-3">
                <Input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="ihre.email@beispiel.de"
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveEmail}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {language === "de" ? "Speichern" : "Save"}
                  </Button>
                  <Button
                    onClick={handleCancelEmailEdit}
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {language === "de" ? "Abbrechen" : "Cancel"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  {userEmail || (language === "de" ? "Keine E-Mail hinterlegt" : "No email set")}
                </p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Password Settings */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.04 }}
        >
          <Card className="p-4 bg-white border-emerald-100 shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">
                  {language === "de" ? "Passwort" : "Password"}
                </h3>
                <p className="text-xs text-gray-500">
                  {language === "de" ? "Ändere dein Passwort" : "Change your password"}
                </p>
              </div>
              {!isEditingPassword && (
                <button
                  onClick={() => setIsEditingPassword(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>

            {isEditingPassword ? (
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder={language === "de" ? "Aktuelles Passwort" : "Current password"}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={language === "de" ? "Neues Passwort" : "New password"}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={language === "de" ? "Passwort bestätigen" : "Confirm password"}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={handleSavePassword}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {language === "de" ? "Speichern" : "Save"}
                  </Button>
                  <Button
                    onClick={handleCancelPasswordEdit}
                    variant="outline"
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {language === "de" ? "Abbrechen" : "Cancel"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">••••••••</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Language Settings - Read Only */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="p-4 bg-white border-emerald-100 shadow-md">
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
              <div className="text-xs text-gray-400">
                {language === "de" ? "Beim Onboarding festgelegt" : "Set during onboarding"}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
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

        {/* Onboarding Reset */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          onClick={() => {
            setAlertDialog({
              isOpen: true,
              title: language === "de" ? "Onboarding zurücksetzen" : "Reset Onboarding",
              description: language === "de" ? "Möchtest du wirklich das Onboarding und ALLE Daten zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden!" : "Do you really want to reset the onboarding and ALL data? This action cannot be undone!",
              type: "confirm",
              confirmText: language === "de" ? "Zurücksetzen" : "Reset",
              cancelText: language === "de" ? "Abbrechen" : "Cancel",
              onConfirm: () => {
                // Clear all localStorage data
                localStorage.clear();
                
                // Reload the app
                window.location.reload();
              }
            });
          }}
        >
          <Card className="p-4 bg-white dark:bg-gray-800 border-blue-100 dark:border-blue-900 shadow-md cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100">{t.profile.resetOnboarding}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{t.profile.resetOnboardingDesc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          </Card>
        </motion.div>

        {/* App Tutorial */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.27 }}
          onClick={() => {
            // Remove tutorial completed flag to allow reopening
            localStorage.removeItem("tutorialCompleted");
            // Trigger a page refresh or state update to show tutorial
            window.dispatchEvent(new CustomEvent("openTutorial"));
          }}
        >
          <Card className="p-4 bg-white dark:bg-gray-800 border-purple-100 dark:border-purple-900 shadow-md cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-gray-100">
                  {language === "de" ? "App-Tutorial erneut anzeigen" : "Show App Tutorial Again"}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "de" ? "Lerne die App-Funktionen kennen" : "Learn about the app features"}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          </Card>
        </motion.div>

        {/* Legal */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setShowLegalPage(true)}
        >
          <Card className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:bg-emerald-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-900">{t.legal.title}</h3>
                <p className="text-xs text-gray-500">{t.settings.legalDesc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </motion.div>

        {/* About */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
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
          <Card className={`p-4 border ${
            isDarkMode 
              ? "bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-700" 
              : "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200"
          }`}>
            <div className="text-center">
              <p className={`text-sm mb-1 ${isDarkMode ? "text-gray-200" : "text-gray-600"}`}>
                Eco Coins App
              </p>
              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Version 1.0.0
              </p>
              <p className={`text-xs mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {t.settings.environment}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.isOpen}
        title={alertDialog.title}
        description={alertDialog.description}
        type={alertDialog.type}
        confirmText={alertDialog.confirmText}
        cancelText={alertDialog.cancelText}
        onConfirm={alertDialog.onConfirm}
        onClose={() => setAlertDialog({ isOpen: false, title: "", description: "", type: "info" })}
      />
    </div>
  );
}