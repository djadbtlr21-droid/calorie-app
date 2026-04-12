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

export default function Stats() {
  const { profile } = useProfile();
  const { achievements, stats } = useAchievements(profile);
  const { t } = useLang();
  const bmi = profile ? calculateBMI(profile.weight, profile.height) : 0;
  const bmiCat = getBMICategory(bmi);
  const bmiColor = bmi < 18.5 ? 'var(--blue)' : bmi < 25 ? 'var(--green)' : 'var(--orange)';

  return (
    <PageContainer>
      <div className="space-y-4 fade">
        <PageHeader title={`${t.statsTitle} 📊`} />

        {/* Streak banner */}
        <div style={{
          padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 12,
          display: 'flex', gap: 10, alignItems: 'center'
        }}>
          <span style={{ fontSize: '1rem' }}>🏆</span>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-2)', flex: 1 }}>
            {stats.streakDays >= 7 ? t.streakRecording.replace('{days}', stats.streakDays) : stats.streakDays > 0 ? t.streakGoing.replace('{days}', stats.streakDays) : t.streakStart}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <StreakCounter days={stats.streakDays} />
          <div className="card fade" style={{ padding: 16 }}>
            <p style={{ fontSize: '0.62rem', color: 'var(--text-3)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.currentBMI}</p>
            <p className="num-hero" style={{ fontSize: '2.2rem' }}>{bmi}</p>
            <span style={{
              display: 'inline-block', padding: '3px 10px', borderRadius: 100,
              fontSize: '0.68rem', fontWeight: 600,
              background: 'var(--bg-input)', color: bmiColor, marginTop: 4
            }}>
              {t[bmiCat.key] || bmiCat.label}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <div className="card fade" style={{ padding: 14, textAlign: 'center' }}>
            <p className="num-hero" style={{ fontSize: '1.5rem', color: 'var(--red)' }}>{stats.totalMeals}</p>
            <p style={{ fontSize: '0.55rem', color: 'var(--text-3)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t.totalMealRecords}</p>
          </div>
          <div className="card fade" style={{ padding: 14, textAlign: 'center' }}>
            <p className="num-hero" style={{ fontSize: '1.5rem', color: 'var(--green)' }}>{stats.totalExercises}</p>
            <p style={{ fontSize: '0.55rem', color: 'var(--text-3)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t.totalExerciseRecords}</p>
          </div>
          <div className="card fade" style={{ padding: 14, textAlign: 'center' }}>
            <p className="num-hero" style={{ fontSize: '1.5rem', color: 'var(--blue)' }}>{stats.waterGoalDays}</p>
            <p style={{ fontSize: '0.55rem', color: 'var(--text-3)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{t.waterGoalAchieved}</p>
          </div>
        </div>

        <WeightChart goalWeight={profile?.goalWeight} />
        <CalorieChart dailyGoal={profile?.dailyCalorieGoal} />
        <Achievements achievements={achievements} />
      </div>
    </PageContainer>
  );
}
