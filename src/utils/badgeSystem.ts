import type { Activity } from "./ActivityContext";

export interface Badge {
  id: number;
  name: string;
  nameEn: string;
  icon: string;
  earned: boolean;
  description: string;
  descriptionEn: string;
  requirement: string;
  requirementEn: string;
  progress: number;
  total: number;
  category: "challenge" | "bike" | "recycle" | "reusable" | "quiz" | "event" | "coins" | "general";
}

// Calculate badge progress based on activities
export function calculateBadges(activities: Activity[], totalCoins: number): Badge[] {
  // Count activities by type
  const challengeCount = activities.filter((a) => a.type === "challenge").length;
  const bikeActivities = activities.filter((a) => a.type === "bike");
  const recycleActivities = activities.filter((a) => a.type === "recycle");
  const reusableActivities = activities.filter((a) => a.type === "reusable");
  const quizActivities = activities.filter((a) => a.type === "quiz");
  const eventActivities = activities.filter((a) => a.type === "event");

  // Calculate bike distance (assuming format "Fahrrad-Fahrt: X.X km" or "Bike ride: X.X km")
  const totalBikeKm = bikeActivities.reduce((sum, activity) => {
    const match = activity.action.match(/(\d+\.?\d*)\s*km/) || activity.actionEn.match(/(\d+\.?\d*)\s*km/);
    if (match) {
      return sum + parseFloat(match[1]);
    }
    return sum;
  }, 0);

  // Calculate quiz questions (assuming 10 questions per quiz, or use coins/2 as approximation)
  const totalQuizQuestions = quizActivities.length * 10;

  return [
    {
      id: 1,
      name: "Eco-Starter",
      nameEn: "Eco-Starter",
      icon: "🌱",
      earned: challengeCount >= 1,
      description: "Erste Challenge abgeschlossen",
      descriptionEn: "Complete first challenge",
      requirement: "1 Challenge abschließen",
      requirementEn: "Complete 1 challenge",
      progress: challengeCount,
      total: 1,
      category: "challenge",
    },
    {
      id: 2,
      name: "Fahrrad-Fan",
      nameEn: "Bike Enthusiast",
      icon: "🚴",
      earned: totalBikeKm >= 100,
      description: "Regelmäßig mit dem Fahrrad unterwegs",
      descriptionEn: "Regular bike commuter",
      requirement: "100 km mit dem Fahrrad fahren",
      requirementEn: "Bike 100 km",
      progress: Math.round(totalBikeKm),
      total: 100,
      category: "bike",
    },
    {
      id: 3,
      name: "Recycling-Pro",
      nameEn: "Recycling Pro",
      icon: "♻️",
      earned: recycleActivities.length >= 50,
      description: "Recycling-Meister",
      descriptionEn: "Recycling master",
      requirement: "50 Pfandbons scannen",
      requirementEn: "Scan 50 deposit slips",
      progress: recycleActivities.length,
      total: 50,
      category: "recycle",
    },
    {
      id: 4,
      name: "Mehrweg-Meister",
      nameEn: "Reusable Master",
      icon: "🥤",
      earned: reusableActivities.length >= 100,
      description: "Mehrweg statt Einweg",
      descriptionEn: "Reusable over disposable",
      requirement: "100x Mehrwegbecher nutzen",
      requirementEn: "Use reusable cup 100 times",
      progress: reusableActivities.length,
      total: 100,
      category: "reusable",
    },
    {
      id: 5,
      name: "Quiz-Champion",
      nameEn: "Quiz Champion",
      icon: "🧠",
      earned: totalQuizQuestions >= 200,
      description: "Nachhaltigkeits-Experte",
      descriptionEn: "Sustainability expert",
      requirement: "200 Quiz-Fragen richtig beantworten",
      requirementEn: "Answer 200 quiz questions correctly",
      progress: totalQuizQuestions,
      total: 200,
      category: "quiz",
    },
    {
      id: 6,
      name: "Eco-Legend",
      nameEn: "Eco Legend",
      icon: "👑",
      earned: totalCoins >= 1000,
      description: "Nachhaltigkeits-Legende",
      descriptionEn: "Sustainability legend",
      requirement: "1.000 Eco Coins sammeln",
      requirementEn: "Collect 1,000 Eco Coins",
      progress: totalCoins,
      total: 1000,
      category: "coins",
    },
    {
      id: 7,
      name: "Kilometer-König",
      nameEn: "Kilometer King",
      icon: "🏆",
      earned: totalBikeKm >= 500,
      description: "Langstrecken-Radler",
      descriptionEn: "Long-distance cyclist",
      requirement: "500 km mit dem Fahrrad fahren",
      requirementEn: "Bike 500 km",
      progress: Math.round(totalBikeKm),
      total: 500,
      category: "bike",
    },
    {
      id: 8,
      name: "Event-Besucher",
      nameEn: "Event Visitor",
      icon: "🎉",
      earned: eventActivities.length >= 10,
      description: "Aktiv in der Community",
      descriptionEn: "Active in community",
      requirement: "10 Nachhaltigkeits-Events besuchen",
      requirementEn: "Attend 10 sustainability events",
      progress: eventActivities.length,
      total: 10,
      category: "event",
    },
    {
      id: 9,
      name: "Challenge-Held",
      nameEn: "Challenge Hero",
      icon: "⭐",
      earned: challengeCount >= 10,
      description: "10 Challenges gemeistert",
      descriptionEn: "Mastered 10 challenges",
      requirement: "10 Challenges abschließen",
      requirementEn: "Complete 10 challenges",
      progress: challengeCount,
      total: 10,
      category: "challenge",
    },
    {
      id: 10,
      name: "Erste Schritte",
      nameEn: "First Steps",
      icon: "👣",
      earned: activities.length >= 1,
      description: "Erste Aktivität durchgeführt",
      descriptionEn: "Completed first activity",
      requirement: "Erste Aktivität abschließen",
      requirementEn: "Complete first activity",
      progress: Math.min(activities.length, 1),
      total: 1,
      category: "general",
    },
    {
      id: 11,
      name: "Woche der Nachhaltigkeit",
      nameEn: "Sustainability Week",
      icon: "📅",
      earned: getActivitiesLast7Days(activities) >= 7,
      description: "7 Tage in Folge aktiv",
      descriptionEn: "Active for 7 days in a row",
      requirement: "7 Tage nacheinander eine Aktivität",
      requirementEn: "Activity for 7 consecutive days",
      progress: getActivitiesLast7Days(activities),
      total: 7,
      category: "general",
    },
    {
      id: 12,
      name: "Sparsam unterwegs",
      nameEn: "Eco Commuter",
      icon: "🌍",
      earned: bikeActivities.length >= 50,
      description: "50 Mal mit dem Fahrrad gefahren",
      descriptionEn: "Biked 50 times",
      requirement: "50 Fahrrad-Fahrten",
      requirementEn: "50 bike rides",
      progress: bikeActivities.length,
      total: 50,
      category: "bike",
    },
  ];
}

