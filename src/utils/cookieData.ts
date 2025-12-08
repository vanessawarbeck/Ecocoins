import { Language } from "./translations";

export interface EcoTip {
  tip: string;
  ecoCoins: number;
}

export interface Fortune {
  quote: string;
  numbers: number[];
}

// Eco Tips in German
const ecoTipsDe: EcoTip[] = [
  {
    tip: "Bringe deine eigene Wasserflasche mit und spare täglich Plastik!",
    ecoCoins: 25,
  },
  {
    tip: "Fahre mit dem Fahrrad zur Hochschule - gut für dich und die Umwelt!",
    ecoCoins: 30,
  },
  {
    tip: "Nutze Mehrwegbecher in der Mensa und erhalte Bonus-Punkte!",
    ecoCoins: 20,
  },
  {
    tip: "Drucke nur wenn nötig - digitale Notizen sparen Papier und Bäume!",
    ecoCoins: 15,
  },
  {
    tip: "Teile deine Fahrt mit Kommilitonen und reduziere CO₂-Emissionen!",
    ecoCoins: 35,
  },
  {
    tip: "Schalte Geräte komplett aus - Standby-Modus verbraucht Energie!",
    ecoCoins: 20,
  },
  {
    tip: "Kaufe regional und saisonal in der Campus-Mensa!",
    ecoCoins: 25,
  },
  {
    tip: "Nutze die Bibliothek statt Bücher zu kaufen - Teilen ist nachhaltig!",
    ecoCoins: 15,
  },
  {
    tip: "Tausche Bücher in der Bibliothek und fördere nachhaltiges Teilen!",
    ecoCoins: 10,
  },
  {
    tip: "Repariere defekte Dinge statt sie wegzuwerfen!",
    ecoCoins: 30,
  },
  {
    tip: "Verwende wiederaufladbare Batterien für deine Geräte!",
    ecoCoins: 20,
  },
  {
    tip: "Trenne deinen Müll richtig - Recycling beginnt bei dir!",
    ecoCoins: 15,
  },
  {
    tip: "Nutze LED-Lampen und spare bis zu 80% Energie!",
    ecoCoins: 25,
  },
  {
    tip: "Kaufe Second-Hand Bücher und Kleidung - nachhaltig und günstig!",
    ecoCoins: 30,
  },
  {
    tip: "Verzichte auf Einweg-Plastiktüten und nutze Stoffbeutel!",
    ecoCoins: 15,
  },
  {
    tip: "Dusche kürzer und spare wertvolles Wasser!",
    ecoCoins: 20,
  },
  {
    tip: "Unterstütze lokale Initiativen für mehr Nachhaltigkeit am Campus!",
    ecoCoins: 25,
  },
  {
    tip: "Vermeide Food Waste - plane deine Mahlzeiten!",
    ecoCoins: 20,
  },
  {
    tip: "Nutze öffentliche Verkehrsmittel für längere Strecken!",
    ecoCoins: 30,
  },
  {
    tip: "Pflanze einen Baum oder pflege Zimmerpflanzen - jedes Grün hilft!",
    ecoCoins: 35,
  },
  {
    tip: "Achte auf Energieeffizienz beim Kauf neuer Geräte!",
    ecoCoins: 25,
  },
  {
    tip: "Vermeide Mikroplastik in Kosmetikprodukten!",
    ecoCoins: 20,
  },
  {
    tip: "Nutze Cloud-Speicher bewusst - auch Server verbrauchen Energie!",
    ecoCoins: 15,
  },
  {
    tip: "Organisiere einen Kleidertausch mit Kommilitonen!",
    ecoCoins: 30,
  },
  {
    tip: "Iss öfter vegetarisch - das spart CO₂ und ist gesund!",
    ecoCoins: 25,
  },
  {
    tip: "Verwende natürliche Reinigungsmittel!",
    ecoCoins: 20,
  },
  {
    tip: "Spende oder verkaufe Dinge, die du nicht mehr brauchst!",
    ecoCoins: 25,
  },
  {
    tip: "Nutze Apps zum Teilen von Ressourcen und Geräten!",
    ecoCoins: 20,
  },
  {
    tip: "Informiere dich über Nachhaltigkeitsinitiativen an deiner Hochschule!",
    ecoCoins: 15,
  },
  {
    tip: "Spare Papier - nutze beide Seiten beim Drucken!",
    ecoCoins: 10,
  },
  {
    tip: "Kompostiere organische Abfälle wenn möglich!",
    ecoCoins: 25,
  },
  {
    tip: "Achte auf Fairtrade-Produkte beim Einkaufen!",
    ecoCoins: 20,
  },
  {
    tip: "Reduziere deine E-Mail-Flut - auch digitale Daten verbrauchen Energie!",
    ecoCoins: 15,
  },
  {
    tip: "Nutze Tageslicht statt künstliches Licht wenn möglich!",
    ecoCoins: 15,
  },
  {
    tip: "Werde Mitglied in einer Nachhaltigkeits-AG an deiner Hochschule!",
    ecoCoins: 35,
  },
  {
    tip: "Verzichte auf Fast Fashion - Qualität statt Quantität!",
    ecoCoins: 30,
  },
  {
    tip: "Nutze wiederverwendbare Lebensmittelbehälter für dein Essen!",
    ecoCoins: 20,
  },
  {
    tip: "Schalte WLAN und Bluetooth aus, wenn du sie nicht brauchst!",
    ecoCoins: 10,
  },
  {
    tip: "Organisiere einen Clean-Up Day mit deinen Kommilitonen!",
    ecoCoins: 40,
  },
  {
    tip: "Jeder kleine Schritt zählt - sei stolz auf deine nachhaltigen Entscheidungen!",
    ecoCoins: 50,
  },
];

