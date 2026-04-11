import { createContext, useContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';
import { calculateBMR, calculateTDEE, getCaloriesForGoal } from '../services/nutrition';

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile, removeProfile] = useLocalStorage(STORAGE_KEYS.PROFILE, null);

  const saveProfile = (data) => {
    const bmr = calculateBMR(data.gender, data.weight, data.height, data.age);
    const multiplier = data.activityMultiplier || 1.2;
    const tdee = calculateTDEE(bmr, multiplier);
    const goal = data.goal || 'diet';
    const dailyCalorieGoal = data.dailyCalorieGoal || getCaloriesForGoal(tdee, goal);

    setProfile({
      ...data,
      bmr,
      tdee,
      goal,
      dailyCalorieGoal,
      waterGoal: data.waterGoal || 8,
      createdAt: data.createdAt || new Date().toISOString(),
    });
  };

  const updateProfile = (updates) => {
    setProfile((prev) => {
      const merged = { ...prev, ...updates };
      const recomputeBmr = updates.weight || updates.height || updates.age || updates.gender || updates.activityMultiplier;
      if (recomputeBmr) {
        merged.bmr = calculateBMR(merged.gender, merged.weight, merged.height, merged.age);
        merged.tdee = calculateTDEE(merged.bmr, merged.activityMultiplier || 1.2);
      }
      if ((recomputeBmr || updates.goal) && !updates.dailyCalorieGoal) {
        const tdee = merged.tdee || calculateTDEE(merged.bmr, merged.activityMultiplier || 1.2);
        merged.tdee = tdee;
        merged.dailyCalorieGoal = getCaloriesForGoal(tdee, merged.goal || 'diet');
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
