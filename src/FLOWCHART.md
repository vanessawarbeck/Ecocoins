# 🌱 Eco Coins - App Flowchart

Diese Datei enthält verschiedene Flowcharts für die Eco Coins App im Mermaid-Format.

## Hauptnavigation & App-Flow

```mermaid
graph TB
    Start([App Start]) --> CheckUser{Erster<br/>Besuch?}
    
    CheckUser -->|Ja| Onboarding[Onboarding Flow]
    CheckUser -->|Nein| Home[Home Dashboard]
    
    Onboarding --> Welcome[Welcome Screen]
    Welcome --> FacultySelect[Fakultäts-Auswahl]
    FacultySelect --> FeatureTour[Feature Tour]
    FeatureTour --> Home
    
    Home --> Nav{Navigation}
    
    Nav --> Page1[🏠 Home]
    Nav --> Page2[📰 News Feed]
    Nav --> Page3[🏆 Challenges]
    Nav --> Page4[📊 Dashboard]
    Nav --> Page5[👥 Community]
    Nav --> Page6[🎁 Rewards]
    Nav --> Page7[👤 Profil]
    
    Page1 --> HomeActions[Quick Actions]
    Page1 --> DailyFeatures[Tägliche Features]
    
    HomeActions --> Bike[🚴 Fahrrad]
    HomeActions --> Recycle[♻️ Recycling]
    HomeActions --> Cup[🥤 Mehrweg]
    HomeActions --> Book[📚 Bücher]
    HomeActions --> Quiz[🧠 Quiz]
    
    DailyFeatures --> EcoCookie[Eco-Tipp]
    DailyFeatures --> Fortune[Fortune Cookie]
    
    Bike --> EarnCoins1[Coins verdienen]
    Recycle --> EarnCoins1
    Cup --> EarnCoins1
    Book --> EarnCoins1
    Quiz --> EarnCoins1
    
    EarnCoins1 --> UpdateProfile[Profil Update]
    UpdateProfile --> Home
    
    style Start fill:#10b981
    style Home fill:#10b981
    style EarnCoins1 fill:#f59e0b
    style UpdateProfile fill:#3b82f6
```

## Onboarding Flow (Detailliert)

```mermaid
graph LR
    Start([App Start]) --> Step1[Step 1:<br/>Welcome]
    
    Step1 --> Nav1{Navigation}
    Nav1 -->|Weiter| Step2[Step 2:<br/>Fakultät wählen]
    Nav1 -->|Überspringen| Home[Home]
    
    Step2 --> FacultyGrid[16 Fakultäten<br/>zur Auswahl]
    FacultyGrid --> SelectFaculty{Fakultät<br/>gewählt?}
    
    SelectFaculty -->|Ja| SaveFaculty[Speichern]
    SelectFaculty -->|Nein| FacultyGrid
    
    SaveFaculty --> Nav2{Navigation}
    Nav2 -->|Zurück| Step1
    Nav2 -->|Weiter| Step3[Step 3:<br/>Feature Tour]
    
    Step3 --> Features[App Features<br/>kennenlernen]
    Features --> Nav3{Navigation}
    
    Nav3 -->|Zurück| Step2
    Nav3 -->|Los geht's| Home
    
    Home --> Complete[✅ Onboarding<br/>abgeschlossen]
    
    style Start fill:#10b981
    style Complete fill:#10b981
    style SaveFaculty fill:#3b82f6
```

## Challenge-System Flow

```mermaid
graph TB
    Challenges[Challenges Page] --> ChallengeTypes{Challenge Status}
    
    ChallengeTypes --> Active[Aktive Challenges]
    ChallengeTypes --> Available[Verfügbare Challenges]
    ChallengeTypes --> Completed[Abgeschlossene]
    
    Available --> SelectChallenge[Challenge auswählen]
    SelectChallenge --> ChallengeDetail[Challenge Detail Modal]
    
    ChallengeDetail --> Start{Starten?}
    Start -->|Ja| ActivateChallenge[Challenge aktivieren]
    Start -->|Nein| Challenges
    
    ActivateChallenge --> Active
    
    Active --> DoAction[Aktionen durchführen]
    DoAction --> Track[Fortschritt tracken]
    
    Track --> CheckProgress{Ziel<br/>erreicht?}
    CheckProgress -->|Nein| DoAction
    CheckProgress -->|Ja| CompleteChallenge[Challenge abschließen]
    
    CompleteChallenge --> Reward[Belohnung erhalten]
    Reward --> AddCoins[Coins gutschreiben]
    AddCoins --> Animation[🎉 Animation]
    Animation --> Completed
    
    Completed --> ViewHistory[Historie ansehen]
    
    style Challenges fill:#f59e0b
    style Reward fill:#10b981
    style Animation fill:#ec4899
```

