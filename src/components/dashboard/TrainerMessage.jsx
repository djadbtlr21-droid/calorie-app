import { getHour } from '../../utils/dates';
import { useLang } from '../../contexts/LanguageContext';

function getTimeMessage(t) {
  const hour = getHour();
  if (hour >= 6 && hour < 11) return t.trainerMorning;
  if (hour >= 11 && hour < 17) return t.trainerAfternoon;
  if (hour >= 17 && hour < 22) return t.trainerEvening;
  return t.trainerNight;
}

function getProgressMessage(consumed, goal, burned, waterCups, waterGoal, t) {
  if (consumed === 0) return null;
  const remaining = goal - consumed;
  if (waterCups >= waterGoal) return t.trainerWaterGoal;
  if (remaining < 0) return t.trainerCalorieOver;
  if (remaining < 200) return t.trainerAlmostGoal;
  if (burned > 200) return t.trainerExerciseDone.replace('{cal}', burned);
  return null;
}

export default function TrainerMessage({ consumed = 0, goal = 2000, burned = 0, waterCups = 0, waterGoal = 8, name = '' }) {
  const { t } = useLang();
  const timeMsg = getTimeMessage(t);
  const progressMsg = getProgressMessage(consumed, goal, burned, waterCups, waterGoal, t);
  const msg = progressMsg || timeMsg;

  return (
    <div style={{
      padding: '10px 14px', background: 'var(--bg-input)',
      borderRadius: 12, display: 'flex', gap: 10, alignItems: 'center'
    }}>
      <span style={{ fontSize: '1rem' }}>💬</span>
      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-2)', flex: 1, lineHeight: 1.4 }}>
        {name && <span style={{ fontWeight: 700, color: 'var(--text-1)' }}>{name} {t.memberHon} </span>}
        {msg}
      </p>
    </div>
  );
}
