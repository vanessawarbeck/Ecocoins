import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  name: string;
  studiengang: string;
  fakultaet: string;
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
  userName: string;
  userFaculty: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
  const [profileImage, setProfileImageState] = useState<string | null>(null);

  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setUserProfileState(profile);
      } catch (e) {
        console.error('Failed to parse user profile:', e);
      }
    }

    // Load profile image from localStorage
    const savedImage = localStorage.getItem('userProfileImage');
    if (savedImage) {
      setProfileImageState(savedImage);
    }
  }, []);

  const setUserProfile = (profile: UserProfile) => {
    setUserProfileState(profile);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  const setProfileImage = (image: string | null) => {
    setProfileImageState(image);
    if (image) {
      localStorage.setItem('userProfileImage', image);
    } else {
      localStorage.removeItem('userProfileImage');
    }
  };

  // Get first name from user profile
  const userName = userProfile?.name ? userProfile.name.split(' ')[0] : 'Max';
  const userFaculty = userProfile?.studiengang || 'Informatik';

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, profileImage, setProfileImage, userName, userFaculty }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}