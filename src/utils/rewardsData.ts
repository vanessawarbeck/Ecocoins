export interface Reward {
  id: number;
  titleDe: string;
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  categoryDe: string;
  categoryEn: string;
  coins: number;
  icon: string;
  image?: string;
  available: number; // How many are available
  redeemedCount: number; // How many times redeemed by all users
  popular: boolean; // Is it popular among students?
  partner?: string; // Partner organization
  validUntil?: Date;
  termsDE?: string;
  termsEN?: string;
}

export interface RedemptionHistory {
  id: number;
  rewardId: number;
  rewardTitleDe: string;
  rewardTitleEn: string;
  coins: number;
  code: string;
  redeemedAt: Date;
  expiresAt: Date;
  used: boolean;
}

export const REWARDS: Reward[] = [
  {
    id: 1,
    titleDe: "Mensa-Gutschein 5€",
    titleEn: "Cafeteria Voucher 5€",
    descriptionDe: "Einlösbar in allen HM-Mensen",
    descriptionEn: "Redeemable in all HM cafeterias",
    categoryDe: "Gastronomie",
    categoryEn: "Food & Drink",
    coins: 500,
    icon: "🍽️",
    available: 50,
    redeemedCount: 234,
    popular: true,
    partner: "Studentenwerk München",
    termsDE: "Gültig für 30 Tage ab Einlösung. Nicht mit anderen Aktionen kombinierbar.",
    termsEN: "Valid for 30 days from redemption. Cannot be combined with other offers.",
  },
  {
    id: 2,
    titleDe: "Gratis Kaffee",
    titleEn: "Free Coffee",
    descriptionDe: "Einen Kaffee gratis in der Campus-Cafeteria",
    descriptionEn: "One free coffee at campus cafeteria",
    categoryDe: "Gastronomie",
    categoryEn: "Food & Drink",
    coins: 100,
    icon: "☕",
    available: 100,
    redeemedCount: 567,
    popular: true,
    partner: "Campus Café",
    termsDE: "Einlösbar innerhalb von 7 Tagen.",
    termsEN: "Redeemable within 7 days.",
  },
  {
    id: 3,
    titleDe: "MVG Tagesticket",
    titleEn: "MVG Day Ticket",
    descriptionDe: "Ein Tagesticket für alle MVG-Verkehrsmittel",
    descriptionEn: "One day ticket for all MVG transport",
    categoryDe: "Mobilität",
    categoryEn: "Mobility",
    coins: 800,
    icon: "🚇",
    available: 30,
    redeemedCount: 145,
    popular: true,
    partner: "MVG München",
    termsDE: "Gültig für Zone M. Einlösung über MVG-App.",
    termsEN: "Valid for zone M. Redemption via MVG app.",
  },
  {
    id: 4,
    titleDe: "Bibliothek Verlängerung",
    titleEn: "Library Extension",
    descriptionDe: "Leihfrist um 2 Wochen verlängern",
    descriptionEn: "Extend loan period by 2 weeks",
    categoryDe: "Bildung",
    categoryEn: "Education",
    coins: 50,
    icon: "📚",
    available: 200,
    redeemedCount: 89,
    popular: false,
    partner: "HM Bibliothek",
    termsDE: "Nur für nicht-überfällige Medien.",
    termsEN: "Only for non-overdue media.",
  },
  {
    id: 5,
    titleDe: "Sport-Kurs Gutschein",
    titleEn: "Sports Course Voucher",
    descriptionDe: "Einen Hochschulsport-Kurs gratis",
    descriptionEn: "One free university sports course",
    categoryDe: "Freizeit",
    categoryEn: "Leisure",
    coins: 600,
    icon: "🏃",
    available: 25,
    redeemedCount: 78,
    popular: false,
    partner: "Hochschulsport München",
    termsDE: "Nicht für Premium-Kurse. Anmeldung erforderlich.",
    termsEN: "Not valid for premium courses. Registration required.",
  },
  {
    id: 6,
    titleDe: "Veganes Mittagessen",
    titleEn: "Vegan Lunch",
    descriptionDe: "Gratis veganes Gericht in der Mensa",
    descriptionEn: "Free vegan dish at cafeteria",
    categoryDe: "Gastronomie",
    categoryEn: "Food & Drink",
    coins: 300,
    icon: "🥗",
    available: 40,
    redeemedCount: 312,
    popular: true,
    partner: "Studentenwerk München",
    termsDE: "Nur Hauptgerichte. Getränke nicht inbegriffen.",
    termsEN: "Main dishes only. Drinks not included.",
  },
  {
    id: 7,
    titleDe: "Druckguthaben 5€",
    titleEn: "Print Credit 5€",
    descriptionDe: "5€ Guthaben für Drucker und Kopierer",
    descriptionEn: "5€ credit for printers and copiers",
    categoryDe: "Bildung",
    categoryEn: "Education",
    coins: 400,
    icon: "🖨️",
    available: 60,
    redeemedCount: 201,
    popular: true,
    partner: "HM IT-Services",
    termsDE: "Wird dem Print-Account gutgeschrieben.",
    termsEN: "Will be credited to print account.",
  },
  {
    id: 8,
    titleDe: "Fahrrad-Service",
    titleEn: "Bike Service",
    descriptionDe: "Kostenlose Fahrrad-Inspektion",
    descriptionEn: "Free bike inspection",
    categoryDe: "Mobilität",
    categoryEn: "Mobility",
    coins: 700,
    icon: "🚴",
    available: 15,
    redeemedCount: 45,
    popular: false,
    partner: "Campus Bike Station",
    termsDE: "Termin erforderlich. Ersatzteile nicht inbegriffen.",
    termsEN: "Appointment required. Spare parts not included.",
  },
];

export function getRewards(): Reward[] {
  return REWARDS;
}

export function getPopularRewards(): Reward[] {
  return REWARDS.filter(r => r.popular).sort((a, b) => b.redeemedCount - a.redeemedCount);
}

export function getRewardById(id: number): Reward | undefined {
  return REWARDS.find(r => r.id === id);
}

export function getRedemptionHistory(): RedemptionHistory[] {
  const stored = localStorage.getItem("redemptionHistory");
  return stored ? JSON.parse(stored, (key, value) => {
    if (key === 'redeemedAt' || key === 'expiresAt') {
      return value ? new Date(value) : undefined;
    }
    return value;
  }) : [];
}

export function addRedemption(reward: Reward): RedemptionHistory {
  const history = getRedemptionHistory();
  
  // Generate unique redemption code
  const code = `ECO${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  
  const redemption: RedemptionHistory = {
    id: Date.now(),
    rewardId: reward.id,
    rewardTitleDe: reward.titleDe,
    rewardTitleEn: reward.titleEn,
    coins: reward.coins,
    code: code,
    redeemedAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    used: false,
  };
  
  history.unshift(redemption);
  localStorage.setItem("redemptionHistory", JSON.stringify(history));
  
  return redemption;
}

export function markRedemptionAsUsed(id: number) {
  const history = getRedemptionHistory();
  const redemption = history.find(r => r.id === id);
  
  if (redemption) {
    redemption.used = true;
    localStorage.setItem("redemptionHistory", JSON.stringify(history));
  }
}