## Quick Actions Flow

```mermaid
graph TB
    Home[Home Dashboard] --> QuickActions[Quick Actions]
    
    QuickActions --> Action1[🚴 Fahrrad-Tracking]
    QuickActions --> Action2[♻️ Recycling Scanner]
    QuickActions --> Action3[🥤 Mehrwegbecher]
    QuickActions --> Action4[📚 Büchertausch]
    QuickActions --> Action5[🧠 Quiz]
    
    Action1 --> Modal1[Bike Modal]
    Modal1 --> GPS[GPS aktivieren]
    GPS --> StartTracking[Tracking starten]
    StartTracking --> RideInProgress[🚴 Fahrt läuft...]
    RideInProgress --> StopTracking{Fahrt<br/>beenden?}
    StopTracking -->|Ja| Calculate1[Distanz & Zeit<br/>berechnen]
    StopTracking -->|Nein| RideInProgress
    Calculate1 --> Coins1[Coins: 10-30]
    
    Action2 --> Modal2[Recycle Modal]
    Modal2 --> Camera[Kamera öffnen]
    Camera --> Scan[Item scannen]
    Scan --> Identify[Material erkennen]
    Identify --> Coins2[Coins: +15]
    
    Action3 --> Modal3[Cup Modal]
    Modal3 --> Confirm1[Nutzung bestätigen]
    Confirm1 --> Coins3[Coins: +5]
    
    Action4 --> Modal4[Book Exchange Modal]
    Modal4 --> BookAction{Aktion}
    BookAction --> Donate[Buch spenden]
    BookAction --> Exchange[Buch tauschen]
    Donate --> Coins4[Coins: +50]
    Exchange --> Coins4
    
    Action5 --> Modal5[Quiz Modal]
    Modal5 --> Questions[10 Fragen]
    Questions --> CheckAnswers{Alle<br/>richtig?}
    CheckAnswers -->|Ja| Coins5[Coins: +20]
    CheckAnswers -->|Nein| Coins6[Coins: +10]
    
    Coins1 --> UpdateCoins[Coins aktualisieren]
    Coins2 --> UpdateCoins
    Coins3 --> UpdateCoins
    Coins4 --> UpdateCoins
    Coins5 --> UpdateCoins
    Coins6 --> UpdateCoins
    
    UpdateCoins --> ChallengeUpdate[Challenge-Fortschritt<br/>aktualisieren]
    ChallengeUpdate --> PointsHistory[Punkte-Historie<br/>hinzufügen]
    PointsHistory --> ShowAnimation[🎊 Punkte-Animation]
    ShowAnimation --> Home
    
    style QuickActions fill:#3b82f6
    style UpdateCoins fill:#10b981
    style ShowAnimation fill:#ec4899
```

## Belohnungs-System Flow

