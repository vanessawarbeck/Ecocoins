import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Leaf,
  LogIn,
  MapPin,
  Camera,
  Image as ImageIcon,
  User,
  Target,
  Gift,
  TrendingUp,
  CheckCircle,
  Bike,
  Recycle,
  Coffee,
  Globe,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useLanguage } from "../utils/LanguageContext";
import { FACULTIES, getFacultyName } from "../utils/faculties";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(-1); // Start at -1 for language selection
  const { t, language, setLanguage } = useLanguage();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    studyProgram: "",
    faculty: "",
  });
  const [permissions, setPermissions] = useState({
    gps: false,
    camera: false,
    gallery: false,
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleLogin = () => {
    // Simulate login
    if (userData.email && userData.password) {
      setStep(2);
    }
  };

  const handlePermissions = () => {
    // In real app, request actual permissions
    setPermissions({ gps: true, camera: true, gallery: true });
    setStep(3);
  };

  const handleProfileComplete = () => {
    // Save to localStorage
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userStudyProgram", userData.studyProgram);
    localStorage.setItem("userFaculty", userData.faculty);
    handleNext();
  };

  const handleFinish = () => {
    // Mark onboarding as complete
    localStorage.setItem("onboardingComplete", "true");
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      {/* Language Toggle - Only visible after language selection */}
      {step > -1 && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
            <button
              onClick={() => setLanguage("de")}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                language === "de"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              🇩🇪 DE
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full text-sm transition-all ${
                language === "en"
                  ? "bg-emerald-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              🇬🇧 EN
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step -1: Language Selection */}
        {step === -1 && (
          <motion.div
            key="language"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <Globe className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <h1 className="text-3xl text-gray-900 mb-3">
                {language === "de" ? "Sprache wählen" : "Choose Language"}
              </h1>
              <p className="text-gray-600 mb-8">
                {language === "de" 
                  ? "Wähle deine bevorzugte Sprache für die App"
                  : "Select your preferred language for the app"}
              </p>

              <div className="space-y-3 mb-8">
                <button
                  onClick={() => {
                    setLanguage("de");
                    setTimeout(() => handleNext(), 100);
                  }}
                  className="w-full p-4 bg-white border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-lg transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇩🇪</span>
                    <div className="text-left">
                      <p className="text-gray-900">Deutsch</p>
                      <p className="text-xs text-gray-500">German</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </button>

                <button
                  onClick={() => {
                    setLanguage("en");
                    setTimeout(() => handleNext(), 100);
                  }}
                  className="w-full p-4 bg-white border-2 border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-lg transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🇬🇧</span>
                    <div className="text-left">
                      <p className="text-gray-900">English</p>
                      <p className="text-xs text-gray-500">Englisch</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 0: Welcome */}
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 text-center bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <Leaf className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <h1 className="text-3xl text-gray-900 mb-3">
                {t.onboarding.welcome}
              </h1>
              <p className="text-gray-600 mb-8">
                {t.onboarding.welcomeSubtitle}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <Target className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700 text-left">
                    {t.onboarding.completeChallenges}
                  </p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700 text-left">
                    {t.onboarding.collectCoins}
                  </p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <Gift className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-gray-700 text-left">
                    {t.onboarding.redeemRewards}
                  </p>
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6"
              >
                {t.onboarding.letsGo}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Step 1: Login */}
        {step === 1 && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl text-gray-900 mb-2 text-center">
                {t.onboarding.login}
              </h2>
              <p className="text-gray-600 text-center mb-6 text-sm">
                {t.onboarding.loginSubtitle}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    {t.onboarding.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="vorname.nachname@hm.edu"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-gray-700">
                    {t.onboarding.password}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                <p className="text-xs text-blue-700">
                  {t.onboarding.privacyNote}
                </p>
              </div>

              <Button
                onClick={handleLogin}
                disabled={!userData.email || !userData.password}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 disabled:opacity-50"
              >
                {t.onboarding.signIn}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                {t.onboarding.loginHelp}{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  {t.onboarding.help}
                </a>
              </p>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Permissions */}
        {step === 2 && (
          <motion.div
            key="permissions"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl text-gray-900 mb-2 text-center">
                {t.onboarding.permissions}
              </h2>
              <p className="text-gray-600 text-center mb-6 text-sm">
                {t.onboarding.permissionsSubtitle}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-900">{t.onboarding.gps}</p>
                      <p className="text-xs text-gray-600">
                        {t.onboarding.gpsDesc}
                      </p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Camera className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-900">{t.onboarding.camera}</p>
                      <p className="text-xs text-gray-600">
                        {t.onboarding.cameraDesc}
                      </p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-900">{t.onboarding.gallery}</p>
                      <p className="text-xs text-gray-600">
                        {t.onboarding.galleryDesc}
                      </p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6">
                <p className="text-xs text-amber-700">
                  {t.onboarding.privacyNote}
                </p>
              </div>

              <Button
                onClick={handlePermissions}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-6"
              >
                {t.onboarding.grantPermissions}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Profile */}
        {step === 3 && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>

              <h2 className="text-2xl text-gray-900 mb-2 text-center">
                {t.onboarding.createProfile}
              </h2>
              <p className="text-gray-600 text-center mb-6 text-sm">
                {t.onboarding.createProfileSubtitle}
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    {t.onboarding.fullName}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Max Mustermann"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="studyProgram" className="text-gray-700">
                    {t.onboarding.studyProgram}
                  </Label>
                  <Input
                    id="studyProgram"
                    type="text"
                    placeholder={language === "de" ? "z.B. Informatik" : "e.g. Computer Science"}
                    value={userData.studyProgram}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        studyProgram: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="faculty" className="text-gray-700">
                    {t.onboarding.faculty}
                  </Label>
                  <select
                    id="faculty"
                    value={userData.faculty}
                    onChange={(e) =>
                      setUserData({ ...userData, faculty: e.target.value })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  >
                    <option value="">{t.onboarding.selectFaculty}</option>
                    {FACULTIES.map((faculty) => (
                      <option key={faculty.id} value={faculty.id}>
                        {language === "de" ? faculty.nameDe : faculty.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Button
                onClick={handleProfileComplete}
                disabled={
                  !userData.name || !userData.studyProgram || !userData.faculty
                }
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6 disabled:opacity-50"
              >
                {t.common.next}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Step 4: Introduction */}
        {step === 4 && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-md"
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                    <Leaf className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
              </div>

              <h2 className="text-2xl text-gray-900 mb-2 text-center">
                {t.onboarding.introduction}
              </h2>
              <p className="text-gray-600 text-center mb-6 text-sm">
                {t.onboarding.introSubtitle}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white">1</span>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">
                      <Bike className="w-4 h-4 inline mr-1" />
                      {t.onboarding.step1}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t.onboarding.step1Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white">2</span>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">
                      <Target className="w-4 h-4 inline mr-1" />
                      {t.onboarding.step2}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t.onboarding.step2Desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white">3</span>
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-1">
                      <Gift className="w-4 h-4 inline mr-1" />
                      {t.onboarding.step3}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {t.onboarding.step3Desc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-emerald-900 text-center">
                  {t.onboarding.readyMessage}
                </p>
              </div>

              <Button
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6"
              >
                {t.onboarding.startApp}
                <CheckCircle className="w-5 h-5 ml-2" />
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-emerald-600"
                  : i < step
                  ? "w-2 bg-emerald-400"
                  : "w-2 bg-gray-300"
              }`}
              animate={{ scale: i === step ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.5, repeat: i === step ? Infinity : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}