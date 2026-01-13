import { motion } from "motion/react";
import { Newspaper, Calendar, Search } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState, useEffect } from "react";
import { useLanguage } from "../utils/LanguageContext";
import { NewsPostCard } from "./NewsPostCard";
import { CommentsModal } from "./CommentsModal";
import { EventDetailModal } from "./EventDetailModal";
import { getNewsPosts, SAMPLE_EVENTS, type NewsPost, type Event } from "../utils/newsData";
import headerImage from "figma:asset/5d0f3dc1c633ba6079e841ca17a8b974a867d509.png";

type Tab = "news" | "events";

export function NewsFeedPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("news");
  const [newsPosts, setNewsPosts] = useState<NewsPost[]>([]);
  const [events] = useState<Event[]>(SAMPLE_EVENTS);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    setNewsPosts(getNewsPosts());
  };

  const texts = {
    de: {
      title: "Newsfeed & Events",
      subtitle: "Bleib informiert und vernetzt",
      news: "Newsfeed",
      events: "Events",
      trending: "Trending",
      all: "Alle",
      search: "Suchen...",
      noNews: "Keine Beiträge",
      noNewsDesc: "Schau später wieder vorbei!",
      noEvents: "Keine Events",
      noEventsDesc: "Momentan sind keine Events geplant",
      upcomingEvents: "Kommende Events",
      participants: "Teilnehmer",
      full: "Ausgebucht",
      availableSpots: "Plätze verfügbar",
    },
    en: {
      title: "Newsfeed & Events",
      subtitle: "Stay informed and connected",
      news: "Newsfeed",
      events: "Events",
      trending: "Trending",
      all: "All",
      search: "Search...",
      noNews: "No posts",
      noNewsDesc: "Check back later!",
      noEvents: "No events",
      noEventsDesc: "No events scheduled at the moment",
      upcomingEvents: "Upcoming Events",
      participants: "Participants",
      full: "Full",
      availableSpots: "spots available",
    },
  };

  const t = texts[language];

  // Filter news posts
  const filteredNews = newsPosts.filter((post) => {
    const content = language === "de" ? post.contentDe : post.contentEn;
    const matchesSearch = content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Filter events
  const filteredEvents = events.filter((event) => {
    const title = language === "de" ? event.titleDe : event.titleEn;
    const description = language === "de" ? event.descriptionDe : event.descriptionEn;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleEventClick = (eventId: number) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative overflow-hidden bg-gradient-to-r from-[#FF5757] via-[#FF8B8B] to-blue-600 text-white p-6 rounded-b-3xl shadow-lg mb-4"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: `url(${headerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5757]/40 via-[#FF8B8B]/40 to-blue-600/40" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="w-8 h-8" />
            <h1 className="text-2xl">{t.title}</h1>
          </div>
          <p className="text-white/90 text-sm">{t.subtitle}</p>
        </div>
      </motion.div>

      {/* Tab Toggle */}
      <div className="px-4 mb-4">
        <Card className="p-1 bg-gray-100">
          <div className="grid grid-cols-2 gap-1">
            <Button
              onClick={() => setActiveTab("news")}
              className={`rounded-lg transition-all ${
                activeTab === "news"
                  ? "bg-white text-emerald-600 shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Newspaper className="w-4 h-4 mr-2" />
              {t.news}
            </Button>
            <Button
              onClick={() => setActiveTab("events")}
              className={`rounded-lg transition-all ${
                activeTab === "events"
                  ? "bg-white text-emerald-600 shadow-md"
                  : "bg-transparent text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t.events}
            </Button>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="px-4 mb-4 space-y-2">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.search}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 space-y-3">
        {activeTab === "news" ? (
          <>
            {/* News Posts */}
            {filteredNews.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-gray-900 mb-2">{t.noNews}</h3>
                <p className="text-sm text-gray-500">{t.noNewsDesc}</p>
              </Card>
            ) : (
              filteredNews.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NewsPostCard
                    post={post}
                    onViewComments={setSelectedPost}
                    onEventClick={handleEventClick}
                  />
                </motion.div>
              ))
            )}
          </>
        ) : (
          <>
            {/* Events */}
            {filteredEvents.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-gray-900 mb-2">{t.noEvents}</h3>
                <p className="text-sm text-gray-500">{t.noEventsDesc}</p>
              </Card>
            ) : (
              <>
                <h2 className="text-gray-700 dark:text-gray-300 px-1 mb-2">{t.upcomingEvents}</h2>
                {filteredEvents.map((event, index) => {
                  const title = language === "de" ? event.titleDe : event.titleEn;
                  const description = language === "de" ? event.descriptionDe : event.descriptionEn;
                  const category = language === "de" ? event.categoryDe : event.categoryEn;
                  const isFull = event.currentParticipants >= event.maxParticipants;
                  const availableSpots = event.maxParticipants - event.currentParticipants;

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-300 dark:hover:border-emerald-600">
                        {/* Event Header */}
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-gray-900 dark:text-gray-100">{title}</h3>
                              <Badge className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs">
                                {category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                              {description}
                            </p>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span>
                              {event.date.toLocaleDateString(language === "de" ? "de-DE" : "en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className="text-amber-600 dark:text-amber-400">+{event.coins} Coins</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {isFull ? (
                                <Badge variant="outline" className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800">
                                  {t.full}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
                                  {availableSpots} {t.availableSpots}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-2">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(event.currentParticipants / event.maxParticipants) * 100}%` }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                              className={`h-full ${
                                isFull 
                                  ? "bg-red-500" 
                                  : "bg-gradient-to-r from-emerald-500 to-green-600"
                              }`}
                            />
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {event.currentParticipants} / {event.maxParticipants} {t.participants}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>

      {/* Comments Modal */}
      <CommentsModal
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        onUpdate={loadNews}
      />

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}