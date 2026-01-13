export type Language = "de" | "en";

export interface Translations {
  // Navigation
  nav: {
    home: string;
    newsfeed: string;
    challenges: string;
    dashboard: string;
    community: string;
    rewards: string;
    profile: string;
    settings: string;
  };
  // Common
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    back: string;
    next: string;
    finish: string;
    close: string;
    coins: string;
    points: string;
    continue: string;
  };
  // Onboarding
  onboarding: {
    welcome: string;
    welcomeSubtitle: string;
    completeChallenges: string;
    collectCoins: string;
    redeemRewards: string;
    letsGo: string;
    login: string;
    loginSubtitle: string;
    email: string;
    password: string;
    signIn: string;
    permissions: string;
    permissionsSubtitle: string;
    gps: string;
    gpsDesc: string;
    camera: string;
    cameraDesc: string;
    gallery: string;
    galleryDesc: string;
    grantPermissions: string;
    createProfile: string;
    createProfileSubtitle: string;
    fullName: string;
    studyProgram: string;
    semester: string;
    faculty: string;
    selectFaculty: string;
    introduction: string;
    introSubtitle: string;
    step1: string;
    step1Desc: string;
    step2: string;
    step2Desc: string;
    step3: string;
    step3Desc: string;
    startApp: string;
    privacyNote: string;
    loginHelp: string;
    help: string;
    readyMessage: string;
  };
  // Profile
  profile: {
    title: string;
    level: string;
    rank: string;
    badges: string;
    yourProfile: string;
    editProfile: string;
    name: string;
    studyProgram: string;
    faculty: string;
    yourBadges: string;
    recentActivities: string;
    yourImpact: string;
    co2Saved: string;
    waterSaved: string;
    reusableUsed: string;
    bikeKm: string;
    resetOnboarding: string;
    resetOnboardingDesc: string;
    shareProfile: string;
    shareProfileDesc: string;
    history: string;
    referralCode: string;
    inviteFriends: string;
    copyCode: string;
    copied: string;
  };
  // Settings
  settings: {
    title: string;
    language: string;
    languageDesc: string;
    notifications: string;
    notificationsDesc: string;
    privacy: string;
    privacyDesc: string;
    about: string;
    aboutDesc: string;
    german: string;
    english: string;
    personalData: string;
    personalDataDesc: string;
    editPersonalData: string;
    pushNotifications: string;
    emailNotifications: string;
    challengeReminders: string;
    environment: string;
    friends: string;
    friendsDesc: string;
    legal: string;
    legalDesc: string;
  };
  // Challenges
  challenges: {
    title: string;
    subtitle: string;
    active: string;
    available: string;
    completed: string;
    progress: string;
    reward: string;
    start: string;
    cancel: string;
    open: string;
    yourStats: string;
    total: string;
    completedChallenges: string;
    activeChallenges: string;
    totalReward: string;
    details: string;
    actions: string;
    cancelChallenge: string;
    confirmCancel: string;
    week: string;
    day: string;
    days: string;
  };
  // Home
  home: {
    welcome: string;
    welcomeBack: string;
    yourBalance: string;
    todayActions: string;
    weeklyGoal: string;
    quickActions: string;
    bikeTracking: string;
    bikeDesc: string;
    recycleNow: string;
    recycleDesc: string;
    reusableCup: string;
    reusableDesc: string;
    quickQuiz: string;
    quizDesc: string;
    events: string;
    eventsDesc: string;
    fortuneCookie: string;
    cookieDesc: string;
    featuredChallenges: string;
    viewAll: string;
    recentNews: string;
    popularWithStudents: string;
  };
  // Rewards
  rewards: {
    title: string;
    subtitle: string;
    yourBalance: string;
    available: string;
    redeemed: string;
    redeem: string;
    coinsNeeded: string;
    inStock: string;
    outOfStock: string;
    popular: string;
    recent: string;
  };
  // Dashboard
  dashboard: {
    title: string;
    subtitle: string;
    overview: string;
    thisWeek: string;
    thisMonth: string;
    allTime: string;
    collected: string;
    spent: string;
    challengesCompleted: string;
    currentStreak: string;
    impact: string;
    activity: string;
    achievements: string;
    totalContribution: string;
    aboveAverage: string;
  };
  // Community
  community: {
    title: string;
    subtitle: string;
    leaderboard: string;
    thisWeek: string;
    allTime: string;
    rank: string;
    you: string;
    recent: string;
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    viewProfile: string;
  };
  // News
  news: {
    title: string;
    subtitle: string;
    latest: string;
    events: string;
    tips: string;
    readMore: string;
    ago: string;
    registerForEvent: string;
    registered: string;
    eventRegistered: string;
    participateToEarn: string;
  };
  // Friends
  friends: {
    title: string;
    subtitle: string;
    myFriends: string;
    addFriends: string;
    searchFriends: string;
    searchPlaceholder: string;
    inviteFriends: string;
    inviteDesc: string;
    referralLink: string;
    copyLink: string;
    shareLink: string;
    linkCopied: string;
    noFriends: string;
    noFriendsDesc: string;
    sendRequest: string;
    pending: string;
    friends: string;
    level: string;
    addFriend: string;
    inviteReward: string;
  };
  // Legal
  legal: {
    title: string;
    subtitle: string;
    imprint: string;
    imprintDesc: string;
    privacy: string;
    privacyDesc: string;
    terms: string;
    termsDesc: string;
    company: string;
    address: string;
    contact: string;
    email: string;
    phone: string;
    representative: string;
    registrationNumber: string;
    taxId: string;
    responsibleForContent: string;
  };
}

