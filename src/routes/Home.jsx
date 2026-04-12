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

const GOAL_INFO = {
  diet:     { icon: '🔥', ko: '체중 감소 모드', zh: '减重模式', color: '#FF3B30', bg: '#FFF0EF' },
  maintain: { icon: '⚖️', ko: '체중 유지 모드', zh: '维持模式', color: '#007AFF', bg: '#EFF6FF' },
  bulk:     { icon: '💪', ko: '벌크업 모드',    zh: '增肌模式', color: '#34C759', bg: '#F0FFF4' },
};

export default function Home() {
  const { profile } = useProfile();
  const { log, setWater, removeMeal, totalCaloriesConsumed, totalCaloriesBurned } = useDailyLog();
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const dailyGoal = profile?.dailyCalorieGoal || 2000;
  const remaining = dailyGoal - totalCaloriesConsumed + totalCaloriesBurned;
  const consumed = totalCaloriesConsumed;
  const burned = totalCaloriesBurned;

  const totalProtein = log.meals.reduce((s, m) => s + (m.protein || 0), 0);
  const totalCarbs = log.meals.reduce((s, m) => s + (m.carbs || 0), 0);
  const totalFat = log.meals.reduce((s, m) => s + (m.fat || 0), 0);
  const macroTotal = totalProtein + totalCarbs + totalFat || 1;

  const now = new Date();
  const dayName = now.toLocaleDateString('ko-KR', { weekday: 'long' });
  const monthDay = now.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
  const name = profile?.name || '';
  const goalMode = profile?.goal || 'maintain';
  const goalMeta = GOAL_INFO[goalMode] || GOAL_INFO.maintain;

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

      {/* Goal mode badge */}
      <div className="fade" style={{ margin: '0 20px' }}>
        <div style={{
          padding: '8px 16px',
          background: goalMeta.bg,
          borderRadius: 100,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span style={{ fontSize: '0.95rem' }}>{goalMeta.icon}</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: goalMeta.color }}>{lang === 'zh' ? goalMeta.zh : goalMeta.ko}</span>
          <span style={{ fontSize: '0.75rem', color: goalMeta.color, opacity: 0.7 }}>· {dailyGoal}kcal</span>
        </div>
      </div>

      {/* Trainer */}
      <div className="fade" style={{ margin: '0 16px' }}>
        <TrainerMessage consumed={consumed} goal={dailyGoal} burned={burned} waterCups={log.waterCups} waterGoal={profile?.waterGoal || 8} name={name} />
      </div>

      <div style={{ margin: '0 16px' }}>
        <DailyCheckin meals={log.meals} waterCups={log.waterCups} exercises={log.exercises} waterGoal={profile?.waterGoal || 8} onNavigate={navigate} />
      </div>

      {/* THE RING — enriched card */}
      <div className="card fade" style={{ margin: '0 16px', padding: '28px 20px' }}>
        <CalorieRing consumed={consumed} goal={dailyGoal} burned={burned} />

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'var(--divider)', margin: '16px 0 14px' }} />

        {/* 3-col mini stats inside ring card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', width: '100%', textAlign: 'center', gap: 8 }}>
          {[
            { icon: '🍽', label: t.consumed || '섭취', value: consumed, unit: 'kcal', color: 'var(--red)' },
            { icon: '🏃', label: t.burned || '소모', value: burned, unit: 'kcal', color: 'var(--green)' },
            { icon: '⚡', label: t.netCalories || '순', value: consumed - burned, unit: 'kcal',
              color: (consumed - burned) > dailyGoal ? 'var(--red)' : 'var(--blue)' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginBottom: 3 }}>{s.icon} {s.label}</div>
              <div className="num-hero" style={{ fontSize: '1.3rem', color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>{s.unit}</div>
            </div>
          ))}
        </div>

        {/* Progress message */}
        {consumed > 0 && (
          <div style={{
            marginTop: 12, padding: '8px 14px',
            background: 'var(--bg-input)', borderRadius: 10,
            fontSize: '0.8rem', color: 'var(--text-2)',
            textAlign: 'center', width: '100%'
          }}>
            {consumed >= dailyGoal
              ? `⚠️ ${t.goalExceeded || '오늘 목표 칼로리를 초과했습니다'}`
              : `✅ ${(t.goalRemaining || '목표까지 {n}kcal 남았습니다').replace('{n}', dailyGoal - consumed)}`}
          </div>
        )}
      </div>

      {/* 3 stat chips */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, margin: '0 16px' }}>
        <StatChip label={t.remaining || '남은 칼로리'} value={Math.abs(remaining)} color="var(--red)" />
        <StatChip label={t.burned || '운동 소모'} value={burned} color="var(--green)" />
        <StatChip label={t.water || '물 섭취'} value={`${log.waterCups}/8`} color="var(--blue)" />
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
              <p className="num-hero" style={{ fontSize: '1.5rem', color: 'var(--red)' }}>{consumed}</p>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-3)', marginTop: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.consumed}</p>
            </div>
            <div>
              <p className="num-hero" style={{ fontSize: '1.5rem', color: 'var(--green)' }}>-{burned}</p>
              <p style={{ fontSize: '0.6rem', color: 'var(--text-3)', marginTop: 2, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t.burned}</p>
            </div>
            <div>
              <p className="num-hero" style={{ fontSize: '1.5rem' }}>{consumed - burned}</p>
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
