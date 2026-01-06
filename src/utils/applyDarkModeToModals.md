# Dark Mode Anpassungen für alle Modals

Diese Datei dokumentiert die systematischen Änderungen, die für jeden Modal-Typ vorgenommen werden müssen.

## Schritt 1: Imports hinzufügen

Füge in jedem Modal folgende Imports hinzu:

```typescript
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses, getGradientHeaderClasses, combineClasses } from "../utils/modalDarkModeClasses";
```

## Schritt 2: Dark Mode Hook initialisieren

In der Komponente:

```typescript
const { isDarkMode } = useDarkMode();
const modalClasses = getModalClasses(isDarkMode);
```

## Schritt 3: Häufige Ersetzungen

### Modal Container (von unten kommend)
**Vorher:**
```typescript
className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl"
```

**Nachher:**
```typescript
className={`fixed inset-x-0 bottom-0 z-50 ${modal Classes.containerRounded} shadow-2xl`}
```

### Close Button (rund, außerhalb)
**Vorher:**
```typescript
className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
```

**Nachher:**
```typescript
className={`absolute -top-2 -right-2 z-10 ${modalClasses.closeButtonRounded} p-2 shadow-lg`}
```

### Close Button (in Header, weißer Overlay)
**Bleibt gleich** (immer weiß/transparent):
```typescript
className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
```

### Cards
**Vorher:**
```typescript
className="p-4 bg-white border-gray-200"
```

**Nachher:**
```typescript
className={`p-4 ${modalClasses.card}`}
```

### Text - Primary
**Vorher:**
```typescript
className="text-gray-900"
```

**Nachher:**
```typescript
className={modalClasses.textPrimary}
```

### Text - Secondary
**Vorher:**
```typescript
className="text-gray-600"
```

**Nachher:**
```typescript
className={modalClasses.textSecondary}
```

### Divider/Border
**Vorher:**
```typescript
className="border-gray-200"
```

**Nachher:**
```typescript
className={modalClasses.divider}
```

### Input Fields
**Vorher:**
```typescript
className="bg-white border-gray-200 text-gray-900"
```

**Nachher:**
```typescript
className={modalClasses.input}
```

### Stats Cards (kleine Info-Boxen)
**Vorher:**
```typescript
className="bg-white p-3 rounded-lg"
```

**Nachher:**
```typescript
className={modalClasses.statsCard}
```

## Modals die angepasst werden müssen:

### Schnellaktionen (Quick Actions):
- [x] EcoCookieModal ✅ 
- [x] BikeTrackingModal ✅
- [ ] RecycleScanModal
- [ ] ReusableCupModal
- [ ] BookExchangeModal  
- [ ] QuizModal

### Andere Pop-ups:
- [ ] FortuneCookieModal
- [ ] PointsHistoryModal
- [ ] CoinsProgressModal
- [ ] ActivityHistoryModal
- [ ] ImpactInsightsModal
- [ ] ChallengeDetailModal
- [ ] EventDetailModal
- [ ] RewardDetailModal
- [ ] CommentsModal
- [ ] QRScannerModal
- [ ] RedeemConfirmationModal
- [ ] RedeemSuccessModal
- [ ] LanguageSettingsModal
- [ ] ActionDetailModal
- [ ] RewardsHistoryModal

## Besondere Fälle:

### Gradient Backgrounds (Light Modals mit farbigem BG)
Für spezielle Modals wie EcoCookie mit hellem Gradient:

**Vorher:**
```typescript
className="bg-gradient-to-br from-emerald-50 to-green-100"
```

**Nachher:**
```typescript
className={modalClasses.gradientEmergingLight}
```

Verfügbare Gradienten:
- `gradientEmergingLight` (grün)
- `gradientAmberLight` (gelb/amber)
- `gradientPurpleLight` (lila)
- `gradientBlueLight` (blau)

### Gradient Headers
Für farbige Header (bleiben gleich in Dark/Light Mode):

```typescript
className={getGradientHeaderClasses("emerald")}
```

Verfügbare Farben: "emerald", "blue", "purple", "amber", "red"