```mermaid
graph TB
    Rewards[Rewards Page] --> Categories[Kategorien]
    
    Categories --> Cat1[Rabatte]
    Categories --> Cat2[Gutscheine]
    Categories --> Cat3[Events]
    Categories --> Cat4[Produkte]
    
    Cat1 --> RewardList1[Belohnungen anzeigen]
    Cat2 --> RewardList1
    Cat3 --> RewardList1
    Cat4 --> RewardList1
    
    RewardList1 --> SelectReward[Belohnung auswählen]
    SelectReward --> RewardDetail[Detail Modal]
    
    RewardDetail --> CheckCoins{Genug<br/>Coins?}
    
    CheckCoins -->|Nein| ShowError[❌ Nicht genug Coins]
    ShowError --> Rewards
    
    CheckCoins -->|Ja| RedeemConfirm[Einlösen bestätigen]
    RedeemConfirm --> ConfirmAction{Bestätigen?}
    
    ConfirmAction -->|Nein| Rewards
    ConfirmAction -->|Ja| ProcessRedeem[Belohnung einlösen]
    
    ProcessRedeem --> DeductCoins[Coins abziehen]
    DeductCoins --> GenerateCode[Code generieren]
    GenerateCode --> SaveHistory[In Historie speichern]
    SaveHistory --> ShowCode[✅ Code anzeigen]
    
    ShowCode --> RedeemHistory[Eingelöste Belohnungen]
    RedeemHistory --> ViewHistory[Historie ansehen]
    
    style Rewards fill:#f59e0b
    style ShowCode fill:#10b981
    style ShowError fill:#ef4444
```

## Community & Rangliste Flow

```mermaid
graph TB
    Community[Community Page] --> Tabs{Tab Auswahl}
    
    Tabs --> Tab1[Gesamtrangliste]
    Tabs --> Tab2[Fakultäts-Rangliste]
    Tabs --> Tab3[Freunde]
    
    Tab1 --> AllUsers[Alle User sortiert<br/>nach Coins]
    AllUsers --> ShowTop[Top 100 anzeigen]
    ShowTop --> UserPos[Eigene Position<br/>hervorheben]
    
    Tab2 --> AllFaculties[16 Fakultäten]
    AllFaculties --> FacultyRank[Nach Gesamt-Coins<br/>sortiert]
    FacultyRank --> OwnFaculty[Eigene Fakultät<br/>hervorheben]
    
    Tab3 --> FriendsView{Freunde}
    FriendsView --> FriendsList[Freundesliste]
    FriendsView --> Requests[Anfragen]
    FriendsView --> AddFriend[Freund hinzufügen]
    
    FriendsList --> FriendRank[Nach Coins sortiert]
    FriendRank --> FriendActions{Aktion}
    
    FriendActions --> Challenge[Challenge senden]
    FriendActions --> Remove[Entfernen]
    
    Challenge --> ChallengeModal[Friend Challenge Modal]
    ChallengeModal --> SelectActivity[Aktivität wählen]
    SelectActivity --> SetTarget[Ziel festlegen]
    SetTarget --> SendChallenge[Challenge senden]
    SendChallenge --> Notification[📱 Benachrichtigung]
    
    Requests --> PendingReq[Ausstehende Anfragen]
    PendingReq --> AcceptDecline{Aktion}
    AcceptDecline -->|Annehmen| AddToFriends[Zur Freundesliste]
    AcceptDecline -->|Ablehnen| DeleteReq[Anfrage löschen]
    
    AddFriend --> Search[User suchen]
    Search --> SendRequest[Anfrage senden]
    SendRequest --> Notification
    
    style Community fill:#a855f7
    style SendChallenge fill:#10b981
    style Notification fill:#3b82f6
```

## News & Events Flow

```mermaid
graph TB
    NewsFeed[News Feed Page] --> Filter{Filter}
    
    Filter --> ShowAll[Alle]
    Filter --> ShowNews[Nur News]
    Filter --> ShowEvents[Nur Events]
    
    ShowAll --> Display[Beiträge anzeigen]
    ShowNews --> Display
    ShowEvents --> Display
    
    Display --> NewsPost[News Post]
    Display --> EventPost[Event]
    
    NewsPost --> NewsActions{Aktion}
    NewsActions --> Like[👍 Like]
    NewsActions --> Comment[💬 Kommentar]
    
    Like --> UpdateLikes[Likes aktualisieren]
    UpdateLikes --> NewsFeed
    
    Comment --> CommentsModal[Comments Modal]
    CommentsModal --> ViewComments[Kommentare lesen]
    CommentsModal --> AddComment[Kommentar schreiben]
    AddComment --> PostComment[Absenden]
    PostComment --> UpdateComments[Kommentare aktualisieren]
    UpdateComments --> NewsFeed
    
    EventPost --> EventActions{Aktion}
    EventActions --> ViewDetails[Details ansehen]
    EventActions --> Register[Anmelden]
    
    ViewDetails --> EventModal[Event Detail Modal]
    EventModal --> CheckSpots{Plätze<br/>verfügbar?}
    
    CheckSpots -->|Nein| ShowFull[❌ Ausgebucht]
    ShowFull --> NewsFeed
    
    CheckSpots -->|Ja| RegisterEvent[Zur Anmeldung]
    Register --> RegisterEvent
    
    RegisterEvent --> ConfirmReg{Bestätigen?}
    ConfirmReg -->|Nein| NewsFeed
    ConfirmReg -->|Ja| AddToCalendar[Zu Kalender hinzufügen]
    AddToCalendar --> Notification[📱 Bestätigung]
    Notification --> EventCoins[Coins bei Teilnahme:<br/>30-100]
    
    style NewsFeed fill:#3b82f6
    style EventCoins fill:#10b981
    style Notification fill:#10b981
```

