// Challenge-Management-System

export interface Challenge {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  actionType: "cycling" | "recycling" | "reusable-cup" | "quiz" | "event" | "book-exchange" | "event-participation";
  targetCount: number;
  currentCount: number;
  reward: number;
  deadline: string;
  difficulty: "Leicht" | "Mittel" | "Schwer";
  difficultyEn: "Easy" | "Medium" | "Hard";
  icon: string;
  status: "inactive" | "active" | "completed";
  startedAt?: number;
  completedAt?: number;
  completedActions: CompletedActionDetail[];
}

export interface CompletedActionDetail {
  id: string;
  timestamp: number;
  duration?: number; // in seconds, for cycling
  distance?: number; // in km, for cycling
  amount?: number; // for recycling bottles
  score?: number; // for quiz
  location?: string; // for events
}

// Initialize default challenges
export function initializeChallenges(): Challenge[] {
  const storedChallenges = localStorage.getItem("challenges");
  
  if (storedChallenges) {
    const parsed = JSON.parse(storedChallenges);
    // Migration: Remove old "Energie-Sparer" challenge if it exists
    const filtered = parsed.filter((c: Challenge) => 
      c.id !== "challenge_stairs" && 
      c.id !== "challenge_energy_saver" &&
      c.actionType !== "stairs"
    );
    // Migration: Add English translations if missing
    const migrated = migrateChallengesToEnglish(filtered);
    localStorage.setItem("challenges", JSON.stringify(migrated));
    return migrated;
  }

  const defaultChallenges: Challenge[] = [
    {
      id: "challenge_cycling_week",
      title: "Fahrrad-Woche",
      titleEn: "Bike Week",
      description: "Fahre 5 mal mit dem Fahrrad zur Hochschule",
      descriptionEn: "Bike to university 5 times",
      actionType: "cycling",
      targetCount: 5,
      currentCount: 0,
      reward: 50,
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      difficulty: "Mittel",
      difficultyEn: "Medium",
      icon: "🚴",
      status: "inactive",
      completedActions: [],
    },
    {
      id: "challenge_recycling_master",
      title: "Recycling-Meister",
      titleEn: "Recycling Master",
      description: "Recycle 10 Pfandflaschen",
      descriptionEn: "Recycle 10 deposit bottles",
      actionType: "recycling",
      targetCount: 10,
      currentCount: 0,
      reward: 30,
      deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      difficulty: "Leicht",
      difficultyEn: "Easy",
      icon: "♻️",
      status: "inactive",
      completedActions: [],
    },
    {
      id: "challenge_reusable_champion",
      title: "Mehrweg-Champion",
      titleEn: "Reusable Champion",
      description: "Nutze 15 mal einen Mehrwegbecher",
      descriptionEn: "Use reusable cup 15 times",
      actionType: "reusable-cup",
      targetCount: 15,
      currentCount: 0,
      reward: 75,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      difficulty: "Schwer",
      difficultyEn: "Hard",
      icon: "🥤",
      status: "inactive",
      completedActions: [],
    },
    {
      id: "challenge_book_exchange",
      title: "Büchertausch",
      titleEn: "Book Exchange",
      description: "Tausche oder gebe 1 Buch an den Bücherregalen in der Bibliothek ab",
      descriptionEn: "Exchange or donate 1 book at the library book shelves",
      actionType: "book-exchange",
      targetCount: 1,
      currentCount: 0,
      reward: 50,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      difficulty: "Leicht",
      difficultyEn: "Easy",
      icon: "📚",
      status: "inactive",
      completedActions: [],
    },
    {
      id: "challenge_event_explorer",
      title: "Event-Explorer",
      titleEn: "Event Explorer",
      description: "Nimm an 3 Nachhaltigkeits-Events teil",
      descriptionEn: "Participate in 3 sustainability events",
      actionType: "event-participation",
      targetCount: 3,
      currentCount: 0,
      reward: 100,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      difficulty: "Mittel",
      difficultyEn: "Medium",
      icon: "🎯",
      status: "inactive",
      completedActions: [],
    },
  ];

  localStorage.setItem("challenges", JSON.stringify(defaultChallenges));
  return defaultChallenges;
}

