import { useState, useCallback } from "react";
import { Page } from "../App";

export function useNavigationHistory(initialPage: Page = "home") {
  const [history, setHistory] = useState<Page[]>([initialPage]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigateTo = useCallback((page: Page) => {
    setHistory((prev) => {
      // Remove any forward history when navigating to a new page
      const newHistory = prev.slice(0, currentIndex + 1);
      // Only add to history if it's different from the current page
      if (newHistory[newHistory.length - 1] !== page) {
        return [...newHistory, page];
      }
      return newHistory;
    });
    setCurrentIndex((prev) => {
      const newHistory = history.slice(0, prev + 1);
      if (newHistory[newHistory.length - 1] !== page) {
        return prev + 1;
      }
      return prev;
    });
  }, [currentIndex, history]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      return history[currentIndex - 1];
    }
    return null;
  }, [currentIndex, history]);

  const goForward = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      return history[currentIndex + 1];
    }
    return null;
  }, [currentIndex, history]);

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;
  const currentPage = history[currentIndex];

  return {
    currentPage,
    navigateTo,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
  };
}
