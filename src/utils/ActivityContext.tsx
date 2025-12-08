import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Activity {
  id: string;
  action: string;
  actionEn: string;
  coins: number;
  date: string;
  timestamp: number;
  type: "bike" | "recycle" | "reusable" | "quiz" | "event" | "challenge" | "reward";
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void;
  getTotalCoins: () => number;
  getActivitiesByDate: (daysAgo: number) => Activity[];
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "1",
    action: "Fahrrad-Challenge abgeschlossen",
    actionEn: "Bike Challenge completed",
    coins: 50,
    date: "Heute",
    timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
    type: "bike",
  },
  {
    id: "2",
    action: "Mehrweg-Becher genutzt",
    actionEn: "Reusable cup used",
    coins: 5,
    date: "Heute",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
    type: "reusable",
  },
  {
    id: "3",
    action: "Quiz absolviert",
    actionEn: "Quiz completed",
    coins: 20,
    date: "Gestern",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    type: "quiz",
  },
  {
    id: "4",
    action: "Pfandbon gescannt",
    actionEn: "Deposit slip scanned",
    coins: 15,
    date: "Gestern",
    timestamp: Date.now() - 1000 * 60 * 60 * 26, // 26 hours ago
    type: "recycle",
  },
  {
    id: "5",
    action: "Fahrrad-Fahrt: 5.2 km",
    actionEn: "Bike ride: 5.2 km",
    coins: 25,
    date: "Vor 2 Tagen",
    timestamp: Date.now() - 1000 * 60 * 60 * 48, // 2 days ago
    type: "bike",
  },
  {
    id: "6",
    action: "Event besucht",
    actionEn: "Event attended",
    coins: 30,
    date: "Vor 3 Tagen",
    timestamp: Date.now() - 1000 * 60 * 60 * 72, // 3 days ago
    type: "event",
  },
  {
    id: "7",
    action: "Mehrweg-Becher genutzt",
    actionEn: "Reusable cup used",
    coins: 5,
    date: "Vor 3 Tagen",
    timestamp: Date.now() - 1000 * 60 * 60 * 74, // 3 days ago
    type: "reusable",
  },
  {
    id: "8",
    action: "Recycling-Challenge abgeschlossen",
    actionEn: "Recycling Challenge completed",
    coins: 40,
    date: "Vor 5 Tagen",
    timestamp: Date.now() - 1000 * 60 * 60 * 120, // 5 days ago
    type: "challenge",
  },
  {
    id: "9",
    action: "Quiz absolviert",
    actionEn: "Quiz completed",
    coins: 20,
    date: "Vor 6 Tagen",
    timestamp: Date.now() - 1000 * 60 * 60 * 144, // 6 days ago
    type: "quiz",
  },
  {
    id: "10",
    action: "Fahrrad-Fahrt: 8.7 km",
    actionEn: "Bike ride: 8.7 km",
    coins: 43,
    date: "Vor einer Woche",
    timestamp: Date.now() - 1000 * 60 * 60 * 168, // 7 days ago
    type: "bike",
  },
];

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Load activities from localStorage or use initial data
    const loadActivities = () => {
      const savedActivities = localStorage.getItem("userActivities");
      if (savedActivities) {
        setActivities(JSON.parse(savedActivities));
      } else {
        setActivities(INITIAL_ACTIVITIES);
        localStorage.setItem("userActivities", JSON.stringify(INITIAL_ACTIVITIES));
      }
    };

    loadActivities();

    // Listen for custom event when activities are updated (e.g., when rewards are redeemed)
    const handleActivitiesUpdate = () => {
      loadActivities();
    };

    window.addEventListener("activitiesUpdated", handleActivitiesUpdate);
    
    return () => {
      window.removeEventListener("activitiesUpdated", handleActivitiesUpdate);
    };
  }, []);

  const addActivity = (activity: Omit<Activity, "id" | "timestamp">) => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };

    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem("userActivities", JSON.stringify(updatedActivities));
  };

  const getTotalCoins = () => {
    return activities.reduce((total, activity) => total + activity.coins, 0);
  };

  const getActivitiesByDate = (daysAgo: number) => {
    const cutoffTime = Date.now() - daysAgo * 24 * 60 * 60 * 1000;
    return activities.filter((activity) => activity.timestamp >= cutoffTime);
  };

  return (
    <ActivityContext.Provider
      value={{ activities, addActivity, getTotalCoins, getActivitiesByDate }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivities must be used within ActivityProvider");
  }
  return context;
}