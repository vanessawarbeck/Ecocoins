# 🌱 Eco Coins - Hochschul-Nachhaltigkeits-App

Eine mobile-first Progressive Web App für die Hochschule München, die Studierende und Lehrende motiviert, durch nachhaltige Aktionen Punkte zu sammeln und gegen Belohnungen einzutauschen.

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![React](https://img.shields.io/badge/React-18+-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan.svg)

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Technologie-Stack](#technologie-stack)
- [Installation](#installation)
- [Projektstruktur](#projektstruktur)
- [Hauptkomponenten](#hauptkomponenten)
- [Mehrsprachigkeit](#mehrsprachigkeit)
- [Dark Mode](#dark-mode)
- [Fakultäts-System](#fakultäts-system)
- [Verwendung](#verwendung)
- [Entwicklung](#entwicklung)

## 🎯 Über das Projekt

Eco Coins ist eine innovative Nachhaltigkeits-App, die speziell für die Hochschule München entwickelt wurde. Die App gamifiziert nachhaltige Aktionen und schafft Anreize für umweltbewusstes Verhalten auf dem Campus.

### Kernkonzept

Studierende und Lehrende sammeln **Eco Coins** durch:
- 🚴 Fahrradfahren mit GPS-Tracking
- ♻️ Recycling mit OCR-Scanner
- 🥤 Nutzung von Mehrwegbechern
- 🧠 Teilnahme an Nachhaltigkeits-Quiz
- 🎯 Besuch von Campus-Events
- 📚 Büchertausch

Die gesammelten Coins können gegen attraktive Belohnungen eingelöst werden.

## ✨ Features

### 🏠 Home Dashboard
- **Täglicher Eco-Tipp**: Nachhaltigkeits-Tipps mit Cookie-Animation
- **Fortune Cookie**: Tägliche Inspiration mit Glückszahlen
- **Quick Actions**: Schnellzugriff auf alle Nachhaltigkeitsaktionen
- **Impact Overview**: Persönliche Umwelt-Statistiken (CO₂-Ersparnis, Fahrrad-km, etc.)
- **Community Teaser**: Aktuelle Ranglisten-Position
- **Popular Highlights**: Carousel mit beliebten Challenges

### 📰 News Feed
- Campus-News mit Likes und Kommentaren
- Event-Übersicht mit Teilnehmerverwaltung
- Filter nach News/Events
- Event-Details mit Anmeldung
- Interaktive Kommentar-Funktion

### 🏆 Challenges
- **Active Challenges**: Laufende persönliche Herausforderungen
- **Available Challenges**: Neue Challenges zum Starten
- **Completed Challenges**: Erfolgreich abgeschlossene Aufgaben
- Schwierigkeitsgrade (Leicht/Mittel/Schwer)
- Fortschrittsanzeige mit Countdown
- Coins-Verlauf und Aktivitätshistorie

### 📊 Dashboard
- Wöchentliche Fortschritts-Übersicht
- CO₂-Ersparnis Tracking
- Aktivitätsstatistiken
- Achievements & Badges
- Streak-Counter
- Impact Insights Modal mit detaillierten Analysen

### 👥 Community
- **Gesamtrangliste**: Hochschulweites Ranking
- **Fakultäts-Rangliste**: Wettbewerb zwischen 16 Fakultäten
- **Freunde**: Persönliches Netzwerk mit Challenges
- Friend Requests & Management
- Freunde-Challenges erstellen
- Soziale Interaktionen

### 🎁 Rewards
- Belohnungskatalog mit verschiedenen Kategorien
- Rabatte & Gutscheine
- Campus-Events
- Nachhaltige Produkte
- Einlöse-Historie
- Modal für Einlöse-Bestätigung

### 👤 Profil
- Persönliche Informationen
- Fakultätszuordnung (16 Fakultäten der HM)
- Level & Streak System
- Aktivitätsübersicht
- Einstellungen

### ⚙️ Einstellungen
- **Sprache**: Deutsch/English mit vollständiger Übersetzung
- **Benachrichtigungen**: Granulare Kontrolle
  - Challenges
  - News & Events
  - Community-Updates
  - Freunde-Anfragen
- **Dark Mode**: Vollständig implementiert
- **Datenschutz**: Sichtbarkeit & Dateneinstellungen
- **Account**: Abmeldung

### 🎨 Onboarding
- Mehrstufiger Willkommens-Flow
- Bidirektionale Navigation
- Fakultätsauswahl
- App-Feature-Tour
- Personalisierung

## 🛠️ Technologie-Stack

### Frontend
- **React 18+**: Moderne UI-Bibliothek
- **TypeScript**: Type-safe Entwicklung
- **Tailwind CSS 4.0**: Utility-first CSS Framework
- **Motion (Framer Motion)**: Flüssige Animationen
- **Lucide React**: Icon-Bibliothek

### State Management
- **React Context API**: Globales State Management
  - LanguageContext: Mehrsprachigkeit
  - ActivityContext: Aktivitätstracking
  - DarkModeContext: Theme Management

### Lokale Datenspeicherung
- **localStorage**: Persistente Daten
  - User-Profil
  - Eco Coins
  - Challenges
  - Aktivitätshistorie
  - Einstellungen

### UI-Komponenten
- Shadcn/ui inspirierte Komponenten
- Custom Card, Badge, Button, Progress Komponenten
- Modal-System mit Dark Mode Support
- Responsive Design (Mobile-First)

## 📦 Installation

### Voraussetzungen
- Node.js (v18 oder höher)
- npm oder yarn

### Setup

1. **Repository klonen**
```bash
git clone [repository-url]
cd eco-coins
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Entwicklungsserver starten**
```bash
npm run dev
```

4. **Build für Produktion**
```bash
npm run build
```

Die App läuft standardmäßig auf `http://localhost:5173`

## 📁 Projektstruktur

```
eco-coins/
├── src/
│   ├── components/
│   │   ├── HomePage.tsx                 # Home Dashboard
│   │   ├── NewsFeedPage.tsx            # News & Events
│   │   ├── ChallengesPage.tsx          # Challenges Übersicht
│   │   ├── DashboardPage.tsx           # Statistik Dashboard
│   │   ├── CommunityPage.tsx           # Community & Rankings
│   │   ├── RewardsPage.tsx             # Belohnungen
│   │   ├── ProfilePage.tsx             # User-Profil
│   │   ├── SettingsPage.tsx            # Einstellungen
│   │   ├── OnboardingPage.tsx          # Onboarding Flow
│   │   │
│   │   ├── MobileNavbar.tsx            # Bottom Navigation
│   │   ├── MobileSidebar.tsx           # Hamburger Menu
│   │   │
│   │   ├── modals/
│   │   │   ├── EcoCookieModal.tsx      # Täglicher Eco-Tipp
│   │   │   ├── FortuneCookieModal.tsx  # Fortune Cookie
│   │   │   ├── BikeTrackingModal.tsx   # Fahrrad-Tracking
│   │   │   ├── RecycleModal.tsx        # Recycling Scanner
│   │   │   ├── ReusableCupModal.tsx    # Mehrwegbecher
│   │   │   ├── QuizModal.tsx           # Nachhaltigkeits-Quiz
│   │   │   ├── BookExchangeModal.tsx   # Büchertausch
│   │   │   ├── EventDetailModal.tsx    # Event-Details
│   │   │   ├── CommentsModal.tsx       # News Kommentare
│   │   │   ├── ChallengeDetailModal.tsx
│   │   │   ├── ActionDetailModal.tsx
│   │   │   ├── CoinsProgressModal.tsx
│   │   │   ├── ActivityHistoryModal.tsx
│   │   │   ├── PointsHistoryModal.tsx
│   │   │   ├── ImpactInsightsModal.tsx
│   │   │   ├── RewardDetailModal.tsx
│   │   │   ├── RedeemConfirmModal.tsx
│   │   │   └── FriendChallengeModal.tsx
│   │   │
│   │   └── ui/
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── progress.tsx
│   │       └── ...
│   │
│   ├── utils/
│   │   ├── LanguageContext.tsx         # Mehrsprachigkeit
│   │   ├── ActivityContext.tsx         # Aktivitäts-Tracking
│   │   ├── DarkModeContext.tsx         # Dark Mode State
│   │   ├── translations.ts             # Übersetzungen DE/EN
│   │   ├── actions.ts                  # Action Definitionen
│   │   ├── challengeManager.ts         # Challenge-Logik
│   │   ├── modalDarkModeClasses.ts     # Dark Mode Helper
│   │   └── userProfile.ts              # User-Management
│   │
│   ├── styles/
│   │   └── globals.css                 # Tailwind & Custom Styles
│   │
│   ├── App.tsx                         # Haupt-App Komponente
│   └── main.tsx                        # Entry Point
│
├── public/
│   └── figma:asset/                    # Images & Assets
│
└── package.json
```

## 🧩 Hauptkomponenten

### Navigation
- **MobileNavbar**: Bottom Navigation Bar mit 5 Hauptseiten
- **MobileSidebar**: Ausklappbare Sidebar mit allen Bereichen (7 Seiten)
- Smooth Page Transitions mit Motion

### Aktivitäts-Modals
Alle Modals unterstützen:
- Dark Mode
- Mehrsprachigkeit (DE/EN)
- Animationen
- Points-System Integration

### Challenge-System
- Auto-Tracking von Aktivitäten
- Progress-Updates in Echtzeit
- Completion-Belohnungen
- History & Analytics

### Belohnungs-System
- Kategorie-basierte Organisation
- Verfügbarkeits-Check (genug Coins?)
- Einlöse-Bestätigung
- Historie der eingelösten Belohnungen

## 🌍 Mehrsprachigkeit

Die App ist vollständig zweisprachig (Deutsch/English):

```typescript
// Verwendung in Komponenten
const { t, language, toggleLanguage } = useLanguage();

// Beispiel
<h1>{t.home.title}</h1>
<p>{language === "de" ? "Willkommen" : "Welcome"}</p>
```

**Übersetzte Bereiche:**
- Alle UI-Texte
- Challenges & Beschreibungen
- News & Events
- Belohnungen
- Einstellungen
- Modals & Dialoge

## 🌙 Dark Mode

Vollständiger Dark Mode Support für:
- ✅ Alle Seiten (Home, News, Challenges, etc.)
- ✅ Alle Modals (15+ Modals)
- ✅ Navigation & Sidebar
- ✅ Karten & Komponenten
- ✅ Formulare & Inputs
- ✅ Badges & Buttons

**Dark Mode Helper:**
```typescript
import { modalDarkModeClasses as dm } from '../utils/modalDarkModeClasses';

<div className={dm.modalOverlay}>
  <div className={dm.modalContainer}>
    <h2 className={dm.modalTitle}>Titel</h2>
  </div>
</div>
```

## 🎓 Fakultäts-System

Die App unterstützt alle **16 Fakultäten der Hochschule München**:

1. Fakultät 01 - Architektur
2. Fakultät 02 - Bauingenieurwesen
3. Fakultät 03 - Maschinenbau
4. Fakultät 04 - Elektrotechnik und Informationstechnik
5. Fakultät 05 - Fahrzeugtechnik
6. Fakultät 06 - Angewandte Naturwissenschaften
7. Fakultät 07 - Informatik und Mathematik
8. Fakultät 08 - Geoinformation
9. Fakultät 09 - Wirtschaftsingenieurwesen
10. Fakultät 10 - Betriebswirtschaft
11. Fakultät 11 - Sozialwissenschaften
12. Fakultät 12 - Design
13. Fakultät 13 - Studium Generale
14. Fakultät 14 - Tourismus
15. FK11 - Angewandte Sozialwissenschaften
16. FK15 - Veranstaltungsmanagement

Jede Fakultät hat:
- Eigene Farbe (Gradient)
- Icon-Zuordnung
- Ranglisten-Tracking
- Statistiken

## 🎮 Verwendung

### Erste Schritte

1. **Onboarding durchlaufen**
   - Willkommensbildschirm
   - Fakultät auswählen
   - App-Features kennenlernen

2. **Quick Actions starten**
   - Fahrrad-Tracking für Campus-Wege
   - Recycling scannen in Mensen
   - Mehrwegbecher verwenden
   - Quiz spielen

3. **Challenges annehmen**
   - Wöchentliche Herausforderungen
   - Fortschritt tracken
   - Belohnungen erhalten

4. **Coins sammeln & einlösen**
   - Aktivitäten durchführen
   - Eco Coins verdienen
   - Gegen Belohnungen eintauschen

5. **Community beitreten**
   - Rangliste einsehen
   - Freunde hinzufügen
   - Challenges teilen

### Punktevergabe

| Aktion | Coins |
|--------|-------|
| Fahrradfahren | 10-30 (distanzabhängig) |
| Recycling | 15 pro Scan |
| Mehrwegbecher | 5 pro Nutzung |
| Quiz | 20 bei Erfolg |
| Event-Teilnahme | 30-100 |
| Büchertausch | 50 |
| Challenge-Completion | 50-300 |

## 🔧 Entwicklung

### Neue Komponente hinzufügen

```typescript
// components/NewComponent.tsx
import { useLanguage } from '../utils/LanguageContext';
import { useDarkMode } from '../utils/DarkModeContext';

export function NewComponent() {
  const { t, language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="bg-white dark:bg-gray-800">
      <h1 className="text-gray-900 dark:text-gray-100">
        {t.newSection.title}
      </h1>
    </div>
  );
}
```

### Übersetzungen hinzufügen

```typescript
// utils/translations.ts
export const translations = {
  de: {
    newSection: {
      title: "Neuer Bereich",
      description: "Beschreibung"
    }
  },
  en: {
    newSection: {
      title: "New Section",
      description: "Description"
    }
  }
}
```

### Neue Challenge erstellen

```typescript
// utils/challengeManager.ts
const newChallenge: Challenge = {
  id: "unique-id",
  title: "Challenge Titel",
  titleEn: "Challenge Title",
  description: "Beschreibung",
  descriptionEn: "Description",
  icon: "🎯",
  actionType: "cycling",
  difficulty: "Mittel",
  difficultyEn: "Medium",
  targetCount: 10,
  currentCount: 0,
  reward: 200,
  deadline: Date.now() + 7 * 24 * 60 * 60 * 1000,
  status: "inactive"
};
```

## 📱 Responsive Design

Die App ist optimiert für:
- 📱 Mobile (320px - 767px) - Primary Focus
- 📱 Tablet (768px - 1023px)
- 💻 Desktop (1024px+)

Mobile-First Approach mit Tailwind Breakpoints:
```css
/* Mobile First */
.class-name { /* Basis Styles */ }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }
```

## 🎨 Design-System

### Farben

**Primary Colors:**
- Emerald/Green: Hauptfarbe (Nachhaltigkeit)
- Orange/Amber: Akzente & Rewards
- Blue: Aktionen & Information
- Purple: Community & Events

**Status Colors:**
- Green: Erfolg, Aktiv
- Red: Fehler, Ausgebucht
- Amber: Warnung, Mittel
- Gray: Inaktiv, Neutral

### Komponenten
Alle UI-Komponenten folgen einem einheitlichen Design:
- Rounded Corners (rounded-lg, rounded-xl)
- Shadows (shadow-md, shadow-lg)
- Gradients (bg-gradient-to-br)
- Hover-Effekte (hover:shadow-lg)
- Dark Mode Support

## 🚀 Features in Entwicklung

Mögliche zukünftige Erweiterungen:
- [ ] Backend-Integration mit Supabase
- [ ] Push-Benachrichtigungen
- [ ] Team-Challenges
- [ ] Erweiterte Analytics
- [ ] QR-Code Scanner für Events
- [ ] Social Media Sharing
- [ ] Export von Statistiken

## 📄 Lizenz

Dieses Projekt wurde für die Hochschule München entwickelt.

## 👥 Kontakt & Support

Bei Fragen oder Problemen:
- GitHub Issues erstellen
- Hochschule München kontaktieren

---

**Entwickelt mit ♻️ für eine nachhaltige Zukunft an der Hochschule München**
- [ ] Gamification-Erweiterungen (Achievements)
