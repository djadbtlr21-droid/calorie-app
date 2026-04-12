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

  const bmiColor = bmi < 18.5 ? 'var(--accent-blue)' : bmi < 25 ? 'var(--accent-green)' : 'var(--accent-orange)';

  return (
    <PageContainer>
      <div className="space-y-4 animate-page-enter">
        <PageHeader title={`${t.statsTitle} 📊`} />

        <div className="flex items-end gap-3">
          <Trainer expression={stats.streakDays >= 7 ? 'happy' : 'encouraging'} size={48} />
          <div className="ap-card" style={{ flex: 1, padding: 14, borderRadius: 'var(--radius-md) var(--radius-md) var(--radius-md) 4px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              {stats.streakDays >= 7 ? t.streakRecording.replace('{days}', stats.streakDays) : stats.streakDays > 0 ? t.streakGoing.replace('{days}', stats.streakDays) : t.streakStart}
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <StreakCounter days={stats.streakDays} />
          <div className="ap-card" style={{ padding: 16 }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 4 }}>{t.currentBMI}</p>
            <p className="ap-big-number" style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{bmi}</p>
            <span className="ap-pill" style={{
              background: `${bmiColor}20`,
              color: bmiColor,
              marginTop: 4
            }}>
              {t[bmiCat.key] || bmiCat.label}
            </span>
          </div>
        </div>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <div className="ap-stat-card purple" style={{ textAlign: 'center', padding: 14 }}>
            <p className="ap-big-number" style={{ fontSize: '1.3rem', color: 'var(--accent-purple)' }}>{stats.totalMeals}</p>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 2 }}>{t.totalMealRecords}</p>
          </div>
          <div className="ap-stat-card green" style={{ textAlign: 'center', padding: 14 }}>
            <p className="ap-big-number" style={{ fontSize: '1.3rem', color: 'var(--accent-green)' }}>{stats.totalExercises}</p>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 2 }}>{t.totalExerciseRecords}</p>
          </div>
          <div className="ap-stat-card blue" style={{ textAlign: 'center', padding: 14 }}>
            <p className="ap-big-number" style={{ fontSize: '1.3rem', color: 'var(--accent-blue)' }}>{stats.waterGoalDays}</p>
            <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', marginTop: 2 }}>{t.waterGoalAchieved}</p>
          </div>
        </div>

        <WeightChart goalWeight={profile?.goalWeight} />
        <CalorieChart dailyGoal={profile?.dailyCalorieGoal} />
        <Achievements achievements={achievements} />
      </div>
    </PageContainer>
  );
}
