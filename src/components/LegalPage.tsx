import { motion } from "motion/react";
import { useState } from "react";
import { Scale, FileText, Shield, ChevronLeft, ChevronRight, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";

interface LegalPageProps {
  onBack: () => void;
}

export function LegalPage({ onBack }: LegalPageProps) {
  const { t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<"menu" | "imprint" | "privacy" | "terms">("menu");

  const renderImprint = () => (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-4"
    >
      <Button
        variant="ghost"
        onClick={() => setActiveSection("menu")}
        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 -ml-2 mb-2"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        {t.common.back}
      </Button>

      <Card className="p-4 bg-white border-emerald-100 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-gray-900">{t.legal.company}</h3>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-lg text-gray-900">Digital Turtles</p>
            <p className="text-sm text-gray-600 mt-1">
              {language === "de"
                ? "Nachhaltige Technologielösungen für Hochschulen"
                : "Sustainable Technology Solutions for Universities"}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-start gap-3 mb-3">
              <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">{t.legal.address}</p>
                <p className="text-gray-900">
                  Fakultät 05 - Informatik und Mathematik
                </p>
                <p className="text-gray-900">
                  Hochschule München
                </p>
                <p className="text-gray-900">
                  Lothstraße 64
                </p>
                <p className="text-gray-900">
                  80335 München
                </p>
                <p className="text-gray-900">
                  Deutschland
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-3">
              <Mail className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">{t.legal.email}</p>
                <a
                  href="mailto:info@digital-turtles.de"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  info@digital-turtles.de
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">{t.legal.phone}</p>
                <a
                  href="tel:+498912654321"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  +49 89 1265 4321
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="mb-3">
              <p className="text-sm text-gray-500">{t.legal.representative}</p>
              <p className="text-gray-900">Dr. Maria Grünwald</p>
            </div>

            <div className="mb-3">
              <p className="text-sm text-gray-500">{t.legal.registrationNumber}</p>
              <p className="text-gray-900">HRB 123456</p>
              <p className="text-xs text-gray-500">
                {language === "de"
                  ? "Amtsgericht München"
                  : "District Court Munich"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">{t.legal.taxId}</p>
              <p className="text-gray-900">DE987654321</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 mb-2">{t.legal.responsibleForContent}</p>
            <p className="text-gray-900">Dr. Maria Grünwald</p>
            <p className="text-sm text-gray-600 mt-2">
              {language === "de"
                ? "Verantwortlich nach § 18 Abs. 2 MStV"
                : "Responsible according to § 18 para. 2 MStV"}
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
            <p className="text-xs text-gray-600">
              {language === "de"
                ? "Hinweis: Dies ist eine Beispiel-Anwendung. Die hier angegebenen Kontaktdaten sind fiktiv und dienen nur zu Demonstrationszwecken."
                : "Note: This is a sample application. The contact information provided here is fictitious and for demonstration purposes only."}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderPrivacy = () => (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-4"
    >
      <Button
        variant="ghost"
        onClick={() => setActiveSection("menu")}
        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 -ml-2 mb-2"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        {t.common.back}
      </Button>

      <Card className="p-4 bg-white border-emerald-100 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-gray-900">{t.legal.privacy}</h3>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h4 className="text-gray-900 mb-2">
              {language === "de" ? "1. Datenschutz auf einen Blick" : "1. Data Protection at a Glance"}
            </h4>
            <p className="text-gray-600">
              {language === "de"
                ? "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese App nutzen."
                : "The following information provides a simple overview of what happens to your personal data when you use this app."}
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 mb-2">
              {language === "de" ? "2. Datenerfassung in der App" : "2. Data Collection in the App"}
            </h4>
            <p className="text-gray-600 mb-2">
              {language === "de"
                ? "Wir erfassen folgende Daten:"
                : "We collect the following data:"}
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
              <li>
                {language === "de"
                  ? "Profildaten (Name, Studiengang, Fakultät)"
                  : "Profile data (name, study program, faculty)"}
              </li>
              <li>
                {language === "de"
                  ? "Aktivitätsdaten (abgeschlossene Challenges, gesammelte Coins)"
                  : "Activity data (completed challenges, collected coins)"}
              </li>
              <li>
                {language === "de"
                  ? "GPS-Daten (nur während aktiver Fahrrad-Tracking Sessions)"
                  : "GPS data (only during active bike tracking sessions)"}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-gray-900 mb-2">
              {language === "de" ? "3. Ihre Rechte" : "3. Your Rights"}
            </h4>
            <p className="text-gray-600">
              {language === "de"
                ? "Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten."
                : "You have the right to information, correction, deletion, and restriction of the processing of your personal data at any time."}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs text-gray-600">
              {language === "de"
                ? "Ihre Daten werden nur lokal auf Ihrem Gerät gespeichert und nicht an externe Server übertragen."
                : "Your data is stored locally on your device only and is not transmitted to external servers."}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderTerms = () => (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-4"
    >
      <Button
        variant="ghost"
        onClick={() => setActiveSection("menu")}
        className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 -ml-2 mb-2"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        {t.common.back}
      </Button>

      <Card className="p-4 bg-white border-emerald-100 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-gray-900">{t.legal.terms}</h3>
        </div>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h4 className="text-gray-900 mb-2">
              {language === "de" ? "1. Geltungsbereich" : "1. Scope"}
            </h4>
            <p className="text-gray-600">
              {language === "de"
                ? "Diese Nutzungsbedingungen gelten für die Nutzung der Eco Coins App an der Hochschule München."
                : "These terms of service apply to the use of the Eco Coins app at Munich University of Applied Sciences."}
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 mb-2">
              {language === "de" ? "2. Teilnahme" : "2. Participation"}
            </h4>
            <p className="text-gray-600">
              {language === "de"
                ? "Die Teilnahme ist freiwillig und steht allen Studierenden und Mitarbeitenden der Hochschule München offen."
                : "Participation is voluntary and open to all students and staff of Munich University of Applied Sciences."}
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 mb-2">
              {language === "de" ? "3. Belohnungen" : "3. Rewards"}
            </h4>
            <p className="text-gray-600">
              {language === "de"
                ? "Eco Coins können gegen Belohnungen eingelöst werden. Die Verfügbarkeit von Belohnungen kann variieren."
                : "Eco Coins can be redeemed for rewards. Reward availability may vary."}
            </p>
          </div>

          <div>
            <h4 className="text-gray-900 mb-2">
              {language === "de" ? "4. Verhaltensregeln" : "4. Code of Conduct"}
            </h4>
            <p className="text-gray-600">
              {language === "de"
                ? "Manipulation oder Missbrauch des Systems führt zum Ausschluss aus dem Programm."
                : "Manipulation or abuse of the system will result in exclusion from the program."}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderMenu = () => (
    <div className="space-y-3">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        onClick={() => setActiveSection("imprint")}
      >
        <Card className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:bg-emerald-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">{t.legal.imprint}</h3>
              <p className="text-xs text-gray-500">{t.legal.imprintDesc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        onClick={() => setActiveSection("privacy")}
      >
        <Card className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:bg-emerald-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">{t.legal.privacy}</h3>
              <p className="text-xs text-gray-500">{t.legal.privacyDesc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        onClick={() => setActiveSection("terms")}
      >
        <Card className="p-4 bg-white border-emerald-100 shadow-md cursor-pointer hover:bg-emerald-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">{t.legal.terms}</h3>
              <p className="text-xs text-gray-500">{t.legal.termsDesc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </Card>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-gray-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <Scale className="w-8 h-8" />
          <h1 className="text-2xl">{t.legal.title}</h1>
        </div>
        <p className="text-white/90 text-sm pl-12">
          {t.legal.subtitle}
        </p>
      </motion.div>

      <div className="p-4">
        {activeSection === "menu" && renderMenu()}
        {activeSection === "imprint" && renderImprint()}
        {activeSection === "privacy" && renderPrivacy()}
        {activeSection === "terms" && renderTerms()}
      </div>
    </div>
  );
}