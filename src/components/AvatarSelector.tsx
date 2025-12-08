import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useLanguage } from "../utils/LanguageContext";

interface AvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string | null;
  onSelectAvatar: (avatar: string) => void;
  userName: string;
}

export function AvatarSelector({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
  userName,
}: AvatarSelectorProps) {
  const { language } = useLanguage();
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  // Avatar collections
  const avatarStyles = [
    { id: "avataaars", name: "Avataaars", nameEn: "Avataaars" },
    { id: "bottts", name: "Roboter", nameEn: "Robots" },
    { id: "personas", name: "Personas", nameEn: "Personas" },
    { id: "lorelei", name: "Lorelei", nameEn: "Lorelei" },
    { id: "notionists", name: "Notionists", nameEn: "Notionists" },
    { id: "adventurer", name: "Abenteurer", nameEn: "Adventurer" },
    { id: "big-ears", name: "Große Ohren", nameEn: "Big Ears" },
    { id: "fun-emoji", name: "Spaß Emoji", nameEn: "Fun Emoji" },
  ];

  // Generate different seeds for variety
  const seeds = [
    userName,
    `eco-${userName}`,
    `green-${userName}`,
    `nature-${userName}`,
    `sustainable-${userName}`,
    `planet-${userName}`,
    `climate-${userName}`,
    `earth-${userName}`,
  ];

  const avatars = avatarStyles.flatMap((style) =>
    seeds.map((seed, index) => ({
      id: `${style.id}-${index}`,
      url: `https://api.dicebear.com/7.x/${style.id}/svg?seed=${seed}`,
      style: style.id,
      styleName: language === "de" ? style.name : style.nameEn,
    }))
  );

  const handleSelect = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl z-10">
            <div>
              <h2 className="text-xl text-gray-900">
                {language === "de" ? "Wähle dein Profilbild" : "Choose Your Avatar"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {language === "de"
                  ? "Wähle einen Avatar, der zu dir passt"
                  : "Pick an avatar that suits you"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Avatar Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {avatars.map((avatar, index) => (
                <motion.div
                  key={avatar.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Card
                    onClick={() => setSelectedAvatar(avatar.url)}
                    className={`relative p-3 cursor-pointer transition-all ${
                      selectedAvatar === avatar.url
                        ? "ring-4 ring-emerald-500 bg-emerald-50 border-emerald-500"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="aspect-square rounded-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={avatar.url}
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {selectedAvatar === avatar.url && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center"
                        >
                          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Custom Upload Option */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm text-gray-700 mb-3">
                {language === "de" ? "Oder eigenes Bild hochladen" : "Or upload your own"}
              </h3>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const result = reader.result as string;
                        setSelectedAvatar(result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="hidden"
                />
                <Card className="p-4 border-2 border-dashed border-gray-300 hover:border-emerald-500 cursor-pointer transition-colors text-center">
                  <div className="text-4xl mb-2">📸</div>
                  <p className="text-sm text-gray-600">
                    {language === "de"
                      ? "Klicken zum Hochladen"
                      : "Click to upload"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {language === "de" ? "JPG, PNG oder GIF" : "JPG, PNG or GIF"}
                  </p>
                </Card>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl sticky bottom-0">
            <div className="flex gap-3">
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1"
              >
                {language === "de" ? "Abbrechen" : "Cancel"}
              </Button>
              <Button
                onClick={handleSelect}
                disabled={!selectedAvatar}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {language === "de" ? "Auswählen" : "Select"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
