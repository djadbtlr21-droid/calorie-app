import { useNavigate } from 'react-router-dom';
import { Dumbbell, Utensils } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import CalorieRing from '../components/dashboard/CalorieRing';
import WaterTracker from '../components/dashboard/WaterTracker';
import MealBadges from '../components/dashboard/MealBadges';
import TrainerMessage from '../components/dashboard/TrainerMessage';
import DailyCheckin from '../components/dashboard/DailyCheckin';
import { useProfile } from '../hooks/useProfile';
import { useDailyLog } from '../hooks/useDailyLog';
import { useLang } from '../contexts/LanguageContext';

export default function Home() {
  const { profile } = useProfile();
  const { log, setWater, removeMeal, totalCaloriesConsumed, totalCaloriesBurned } = useDailyLog();
  const navigate = useNavigate();
  const { t } = useLang();

  return (
    <div className="p-4 space-y-4">
      <DailyCheckin meals={log.meals} waterCups={log.waterCups} exercises={log.exercises} waterGoal={profile?.waterGoal || 8} onNavigate={navigate} />
      <PageHeader title={`${t.appName} 💪`} />
      <TrainerMessage consumed={totalCaloriesConsumed} goal={profile?.dailyCalorieGoal || 2000} burned={totalCaloriesBurned} waterCups={log.waterCups} waterGoal={profile?.waterGoal || 8} name={profile?.name} />
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm flex justify-center">
        <CalorieRing consumed={totalCaloriesConsumed} goal={profile?.dailyCalorieGoal || 2000} burned={totalCaloriesBurned} />
      </div>
      <MealBadges meals={log.meals} onRemoveMeal={removeMeal} />
      <WaterTracker cups={log.waterCups} goal={profile?.waterGoal || 8} onSetCups={setWater} />
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => navigate('/meals')} className="flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-medium text-sm shadow-sm"><Utensils size={16} />{t.addMeal}</button>
        <button onClick={() => navigate('/exercise')} className="flex items-center justify-center gap-2 py-3.5 bg-orange-500 text-white rounded-xl font-medium text-sm shadow-sm"><Dumbbell size={16} />{t.addExercise}</button>
      </div>
      {(log.meals.length > 0 || log.exercises.length > 0) && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t.todaySummary}</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div><p className="text-xs text-slate-400">{t.consumed}</p><p className="text-sm font-bold text-primary">{totalCaloriesConsumed}kcal</p></div>
            <div><p className="text-xs text-slate-400">{t.burned}</p><p className="text-sm font-bold text-orange-500">-{totalCaloriesBurned}kcal</p></div>
            <div><p className="text-xs text-slate-400">{t.netCalories}</p><p className="text-sm font-bold text-slate-700 dark:text-slate-200">{totalCaloriesConsumed - totalCaloriesBurned}kcal</p></div>
          </div>
        </div>
      )}
    </div>
  );
}