// Eco Tips in English
const ecoTipsEn: EcoTip[] = [
  {
    tip: "Bring your own water bottle and save plastic every day!",
    ecoCoins: 25,
  },
  {
    tip: "Bike to university - good for you and the environment!",
    ecoCoins: 30,
  },
  {
    tip: "Use reusable cups in the cafeteria and get bonus points!",
    ecoCoins: 20,
  },
  {
    tip: "Print only when necessary - digital notes save paper and trees!",
    ecoCoins: 15,
  },
  {
    tip: "Share your ride with classmates and reduce CO₂ emissions!",
    ecoCoins: 35,
  },
  {
    tip: "Turn off devices completely - standby mode uses energy!",
    ecoCoins: 20,
  },
  {
    tip: "Buy regional and seasonal food at the campus cafeteria!",
    ecoCoins: 25,
  },
  {
    tip: "Use the library instead of buying books - sharing is sustainable!",
    ecoCoins: 15,
  },
  {
    tip: "Exchange books at the library and promote sustainable sharing!",
    ecoCoins: 10,
  },
  {
    tip: "Repair broken things instead of throwing them away!",
    ecoCoins: 30,
  },
  {
    tip: "Use rechargeable batteries for your devices!",
    ecoCoins: 20,
  },
  {
    tip: "Separate your waste properly - recycling starts with you!",
    ecoCoins: 15,
  },
  {
    tip: "Use LED bulbs and save up to 80% energy!",
    ecoCoins: 25,
  },
  {
    tip: "Buy second-hand books and clothes - sustainable and affordable!",
    ecoCoins: 30,
  },
  {
    tip: "Avoid single-use plastic bags and use cloth bags!",
    ecoCoins: 15,
  },
  {
    tip: "Take shorter showers and save precious water!",
    ecoCoins: 20,
  },
  {
    tip: "Support local initiatives for more sustainability on campus!",
    ecoCoins: 25,
  },
  {
    tip: "Avoid food waste - plan your meals!",
    ecoCoins: 20,
  },
  {
    tip: "Use public transport for longer distances!",
    ecoCoins: 30,
  },
  {
    tip: "Plant a tree or care for houseplants - every bit of green helps!",
    ecoCoins: 35,
  },
  {
    tip: "Look for energy efficiency when buying new devices!",
    ecoCoins: 25,
  },
  {
    tip: "Avoid microplastics in cosmetic products!",
    ecoCoins: 20,
  },
  {
    tip: "Use cloud storage consciously - servers also consume energy!",
    ecoCoins: 15,
  },
  {
    tip: "Organize a clothing swap with classmates!",
    ecoCoins: 30,
  },
  {
    tip: "Eat vegetarian more often - it saves CO₂ and is healthy!",
    ecoCoins: 25,
  },
  {
    tip: "Use natural cleaning products!",
    ecoCoins: 20,
  },
  {
    tip: "Donate or sell things you no longer need!",
    ecoCoins: 25,
  },
  {
    tip: "Use apps to share resources and devices!",
    ecoCoins: 20,
  },
  {
    tip: "Learn about sustainability initiatives at your university!",
    ecoCoins: 15,
  },
  {
    tip: "Save paper - use both sides when printing!",
    ecoCoins: 10,
  },
  {
    tip: "Compost organic waste when possible!",
    ecoCoins: 25,
  },
  {
    tip: "Look for fair trade products when shopping!",
    ecoCoins: 20,
  },
  {
    tip: "Reduce your email flood - digital data also consumes energy!",
    ecoCoins: 15,
  },
  {
    tip: "Use daylight instead of artificial light when possible!",
    ecoCoins: 15,
  },
  {
    tip: "Join a sustainability working group at your university!",
    ecoCoins: 35,
  },
  {
    tip: "Avoid fast fashion - quality over quantity!",
    ecoCoins: 30,
  },
  {
    tip: "Use reusable food containers for your meals!",
    ecoCoins: 20,
  },
  {
    tip: "Turn off WiFi and Bluetooth when you don't need them!",
    ecoCoins: 10,
  },
  {
    tip: "Organize a clean-up day with your classmates!",
    ecoCoins: 40,
  },
  {
    tip: "Every small step counts - be proud of your sustainable choices!",
    ecoCoins: 50,
  },
];

