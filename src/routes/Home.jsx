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
    <div className="px-5 pt-6 pb-4 anim-enter" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {t.greeting?.replace('{name}', profile?.name) || `안녕하세요, ${profile?.name}님`} 👋
          </h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 3 }}>{dateStr}</p>
        </div>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--purple), #7B4FE0)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: '1rem',
          boxShadow: '0 0 20px var(--purple-glow)'
        }}>
          {(profile?.name || '?')[0]}
        </div>
      </div>

      <DailyCheckin meals={log.meals} waterCups={log.waterCups} exercises={log.exercises} waterGoal={profile?.waterGoal || 8} onNavigate={navigate} />

      {/* Trainer banner — above ring */}
      <TrainerMessage consumed={totalCaloriesConsumed} goal={goal} burned={totalCaloriesBurned} waterCups={log.waterCups} waterGoal={profile?.waterGoal || 8} name={profile?.name} />

      {/* Calorie Ring card */}
      <div className="glass-card" style={{ padding: '32px 20px', borderRadius: 'var(--r-lg)' }}>
        <CalorieRing consumed={totalCaloriesConsumed} goal={goal} burned={totalCaloriesBurned} size={240} />
      </div>

      {/* Stat pills */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
        <GlowStat icon={<Flame size={16} />} label={t.remaining} value={Math.abs(remaining)} unit="kcal"
          color="var(--orange)" glow="var(--orange-glow)" />
        <GlowStat icon={<Activity size={16} />} label={t.burned} value={totalCaloriesBurned} unit="kcal"
          color="var(--green)" glow="var(--green-glow)" />
        <GlowStat icon={<Droplets size={16} />} label={t.water} value={log.waterCups} unit={`/${profile?.waterGoal || 8}`}
          color="var(--blue)" glow="var(--blue-glow)" />
      </div>

      {/* Macros */}
      <div className="glass-card" style={{ padding: '14px 18px' }}>
        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block', marginBottom: 10 }}>
          {t.macros || '영양소'}
        </span>
        <div className="macro-bar" style={{ marginBottom: 10 }}>
          <div style={{ width: `${(totalCarbs / macroTotal) * 100}%`, background: 'var(--purple)', borderRadius: '3px 0 0 3px', minWidth: totalCarbs > 0 ? 3 : 0 }} />
          <div style={{ width: `${(totalProtein / macroTotal) * 100}%`, background: 'var(--green)', minWidth: totalProtein > 0 ? 3 : 0 }} />
          <div style={{ width: `${(totalFat / macroTotal) * 100}%`, background: 'var(--orange)', borderRadius: '0 3px 3px 0', minWidth: totalFat > 0 ? 3 : 0 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <MacroDot color="var(--purple)" label={t.carbs || '탄수화물'} value={`${Math.round(totalCarbs)}g`} />
          <MacroDot color="var(--green)" label={t.protein || '단백질'} value={`${Math.round(totalProtein)}g`} />
          <MacroDot color="var(--orange)" label={t.fat || '지방'} value={`${Math.round(totalFat)}g`} />
        </div>
      </div>

      {/* Water */}
      <WaterTracker cups={log.waterCups} onSetCups={setWater} />

      {/* Meals */}
      <MealBadges meals={log.meals} onRemoveMeal={removeMeal} />

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <button onClick={() => navigate('/meals')} className="btn-primary" style={{ borderRadius: 'var(--r-lg)', height: 50, fontSize: '0.85rem' }}>
          <Utensils size={18} /> {t.addMeal}
        </button>
        <button onClick={() => navigate('/exercise')} className="btn-primary btn-green" style={{ borderRadius: 'var(--r-lg)', height: 50, fontSize: '0.85rem' }}>
          <Dumbbell size={18} /> {t.addExercise}
        </button>
      </div>

      {/* Today summary */}
      {(log.meals.length > 0 || log.exercises.length > 0) && (
        <div className="glass-card" style={{ padding: 16 }}>
          <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)', display: 'block', marginBottom: 12 }}>
            {t.todaySummary}
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, textAlign: 'center' }}>
            <SummaryCell value={totalCaloriesConsumed} label={t.consumed} color="var(--purple)" />
            <SummaryCell value={`-${totalCaloriesBurned}`} label={t.burned} color="var(--green)" />
            <SummaryCell value={totalCaloriesConsumed - totalCaloriesBurned} label={t.netCalories} color="var(--text-primary)" />
          </div>
        </div>
      )}
    </div>
  );
}

function GlowStat({ icon, label, value, unit, color, glow }) {
  return (
    <div className="glass-card" style={{
      display: 'flex', flexDirection: 'column', gap: 4,
      minWidth: 110, flex: '0 0 auto', padding: '14px',
      borderLeft: `3px solid ${color}`
    }}>
      <div style={{ color, display: 'flex', alignItems: 'center', gap: 4 }}>
        {icon}
        <span style={{ fontSize: '0.6rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <span className="display-num" style={{ fontSize: '1.5rem', color, textShadow: `0 0 16px ${glow}` }}>{value}</span>
        <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{unit}</span>
      </div>
    </div>
  );
}

function MacroDot({ color, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 7, height: 7, borderRadius: '50%', background: color, boxShadow: `0 0 8px ${color}60` }} />
      <div>
        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{label} </span>
        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</span>
      </div>
    </div>
  );
}

function SummaryCell({ value, label, color }) {
  return (
    <div>
      <p className="display-num" style={{ fontSize: '1.3rem', color }}>{value}</p>
      <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{label}</p>
    </div>
  );
}