export const translations: Record<Language, Translations> = {
  de: {
    nav: {
      home: "Home",
      newsfeed: "Newsfeed",
      challenges: "Challenges",
      dashboard: "Dashboard",
      community: "Community",
      rewards: "Belohnungen",
      profile: "Profil",
      settings: "Einstellungen",
    },
    common: {
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      back: "Zurück",
      next: "Weiter",
      finish: "Fertig",
      close: "Schließen",
      coins: "Coins",
      points: "Punkte",
      continue: "Fortsetzen",
    },
    onboarding: {
      welcome: "Willkommen bei Eco Coins!",
      welcomeSubtitle:
        "Sammle Punkte für nachhaltige Aktionen an deiner Hochschule und trage aktiv zum Umweltschutz bei! 🌍",
      completeChallenges: "Challenges abschließen",
      collectCoins: "Eco Coins sammeln",
      redeemRewards: "Belohnungen einlösen",
      letsGo: "Los geht's!",
      login: "HM-Account Login",
      loginSubtitle: "Melde dich mit deinem Hochschul-Account an",
      email: "E-Mail (HM-Account)",
      password: "Passwort",
      signIn: "Anmelden",
      permissions: "Berechtigungen",
      permissionsSubtitle: "Erlaube der App Zugriff für alle Funktionen",
      gps: "GPS / Standort",
      gpsDesc: "Für Fahrrad-Tracking",
      camera: "Kamera",
      cameraDesc: "Für QR-Code Scan",
      gallery: "Galerie",
      galleryDesc: "Für Foto-Uploads",
      grantPermissions: "Berechtigungen erteilen",
      createProfile: "Profil anlegen",
      createProfileSubtitle: "Vervollständige dein Profil",
      fullName: "Vollständiger Name",
      studyProgram: "Studiengang",
      semester: "Semester",
      faculty: "Fakultät",
      selectFaculty: "Fakultät auswählen",
      introduction: "So funktioniert's",
      introSubtitle: "Dein Weg zu mehr Nachhaltigkeit",
      step1: "Nachhaltig handeln",
      step1Desc: "Fahre Fahrrad, recycle, nutze Mehrwegbecher",
      step2: "Challenges erfüllen",
      step2Desc: "Schließe wöchentliche Challenges ab",
      step3: "Belohnungen sichern",
      step3Desc: "Löse Eco Coins gegen tolle Prämien ein",
      startApp: "App starten!",
      privacyNote:
        "🔒 Deine Daten bleiben privat und werden nur für App-Funktionen verwendet.",
      loginHelp: "Probleme beim Login?",
      help: "Hilfe",
      readyMessage: "🎉 Bereit für deine erste Aktion?",
    },
    profile: {
      title: "Profil",
      level: "Level",
      rank: "Rang",
      badges: "Badges",
      yourProfile: "Dein Profil",
      editProfile: "Profil bearbeiten",
      name: "Name",
      studyProgram: "Studiengang",
      faculty: "Fakultät",
      yourBadges: "Deine Badges",
      recentActivities: "Letzte Aktivitäten",
      yourImpact: "Dein Beitrag",
      co2Saved: "CO₂ eingespart",
      waterSaved: "Wasser gespart",
      reusableUsed: "Mehrweg genutzt",
      bikeKm: "Fahrrad-Kilometer",
      resetOnboarding: "Onboarding zurücksetzen",
      resetOnboardingDesc: "Einführung erneut anzeigen",
      shareProfile: "Profil teilen",
      shareProfileDesc: "Teile deine Erfolge",
      history: "Verlauf",
      referralCode: "Empfehlungscode",
      inviteFriends: "Freunde einladen & 50 Eco Coins erhalten!",
      copyCode: "Code kopieren",
      copied: "Kopiert!",
    },
    settings: {
      title: "Einstellungen",
      language: "Sprache",
      languageDesc: "App-Sprache ändern",
      notifications: "Benachrichtigungen",
      notificationsDesc: "Push-Benachrichtigungen verwalten",
      privacy: "Datenschutz",
      privacyDesc: "Datenschutzeinstellungen",
      about: "Über",
      aboutDesc: "App-Version und Informationen",
      german: "Deutsch",
      english: "English",
      personalData: "Persönliche Daten",
      personalDataDesc: "Profildaten bearbeiten",
      editPersonalData: "Daten bearbeiten",
      pushNotifications: "Push-Benachrichtigungen",
      emailNotifications: "E-Mail-Benachrichtigungen",
      challengeReminders: "Challenge-Erinnerungen",
      environment: "Gemeinsam für die Umwelt! 🌍",
      friends: "Freunde",
      friendsDesc: "Freunde verwalten und einladen",
      legal: "Rechtliches",
      legalDesc: "Impressum und rechtliche Informationen",
    },
    challenges: {
      title: "Challenges",
      subtitle: "Schließe Challenges ab und sammle Eco Coins!",
      active: "Aktive Challenges",
      available: "Verfügbare Challenges",
      completed: "Abgeschlossene Challenges",
      progress: "Fortschritt",
      reward: "Belohnung",
      start: "Challenge starten",
      cancel: "Challenge abbrechen",
      open: "öffnen",
      yourStats: "Deine Challenge-Statistik",
      total: "Gesamt",
      completedChallenges: "Abgeschlossen",
      activeChallenges: "Aktiv",
      totalReward: "Gesammelt",
      details: "Details",
      actions: "Aktionen",
      cancelChallenge: "Abbrechen",
      confirmCancel: "Möchtest du diese Challenge wirklich abbrechen?",
      week: "Woche",
      day: "Tag",
      days: "Tage",
    },
    home: {
      welcome: "Willkommen",
      welcomeBack: "Willkommen zurück",
      yourBalance: "Dein Kontostand",
      todayActions: "Heutige Aktionen",
      weeklyGoal: "Wochenziel",
      quickActions: "Schnellaktionen",
      bikeTracking: "Fahrrad-Tracking",
      bikeDesc: "Starte deine Fahrt",
      recycleNow: "Jetzt recyceln",
      recycleDesc: "QR-Code scannen",
      reusableCup: "Mehrwegbecher",
      reusableDesc: "Scan & verdiene",
      quickQuiz: "Schnell-Quiz",
      quizDesc: "Wissen testen",
      events: "Events",
      eventsDesc: "Teilnehmen",
      fortuneCookie: "Eco-Cookie",
      cookieDesc: "Tipp des Tages",
      featuredChallenges: "Empfohlene Challenges",
      viewAll: "Alle anzeigen",
      recentNews: "Neueste Nachrichten",
      popularWithStudents: "Beliebt bei Studierenden",
    },
    rewards: {
      title: "Belohnungen",
      subtitle: "Löse deine Eco Coins gegen tolle Prämien ein!",
      yourBalance: "Dein Guthaben",
      available: "Verfügbar",
      redeemed: "Eingelöst",
      redeem: "Einlösen",
      coinsNeeded: "Benötigt",
      inStock: "Auf Lager",
      outOfStock: "Ausverkauft",
      popular: "Beliebt",
      recent: "Kürzlich eingelöst",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Deine Nachhaltigkeits-Statistiken",
      overview: "Übersicht",
      thisWeek: "Diese Woche",
      thisMonth: "Dieser Monat",
      allTime: "Gesamt",
      collected: "Gesammelt",
      spent: "Ausgegeben",
      challengesCompleted: "Challenges abgeschlossen",
      currentStreak: "Aktuelle Serie",
      impact: "Dein Impact",
      activity: "Aktivität",
      achievements: "Erfolge",
      totalContribution: "Gesamte Beiträge",
      aboveAverage: "Überdurchschnittlich",
    },
    community: {
      title: "Community",
      subtitle: "Vergleiche dich mit anderen Studierenden",
      leaderboard: "Rangliste",
      thisWeek: "Diese Woche",
      allTime: "Gesamt",
      rank: "Rang",
      you: "Du",
      recent: "Kürzlich",
      justNow: "Gerade eben",
      minutesAgo: "vor Minuten",
      hoursAgo: "vor Stunden",
      viewProfile: "Profil ansehen",
    },
    news: {
      title: "Newsfeed",
      subtitle: "Bleib auf dem Laufenden",
      latest: "Neueste",
      events: "Events",
      tips: "Tipps",
      readMore: "Mehr lesen",
      ago: "vor",
      registerForEvent: "Anmelden",
      registered: "Angemeldet",
      eventRegistered: "Erfolgreich angemeldet!",
      participateToEarn: "Teilnehmen und Coins verdienen",
    },
    friends: {
      title: "Freunde",
      subtitle: "Vernetze dich und sammle gemeinsam Punkte",
      myFriends: "Meine Freunde",
      addFriends: "Freunde hinzufügen",
      searchFriends: "Freunde suchen",
      searchPlaceholder: "Name eingeben...",
      inviteFriends: "Freunde einladen",
      inviteDesc: "Lade deine Freunde ein und erhalte Belohnungen!",
      referralLink: "Einladungslink",
      copyLink: "Kopieren",
      shareLink: "Teilen",
      linkCopied: "Kopiert!",
      noFriends: "Noch keine Freunde",
      noFriendsDesc: "Lade Freunde ein oder suche nach anderen Nutzern",
      sendRequest: "Anfrage senden",
      pending: "Ausstehend",
      friends: "Freunde",
      level: "Level",
      addFriend: "Hinzufügen",
      inviteReward: "Erhalte 50 Eco Coins pro Einladung!",
    },
    legal: {
      title: "Legal",
      subtitle: "Imprint and legal information",
      imprint: "Imprint",
      imprintDesc: "Information about the provider",
      privacy: "Privacy Policy",
      privacyDesc: "How we protect your data",
      terms: "Terms of Service",
      termsDesc: "Conditions for app usage",
      company: "Company",
      address: "Address",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      representative: "Authorized Representative",
      registrationNumber: "Commercial Register Number",
      taxId: "VAT ID",
      responsibleForContent: "Responsible for Content",
    },
  },
  en: {
    nav: {
      home: "Home",
      newsfeed: "Newsfeed & Events",
      challenges: "Challenges",
      dashboard: "Dashboard",
      community: "Community",
      rewards: "Rewards",
      profile: "Profile",
      settings: "Settings",
    },
    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      back: "Back",
      next: "Next",
      finish: "Finish",
      close: "Close",
      coins: "Coins",
      points: "Points",
      continue: "Continue",
    },
    onboarding: {
      welcome: "Welcome to Eco Coins!",
      welcomeSubtitle:
        "Collect points for sustainable actions at your university and actively contribute to environmental protection! 🌍",
      completeChallenges: "Complete challenges",
      collectCoins: "Collect Eco Coins",
      redeemRewards: "Redeem rewards",
      letsGo: "Let's go!",
      login: "HM Account Login",
      loginSubtitle: "Sign in with your university account",
      email: "Email (HM Account)",
      password: "Password",
      signIn: "Sign In",
      permissions: "Permissions",
      permissionsSubtitle: "Allow the app access for all features",
      gps: "GPS / Location",
      gpsDesc: "For bike tracking",
      camera: "Camera",
      cameraDesc: "For QR code scan",
      gallery: "Gallery",
      galleryDesc: "For photo uploads",
      grantPermissions: "Grant Permissions",
      createProfile: "Create Profile",
      createProfileSubtitle: "Complete your profile",
      fullName: "Full Name",
      studyProgram: "Study Program",
      semester: "Semester",
      faculty: "Faculty",
      selectFaculty: "Select Faculty",
      introduction: "How it works",
      introSubtitle: "Your path to more sustainability",
      step1: "Act sustainably",
      step1Desc: "Bike, recycle, use reusable cups",
      step2: "Complete challenges",
      step2Desc: "Finish weekly challenges",
      step3: "Claim rewards",
      step3Desc: "Redeem Eco Coins for great prizes",
      startApp: "Start App!",
      privacyNote:
        "🔒 Your data remains private and is only used for app features.",
      loginHelp: "Problems logging in?",
      help: "Help",
      readyMessage: "🎉 Ready for your first action?",
    },
    profile: {
      title: "Profile",
      level: "Level",
      rank: "Rank",
      badges: "Badges",
      yourProfile: "Your Profile",
      editProfile: "Edit Profile",
      name: "Name",
      studyProgram: "Study Program",
      faculty: "Faculty",
      yourBadges: "Your Badges",
      recentActivities: "Recent Activities",
      yourImpact: "Your Impact",
      co2Saved: "CO₂ saved",
      waterSaved: "Water saved",
      reusableUsed: "Reusable used",
      bikeKm: "Bike kilometers",
      resetOnboarding: "Reset Onboarding",
      resetOnboardingDesc: "Show introduction again",
      shareProfile: "Share Profile",
      shareProfileDesc: "Share your achievements",
      history: "History",
      referralCode: "Referral Code",
      inviteFriends: "Invite friends & get 50 Eco Coins!",
      copyCode: "Copy code",
      copied: "Copied!",
    },
    settings: {
      title: "Settings",
      language: "Language",
      languageDesc: "Change app language",
      notifications: "Notifications",
      notificationsDesc: "Manage push notifications",
      privacy: "Privacy",
      privacyDesc: "Privacy settings",
      about: "About",
      aboutDesc: "App version and information",
      german: "Deutsch",
      english: "English",
      personalData: "Personal Data",
      personalDataDesc: "Edit profile data",
      editPersonalData: "Edit Data",
      pushNotifications: "Push Notifications",
      emailNotifications: "Email Notifications",
      challengeReminders: "Challenge Reminders",
      environment: "Together for the environment! 🌍",
      friends: "Friends",
      friendsDesc: "Friend management",
      legal: "Legal",
      legalDesc: "Imprint, Privacy Policy, and Terms of Service",
    },
    challenges: {
      title: "Challenges",
      subtitle: "Complete challenges and collect Eco Coins!",
      active: "Active Challenges",
      available: "Available Challenges",
      completed: "Completed Challenges",
      progress: "Progress",
      reward: "Reward",
      start: "Start Challenge",
      cancel: "Cancel Challenge",
      open: "open",
      yourStats: "Your Challenge Stats",
      total: "Total",
      completedChallenges: "Completed",
      activeChallenges: "Active",
      totalReward: "Collected",
      details: "Details",
      actions: "Actions",
      cancelChallenge: "Cancel",
      confirmCancel: "Do you really want to cancel this challenge?",
      week: "Week",
      day: "Day",
      days: "Days",
    },
    home: {
      welcome: "Welcome",
      welcomeBack: "Welcome back",
      yourBalance: "Your Balance",
      todayActions: "Today's Actions",
      weeklyGoal: "Weekly Goal",
      quickActions: "Quick Actions",
      bikeTracking: "Bike Tracking",
      bikeDesc: "Start your ride",
      recycleNow: "Recycle Now",
      recycleDesc: "Scan QR code",
      reusableCup: "Reusable Cup",
      reusableDesc: "Scan & earn",
      quickQuiz: "Quick Quiz",
      quizDesc: "Test your knowledge",
      events: "Events",
      eventsDesc: "Participate",
      fortuneCookie: "Eco Cookie",
      cookieDesc: "Tip of the day",
      featuredChallenges: "Featured Challenges",
      viewAll: "View all",
      recentNews: "Recent News",
      popularWithStudents: "Popular with Students",
    },
    rewards: {
      title: "Rewards",
      subtitle: "Redeem your Eco Coins for great prizes!",
      yourBalance: "Your Balance",
      available: "Available",
      redeemed: "Redeemed",
      redeem: "Redeem",
      coinsNeeded: "Required",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      popular: "Popular",
      recent: "Recently redeemed",
    },
    dashboard: {
      title: "Dashboard",
      subtitle: "Your Sustainability Statistics",
      overview: "Overview",
      thisWeek: "This Week",
      thisMonth: "This Month",
      allTime: "All Time",
      collected: "Collected",
      spent: "Spent",
      challengesCompleted: "Challenges Completed",
      currentStreak: "Current Streak",
      impact: "Your Impact",
      activity: "Activity",
      achievements: "Achievements",
      totalContribution: "Total Contribution",
      aboveAverage: "Above Average",
    },
    community: {
      title: "Community",
      subtitle: "Compare yourself with other students",
      leaderboard: "Leaderboard",
      thisWeek: "This Week",
      allTime: "All Time",
      rank: "Rank",
      you: "You",
      recent: "Recent",
      justNow: "Just now",
      minutesAgo: "minutes ago",
      hoursAgo: "hours ago",
      viewProfile: "View profile",
    },
    news: {
      title: "Newsfeed",
      subtitle: "Stay up to date",
      latest: "Latest",
      events: "Events",
      tips: "Tips",
      readMore: "Read more",
      ago: "ago",
      registerForEvent: "Register",
      registered: "Registered",
      eventRegistered: "Successfully registered!",
      participateToEarn: "Participate and earn coins",
    },
    friends: {
      title: "Friends",
      subtitle: "Connect and collect points together",
      myFriends: "My Friends",
      addFriends: "Add Friends",
      searchFriends: "Search Friends",
      searchPlaceholder: "Enter name...",
      inviteFriends: "Invite Friends",
      inviteDesc: "Invite your friends and get rewards!",
      referralLink: "Invitation Link",
      copyLink: "Copy",
      shareLink: "Share",
      linkCopied: "Copied!",
      noFriends: "No friends yet",
      noFriendsDesc: "Invite friends or search for other users",
      sendRequest: "Send Request",
      pending: "Pending",
      friends: "Friends",
      level: "Level",
      addFriend: "Add",
      inviteReward: "Get 50 Eco Coins per invitation!",
    },
    legal: {
      title: "Legal",
      subtitle: "Imprint and legal information",
      imprint: "Imprint",
      imprintDesc: "Information about the provider",
      privacy: "Privacy Policy",
      privacyDesc: "How we protect your data",
      terms: "Terms of Service",
      termsDesc: "Conditions for app usage",
      company: "Company",
      address: "Address",
      contact: "Contact",
      email: "Email",
      phone: "Phone",
      representative: "Authorized Representative",
      registrationNumber: "Commercial Register Number",
      taxId: "VAT ID",
      responsibleForContent: "Responsible for Content",
    },
  },
};

export function getTranslation(language: Language): Translations {
  return translations[language];
}