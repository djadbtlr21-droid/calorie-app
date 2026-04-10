import { useLang } from '../../contexts/LanguageContext';

export default function CalorieRing({ consumed, goal, burned, size = 180 }) {
  const { t } = useLang();
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const netGoal = goal + burned;
  const ratio = Math.min(consumed / (netGoal || 1), 1);
  const offset = circumference * (1 - ratio);
  const remaining = netGoal - consumed;
  const isOver = remaining < 0;
  const strokeColor = isOver ? '#EF4444' : ratio > 0.8 ? '#F59E0B' : '#3B82F6';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 180 180" className="animate-ring-fill">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="14" className="dark:stroke-slate-700" />
        <circle cx="90" cy="90" r={radius} fill="none" stroke={strokeColor} strokeWidth="14" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset} transform="rotate(-90 90 90)"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
        <text x="90" y="78" textAnchor="middle" className="fill-slate-800 dark:fill-slate-200" fontSize="28" fontWeight="bold">{consumed}</text>
        <text x="90" y="98" textAnchor="middle" className="fill-slate-400" fontSize="12">/ {netGoal} kcal</text>
        <text x="90" y="116" textAnchor="middle" fontSize="11" fill={isOver ? '#EF4444' : '#10B981'}>
          {isOver ? `${Math.abs(remaining)} ${t.exceeded}` : `${remaining} ${t.remaining}`}
        </text>
      </svg>
      <div className="flex gap-6 mt-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" />{t.consumed} {consumed}</div>
        {burned > 0 && <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success inline-block" />{t.burned} -{burned}</div>}
        <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 inline-block" />{t.calorieGoal} {goal}</div>
      </div>
    </div>
  );
}
