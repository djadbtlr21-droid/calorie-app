import { useNavigate } from 'react-router-dom';
import { Dumbbell, Utensils } from 'lucide-react';
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

  const goal = profile?.dailyCalorieGoal || 2000;
  const remaining = goal - totalCaloriesConsumed + totalCaloriesBurned;
  const totalProtein = log.meals.reduce((s, m) => s + (m.protein || 0), 0);
  const totalCarbs = log.meals.reduce((s, m) => s + (m.carbs || 0), 0);
  const totalFat = log.meals.reduce((s, m) => s + (m.fat || 0), 0);
  const macroTotal = totalProtein + totalCarbs + totalFat || 1;

  const now = new Date();
  const dayName = now.toLocaleDateString('ko-KR', { weekday: 'long' });
  const monthDay = now.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  const name = profile?.name || '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16 }}>
      {/* Header */}
      <header className="fade" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px 8px' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {dayName} · {monthDay}
          </p>
          <h1 style={{ margin: '2px 0 0', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
            {t.todayRecord || '오늘의 기록'}
          </h1>
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: '50%', background: 'var(--text-1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--bg)', fontWeight: 700, fontSize: '0.95rem', flexShrink: 0
        }}>
          {(name || '?')[0]}
        </div>
      </header>

      {/* Trainer */}
      <div className="fade" style={{ margin: '0 16px' }}>
        <TrainerMessage consumed={totalCaloriesConsumed} goal={goal} burned={totalCaloriesBurned} waterCups={log.waterCups} waterGoal={profile?.waterGoal || 8} name={name} />
      </div>

      <div style={{ margin: '0 16px' }}>
        <DailyCheckin meals={log.meals} waterCups={log.waterCups} exercises={log.exercises} waterGoal={profile?.waterGoal || 8} onNavigate={navigate} />
      </div>

      {/* THE RING */}
      <div className="card fade" style={{ margin: '0 16px', padding: '28px 20px' }}>
        <CalorieRing consumed={totalCaloriesConsumed} goal={goal} burned={totalCaloriesBurned} />
      </div>

      {/* 3 stat chips */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, margin: '0 16px' }}>
        <StatChip label={t.remaining} value={Math.abs(remaining)} color="var(--red)" />
        <StatChip label={t.burned} value={totalCaloriesBurned} color="var(--green)" />
        <StatChip label={t.water} value={`${log.waterCups}/8`} color="var(--blue)" />
      </div>

      {/* Macros */}
      <div className="card fade" style={{ margin: '0 16px', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.macros || '영양소'}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>g</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: 'var(--ring-track)', overflow: 'hidden', display: 'flex', marginBottom: 10 }}>
          <div style={{ width: `${(totalCarbs / macroTotal) * 100}%`, background: 'var(--blue)', transition: 'width 0.8s ease' }} />
          <div style={{ width: `${(totalProtein / macroTotal) * 100}%`, background: 'var(--orange)' }} />
          <div style={{ width: `${(totalFat / macroTotal) * 100}%`, background: 'var(--purple)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MacroDot color="var(--blue)" label={t.carbs || '탄수화물'} value={Math.round(totalCarbs)} />
          <MacroDot color="var(--orange)" label={t.protein || '단백질'} value={Math.round(totalProtein)} />
          <MacroDot color="var(--purple)" label={t.fat || '지방'} value={Math.round(totalFat)} />
        </div>
      </div>

      {/* Water */}
      <div style={{ margin: '0 16px' }}>
        <WaterTracker cups={log.waterCups} onSetCups={setWater} />
      </div>

      {/* Meals */}
      <div style={{ margin: '0 16px' }}>
        <MealBadges meals={log.meals} onRemoveMeal={removeMeal} />
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, margin: '0 16px' }}>
        <button onClick={() => navigate('/meals')} className="pill pill-primary" style={{ gap: 6 }}>
          <Utensils size={16} /> {t.addMeal}
        </button>
        <button onClick={() => navigate('/exercise')} className="pill pill-green" style={{ width: '100%', gap: 6, fontSize: '0.9rem', padding: '12px 24px' }}>
          <Dumbbell size={16} /> {t.addExercise}
        </button>
      </div>

      {/* Summary */}
      {(log.meals.length > 0 || log.exercises.length > 0) && (
        <div className="card fade" style={{ margin: '0 16px', padding: 16 }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: 12 }}>{t.todaySummary}</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
            <div>
              <p className="num-hero" style={{ fontSize: '1.5rem', color: 'var(--red)' }}>{totalCaloriesConsumed}</p>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-3)', marginTop: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.consumed}</p>
            </div>
            <div>
              <p className="num-hero" style={{ fontSize: '1.5rem', color: 'var(--green)' }}>-{totalCaloriesBurned}</p>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-3)', marginTop: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.burned}</p>
            </div>
            <div>
              <p className="num-hero" style={{ fontSize: '1.5rem' }}>{totalCaloriesConsumed - totalCaloriesBurned}</p>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-3)', marginTop: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.netCalories}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatChip({ label, value, color }) {
  return (
    <div className="card fade" style={{ padding: '14px 12px', textAlign: 'center' }}>
      <div className="num-hero" style={{ fontSize: '1.8rem', color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.62rem', color: 'var(--text-3)', marginTop: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
}

function MacroDot({ color, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-3)', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{value}g</div>
      </div>
    </div>
  );
}
