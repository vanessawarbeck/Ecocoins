export interface NewsPost {
  id: number;
  authorName: string;
  authorFaculty: string;
  authorAvatar?: string;
  timestamp: Date;
  contentDe: string;
  contentEn: string;
  image?: string;
  likes: number;
  likedByUser: boolean;
  comments: Comment[];
  eventId?: number; // Link to event if applicable
}

export interface Comment {
  id: number;
  authorName: string;
  authorAvatar?: string;
  authorFaculty: string;
  timestamp: Date;
  contentDe: string;
  contentEn: string;
}

export interface Event {
  id: number;
  titleDe: string;
  titleEn: string;
  descriptionDe: string;
  descriptionEn: string;
  location: string;
  date: Date;
  duration: string;
  image?: string;
  category: string;
  categoryDe: string;
  categoryEn: string;
  maxParticipants: number;
  currentParticipants: number;
  coins: number;
  organizerName: string;
  organizerFaculty: string;
  requirements?: string;
  requirementsDe?: string;
  requirementsEn?: string;
}

export interface EventRegistration {
  eventId: number;
  userId: string;
  registeredAt: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  coinsAwarded: boolean;
  supervisorName?: string;
  completedAt?: Date;
}

// Sample News Posts
export const SAMPLE_NEWS_POSTS: NewsPost[] = [
  {
    id: 1,
    authorName: "Lisa Grün",
    authorFaculty: "FK 09",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    contentDe: "🌱 Gerade meine erste Fahrrad-Challenge abgeschlossen! 25km diese Woche. Fühlt sich großartig an, etwas für die Umwelt zu tun!",
    contentEn: "🌱 Just completed my first bike challenge! 25km this week. Feels great to do something for the environment!",
    likes: 42,
    likedByUser: false,
    comments: [],
  },
  {
    id: 2,
    authorName: "Max Nachhaltig",
    authorFaculty: "FK 07",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    contentDe: "Der Campus Clean-Up war ein voller Erfolg! 🎉 Über 50 Studierende haben teilgenommen. Nächster Termin in 2 Wochen!",
    contentEn: "The Campus Clean-Up was a huge success! 🎉 Over 50 students participated. Next event in 2 weeks!",
    likes: 87,
    likedByUser: true,
    comments: [
      {
        id: 1,
        authorName: "Anna Müller",
        authorFaculty: "FK 03",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        contentDe: "War super! Komme beim nächsten Mal wieder dabei 💚",
        contentEn: "It was great! I'll join again next time 💚",
      }
    ],
    eventId: 1,
  },
  {
    id: 3,
    authorName: "Sophie Öko",
    authorFaculty: "FK 11",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    contentDe: "Tipp: Die Mensa hat jetzt vegane Bowl-Optionen! Super lecker und 50 Eco Coins beim ersten Kauf 🌿",
    contentEn: "Tip: The cafeteria now has vegan bowl options! Super delicious and 50 Eco Coins on first purchase 🌿",
    likes: 134,
    likedByUser: false,
    comments: [
      {
        id: 2,
        authorName: "Tom Schmidt",
        authorFaculty: "FK 06",
        timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
        contentDe: "Habe ich heute probiert - absolut empfehlenswert!",
        contentEn: "Tried it today - highly recommended!",
      },
      {
        id: 3,
        authorName: "Julia Weber",
        authorFaculty: "FK 09",
        timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
        contentDe: "Welche Bowl hast du genommen?",
        contentEn: "Which bowl did you get?",
      }
    ],
  },
  {
    id: 4,
    authorName: "Daniel Grün",
    authorFaculty: "FK 14",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    contentDe: "Level 5 erreicht! 🎯 Danke an die Community für die Motivation!",
    contentEn: "Reached Level 5! 🎯 Thanks to the community for the motivation!",
    likes: 56,
    likedByUser: false,
    comments: [],
  },
];

