import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Leaf, Bike, Recycle, Coffee, Brain, MapPin } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ActionDetailModal, type Action } from "./ActionDetailModal";
import { QuizModal } from "./QuizModal";
import { updateChallengeProgress, type Challenge } from "../utils/challengeManager";
import { addPointsTransaction } from "./PointsHistoryModal";
import { PointsAnimation } from "./PointsAnimation";

interface ActiveAction {
  id: number;
  startTime: number;
}

export function ActionsPage() {
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [activeAction, setActiveAction] = useState<ActiveAction | null>(null);
  const [currentDuration, setCurrentDuration] = useState<string>("0:00");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const actions: Action[] = [
    {
      id: 1,
      title: "Fahrrad-Tracking",
      description: "Starte deine Fahrradfahrt und sammle Punkte",
      icon: Bike,
      color: "from-blue-500 to-blue-600",
      coins: "+10-30 Coins",
      details:
        "Fahre mit dem Fahrrad zur Hochschule und verdiene Eco Coins! Je länger deine Fahrt, desto mehr Punkte bekommst du. Scanne den QR-Code am Campus, um deine Fahrt zu starten und zu beenden.",
      instructions: [
        "Tippe auf 'Aktion starten' bevor du losfährst",
        "Scanne den QR-Code am Startpunkt auf dem Campus",
        "Fahre mit dem Fahrrad",
        "Scanne den QR-Code am Zielpunkt",
        "Erhalte deine Eco Coins basierend auf der Distanz",
      ],
    },
    {
      id: 2,
      title: "Recycling Scanner",
      description: "Scanne deinen Pfandbon und erhalte Punkte",
      icon: Recycle,
      color: "from-green-500 to-green-600",
      coins: "+15 Coins",
      details:
        "Bringe deine Pfandflaschen zum Automaten und scanne den Bon mit der App. Jeder Recycling-Vorgang wird belohnt und hilft der Umwelt!",
      instructions: [
        "Sammle deine Pfandflaschen",
        "Gehe zum Pfandautomaten",
        "Tippe auf 'Aktion starten'",
        "Mache ein Foto von deinem Pfandbon",
        "Die App erkennt automatisch den Betrag und belohnt dich",
      ],
    },
    {
      id: 3,
      title: "Mehrweg-Becher",
      description: "QR-Code scannen und Mehrweg nutzen",
      icon: Coffee,
      color: "from-amber-500 to-amber-600",
      coins: "+5 Coins",
      details:
        "Nutze einen Mehrwegbecher in der Mensa oder Cafeteria statt Einwegbecher. Jede Nutzung zählt und reduziert Plastikmüll!",
      instructions: [
        "Hole dir einen Mehrwegbecher in der Mensa/Cafeteria",
        "Tippe auf 'Aktion starten'",
        "Zeige den QR-Code dem Personal",
        "Personal scannt den Code zur Bestätigung",
        "Erhalte sofort 5 Eco Coins",
      ],
    },
    {
      id: 4,
      title: "Nachhaltigkeits-Quiz",
      description: "Teste dein Wissen und lerne Neues",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      coins: "+20 Coins",
      details:
        "Beantworte Fragen rund um Nachhaltigkeit, Umweltschutz und Klimawandel. Lerne dabei Neues und sammle Punkte!",
      instructions: [
        "Tippe auf 'Aktion starten'",
        "Beantworte 10 Multiple-Choice-Fragen",
        "Lerne aus den Erklärungen nach jeder Frage",
        "Erreiche mindestens 70% richtige Antworten",
        "Erhalte 20 Eco Coins bei bestandenem Quiz",
      ],
    },
    {
      id: 5,
      title: "Campus Events",
      description: "Besuche Nachhaltigkeits-Events",
      icon: MapPin,
      color: "from-pink-500 to-pink-600",
      coins: "+50 Coins",
      details:
        "Nimm an Nachhaltigkeits-Events, Workshops und Aktionen auf dem Campus teil. Vernetze dich mit anderen und lerne praktische Tipps!",
      instructions: [
        "Schaue dir die aktuellen Events an",
        "Melde dich für ein Event an",
        "Gehe zum Event-Ort",
        "Zeige deinen QR-Code dem Event-Supervisor",
        "Erhalte nach dem Event 50 Eco Coins gutgeschrieben",
      ],
    },
  ];

  // Timer effect for active action
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeAction) {
      interval = setInterval(() => {
        const elapsed = Date.now() - activeAction.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        setCurrentDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeAction]);

  const handleActionClick = (action: Action) => {
    setSelectedAction(action);
  };

  const handleStart = () => {
    if (selectedAction) {
      // If it's the quiz action, open quiz modal instead
      if (selectedAction.id === 4) {
        setShowQuizModal(true);
        setSelectedAction(null);
        return;
      }
      
      setActiveAction({
        id: selectedAction.id,
        startTime: Date.now(),
      });
    }
  };

  const handleQuizComplete = (score: number, coinsEarned: number) => {
    // Quiz completion is handled in QuizModal
    setShowQuizModal(false);
  };

  const handleStop = () => {
    if (!activeAction || !selectedAction) return;

    // Calculate duration in seconds
    const durationSeconds = Math.floor((Date.now() - activeAction.startTime) / 1000);
    
    // Map action ID to challenge action type
    const actionTypeMap: Record<number, Challenge["actionType"]> = {
      1: "cycling",      // Fahrrad-Tracking
      2: "recycling",    // Recycling Scanner
      3: "reusable-cup", // Mehrweg-Becher
      4: "quiz",         // Quiz
      5: "event",        // Events
    };

    const challengeActionType = actionTypeMap[selectedAction.id];
    
    // Calculate coins (simplified - in real app would be based on performance)
    let coinsEarned = 15; // Default
    if (selectedAction.id === 1) {
      // Cycling: 10-30 coins based on duration
      coinsEarned = Math.min(30, Math.max(10, Math.floor(durationSeconds / 60) * 2));
    } else if (selectedAction.id === 2) {
      coinsEarned = 15; // Recycling
    } else if (selectedAction.id === 3) {
      coinsEarned = 5; // Reusable cup
    } else if (selectedAction.id === 4) {
      coinsEarned = 20; // Quiz
    } else if (selectedAction.id === 5) {
      coinsEarned = 50; // Event
    }

    // Update eco coins
    const currentCoins = parseInt(localStorage.getItem("ecoCoins") || "0");
    localStorage.setItem("ecoCoins", (currentCoins + coinsEarned).toString());

    // Add to points history
    addPointsTransaction({
      type: "earned",
      amount: coinsEarned,
      action: selectedAction.title,
      category: challengeActionType as any,
      description: `Aktion abgeschlossen nach ${Math.floor(durationSeconds / 60)}:${(durationSeconds % 60).toString().padStart(2, "0")} Min.`,
    });

    // Update challenge progress
    if (challengeActionType) {
      updateChallengeProgress(challengeActionType, {
        id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        duration: durationSeconds,
        distance: selectedAction.id === 1 ? (durationSeconds / 60) * 0.25 : undefined, // Rough estimate: 15 km/h
        amount: selectedAction.id === 2 ? Math.floor(Math.random() * 5) + 1 : undefined, // Random bottles for recycling
        score: selectedAction.id === 4 ? Math.floor(Math.random() * 30) + 70 : undefined, // Random quiz score 70-100%
        location: selectedAction.id === 5 ? "Campus Hauptgebäude" : undefined,
      });
    }

    // Show points animation
    setEarnedPoints(coinsEarned);
    setTimeout(() => {
      setShowPointsAnimation(true);
    }, 300);

    setActiveAction(null);
    setCurrentDuration("0:00");
    setSelectedAction(null);
  };

  const handleCancel = () => {
    // In real app: save to history as cancelled
    setActiveAction(null);
    setCurrentDuration("0:00");
  };

  return (
    <>
      <PointsAnimation 
        show={showPointsAnimation} 
        points={earnedPoints}
        onComplete={() => setShowPointsAnimation(false)}
      />
      
      <div className="min-h-screen">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="w-8 h-8" />
            <h1 className="text-2xl">Nachhaltigkeits-Aktionen</h1>
          </div>
          <p className="text-emerald-100 text-sm">
            Wähle eine Aktion und sammle Eco Coins!
          </p>
        </motion.div>

        <div className="p-4 space-y-4">
          {/* Info Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
              <p className="text-sm text-emerald-800 text-center">
                💡 Jede Aktion hilft der Umwelt und bringt dir Punkte!
              </p>
            </Card>
          </motion.div>

          {/* Action Cards */}
          <div className="space-y-3">
            {actions.map((action, index) => {
              const Icon = action.icon;
              const isActive = activeAction?.id === action.id;

              return (
                <motion.div
                  key={action.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    onClick={() => handleActionClick(action)}
                    className={`p-5 bg-gradient-to-br ${action.color} text-white border-0 shadow-lg cursor-pointer hover:shadow-xl transition-all relative overflow-hidden`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-3 right-3"
                      >
                        <Badge className="bg-white/30 backdrop-blur-sm text-white border-white/40">
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            ● Aktiv
                          </motion.span>
                        </Badge>
                      </motion.div>
                    )}

                    <div className="flex items-center gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg mb-1">{action.title}</h3>
                        <p className="text-sm text-white/90 mb-2">
                          {action.description}
                        </p>
                        <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm">{action.coins}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress indicator for active action */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 pt-3 border-t border-white/20"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span>Laufzeit: {currentDuration}</span>
                          <span>Tippe für Details</span>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Tips Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="p-4 bg-white border-emerald-100">
              <h3 className="text-gray-900 mb-3">💚 Tipps fr mehr Punkte</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>Kombiniere mehrere Aktionen pro Tag</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>Schließe Challenges ab für Bonus-Punkte</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600">•</span>
                  <span>Besuche tägliche Events für Extra-Belohnungen</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="p-4 bg-white border-emerald-100">
              <h3 className="text-gray-900 mb-3">📊 Heute</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <p className="text-2xl text-emerald-600 mb-1">8</p>
                  <p className="text-xs text-gray-600">Aktionen</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl text-blue-600 mb-1">156</p>
                  <p className="text-xs text-gray-600">Coins verdient</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Action Detail Modal */}
        <ActionDetailModal
          action={selectedAction}
          isOpen={!!selectedAction}
          onClose={() => setSelectedAction(null)}
          activeAction={activeAction}
          onStart={handleStart}
          onStop={handleStop}
          onCancel={handleCancel}
          currentDuration={currentDuration}
        />

        {/* Quiz Modal */}
        <QuizModal
          isOpen={showQuizModal}
          onClose={() => setShowQuizModal(false)}
          onComplete={handleQuizComplete}
        />
      </div>
    </>
  );
}