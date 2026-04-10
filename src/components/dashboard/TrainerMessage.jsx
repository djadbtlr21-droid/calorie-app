import Trainer from '../characters/Trainer';
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
    <div className="flex items-end gap-3">
      <Trainer expression={msg.expression} size={56} />
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-sm p-3 shadow-sm border border-slate-100 dark:border-slate-700">
        <p className="text-sm text-slate-700 dark:text-slate-200">
          {name && <span className="font-bold text-primary">{name} {t.memberHon}</span>}
          {msg.text}
        </p>
      </div>
    </div>
  );
}
