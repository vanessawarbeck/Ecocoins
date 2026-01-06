import { motion } from "motion/react";
import { Heart, MessageCircle, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useLanguage } from "../utils/LanguageContext";
import { useState } from "react";
import type { NewsPost } from "../utils/newsData";
import { toggleLike } from "../utils/newsData";

interface NewsPostCardProps {
  post: NewsPost;
  onViewComments: (post: NewsPost) => void;
  onEventClick?: (eventId: number) => void;
}

export function NewsPostCard({ post, onViewComments, onEventClick }: NewsPostCardProps) {
  const { language } = useLanguage();
  const [isLiked, setIsLiked] = useState(post.likedByUser);
  const [likes, setLikes] = useState(post.likes);
  const [showFullContent, setShowFullContent] = useState(false);

  const content = language === "de" ? post.contentDe : post.contentEn;
  const shouldTruncate = content.length > 200;
  const displayContent = shouldTruncate && !showFullContent 
    ? content.slice(0, 200) + "..." 
    : content;

  const handleLike = () => {
    toggleLike(post.id);
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 60) {
      return language === "de" 
        ? `vor ${diffInMinutes} Min.` 
        : `${diffInMinutes} min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return language === "de" 
        ? `vor ${diffInHours} Std.` 
        : `${diffInHours}h ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return language === "de" 
      ? `vor ${diffInDays} Tag${diffInDays > 1 ? "en" : ""}` 
      : `${diffInDays}d ago`;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -2 }}
    >
      <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="w-10 h-10">
            {post.authorAvatar && <img src={post.authorAvatar} alt={post.authorName} />}
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-600 text-white">
              {getInitials(post.authorName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm text-gray-900 dark:text-gray-100">{post.authorName}</h3>
              <Badge variant="outline" className="text-xs border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300">
                {post.authorFaculty}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{getTimeAgo(post.timestamp)}</p>
          </div>
        </div>

        {/* Content */}
        <div className="mb-3">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{displayContent}</p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mt-1"
            >
              {showFullContent 
                ? (language === "de" ? "Weniger anzeigen" : "Show less")
                : (language === "de" ? "Mehr anzeigen" : "Show more")}
            </button>
          )}
        </div>

        {/* Event Link */}
        {post.eventId && (
          <Card className="p-3 mb-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 border-blue-300 dark:border-blue-700 cursor-pointer hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800/50 dark:hover:to-indigo-800/50 transition-colors"
            onClick={() => onEventClick?.(post.eventId!)}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {language === "de" 
                  ? "Verknüpftes Event ansehen" 
                  : "View linked event"}
              </p>
            </div>
          </Card>
        )}

        {/* Image */}
        {post.image && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isLiked 
                ? "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Heart 
              className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} 
            />
            <span className="text-sm">{likes}</span>
          </button>

          {/* Comment Button */}
          <button
            onClick={() => onViewComments(post)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{post.comments.length}</span>
          </button>
        </div>
      </Card>
    </motion.div>
  );
}