// Fortune Cookies in German
const fortunesDe: Fortune[] = [
  {
    quote: "Deine Zukunft wird durch das geschaffen, was du heute tust, nicht morgen.",
    numbers: [7, 14, 23, 31, 42, 56],
  },
  {
    quote: "Die beste Zeit, einen Baum zu pflanzen, war vor 20 Jahren. Die zweitbeste Zeit ist jetzt.",
    numbers: [3, 18, 27, 35, 49, 63],
  },
  {
    quote: "Erfolg ist nicht endgültig, Misserfolg ist nicht fatal: Es ist der Mut weiterzumachen, der zählt.",
    numbers: [9, 16, 24, 38, 47, 55],
  },
  {
    quote: "Glaube daran, dass du es kannst, und du bist schon auf halbem Weg.",
    numbers: [2, 11, 29, 33, 44, 51],
  },
  {
    quote: "Der einzige Weg, großartige Arbeit zu leisten, ist zu lieben, was du tust.",
    numbers: [5, 12, 21, 36, 43, 58],
  },
  {
    quote: "Das Leben ist das, was passiert, während du beschäftigt bist, andere Pläne zu machen.",
    numbers: [1, 19, 26, 34, 41, 62],
  },
  {
    quote: "Es spielt keine Rolle, wie langsam du gehst, solange du nicht stehen bleibst.",
    numbers: [8, 15, 22, 37, 46, 59],
  },
  {
    quote: "Inmitten von Schwierigkeiten liegen günstige Gelegenheiten.",
    numbers: [4, 13, 25, 32, 48, 57],
  },
  {
    quote: "Die Reise von tausend Meilen beginnt mit einem einzigen Schritt.",
    numbers: [6, 17, 28, 39, 45, 61],
  },
  {
    quote: "Was hinter uns liegt und was vor uns liegt, sind Kleinigkeiten im Vergleich zu dem, was in uns liegt.",
    numbers: [10, 20, 30, 40, 50, 60],
  },
  {
    quote: "Sei du selbst; alle anderen sind bereits vergeben.",
    numbers: [12, 24, 36, 41, 53, 65],
  },
  {
    quote: "Zwei Wege teilten sich in einem Wald, und ich nahm den weniger begangenen, und das hat den Unterschied gemacht.",
    numbers: [14, 28, 35, 49, 56, 63],
  },
  {
    quote: "Der Geist ist alles. Was du denkst, wirst du.",
    numbers: [1, 8, 15, 22, 29, 36],
  },
  {
    quote: "Ob du denkst, du kannst es, oder du denkst, du kannst es nicht - du hast recht.",
    numbers: [3, 9, 18, 27, 45, 54],
  },
  {
    quote: "Gestern ist Geschichte, morgen ist ein Geheimnis, heute ist ein Geschenk - deshalb nennen wir es Gegenwart.",
    numbers: [7, 21, 28, 42, 49, 56],
  },
  {
    quote: "Beurteile jeden Tag nicht nach der Ernte, die du einfährst, sondern nach den Samen, die du pflanzt.",
    numbers: [11, 22, 33, 44, 55, 66],
  },
  {
    quote: "Die einzige unmögliche Reise ist die, die du nie beginnst.",
    numbers: [2, 13, 24, 35, 46, 57],
  },
  {
    quote: "Am Ende werden wir uns nicht an die Worte unserer Feinde erinnern, sondern an das Schweigen unserer Freunde.",
    numbers: [16, 32, 48, 64, 17, 33],
  },
  {
    quote: "In unseren dunkelsten Momenten müssen wir uns darauf konzentrieren, das Licht zu sehen.",
    numbers: [5, 10, 25, 40, 55, 65],
  },
  {
    quote: "Verbreite Liebe, wohin du auch gehst. Lass niemanden zu dir kommen, ohne glücklicher zu gehen.",
    numbers: [9, 18, 36, 45, 54, 63],
  },
  {
    quote: "Wenn du am Ende deines Seils angekommen bist, mach einen Knoten hinein und halte dich fest.",
    numbers: [4, 8, 16, 32, 48, 52],
  },
  {
    quote: "Lass nicht zu, dass das, was du nicht tun kannst, das stört, was du tun kannst.",
    numbers: [6, 12, 24, 30, 42, 60],
  },
  {
    quote: "Wenn du dich selbst erheben willst, erhebe jemand anderen.",
    numbers: [15, 30, 45, 52, 67, 3],
  },
  {
    quote: "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.",
    numbers: [19, 38, 57, 4, 23, 68],
  },
  {
    quote: "Es ist besser, in Originalität zu scheitern, als in Nachahmung zu gewinnen.",
    numbers: [23, 46, 69, 8, 17, 54],
  },
  {
    quote: "Der Weg zum Anfangen ist, aufzuhören zu reden und anzufangen zu handeln.",
    numbers: [27, 54, 12, 41, 65, 29],
  },
  {
    quote: "Hab keine Angst, das Gute aufzugeben, um nach dem Großartigen zu streben.",
    numbers: [31, 62, 18, 47, 6, 35],
  },
  {
    quote: "Innovation unterscheidet einen Anführer von einem Nachfolger.",
    numbers: [35, 70, 14, 53, 9, 26],
  },
  {
    quote: "Der größte Ruhm im Leben liegt nicht darin, niemals zu fallen, sondern jedes Mal aufzustehen, wenn wir fallen.",
    numbers: [39, 7, 28, 56, 11, 64],
  },
  {
    quote: "Deine Zeit ist begrenzt, verschwende sie nicht damit, das Leben eines anderen zu leben.",
    numbers: [43, 16, 32, 59, 5, 48],
  },
  {
    quote: "Wenn das Leben vorhersehbar wäre, würde es aufhören, Leben zu sein, und wäre ohne Geschmack.",
    numbers: [47, 24, 61, 13, 37, 52],
  },
  {
    quote: "Das Leben ist wirklich einfach, aber wir bestehen darauf, es kompliziert zu machen.",
    numbers: [51, 2, 39, 66, 21, 44],
  },
  {
    quote: "Du hast jetzt in dir alles, was du brauchst, um mit allem umzugehen, was die Welt dir entgegenwirft.",
    numbers: [55, 10, 43, 69, 25, 38],
  },
  {
    quote: "Glaube an dich selbst und an alles, was du bist. Wisse, dass etwas in dir ist, das größer ist als jedes Hindernis.",
    numbers: [59, 18, 47, 3, 29, 65],
  },
  {
    quote: "Die einzige Person, zu der du bestimmt bist zu werden, ist die Person, die du beschließt zu sein.",
    numbers: [63, 26, 51, 7, 33, 58],
  },
  {
    quote: "Gehe selbstbewusst in die Richtung deiner Träume. Lebe das Leben, das du dir vorgestellt hast.",
    numbers: [67, 34, 55, 11, 37, 62],
  },
  {
    quote: "Wenn sich eine Tür des Glücks schließt, öffnet sich eine andere, aber wir schauen oft so lange auf die geschlossene Tür, dass wir die nicht sehen, die für uns geöffnet wurde.",
    numbers: [4, 42, 59, 15, 68, 27],
  },
  {
    quote: "Alles, was du je wolltest, ist auf der anderen Seite der Angst.",
    numbers: [8, 46, 63, 19, 35, 52],
  },
  {
    quote: "Träume groß und hab keine Angst zu scheitern.",
    numbers: [12, 50, 67, 23, 39, 56],
  },
  {
    quote: "Du verfehlst 100% der Schüsse, die du nicht machst.",
    numbers: [16, 54, 2, 27, 43, 60],
  },
];

