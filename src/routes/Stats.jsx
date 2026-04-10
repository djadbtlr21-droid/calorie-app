import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import WeightChart from '../components/stats/WeightChart';
import CalorieChart from '../components/stats/CalorieChart';
import StreakCounter from '../components/stats/StreakCounter';
import Achievements from '../components/stats/Achievements';
import { useProfile } from '../hooks/useProfile';
import { useAchievements } from '../hooks/useAchievements';
import { calculateBMI, getBMICategory } from '../services/nutrition';
import { useLang } from '../contexts/LanguageContext';
import Trainer from '../components/characters/Trainer';

export default function Stats() {
  const { profile } = useProfile();
  const { achievements, stats } = useAchievements(profile);
  const { t } = useLang();
  const bmi = profile ? calculateBMI(profile.weight, profile.height) : 0;
  const bmiCat = getBMICategory(bmi);

  return (
    <PageContainer>
      <div className="space-y-4">
        <PageHeader title={`${t.statsTitle} 📊`} />
        <div className="flex items-end gap-3">
          <Trainer expression={stats.streakDays >= 7 ? 'happy' : 'encouraging'} size={48} />
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100 dark:border-slate-700">
            <p className="text-sm text-slate-700 dark:text-slate-200">
              {stats.streakDays >= 7 ? t.streakRecording.replace('{days}', stats.streakDays) : stats.streakDays > 0 ? t.streakGoing.replace('{days}', stats.streakDays) : t.streakStart}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <StreakCounter days={stats.streakDays} />
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">{t.currentBMI}</p>
            <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">{bmi}</p>
            <p className={`text-xs font-medium ${bmiCat.color}`}>{t[bmiCat.key] || bmiCat.label}</p>
          </div>
        </div>
        <WeightChart goalWeight={profile?.goalWeight} />
        <CalorieChart dailyGoal={profile?.dailyCalorieGoal} />
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">{t.overallStats}</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xl font-bold text-primary">{stats.totalMeals}</p><p className="text-[10px] text-slate-400">{t.totalMealRecords}</p></div>
            <div><p className="text-xl font-bold text-orange-500">{stats.totalExercises}</p><p className="text-[10px] text-slate-400">{t.totalExerciseRecords}</p></div>
            <div><p className="text-xl font-bold text-blue-500">{stats.waterGoalDays}</p><p className="text-[10px] text-slate-400">{t.waterGoalAchieved}</p></div>
          </div>
        </div>
        <Achievements achievements={achievements} />
      </div>
    </PageContainer>
  );
}