// Helper function to count activities in last 7 days
function getActivitiesLast7Days(activities: Activity[]): number {
  const cutoffTime = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return activities.filter((activity) => activity.timestamp >= cutoffTime).length;
}

// Get level based on total coins
export function getLevel(totalCoins: number): { level: number; title: string; titleEn: string } {
  if (totalCoins >= 5000) return { level: 10, title: "Eco-Legende", titleEn: "Eco Legend" };
  if (totalCoins >= 3000) return { level: 9, title: "Nachhaltigkeits-Meister", titleEn: "Sustainability Master" };
  if (totalCoins >= 2000) return { level: 8, title: "Umwelt-Champion", titleEn: "Environmental Champion" };
  if (totalCoins >= 1500) return { level: 7, title: "Eco-Held", titleEn: "Eco Hero" };
  if (totalCoins >= 1000) return { level: 6, title: "Grüner Krieger", titleEn: "Green Warrior" };
  if (totalCoins >= 750) return { level: 5, title: "Eco Warrior", titleEn: "Eco Warrior" };
  if (totalCoins >= 500) return { level: 4, title: "Umwelt-Aktivist", titleEn: "Environmental Activist" };
  if (totalCoins >= 300) return { level: 3, title: "Grüner Anfänger", titleEn: "Green Beginner" };
  if (totalCoins >= 100) return { level: 2, title: "Eco-Starter", titleEn: "Eco Starter" };
  return { level: 1, title: "Neuling", titleEn: "Newcomer" };
}

// Get all level thresholds
export function getLevelThresholds(): Array<{ level: number; coins: number; title: string; titleEn: string }> {
  return [
    { level: 1, coins: 0, title: "Neuling", titleEn: "Newcomer" },
    { level: 2, coins: 100, title: "Eco-Starter", titleEn: "Eco Starter" },
    { level: 3, coins: 300, title: "Grüner Anfänger", titleEn: "Green Beginner" },
    { level: 4, coins: 500, title: "Umwelt-Aktivist", titleEn: "Environmental Activist" },
    { level: 5, coins: 750, title: "Eco Warrior", titleEn: "Eco Warrior" },
    { level: 6, coins: 1000, title: "Grüner Krieger", titleEn: "Green Warrior" },
    { level: 7, coins: 1500, title: "Eco-Held", titleEn: "Eco Hero" },
    { level: 8, coins: 2000, title: "Umwelt-Champion", titleEn: "Environmental Champion" },
    { level: 9, coins: 3000, title: "Nachhaltigkeits-Meister", titleEn: "Sustainability Master" },
    { level: 10, coins: 5000, title: "Eco-Legende", titleEn: "Eco Legend" },
  ];
}

// Get next level info
export function getNextLevel(totalCoins: number): { level: number; coins: number; title: string; titleEn: string } | null {
  const thresholds = getLevelThresholds();
  const nextLevel = thresholds.find(t => t.coins > totalCoins);
  return nextLevel || null;
}