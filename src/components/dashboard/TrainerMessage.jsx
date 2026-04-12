import { getHour } from '../../utils/dates';
import { useLang } from '../../contexts/LanguageContext';

function getTimeMessage(t) {
  const hour = getHour();
  if (hour >= 6 && hour < 11) return { text: t.trainerMorning };
  if (hour >= 11 && hour < 17) return { text: t.trainerAfternoon };
  if (hour >= 17 && hour < 22) return { text: t.trainerEvening };
  return { text: t.trainerNight };
}

function getProgressMessage(consumed, goal, burned, waterCups, waterGoal, t) {
  if (consumed === 0) return null;
  const remaining = goal - consumed;
  if (waterCups >= waterGoal) return { text: t.trainerWaterGoal };
  if (remaining < 0) return { text: t.trainerCalorieOver };
  if (remaining < 200) return { text: t.trainerAlmostGoal };
  if (burned > 200) return { text: t.trainerExerciseDone.replace('{cal}', burned) };
  return null;
}

export default function TrainerMessage({ consumed = 0, goal = 2000, burned = 0, waterCups = 0, waterGoal = 8, name = '' }) {
  const { t } = useLang();
  const timeMsg = getTimeMessage(t);
  const progressMsg = getProgressMessage(consumed, goal, burned, waterCups, waterGoal, t);
  const msg = progressMsg || timeMsg;

  return (
    <div className="card enter enter-1" style={{
      padding: '14px 18px',
      borderLeft: '3px solid var(--purple)',
      borderRadius: 16,
      display: 'flex', gap: 12, alignItems: 'center'
    }}>
      <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>💬</span>
      <p style={{
        margin: 0, fontSize: '0.88rem', lineHeight: 1.55,
        color: 'var(--text-secondary)', flex: 1
      }}>
        {name && <span style={{ fontWeight: 700, color: 'var(--purple)' }}>{name} {t.memberHon} </span>}
        {msg.text}
      </p>
    </div>
  );
}
