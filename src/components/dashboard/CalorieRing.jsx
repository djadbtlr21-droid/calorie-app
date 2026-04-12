import { useLang } from '../../contexts/LanguageContext';

export default function CalorieRing({ consumed, goal, burned, size = 220 }) {
  const { t } = useLang();
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const netGoal = goal + burned;
  const progress = Math.min(consumed / (netGoal || 1), 1);
  const offset = circumference - progress * circumference;
  const remaining = netGoal - consumed;
  const isOver = remaining < 0;

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke="var(--accent-purple-light)"
          strokeWidth={strokeWidth}
          className="dark:opacity-30"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={isOver ? 'var(--accent-orange)' : 'var(--accent-purple)'}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--text-muted)'
        }}>
          {t.consumed}
        </span>
        <span className="ap-big-number" style={{
          fontSize: '2.8rem',
          color: 'var(--text-primary)'
        }}>
          {consumed.toLocaleString()}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          / {netGoal.toLocaleString()} kcal
        </span>
      </div>
    </div>
  );
}
