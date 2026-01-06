import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { User, GraduationCap, Building, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../utils/LanguageContext";
import { FACULTIES } from "../../utils/faculties";

interface ProfileSetupScreenProps {
  onContinue: (profile: { name: string; studiengang: string; fakultaet: string }) => void;
  onBack?: () => void;
}

export function ProfileSetupScreen({ onContinue, onBack }: ProfileSetupScreenProps) {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [studiengang, setStudiengang] = useState("");
  const [fakultaet, setFakultaet] = useState("");

  const texts = {
    de: {
      title: "Profil erstellen",
      subtitle: "Noch ein paar Infos über dich",
      name: "Dein Name",
      namePlaceholder: "z.B. Max Mustermann",
      studiengang: "Studiengang",
      studiengangPlaceholder: "z.B. Informatik",
      fakultaet: "Fakultät",
      fakultaetPlaceholder: "Wähle deine Fakultät",
      create: "Profil erstellen",
      footer: "Diese Informationen helfen uns, deine Erfahrung zu personalisieren"
    },
    en: {
      title: "Create Profile",
      subtitle: "Just a few more details about you",
      name: "Your Name",
      namePlaceholder: "e.g. John Doe",
      studiengang: "Study Program",
      studiengangPlaceholder: "e.g. Computer Science",
      fakultaet: "Faculty",
      fakultaetPlaceholder: "Select your faculty",
      create: "Create Profile",
      footer: "This information helps us personalize your experience"
    }
  };

  const t = texts[language];

  const handleSubmit = () => {
    if (name && studiengang && fakultaet) {
      onContinue({ name, studiengang, fakultaet });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
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
            <User className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl text-white mb-2">
            {t.title}
          </h2>
          <p className="text-white/80">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-white/95 backdrop-blur-sm">
            <div className="space-y-5">
              {/* Name Input */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-sm text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  {t.name}
                </label>
                <Input
                  type="text"
                  placeholder={t.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full"
                />
              </motion.div>

              {/* Studiengang Input */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4 inline mr-2" />
                  {t.studiengang}
                </label>
                <Input
                  type="text"
                  placeholder={t.studiengangPlaceholder}
                  value={studiengang}
                  onChange={(e) => setStudiengang(e.target.value)}
                  className="w-full"
                />
              </motion.div>

              {/* Fakultät Select */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  {t.fakultaet}
                </label>
                <select
                  value={fakultaet}
                  onChange={(e) => setFakultaet(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="">{t.fakultaetPlaceholder}</option>
                  {FACULTIES.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {language === "de" ? faculty.nameDe : faculty.nameEn}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="pt-2"
              >
                <Button
                  onClick={handleSubmit}
                  disabled={!name || !studiengang || !fakultaet}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full py-6 disabled:opacity-50"
                >
                  {t.create}
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 text-center"
        >
          <p className="text-white/60 text-sm">
            {t.footer}
          </p>
        </motion.div>

        {/* Back Button */}
        {onBack && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
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
    </div>
  );
}