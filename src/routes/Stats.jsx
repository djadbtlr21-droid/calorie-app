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
      <div className="space-y-4 anim-enter">
        <PageHeader title={`${t.statsTitle} 📊`} />

        {/* Trainer banner */}
        <div className="glass-card" style={{
          padding: '12px 16px',
          borderLeft: '3px solid var(--purple)',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <span style={{ fontSize: '1.2rem' }}>🏆</span>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', flex: 1 }}>
            {stats.streakDays >= 7 ? t.streakRecording.replace('{days}', stats.streakDays) : stats.streakDays > 0 ? t.streakGoing.replace('{days}', stats.streakDays) : t.streakStart}
          </p>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <StreakCounter days={stats.streakDays} />
          <div className="glass-card" style={{ padding: 16 }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t.currentBMI}</p>
            <p className="display-num" style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>{bmi}</p>
            <span className="glow-pill" style={{
              background: `${bmiColor}20`,
              color: bmiColor,
              marginTop: 4
            }}>
              {t[bmiCat.key] || bmiCat.label}
            </span>
          </div>
        </div>

        {/* Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <GlassStat value={stats.totalMeals} label={t.totalMealRecords} color="var(--purple)" glow="var(--purple-glow)" />
          <GlassStat value={stats.totalExercises} label={t.totalExerciseRecords} color="var(--green)" glow="var(--green-glow)" />
          <GlassStat value={stats.waterGoalDays} label={t.waterGoalAchieved} color="var(--blue)" glow="var(--blue-glow)" />
        </div>

        <WeightChart goalWeight={profile?.goalWeight} />
        <CalorieChart dailyGoal={profile?.dailyCalorieGoal} />
        <Achievements achievements={achievements} />
      </div>
    </PageContainer>
  );
}

function GlassStat({ value, label, color, glow }) {
  return (
    <div className="glass-card" style={{
      textAlign: 'center', padding: 14,
      borderTop: `3px solid ${color}`
    }}>
      <p className="display-num" style={{
        fontSize: '1.4rem', color,
        textShadow: `0 0 12px ${glow}`
      }}>{value}</p>
      <p style={{ fontSize: '0.55rem', color: 'var(--text-muted)', marginTop: 4 }}>{label}</p>
    </div>
  );
}
