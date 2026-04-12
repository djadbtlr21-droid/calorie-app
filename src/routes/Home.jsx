import { useNavigate } from 'react-router-dom';
import { Dumbbell, Utensils, Flame, Activity, Droplets } from 'lucide-react';
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

  const today = new Date();
  const dateStr = today.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' });

  return (
    <div className="px-5 pt-6 pb-4 animate-page-enter">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t.greeting?.replace('{name}', profile?.name) || `안녕하세요, ${profile?.name}님`} 👋
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 2 }}>{dateStr}</p>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-purple), #7C5FD0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '1rem'
        }}>
          {(profile?.name || '?')[0]}
        </div>
      </div>

      <DailyCheckin meals={log.meals} waterCups={log.waterCups} exercises={log.exercises} waterGoal={profile?.waterGoal || 8} onNavigate={navigate} />

      {/* Calorie Ring */}
      <div className="ap-card" style={{ padding: '28px 20px', marginBottom: 16, borderRadius: 'var(--radius-lg)' }}>
        <CalorieRing consumed={totalCaloriesConsumed} goal={goal} burned={totalCaloriesBurned} size={220} />

        {/* Stat pills */}
        <div style={{ display: 'flex', gap: 8, marginTop: 20, overflowX: 'auto', paddingBottom: 4 }}>
          <StatPill icon={<Flame size={16} />} label={t.remaining} value={Math.abs(remaining)} unit="kcal"
            color="var(--accent-orange)" bg="var(--accent-orange-light)" />
          <StatPill icon={<Activity size={16} />} label={t.burned} value={totalCaloriesBurned} unit="kcal"
            color="var(--accent-green)" bg="var(--accent-green-light)" />
          <StatPill icon={<Droplets size={16} />} label={t.water} value={log.waterCups} unit={`/${profile?.waterGoal || 8}`}
            color="var(--accent-blue)" bg="var(--accent-blue-light)" />
        </div>
      </div>

      {/* Macros bar */}
      <div className="ap-card" style={{ padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            {t.macros || '영양소'}
          </span>
        </div>
        <div className="ap-macro-bar" style={{ marginBottom: 10 }}>
          <div style={{ width: `${(totalCarbs / macroTotal) * 100}%`, background: 'var(--accent-purple)', borderRadius: '4px 0 0 4px', minWidth: totalCarbs > 0 ? 4 : 0 }} />
          <div style={{ width: `${(totalProtein / macroTotal) * 100}%`, background: 'var(--accent-green)', minWidth: totalProtein > 0 ? 4 : 0 }} />
          <div style={{ width: `${(totalFat / macroTotal) * 100}%`, background: 'var(--accent-orange)', borderRadius: '0 4px 4px 0', minWidth: totalFat > 0 ? 4 : 0 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MacroDot color="var(--accent-purple)" label={t.carbs || '탄수화물'} value={`${Math.round(totalCarbs)}g`} />
          <MacroDot color="var(--accent-green)" label={t.protein || '단백질'} value={`${Math.round(totalProtein)}g`} />
          <MacroDot color="var(--accent-orange)" label={t.fat || '지방'} value={`${Math.round(totalFat)}g`} />
        </div>
      </div>

      <TrainerMessage consumed={totalCaloriesConsumed} goal={goal} burned={totalCaloriesBurned} waterCups={log.waterCups} waterGoal={profile?.waterGoal || 8} name={profile?.name} />

      {/* Water */}
      <div style={{ marginBottom: 16 }}>
        <WaterTracker cups={log.waterCups} onSetCups={setWater} />
      </div>

      {/* Meals */}
      <MealBadges meals={log.meals} onRemoveMeal={removeMeal} />

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
        <button
          onClick={() => navigate('/meals')}
          className="ap-btn-primary"
          style={{ borderRadius: 'var(--radius-md)', height: 48, fontSize: '0.85rem' }}
        >
          <Utensils size={18} /> {t.addMeal}
        </button>
        <button
          onClick={() => navigate('/exercise')}
          className="ap-btn-primary ap-btn-green"
          style={{ borderRadius: 'var(--radius-md)', height: 48, fontSize: '0.85rem' }}
        >
          <Dumbbell size={18} /> {t.addExercise}
        </button>
      </div>

      {/* Today summary */}
      {(log.meals.length > 0 || log.exercises.length > 0) && (
        <div className="ap-card" style={{ padding: 16, marginTop: 16 }}>
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block', marginBottom: 12 }}>
            {t.todaySummary}
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
            <div>
              <p className="ap-big-number" style={{ fontSize: '1.3rem', color: 'var(--accent-purple)' }}>{totalCaloriesConsumed}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.consumed}</p>
            </div>
            <div>
              <p className="ap-big-number" style={{ fontSize: '1.3rem', color: 'var(--accent-green)' }}>-{totalCaloriesBurned}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.burned}</p>
            </div>
            <div>
              <p className="ap-big-number" style={{ fontSize: '1.3rem', color: 'var(--text-primary)' }}>{totalCaloriesConsumed - totalCaloriesBurned}</p>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{t.netCalories}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatPill({ icon, label, value, unit, color, bg }) {
  return (
    <div className="ap-stat-card" style={{
      background: bg,
      display: 'flex', flexDirection: 'column', gap: 4,
      minWidth: 110, flex: '0 0 auto', padding: '14px 14px'
    }}>
      <div style={{ color, display: 'flex', alignItems: 'center', gap: 4 }}>
        {icon}
        <span style={{ fontSize: '0.65rem', fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span className="ap-big-number" style={{ fontSize: '1.4rem', color }}>{value}</span>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{unit}</span>
      </div>
    </div>
  );
}

function MacroDot({ color, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
      <div>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{label} </span>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
      </div>
    </div>
  );
}
