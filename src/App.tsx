import { useState, useEffect } from "react";
import { LanguageProvider } from "./utils/LanguageContext";
import { ActivityProvider } from "./utils/ActivityContext";
import { UserProvider } from "./utils/UserContext";
import { DarkModeProvider } from "./utils/DarkModeContext";
import { useNavigationHistory } from "./utils/useNavigationHistory";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./components/HomePage";
import { ChallengesPage } from "./components/ChallengesPage";
import { RewardsPage } from "./components/RewardsPage";
import { ProfilePage } from "./components/ProfilePage";
import { DashboardPage } from "./components/DashboardPage";
import { CommunityPage } from "./components/CommunityPage";
import { NewsFeedPage } from "./components/NewsFeedPage";
import { SettingsPage } from "./components/SettingsPage";
import { FriendsPage } from "./components/FriendsPage";
import { MobileSidebar } from "./components/MobileSidebar";
import { NavigationButtons } from "./components/NavigationButtons";
import { OnboardingFlow } from "./components/onboarding/OnboardingFlow";
import { DarkModeToggle } from "./components/DarkModeToggle";

export type Page = "home" | "challenges" | "rewards" | "profile" | "dashboard" | "community" | "newsfeed" | "settings" | "friends";

function AppContent() {
  const {
    currentPage,
    navigateTo,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
  } = useNavigationHistory("home");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(
    !localStorage.getItem("onboardingCompleted")
  );

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleNavigate = (page: Page) => {
    navigateTo(page);
  };

  const handleGoBack = () => {
    const prevPage = goBack();
    if (prevPage) {
      // Navigation handled by hook
    }
  };

  const handleGoForward = () => {
    const nextPage = goForward();
    if (nextPage) {
      // Navigation handled by hook
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "challenges":
        return <ChallengesPage onNavigate={handleNavigate} />;
      case "rewards":
        return <RewardsPage />;
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      case "dashboard":
        return <DashboardPage />;
      case "community":
        return <CommunityPage />;
      case "newsfeed":
        return <NewsFeedPage />;
      case "settings":
        return <SettingsPage />;
      case "friends":
        return <FriendsPage onBack={() => handleNavigate("profile")} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const getBackgroundColor = () => {
    return "bg-white dark:bg-gray-900";
  };

  return (
    <DarkModeProvider>
      <LanguageProvider>
        <UserProvider>
          <ActivityProvider>
            <Toaster />
            {/* Show onboarding if not completed */}
            {showOnboarding ? (
              <OnboardingFlow onComplete={handleOnboardingComplete} />
            ) : (
              <div className={`min-h-screen ${getBackgroundColor()}`}>
                <MobileSidebar 
                  currentPage={currentPage} 
                  onPageChange={handleNavigate}
                  isOpen={sidebarOpen}
                  onToggle={() => setSidebarOpen(!sidebarOpen)}
                />
                <div className="pt-14">
                  {renderPage()}
                </div>
                <NavigationButtons
                  canGoBack={canGoBack}
                  canGoForward={canGoForward}
                  onBack={handleGoBack}
                  onForward={handleGoForward}
                />
                <DarkModeToggle />
              </div>
            )}
          </ActivityProvider>
        </UserProvider>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default function App() {
  return <AppContent />;
}