## Dashboard & Analytics Flow

```mermaid
graph TB
    Dashboard[Dashboard Page] --> Overview[Übersicht]
    
    Overview --> WeekProgress[Wöchentlicher Fortschritt]
    Overview --> CO2Stats[CO₂-Ersparnis]
    Overview --> ActivityStats[Aktivitätsstatistiken]
    Overview --> Achievements[Achievements]
    
    WeekProgress --> ProgressBar[Fortschrittsbalken]
    ProgressBar --> WeeklyGoal[Wochenziel: 150 Coins]
    WeeklyGoal --> CurrentCoins[Aktuelle Coins]
    
    CO2Stats --> Calculate[CO₂ berechnen]
    Calculate --> BikeData[Fahrrad-km × 0.5kg]
    Calculate --> RecycleData[Recycling × 0.3kg]
    Calculate --> TotalCO2[Gesamt CO₂ gespart]
    
    ActivityStats --> ActivityBreakdown{Nach Typ}
    ActivityBreakdown --> CyclingStats[🚴 Fahrrad]
    ActivityBreakdown --> RecycleStats[♻️ Recycling]
    ActivityBreakdown --> CupStats[🥤 Mehrweg]
    ActivityBreakdown --> OtherStats[Andere]
    
    Achievements --> Badges[Badges & Levels]
    Badges --> CheckMilestones{Meilensteine}
    CheckMilestones --> Bronze[🥉 Bronze]
    CheckMilestones --> Silver[🥈 Silber]
    CheckMilestones --> Gold[🥇 Gold]
    CheckMilestones --> Platinum[💎 Platin]
    
    Dashboard --> DetailViews{Detail-Ansichten}
    DetailViews --> ImpactInsights[Impact Insights Modal]
    DetailViews --> PointsHistory[Punkte-Historie]
    DetailViews --> ActivityHistory[Aktivitäts-Historie]
    
    ImpactInsights --> DetailedCharts[Detaillierte Charts]
    DetailedCharts --> MonthlyView[Monatsansicht]
    DetailedCharts --> YearlyView[Jahresansicht]
    
    style Dashboard fill:#8b5cf6
    style TotalCO2 fill:#10b981
    style Platinum fill:#f59e0b
```

## Profil & Einstellungen Flow