// Fortune Cookies in English
const fortunesEn: Fortune[] = [
  {
    quote: "Your future is created by what you do today, not tomorrow.",
    numbers: [7, 14, 23, 31, 42, 56],
  },
  {
    quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
    numbers: [3, 18, 27, 35, 49, 63],
  },
  {
    quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    numbers: [9, 16, 24, 38, 47, 55],
  },
  {
    quote: "Believe you can and you're halfway there.",
    numbers: [2, 11, 29, 33, 44, 51],
  },
  {
    quote: "The only way to do great work is to love what you do.",
    numbers: [5, 12, 21, 36, 43, 58],
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    numbers: [1, 19, 26, 34, 41, 62],
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    numbers: [8, 15, 22, 37, 46, 59],
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    numbers: [4, 13, 25, 32, 48, 57],
  },
  {
    quote: "A journey of a thousand miles begins with a single step.",
    numbers: [6, 17, 28, 39, 45, 61],
  },
  {
    quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    numbers: [10, 20, 30, 40, 50, 60],
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    numbers: [12, 24, 36, 41, 53, 65],
  },
  {
    quote: "Two roads diverged in a wood, and I took the one less traveled by, and that has made all the difference.",
    numbers: [14, 28, 35, 49, 56, 63],
  },
  {
    quote: "The mind is everything. What you think you become.",
    numbers: [1, 8, 15, 22, 29, 36],
  },
  {
    quote: "Whether you think you can or you think you can't, you're right.",
    numbers: [3, 9, 18, 27, 45, 54],
  },
  {
    quote: "Yesterday is history, tomorrow is a mystery, today is a gift - that's why we call it the present.",
    numbers: [7, 21, 28, 42, 49, 56],
  },
  {
    quote: "Judge each day not by the harvest you reap but by the seeds you plant.",
    numbers: [11, 22, 33, 44, 55, 66],
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    numbers: [2, 13, 24, 35, 46, 57],
  },
  {
    quote: "In the end, we will remember not the words of our enemies, but the silence of our friends.",
    numbers: [16, 32, 48, 64, 17, 33],
  },
  {
    quote: "We must accept finite disappointment, but never lose infinite hope.",
    numbers: [5, 10, 25, 40, 55, 65],
  },
  {
    quote: "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    numbers: [9, 18, 36, 45, 54, 63],
  },
  {
    quote: "When you reach the end of your rope, tie a knot in it and hang on.",
    numbers: [4, 8, 16, 32, 48, 52],
  },
  {
    quote: "Don't let what you cannot do interfere with what you can do.",
    numbers: [6, 12, 24, 30, 42, 60],
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    numbers: [15, 30, 45, 52, 67, 3],
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    numbers: [19, 38, 57, 4, 23, 68],
  },
  {
    quote: "It is better to fail in originality than to succeed in imitation.",
    numbers: [23, 46, 69, 8, 17, 54],
  },
  {
    quote: "The way to get started is to quit talking and begin doing.",
    numbers: [27, 54, 12, 41, 65, 29],
  },
  {
    quote: "Don't be afraid to give up the good to go for the great.",
    numbers: [31, 62, 18, 47, 6, 35],
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    numbers: [35, 70, 14, 53, 9, 26],
  },
  {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    numbers: [39, 7, 28, 56, 11, 64],
  },
  {
    quote: "Your time is limited, don't waste it living someone else's life.",
    numbers: [43, 16, 32, 59, 5, 48],
  },
  {
    quote: "If life were predictable it would cease to be life, and be without flavor.",
    numbers: [47, 24, 61, 13, 37, 52],
  },
  {
    quote: "Life is really simple, but we insist on making it complicated.",
    numbers: [51, 2, 39, 66, 21, 44],
  },
  {
    quote: "You have within you right now, everything you need to deal with whatever the world can throw at you.",
    numbers: [55, 10, 43, 69, 25, 38],
  },
  {
    quote: "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    numbers: [59, 18, 47, 3, 29, 65],
  },
  {
    quote: "The only person you are destined to become is the person you decide to be.",
    numbers: [63, 26, 51, 7, 33, 58],
  },
  {
    quote: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    numbers: [67, 34, 55, 11, 37, 62],
  },
  {
    quote: "When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.",
    numbers: [4, 42, 59, 15, 68, 27],
  },
  {
    quote: "Everything you've ever wanted is on the other side of fear.",
    numbers: [8, 46, 63, 19, 35, 52],
  },
  {
    quote: "Dream big and dare to fail.",
    numbers: [12, 50, 67, 23, 39, 56],
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    numbers: [16, 54, 2, 27, 43, 60],
  },
];

