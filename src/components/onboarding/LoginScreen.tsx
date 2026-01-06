import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { AlertDialog } from "../ui/AlertDialog";
import { LogIn, Lock, Mail, Building2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../utils/LanguageContext";
import logoHM from "figma:asset/7a5625eb34dcf1c2699e0574b36f2e03c14671c8.png";

interface LoginScreenProps {
  onContinue: () => void;
  onBack?: () => void;
}

export function LoginScreen({ onContinue, onBack }: LoginScreenProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Alert Dialog state
  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type: "info" | "warning" | "success" | "confirm";
  }>({
    isOpen: false,
    title: "",
    description: "",
    type: "info",
  });

  const handleLogin = () => {
    // Validate email format
    if (!email.includes("@") || !email.includes(".")) {
      setAlertDialog({
        isOpen: true,
        title: language === "de" ? "Ungültige E-Mail" : "Invalid Email",
        description: language === "de" 
          ? "Bitte gib eine gültige E-Mail-Adresse ein (z.B. vorname.nachname@hm.edu)." 
          : "Please enter a valid email address (e.g. firstname.lastname@hm.edu).",
        type: "warning",
      });
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setAlertDialog({
        isOpen: true,
        title: language === "de" ? "Passwort zu kurz" : "Password Too Short",
        description: language === "de" 
          ? "Das Passwort muss mindestens 6 Zeichen lang sein." 
          : "Password must be at least 6 characters long.",
        type: "warning",
      });
      return;
    }

    // Save email and password to localStorage
    if (email && password) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);
      onContinue();
    }
  };

  const texts = {
    de: {
      title: "Mit HM-Account anmelden",
      subtitle: "Verwende deinen Hochschule München Account",
      email: "E-Mail-Adresse",
      emailPlaceholder: "vorname.nachname@hm.edu",
      password: "Passwort",
      passwordPlaceholder: "Dein HM-Passwort",
      login: "Anmelden",
      noAccount: "Noch keinen HM-Account?",
      register: "Registrieren",
      footer: "Geschützt durch HM Single Sign-On"
    },
    en: {
      title: "Sign in with HM Account",
      subtitle: "Use your Munich University Account",
      email: "Email Address",
      emailPlaceholder: "firstname.lastname@hm.edu",
      password: "Password",
      passwordPlaceholder: "Your HM password",
      login: "Sign In",
      noAccount: "Don't have an HM account?",
      register: "Register",
      footer: "Protected by HM Single Sign-On"
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF8B8B] via-[#FF6B6B] to-[#E74C3C] flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* HM Logo at top */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 text-center"
        >
          <img 
            src={logoHM} 
            alt="Hochschule München" 
            className="h-10 mx-auto object-contain brightness-0 invert opacity-90"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center"
          >
            <LogIn className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl text-white mb-2">
            {t.title}
          </h2>
          <p className="text-white/80">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Login Form */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm border-white/20 mb-6">
          <div className="space-y-4">
            {/* Email Input */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm text-gray-700 mb-2">
                {t.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm text-gray-700 mb-2">
                {t.password}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </motion.div>
          </div>
        </Card>

        {/* Login Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={handleLogin}
            disabled={!email || !password}
            className="w-full bg-white text-[#E74C3C] hover:bg-white/90 disabled:bg-white/50 disabled:text-gray-400 rounded-full py-6 text-lg shadow-xl"
          >
            {t.login}
          </Button>
        </motion.div>

        {/* Register Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-center"
        >
          <p className="text-white/80 text-sm">
            {t.noAccount}{" "}
            <button className="text-white hover:text-white/90 underline font-semibold">
              {t.register}
            </button>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Lock className="w-4 h-4 text-white" />
            <p className="text-white/80 text-sm">
              {t.footer}
            </p>
          </div>
        </motion.div>

        {/* Back Button */}
        {onBack && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Button
              onClick={onBack}
              className="w-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-full py-6 text-lg mt-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {language === "de" ? "Zurück" : "Back"}
            </Button>
          </motion.div>
        )}
      </div>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={alertDialog.isOpen}
        onClose={() => setAlertDialog({ isOpen: false, title: "", description: "", type: "info" })}
        title={alertDialog.title}
        description={alertDialog.description}
        type={alertDialog.type}
      />
    </div>
  );
}