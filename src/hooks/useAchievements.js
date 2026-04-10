import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, logKey } from '../utils/constants';
import { storage } from '../utils/storage';
import { getTodayKey, getDaysAgo } from '../utils/dates';
import { ACHIEVEMENTS } from '../data/achievements';

function computeStats(profile) {
  const keys = storage.keys().filter((k) => k.startsWith(STORAGE_KEYS.LOG_PREFIX)).sort();
  let streakDays = 0;
  let totalMeals = 0;
  let totalExercises = 0;
  let waterGoalDays = 0;
  let calorieGoalDays = 0;
  let perfectDays = 0;
  let weightGoalReached = false;
  const waterGoal = profile?.waterGoal || 8;
  const calorieGoal = profile?.dailyCalorieGoal || 2000;

  // Calculate streak
  for (let i = 0; i < 365; i++) {
    const dayKey = logKey(getDaysAgo(i));
    const dayLog = storage.get(dayKey);
    if (dayLog && (dayLog.meals?.length > 0 || dayLog.exercises?.length > 0)) {
      streakDays++;
    } else {
      break;
    }
  }

  keys.forEach((key) => {
    const dayLog = storage.get(key);
    if (!dayLog) return;

    totalMeals += dayLog.meals?.length || 0;
    totalExercises += dayLog.exercises?.length || 0;

    if ((dayLog.waterCups || 0) >= waterGoal) waterGoalDays++;

    const consumed = (dayLog.meals || []).reduce((s, m) => s + (m.calories || 0), 0);
    if (consumed > 0 && consumed <= calorieGoal) calorieGoalDays++;

    const categories = new Set((dayLog.meals || []).map((m) => m.category));
    if (categories.has('breakfast') && categories.has('lunch') && categories.has('dinner')) {
      perfectDays++;
    }

    if (dayLog.weight && profile?.goalWeight && dayLog.weight <= profile.goalWeight) {
      weightGoalReached = true;
    }
  });

  return { streakDays, totalMeals, totalExercises, waterGoalDays, calorieGoalDays, perfectDays, weightGoalReached };
}

export function useAchievements(profile) {
  const [unlockedIds, setUnlockedIds] = useLocalStorage(STORAGE_KEYS.ACHIEVEMENTS, []);

  const stats = useMemo(() => computeStats(profile), [profile]);

  const achievements = ACHIEVEMENTS.map((a) => ({
    ...a,
    unlocked: unlockedIds.includes(a.id) || a.check(stats),
  }));

  // Auto-unlock newly achieved
  const newlyUnlocked = achievements
    .filter((a) => a.unlocked && !unlockedIds.includes(a.id))
    .map((a) => a.id);

  if (newlyUnlocked.length > 0) {
    setUnlockedIds((prev) => [...prev, ...newlyUnlocked]);
  }

  return { achievements, stats };
}