// Translation strings for cookie modals
export const cookieTranslations = {
  de: {
    // Eco Cookie
    ecoTipTitle: "Eco-Tipp des Tages",
    tapCookie: "Tippe auf den Cookie!",
    sustainabilityTipWaits: "Nachhaltigkeitstipp wartet",
    loadingTip: "Dein Eco-Tipp wird geladen...",
    yourTip: "Dein Eco-Tipp",
    ecoTipOpened: "Eco-Tipp geöffnet",
    dailySustainabilityTip: "Täglicher Nachhaltigkeitstipp",
    
    // Fortune Cookie
    fortuneCookieTitle: "Glückskeks",
    tapToOpen: "Tippe auf den Keks, um ihn zu öffnen!",
    inspirationWaits: "Inspiration wartet drinnen",
    openingCookie: "Dein Glückskeks wird geöffnet...",
    yourWisdom: "Deine Weisheit",
    fortuneCookieOpened: "Glückskeks geöffnet",
    dailyFortuneCookie: "Täglicher Fortune Cookie",
    yourLuckyNumbers: "Deine Glückszahlen",
  },
  en: {
    // Eco Cookie
    ecoTipTitle: "Eco Tip of the Day",
    tapCookie: "Tap the cookie!",
    sustainabilityTipWaits: "Sustainability tip awaits",
    loadingTip: "Your eco tip is loading...",
    yourTip: "Your Eco Tip",
    ecoTipOpened: "Eco tip opened",
    dailySustainabilityTip: "Daily sustainability tip",
    
    // Fortune Cookie
    fortuneCookieTitle: "Fortune Cookie",
    tapToOpen: "Tap the cookie to open it!",
    inspirationWaits: "Inspiration awaits inside",
    openingCookie: "Your fortune cookie is opening...",
    yourWisdom: "Your Wisdom",
    fortuneCookieOpened: "Fortune cookie opened",
    dailyFortuneCookie: "Daily fortune cookie",
    yourLuckyNumbers: "Your Lucky Numbers",
  },
};

export function getEcoTips(language: Language): EcoTip[] {
  return language === "de" ? ecoTipsDe : ecoTipsEn;
}

export function getFortunes(language: Language): Fortune[] {
  return language === "de" ? fortunesDe : fortunesEn;
}

export function getCookieTranslations(language: Language) {
  return cookieTranslations[language];
}