```mermaid
graph TB
    Profile[Profil Page] --> ProfileInfo[Profilinfo]
    
    ProfileInfo --> UserData[Name & Email]
    ProfileInfo --> FacultyInfo[Fakultät]
    ProfileInfo --> LevelInfo[Level & Streak]
    ProfileInfo --> CoinsDisplay[Eco Coins]
    
    Profile --> QuickStats[Schnellstatistiken]
    QuickStats --> TotalActivities[Gesamte Aktivitäten]
    QuickStats --> TotalCO2[Gesamt CO₂]
    QuickStats --> CurrentStreak[Aktueller Streak]
    
    Profile --> Settings[⚙️ Einstellungen]
    
    Settings --> SettingsPage[Settings Page]
    SettingsPage --> SettingsOptions{Einstellungen}
    
    SettingsOptions --> Language[Sprache]
    SettingsOptions --> Notifications[Benachrichtigungen]
    SettingsOptions --> DarkMode[Dark Mode]
    SettingsOptions --> Privacy[Datenschutz]
    SettingsOptions --> Account[Account]
    
    Language --> LangToggle{Wechseln}
    LangToggle -->|DE| SetGerman[Deutsch]
    LangToggle -->|EN| SetEnglish[English]
    SetGerman --> UpdateUI[UI aktualisieren]
    SetEnglish --> UpdateUI
    
    Notifications --> NotifSettings{Kategorien}
    NotifSettings --> ChallengeNotif[Challenges]
    NotifSettings --> NewsNotif[News & Events]
    NotifSettings --> CommunityNotif[Community]
    NotifSettings --> FriendNotif[Freunde]
    
    ChallengeNotif --> Toggle1[An/Aus]
    NewsNotif --> Toggle1
    CommunityNotif --> Toggle1
    FriendNotif --> Toggle1
    
    DarkMode --> ThemeToggle{Umschalten}
    ThemeToggle -->|Light| LightTheme[☀️ Light Mode]
    ThemeToggle -->|Dark| DarkTheme[🌙 Dark Mode]
    LightTheme --> ApplyTheme[Theme anwenden]
    DarkTheme --> ApplyTheme
    
    Privacy --> PrivacySettings{Optionen}
    PrivacySettings --> ProfileVisibility[Profil-Sichtbarkeit]
    PrivacySettings --> ActivityVisibility[Aktivitäten-Sichtbarkeit]
    PrivacySettings --> LocationData[Standortdaten]
    
    Account --> AccountOptions{Optionen}
    AccountOptions --> Logout[Abmelden]
    AccountOptions --> DeleteAccount[Account löschen]
    
    Logout --> ConfirmLogout{Bestätigen?}
    ConfirmLogout -->|Ja| ClearData[Daten löschen]
    ConfirmLogout -->|Nein| SettingsPage
    ClearData --> LoginScreen[Login Screen]
    
    style Profile fill:#3b82f6
    style DarkTheme fill:#1f2937
    style Logout fill:#ef4444
```

## Datenpersistenz Flow

```mermaid
graph TB
    AppData[App Daten] --> LocalStorage[localStorage]
    
    LocalStorage --> UserProfile[User-Profil]
    LocalStorage --> EcoCoins[Eco Coins]
    LocalStorage --> Challenges[Challenges]
    LocalStorage --> Activities[Aktivitäten]
    LocalStorage --> Settings[Einstellungen]
    LocalStorage --> Friends[Freunde]
    LocalStorage --> Rewards[Belohnungen]
    
    UserProfile --> ProfileData{Daten}
    ProfileData --> Name[Name]
    ProfileData --> Email[Email]
    ProfileData --> Faculty[Fakultät]
    ProfileData --> Level[Level]
    ProfileData --> Streak[Streak]
    ProfileData --> OnboardingDone[Onboarding Status]
    
    EcoCoins --> CoinsData{Daten}
    CoinsData --> TotalCoins[Gesamtmenge]
    CoinsData --> Transactions[Transaktionen]
    
    Challenges --> ChallengeData{Daten}
    ChallengeData --> ActiveChallenges[Aktive]
    ChallengeData --> Progress[Fortschritt]
    ChallengeData --> History[Historie]
    
    Activities --> ActivityData{Daten}
    ActivityData --> Cycling[Fahrrad-Fahrten]
    ActivityData --> Recycling[Recycling-Scans]
    ActivityData --> Cups[Mehrweg-Nutzungen]
    ActivityData --> Quizzes[Quiz-Teilnahmen]
    ActivityData --> Events[Event-Teilnahmen]
    ActivityData --> Books[Büchertausch]
    
    Settings --> SettingsData{Daten}
    SettingsData --> LanguagePref[Sprache]
    SettingsData --> DarkModePref[Dark Mode]
    SettingsData --> NotifPref[Benachrichtigungen]
    SettingsData --> PrivacyPref[Datenschutz]
    
    Friends --> FriendsData{Daten}
    FriendsData --> FriendsList[Freundesliste]
    FriendsData --> Requests[Anfragen]
    FriendsData --> FriendChallenges[Friend Challenges]
    
    Rewards --> RewardsData{Daten}
    RewardsData --> RedeemedRewards[Eingelöste]
    RewardsData --> RedeemHistory[Historie]
    RewardsData --> Codes[Codes]
    
    LocalStorage --> SaveData[Daten speichern]
    LocalStorage --> LoadData[Daten laden]
    
    SaveData --> OnChange[Bei Änderung]
    LoadData --> OnMount[Bei App-Start]
    
    style LocalStorage fill:#f59e0b
    style SaveData fill:#10b981
    style LoadData fill:#3b82f6
```

