import { getHour } from '../../utils/dates';
import { useLang } from '../../contexts/LanguageContext';

function getTimeMessage(t) {
  const hour = getHour();
  if (hour >= 6 && hour < 11) return { text: t.trainerMorning, expression: 'happy' };
  if (hour >= 11 && hour < 17) return { text: t.trainerAfternoon, expression: 'encouraging' };
  if (hour >= 17 && hour < 22) return { text: t.trainerEvening, expression: 'happy' };
  return { text: t.trainerNight, expression: 'encouraging' };
}

function getProgressMessage(consumed, goal, burned, waterCups, waterGoal, t) {
  if (consumed === 0) return null;
  const remaining = goal - consumed;
  if (waterCups >= waterGoal) return { text: t.trainerWaterGoal, expression: 'happy' };
  if (remaining < 0) return { text: t.trainerCalorieOver, expression: 'stern' };
  if (remaining < 200) return { text: t.trainerAlmostGoal, expression: 'encouraging' };
  if (burned > 200) return { text: t.trainerExerciseDone.replace('{cal}', burned), expression: 'happy' };
  return null;
}

export default function TrainerMessage({ consumed = 0, goal = 2000, burned = 0, waterCups = 0, waterGoal = 8, name = '' }) {
  const { t } = useLang();
  const timeMsg = getTimeMessage(t);
  const progressMsg = getProgressMessage(consumed, goal, burned, waterCups, waterGoal, t);
  const msg = progressMsg || timeMsg;

  return (
    <div className="glass-card" style={{
      padding: '14px 18px',
      borderLeft: '3px solid var(--purple)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16
    }}>
      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>💬</span>
      <p style={{
        margin: 0,
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
        flex: 1
      }}>
        {name && <span style={{ fontWeight: 700, color: 'var(--purple)' }}>{name} {t.memberHon} </span>}
        {msg.text}
      </p>
    </div>
  );
}
