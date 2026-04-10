import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { calculateBMR, calculateTDEE } from '../services/nutrition';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile, removeProfile] = useLocalStorage(STORAGE_KEYS.PROFILE, null);

  const saveProfile = (data) => {
    const bmr = calculateBMR(data.gender, data.weight, data.height, data.age);
    const multiplier = data.activityMultiplier || 1.2;
    const dailyCalorieGoal = data.dailyCalorieGoal || calculateTDEE(bmr, multiplier);

    setProfile({
      ...data,
      bmr,
      dailyCalorieGoal,
      waterGoal: data.waterGoal || 8,
      createdAt: data.createdAt || new Date().toISOString(),
    });
  };

  const updateProfile = (updates) => {
    setProfile((prev) => {
      const merged = { ...prev, ...updates };
      if (updates.weight || updates.height || updates.age || updates.gender || updates.activityMultiplier) {
        merged.bmr = calculateBMR(merged.gender, merged.weight, merged.height, merged.age);
        if (!updates.dailyCalorieGoal) {
          merged.dailyCalorieGoal = calculateTDEE(merged.bmr, merged.activityMultiplier || 1.2);
        }
      }
      return merged;
    });
  };

  const resetProfile = () => {
    removeProfile();
  };

  return (
    <ProfileContext.Provider value={{ profile, saveProfile, updateProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileProvider');
  return context;
}
