import { useState, useEffect } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { LanguageSelectionScreen } from "./LanguageSelectionScreen";
import { LoginScreen } from "./LoginScreen";
import { PermissionsScreen } from "./PermissionsScreen";
import { ProfileSetupScreen } from "./ProfileSetupScreen";
import { IntroSlidesScreen } from "./IntroSlidesScreen";
import { useLanguage } from "../../utils/LanguageContext";
import { useUser } from "../../utils/UserContext";
import type { Language } from "../../utils/translations";

interface OnboardingFlowProps {
  onComplete: () => void;
}

type OnboardingStep = 
  | "welcome" 
  | "language" 
  | "login" 
  | "permissions" 
  | "profile" 
  | "intro";

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("welcome");
  const { setLanguage } = useLanguage();
  const { setUserProfile } = useUser();

  const goBack = () => {
    const stepOrder: OnboardingStep[] = ["welcome", "language", "login", "permissions", "profile", "intro"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleLanguageSelection = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("userLanguage", lang);
    setCurrentStep("login");
  };

  const handleLoginComplete = () => {
    setCurrentStep("permissions");
  };

  const handlePermissionsComplete = () => {
    setCurrentStep("profile");
  };

  const handleProfileComplete = (profile: { name: string; studiengang: string; fakultaet: string }) => {
    // Update UserContext immediately
    setUserProfile(profile);
    setCurrentStep("intro");
  };

  const handleIntroComplete = () => {
    // Mark onboarding as completed
    localStorage.setItem("onboardingCompleted", "true");
    onComplete();
  };

  return (
    <>
      {currentStep === "welcome" && (
        <WelcomeScreen onContinue={() => setCurrentStep("language")} />
      )}
      {currentStep === "language" && (
        <LanguageSelectionScreen 
          onContinue={handleLanguageSelection}
          onBack={goBack}
        />
      )}
      {currentStep === "login" && (
        <LoginScreen 
          onContinue={handleLoginComplete}
          onBack={goBack}
        />
      )}
      {currentStep === "permissions" && (
        <PermissionsScreen 
          onContinue={handlePermissionsComplete}
          onBack={goBack}
        />
      )}
      {currentStep === "profile" && (
        <ProfileSetupScreen 
          onContinue={handleProfileComplete}
          onBack={goBack}
        />
      )}
      {currentStep === "intro" && (
        <IntroSlidesScreen 
          onComplete={handleIntroComplete}
          onBack={goBack}
        />
      )}
    </>
  );
}