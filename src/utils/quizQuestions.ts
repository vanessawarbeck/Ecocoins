export interface QuizAnswer {
  text: string;
  isCorrect: boolean;
  additionalInfo?: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  answers: QuizAnswer[];
}

export const quizQuestions: QuizQuestion[] = [
  // Kategorie 1: Mobilität
  {
    id: 1,
    category: "Mobilität",
    question: "Welches Verkehrsmittel verursacht am wenigsten CO₂?",
    answers: [
      { text: "Auto", isCorrect: false },
      { text: "Fahrrad", isCorrect: true },
      { text: "Bus", isCorrect: false },
    ],
  },
  {
    id: 2,
    category: "Mobilität",
    question: "Welche Strecke spart am meisten CO₂ ein?",
    answers: [
      { text: "1 km Autofahrt ersetzen", isCorrect: true, additionalInfo: "Autofahren hat hohe Emission" },
      { text: "10 km mehr Fahrrad fahren", isCorrect: false },
    ],
  },
  {
    id: 3,
    category: "Mobilität",
    question: "Was verbessert die Verkehrssicherheit beim Radfahren?",
    answers: [
      { text: "Licht & Reflektoren", isCorrect: true },
      { text: "Kopfhörer laut aufdrehen", isCorrect: false },
    ],
  },
  {
    id: 4,
    category: "Mobilität",
    question: "Welches Verkehrsmittel verursacht pro Personenkilometer die geringsten CO₂-Emissionen?",
    answers: [
      { text: "Bus", isCorrect: false },
      { text: "Bahn", isCorrect: false },
      { text: "Fahrrad", isCorrect: true, additionalInfo: "Fahrrad ~0 g CO₂/Pkm" },
      { text: "E-Auto", isCorrect: false },
    ],
  },
  {
    id: 5,
    category: "Mobilität",
    question: "Wie viel CO₂ spart eine Person jährlich durchschnittlich, wenn sie 3 km täglich mit dem Fahrrad statt dem Auto fährt?",
    answers: [
      { text: "~100 kg", isCorrect: false },
      { text: "~250 kg", isCorrect: true },
      { text: "~500 kg CO₂", isCorrect: false },
    ],
  },
  {
    id: 6,
    category: "Mobilität",
    question: "E-Scooter gelten oft als klimafreundlich. Was ist ihr Problem?",
    answers: [
      { text: "Hoher Stromverbrauch", isCorrect: false },
      { text: "Kurze Lebensdauer & Produktion", isCorrect: true },
      { text: "Teure Nutzung", isCorrect: false },
    ],
  },

  // Kategorie 2: Energie, Stromsparwissen & CO₂
  {
    id: 7,
    category: "Energie",
    question: "Welche Lampen sind am effizientesten?",
    answers: [
      { text: "Glühbirnen", isCorrect: false },
      { text: "LED", isCorrect: true },
      { text: "Halogen", isCorrect: false },
    ],
  },
  {
    id: 8,
    category: "Energie",
    question: "Wo entstehen bei Smartphones die meisten Emissionen?",
    answers: [
      { text: "Nutzung", isCorrect: false },
      { text: "Produktion", isCorrect: true, additionalInfo: "~70–80 %" },
      { text: "Recycling", isCorrect: false },
    ],
  },
  {
    id: 9,
    category: "Energie",
    question: "Welche Energieform hatte 2024 den größten Anteil am deutschen Strommix?",
    answers: [
      { text: "Windenergie", isCorrect: true },
      { text: "Kohle", isCorrect: false },
      { text: "Erdgas", isCorrect: false },
    ],
  },
  {
    id: 10,
    category: "Energie",
    question: "Was erzeugt keinen Feinstaub?",
    answers: [
      { text: "Kohlekraftwerk", isCorrect: false },
      { text: "Wärmepumpe", isCorrect: true },
      { text: "Kaminofen", isCorrect: false },
    ],
  },
  {
    id: 11,
    category: "Energie",
    question: "Wie viel des verbrauchten Stroms wird in Deutschland tatsächlich erneuerbar erzeugt?",
    answers: [
      { text: "<30 %", isCorrect: false },
      { text: "~50 %", isCorrect: true, additionalInfo: "2024: ca. 52–55 %" },
      { text: ">70 %", isCorrect: false },
    ],
  },

  // Kategorie 3: Müll, Ressourcenverbrauch & Recycling
  {
    id: 12,
    category: "Recycling",
    question: "Was ist ökologisch am sinnvollsten?",
    answers: [
      { text: "Recyceln", isCorrect: false },
      { text: "Wiederverwenden", isCorrect: true },
      { text: "Verbrennen", isCorrect: false },
    ],
  },
  {
    id: 13,
    category: "Recycling",
    question: "Wie viel Lebensmittel werden in Deutschland pro Person/Jahr weggeworfen?",
    answers: [
      { text: "20 kg", isCorrect: false },
      { text: "40 kg", isCorrect: false },
      { text: ">75 kg", isCorrect: true, additionalInfo: "~78 kg" },
    ],
  },
  {
    id: 14,
    category: "Recycling",
    question: "Welches Material kann nahezu unendlich recycelt werden?",
    answers: [
      { text: "Glas", isCorrect: true },
      { text: "Plastik", isCorrect: false },
      { text: "Verbundstoffe", isCorrect: false },
    ],
  },
  {
    id: 15,
    category: "Recycling",
    question: "Welche Maßnahme spart den meisten Verpackungsmüll ein?",
    answers: [
      { text: "Papier statt Plastik", isCorrect: false },
      { text: "Produkte lose kaufen", isCorrect: true },
    ],
  },

  // Kategorie 4: Ernährung & Klima
  {
    id: 16,
    category: "Ernährung",
    question: "Was hat den größten Wassereinsatz?",
    answers: [
      { text: "1 kg Gemüse", isCorrect: false },
      { text: "1 kg Rindfleisch", isCorrect: true },
    ],
  },
  {
    id: 17,
    category: "Ernährung",
    question: "Was spart am meisten Emissionen?",
    answers: [
      { text: "1× im Monat kein Fleisch", isCorrect: false },
      { text: "1 Woche vegetarisch pro Monat", isCorrect: true },
    ],
  },
  {
    id: 18,
    category: "Ernährung",
    question: "Welche Klimabelastung hat 1 kg Rindfleisch ca.?",
    answers: [
      { text: "3 kg CO₂", isCorrect: false },
      { text: "10 kg CO₂", isCorrect: false },
      { text: ">25 kg CO₂", isCorrect: true, additionalInfo: "~27–40 kg CO₂" },
    ],
  },

  // Kategorie 5: Hochschule München – Campusbezogene Nachhaltigkeit
  {
    id: 19,
    category: "Campus",
    question: "Welcher Bereich der Hochschule München verursacht die meisten Emissionen?",
    answers: [
      { text: "Gebäudeenergie (Heizung/Strom)", isCorrect: true },
      { text: "Mensa", isCorrect: false },
      { text: "IT-Rechenzentren", isCorrect: false },
    ],
  },
  {
    id: 20,
    category: "Campus",
    question: "Was spart am HM-Campus am meisten CO₂?",
    answers: [
      { text: "Müll trennen", isCorrect: false },
      { text: "Fahrrad statt Auto zum Campus", isCorrect: true, additionalInfo: "Sehr hoher Impact pro Person" },
    ],
  },
  {
    id: 21,
    category: "Campus",
    question: "Was kann am Campus kostenlos und nachhaltig genutzt werden?",
    answers: [
      { text: "E-Scooter", isCorrect: false },
      { text: "Wasserstationen für Leitungswasser", isCorrect: true },
    ],
  },
];

// Function to get random questions for a quiz
export function getRandomQuizQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, quizQuestions.length));
}