// Sample Events
export const SAMPLE_EVENTS: Event[] = [
  {
    id: 1,
    titleDe: "Campus Clean-Up Day",
    titleEn: "Campus Clean-Up Day",
    descriptionDe: "Gemeinsam machen wir unseren Campus sauberer! Sammle Müll, triff andere Nachhaltigkeits-Enthusiasten und verdiene 100 Eco Coins.",
    descriptionEn: "Let's make our campus cleaner together! Collect trash, meet other sustainability enthusiasts and earn 100 Eco Coins.",
    location: "Haupteingang Campus Lothstraße",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    duration: "2 Stunden",
    category: "environment",
    categoryDe: "Umwelt",
    categoryEn: "Environment",
    maxParticipants: 50,
    currentParticipants: 32,
    coins: 100,
    organizerName: "Green Campus Initiative",
    organizerFaculty: "FK 09",
    requirementsDe: "Bitte bringe Handschuhe mit (falls vorhanden)",
    requirementsEn: "Please bring gloves (if available)",
  },
  {
    id: 2,
    titleDe: "Nachhaltigkeits-Workshop: Zero Waste",
    titleEn: "Sustainability Workshop: Zero Waste",
    descriptionDe: "Lerne praktische Tipps für ein müllfreies Leben im Studium. Inklusive DIY-Session für nachhaltige Produkte!",
    descriptionEn: "Learn practical tips for a waste-free student life. Including DIY session for sustainable products!",
    location: "Raum R 2.012, Lothstraße",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    duration: "90 Minuten",
    category: "workshop",
    categoryDe: "Workshop",
    categoryEn: "Workshop",
    maxParticipants: 25,
    currentParticipants: 18,
    coins: 75,
    organizerName: "Sustainability Club HM",
    organizerFaculty: "FK 11",
  },
  {
    id: 3,
    titleDe: "Fahrrad-Reparatur-Café",
    titleEn: "Bike Repair Café",
    descriptionDe: "Bring dein Fahrrad vorbei und lerne, wie du kleinere Reparaturen selbst durchführen kannst. Werkzeug wird gestellt!",
    descriptionEn: "Bring your bike and learn how to do minor repairs yourself. Tools provided!",
    location: "Campus Werkstatt, Pasing",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    duration: "3 Stunden",
    category: "mobility",
    categoryDe: "Mobilität",
    categoryEn: "Mobility",
    maxParticipants: 15,
    currentParticipants: 9,
    coins: 80,
    organizerName: "Mobility Team",
    organizerFaculty: "FK 03",
    requirementsDe: "Bringe dein eigenes Fahrrad mit",
    requirementsEn: "Bring your own bike",
  },
  {
    id: 4,
    titleDe: "Veganer Kochkurs",
    titleEn: "Vegan Cooking Class",
    descriptionDe: "Entdecke leckere vegane Rezepte für Studierende mit kleinem Budget. Gemeinsam kochen und genießen!",
    descriptionEn: "Discover delicious vegan recipes for students on a budget. Cook and enjoy together!",
    location: "Mensa Küche, Lothstraße",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    duration: "2.5 Stunden",
    category: "food",
    categoryDe: "Ernährung",
    categoryEn: "Food",
    maxParticipants: 20,
    currentParticipants: 20,
    coins: 90,
    organizerName: "Vegan Society HM",
    organizerFaculty: "FK 07",
  },
  {
    id: 5,
    titleDe: "Upcycling-Workshop",
    titleEn: "Upcycling Workshop",
    descriptionDe: "Verwandle alte Kleidung und Materialien in neue, nützliche Gegenstände. Kreativität trifft Nachhaltigkeit!",
    descriptionEn: "Transform old clothes and materials into new, useful items. Creativity meets sustainability!",
    location: "Kreativraum R 3.005",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    duration: "2 Stunden",
    category: "creative",
    categoryDe: "Kreativ",
    categoryEn: "Creative",
    maxParticipants: 30,
    currentParticipants: 12,
    coins: 85,
    organizerName: "Art & Sustainability",
    organizerFaculty: "FK 12",
  },
];

export function getEventRegistrations(): EventRegistration[] {
  const stored = localStorage.getItem("eventRegistrations");
  return stored ? JSON.parse(stored) : [];
}

export function saveEventRegistration(registration: EventRegistration) {
  const registrations = getEventRegistrations();
  registrations.push(registration);
  localStorage.setItem("eventRegistrations", JSON.stringify(registrations));
}

export function updateEventRegistration(eventId: number, updates: Partial<EventRegistration>) {
  const registrations = getEventRegistrations();
  const index = registrations.findIndex(r => r.eventId === eventId);
  if (index !== -1) {
    registrations[index] = { ...registrations[index], ...updates };
    localStorage.setItem("eventRegistrations", JSON.stringify(registrations));
  }
}

export function getEventRegistration(eventId: number): EventRegistration | undefined {
  const registrations = getEventRegistrations();
  return registrations.find(r => r.eventId === eventId);
}

export function getNewsPosts(): NewsPost[] {
  const stored = localStorage.getItem("newsPosts");
  return stored ? JSON.parse(stored, (key, value) => {
    if (key === 'timestamp') return new Date(value);
    return value;
  }) : SAMPLE_NEWS_POSTS;
}

export function saveNewsPosts(posts: NewsPost[]) {
  localStorage.setItem("newsPosts", JSON.stringify(posts));
}

export function toggleLike(postId: number) {
  const posts = getNewsPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.likedByUser = !post.likedByUser;
    post.likes += post.likedByUser ? 1 : -1;
    saveNewsPosts(posts);
  }
}

export function addComment(postId: number, comment: Omit<Comment, 'id'>) {
  const posts = getNewsPosts();
  const post = posts.find(p => p.id === postId);
  if (post) {
    const newComment: Comment = {
      ...comment,
      id: Date.now(),
    };
    post.comments.push(newComment);
    saveNewsPosts(posts);
  }
}