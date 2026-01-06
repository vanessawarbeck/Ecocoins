import { motion, AnimatePresence } from "motion/react";
import { X, Send } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useLanguage } from "../utils/LanguageContext";
import { useState } from "react";
import type { NewsPost } from "../utils/newsData";
import { addComment } from "../utils/newsData";
import { toast } from "sonner@2.0.3";

interface CommentsModalProps {
  post: NewsPost | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export function CommentsModal({ post, isOpen, onClose, onUpdate }: CommentsModalProps) {
  const { language } = useLanguage();
  const [commentText, setCommentText] = useState("");

  if (!post) return null;

  const texts = {
    de: {
      comments: "Kommentare",
      writeComment: "Kommentar schreiben...",
      send: "Senden",
      noComments: "Noch keine Kommentare",
      beFirst: "Sei der Erste, der kommentiert!",
    },
    en: {
      comments: "Comments",
      writeComment: "Write a comment...",
      send: "Send",
      noComments: "No comments yet",
      beFirst: "Be the first to comment!",
    },
  };

  const t = texts[language];

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

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    // Get user data (in real app: from auth)
    const userName = localStorage.getItem("userName") || "Anonymous";
    const userFaculty = localStorage.getItem("userFaculty") || "FK 00";

    addComment(post.id, {
      authorName: userName,
      authorFaculty: userFaculty,
      timestamp: new Date(),
      contentDe: commentText,
      contentEn: commentText,
    });

    setCommentText("");
    onUpdate();
    
    toast.success(
      language === "de" ? "Kommentar hinzugefügt!" : "Comment added!"
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
            style={{ top: "56px" }}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden flex flex-col"
            style={{ top: "56px" }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-t-3xl shadow-lg z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl">{t.comments}</h2>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {post.comments.length}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {post.comments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-gray-900 mb-2">{t.noComments}</h3>
                  <p className="text-sm text-gray-500">{t.beFirst}</p>
                </div>
              ) : (
                post.comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-3 bg-gray-50 border-gray-200">
                      <div className="flex gap-3">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          {comment.authorAvatar && (
                            <img src={comment.authorAvatar} alt={comment.authorName} />
                          )}
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                            {getInitials(comment.authorName)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm text-gray-900">{comment.authorName}</h4>
                            <span className="text-xs text-gray-500">{comment.authorFaculty}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            {language === "de" ? comment.contentDe : comment.contentEn}
                          </p>
                          <p className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>

            {/* Comment Input */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmitComment()}
                  placeholder={t.writeComment}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Button
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-full px-6 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
