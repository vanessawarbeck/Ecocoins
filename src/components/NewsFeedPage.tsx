import { motion } from "motion/react";
import { Newspaper, Heart, MessageCircle, Share2, Bookmark, TrendingUp, Calendar, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";
import { useLanguage } from "../utils/LanguageContext";
import { toast } from "sonner@2.0.3";
import { useActivities } from "../utils/ActivityContext";
import { updateChallengeProgress } from "../utils/challengeManager";

interface NewsItem {
  id: number;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
  category: string;
  categoryEn: string;
  icon: string;
  image?: string;
  author: string;
  authorEn: string;
  time: string;
  timeEn: string;
  likes: number;
  comments: number;
  color: string;
  isEvent?: boolean;
  eventDate?: string;
  eventDateEn?: string;
  eventLocation?: string;
  eventLocationEn?: string;
  eventCoins?: number;
}

export function NewsFeedPage() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [savedPosts, setSavedPosts] = useState<number[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>(() => {
    const saved = localStorage.getItem("registeredEvents");
    return saved ? JSON.parse(saved) : [];
  });
  const { t, language } = useLanguage();
  const { addActivity } = useActivities();

  const news: NewsItem[] = [
    {
      id: 1,
      title: "Neuer Recycling-Rekord am Campus!",
      titleEn: "New Recycling Record on Campus!",
      content: "Diese Woche haben Studierende und Mitarbeitende zusammen über 500kg Recycling-Material gesammelt. Das ist ein neuer Rekord! 🎉",
      contentEn: "This week students and staff collected over 500kg of recyclable materials together. That's a new record! 🎉",
      category: "Erfolg",
      categoryEn: "Success",
      icon: "♻️",
      author: "Nachhaltigkeitsteam",
      authorEn: "Sustainability Team",
      time: "vor 2 Stunden",
      timeEn: "2 hours ago",
      likes: 156,
      comments: 23,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      title: "Fahrrad-Challenge startet nächste Woche",
      titleEn: "Bike Challenge Starts Next Week",
      content: "Ab Montag läuft die große Fahrrad-Challenge! Sammle extra Punkte und gewinne tolle Preise. Melde dich jetzt an!",
      contentEn: "Starting Monday, the big bike challenge begins! Collect extra points and win great prizes. Sign up now!",
      category: "Challenge",
      categoryEn: "Challenge",
      icon: "🚴",
      author: "Events Team",
      authorEn: "Events Team",
      time: "vor 5 Stunden",
      timeEn: "5 hours ago",
      likes: 234,
      comments: 45,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      title: "Neue Mehrweg-Automaten in der Mensa",
      titleEn: "New Reusable Vending Machines in the Cafeteria",
      content: "Die Mensa hat neue Mehrweg-Automaten installiert! Hol dir deinen Becher ab und spare Plastikmüll. Die ersten 100 Nutzer bekommen 20 Bonus-Coins!",
      contentEn: "The cafeteria has installed new reusable vending machines! Get your cup and save plastic waste. The first 100 users get 20 bonus coins!",
      category: "News",
      categoryEn: "News",
      icon: "🥤",
      author: "Campus News",
      authorEn: "Campus News",
      time: "vor 1 Tag",
      timeEn: "1 day ago",
      likes: 89,
      comments: 12,
      color: "from-amber-500 to-orange-600",
    },
    {
      id: 4,
      title: "Workshop: Zero Waste im Alltag",
      titleEn: "Workshop: Zero Waste in Everyday Life",
      content: "Lerne praktische Tipps für ein nachhaltigeres Leben. Nächster Workshop am Donnerstag, 15:00 Uhr im Raum A101. Anmeldung noch möglich!",
      contentEn: "Learn practical tips for a more sustainable life. Next workshop on Thursday, 3:00 PM in room A101. Registration still open!",
      category: "Event",
      categoryEn: "Event",
      icon: "📚",
      author: "Nachhaltigkeitsreferat",
      authorEn: "Sustainability Office",
      time: "vor 1 Tag",
      timeEn: "1 day ago",
      likes: 67,
      comments: 8,
      color: "from-purple-500 to-purple-600",
      isEvent: true,
      eventDate: "Donnerstag, 5. Dez, 15:00",
      eventDateEn: "Thursday, Dec 5, 3:00 PM",
      eventLocation: "Raum A101",
      eventLocationEn: "Room A101",
      eventCoins: 30,
    },
    {
      id: 5,
      title: "Top 10 Eco-Warriors diese Woche",
      titleEn: "Top 10 Eco-Warriors This Week",
      content: "Glückwunsch an alle, die es in die Top 10 geschafft haben! Besonders Anna Schmidt mit 847 Coins diese Woche. Weiter so! 🏆",
      contentEn: "Congratulations to all who made it into the top 10! Especially Anna Schmidt with 847 coins this week. Keep it up! 🏆",
      category: "Community",
      categoryEn: "Community",
      icon: "👥",
      author: "Community Manager",
      authorEn: "Community Manager",
      time: "vor 2 Tagen",
      timeEn: "2 days ago",
      likes: 312,
      comments: 56,
      color: "from-pink-500 to-rose-600",
    },
    {
      id: 6,
      title: "Campus erreicht 10.000 kg CO₂-Einsparung",
      titleEn: "Campus Reaches 10,000 kg CO₂ Savings",
      content: "Gemeinsam haben wir die 10 Tonnen CO₂-Einsparung erreicht! Das ist ein großartiger Meilenstein. Danke an alle für euren Beitrag! 🌍💚",
      contentEn: "Together we have reached the 10 ton CO₂ savings! That's a great milestone. Thank you all for your contribution! 🌍💚",
      category: "Meilenstein",
      categoryEn: "Milestone",
      icon: "🌍",
      author: "Nachhaltigkeitsteam",
      authorEn: "Sustainability Team",
      time: "vor 3 Tagen",
      timeEn: "3 days ago",
      likes: 445,
      comments: 78,
      color: "from-emerald-500 to-green-600",
    },
    {
      id: 7,
      title: "Fahrrad-Reparatur-Workshop",
      titleEn: "Bike Repair Workshop",
      content: "Lerne die Grundlagen der Fahrradreparatur! Unser Experte zeigt dir, wie du kleine Reparaturen selbst durchführen kannst. Werkzeug wird gestellt.",
      contentEn: "Learn the basics of bike repair! Our expert will show you how to do small repairs yourself. Tools provided.",
      category: "Event",
      categoryEn: "Event",
      icon: "🔧",
      author: "Campuswerkstatt",
      authorEn: "Campus Workshop",
      time: "vor 4 Stunden",
      timeEn: "4 hours ago",
      likes: 123,
      comments: 34,
      color: "from-blue-500 to-cyan-600",
      isEvent: true,
      eventDate: "Montag, 9. Dez, 16:00",
      eventDateEn: "Monday, Dec 9, 4:00 PM",
      eventLocation: "Campuswerkstatt",
      eventLocationEn: "Campus Workshop",
      eventCoins: 30,
    },
  ];

  const handleLike = (id: number) => {
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((postId) => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const handleSave = (id: number) => {
    if (savedPosts.includes(id)) {
      setSavedPosts(savedPosts.filter((postId) => postId !== id));
    } else {
      setSavedPosts([...savedPosts, id]);
    }
  };

  const handleEventRegistration = (event: NewsItem) => {
    if (registeredEvents.includes(event.id)) {
      return; // Already registered
    }

    // Add to registered events
    const updated = [...registeredEvents, event.id];
    setRegisteredEvents(updated);
    localStorage.setItem("registeredEvents", JSON.stringify(updated));

    // Log activity
    addActivity({
      action: `Event angemeldet: ${event.title}`,
      actionEn: `Event registered: ${event.titleEn}`,
      coins: event.eventCoins || 30,
      date: "Heute",
      type: "event",
    });

    // Update challenge progress
    updateChallengeProgress("event-participation", {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      location: language === "de" ? event.eventLocation : event.eventLocationEn,
    });

    // Show success message
    toast.success(t.news.eventRegistered);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        <div className="flex items-center gap-3 mb-2">
          <Newspaper className="w-8 h-8" />
          <h1 className="text-2xl">{t.news.title}</h1>
        </div>
        <p className="text-blue-100 text-sm">
          {t.news.subtitle}
        </p>
      </motion.div>

      <div className="p-4 space-y-4">
        {/* Trending Topics */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h3 className="text-gray-900">Trending</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white border-orange-300 text-orange-700">
                #RecyclingRekord
              </Badge>
              <Badge className="bg-white border-orange-300 text-orange-700">
                #FahrradChallenge
              </Badge>
              <Badge className="bg-white border-orange-300 text-orange-700">
                #ZeroWaste
              </Badge>
              <Badge className="bg-white border-orange-300 text-orange-700">
                #Top10
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* News Feed */}
        <div className="space-y-4">
          {news.map((item, index) => {
            const isLiked = likedPosts.includes(item.id);
            const isSaved = savedPosts.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-white border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="p-4 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center text-xl`}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">
                            {language === "de" ? item.author : item.authorEn}
                          </p>
                          <p className="text-xs text-gray-500">
                            {language === "de" ? item.time : item.timeEn}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {language === "de" ? item.category : item.categoryEn}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-gray-900 mb-2">
                        {language === "de" ? item.title : item.titleEn}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {language === "de" ? item.content : item.contentEn}
                      </p>
                    </div>

                    {/* Event Details & Registration */}
                    {item.isEvent && (
                      <div className="mt-4 p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-700">
                            <Calendar className="w-4 h-4 text-purple-600" />
                            <span>
                              {language === "de" ? item.eventDate : item.eventDateEn}
                            </span>
                          </div>
                          {item.eventLocation && (
                            <div className="flex items-center gap-2 text-sm text-gray-700">
                              <span className="text-purple-600">📍</span>
                              <span>
                                {language === "de" ? item.eventLocation : item.eventLocationEn}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {registeredEvents.includes(item.id) ? (
                          <div className="flex items-center gap-2 justify-center py-2 bg-green-100 text-green-700 rounded-md">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-sm">{t.news.registered}</span>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleEventRegistration(item)}
                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                          >
                            {t.news.registerForEvent}
                            {item.eventCoins && (
                              <Badge className="ml-2 bg-yellow-400 text-yellow-900 border-yellow-500">
                                +{item.eventCoins} Coins
                              </Badge>
                            )}
                          </Button>
                        )}
                        {!registeredEvents.includes(item.id) && (
                          <p className="text-xs text-center text-purple-600 mt-2">
                            {t.news.participateToEarn}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(item.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isLiked ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        <span className="text-sm">
                          {item.likes + (isLiked ? 1 : 0)}
                        </span>
                      </button>

                      <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{item.comments}</span>
                      </button>

                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-500 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleSave(item.id)}
                      className="text-gray-500 hover:text-amber-500 transition-colors"
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          isSaved ? "fill-amber-500 text-amber-500" : ""
                        }`}
                      />
                    </button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="outline"
            className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            {t.language === "de" ? "Mehr laden" : "Load more"}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}