## Dark Mode Implementation

```mermaid
graph TB
    DarkMode[Dark Mode] --> Context[DarkModeContext]
    
    Context --> State[isDarkMode State]
    State --> Toggle[Toggle Funktion]
    
    Toggle --> Check{Aktueller<br/>Status?}
    Check -->|Light| SetDark[Dark Mode aktivieren]
    Check -->|Dark| SetLight[Light Mode aktivieren]
    
    SetDark --> UpdateDOM[DOM aktualisieren]
    SetLight --> UpdateDOM
    
    UpdateDOM --> AddClass[class='dark' zu html]
    UpdateDOM --> RemoveClass[class entfernen]
    
    AddClass --> ApplyStyles[Dark Mode Styles]
    RemoveClass --> ApplyStyles
    
    ApplyStyles --> Components[Alle Komponenten]
    
    Components --> Pages[Seiten]
    Components --> Modals[Modals]
    Components --> Cards[Cards]
    Components --> Navigation[Navigation]
    
    Pages --> TailwindClasses[Tailwind Dark Classes]
    Modals --> ModalHelper[modalDarkModeClasses]
    Cards --> TailwindClasses
    Navigation --> TailwindClasses
    
    TailwindClasses --> Example1[bg-white dark:bg-gray-800]
    TailwindClasses --> Example2[text-gray-900 dark:text-gray-100]
    TailwindClasses --> Example3[border-gray-200 dark:border-gray-700]
    
    ModalHelper --> ModalClasses{Helper Classes}
    ModalClasses --> ModalOverlay[modalOverlay]
    ModalClasses --> ModalContainer[modalContainer]
    ModalClasses --> ModalTitle[modalTitle]
    ModalClasses --> ModalText[modalText]
    ModalClasses --> ModalButton[modalButton]
    
    Context --> Persistence[localStorage]
    Persistence --> SavePref[Präferenz speichern]
    Persistence --> LoadPref[Präferenz laden]
    
    LoadPref --> OnAppStart[Bei App-Start]
    OnAppStart --> CheckSaved{Gespeichert?}
    CheckSaved -->|Ja| ApplySaved[Gespeicherte Einstellung]
    CheckSaved -->|Nein| UseDefault[Standard: Light]
    
    style DarkMode fill:#1f2937
    style SetDark fill:#1f2937
    style ApplyStyles fill:#3b82f6
```

---

## 🔍 Wie diese Flowcharts nutzen?

### Methode 1: GitHub/GitLab
Pushe diese Datei in dein Repository - Mermaid wird automatisch gerendert.

### Methode 2: Online-Tools
Kopiere den Mermaid-Code in eines dieser Tools:
- [Mermaid Live Editor](https://mermaid.live)
- [Mermaid Chart](https://www.mermaidchart.com/)
- [Draw.io](https://app.diagrams.net/) (unterstützt Mermaid Import)

### Methode 3: VS Code
Installiere die Extension "Markdown Preview Mermaid Support"

### Methode 4: Export als Bild
1. Gehe zu https://mermaid.live
2. Füge den Code ein
3. Klicke auf "Export" → PNG/SVG/PDF

---

**Tipp:** Die Flowcharts sind farbcodiert:
- 🟢 Grün (fill:#10b981) = Erfolg, Start, Abschluss
- 🟠 Orange (fill:#f59e0b) = Rewards, Belohnungen
- 🔵 Blau (fill:#3b82f6) = Aktionen, Updates
- 🟣 Lila (fill:#a855f7) = Community, Social
- 🔴 Rot (fill:#ef4444) = Fehler, Abbruch
- ⚫ Dunkelgrau (fill:#1f2937) = Dark Mode
