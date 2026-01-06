export type ChallengeStatus = "available" | "active" | "completed";
export type ChallengeType = "bike" | "recycle" | "reusable" | "books" | "quiz" | "general";

export interface ChallengeProgress {
  current: number;
  target: number;
  unit: string;
}

export interface Challenge {
  id: number;
  titleDe: string;
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  type: ChallengeType;
  coins: number;
  status: ChallengeStatus;
  progress: ChallengeProgress;
  duration?: string;
  durationDe?: string;
  durationEn?: string;
  icon: string;
  color: string;
  startedAt?: Date;
  completedAt?: Date;
  statistics?: {
    totalParticipants?: number;
    completionRate?: number;
    averageTime?: string;
  };
}

export const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: 1,
    titleDe: "Fahrrad-Woche",
    titleEn: "Bike Week",
    descriptionDe: "Fahre 5 Mal mit dem Fahrrad zum Campus",
    descriptionEn: "Bike to campus 5 times",
    type: "bike",
    coins: 100,
    status: "available",
    progress: { current: 0, target: 5, unit: "Fahrten" },
    durationDe: "1 Woche",
    durationEn: "1 Week",
    icon: "🚴",
    color: "from-blue-500 to-cyan-500",
    statistics: {
      totalParticipants: 234,
      completionRate: 78,
      averageTime: "4 Tage",
    },
  },
  {
    id: 2,
    titleDe: "Recycling-Champion",
    titleEn: "Recycling Champion",
    descriptionDe: "Scanne 3 Pfandbons",
    descriptionEn: "Scan 3 deposit receipts",
    type: "recycle",
    coins: 75,
    status: "available",
    progress: { current: 0, target: 3, unit: "Bons" },
    durationDe: "2 Wochen",
    durationEn: "2 Weeks",
    icon: "♻️",
    color: "from-green-500 to-emerald-500",
    statistics: {
      totalParticipants: 567,
      completionRate: 92,
      averageTime: "1 Woche",
    },
  },
  {
    id: 3,
    titleDe: "Mehrweg-Meister",
    titleEn: "Reusable Master",
    descriptionDe: "Nutze 10 Mal einen Mehrwegbecher",
    descriptionEn: "Use a reusable cup 10 times",
    type: "reusable",
    coins: 120,
    status: "active",
    progress: { current: 3, target: 10, unit: "Nutzungen" },
    durationDe: "1 Monat",
    durationEn: "1 Month",
    icon: "☕",
    color: "from-amber-500 to-orange-500",
    startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    statistics: {
      totalParticipants: 421,
      completionRate: 65,
      averageTime: "3 Wochen",
    },
  },
  {
    id: 4,
    titleDe: "Büchertausch-Profi",
    titleEn: "Book Exchange Pro",
    descriptionDe: "Tausche 2 Bücher in der Bibliothek",
    descriptionEn: "Exchange 2 books at the library",
    type: "books",
    coins: 80,
    status: "available",
    progress: { current: 0, target: 2, unit: "Bücher" },
    durationDe: "1 Monat",
    durationEn: "1 Month",
    icon: "📚",
    color: "from-purple-500 to-pink-500",
    statistics: {
      totalParticipants: 189,
      completionRate: 88,
      averageTime: "2 Wochen",
    },
  },
  {
    id: 5,
    titleDe: "Nachhaltigkeits-Quiz",
    titleEn: "Sustainability Quiz",
    descriptionDe: "Beantworte alle Quiz-Fragen richtig",
    descriptionEn: "Answer all quiz questions correctly",
    type: "quiz",
    coins: 50,
    status: "available",
    progress: { current: 0, target: 10, unit: "Fragen" },
    durationDe: "Unbegrenzt",
    durationEn: "Unlimited",
    icon: "🧠",
    color: "from-indigo-500 to-blue-500",
    statistics: {
      totalParticipants: 892,
      completionRate: 71,
      averageTime: "15 Minuten",
    },
  },
];

export function getChallenges(): Challenge[] {
  const stored = localStorage.getItem("challenges");
  return stored ? JSON.parse(stored, (key, value) => {
    if (key === 'startedAt' || key === 'completedAt') {
      return value ? new Date(value) : undefined;
    }
    return value;
  }) : SAMPLE_CHALLENGES;
}

export function saveChallenges(challenges: Challenge[]) {
  localStorage.setItem("challenges", JSON.stringify(challenges));
}

export function updateChallengeProgress(challengeId: number, increment: number = 1) {
  const challenges = getChallenges();
  const challenge = challenges.find(c => c.id === challengeId);
  
  if (challenge) {
    challenge.progress.current = Math.min(
      challenge.progress.current + increment,
      challenge.progress.target
    );
    
    // Check if completed
    if (challenge.progress.current >= challenge.progress.target && challenge.status === "active") {
      challenge.status = "completed";
      challenge.completedAt = new Date();
    }
    
    saveChallenges(challenges);
    return challenge;
  }
  
  return null;
}

export function startChallenge(challengeId: number) {
  const challenges = getChallenges();
  const challenge = challenges.find(c => c.id === challengeId);
  
  if (challenge && challenge.status === "available") {
    challenge.status = "active";
    challenge.startedAt = new Date();
    saveChallenges(challenges);
    return challenge;
  }
  
  return null;
}

export function getActiveChallenges(): Challenge[] {
  return getChallenges().filter(c => c.status === "active");
}

export function getAvailableChallenges(): Challenge[] {
  return getChallenges().filter(c => c.status === "available");
}

export function getCompletedChallenges(): Challenge[] {
  return getChallenges().filter(c => c.status === "completed");
}
