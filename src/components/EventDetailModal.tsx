import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Calendar, Clock, Users, Award, CheckCircle, AlertCircle, User as UserIcon, Mail } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { useActivities } from "../utils/ActivityContext";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import type { Event, EventRegistration } from "../utils/newsData";
import { getEventRegistration, saveEventRegistration, updateEventRegistration } from "../utils/newsData";
import { PointsAnimation } from "./PointsAnimation";
import { addPointsTransaction } from "./PointsHistoryModal";
import { getModalClasses } from "../utils/modalDarkModeClasses";

interface EventDetailModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const { addActivity } = useActivities();
  const darkClasses = getModalClasses(isDarkMode);
  const [registration, setRegistration] = useState<EventRegistration | undefined>(
    getEventRegistration(event.id)
  );
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [supervisorCode, setSupervisorCode] = useState("");

  const title = language === "de" ? event.titleDe : event.titleEn;
  const description = language === "de" ? event.descriptionDe : event.descriptionEn;
  const category = language === "de" ? event.categoryDe : event.categoryEn;
  const requirements = language === "de" ? event.requirementsDe : event.requirementsEn;

  const isFull = event.currentParticipants >= event.maxParticipants;
  const isRegistered = !!registration;

  const texts = {
    de: {
      eventDetails: "Event Details",
      location: "Ort",
      date: "Datum",
      duration: "Dauer",
      participants: "Teilnehmer",
      organizer: "Veranstalter",
      requirements: "Anforderungen",
      reward: "Belohnung",
      register: "Jetzt anmelden",
      registered: "Angemeldet",
      full: "Ausgebucht",
      status: "Status",
      pending: "Anmeldung ausstehend",
      confirmed: "Bestätigt",
      completed: "Abgeschlossen",
      cancelled: "Abgesagt",
      cancel: "Abmelden",
      confirmRegistration: "Anmeldung bestätigen",
      confirmParticipation: "Teilnahme bestätigen",
      emailCode: "E-Mail-Bestätigungscode",
      supervisorCode: "Supervisor-Code",
      enterCode: "Code eingeben...",
      submit: "Bestätigen",
      coinsAwarded: "Coins wurden gutgeschrieben!",
      registrationSuccess: "Erfolgreich angemeldet!",
      cancellationSuccess: "Anmeldung storniert",
      confirmationSuccess: "Anmeldung bestätigt! Bitte warte auf die Event-Durchführung.",
      participationSuccess: "Teilnahme bestätigt! Coins gutgeschrieben.",
      invalidCode: "Ungültiger Code",
      emailCodeDesc: "Bitte gib den Bestätigungscode ein, den du per E-Mail erhalten hast.",
      supervisorCodeDesc: "Nach dem Event: Bitte den Code vom Supervisor/Organisator eingeben.",
      demoCode: "Demo-Code",
    },
    en: {
      eventDetails: "Event Details",
      location: "Location",
      date: "Date",
      duration: "Duration",
      participants: "Participants",
      organizer: "Organizer",
      requirements: "Requirements",
      reward: "Reward",
      register: "Register Now",
      registered: "Registered",
      full: "Full",
      status: "Status",
      pending: "Registration pending",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
      cancel: "Cancel Registration",
      confirmRegistration: "Confirm Registration",
      confirmParticipation: "Confirm Participation",
      emailCode: "Email Confirmation Code",
      supervisorCode: "Supervisor Code",
      enterCode: "Enter code...",
      submit: "Submit",
      coinsAwarded: "Coins awarded!",
      registrationSuccess: "Successfully registered!",
      cancellationSuccess: "Registration cancelled",
      confirmationSuccess: "Registration confirmed! Please wait for the event.",
      participationSuccess: "Participation confirmed! Coins credited.",
      invalidCode: "Invalid code",
      emailCodeDesc: "Please enter the confirmation code you received via email.",
      supervisorCodeDesc: "After the event: Please enter the code from the supervisor/organizer.",
      demoCode: "Demo code",
    },
  };

  const t = texts[language];

  const handleRegister = () => {
    if (isFull || isRegistered) return;

    const newRegistration: EventRegistration = {
      eventId: event.id,
      userId: "current-user",
      registeredAt: new Date(),
      status: "pending",
      coinsAwarded: false,
    };

    saveEventRegistration(newRegistration);
    setRegistration(newRegistration);
    
    toast.success(t.registrationSuccess, {
      description: language === "de" 
        ? "Du erhältst in Kürze eine E-Mail mit einem Bestätigungscode." 
        : "You will receive an email with a confirmation code shortly.",
    });
  };

  const handleConfirmRegistration = () => {
    if (!registration || emailCode !== "EMAIL2024") {
      toast.error(t.invalidCode);
      return;
    }

    const updatedRegistration: EventRegistration = {
      ...registration,
      status: "confirmed",
    };

    updateEventRegistration(event.id, updatedRegistration);
    setRegistration(updatedRegistration);

    toast.success(t.confirmationSuccess);
    setEmailCode("");
  };

  const handleCancel = () => {
    if (!registration) return;

    updateEventRegistration(event.id, { status: "cancelled" });
    setRegistration({ ...registration, status: "cancelled" });
    
    toast.info(t.cancellationSuccess);
  };

  const handleConfirmParticipation = () => {
    if (!registration || supervisorCode !== "SUP2024") {
      toast.error(t.invalidCode);
      return;
    }

    const updatedRegistration: EventRegistration = {
      ...registration,
      status: "completed",
      coinsAwarded: true,
      supervisorName: "Supervisor",
      completedAt: new Date(),
    };

    updateEventRegistration(event.id, updatedRegistration);
    setRegistration(updatedRegistration);

    // Award coins
    const totalCoins = parseInt(localStorage.getItem("totalCoins") || "0");
    localStorage.setItem("totalCoins", (totalCoins + event.coins).toString());

    // Add to points history
    addPointsTransaction({
      type: "earn",
      amount: event.coins,
      source: title,
      timestamp: new Date(),
      category: language === "de" ? "Event-Teilnahme" : "Event Participation",
    });

    // Add to activity history
    addActivity({
      action: `Event besucht: ${title}`,
      actionEn: `Event attended: ${event.titleEn}`,
      coins: event.coins,
      date: language === "de" ? "Heute" : "Today",
      type: "event",
    });

    // Show animation
    setShowPointsAnimation(true);
    setTimeout(() => setShowPointsAnimation(false), 2000);

    toast.success(t.participationSuccess);
    setSupervisorCode("");
  };

  const getStatusBadge = () => {
    if (!registration) return null;

    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: t.pending },
      confirmed: { color: "bg-blue-100 text-blue-800", text: t.confirmed },
      completed: { color: "bg-green-100 text-green-800", text: t.completed },
      cancelled: { color: "bg-red-100 text-red-800", text: t.cancelled },
    };

    const config = statusConfig[registration.status];

    return (
      <Badge className={`${config.color} text-xs`}>
        {config.text}
      </Badge>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
            style={{ top: "56px" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className={`fixed inset-x-0 bottom-0 z-50 rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto ${darkClasses.containerRounded}`}
            style={{ top: "56px" }}
          >
            {/* Points Animation */}
            {showPointsAnimation && (
              <PointsAnimation points={event.coins} onComplete={() => setShowPointsAnimation(false)} />
            )}

            {/* Header with Image */}
            <div className="relative h-48 bg-gradient-to-br from-emerald-500 to-green-600">
              {event.image && (
                <img src={event.image} alt={title} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-white/20 backdrop-blur-sm border-white/30 text-white mb-2">
                  {category}
                </Badge>
                <h2 className="text-2xl text-white">{title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Status Badge */}
              {isRegistered && (
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkClasses.textMuted}`}>{t.status}:</span>
                  {getStatusBadge()}
                </div>
              )}

              {/* Description */}
              <p className={`leading-relaxed ${darkClasses.textPrimary}`}>{description}</p>

              {/* Event Info Grid */}
              <div className="grid grid-cols-1 gap-3">
                <Card className={`p-3 ${
                  isDarkMode 
                    ? "bg-blue-900/30 border-blue-700" 
                    : "bg-blue-50 border-blue-100"
                }`}>
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`} />
                    <div className="flex-1">
                      <p className={`text-xs mb-1 ${darkClasses.textMuted}`}>{t.location}</p>
                      <p className={`text-sm ${darkClasses.textPrimary}`}>{event.location}</p>
                    </div>
                  </div>
                </Card>

                <Card className={`p-3 ${
                  isDarkMode 
                    ? "bg-purple-900/30 border-purple-700" 
                    : "bg-purple-50 border-purple-100"
                }`}>
                  <div className="flex items-start gap-3">
                    <Calendar className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isDarkMode ? "text-purple-400" : "text-purple-600"
                    }`} />
                    <div className="flex-1">
                      <p className={`text-xs mb-1 ${darkClasses.textMuted}`}>{t.date}</p>
                      <p className={`text-sm ${darkClasses.textPrimary}`}>
                        {event.date.toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className={`p-3 ${
                  isDarkMode 
                    ? "bg-amber-900/30 border-amber-700" 
                    : "bg-amber-50 border-amber-100"
                }`}>
                  <div className="flex items-start gap-3">
                    <Clock className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isDarkMode ? "text-amber-400" : "text-amber-600"
                    }`} />
                    <div className="flex-1">
                      <p className={`text-xs mb-1 ${darkClasses.textMuted}`}>{t.duration}</p>
                      <p className={`text-sm ${darkClasses.textPrimary}`}>{event.duration}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Participants */}
              <Card className={`p-4 ${
                isDarkMode 
                  ? "bg-gradient-to-br from-emerald-900/40 to-green-900/40 border-emerald-700" 
                  : "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-100"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <Users className={`w-5 h-5 ${isDarkMode ? "text-emerald-400" : "text-emerald-600"}`} />
                  <div className="flex-1">
                    <p className={`text-sm ${darkClasses.textPrimary}`}>{t.participants}</p>
                    <p className={`text-xs ${darkClasses.textMuted}`}>
                      {event.currentParticipants} / {event.maxParticipants}
                    </p>
                  </div>
                </div>
                <Progress 
                  value={(event.currentParticipants / event.maxParticipants) * 100} 
                  className="h-2"
                />
              </Card>

              {/* Organizer */}
              <Card className={`p-3 ${darkClasses.card}`}>
                <div className="flex items-center gap-3">
                  <UserIcon className={`w-5 h-5 ${darkClasses.textMuted}`} />
                  <div>
                    <p className={`text-xs ${darkClasses.textMuted}`}>{t.organizer}</p>
                    <p className={`text-sm ${darkClasses.textPrimary}`}>{event.organizerName}</p>
                    <p className={`text-xs ${darkClasses.textMuted}`}>{event.organizerFaculty}</p>
                  </div>
                </div>
              </Card>

              {/* Requirements */}
              {requirements && (
                <Card className={`p-3 ${
                  isDarkMode 
                    ? "bg-orange-900/30 border-orange-700" 
                    : "bg-orange-50 border-orange-100"
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                      isDarkMode ? "text-orange-400" : "text-orange-600"
                    }`} />
                    <div>
                      <p className={`text-xs mb-1 ${darkClasses.textMuted}`}>{t.requirements}</p>
                      <p className={`text-sm ${darkClasses.textPrimary}`}>{requirements}</p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Reward */}
              <Card className={`p-4 ${
                isDarkMode 
                  ? "bg-gradient-to-r from-yellow-900/40 to-amber-900/40 border-yellow-700" 
                  : "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-xs ${darkClasses.textMuted}`}>{t.reward}</p>
                    <p className={`text-xl ${isDarkMode ? "text-amber-400" : "text-amber-600"}`}>
                      +{event.coins} Eco Coins
                    </p>
                  </div>
                </div>
              </Card>

              {/* Email Code Confirmation (for pending registrations) */}
              {registration?.status === "pending" && (
                <Card className={`p-4 ${
                  isDarkMode 
                    ? "bg-blue-900/40 border-blue-700" 
                    : "bg-blue-50 border-blue-200"
                }`}>
                  <h3 className={`mb-2 flex items-center gap-2 ${darkClasses.textPrimary}`}>
                    <Mail className={`w-5 h-5 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                    {t.confirmRegistration}
                  </h3>
                  <p className={`text-sm mb-3 ${darkClasses.textMuted}`}>
                    {t.emailCodeDesc}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={emailCode}
                      onChange={(e) => setEmailCode(e.target.value)}
                      placeholder={t.enterCode}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:ring-blue-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                    <Button
                      onClick={handleConfirmRegistration}
                      className={isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"}
                    >
                      {t.submit}
                    </Button>
                  </div>
                  <p className={`text-xs mt-2 ${darkClasses.textMuted}`}>
                    {t.demoCode}: EMAIL2024
                  </p>
                </Card>
              )}

              {/* Supervisor Confirmation (for confirmed registrations) */}
              {registration?.status === "confirmed" && !registration.coinsAwarded && (
                <Card className={`p-4 ${
                  isDarkMode 
                    ? "bg-green-900/40 border-green-700" 
                    : "bg-green-50 border-green-200"
                }`}>
                  <h3 className={`mb-2 flex items-center gap-2 ${darkClasses.textPrimary}`}>
                    <CheckCircle className={`w-5 h-5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
                    {t.confirmParticipation}
                  </h3>
                  <p className={`text-sm mb-3 ${darkClasses.textMuted}`}>
                    {t.supervisorCodeDesc}
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={supervisorCode}
                      onChange={(e) => setSupervisorCode(e.target.value)}
                      placeholder={t.enterCode}
                      className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:ring-green-500"
                          : "border-gray-300 focus:ring-green-500"
                      }`}
                    />
                    <Button
                      onClick={handleConfirmParticipation}
                      className={isDarkMode ? "bg-green-600 hover:bg-green-700" : "bg-green-600 hover:bg-green-700"}
                    >
                      {t.submit}
                    </Button>
                  </div>
                  <p className={`text-xs mt-2 ${darkClasses.textMuted}`}>
                    {t.demoCode}: SUP2024
                  </p>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {!isRegistered ? (
                  <Button
                    onClick={handleRegister}
                    disabled={isFull}
                    className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFull ? t.full : t.register}
                  </Button>
                ) : registration.status === "pending" || registration.status === "confirmed" ? (
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full py-6 rounded-xl"
                  >
                    {t.cancel}
                  </Button>
                ) : registration.status === "completed" ? (
                  <div className="text-center py-4">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                    <p className="text-green-600">{t.coinsAwarded}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}