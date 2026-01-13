import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Navigation, QrCode, Play, Square, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses, getGradientHeaderClasses, combineClasses } from "../utils/modalDarkModeClasses";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { QRScannerModal } from "./QRScannerModal";
import { PointsAnimation } from "./PointsAnimation";
import { addPointsTransaction } from "./PointsHistoryModal";
import { updateChallengeProgress } from "../utils/challengeData";
import { useActivities } from "../utils/ActivityContext";

interface BikeTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TrackingRoute = "home-campus" | "campus-home" | null;
type TrackingState = "idle" | "tracking" | "completed";

export function BikeTrackingModal({ isOpen, onClose }: BikeTrackingModalProps) {
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const { addActivity } = useActivities();
  const [route, setRoute] = useState<TrackingRoute>(null);
  const [state, setState] = useState<TrackingState>("idle");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [qrValidated, setQrValidated] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const texts = {
    de: {
      title: "Fahrrad-Tracking",
      subtitle: "Verdiene Coins für deine Fahrten",
      selectRoute: "Route wählen",
      routeHomeCampus: "Von Zuhause zum Campus",
      routeCampusHome: "Vom Campus nach Hause",
      startTracking: "Fahrt starten",
      stopTracking: "Fahrt beenden",
      scanQR: "QR-Code scannen",
      scanCampusQR: "Campus QR-Code scannen",
      tracking: "Tracking läuft...",
      distance: "Distanz",
      duration: "Dauer",
      avgSpeed: "Ø Geschwindigkeit",
      validation: "Validierung",
      validationSuccess: "Fahrt validiert!",
      validationError: "Validierung fehlgeschlagen",
      qrRequired: "Bitte scanne den Campus QR-Code",
      startAtHome: "Start: Zuhause",
      startAtCampus: "Start: Campus",
      endAtHome: "Ziel: Zuhause",
      endAtCampus: "Ziel: Campus",
      coinsEarned: "Coins verdient!",
      newRoute: "Neue Fahrt",
      routeADesc: "Scanne den Campus QR-Code bei der Ankunft",
      routeBDesc: "Scanne den Campus QR-Code vor der Abfahrt",
      cancel: "Abbrechen",
    },
    en: {
      title: "Bike Tracking",
      subtitle: "Earn coins for your rides",
      selectRoute: "Select Route",
      routeHomeCampus: "From Home to Campus",
      routeCampusHome: "From Campus to Home",
      startTracking: "Start Ride",
      stopTracking: "End Ride",
      scanQR: "Scan QR Code",
      scanCampusQR: "Scan Campus QR Code",
      tracking: "Tracking...",
      distance: "Distance",
      duration: "Duration",
      avgSpeed: "Avg Speed",
      validation: "Validation",
      validationSuccess: "Ride validated!",
      validationError: "Validation failed",
      qrRequired: "Please scan the campus QR code",
      startAtHome: "Start: Home",
      startAtCampus: "Start: Campus",
      endAtHome: "Destination: Home",
      endAtCampus: "Destination: Campus",
      coinsEarned: "Coins earned!",
      newRoute: "New Ride",
      routeADesc: "Scan campus QR code on arrival",
      routeBDesc: "Scan campus QR code before departure",
      cancel: "Cancel",
    },
  };

  const t = texts[language];

  // Simulate GPS tracking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (state === "tracking" && startTime) {
      interval = setInterval(() => {
        setDistance(prev => prev + (Math.random() * 0.05 + 0.02)); // Simulate distance increase
        setDuration(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state, startTime]);

  const handleStartTracking = () => {
    if (!route) return;

    // Route B: Scan QR before starting
    if (route === "campus-home") {
      setShowQRScanner(true);
      return;
    }

    // Route A: Start tracking immediately
    setState("tracking");
    setStartTime(new Date());
    toast.success(language === "de" ? "Tracking gestartet!" : "Tracking started!");
  };

  const handleQRScan = (data: string) => {
    setShowQRScanner(false);

    // Validate campus QR code
    if (data === "CAMPUS_HM_2024") {
      setQrValidated(true);
      toast.success(t.validationSuccess);

      // If route B, start tracking after QR scan
      if (route === "campus-home" && state === "idle") {
        setState("tracking");
        setStartTime(new Date());
      }
      // If route A, complete the ride
      else if (route === "home-campus" && state === "tracking") {
        completeRide();
      }
    } else {
      toast.error(t.validationError);
    }
  };

  const handleStopTracking = () => {
    if (route === "home-campus" && !qrValidated) {
      // Route A: Need to scan QR at campus
      setShowQRScanner(true);
      return;
    }

    completeRide();
  };

  const completeRide = () => {
    setState("completed");

    // Calculate coins based on distance (10 coins per km)
    const coinsEarned = Math.max(20, Math.floor(distance * 10));

    // Award coins
    const totalCoins = parseInt(localStorage.getItem("totalCoins") || "0");
    localStorage.setItem("totalCoins", (totalCoins + coinsEarned).toString());

    // Add to history
    addPointsTransaction({
      type: "earn",
      amount: coinsEarned,
      source: language === "de" ? "Fahrrad-Fahrt" : "Bike Ride",
      timestamp: new Date(),
      category: language === "de" ? "Mobilität" : "Mobility",
    });

    // Add to activity history
    addActivity({
      action: `Fahrrad-Fahrt: ${distance.toFixed(1)} km`,
      actionEn: `Bike ride: ${distance.toFixed(1)} km`,
      coins: coinsEarned,
      date: language === "de" ? "Heute" : "Today",
      type: "bike",
    });

    // Update challenge progress
    updateChallengeProgress(1, 1); // Bike challenge

    // Show animation
    setShowPointsAnimation(true);
    setTimeout(() => {
      setShowPointsAnimation(false);
    }, 2000);

    toast.success(`${t.coinsEarned} +${coinsEarned} Eco Coins`);
  };

  const handleNewRide = () => {
    setRoute(null);
    setState("idle");
    setDistance(0);
    setDuration(0);
    setQrValidated(false);
    setStartTime(null);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            className={`fixed inset-x-0 bottom-0 z-50 rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            }`}
            style={{ top: "56px" }}
          >
            {/* Points Animation */}
            {showPointsAnimation && (
              <PointsAnimation 
                points={Math.floor(distance * 10)} 
                onComplete={() => setShowPointsAnimation(false)} 
              />
            )}

            {/* Header */}
            <div className={combineClasses(getGradientHeaderClasses("blue"), "p-6 rounded-t-3xl")}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    🚴
                  </div>
                  <div>
                    <h2 className="text-2xl">{t.title}</h2>
                    <p className="text-blue-100 text-sm">{t.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {state === "idle" && !route && (
                <>
                  {/* Route Selection */}
                  <div>
                    <h3 className="text-gray-900 mb-3">{t.selectRoute}</h3>
                    <div className="space-y-3">
                      {/* Route A: Home -> Campus */}
                      <Card 
                        className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-blue-300"
                        onClick={() => setRoute("home-campus")}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Navigation className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-1">{t.routeHomeCampus}</h4>
                            <p className="text-sm text-gray-600 mb-2">{t.routeADesc}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <Badge className="bg-green-100 text-green-700">
                                {t.startAtHome}
                              </Badge>
                              <span>→</span>
                              <Badge className="bg-blue-100 text-blue-700">
                                {t.endAtCampus}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Route B: Campus -> Home */}
                      <Card 
                        className="p-4 cursor-pointer hover:shadow-md transition-all hover:border-blue-300"
                        onClick={() => setRoute("campus-home")}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Navigation className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-gray-900 mb-1">{t.routeCampusHome}</h4>
                            <p className="text-sm text-gray-600 mb-2">{t.routeBDesc}</p>
                            <div className="flex items-center gap-2 text-xs">
                              <Badge className="bg-blue-100 text-blue-700">
                                {t.startAtCampus}
                              </Badge>
                              <span>→</span>
                              <Badge className="bg-green-100 text-green-700">
                                {t.endAtHome}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </>
              )}

              {route && state === "idle" && (
                <>
                  {/* Ready to Start */}
                  <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="text-gray-900 mb-2">
                        {route === "home-campus" ? t.routeHomeCampus : t.routeCampusHome}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {route === "home-campus" ? t.routeADesc : t.routeBDesc}
                      </p>
                      <Button
                        onClick={handleStartTracking}
                        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-6 rounded-xl"
                      >
                        <Play className="w-5 h-5 mr-2" />
                        {t.startTracking}
                      </Button>
                    </div>
                  </Card>
                </>
              )}

              {state === "tracking" && (
                <>
                  {/* Tracking Active */}
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
                        <Navigation className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-gray-900 mb-1">{t.tracking}</h3>
                      <p className="text-sm text-green-600">
                        {route === "home-campus" ? t.routeHomeCampus : t.routeCampusHome}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">{t.distance}</p>
                        <p className="text-xl text-gray-900">{distance.toFixed(2)}</p>
                        <p className="text-xs text-gray-500">km</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">{t.duration}</p>
                        <p className="text-xl text-gray-900">{formatDuration(duration)}</p>
                        <p className="text-xs text-gray-500">min</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600 mb-1">{t.avgSpeed}</p>
                        <p className="text-xl text-gray-900">
                          {duration > 0 ? ((distance / (duration / 3600)).toFixed(1)) : "0.0"}
                        </p>
                        <p className="text-xs text-gray-500">km/h</p>
                      </div>
                    </div>

                    <Button
                      onClick={handleStopTracking}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-xl"
                    >
                      <Square className="w-5 h-5 mr-2" />
                      {t.stopTracking}
                    </Button>
                  </Card>
                </>
              )}

              {state === "completed" && (
                <>
                  {/* Ride Completed */}
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                    <div className="text-center">
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-3" />
                      <h3 className="text-xl text-gray-900 mb-2">{t.validationSuccess}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {t.coinsEarned} +{Math.floor(distance * 10)} Eco Coins
                      </p>

                      {/* Stats Summary */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">{t.distance}</p>
                          <p className="text-lg text-gray-900">{distance.toFixed(2)} km</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">{t.duration}</p>
                          <p className="text-lg text-gray-900">{formatDuration(duration)}</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-xs text-gray-600 mb-1">{t.avgSpeed}</p>
                          <p className="text-lg text-gray-900">
                            {duration > 0 ? ((distance / (duration / 3600)).toFixed(1)) : "0.0"} km/h
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Button
                          onClick={handleNewRide}
                          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-xl"
                        >
                          {t.newRoute}
                        </Button>
                        <Button
                          onClick={onClose}
                          variant="outline"
                          className="w-full py-4 rounded-xl"
                        >
                          {t.cancel}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </div>
          </motion.div>

          {/* QR Scanner */}
          <QRScannerModal
            isOpen={showQRScanner}
            onClose={() => setShowQRScanner(false)}
            onScan={handleQRScan}
            title={t.scanCampusQR}
            expectedCode="CAMPUS_HM_2024"
          />
        </>
      )}
    </AnimatePresence>
  );
}