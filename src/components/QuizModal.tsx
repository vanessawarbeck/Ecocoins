import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Brain, CheckCircle2, XCircle, Award, TrendingUp, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { getRandomQuizQuestions, type QuizQuestion, type QuizAnswer } from "../utils/quizQuestions";
import { updateChallengeProgress } from "../utils/challengeManager";
import { addPointsTransaction } from "./PointsHistoryModal";
import { toast } from "sonner@2.0.3";
import { useLanguage } from "../utils/LanguageContext";
import { useDarkMode } from "../utils/DarkModeContext";
import { getModalClasses } from "../utils/modalDarkModeClasses";
import { PointsAnimation } from "./PointsAnimation";
import { useActivities } from "../utils/ActivityContext";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number, coinsEarned: number) => void;
}

export function QuizModal({ isOpen, onClose, onComplete }: QuizModalProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);
  const [showPointsAnimation, setShowPointsAnimation] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const { language } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const { addActivity } = useActivities();
  const modalClasses = getModalClasses(isDarkMode);

  // Check if quiz can be taken (once per week)
  useEffect(() => {
    if (isOpen) {
      const lastCompleted = localStorage.getItem("quizLastCompleted");
      if (lastCompleted) {
        const lastDate = new Date(parseInt(lastCompleted));
        const now = new Date();
        const daysSinceLastQuiz = Math.floor((now.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastQuiz < 7) {
          setCanTakeQuiz(false);
          const daysRemaining = 7 - daysSinceLastQuiz;
          toast.error(
            language === "de" 
              ? `Du kannst das Quiz nur einmal pro Woche machen. Noch ${daysRemaining} Tag(e) bis zum nächsten Quiz.`
              : `You can only take the quiz once per week. ${daysRemaining} day(s) remaining until next quiz.`
          );
        } else {
          setCanTakeQuiz(true);
        }
      }
    }
  }, [isOpen, language]);

  // Initialize quiz
  useEffect(() => {
    if (isOpen && questions.length === 0 && canTakeQuiz) {
      const randomQuestions = getRandomQuizQuestions(10);
      setQuestions(randomQuestions);
      setStartTime(Date.now());
    }
  }, [isOpen, canTakeQuiz]);

  // Reset quiz when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setCorrectAnswers(0);
        setQuizCompleted(false);
        setShowPointsAnimation(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  // If can't take quiz, show message and return
  if (!canTakeQuiz) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg relative"
        >
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <Card className="bg-white rounded-3xl p-8 text-center">
            <div className="w-24 h-24 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-purple-600" />
            </div>
            <h2 className="text-2xl text-gray-900 mb-2">
              {language === "de" ? "Quiz bereits absolviert" : "Quiz Already Completed"}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === "de"
                ? "Du kannst das Nachhaltigkeits-Quiz nur einmal pro Woche machen. Komm nächste Woche wieder!"
                : "You can take the Sustainability Quiz only once per week. Come back next week!"}
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full py-6"
            >
              {language === "de" ? "Verstanden" : "Got it"}
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }
  
  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerClick = (answerIndex: number) => {
    if (showResult) return; // Prevent changing answer after showing result
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // Check if answer is correct
    if (currentQuestion.answers[answerIndex].isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const score = Math.round((correctAnswers / questions.length) * 100);
    const durationSeconds = Math.floor((Date.now() - startTime) / 1000);
    
    // Award coins only if score >= 70%
    let coinsEarned = 0;
    if (score >= 70) {
      coinsEarned = 20;
      setEarnedPoints(coinsEarned);
      
      // Update eco coins
      const currentCoins = parseInt(localStorage.getItem("ecoCoins") || "0");
      localStorage.setItem("ecoCoins", (currentCoins + coinsEarned).toString());

      // Mark quiz as completed with timestamp
      localStorage.setItem("quizLastCompleted", Date.now().toString());

      // Add to points history
      addPointsTransaction({
        type: "earned",
        amount: coinsEarned,
        action: language === "de" ? "Nachhaltigkeits-Quiz" : "Sustainability Quiz",
        category: "quiz",
        description: language === "de" 
          ? `Quiz bestanden mit ${score}% richtigen Antworten`
          : `Quiz passed with ${score}% correct answers`,
      });

      // Update challenge progress
      updateChallengeProgress("quiz", {
        id: `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        duration: durationSeconds,
        score: score,
      });

      // Add to activity history
      addActivity({
        action: `Quiz abgeschlossen: ${score}% richtig`,
        actionEn: `Quiz completed: ${score}% correct`,
        coins: coinsEarned,
        date: language === "de" ? "Heute" : "Today",
        type: "quiz",
      });

      // Show points animation after a short delay
      setTimeout(() => {
        setShowPointsAnimation(true);
      }, 500);
    } else {
      toast.error(
        language === "de"
          ? `😔 Leider nicht bestanden. Du brauchst mindestens 70%. Versuche es nächste Woche nochmal!`
          : `😔 Unfortunately failed. You need at least 70%. Try again next week!`
      );
    }

    setQuizCompleted(true);
    onComplete(score, coinsEarned);
  };

  const handleClose = () => {
    setShowPointsAnimation(false);
    onClose();
  };

  // Get the correct answer index
  const correctAnswerIndex = currentQuestion.answers.findIndex(a => a.isCorrect);
  const selectedAnswerObj = selectedAnswer !== null ? currentQuestion.answers[selectedAnswer] : null;

  return (
    <>
      <PointsAnimation 
        show={showPointsAnimation} 
        points={earnedPoints}
        onComplete={() => setShowPointsAnimation(false)}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-lg relative max-h-[90vh] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <Card className="bg-white rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                  <Brain className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl mb-1">
                    {language === "de" ? "Nachhaltigkeits-Quiz" : "Sustainability Quiz"}
                  </h2>
                  <p className="text-sm text-white/90">
                    {language === "de" ? "Teste dein Wissen!" : "Test your knowledge!"}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {language === "de" ? "Frage" : "Question"} {currentQuestionIndex + 1} / {questions.length}
                  </span>
                  <span>
                    {correctAnswers} {language === "de" ? "richtig" : "correct"}
                  </span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {!quizCompleted ? (
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    {/* Category Badge */}
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      {currentQuestion.category}
                    </Badge>

                    {/* Question */}
                    <div>
                      <h3 className="text-gray-900 text-lg mb-4">
                        {currentQuestion.question}
                      </h3>
                    </div>

                    {/* Answers */}
                    <div className="space-y-3">
                      {currentQuestion.answers.map((answer, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrect = answer.isCorrect;
                        const shouldShowCorrect = showResult && isCorrect;
                        const shouldShowIncorrect = showResult && isSelected && !isCorrect;

                        let bgColor = "bg-white hover:bg-gray-50";
                        let borderColor = "border-gray-200";
                        let textColor = "text-gray-900";

                        if (shouldShowCorrect) {
                          bgColor = "bg-green-50";
                          borderColor = "border-green-500";
                          textColor = "text-green-900";
                        } else if (shouldShowIncorrect) {
                          bgColor = "bg-red-50";
                          borderColor = "border-red-500";
                          textColor = "text-red-900";
                        } else if (isSelected && !showResult) {
                          bgColor = "bg-purple-50";
                          borderColor = "border-purple-500";
                        }

                        return (
                          <motion.button
                            key={index}
                            onClick={() => handleAnswerClick(index)}
                            disabled={showResult}
                            whileHover={!showResult ? { scale: 1.02 } : {}}
                            whileTap={!showResult ? { scale: 0.98 } : {}}
                            className={`w-full p-4 rounded-xl border-2 ${bgColor} ${borderColor} transition-all text-left relative ${
                              showResult ? "cursor-default" : "cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                shouldShowCorrect
                                  ? "bg-green-500 border-green-500"
                                  : shouldShowIncorrect
                                  ? "bg-red-500 border-red-500"
                                  : isSelected
                                  ? "border-purple-500"
                                  : "border-gray-300"
                              }`}>
                                {shouldShowCorrect && (
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                )}
                                {shouldShowIncorrect && (
                                  <XCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <span className={textColor}>{answer.text}</span>
                            </div>

                            {/* Additional Info */}
                            {showResult && answer.additionalInfo && (shouldShowCorrect || shouldShowIncorrect) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-3 pt-3 border-t border-gray-200"
                              >
                                <p className="text-sm text-gray-600">
                                  💡 {answer.additionalInfo}
                                </p>
                              </motion.div>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    {showResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Button
                          onClick={handleNext}
                          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full py-6"
                        >
                          {currentQuestionIndex < questions.length - 1 ? (
                            <>
                              {language === "de" ? "Nächste Frage" : "Next Question"}
                              <ChevronRight className="w-5 h-5 ml-2" />
                            </>
                          ) : (
                            <>
                              {language === "de" ? "Quiz beenden" : "Finish Quiz"}
                              <Award className="w-5 h-5 ml-2" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 text-center py-4"
                  >
                    {/* Result Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      {correctAnswers / questions.length >= 0.7 ? (
                        <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                          <Award className="w-12 h-12 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                          <XCircle className="w-12 h-12 text-red-600" />
                        </div>
                      )}
                    </motion.div>

                    {/* Result Text */}
                    <div>
                      <h3 className="text-2xl text-gray-900 mb-2">
                        {correctAnswers / questions.length >= 0.7
                          ? (language === "de" ? "Glückwunsch!" : "Congratulations!")
                          : (language === "de" ? "Nicht bestanden" : "Not Passed")}
                      </h3>
                      <p className="text-gray-600">
                        {language === "de" 
                          ? `Du hast ${correctAnswers} von ${questions.length} Fragen richtig beantwortet`
                          : `You answered ${correctAnswers} of ${questions.length} questions correctly`}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6">
                      <p className="text-sm text-gray-600 mb-2">
                        {language === "de" ? "Deine Punktzahl" : "Your Score"}
                      </p>
                      <p className="text-5xl text-purple-600 mb-1">
                        {Math.round((correctAnswers / questions.length) * 100)}%
                      </p>
                      {correctAnswers / questions.length >= 0.7 && (
                        <div className="mt-4 pt-4 border-t border-purple-200">
                          <p className="text-2xl text-green-600">
                            +20 Eco Coins
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Explanation */}
                    {correctAnswers / questions.length < 0.7 && (
                      <Card className="p-4 bg-amber-50 border-amber-200">
                        <p className="text-sm text-amber-800">
                          {language === "de"
                            ? "💡 Du brauchst mindestens 70% richtige Antworten, um Punkte zu erhalten. Versuche es nochmal!"
                            : "💡 You need at least 70% correct answers to earn points. Try again!"}
                        </p>
                      </Card>
                    )}

                    {/* Close Button */}
                    <Button
                      onClick={handleClose}
                      className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-full py-6"
                    >
                      {language === "de" ? "Schließen" : "Close"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>
    </>
  );
}