import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { MapPin, Camera, Image, Bell, Check, Shield, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../../utils/LanguageContext";

interface PermissionsScreenProps {
  onContinue: () => void;
  onBack?: () => void;
}

export function PermissionsScreen({ onContinue, onBack }: PermissionsScreenProps) {
  const { language } = useLanguage();
  const [permissions, setPermissions] = useState({
    gps: false,
    camera: false,
    gallery: false,
    notifications: false,
  });

  const texts = {
    de: {
      title: "Berechtigungen erteilen",
      subtitle: "Um alle Funktionen nutzen zu können",
      gps: "GPS-Standort",
      gpsDesc: "Für Fahrrad-Tracking und Event-Check-ins",
      camera: "Kamera",
      cameraDesc: "Zum Scannen von QR-Codes und Recycling-Bons",
      gallery: "Galerie",
      galleryDesc: "Zum Hochladen von Nachweisfotos",
      notifications: "Push-Benachrichtigungen",
      notificationsDesc: "Für Event-Erinnerungen und Challenges",
      grant: "Berechtigung erteilen",
      granted: "Erteilt",
      continue: "Weiter",
      skip: "Später erteilen",
      footer: "Du kannst diese Berechtigungen jederzeit in den Einstellungen ändern"
    },
    en: {
      title: "Grant Permissions",
      subtitle: "To use all features",
      gps: "GPS Location",
      gpsDesc: "For bike tracking and event check-ins",
      camera: "Camera",
      cameraDesc: "To scan QR codes and recycling receipts",
      gallery: "Gallery",
      galleryDesc: "To upload proof photos",
      notifications: "Push Notifications",
      notificationsDesc: "For event reminders and challenges",
      grant: "Grant Permission",
      granted: "Granted",
      continue: "Continue",
      skip: "Grant Later",
      footer: "You can change these permissions anytime in settings"
    }
  };

  const t = texts[language];

  const permissionsList = [
    {
      key: "gps" as const,
      icon: MapPin,
      title: t.gps,
      description: t.gpsDesc,
      color: "from-blue-500 to-blue-600",
    },
    {
      key: "camera" as const,
      icon: Camera,
      title: t.camera,
      description: t.cameraDesc,
      color: "from-purple-500 to-purple-600",
    },
    {
      key: "gallery" as const,
      icon: Image,
      title: t.gallery,
      description: t.galleryDesc,
      color: "from-pink-500 to-pink-600",
    },
    {
      key: "notifications" as const,
      icon: Bell,
      title: t.notifications,
      description: t.notificationsDesc,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const handleGrantPermission = (key: keyof typeof permissions) => {
    // In real app: request actual permission from device
    setPermissions((prev) => ({ ...prev, [key]: true }));
  };

  const allGranted = Object.values(permissions).every((p) => p);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-700 flex items-center justify-center p-6">
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
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl text-white mb-2">
            {t.title}
          </h2>
          <p className="text-white/80">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="space-y-3 mb-6">
          {permissionsList.map((permission, index) => {
            const Icon = permission.icon;
            const isGranted = permissions[permission.key];

            return (
              <motion.div
                key={permission.key}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className={`p-4 ${isGranted ? "bg-white border-2 border-emerald-500" : "bg-white/95"}`}>
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${permission.color} rounded-xl p-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">
                        {permission.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {permission.description}
                      </p>
                      {!isGranted ? (
                        <Button
                          onClick={() => handleGrantPermission(permission.key)}
                          size="sm"
                          className={`bg-gradient-to-r ${permission.color} hover:opacity-90 text-white rounded-full`}
                        >
                          {t.grant}
                        </Button>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2 text-emerald-600"
                        >
                          <Check className="w-5 h-5" />
                          <span className="text-sm">{t.granted}</span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Button
            onClick={onContinue}
            disabled={!allGranted}
            className="w-full bg-white text-purple-600 hover:bg-white/90 disabled:bg-white/50 disabled:text-gray-400 rounded-full py-6 text-lg shadow-xl"
          >
            {t.continue}
          </Button>
          
          {!allGranted && (
            <button
              onClick={onContinue}
              className="w-full text-white/80 hover:text-white text-sm py-2"
            >
              {t.skip}
            </button>
          )}

          {onBack && (
            <Button
              onClick={onBack}
              className="w-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm rounded-full py-6 text-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {language === "de" ? "Zurück" : "Back"}
            </Button>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-white/60 text-xs">
            {t.footer}
          </p>
        </motion.div>
      </div>
    </div>
  );
}