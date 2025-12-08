import { useState } from "react";
import { HomePage } from "./components/HomePage";
import { ChallengesPage } from "./components/ChallengesPage";
import { RewardsPage } from "./components/RewardsPage";
import { ProfilePage } from "./components/ProfilePage";
import { DashboardPage } from "./components/DashboardPage";
import { CommunityPage } from "./components/CommunityPage";
import { NewsFeedPage } from "./components/NewsFeedPage";
import { MobileSidebar } from "./components/MobileSidebar";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { SettingsPage } from "./components/SettingsPage";
import { LanguageProvider } from "./utils/LanguageContext";
import { ActivityProvider } from "./utils/ActivityContext";
import { Toaster } from "./components/ui/sonner";

export type Page = "home" | "challenges" | "rewards" | "profile" | "dashboard" | "community" | "newsfeed" | "settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(
    !localStorage.getItem("onboardingComplete")
  );

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "challenges":
        return <ChallengesPage onNavigate={setCurrentPage} />;
      case "rewards":
        return <RewardsPage />;
      case "profile":
        return <ProfilePage onNavigate={setCurrentPage} />;
      case "dashboard":
        return <DashboardPage />;
      case "community":
        return <CommunityPage />;
      case "newsfeed":
        return <NewsFeedPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <ActivityProvider>
        <Toaster />
        {/* Show onboarding if not completed */}
        {showOnboarding ? (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
            <MobileSidebar 
              currentPage={currentPage} 
              onPageChange={setCurrentPage}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="pt-14">
              {renderPage()}
            </div>
          </div>
        )}
      </ActivityProvider>
    </LanguageProvider>
  );
}