// Migration function to add English translations to existing challenges
function migrateChallengesToEnglish(challenges: any[]): Challenge[] {
  const translations: Record<string, { titleEn: string; descriptionEn: string; difficultyEn: string }> = {
    "challenge_cycling_week": {
      titleEn: "Bike Week",
      descriptionEn: "Bike to university 5 times",
      difficultyEn: "Medium",
    },
    "challenge_recycling_master": {
      titleEn: "Recycling Master",
      descriptionEn: "Recycle 10 deposit bottles",
      difficultyEn: "Easy",
    },
    "challenge_reusable_champion": {
      titleEn: "Reusable Champion",
      descriptionEn: "Use reusable cup 15 times",
      difficultyEn: "Hard",
    },
    "challenge_book_exchange": {
      titleEn: "Book Exchange",
      descriptionEn: "Exchange or donate 1 book at the library book shelves",
      difficultyEn: "Easy",
    },
  };

  return challenges.map((challenge) => {
    // If English fields are missing, add them
    if (!challenge.titleEn || !challenge.descriptionEn || !challenge.difficultyEn) {
      const translation = translations[challenge.id];
      if (translation) {
        return {
          ...challenge,
          titleEn: challenge.titleEn || translation.titleEn,
          descriptionEn: challenge.descriptionEn || translation.descriptionEn,
          difficultyEn: challenge.difficultyEn || translation.difficultyEn,
        };
      }
    }
    return challenge;
  });
}

// Get all challenges
export function getChallenges(): Challenge[] {
  const challenges = localStorage.getItem("challenges");
  if (challenges) {
    const parsed = JSON.parse(challenges);
    // Migration: Remove old "Energie-Sparer" challenge if it exists
    const filtered = parsed.filter((c: Challenge) => 
      c.id !== "challenge_stairs" && 
      c.id !== "challenge_energy_saver" &&
      c.actionType !== "stairs"
    );
    // Always run migration to ensure English translations are present
    const migrated = migrateChallengesToEnglish(filtered);
    localStorage.setItem("challenges", JSON.stringify(migrated));
    return migrated;
  }
  return initializeChallenges();
}

// Start a challenge
export function startChallenge(challengeId: string): void {
  const challenges = getChallenges();
  const challenge = challenges.find((c) => c.id === challengeId);
  
  if (challenge && challenge.status === "inactive") {
    challenge.status = "active";
    challenge.startedAt = Date.now();
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }
}

// Cancel a challenge
export function cancelChallenge(challengeId: string): void {
  const challenges = getChallenges();
  const challenge = challenges.find((c) => c.id === challengeId);
  
  if (challenge && challenge.status === "active") {
    challenge.status = "inactive";
    challenge.startedAt = undefined;
    challenge.currentCount = 0;
    challenge.completedActions = [];
    localStorage.setItem("challenges", JSON.stringify(challenges));
  }
}

// Update challenge progress
export function updateChallengeProgress(
  actionType: Challenge["actionType"],
  actionDetail: CompletedActionDetail
): void {
  const challenges = getChallenges();
  
  // Find all active challenges that match this action type
  const relevantChallenges = challenges.filter(
    (c) => c.actionType === actionType && c.status === "active"
  );

  relevantChallenges.forEach((challenge) => {
    // Add the action to completed actions
    challenge.completedActions.push(actionDetail);
    challenge.currentCount = challenge.completedActions.length;

    // Check if challenge is completed
    if (challenge.currentCount >= challenge.targetCount) {
      challenge.status = "completed";
      challenge.completedAt = Date.now();
      
      // Award coins
      const currentCoins = parseInt(localStorage.getItem("ecoCoins") || "0");
      localStorage.setItem("ecoCoins", (currentCoins + challenge.reward).toString());
      
      // Add to points history
      const history = localStorage.getItem("pointsHistory");
      const transactions = history ? JSON.parse(history) : [];
      transactions.push({
        id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: "earned",
        amount: challenge.reward,
        action: `Challenge abgeschlossen: ${challenge.title}`,
        category: "challenge",
        description: challenge.description,
        timestamp: Date.now(),
      });
      localStorage.setItem("pointsHistory", JSON.stringify(transactions));
    }
  });

  localStorage.setItem("challenges", JSON.stringify(challenges));
}

// Get active challenges
export function getActiveChallenges(): Challenge[] {
  return getChallenges().filter((c) => c.status === "active");
}

// Get challenge by ID
export function getChallengeById(challengeId: string): Challenge | undefined {
  return getChallenges().find((c) => c.id === challengeId);
}

// Calculate time remaining
export function getTimeRemaining(deadline: string, language: "de" | "en" = "de"): string {
  const now = Date.now();
  const end = new Date(deadline).getTime();
  const diff = end - now;

  if (diff <= 0) return language === "de" ? "Abgelaufen" : "Expired";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return language === "de"
      ? `${days} Tag${days > 1 ? "e" : ""}`
      : `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return language === "de"
      ? `${hours} Stunde${hours > 1 ? "n" : ""}`
      : `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    return language === "de" ? "< 1 Stunde" : "< 1 hour";
  }
}
